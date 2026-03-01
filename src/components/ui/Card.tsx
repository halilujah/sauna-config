import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-panel rounded-xl border border-border shadow-sm',
        padding && 'p-4',
        className
      )}
    >
      {children}
    </div>
  );
}
