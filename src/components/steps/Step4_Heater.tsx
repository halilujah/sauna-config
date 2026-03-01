import { useConfigStore } from '@/store/useConfigStore';
import { DEFAULT_HEATERS } from '@/constants/heaters';
import { OptionCard } from '@/components/common/OptionCard';
import { Slider } from '@/components/ui/Slider';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Select';
import { Zap, Flame, Sun, Sparkles } from 'lucide-react';
import type { ControlPanelType } from '@/types';

const ICONS: Record<string, typeof Zap> = {
  Zap, Flame, Sun, Sparkles,
};

const CONTROL_OPTIONS = [
  { value: 'basic', label: 'Basic' },
  { value: 'digital', label: 'Digital (+€150)' },
  { value: 'wifi', label: 'WiFi (+€300)' },
];

export function Step4Heater() {
  const heater = useConfigStore((s) => s.heater);
  const setHeater = useConfigStore((s) => s.setHeater);

  const selectedHeater = DEFAULT_HEATERS.find((h) => h.id === heater.type);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Heating System</h2>
        <p className="text-sm text-text-muted mb-3">Choose your heating method</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DEFAULT_HEATERS.map((h) => {
          const Icon = ICONS[h.icon] ?? Zap;
          return (
            <OptionCard
              key={h.id}
              selected={heater.type === h.id}
              onClick={() => setHeater({ type: h.id })}
              icon={<Icon size={20} />}
              title={h.name}
              description={`€${h.basePrice}`}
            />
          );
        })}
      </div>

      {selectedHeater && selectedHeater.stoneCapacityPrice > 0 && (
        <Slider
          label="Stone Capacity"
          value={heater.stoneCapacity}
          min={10}
          max={50}
          step={5}
          unit="kg"
          onChange={(v) => setHeater({ stoneCapacity: v })}
        />
      )}

      {selectedHeater?.hasChimney && (
        <Toggle
          checked={heater.chimney}
          onChange={(v) => setHeater({ chimney: v })}
          label="Chimney"
          description={`Adds €${selectedHeater.chimneyPrice}`}
        />
      )}

      {selectedHeater && (
        <Select
          label="Control Panel"
          value={heater.controlPanel}
          options={CONTROL_OPTIONS}
          onChange={(v) => setHeater({ controlPanel: v as ControlPanelType })}
        />
      )}
    </div>
  );
}
