import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SaunaModel } from './SaunaModel';
import { Lighting } from './environment/Lighting';
import { Ground } from './environment/Ground';
import { BackgroundEnv } from './environment/BackgroundEnv';
import { CameraController } from './controls/CameraController';

export function SaunaScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 3, 4], fov: 50 }}
      dpr={[1, 2]}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Lighting />
        <Ground />
        <BackgroundEnv />
        <SaunaModel />
        <CameraController />
      </Suspense>
    </Canvas>
  );
}
