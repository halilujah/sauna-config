import clsx from 'clsx';
import { formatCurrency } from '@/utils/formatCurrency';

interface MaterialSwatchProps {
  color: string;
  name: string;
  priceModifier: number;
  selected: boolean;
  onClick: () => void;
}

export function MaterialSwatch({
  color,
  name,
  priceModifier,
  selected,
  onClick,
}: MaterialSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/40 bg-panel'
      )}
    >
      <div
        className="w-10 h-10 rounded-lg border border-border/50 shadow-inner"
        style={{ backgroundColor: color }}
      />
      <div className="text-xs font-medium text-text truncate w-full text-center">{name}</div>
      <div className="text-xs text-text-muted">+{formatCurrency(priceModifier)}</div>
    </button>
  );
}
