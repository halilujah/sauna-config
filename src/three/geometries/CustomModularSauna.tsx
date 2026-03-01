import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useConfigStore } from '@/store/useConfigStore';

const WALL_THICKNESS = 80; // mm

export function CustomModularSauna() {
  const { width, depth, height } = useConfigStore((s) => s.dimensions);
  const exterior = useConfigStore((s) => s.materials.exterior);
  const interior = useConfigStore((s) => s.materials.interior);
  const extMat = useWoodMaterial(exterior);
  const intMat = useWoodMaterial(interior);

  const w = mmToM(width);
  const d = mmToM(depth);
  const h = mmToM(height);
  const wt = mmToM(WALL_THICKNESS);

  // Main room dimensions
  const mainW = w * 0.6;
  const mainD = d;

  // Extension (L-shape wing)
  const extW = w;
  const extD = d * 0.45;

  return (
    <group>
      {/* Main room */}
      <group position={[-w / 2 + mainW / 2, 0, 0]}>
        {/* Back wall */}
        <mesh position={[0, h / 2, -mainD / 2]} castShadow material={extMat}>
          <boxGeometry args={[mainW, h, wt]} />
        </mesh>
        {/* Left wall */}
        <mesh position={[-mainW / 2, h / 2, 0]} castShadow material={extMat}>
          <boxGeometry args={[wt, h, mainD]} />
        </mesh>
        {/* Front wall */}
        <mesh position={[0, h / 2, mainD / 2]} castShadow material={extMat}>
          <boxGeometry args={[mainW, h, wt]} />
        </mesh>
        {/* Right wall (partial - leave opening for extension) */}
        <mesh position={[mainW / 2, h / 2, -mainD / 2 + (mainD - extD) / 2]} castShadow material={extMat}>
          <boxGeometry args={[wt, h, mainD - extD]} />
        </mesh>
        {/* Floor */}
        <mesh position={[0, 0.025, 0]} receiveShadow material={intMat}>
          <boxGeometry args={[mainW, 0.05, mainD]} />
        </mesh>
        {/* Ceiling */}
        <mesh position={[0, h, 0]} material={extMat}>
          <boxGeometry args={[mainW + 0.1, 0.06, mainD + 0.1]} />
        </mesh>
      </group>

      {/* Extension (L-shape wing) */}
      <group position={[w / 2 - (extW - mainW) / 2, 0, d / 2 - extD / 2]}>
        {/* Back wall */}
        <mesh position={[0, h / 2, -extD / 2]} castShadow material={extMat}>
          <boxGeometry args={[extW - mainW, h, wt]} />
        </mesh>
        {/* Right wall */}
        <mesh position={[(extW - mainW) / 2, h / 2, 0]} castShadow material={extMat}>
          <boxGeometry args={[wt, h, extD]} />
        </mesh>
        {/* Front wall */}
        <mesh position={[0, h / 2, extD / 2]} castShadow material={extMat}>
          <boxGeometry args={[extW - mainW, h, wt]} />
        </mesh>
        {/* Floor */}
        <mesh position={[0, 0.025, 0]} receiveShadow material={intMat}>
          <boxGeometry args={[extW - mainW, 0.05, extD]} />
        </mesh>
        {/* Ceiling */}
        <mesh position={[0, h, 0]} material={extMat}>
          <boxGeometry args={[extW - mainW + 0.1, 0.06, extD + 0.1]} />
        </mesh>
      </group>
    </group>
  );
}
