import type { MaterialOption } from '@/types';

export const DEFAULT_MATERIALS: MaterialOption[] = [
  // Exterior
  { id: 'cedar', name: 'Cedar', category: 'exterior', color: '#b5651d', roughness: 0.75, priceModifier: 800, description: 'Naturally resistant to decay and insects' },
  { id: 'thermowood', name: 'Thermowood', category: 'exterior', color: '#6b4226', roughness: 0.8, priceModifier: 600, description: 'Heat-treated for enhanced durability' },
  { id: 'spruce_ext', name: 'Spruce', category: 'exterior', color: '#d4a76a', roughness: 0.65, priceModifier: 300, description: 'Classic Nordic wood, budget-friendly' },
  { id: 'pine_ext', name: 'Pine', category: 'exterior', color: '#c4944a', roughness: 0.7, priceModifier: 250, description: 'Versatile softwood with warm tones' },

  // Interior
  { id: 'alder', name: 'Alder', category: 'interior', color: '#c69c6d', roughness: 0.6, priceModifier: 500, description: 'Soft to touch, low heat retention' },
  { id: 'aspen', name: 'Aspen', category: 'interior', color: '#e8d5b7', roughness: 0.55, priceModifier: 450, description: 'Light color, pleasant aroma' },
  { id: 'spruce_int', name: 'Spruce', category: 'interior', color: '#d4a76a', roughness: 0.65, priceModifier: 200, description: 'Affordable, traditional look' },
  { id: 'cedar_int', name: 'Cedar', category: 'interior', color: '#a0522d', roughness: 0.7, priceModifier: 700, description: 'Aromatic, naturally antimicrobial' },

  // Bench
  { id: 'abachi', name: 'Abachi', category: 'bench', color: '#f0e0c0', roughness: 0.5, priceModifier: 350, description: 'African hardwood, very low heat absorption' },
  { id: 'alder_bench', name: 'Alder', category: 'bench', color: '#c69c6d', roughness: 0.6, priceModifier: 300, description: 'Comfortable, stays cool' },
  { id: 'aspen_bench', name: 'Aspen', category: 'bench', color: '#e8d5b7', roughness: 0.55, priceModifier: 280, description: 'Smooth surface, light color' },
  { id: 'thermowood_bench', name: 'Thermowood', category: 'bench', color: '#5a3620', roughness: 0.75, priceModifier: 500, description: 'Premium dark finish, very durable' },
];
