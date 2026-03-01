import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useConfigStore } from '@/store/useConfigStore';

export function SaunaFloor() {
  const { width, depth } = useConfigStore((s) => s.dimensions);
  const interior = useConfigStore((s) => s.materials.interior);
  const material = useWoodMaterial(interior);

  const w = mmToM(width);
  const d = mmToM(depth);
  const thickness = 0.05;

  return (
    <mesh position={[0, thickness / 2, 0]} receiveShadow material={material}>
      <boxGeometry args={[w, thickness, d]} />
    </mesh>
  );
}
