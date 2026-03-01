import clsx from 'clsx';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 50,
  unit = 'mm',
  onChange,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text">{label}</label>
        <span className="text-sm font-semibold text-primary">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-text-muted">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
