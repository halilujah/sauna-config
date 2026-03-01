import type { Dimensions, SaunaShape } from '@/types';
import { CONSTRAINTS } from '@/constants/constraints';

export function clampDimension(
  value: number,
  shape: SaunaShape,
  dimension: keyof Dimensions
): number {
  const c = CONSTRAINTS[shape];
  const [min, max] = c[dimension];
  return Math.min(Math.max(value, min), max);
}

export function validateDimensions(
  dims: Dimensions,
  shape: SaunaShape
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const c = CONSTRAINTS[shape];

  if (dims.width < c.width[0] || dims.width > c.width[1])
    errors.push(`Width must be between ${c.width[0]}mm and ${c.width[1]}mm`);
  if (dims.depth < c.depth[0] || dims.depth > c.depth[1])
    errors.push(`Depth must be between ${c.depth[0]}mm and ${c.depth[1]}mm`);
  if (dims.height < c.height[0] || dims.height > c.height[1])
    errors.push(`Height must be between ${c.height[0]}mm and ${c.height[1]}mm`);
  if (dims.seats < c.seats[0] || dims.seats > c.seats[1])
    errors.push(`Seats must be between ${c.seats[0]} and ${c.seats[1]}`);

  return { valid: errors.length === 0, errors };
}
