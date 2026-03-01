import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-surface-dark text-text-muted': variant === 'default',
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-success/10 text-success': variant === 'success',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
