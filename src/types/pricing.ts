export interface PricingRules {
  basePrices: Record<string, number>; // key: `${saunaType}_${shape}`
  sizeMultiplier: {
    method: 'volume' | 'footprint';
    referenceVolume: number;     // mm^3
    referenceFootprint: number;  // mm^2
    minMultiplier: number;
    maxMultiplier: number;
  };
  materialModifiers: Record<string, number>;  // materialId -> EUR
  heaterPrices: Record<string, {
    basePrice: number;
    stoneCapacityPrice: number;
    chimneyPrice: number;
    controlPanelPrices: {
      basic: number;
      digital: number;
      wifi: number;
    };
  }>;
  featurePrices: Record<string, number>;  // featureId -> EUR
  doorGlassPrices: {
    clear: number;
    tinted: number;
    framed: number;
  };
}

export interface PricingLineItem {
  label: string;
  amount: number;
}

export interface PricingResult {
  basePrice: number;
  sizeMultiplier: number;
  sizeAdjustedPrice: number;
  materialCosts: PricingLineItem[];
  heaterCost: number;
  heaterAddonsCost: number;
  featuresCost: PricingLineItem[];
  doorGlassCost: number;
  subtotal: number;
  total: number;
  deliveryEstimate: string;
}
