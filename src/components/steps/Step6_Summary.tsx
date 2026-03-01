import { useConfigStore } from '@/store/useConfigStore';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { PriceBreakdown } from '@/components/common/PriceBreakdown';
import { Card } from '@/components/ui/Card';

export function Step6Summary() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const shape = useConfigStore((s) => s.shape);
  const dimensions = useConfigStore((s) => s.dimensions);
  const materials = useConfigStore((s) => s.materials);
  const heater = useConfigStore((s) => s.heater);
  const features = useConfigStore((s) => s.features);
  const pricing = usePriceCalculation();

  const config = { saunaType, shape, dimensions, materials, heater, features };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Configuration Summary</h2>

      <Card>
        <h3 className="text-sm font-semibold text-text-muted mb-2">Sauna</h3>
        <div className="text-sm space-y-1">
          <Row label="Type" value={`${config.saunaType} / ${config.shape.replace('_', ' ')}`} />
          <Row label="Width" value={`${config.dimensions.width}mm`} />
          <Row label="Depth" value={`${config.dimensions.depth}mm`} />
          <Row label="Height" value={`${config.dimensions.height}mm`} />
          <Row label="Bench Tiers" value={String(config.dimensions.seats)} />
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-muted mb-2">Materials</h3>
        <div className="text-sm space-y-1">
          <Row label="Exterior" value={config.materials.exterior} />
          <Row label="Interior" value={config.materials.interior} />
          <Row label="Bench" value={config.materials.bench} />
          <Row label="Door Glass" value={config.materials.doorGlass} />
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-muted mb-2">Heater</h3>
        <div className="text-sm space-y-1">
          <Row label="Type" value={config.heater.type.replace(/_/g, ' ')} />
          <Row label="Stones" value={`${config.heater.stoneCapacity}kg`} />
          <Row label="Chimney" value={config.heater.chimney ? 'Yes' : 'No'} />
          <Row label="Controls" value={config.heater.controlPanel} />
        </div>
      </Card>

      {config.features.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-text-muted mb-2">Features</h3>
          <div className="text-sm space-y-1">
            {config.features.map((f) => (
              <div key={f} className="text-text">{f.replace(/_/g, ' ')}</div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-sm font-semibold text-text-muted mb-3">Pricing</h3>
        <PriceBreakdown pricing={pricing} />
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="text-text font-medium capitalize">{value}</span>
    </div>
  );
}
