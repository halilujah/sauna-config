import type { SaunaConfig } from '@/types';

export const DEFAULT_CONFIG: SaunaConfig = {
  saunaType: 'outdoor',
  shape: 'rectangular',
  dimensions: {
    width: 2000,
    depth: 1800,
    height: 2100,
    seats: 2,
  },
  materials: {
    exterior: 'thermowood',
    interior: 'alder',
    bench: 'abachi',
    doorGlass: 'clear',
  },
  heater: {
    type: 'electric_9kw',
    stoneCapacity: 20,
    chimney: false,
    controlPanel: 'digital',
  },
  features: [],
};
