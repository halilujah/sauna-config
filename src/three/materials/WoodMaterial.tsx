import { useMemo } from 'react';
import * as THREE from 'three';
import { DEFAULT_MATERIALS } from '@/constants/materials';

const WOOD_COLORS: Record<string, { color: string; roughness: number }> = {};
for (const m of DEFAULT_MATERIALS) {
  WOOD_COLORS[m.id] = { color: m.color, roughness: m.roughness };
}

// Fallback color
const FALLBACK = { color: '#b5651d', roughness: 0.7 };

export function useWoodMaterial(materialId: string) {
  return useMemo(() => {
    const wood = WOOD_COLORS[materialId] ?? FALLBACK;
    return new THREE.MeshStandardMaterial({
      color: wood.color,
      roughness: wood.roughness,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [materialId]);
}
