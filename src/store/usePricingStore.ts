import { create } from 'zustand';
import type { PricingRules } from '@/types';
import { DEFAULT_PRICING_RULES } from '@/constants/pricing';

const STORAGE_KEY = 'saunaconfig_pricing_rules';

interface PricingState {
  rules: PricingRules;
  setRules: (rules: PricingRules) => void;
  updateRules: (partial: Partial<PricingRules>) => void;
  resetRules: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

function loadRules(): PricingRules {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as PricingRules;
    }
  } catch { /* use defaults */ }
  return { ...DEFAULT_PRICING_RULES };
}

export const usePricingStore = create<PricingState>()((set, get) => ({
  rules: loadRules(),

  setRules: (rules) => {
    set({ rules });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
  },

  updateRules: (partial) => {
    const updated = { ...get().rules, ...partial };
    set({ rules: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  resetRules: () => {
    const defaults = { ...DEFAULT_PRICING_RULES };
    set({ rules: defaults });
    localStorage.removeItem(STORAGE_KEY);
  },

  loadFromStorage: () => {
    set({ rules: loadRules() });
  },

  saveToStorage: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get().rules));
  },
}));
