import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  rightContent,
  className,
}: ToggleProps) {
  return (
    <label className={clsx('flex items-center gap-3 cursor-pointer group', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-border'
        )}
      >
        <span
          className={clsx(
            'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5',
            checked ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && <div className="text-sm font-medium text-text">{label}</div>}
          {description && <div className="text-xs text-text-muted truncate">{description}</div>}
        </div>
      )}
      {rightContent}
    </label>
  );
}
