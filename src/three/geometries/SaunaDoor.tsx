import { mmToM } from '@/utils/geometry';
import { useGlassMaterial } from '@/three/materials/GlassMaterial';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';

const DOOR_WIDTH = 700;  // mm
const DOOR_HEIGHT = 1800; // mm
const FRAME_THICKNESS = 40;

export function SaunaDoor() {
  const depth = useConfigStore((s) => s.dimensions.depth);
  const doorGlass = useConfigStore((s) => s.materials.doorGlass);
  const glassMat = useGlassMaterial(doorGlass);
  const metalMat = useMetalMaterial('#555555');

  const dw = mmToM(DOOR_WIDTH);
  const dh = mmToM(DOOR_HEIGHT);
  const ft = mmToM(FRAME_THICKNESS);
  const wallT = 0.08;
  const dDepth = mmToM(depth);

  // Door positioned slightly in front of the wall to avoid Z-fighting
  const doorZ = dDepth / 2 + wallT / 2 + 0.001;

  return (
    <group position={[0, dh / 2 + 0.05, doorZ]}>
      {/* Glass panel */}
      <mesh position={[0, 0, 0]} material={glassMat}>
        <boxGeometry args={[dw - ft * 2, dh - ft * 2, 0.01]} />
      </mesh>

      {/* Frame - top */}
      <mesh position={[0, dh / 2 - ft / 2, 0]} material={metalMat} castShadow>
        <boxGeometry args={[dw, ft, wallT]} />
      </mesh>
      {/* Frame - bottom */}
      <mesh position={[0, -dh / 2 + ft / 2, 0]} material={metalMat} castShadow>
        <boxGeometry args={[dw, ft, wallT]} />
      </mesh>
      {/* Frame - left */}
      <mesh position={[-dw / 2 + ft / 2, 0, 0]} material={metalMat} castShadow>
        <boxGeometry args={[ft, dh, wallT]} />
      </mesh>
      {/* Frame - right */}
      <mesh position={[dw / 2 - ft / 2, 0, 0]} material={metalMat} castShadow>
        <boxGeometry args={[ft, dh, wallT]} />
      </mesh>

      {/* Handle */}
      <mesh position={[dw / 2 - ft * 2, 0, wallT / 2 + 0.01]} material={metalMat}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
      </mesh>
    </group>
  );
}

export { DOOR_WIDTH, DOOR_HEIGHT };
