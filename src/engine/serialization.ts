import type { SaunaConfig } from '@/types';

export function exportConfigJSON(config: SaunaConfig): string {
  return JSON.stringify(config, null, 2);
}

export function generateShareLink(config: SaunaConfig): string {
  const encoded = btoa(JSON.stringify(config));
  return `${window.location.origin}${window.location.pathname}?config=${encoded}`;
}

export function loadFromShareLink(): SaunaConfig | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('config');
    if (!encoded) return null;
    return JSON.parse(atob(encoded)) as SaunaConfig;
  } catch {
    return null;
  }
}
