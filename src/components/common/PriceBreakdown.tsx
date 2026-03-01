import { formatCurrency } from '@/utils/formatCurrency';
import type { PricingResult } from '@/types';

interface PriceBreakdownProps {
  pricing: PricingResult;
}

export function PriceBreakdown({ pricing }: PriceBreakdownProps) {
  return (
    <div className="space-y-2">
      <Row label={`Base price (×${pricing.sizeMultiplier.toFixed(2)})`} amount={pricing.sizeAdjustedPrice} />

      {pricing.materialCosts.map((c) => (
        <Row key={c.label} label={c.label} amount={c.amount} />
      ))}

      {pricing.doorGlassCost > 0 && (
        <Row label="Door glass" amount={pricing.doorGlassCost} />
      )}

      <Row label="Heater" amount={pricing.heaterCost} />
      {pricing.heaterAddonsCost > 0 && (
        <Row label="Heater add-ons" amount={pricing.heaterAddonsCost} />
      )}

      {pricing.featuresCost.map((c) => (
        <Row key={c.label} label={c.label} amount={c.amount} />
      ))}

      <div className="border-t border-border pt-2 mt-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-text">Total</span>
          <span className="font-bold text-lg text-primary">
            {formatCurrency(pricing.total)}
          </span>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-2">
        Estimated delivery: {pricing.deliveryEstimate}
      </p>
    </div>
  );
}

function Row({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="text-text">{formatCurrency(amount)}</span>
    </div>
  );
}
