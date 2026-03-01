/** Convert mm to Three.js world units (meters) */
export function mmToM(mm: number): number {
  return mm / 1000;
}

/** Calculate volume in mm^3 */
export function volume(width: number, depth: number, height: number): number {
  return width * depth * height;
}

/** Calculate footprint in mm^2 */
export function footprint(width: number, depth: number): number {
  return width * depth;
}
