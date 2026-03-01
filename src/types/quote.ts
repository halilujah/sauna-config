import type { SaunaConfig } from './sauna';
import type { PricingResult } from './pricing';

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export interface QuoteSubmission {
  id: string;
  timestamp: number;
  contact: ContactInfo;
  config: SaunaConfig;
  pricing: PricingResult;
}
