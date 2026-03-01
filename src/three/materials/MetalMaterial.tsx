import { useMemo } from 'react';
import * as THREE from 'three';

export function useMetalMaterial(color = '#888888') {
  return useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.85,
      roughness: 0.3,
    });
  }, [color]);
}
