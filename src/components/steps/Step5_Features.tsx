import { useConfigStore } from '@/store/useConfigStore';
import { DEFAULT_FEATURES } from '@/constants/features';
import { Toggle } from '@/components/ui/Toggle';
import { formatCurrency } from '@/utils/formatCurrency';
import { Badge } from '@/components/ui/Badge';

const CATEGORY_LABELS: Record<string, string> = {
  lighting: 'Lighting',
  audio: 'Audio',
  climate: 'Climate',
  structure: 'Structure',
};

export function Step5Features() {
  const features = useConfigStore((s) => s.features);
  const toggleFeature = useConfigStore((s) => s.toggleFeature);

  const enabledFeatures = DEFAULT_FEATURES.filter((f) => f.enabled);
  const categories = [...new Set(enabledFeatures.map((f) => f.category))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Features & Accessories</h2>
        <p className="text-sm text-text-muted mb-3">Add optional upgrades</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-sm font-medium text-text-muted mb-2">
            {CATEGORY_LABELS[cat] ?? cat}
          </h3>
          <div className="space-y-2">
            {enabledFeatures
              .filter((f) => f.category === cat)
              .map((feature) => (
                <div
                  key={feature.id}
                  className="bg-surface-dark rounded-lg p-3"
                >
                  <Toggle
                    checked={features.includes(feature.id)}
                    onChange={() => toggleFeature(feature.id)}
                    label={feature.name}
                    description={feature.description}
                    rightContent={
                      <Badge variant="primary">
                        +{formatCurrency(feature.price)}
                      </Badge>
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
