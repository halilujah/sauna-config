import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { formatCurrency } from '@/utils/formatCurrency';

export function StickyPrice() {
  const pricing = usePriceCalculation();

  return (
    <div className="bg-panel border-t border-border px-4 py-3 flex items-center justify-between">
      <div>
        <div className="text-xs text-text-muted">Estimated Price</div>
        <div className="text-xl font-bold text-primary">
          {formatCurrency(pricing.total)}
        </div>
      </div>
      <div className="text-xs text-text-muted text-right">
        Delivery: {pricing.deliveryEstimate}
      </div>
    </div>
  );
}
