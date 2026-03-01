export interface FeatureOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'lighting' | 'audio' | 'climate' | 'structure';
  enabled: boolean;  // can be toggled off from admin
}
