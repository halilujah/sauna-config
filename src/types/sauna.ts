export type SaunaType = 'indoor' | 'outdoor';
export type SaunaShape = 'rectangular' | 'barrel' | 'custom_modular';
export type DoorGlassType = 'clear' | 'tinted' | 'framed';
export type ControlPanelType = 'basic' | 'digital' | 'wifi';

export interface Dimensions {
  width: number;   // mm
  depth: number;   // mm
  height: number;  // mm
  seats: number;   // bench tiers 1-3
}

export interface MaterialSelections {
  exterior: string;      // material ID
  interior: string;      // material ID
  bench: string;         // material ID
  doorGlass: DoorGlassType;
}

export interface HeaterConfig {
  type: string;                    // heater ID
  stoneCapacity: number;           // kg
  chimney: boolean;
  controlPanel: ControlPanelType;
}

export interface SaunaConfig {
  saunaType: SaunaType;
  shape: SaunaShape;
  dimensions: Dimensions;
  materials: MaterialSelections;
  heater: HeaterConfig;
  features: string[];  // feature IDs
}
