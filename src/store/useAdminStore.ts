import { create } from 'zustand';
import type { QuoteSubmission } from '@/types';

const STORAGE_KEY = 'saunaconfig_submissions';

interface AdminState {
  submissions: QuoteSubmission[];
  addSubmission: (sub: QuoteSubmission) => void;
  clearSubmissions: () => void;
  loadSubmissions: () => void;
}

function loadSubmissions(): QuoteSubmission[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as QuoteSubmission[];
  } catch { /* use empty */ }
  return [];
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  submissions: loadSubmissions(),

  addSubmission: (sub) => {
    const updated = [...get().submissions, sub];
    set({ submissions: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  clearSubmissions: () => {
    set({ submissions: [] });
    localStorage.removeItem(STORAGE_KEY);
  },

  loadSubmissions: () => {
    set({ submissions: loadSubmissions() });
  },
}));
