import { useUIStore } from '@/store/useUIStore';
import { StepIndicator } from './StepIndicator';
import { StickyPrice } from './StickyPrice';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Step1SaunaType } from '@/components/steps/Step1_SaunaType';
import { Step2Dimensions } from '@/components/steps/Step2_Dimensions';
import { Step3Materials } from '@/components/steps/Step3_Materials';
import { Step4Heater } from '@/components/steps/Step4_Heater';
import { Step5Features } from '@/components/steps/Step5_Features';
import { Step6Summary } from '@/components/steps/Step6_Summary';
import { Step7QuoteForm } from '@/components/steps/Step7_QuoteForm';

const STEPS = [
  Step1SaunaType,
  Step2Dimensions,
  Step3Materials,
  Step4Heater,
  Step5Features,
  Step6Summary,
  Step7QuoteForm,
];

export function Sidebar() {
  const currentStep = useUIStore((s) => s.currentStep);
  const nextStep = useUIStore((s) => s.nextStep);
  const prevStep = useUIStore((s) => s.prevStep);
  const StepComponent = STEPS[currentStep - 1];

  return (
    <div className="flex flex-col h-full bg-panel border-l border-border">
      <StepIndicator />
      {/* key forces remount on step change, which resets scroll to top */}
      <div key={currentStep} className="flex-1 overflow-y-auto p-4">
        <StepComponent />
      </div>
      <div className="p-3 border-t border-border flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex-1"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={nextStep}
          disabled={currentStep === 7}
          className="flex-1"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
      <StickyPrice />
    </div>
  );
}
