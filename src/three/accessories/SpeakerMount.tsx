import { mmToM } from '@/utils/geometry';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';

export function SpeakerMount() {
  const { width, height } = useConfigStore((s) => s.dimensions);
  const features = useConfigStore((s) => s.features);
  const metalMat = useMetalMaterial('#222222');

  if (!features.includes('bluetooth_audio')) return null;

  const w = mmToM(width);
  const h = mmToM(height);

  return (
    <group position={[w / 2 - 0.05, h - 0.2, 0]}>
      {/* Speaker body */}
      <mesh material={metalMat} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
      </mesh>
      {/* Speaker cone */}
      <mesh position={[0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}
