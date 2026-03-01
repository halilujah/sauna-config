import { useMemo } from 'react';
import { mmToM } from '@/utils/geometry';
import { useWoodMaterial } from '@/three/materials/WoodMaterial';
import { useConfigStore } from '@/store/useConfigStore';

const BENCH_DEPTH = 500; // mm
const PLANK_GAP = 5; // mm
const PLANK_HEIGHT = 25; // mm
const PLANK_COUNT = 6;

export function SaunaBenches() {
  const { width, depth, seats } = useConfigStore((s) => s.dimensions);
  const bench = useConfigStore((s) => s.materials.bench);
  const material = useWoodMaterial(bench);

  const w = mmToM(width);
  const d = mmToM(depth);
  const benchD = mmToM(BENCH_DEPTH);
  const plankH = mmToM(PLANK_HEIGHT);
  const plankGap = mmToM(PLANK_GAP);

  const tiers = useMemo(() => {
    const heights = [0.45, 0.85, 1.2];
    return heights.slice(0, seats);
  }, [seats]);

  const plankWidth = (benchD - (PLANK_COUNT - 1) * mmToM(PLANK_GAP)) / PLANK_COUNT;

  return (
    <group>
      {tiers.map((tierHeight, tierIdx) => (
        <group key={tierIdx} position={[-w / 2 + benchD / 2 + 0.05, tierHeight, 0]}>
          {/* Planks */}
          {Array.from({ length: PLANK_COUNT }).map((_, i) => (
            <mesh
              key={`plank-${i}`}
              position={[
                -benchD / 2 + plankWidth / 2 + i * (plankWidth + plankGap),
                0,
                0,
              ]}
              castShadow
              material={material}
            >
              <boxGeometry args={[plankWidth, plankH, d * 0.85]} />
            </mesh>
          ))}

          {/* Support legs */}
          <mesh position={[-benchD / 2 + 0.03, -tierHeight / 2 + 0.025, -d * 0.3]} castShadow material={material}>
            <boxGeometry args={[0.05, tierHeight, 0.05]} />
          </mesh>
          <mesh position={[-benchD / 2 + 0.03, -tierHeight / 2 + 0.025, d * 0.3]} castShadow material={material}>
            <boxGeometry args={[0.05, tierHeight, 0.05]} />
          </mesh>
          <mesh position={[benchD / 2 - 0.03, -tierHeight / 2 + 0.025, -d * 0.3]} castShadow material={material}>
            <boxGeometry args={[0.05, tierHeight, 0.05]} />
          </mesh>
          <mesh position={[benchD / 2 - 0.03, -tierHeight / 2 + 0.025, d * 0.3]} castShadow material={material}>
            <boxGeometry args={[0.05, tierHeight, 0.05]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
