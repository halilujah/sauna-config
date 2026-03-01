import { create } from 'zustand';

interface UIState {
  currentStep: number;
  isLoading: boolean;
  sidebarOpen: boolean;
  showQuoteSuccess: boolean;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setShowQuoteSuccess: (show: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  currentStep: 1,
  isLoading: false,
  sidebarOpen: true,
  showQuoteSuccess: false,

  setStep: (step) => set({ currentStep: Math.min(Math.max(step, 1), 7) }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 7) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setShowQuoteSuccess: (show) => set({ showQuoteSuccess: show }),
}));
