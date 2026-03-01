import type { SaunaConfig, PricingRules, PricingResult, PricingLineItem } from '@/types';

export function calculatePrice(config: SaunaConfig, rules: PricingRules): PricingResult {
  // 1. Base price
  const key = `${config.saunaType}_${config.shape}`;
  const basePrice = rules.basePrices[key] ?? 5000;

  // 2. Size multiplier
  const { width, depth, height } = config.dimensions;
  const actualVolume = width * depth * height;
  const { referenceVolume, minMultiplier, maxMultiplier } = rules.sizeMultiplier;
  const rawMultiplier = actualVolume / referenceVolume;
  const sizeMultiplier = Math.min(Math.max(rawMultiplier, minMultiplier), maxMultiplier);
  const sizeAdjustedPrice = Math.round(basePrice * sizeMultiplier);

  // 3. Material costs
  const materialCosts: PricingLineItem[] = [];
  const extCost = rules.materialModifiers[config.materials.exterior] ?? 0;
  if (extCost > 0) materialCosts.push({ label: `Exterior: ${config.materials.exterior}`, amount: extCost });

  const intCost = rules.materialModifiers[config.materials.interior] ?? 0;
  if (intCost > 0) materialCosts.push({ label: `Interior: ${config.materials.interior}`, amount: intCost });

  const benchCost = rules.materialModifiers[config.materials.bench] ?? 0;
  if (benchCost > 0) materialCosts.push({ label: `Bench: ${config.materials.bench}`, amount: benchCost });

  // 4. Door glass
  const doorGlassCost = rules.doorGlassPrices[config.materials.doorGlass] ?? 0;

  // 5. Heater cost
  const heaterRules = rules.heaterPrices[config.heater.type];
  let heaterCost = 0;
  let heaterAddonsCost = 0;
  if (heaterRules) {
    heaterCost = heaterRules.basePrice;
    heaterAddonsCost += config.heater.stoneCapacity * heaterRules.stoneCapacityPrice;
    if (config.heater.chimney) heaterAddonsCost += heaterRules.chimneyPrice;
    heaterAddonsCost += heaterRules.controlPanelPrices[config.heater.controlPanel] ?? 0;
  }

  // 6. Feature costs
  const featuresCost: PricingLineItem[] = config.features.map((fId) => ({
    label: fId,
    amount: rules.featurePrices[fId] ?? 0,
  })).filter((f) => f.amount > 0);

  // 7. Totals
  const materialTotal = materialCosts.reduce((s, c) => s + c.amount, 0);
  const featuresTotal = featuresCost.reduce((s, c) => s + c.amount, 0);
  const subtotal = sizeAdjustedPrice + materialTotal + doorGlassCost + heaterCost + heaterAddonsCost + featuresTotal;
  const total = subtotal;

  // 8. Delivery estimate
  let deliveryEstimate = '4-6 weeks';
  if (total > 15000) deliveryEstimate = '8-10 weeks';
  else if (total > 10000) deliveryEstimate = '6-8 weeks';

  return {
    basePrice,
    sizeMultiplier,
    sizeAdjustedPrice,
    materialCosts,
    heaterCost,
    heaterAddonsCost,
    featuresCost,
    doorGlassCost,
    subtotal,
    total,
    deliveryEstimate,
  };
}
