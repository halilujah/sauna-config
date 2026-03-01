import { useConfigStore } from '@/store/useConfigStore';
import { DEFAULT_MATERIALS } from '@/constants/materials';
import { MaterialSwatch } from '@/components/common/MaterialSwatch';
import type { DoorGlassType } from '@/types';
import { OptionCard } from '@/components/common/OptionCard';

const GLASS_OPTIONS: { value: DoorGlassType; title: string }[] = [
  { value: 'clear', title: 'Clear' },
  { value: 'tinted', title: 'Tinted' },
  { value: 'framed', title: 'Framed' },
];

export function Step3Materials() {
  const materials = useConfigStore((s) => s.materials);
  const setMaterials = useConfigStore((s) => s.setMaterials);

  const exteriorOptions = DEFAULT_MATERIALS.filter((m) => m.category === 'exterior');
  const interiorOptions = DEFAULT_MATERIALS.filter((m) => m.category === 'interior');
  const benchOptions = DEFAULT_MATERIALS.filter((m) => m.category === 'bench');

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Materials</h2>

      <Section title="Exterior Cladding">
        <div className="grid grid-cols-4 gap-2">
          {exteriorOptions.map((m) => (
            <MaterialSwatch
              key={m.id}
              color={m.color}
              name={m.name}
              priceModifier={m.priceModifier}
              selected={materials.exterior === m.id}
              onClick={() => setMaterials({ exterior: m.id })}
            />
          ))}
        </div>
      </Section>

      <Section title="Interior Wood">
        <div className="grid grid-cols-4 gap-2">
          {interiorOptions.map((m) => (
            <MaterialSwatch
              key={m.id}
              color={m.color}
              name={m.name}
              priceModifier={m.priceModifier}
              selected={materials.interior === m.id}
              onClick={() => setMaterials({ interior: m.id })}
            />
          ))}
        </div>
      </Section>

      <Section title="Bench Material">
        <div className="grid grid-cols-4 gap-2">
          {benchOptions.map((m) => (
            <MaterialSwatch
              key={m.id}
              color={m.color}
              name={m.name}
              priceModifier={m.priceModifier}
              selected={materials.bench === m.id}
              onClick={() => setMaterials({ bench: m.id })}
            />
          ))}
        </div>
      </Section>

      <Section title="Door Glass">
        <div className="grid grid-cols-3 gap-2">
          {GLASS_OPTIONS.map((g) => (
            <OptionCard
              key={g.value}
              selected={materials.doorGlass === g.value}
              onClick={() => setMaterials({ doorGlass: g.value })}
              title={g.title}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-text-muted mb-2">{title}</h3>
      {children}
    </div>
  );
}
