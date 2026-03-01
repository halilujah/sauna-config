import type { SaunaShape } from '@/types';

export interface DimensionConstraints {
  width: [number, number];   // [min, max] in mm
  depth: [number, number];
  height: [number, number];
  seats: [number, number];
}

export const CONSTRAINTS: Record<SaunaShape, DimensionConstraints> = {
  rectangular: {
    width: [1200, 4000],
    depth: [1200, 3500],
    height: [1900, 2400],
    seats: [1, 3],
  },
  barrel: {
    width: [1500, 2500],
    depth: [1800, 4000],
    height: [1900, 2500],
    seats: [1, 3],
  },
  custom_modular: {
    width: [2000, 6000],
    depth: [2000, 5000],
    height: [1900, 2400],
    seats: [1, 3],
  },
};
