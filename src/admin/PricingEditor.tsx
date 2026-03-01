import { useState } from 'react';
import { usePricingStore } from '@/store/usePricingStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Save } from 'lucide-react';

const BASE_PRICE_KEYS = [
  { key: 'indoor_rectangular', label: 'Indoor Rectangular' },
  { key: 'indoor_barrel', label: 'Indoor Barrel' },
  { key: 'indoor_custom_modular', label: 'Indoor Custom Modular' },
  { key: 'outdoor_rectangular', label: 'Outdoor Rectangular' },
  { key: 'outdoor_barrel', label: 'Outdoor Barrel' },
  { key: 'outdoor_custom_modular', label: 'Outdoor Custom Modular' },
];

export function PricingEditor() {
  const rules = usePricingStore((s) => s.rules);
  const setRules = usePricingStore((s) => s.setRules);
  const [local, setLocal] = useState(structuredClone(rules));
  const [saved, setSaved] = useState(false);

  const updateBasePrice = (key: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setLocal((prev) => ({
      ...prev,
      basePrices: { ...prev.basePrices, [key]: num },
    }));
    setSaved(false);
  };

  const updateSizeMultiplier = (field: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setLocal((prev) => ({
      ...prev,
      sizeMultiplier: { ...prev.sizeMultiplier, [field]: num },
    }));
    setSaved(false);
  };

  const updateDoorGlass = (key: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setLocal((prev) => ({
      ...prev,
      doorGlassPrices: { ...prev.doorGlassPrices, [key]: num },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setRules(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Pricing Rules</h2>
        <Button onClick={handleSave}>
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <h3 className="font-semibold mb-3">Base Prices (EUR)</h3>
        <div className="grid grid-cols-2 gap-3">
          {BASE_PRICE_KEYS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs text-text-muted mb-1">{label}</label>
              <input
                type="number"
                min={0}
                value={local.basePrices[key] ?? 0}
                onChange={(e) => updateBasePrice(key, e.target.value)}
                className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-panel"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Size Multiplier</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-text-muted mb-1">Min Multiplier</label>
            <input
              type="number"
              step={0.1}
              min={0}
              value={local.sizeMultiplier.minMultiplier}
              onChange={(e) => updateSizeMultiplier('minMultiplier', e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-panel"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Max Multiplier</label>
            <input
              type="number"
              step={0.1}
              min={0}
              value={local.sizeMultiplier.maxMultiplier}
              onChange={(e) => updateSizeMultiplier('maxMultiplier', e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-panel"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Door Glass Prices (EUR)</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(local.doorGlassPrices).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs text-text-muted mb-1 capitalize">{key}</label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => updateDoorGlass(key, e.target.value)}
                className="w-full px-2 py-1.5 border border-border rounded-lg text-sm bg-panel"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
