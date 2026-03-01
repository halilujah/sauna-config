import { useState } from 'react';
import { usePricingStore } from '@/store/usePricingStore';
import { DEFAULT_MATERIALS } from '@/constants/materials';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

export function MaterialsManager() {
  const rules = usePricingStore((s) => s.rules);
  const setRules = usePricingStore((s) => s.setRules);
  const [modifiers, setModifiers] = useState<Record<string, number>>({ ...rules.materialModifiers });
  const [saved, setSaved] = useState(false);

  const updateModifier = (id: string, value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setModifiers((prev) => ({ ...prev, [id]: num }));
    setSaved(false);
  };

  const handleSave = () => {
    setRules({ ...rules, materialModifiers: modifiers });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const categories = ['exterior', 'interior', 'bench'] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Materials Manager</h2>
        <Button onClick={handleSave}>
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      {categories.map((cat) => (
        <Card key={cat}>
          <h3 className="font-semibold mb-3 capitalize">{cat} Materials</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-border">
                <th className="pb-2">Name</th>
                <th className="pb-2">Color</th>
                <th className="pb-2">Price Modifier (EUR)</th>
              </tr>
            </thead>
            <tbody>
              {DEFAULT_MATERIALS.filter((m) => m.category === cat).map((mat) => (
                <tr key={mat.id} className="border-b border-border/50">
                  <td className="py-2">{mat.name}</td>
                  <td className="py-2">
                    <div
                      className="w-6 h-6 rounded border border-border/50"
                      style={{ backgroundColor: mat.color }}
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      min={0}
                      value={modifiers[mat.id] ?? 0}
                      onChange={(e) => updateModifier(mat.id, e.target.value)}
                      className="w-24 px-2 py-1 border border-border rounded text-sm bg-panel"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  );
}
