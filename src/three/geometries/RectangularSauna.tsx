import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useConfigStore } from '@/store/useConfigStore';
import { DOOR_WIDTH, DOOR_HEIGHT } from './SaunaDoor';

const WALL_THICKNESS = 80; // mm

export function RectangularSauna() {
  const { width, depth, height } = useConfigStore((s) => s.dimensions);
  const exterior = useConfigStore((s) => s.materials.exterior);
  const interior = useConfigStore((s) => s.materials.interior);
  const extMat = useWoodMaterial(exterior);
  const intMat = useWoodMaterial(interior);

  const w = mmToM(width);
  const d = mmToM(depth);
  const h = mmToM(height);
  const wt = mmToM(WALL_THICKNESS);
  const dw = mmToM(DOOR_WIDTH);
  const dh = mmToM(DOOR_HEIGHT);

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, h / 2, -d / 2]} castShadow receiveShadow material={extMat}>
        <boxGeometry args={[w, h, wt]} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-w / 2, h / 2, 0]} castShadow receiveShadow material={extMat}>
        <boxGeometry args={[wt, h, d]} />
      </mesh>

      {/* Right wall */}
      <mesh position={[w / 2, h / 2, 0]} castShadow receiveShadow material={extMat}>
        <boxGeometry args={[wt, h, d]} />
      </mesh>

      {/* Front wall - left section */}
      <mesh
        position={[-(w / 2 - (w / 2 - dw / 2) / 2), h / 2, d / 2]}
        castShadow
        receiveShadow
        material={extMat}
      >
        <boxGeometry args={[(w / 2 - dw / 2), h, wt]} />
      </mesh>

      {/* Front wall - right section */}
      <mesh
        position={[(w / 2 - (w / 2 - dw / 2) / 2), h / 2, d / 2]}
        castShadow
        receiveShadow
        material={extMat}
      >
        <boxGeometry args={[(w / 2 - dw / 2), h, wt]} />
      </mesh>

      {/* Front wall - above door */}
      <mesh
        position={[0, dh + 0.05 + (h - dh - 0.05) / 2, d / 2]}
        castShadow
        receiveShadow
        material={extMat}
      >
        <boxGeometry args={[dw, h - dh - 0.05, wt]} />
      </mesh>

      {/* Interior lining (slightly inside each wall) */}
      <mesh position={[0, h / 2, -d / 2 + wt]} material={intMat}>
        <boxGeometry args={[w - wt * 2, h - 0.1, 0.01]} />
      </mesh>
      <mesh position={[-w / 2 + wt, h / 2, 0]} material={intMat}>
        <boxGeometry args={[0.01, h - 0.1, d - wt * 2]} />
      </mesh>
      <mesh position={[w / 2 - wt, h / 2, 0]} material={intMat}>
        <boxGeometry args={[0.01, h - 0.1, d - wt * 2]} />
      </mesh>
    </group>
  );
}
