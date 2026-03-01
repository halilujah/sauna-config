import { useConfigStore } from '@/store/useConfigStore';
import { CONSTRAINTS } from '@/constants/constraints';
import { Slider } from '@/components/ui/Slider';

export function Step2Dimensions() {
  const shape = useConfigStore((s) => s.shape);
  const dimensions = useConfigStore((s) => s.dimensions);
  const setDimensions = useConfigStore((s) => s.setDimensions);
  const c = CONSTRAINTS[shape];

  const volumeM3 = (dimensions.width * dimensions.depth * dimensions.height) / 1e9;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Dimensions</h2>
        <p className="text-sm text-text-muted mb-4">Adjust the sauna dimensions</p>
      </div>

      <Slider
        label="Width"
        value={dimensions.width}
        min={c.width[0]}
        max={c.width[1]}
        step={50}
        unit="mm"
        onChange={(v) => setDimensions({ width: v })}
      />

      <Slider
        label="Depth"
        value={dimensions.depth}
        min={c.depth[0]}
        max={c.depth[1]}
        step={50}
        unit="mm"
        onChange={(v) => setDimensions({ depth: v })}
      />

      <Slider
        label="Height"
        value={dimensions.height}
        min={c.height[0]}
        max={c.height[1]}
        step={50}
        unit="mm"
        onChange={(v) => setDimensions({ height: v })}
      />

      <Slider
        label="Bench Tiers"
        value={dimensions.seats}
        min={c.seats[0]}
        max={c.seats[1]}
        step={1}
        unit=""
        onChange={(v) => setDimensions({ seats: v })}
      />

      <div className="bg-surface-dark rounded-lg p-3 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>Footprint</span>
          <span>{((dimensions.width * dimensions.depth) / 1e6).toFixed(2)} m²</span>
        </div>
        <div className="flex justify-between text-text-muted mt-1">
          <span>Volume</span>
          <span>{volumeM3.toFixed(2)} m³</span>
        </div>
      </div>
    </div>
  );
}
