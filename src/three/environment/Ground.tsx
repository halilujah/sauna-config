import { useConfigStore } from '@/store/useConfigStore';

export function Ground() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const isOutdoor = saunaType === 'outdoor';

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color={isOutdoor ? '#7a9a5a' : '#d4d0c8'}
        roughness={isOutdoor ? 0.9 : 0.5}
      />
    </mesh>
  );
}
