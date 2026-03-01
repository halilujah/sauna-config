import type { PricingRules } from '@/types';

export const DEFAULT_PRICING_RULES: PricingRules = {
  basePrices: {
    indoor_rectangular: 4500,
    indoor_barrel: 5200,
    indoor_custom_modular: 6500,
    outdoor_rectangular: 5500,
    outdoor_barrel: 6200,
    outdoor_custom_modular: 7800,
  },
  sizeMultiplier: {
    method: 'volume',
    referenceVolume: 2000 * 1800 * 2100, // mm^3
    referenceFootprint: 2000 * 1800,       // mm^2
    minMultiplier: 0.8,
    maxMultiplier: 2.5,
  },
  materialModifiers: {
    cedar: 800,
    thermowood: 600,
    spruce_ext: 300,
    pine_ext: 250,
    alder: 500,
    aspen: 450,
    spruce_int: 200,
    cedar_int: 700,
    abachi: 350,
    alder_bench: 300,
    aspen_bench: 280,
    thermowood_bench: 500,
  },
  heaterPrices: {
    electric_6kw: {
      basePrice: 800,
      stoneCapacityPrice: 5,
      chimneyPrice: 0,
      controlPanelPrices: { basic: 0, digital: 150, wifi: 300 },
    },
    electric_9kw: {
      basePrice: 1200,
      stoneCapacityPrice: 5,
      chimneyPrice: 0,
      controlPanelPrices: { basic: 0, digital: 150, wifi: 300 },
    },
    wood_burning: {
      basePrice: 1500,
      stoneCapacityPrice: 4,
      chimneyPrice: 450,
      controlPanelPrices: { basic: 0, digital: 0, wifi: 0 },
    },
    infrared: {
      basePrice: 2000,
      stoneCapacityPrice: 0,
      chimneyPrice: 0,
      controlPanelPrices: { basic: 0, digital: 200, wifi: 400 },
    },
    hybrid: {
      basePrice: 2800,
      stoneCapacityPrice: 5,
      chimneyPrice: 0,
      controlPanelPrices: { basic: 0, digital: 200, wifi: 400 },
    },
  },
  featurePrices: {
    led_strip: 250,
    led_spot: 350,
    led_rgb: 500,
    bluetooth_audio: 400,
    ventilation: 300,
    extra_insulation: 600,
    roof_upgrade: 450,
    window: 350,
  },
  doorGlassPrices: {
    clear: 0,
    tinted: 150,
    framed: 250,
  },
};
