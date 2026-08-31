import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface CinematicShot {
  id: string;
  name: string;
  sub: string;
  // Starting camera position and target
  startPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  // Ending camera position and target over duration
  endPos: THREE.Vector3;
  endTarget: THREE.Vector3;
  duration: number; // in seconds
}

export const CINEMATIC_SHOTS: CinematicShot[] = [
  {
    id: 'shot_1',
    name: 'HERO FRONT 3/4',
    sub: 'SCULPTED SILHOUETTE',
    startPos: new THREE.Vector3(-4.6, 1.35, 4.4),
    startTarget: new THREE.Vector3(0, 0.45, 0.2),
    endPos: new THREE.Vector3(-3.8, 1.15, 4.8),
    endTarget: new THREE.Vector3(0, 0.42, 0.4),
    duration: 6.5,
  },
  {
    id: 'shot_2',
    name: 'LOW FRONT FASCIA',
    sub: 'CRYSTAL PROJECTOR ILLUMINATION',
    startPos: new THREE.Vector3(-1.8, 0.65, 3.6),
    startTarget: new THREE.Vector3(-0.2, 0.4, 1.2),
    endPos: new THREE.Vector3(1.6, 0.55, 3.8),
    endTarget: new THREE.Vector3(0.2, 0.38, 1.0),
    duration: 6.0,
  },
  {
    id: 'shot_3',
    name: 'AERODYNAMIC SIDE PROFILE',
    sub: 'CARBON DUCTS & PROPORTIONS',
    startPos: new THREE.Vector3(-4.8, 1.1, 1.5),
    startTarget: new THREE.Vector3(0, 0.45, 0.1),
    endPos: new THREE.Vector3(-5.0, 1.25, -1.8),
    endTarget: new THREE.Vector3(0, 0.48, -0.2),
    duration: 7.0,
  },
  {
    id: 'shot_4',
    name: 'REAR HAUNCHES & DECK',
    sub: 'OLED TAILLIGHT SIGNATURE',
    startPos: new THREE.Vector3(-3.6, 1.45, -3.8),
    startTarget: new THREE.Vector3(0, 0.55, -0.6),
    endPos: new THREE.Vector3(-1.2, 1.2, -4.5),
    endTarget: new THREE.Vector3(0, 0.52, -1.0),
    duration: 6.0,
  },
  {
    id: 'shot_5',
    name: 'LOW REAR DIFFUSER',
    sub: 'TITANIUM QUAD EXHAUST STANCE',
    startPos: new THREE.Vector3(1.8, 0.55, -4.2),
    startTarget: new THREE.Vector3(0, 0.42, -1.2),
    endPos: new THREE.Vector3(-1.6, 0.65, -4.4),
    endTarget: new THREE.Vector3(0, 0.42, -1.2),
    duration: 5.5,
  },
  {
    id: 'shot_6',
    name: 'WIDE ALPINE PANORAMA',
    sub: 'MOUNTAIN PASS GRANDEUR',
    startPos: new THREE.Vector3(6.2, 2.2, 5.0),
    startTarget: new THREE.Vector3(0, 0.45, 0),
    endPos: new THREE.Vector3(5.2, 1.8, -4.2),
    endTarget: new THREE.Vector3(0, 0.45, 0),
    duration: 8.0,
  },
];

// Smoothstep cubic easing function
function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// Ease In Out Quad
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

interface CinematicCameraManagerProps {
  isCinematic: boolean;
  isPaused: boolean;
  currentShotIndex: number;
  onShotChange: (index: number) => void;
}

export const CinematicCameraManager: React.FC<CinematicCameraManagerProps> = ({
  isCinematic,
  isPaused,
  currentShotIndex,
  onShotChange,
}) => {
  const { camera } = useThree();

  // Transition state when entering Cinematic View
  const isTransitioning = useRef(false);
  const transitionProgress = useRef(0);
  const transitionStartPos = useRef(new THREE.Vector3());
  const transitionStartTarget = useRef(new THREE.Vector3());
  const transitionTargetPos = useRef(new THREE.Vector3());
  const transitionTargetLook = useRef(new THREE.Vector3());

  // Shot progress state
  const shotProgress = useRef(0); // 0 to 1
  const activeShotIndexRef = useRef(currentShotIndex);
  activeShotIndexRef.current = currentShotIndex;

  const currentLookAt = useRef(new THREE.Vector3(0, 0.45, 0));

  // Initialize transition when isCinematic switches to true
  useEffect(() => {
    if (isCinematic) {
      const targetShot = CINEMATIC_SHOTS[currentShotIndex] || CINEMATIC_SHOTS[0];
      transitionStartPos.current.copy(camera.position);
      transitionStartTarget.current.copy(currentLookAt.current);

      transitionTargetPos.current.copy(targetShot.startPos);
      transitionTargetLook.current.copy(targetShot.startTarget);

      transitionProgress.current = 0;
      isTransitioning.current = true;
      shotProgress.current = 0;
    } else {
      isTransitioning.current = false;
    }
  }, [isCinematic]);

  // When shot changes manually (next/prev) while cinematic is active
  useEffect(() => {
    if (isCinematic && !isTransitioning.current) {
      const targetShot = CINEMATIC_SHOTS[currentShotIndex] || CINEMATIC_SHOTS[0];
      transitionStartPos.current.copy(camera.position);
      transitionStartTarget.current.copy(currentLookAt.current);

      transitionTargetPos.current.copy(targetShot.startPos);
      transitionTargetLook.current.copy(targetShot.startTarget);

      transitionProgress.current = 0;
      isTransitioning.current = true;
      shotProgress.current = 0;
    }
  }, [currentShotIndex]);

  useFrame((_, delta) => {
    if (!isCinematic) return;

    const clampedDelta = Math.min(delta, 0.1); // Prevent huge time steps on lag

    // Phase 1: Smoothly blend camera into the shot's starting position
    if (isTransitioning.current) {
      transitionProgress.current += clampedDelta * 1.2; // ~0.8s transition
      const t = Math.min(1.0, transitionProgress.current);
      const eased = easeInOutQuad(t);

      camera.position.lerpVectors(transitionStartPos.current, transitionTargetPos.current, eased);
      currentLookAt.current.lerpVectors(transitionStartTarget.current, transitionTargetLook.current, eased);
      camera.lookAt(currentLookAt.current);

      if (t >= 1.0) {
        isTransitioning.current = false;
        shotProgress.current = 0;
      }
      return;
    }

    // Phase 2: Cinematic Shot Motion
    const shot = CINEMATIC_SHOTS[activeShotIndexRef.current] || CINEMATIC_SHOTS[0];

    if (!isPaused) {
      shotProgress.current += clampedDelta / shot.duration;
    }

    const t = Math.min(1.0, shotProgress.current);
    const easedT = smoothstep(0, 1, t);

    // Interpolate camera along curved cinematic vector
    camera.position.lerpVectors(shot.startPos, shot.endPos, easedT);
    currentLookAt.current.lerpVectors(shot.startTarget, shot.endTarget, easedT);
    camera.lookAt(currentLookAt.current);

    // When current shot finishes, transition to next shot seamlessly
    if (shotProgress.current >= 1.0) {
      const nextIndex = (activeShotIndexRef.current + 1) % CINEMATIC_SHOTS.length;
      onShotChange(nextIndex);

      const nextShot = CINEMATIC_SHOTS[nextIndex];
      transitionStartPos.current.copy(camera.position);
      transitionStartTarget.current.copy(currentLookAt.current);

      transitionTargetPos.current.copy(nextShot.startPos);
      transitionTargetLook.current.copy(nextShot.startTarget);

      transitionProgress.current = 0;
      isTransitioning.current = true;
      shotProgress.current = 0;
    }
  });

  return null;
};
