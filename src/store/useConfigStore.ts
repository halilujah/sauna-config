import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SaunaType, SaunaShape, Dimensions, MaterialSelections, HeaterConfig, SaunaConfig } from '@/types';
import { DEFAULT_CONFIG } from '@/constants/defaults';
import { CONSTRAINTS } from '@/constants/constraints';

interface ConfigSnapshot {
  config: SaunaConfig;
}

interface ConfigState {
  saunaType: SaunaType;
  shape: SaunaShape;
  dimensions: Dimensions;
  materials: MaterialSelections;
  heater: HeaterConfig;
  features: string[];

  history: ConfigSnapshot[];
  historyIndex: number;

  setSaunaType: (type: SaunaType) => void;
  setShape: (shape: SaunaShape) => void;
  setDimensions: (dims: Partial<Dimensions>) => void;
  setMaterials: (mats: Partial<MaterialSelections>) => void;
  setHeater: (heater: Partial<HeaterConfig>) => void;
  toggleFeature: (featureId: string) => void;
  undo: () => void;
  redo: () => void;
  resetConfig: () => void;
  loadConfig: (config: SaunaConfig) => void;
  getConfig: () => SaunaConfig;
}

function clampDimensions(dims: Dimensions, shape: SaunaShape): Dimensions {
  const c = CONSTRAINTS[shape];
  return {
    width: Math.min(Math.max(dims.width, c.width[0]), c.width[1]),
    depth: Math.min(Math.max(dims.depth, c.depth[0]), c.depth[1]),
    height: Math.min(Math.max(dims.height, c.height[0]), c.height[1]),
    seats: Math.min(Math.max(dims.seats, c.seats[0]), c.seats[1]),
  };
}

function extractConfig(state: ConfigState): SaunaConfig {
  return {
    saunaType: state.saunaType,
    shape: state.shape,
    dimensions: { ...state.dimensions },
    materials: { ...state.materials },
    heater: { ...state.heater },
    features: [...state.features],
  };
}

function pushSnapshot(state: ConfigState) {
  const snapshot: ConfigSnapshot = { config: extractConfig(state) };
  // Trim future history if we branched
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(snapshot);
  if (state.history.length > 50) {
    state.history.shift();
  } else {
    state.historyIndex++;
  }
}

export const useConfigStore = create<ConfigState>()(
  immer((set, get) => ({
    ...DEFAULT_CONFIG,

    history: [{ config: { ...DEFAULT_CONFIG } }],
    historyIndex: 0,

    setSaunaType: (type) =>
      set((state) => {
        pushSnapshot(state);
        state.saunaType = type;
      }),

    setShape: (shape) =>
      set((state) => {
        pushSnapshot(state);
        state.shape = shape;
        state.dimensions = clampDimensions(state.dimensions, shape);
      }),

    setDimensions: (dims) =>
      set((state) => {
        pushSnapshot(state);
        const merged = { ...state.dimensions, ...dims };
        state.dimensions = clampDimensions(merged, state.shape);
      }),

    setMaterials: (mats) =>
      set((state) => {
        pushSnapshot(state);
        Object.assign(state.materials, mats);
      }),

    setHeater: (heater) =>
      set((state) => {
        pushSnapshot(state);
        Object.assign(state.heater, heater);
      }),

    toggleFeature: (featureId) =>
      set((state) => {
        pushSnapshot(state);
        const idx = state.features.indexOf(featureId);
        if (idx >= 0) {
          state.features.splice(idx, 1);
        } else {
          state.features.push(featureId);
        }
      }),

    undo: () =>
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          const snapshot = state.history[state.historyIndex];
          Object.assign(state, snapshot.config);
        }
      }),

    redo: () =>
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          const snapshot = state.history[state.historyIndex];
          Object.assign(state, snapshot.config);
        }
      }),

    resetConfig: () =>
      set((state) => {
        pushSnapshot(state);
        Object.assign(state, DEFAULT_CONFIG);
        state.features = [];
      }),

    loadConfig: (config) =>
      set((state) => {
        pushSnapshot(state);
        Object.assign(state, config);
      }),

    getConfig: () => extractConfig(get()),
  }))
);
