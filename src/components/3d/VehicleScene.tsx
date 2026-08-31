import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Vehicle, OutdoorLocation, PerspectivePreset, AutomotiveFinishType } from '../../types';
import { VehicleModelRenderer } from './VehicleModelRenderer';

import { ShowroomEnvironment } from './ShowroomEnvironment';
import { OutdoorEnvironment } from './OutdoorEnvironment';
import { ExplodedComponentData, getVehicleExplodedParts } from '../../data/explodedParts';
import { CinematicCameraManager } from './CinematicCameraManager';
import { ThirdPersonCameraManager, ThirdPersonPreset } from './ThirdPersonCameraManager';
import { getVehicle3DConfig, getVehicleHotspots } from '../../data/vehicle3DRegistry';
import { ScreenSpaceHotspotTracker, ScreenHotspotItem, ProjectedScreenHotspot } from './ScreenSpaceHotspotTracker';

interface VehicleSceneProps {
  vehicle: Vehicle;
  modelUrl?: string;
  selectedColorHex?: string;
  finishType?: AutomotiveFinishType;
  resetTrigger: number;
  viewMode: 'STANDARD' | 'CINEMATIC' | 'TRACKING';
  environmentMode: 'OUTDOOR' | 'SHOWROOM';
  outdoorLocation?: OutdoorLocation;
  showHotspots?: boolean;
  isExploded?: boolean;
  activeExplodedPart?: ExplodedComponentData | null;
  onSelectExplodedPart?: (part: ExplodedComponentData) => void;
  perspectivePreset?: PerspectivePreset;
  isCinematicPaused: boolean;
  currentShotIndex: number;
  thirdPersonPreset: ThirdPersonPreset;
  onShotChange: (index: number) => void;
  onUserInteraction?: () => void;
  onModelLoadedState?: (loaded: boolean, hasSeparableNodes: boolean) => void;
  onError?: (err: Error) => void;
  onProjectedHotspots?: (hotspots: ProjectedScreenHotspot[]) => void;
}

// Dynamic Camera Preset Rig for Standard View & Single Component Inspection
const CameraPresetRig: React.FC<{
  resetTrigger: number;
  active: boolean;
  vehicle: Vehicle;
  perspectivePreset?: PerspectivePreset;
  isolatedPart?: ExplodedComponentData | null;
}> = ({ resetTrigger, active, vehicle, perspectivePreset = 'DEFAULT', isolatedPart }) => {
  const { camera, controls } = useThree();
  const isMoving = useRef(false);

  // Distance tuned to frame car at 55-70% of viewport
  const camDist = 4.85;
  const camHeight = 1.32;
  const targetY = 0.45;

  // Calculate target position based on isolated component or perspective preset
  const { targetPos, lookTarget } = useMemo(() => {
    // If a single component is isolated, smoothly frame it
    if (isolatedPart) {
      return {
        targetPos: new THREE.Vector3(...isolatedPart.cameraPosition),
        lookTarget: new THREE.Vector3(...isolatedPart.cameraTarget),
      };
    }

    let pos = new THREE.Vector3(-camDist * 0.72, camHeight, camDist * 0.72);
    let look = new THREE.Vector3(0, targetY, 0.1);

    switch (perspectivePreset) {
      case 'FRONT_3_4':
        pos = new THREE.Vector3(-camDist * 0.72, camHeight * 0.95, camDist * 0.72);
        look = new THREE.Vector3(0, targetY, 0.2);
        break;
      case 'REAR_3_4':
        pos = new THREE.Vector3(camDist * 0.72, camHeight * 0.95, -camDist * 0.72);
        look = new THREE.Vector3(0, targetY, -0.2);
        break;
      case 'SIDE':
        pos = new THREE.Vector3(-camDist * 0.98, camHeight * 0.85, 0);
        look = new THREE.Vector3(0, targetY, 0);
        break;
      case 'FRONT':
        pos = new THREE.Vector3(0, camHeight * 0.85, camDist * 0.98);
        look = new THREE.Vector3(0, targetY, 0.4);
        break;
      case 'REAR':
        pos = new THREE.Vector3(0, camHeight * 0.85, -camDist * 0.98);
        look = new THREE.Vector3(0, targetY, -0.4);
        break;
      case 'TOP':
        pos = new THREE.Vector3(0, camDist * 1.15, 0.05);
        look = new THREE.Vector3(0, 0.1, 0);
        break;
      case 'LOW_ANGLE':
        pos = new THREE.Vector3(-camDist * 0.65, 0.42, camDist * 0.68);
        look = new THREE.Vector3(0, 0.55, 0.2);
        break;
      case 'DRIVER_POV':
        pos = new THREE.Vector3(-0.34, 0.92, -0.15);
        look = new THREE.Vector3(-0.34, 0.85, 1.6);
        break;
      case 'COCKPIT_CENTER':
        pos = new THREE.Vector3(0, 0.95, -0.32);
        look = new THREE.Vector3(0, 0.85, 1.4);
        break;
      case 'DEFAULT':
      default:
        pos = new THREE.Vector3(-camDist * 0.72, camHeight, camDist * 0.72);
        look = new THREE.Vector3(0, targetY, 0.1);
        break;
    }

    return { targetPos: pos, lookTarget: look };
  }, [perspectivePreset, isolatedPart]);

  useEffect(() => {
    if (active) {
      isMoving.current = true;
    }
  }, [resetTrigger, perspectivePreset, active, isolatedPart]);

  useFrame((_, delta) => {
    if (!active || !isMoving.current) return;

    const orbit = controls as any;
    // Smooth cinematic camera damping over 600-1000ms
    const speed = isolatedPart ? 4.8 : 5.5;
    camera.position.lerp(targetPos, speed * delta);

    if (orbit && orbit.target) {
      orbit.target.lerp(lookTarget, speed * delta);
      orbit.update();
    }

    if (camera.position.distanceTo(targetPos) < 0.015) {
      camera.position.copy(targetPos);
      if (orbit && orbit.target) {
        orbit.target.copy(lookTarget);
        orbit.update();
      }
      isMoving.current = false;
    }
  });

  return null;
};

export const VehicleScene: React.FC<VehicleSceneProps> = ({
  vehicle,
  modelUrl,
  selectedColorHex,
  finishType = 'METALLIC',
  resetTrigger,
  viewMode,
  environmentMode,
  outdoorLocation = 'ALPINE',
  showHotspots = true,
  isExploded = false,
  activeExplodedPart = null,
  onSelectExplodedPart,
  perspectivePreset = 'DEFAULT',
  isCinematicPaused,
  currentShotIndex,
  thirdPersonPreset,
  onShotChange,
  onUserInteraction,
  onModelLoadedState,
  onError,
  onProjectedHotspots,
}) => {
  const config = useMemo(() => getVehicle3DConfig(vehicle), [vehicle]);
  const [hasModelError, setHasModelError] = useState(false);

  const effectiveColorHex = selectedColorHex || vehicle.paintOptions?.[0]?.hex || vehicle.accentColor || '#d40000';
  const effectiveModelUrl = modelUrl || config.modelUrl || vehicle.model3D;

  // Active Hotspots for 2D Screen-Space Tracker Layer
  const activeHotspotItems = useMemo<ScreenHotspotItem[]>(() => {
    if (viewMode !== 'STANDARD' || activeExplodedPart) {
      return [];
    }

    if (isExploded) {
      const parts = getVehicleExplodedParts(vehicle);
      return parts.map((part) => ({
        id: part.id,
        category: part.category,
        name: part.name,
        description: part.description,
        metricLabel: part.metricLabel,
        metricValue: part.metricValue,
        worldPosition: part.position,
        type: 'EXPLODED',
        data: part,
      }));
    }

    if (showHotspots) {
      const hotspots = getVehicleHotspots(vehicle);
      return hotspots.map((h) => ({
        id: h.id,
        category: h.category,
        name: h.title,
        description: h.description,
        metricLabel: h.metricLabel,
        metricValue: h.metricValue,
        worldPosition: h.position,
        type: 'FEATURE',
        data: h,
      }));
    }

    return [];
  }, [viewMode, activeExplodedPart, isExploded, showHotspots, vehicle]);

  const handleModelError = (err: Error) => {
    console.warn(`3D Model failed to load for ${vehicle.brand} ${vehicle.model}:`, err.message);
    setHasModelError(true);
    if (onError) onError(err);
    if (onModelLoadedState) onModelLoadedState(false, false);
  };

  const handleModelLoaded = (info: { hasSeparableNodes: boolean }) => {
    setHasModelError(false);
    if (onModelLoadedState) onModelLoadedState(true, info.hasSeparableNodes);
  };

  return (
    <>
      <color
        attach="background"
        args={[
          environmentMode === 'SHOWROOM'
            ? '#080c14'
            : outdoorLocation === 'SUNSET'
            ? '#24120e'
            : outdoorLocation === 'CITY_NIGHT'
            ? '#040711'
            : outdoorLocation === 'FOREST'
            ? '#0a140e'
            : outdoorLocation === 'COASTAL'
            ? '#141d2c'
            : '#070a12',
        ]}
      />

      {/* Dynamic Environment (Showroom vs Outdoor) */}
      <Suspense fallback={null}>
        {environmentMode === 'SHOWROOM' ? (
          <ShowroomEnvironment />
        ) : (
          <OutdoorEnvironment location={outdoorLocation} />
        )}
      </Suspense>

      {/* Vehicle Model */}
      <Suspense fallback={null}>
        {effectiveModelUrl && !hasModelError ? (
          <VehicleModelRenderer
            vehicle={vehicle}
            modelUrl={effectiveModelUrl}
            selectedColorHex={effectiveColorHex}
            isExploded={isExploded}
            activeExplodedPart={activeExplodedPart}
            onModelLoaded={handleModelLoaded}
            onModelError={handleModelError}
          />
        ) : null}
      </Suspense>

      {/* Screen-Space Hotspots Tracker (Calculates 2D coordinates for pure screen-space HTML overlay) */}
      {onProjectedHotspots && (
        <ScreenSpaceHotspotTracker
          hotspots={activeHotspotItems}
          onProjectedUpdate={onProjectedHotspots}
        />
      )}

      {/* Standard Perspective & Isolated Camera Rig */}
      <CameraPresetRig
        resetTrigger={resetTrigger}
        active={viewMode === 'STANDARD'}
        vehicle={vehicle}
        perspectivePreset={perspectivePreset}
        isolatedPart={activeExplodedPart}
      />

      {/* Cinematic Director Camera Manager */}
      <CinematicCameraManager
        isCinematic={viewMode === 'CINEMATIC'}
        isPaused={isCinematicPaused}
        currentShotIndex={currentShotIndex}
        onShotChange={onShotChange}
      />

      {/* Third-Person Camera Manager */}
      <ThirdPersonCameraManager
        isThirdPerson={viewMode === 'TRACKING'}
        preset={thirdPersonPreset}
        resetTrigger={resetTrigger}
      />

      {/* Smooth Orbit Controls */}
      <OrbitControls
        makeDefault
        enabled={viewMode === 'STANDARD'}
        enableDamping={true}
        dampingFactor={0.06}
        minDistance={activeExplodedPart ? 0.8 : 2.1}
        maxDistance={activeExplodedPart ? 5.5 : 8.8}
        minPolarAngle={0.08}
        maxPolarAngle={Math.PI / 2 - 0.03}
        target={activeExplodedPart ? activeExplodedPart.cameraTarget : [0, 0.45, 0.1]}
        onStart={onUserInteraction}
      />
    </>
  );
};
