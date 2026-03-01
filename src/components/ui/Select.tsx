import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ label, value, options, onChange, className }: SelectProps) {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-border bg-panel text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
