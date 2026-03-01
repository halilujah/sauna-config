import { mmToM } from '@/utils/geometry';
import { useMetalMaterial } from '@/three/materials/MetalMaterial';
import { useConfigStore } from '@/store/useConfigStore';

export function HeaterModel() {
  const { width, depth, height } = useConfigStore((s) => s.dimensions);
  const heater = useConfigStore((s) => s.heater);
  const shape = useConfigStore((s) => s.shape);
  const metalMat = useMetalMaterial('#333333');
  const stoneMat = useMetalMaterial('#888888');

  const w = mmToM(width);
  const d = mmToM(depth);
  const h = mmToM(height);

  // Position in back-right corner
  const baseY = shape === 'barrel' ? mmToM(width) / 2 - mmToM(width) / 2 + 0.15 : 0.05;
  const posX = w / 2 - 0.3;
  const posZ = -d / 2 + 0.3;

  if (heater.type === 'infrared') {
    // Wall-mounted panels
    return (
      <group>
        {/* Panel on back wall */}
        <mesh position={[0, h * 0.6, -d / 2 + 0.05]} material={metalMat} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.04]} />
        </mesh>
        {/* Panel on side wall */}
        <mesh position={[w / 2 - 0.05, h * 0.6, 0]} material={metalMat} castShadow>
          <boxGeometry args={[0.04, 0.8, 0.6]} />
        </mesh>
        {/* Glow indicators */}
        <pointLight position={[0, h * 0.6, -d / 2 + 0.1]} color="#ff4400" intensity={0.3} distance={1.5} />
      </group>
    );
  }

  return (
    <group position={[posX, baseY, posZ]}>
      {/* Heater body */}
      {heater.type === 'wood_burning' ? (
        // Wood-burning stove - box shape
        <>
          <mesh position={[0, 0.25, 0]} material={metalMat} castShadow>
            <boxGeometry args={[0.35, 0.5, 0.35]} />
          </mesh>
          {/* Stove door */}
          <mesh position={[0, 0.2, 0.18]} material={useMetalMaterial('#222222')}>
            <boxGeometry args={[0.15, 0.15, 0.01]} />
          </mesh>
          {/* Chimney */}
          {heater.chimney && (
            <mesh position={[0, (h - baseY) / 2 + 0.5, 0]} material={metalMat} castShadow>
              <cylinderGeometry args={[0.06, 0.06, h - baseY, 12]} />
            </mesh>
          )}
        </>
      ) : (
        // Electric / hybrid - cylinder
        <>
          <mesh position={[0, 0.2, 0]} material={metalMat} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
          </mesh>
          {/* Stone cage */}
          <mesh position={[0, 0.45, 0]} material={stoneMat} castShadow>
            <cylinderGeometry args={[0.17, 0.15, 0.12, 16]} />
          </mesh>
          {/* Stones */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(i * 1.25) * 0.08,
                0.55 + Math.random() * 0.05,
                Math.sin(i * 1.25) * 0.08,
              ]}
              material={stoneMat}
            >
              <dodecahedronGeometry args={[0.035, 0]} />
            </mesh>
          ))}
        </>
      )}

      {/* Warm glow from heater */}
      <pointLight position={[0, 0.3, 0]} color="#ff6622" intensity={0.5} distance={2} />
    </group>
  );
}
