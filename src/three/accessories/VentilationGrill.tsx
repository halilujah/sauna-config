import { mmToM } from '@/utils/geometry';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';

export function VentilationGrill() {
  const { width, depth, height } = useConfigStore((s) => s.dimensions);
  const features = useConfigStore((s) => s.features);
  const metalMat = useMetalMaterial('#999999');

  if (!features.includes('ventilation')) return null;

  const w = mmToM(width);
  const d = mmToM(depth);
  const h = mmToM(height);

  return (
    <group>
      {/* Lower intake vent on front wall */}
      <mesh position={[w / 2 - 0.15, 0.25, d / 2 + 0.01]} material={metalMat}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
      </mesh>
      {/* Upper exhaust vent on back wall */}
      <mesh position={[-w / 2 + 0.15, h - 0.15, -d / 2 - 0.01]} material={metalMat}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
      </mesh>
      {/* Vent slats (decorative) */}
      {[0, 1, 2].map((i) => (
        <mesh key={`slat-front-${i}`} position={[w / 2 - 0.15, 0.22 + i * 0.03, d / 2 + 0.02]}>
          <boxGeometry args={[0.12, 0.005, 0.005]} />
          <meshStandardMaterial color="#777" />
        </mesh>
      ))}
    </group>
  );
}
