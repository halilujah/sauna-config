import { OrbitControls } from '@react-three/drei';

export function CameraController() {
  return (
    <OrbitControls
      enablePan={false}
      minDistance={2}
      maxDistance={10}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minPolarAngle={0.2}
    />
  );
}
