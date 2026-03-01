import { useConfigStore } from '@/store/useConfigStore';
import { OptionCard } from '@/components/common/OptionCard';
import { Home, TreePine, Square, Circle, LayoutGrid } from 'lucide-react';
import type { SaunaType, SaunaShape } from '@/types';

const TYPES: { value: SaunaType; title: string; description: string; icon: typeof Home }[] = [
  { value: 'indoor', title: 'Indoor', description: 'For interior spaces', icon: Home },
  { value: 'outdoor', title: 'Outdoor', description: 'For gardens & backyards', icon: TreePine },
];

const SHAPES: { value: SaunaShape; title: string; description: string; icon: typeof Square }[] = [
  { value: 'rectangular', title: 'Rectangular', description: 'Classic box design', icon: Square },
  { value: 'barrel', title: 'Barrel', description: 'Cylindrical design', icon: Circle },
  { value: 'custom_modular', title: 'Modular', description: 'L-shape layout', icon: LayoutGrid },
];

export function Step1SaunaType() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const shape = useConfigStore((s) => s.shape);
  const setSaunaType = useConfigStore((s) => s.setSaunaType);
  const setShape = useConfigStore((s) => s.setShape);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Sauna Type</h2>
        <p className="text-sm text-text-muted mb-3">Choose indoor or outdoor placement</p>
        <div className="grid grid-cols-2 gap-3">
          {TYPES.map((t) => (
            <OptionCard
              key={t.value}
              selected={saunaType === t.value}
              onClick={() => setSaunaType(t.value)}
              icon={<t.icon size={20} />}
              title={t.title}
              description={t.description}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Shape</h2>
        <p className="text-sm text-text-muted mb-3">Select the sauna shape</p>
        <div className="grid grid-cols-3 gap-3">
          {SHAPES.map((s) => (
            <OptionCard
              key={s.value}
              selected={shape === s.value}
              onClick={() => setShape(s.value)}
              icon={<s.icon size={20} />}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
