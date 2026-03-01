import { Environment } from '@react-three/drei';
import { useConfigStore } from '@/store/useConfigStore';

export function BackgroundEnv() {
  const saunaType = useConfigStore((s) => s.saunaType);

  return (
    <Environment
      preset={saunaType === 'outdoor' ? 'sunset' : 'apartment'}
      background={false}
    />
  );
}
