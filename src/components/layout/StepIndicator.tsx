import { useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { STEP_LABELS } from '@/hooks/useStepNavigation';
import { useUIStore } from '@/store/useUIStore';

export function StepIndicator() {
  const currentStep = useUIStore((s) => s.currentStep);
  const setStep = useUIStore((s) => s.setStep);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currentStep]);

  const setActiveRef = useCallback(
    (step: number) => (el: HTMLButtonElement | null) => {
      if (step === currentStep) activeRef.current = el;
    },
    [currentStep]
  );

  return (
    <div className="flex items-center gap-1 px-2 py-3 overflow-x-auto shrink-0">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <button
            key={step}
            ref={setActiveRef(step)}
            onClick={() => setStep(step)}
            className={clsx(
              'flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
              isActive && 'bg-primary text-white',
              isCompleted && 'bg-primary/10 text-primary hover:bg-primary/20',
              !isActive && !isCompleted && 'text-text-muted hover:bg-surface-dark'
            )}
          >
            <span
              className={clsx(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                isActive && 'bg-white/20',
                isCompleted && 'bg-primary text-white',
                !isActive && !isCompleted && 'bg-surface-dark'
              )}
            >
              {isCompleted ? '✓' : step}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
