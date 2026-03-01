import clsx from 'clsx';
import type { ReactNode } from 'react';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function OptionCard({
  selected,
  onClick,
  icon,
  title,
  description,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center w-full',
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/40 bg-panel',
        className
      )}
    >
      {icon && (
        <div
          className={clsx(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            selected ? 'bg-primary/10 text-primary' : 'bg-surface-dark text-text-muted'
          )}
        >
          {icon}
        </div>
      )}
      <div className="font-medium text-sm text-text">{title}</div>
      {description && (
        <div className="text-xs text-text-muted">{description}</div>
      )}
    </button>
  );
}
