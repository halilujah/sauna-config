import { useMemo } from 'react';
import * as THREE from 'three';
import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';
import { DOOR_WIDTH, DOOR_HEIGHT } from './SaunaDoor';

export function BarrelSauna() {
  const { width, depth } = useConfigStore((s) => s.dimensions);
  const exterior = useConfigStore((s) => s.materials.exterior);
  const extMat = useWoodMaterial(exterior);
  const bandMat = useMetalMaterial('#444444');

  const radius = mmToM(width) / 2;
  const d = mmToM(depth);
  const dw = mmToM(DOOR_WIDTH);
  const dh = mmToM(DOOR_HEIGHT);

  // Front cap with door hole
  const frontCapGeom = useMemo(() => {
    const capShape = new THREE.Shape();
    capShape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    // Door hole
    const holePath = new THREE.Path();
    const halfDW = dw / 2;
    // Door starts from bottom of barrel
    const doorBottom = -radius + 0.05;
    holePath.moveTo(-halfDW, doorBottom);
    holePath.lineTo(halfDW, doorBottom);
    holePath.lineTo(halfDW, doorBottom + dh);
    holePath.lineTo(-halfDW, doorBottom + dh);
    holePath.lineTo(-halfDW, doorBottom);
    capShape.holes.push(holePath);

    return new THREE.ExtrudeGeometry(capShape, {
      depth: 0.06,
      bevelEnabled: false,
    });
  }, [radius, dw, dh]);

  // Back cap (solid)
  const backCapGeom = useMemo(() => {
    const capShape = new THREE.Shape();
    capShape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    return new THREE.ExtrudeGeometry(capShape, {
      depth: 0.06,
      bevelEnabled: false,
    });
  }, [radius]);

  // Number of barrel bands
  const bandCount = Math.max(2, Math.floor(d / 0.8));

  return (
    <group position={[0, radius, 0]}>
      {/* Barrel shell - cylinder on its side */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow material={extMat}>
        <cylinderGeometry args={[radius, radius, d, 32, 1, true]} />
      </mesh>

      {/* Front cap with door hole */}
      <mesh
        geometry={frontCapGeom}
        position={[0, 0, d / 2 - 0.06]}
        castShadow
        material={extMat}
      />

      {/* Back cap */}
      <mesh
        geometry={backCapGeom}
        position={[0, 0, -d / 2]}
        castShadow
        material={extMat}
      />

      {/* Metal bands */}
      {Array.from({ length: bandCount }).map((_, i) => {
        const z = -d / 2 + (d / (bandCount + 1)) * (i + 1);
        return (
          <mesh key={i} position={[0, 0, z]} rotation={[0, 0, 0]} material={bandMat}>
            <torusGeometry args={[radius + 0.005, 0.012, 8, 32]} />
          </mesh>
        );
      })}

      {/* Flat floor inside barrel */}
      <mesh position={[0, -radius + 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[radius * 1.4, d * 0.9]} />
        <meshStandardMaterial color="#c9a86c" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
