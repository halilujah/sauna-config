import { useMemo } from 'react';
import { useConfigStore } from '@/store/useConfigStore';
import { usePricingStore } from '@/store/usePricingStore';
import { calculatePrice } from '@/engine/pricing';
import type { PricingResult } from '@/types';

export function usePriceCalculation(): PricingResult {
  const saunaType = useConfigStore((s) => s.saunaType);
  const shape = useConfigStore((s) => s.shape);
  const dimensions = useConfigStore((s) => s.dimensions);
  const materials = useConfigStore((s) => s.materials);
  const heater = useConfigStore((s) => s.heater);
  const features = useConfigStore((s) => s.features);
  const rules = usePricingStore((s) => s.rules);

  return useMemo(
    () =>
      calculatePrice(
        { saunaType, shape, dimensions, materials, heater, features },
        rules
      ),
    [saunaType, shape, dimensions, materials, heater, features, rules]
  );
}
