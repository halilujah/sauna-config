import { useConfigStore } from '@/store/useConfigStore';

export function Lighting() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const isOutdoor = saunaType === 'outdoor';

  return (
    <>
      <ambientLight intensity={isOutdoor ? 0.5 : 0.6} />
      <directionalLight
        position={[8, 10, 5]}
        intensity={isOutdoor ? 1.5 : 1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight
        position={[-4, 6, -3]}
        intensity={0.3}
      />
      {/* Warm interior glow */}
      <pointLight
        position={[0, 1.2, 0]}
        intensity={0.4}
        color="#ffaa55"
        distance={4}
      />
    </>
  );
}
