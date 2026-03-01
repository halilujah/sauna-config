import { useState } from 'react';
import { usePricingStore } from '@/store/usePricingStore';
import { DEFAULT_HEATERS } from '@/constants/heaters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

export function HeatersManager() {
  const rules = usePricingStore((s) => s.rules);
  const setRules = usePricingStore((s) => s.setRules);
  const [heaterPrices, setHeaterPrices] = useState(structuredClone(rules.heaterPrices));
  const [saved, setSaved] = useState(false);

  const updateField = (heaterId: string, field: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setHeaterPrices((prev) => ({
      ...prev,
      [heaterId]: { ...prev[heaterId], [field]: num },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setRules({ ...rules, heaterPrices });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Heaters Manager</h2>
        <Button onClick={handleSave}>
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      {DEFAULT_HEATERS.map((heater) => {
        const prices = heaterPrices[heater.id];
        if (!prices) return null;

        return (
          <Card key={heater.id}>
            <h3 className="font-semibold mb-3">{heater.name}</h3>
            <p className="text-xs text-text-muted mb-3">{heater.description}</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-text-muted mb-1">Base Price</label>
                <input
                  type="number"
                  min={0}
                  value={prices.basePrice}
                  onChange={(e) => updateField(heater.id, 'basePrice', e.target.value)}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-panel"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Stone Price/kg</label>
                <input
                  type="number"
                  min={0}
                  value={prices.stoneCapacityPrice}
                  onChange={(e) => updateField(heater.id, 'stoneCapacityPrice', e.target.value)}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-panel"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Chimney Price</label>
                <input
                  type="number"
                  min={0}
                  value={prices.chimneyPrice}
                  onChange={(e) => updateField(heater.id, 'chimneyPrice', e.target.value)}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-panel"
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
