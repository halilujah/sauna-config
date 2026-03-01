import { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SaunaScene } from '@/three/SaunaScene';
import { loadFromShareLink } from '@/engine/serialization';
import { useConfigStore } from '@/store/useConfigStore';

export function ConfiguratorPage() {
  const loadConfig = useConfigStore((s) => s.loadConfig);

  useEffect(() => {
    const shared = loadFromShareLink();
    if (shared) {
      loadConfig(shared);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [loadConfig]);

  return <AppLayout viewer={<SaunaScene />} />;
}
