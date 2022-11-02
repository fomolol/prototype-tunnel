/**
 * @file EffectsGlobal.js
 */
import * as React from 'react';
import * as THREE from 'three';
import {
  EffectComposer,
  Grid,
  ShockWave,
  SSAO,
  Pixelation,
  ScanlineEffect,
  Glitch,
  ToneMapping,
  LUT,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { FilmPass, ShaderPass, SSAOPass } from 'three-stdlib';
import {
  Canvas,
  useThree,
  useFrame,
  useLoader,
  extend,
} from '@react-three/fiber';

extend({ FilmPass, SSAOPass });

import { getLocalPosition } from '@/utils';

import { useControls } from 'leva';

import { useStore } from '@/store';

import PropTypes from 'prop-types';

const BackgroundPlane = () => {
  const { size, viewport } = useThree();
  return (
    <mesh>
      <planeBufferGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

const FX = ({ autoClear = true, enabled = true }) => {
  const composer = React.useRef();
  return (
    <EffectComposer
      ref={composer}
      enabled={enabled}
      // disableGamma
      // multisampling={8}
      autoClear={autoClear}
      className="pointer-events-none"
    >
      <Noise blendFunction={BlendFunction.MULTIPLY} opacity={0.6} />
      {/* <Glitch /> */}
      <ToneMapping adaptive={true} blendFunction={BlendFunction.MULTIPLY} />
    </EffectComposer>
  );
};

const EffectsGlobal = ({ autoClear = true, enabled = true }) => {
  return (
    <Canvas
      raycaster={false}
      // legacy
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'overlay',
      }}
    >
      <BackgroundPlane />
      <FX autoClear={autoClear} enabled={enabled} />
    </Canvas>
  );
};

EffectsGlobal.propTypes = {
  autoClear: PropTypes.bool,
  enabled: PropTypes.bool,
};

export default EffectsGlobal;
