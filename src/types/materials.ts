export interface MaterialOption {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'bench';
  color: string;       // hex color
  roughness: number;
  priceModifier: number; // EUR added to base
  description?: string;
}
