import { mmToM } from '@/utils/geometry';
import { useConfigStore } from '@/store/useConfigStore';

export function LEDLighting() {
  const { width, height } = useConfigStore((s) => s.dimensions);
  const features = useConfigStore((s) => s.features);

  const hasStrip = features.includes('led_strip');
  const hasSpot = features.includes('led_spot');
  const hasRGB = features.includes('led_rgb');

  if (!hasStrip && !hasSpot && !hasRGB) return null;

  const w = mmToM(width);
  const h = mmToM(height);
  const color = hasRGB ? '#6644ff' : '#ffcc88';

  return (
    <group>
      {/* Strip along top edge */}
      {(hasStrip || hasRGB) && (
        <>
          <mesh position={[0, h - 0.05, 0]}>
            <boxGeometry args={[w * 0.9, 0.02, 0.02]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
          <pointLight position={[0, h - 0.1, 0]} color={color} intensity={0.4} distance={3} />
        </>
      )}

      {/* Spot lights */}
      {hasSpot && (
        <>
          <spotLight
            position={[-w / 4, h - 0.02, 0]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.6}
            color="#fff5e0"
            distance={3}
          />
          <spotLight
            position={[w / 4, h - 0.02, 0]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.6}
            color="#fff5e0"
            distance={3}
          />
        </>
      )}
    </group>
  );
}
