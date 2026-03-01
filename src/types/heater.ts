export interface HeaterOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  stoneCapacityPrice: number;  // per kg
  chimneyPrice: number;
  controlPanelPrices: {
    basic: number;
    digital: number;
    wifi: number;
  };
  hasChimney: boolean;         // whether chimney option is available
  icon: string;                // lucide icon name
}
