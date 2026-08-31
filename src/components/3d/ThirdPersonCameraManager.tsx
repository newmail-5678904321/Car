import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type ThirdPersonPreset = 'REAR' | 'REAR_34' | 'SIDE' | 'FRONT';

interface ThirdPersonCameraManagerProps {
  isThirdPerson: boolean;
  preset: ThirdPersonPreset;
  resetTrigger: number;
}

// Preset camera offsets relative to vehicle center (Vehicle faces +Z in local coordinates)
// Vehicle local: Front = +Z, Back = -Z, Right = +X, Left = -X, Top = +Y
const PRESET_OFFSETS: Record<ThirdPersonPreset, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  REAR: {
    // Behind vehicle, slightly elevated, looking along roofline/hood
    pos: new THREE.Vector3(0, 1.45, -4.8),
    target: new THREE.Vector3(0, 0.6, 0.4),
  },
  REAR_34: {
    // Behind vehicle, offset to the left for a high-end follow stance
    pos: new THREE.Vector3(-2.8, 1.35, -4.4),
    target: new THREE.Vector3(0, 0.55, 0.3),
  },
  SIDE: {
    // Parallel tracking shot along driver flank
    pos: new THREE.Vector3(-4.6, 1.15, 0.2),
    target: new THREE.Vector3(0, 0.5, 0.1),
  },
  FRONT: {
    // Ahead of vehicle looking back towards grille and windshield
    pos: new THREE.Vector3(0, 1.15, 4.8),
    target: new THREE.Vector3(0, 0.55, -0.2),
  },
};

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export const ThirdPersonCameraManager: React.FC<ThirdPersonCameraManagerProps> = ({
  isThirdPerson,
  preset,
  resetTrigger,
}) => {
  const { camera } = useThree();

  const isTransitioning = useRef(false);
  const transitionProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3(0, 0.6, 0.4));

  const activePresetRef = useRef<ThirdPersonPreset>(preset);

  // Transition when entering Third-Person Mode or changing Presets or resetting view
  useEffect(() => {
    if (isThirdPerson) {
      const config = PRESET_OFFSETS[preset] || PRESET_OFFSETS.REAR;
      startPos.current.copy(camera.position);
      startTarget.current.copy(currentTarget.current);

      transitionProgress.current = 0;
      isTransitioning.current = true;
      activePresetRef.current = preset;
    } else {
      isTransitioning.current = false;
    }
  }, [isThirdPerson, preset, resetTrigger]);

  useFrame((_, delta) => {
    if (!isThirdPerson) return;

    const clampedDelta = Math.min(delta, 0.1);
    const config = PRESET_OFFSETS[activePresetRef.current] || PRESET_OFFSETS.REAR;

    if (isTransitioning.current) {
      transitionProgress.current += clampedDelta * 2.2; // ~0.45s smooth transition
      const t = Math.min(1.0, transitionProgress.current);
      const eased = easeInOutQuad(t);

      camera.position.lerpVectors(startPos.current, config.pos, eased);
      currentTarget.current.lerpVectors(startTarget.current, config.target, eased);
      camera.lookAt(currentTarget.current);

      if (t >= 1.0) {
        isTransitioning.current = false;
      }
    } else {
      // Subtle smooth damping keeping camera precisely aligned
      camera.position.lerp(config.pos, 6.0 * clampedDelta);
      currentTarget.current.lerp(config.target, 6.0 * clampedDelta);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
};
