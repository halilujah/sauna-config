import { useUIStore } from '@/store/useUIStore';

export const STEP_LABELS = [
  'Sauna Type',
  'Dimensions',
  'Materials',
  'Heating',
  'Features',
  'Summary',
  'Get Quote',
] as const;

export function useStepNavigation() {
  const currentStep = useUIStore((s) => s.currentStep);
  const setStep = useUIStore((s) => s.setStep);
  const nextStep = useUIStore((s) => s.nextStep);
  const prevStep = useUIStore((s) => s.prevStep);

  return {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    totalSteps: 7,
    isFirst: currentStep === 1,
    isLast: currentStep === 7,
    label: STEP_LABELS[currentStep - 1],
  };
}
