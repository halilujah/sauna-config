import { Environment } from '@react-three/drei';
import { useConfigStore } from '@/store/useConfigStore';

const HDRI_CDN_ROOT = 'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/hdri/';

export function BackgroundEnv() {
  const saunaType = useConfigStore((s) => s.saunaType);
  const environmentFile = saunaType === 'outdoor' ? 'venice_sunset_1k.hdr' : 'lebombo_1k.hdr';

  return (
    <Environment
      files={environmentFile}
      path={HDRI_CDN_ROOT}
      extensions={(loader) => loader.setCrossOrigin('anonymous')}
      background={false}
    />
  );
}
