import { useConfigStore } from '@/store/useConfigStore';
import { RectangularSauna } from './geometries/RectangularSauna';
import { BarrelSauna } from './geometries/BarrelSauna';
import { CustomModularSauna } from './geometries/CustomModularSauna';
import { SaunaBenches } from './geometries/SaunaBenches';
import { SaunaDoor } from './geometries/SaunaDoor';
import { SaunaWindow } from './geometries/SaunaWindow';
import { SaunaRoof } from './geometries/SaunaRoof';
import { SaunaFloor } from './geometries/SaunaFloor';
import { HeaterModel } from './accessories/HeaterModel';
import { LEDLighting } from './accessories/LEDLighting';
import { VentilationGrill } from './accessories/VentilationGrill';
import { SpeakerMount } from './accessories/SpeakerMount';

export function SaunaModel() {
  const shape = useConfigStore((s) => s.shape);

  return (
    <group>
      {/* Main shape */}
      {shape === 'rectangular' && <RectangularSauna />}
      {shape === 'barrel' && <BarrelSauna />}
      {shape === 'custom_modular' && <CustomModularSauna />}

      {/* Shared components */}
      {shape !== 'barrel' && <SaunaFloor />}
      <SaunaDoor />
      <SaunaBenches />
      <SaunaRoof />
      <SaunaWindow />

      {/* Accessories */}
      <HeaterModel />
      <LEDLighting />
      <VentilationGrill />
      <SpeakerMount />
    </group>
  );
}
