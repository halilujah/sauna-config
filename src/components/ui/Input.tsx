import { type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}
      <input
        className={clsx(
          'w-full px-3 py-2 rounded-lg border bg-panel text-text text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
          error ? 'border-error' : 'border-border',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
