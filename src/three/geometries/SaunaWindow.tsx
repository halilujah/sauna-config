import { mmToM } from '@/utils/geometry';
import { useGlassMaterial } from '@/three/materials/GlassMaterial';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';

const WINDOW_SIZE = 500; // mm square

export function SaunaWindow() {
  const { width, height } = useConfigStore((s) => s.dimensions);
  const features = useConfigStore((s) => s.features);
  const glassMat = useGlassMaterial('clear');
  const metalMat = useMetalMaterial('#666666');

  if (!features.includes('window')) return null;

  const ws = mmToM(WINDOW_SIZE);
  const ft = 0.03;
  const w = mmToM(width);

  return (
    <group position={[w / 2, mmToM(height) * 0.6, 0]}>
      {/* Glass */}
      <mesh material={glassMat}>
        <boxGeometry args={[0.01, ws, ws]} />
      </mesh>
      {/* Frame */}
      <mesh position={[0, ws / 2 - ft / 2, 0]} material={metalMat}>
        <boxGeometry args={[0.05, ft, ws]} />
      </mesh>
      <mesh position={[0, -ws / 2 + ft / 2, 0]} material={metalMat}>
        <boxGeometry args={[0.05, ft, ws]} />
      </mesh>
      <mesh position={[0, 0, ws / 2 - ft / 2]} material={metalMat}>
        <boxGeometry args={[0.05, ws, ft]} />
      </mesh>
      <mesh position={[0, 0, -ws / 2 + ft / 2]} material={metalMat}>
        <boxGeometry args={[0.05, ws, ft]} />
      </mesh>
    </group>
  );
}
