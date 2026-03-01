export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // optional
  return /^[+]?[\d\s()-]{7,20}$/.test(phone);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export interface ValidationErrors {
  [field: string]: string | undefined;
}

export function validateQuoteForm(values: {
  name: string;
  email: string;
  phone: string;
  address: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!isRequired(values.name)) errors.name = 'Name is required';
  if (!isRequired(values.email)) errors.email = 'Email is required';
  else if (!isValidEmail(values.email)) errors.email = 'Invalid email address';
  if (!isValidPhone(values.phone)) errors.phone = 'Invalid phone number';
  if (!isRequired(values.address)) errors.address = 'Address is required';

  return errors;
}
