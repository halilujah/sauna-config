import { useState } from 'react';
import { usePricingStore } from '@/store/usePricingStore';
import { DEFAULT_FEATURES } from '@/constants/features';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

export function FeaturesManager() {
  const rules = usePricingStore((s) => s.rules);
  const setRules = usePricingStore((s) => s.setRules);
  const [featurePrices, setFeaturePrices] = useState<Record<string, number>>({ ...rules.featurePrices });
  const [saved, setSaved] = useState(false);

  const updatePrice = (id: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setFeaturePrices((prev) => ({ ...prev, [id]: num }));
    setSaved(false);
  };

  const handleSave = () => {
    setRules({ ...rules, featurePrices });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Features Manager</h2>
        <Button onClick={handleSave}>
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-border">
              <th className="pb-2">Feature</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Price (EUR)</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_FEATURES.map((feature) => (
              <tr key={feature.id} className="border-b border-border/50">
                <td className="py-2">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-xs text-text-muted">{feature.description}</div>
                </td>
                <td className="py-2 capitalize text-text-muted">{feature.category}</td>
                <td className="py-2">
                  <input
                    type="number"
                    min={0}
                    value={featurePrices[feature.id] ?? 0}
                    onChange={(e) => updatePrice(feature.id, e.target.value)}
                    className="w-24 px-2 py-1 border border-border rounded text-sm bg-panel"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
