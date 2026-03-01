import { useMemo } from 'react';
import * as THREE from 'three';
import type { DoorGlassType } from '@/types';

const GLASS_CONFIGS: Record<DoorGlassType, { color: string; opacity: number }> = {
  clear: { color: '#E8F4FD', opacity: 0.3 },
  tinted: { color: '#8B6914', opacity: 0.5 },
  framed: { color: '#D4E8D4', opacity: 0.35 },
};

export function useGlassMaterial(glassType: DoorGlassType) {
  return useMemo(() => {
    const config = GLASS_CONFIGS[glassType];
    return new THREE.MeshPhysicalMaterial({
      color: config.color,
      transparent: true,
      opacity: config.opacity,
      roughness: 0.05,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [glassType]);
}
