import { useMemo } from 'react';
import * as THREE from 'three';
import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useConfigStore } from '@/store/useConfigStore';

export function SaunaRoof() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const shape = useConfigStore((s) => s.shape);
  const { width, depth, height } = useConfigStore((s) => s.dimensions);
  const exterior = useConfigStore((s) => s.materials.exterior);
  const features = useConfigStore((s) => s.features);
  const material = useWoodMaterial(exterior);

  const w = mmToM(width);
  const d = mmToM(depth);
  const h = mmToM(height);
  const roofThickness = 0.06;
  const overhang = saunaType === 'outdoor' ? 0.15 : 0.02;
  const isPremiumRoof = features.includes('roof_upgrade');
  const roofAngle = isPremiumRoof ? 0.35 : 0.25;
  const roofRise = (w / 2) * Math.tan(roofAngle);

  // Gable geometry — always computed so hook count is stable
  const gableGeom = useMemo(() => {
    const gableShape = new THREE.Shape();
    gableShape.moveTo(-w / 2, 0);
    gableShape.lineTo(w / 2, 0);
    gableShape.lineTo(0, roofRise);
    gableShape.lineTo(-w / 2, 0);
    return new THREE.ExtrudeGeometry(gableShape, {
      depth: 0.08,
      bevelEnabled: false,
    });
  }, [w, roofRise]);

  // Barrel sauna has its own roof (the barrel itself)
  if (shape === 'barrel') return null;

  if (saunaType === 'indoor') {
    // Flat ceiling
    return (
      <mesh position={[0, h + roofThickness / 2, 0]} castShadow receiveShadow material={material}>
        <boxGeometry args={[w + overhang * 2, roofThickness, d + overhang * 2]} />
      </mesh>
    );
  }

  // Outdoor peaked (gable) roof
  const panelLength = (w / 2) / Math.cos(roofAngle) + overhang;

  return (
    <group position={[0, h, 0]}>
      {/* Left slope */}
      <mesh
        position={[-w / 4, roofRise / 2, 0]}
        rotation={[0, 0, roofAngle]}
        castShadow
        receiveShadow
        material={material}
      >
        <boxGeometry args={[panelLength, roofThickness, d + overhang * 2]} />
      </mesh>
      {/* Right slope */}
      <mesh
        position={[w / 4, roofRise / 2, 0]}
        rotation={[0, 0, -roofAngle]}
        castShadow
        receiveShadow
        material={material}
      >
        <boxGeometry args={[panelLength, roofThickness, d + overhang * 2]} />
      </mesh>

      {/* Front gable end wall */}
      <mesh
        geometry={gableGeom}
        position={[0, 0, d / 2 - 0.04]}
        material={material}
        castShadow
      />
      {/* Back gable end wall */}
      <mesh
        geometry={gableGeom}
        position={[0, 0, -d / 2 - 0.04]}
        material={material}
        castShadow
      />
    </group>
  );
}
