import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface ScreenHotspotItem {
  id: string;
  category: string;
  name: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  worldPosition: [number, number, number];
  type: 'FEATURE' | 'EXPLODED';
  data?: any;
}

export interface ProjectedScreenHotspot extends ScreenHotspotItem {
  screenX: number; // 0 to 100 percentage
  screenY: number; // 0 to 100 percentage
  isVisible: boolean;
}

interface ScreenSpaceHotspotTrackerProps {
  hotspots: ScreenHotspotItem[];
  onProjectedUpdate: (projected: ProjectedScreenHotspot[]) => void;
}

export const ScreenSpaceHotspotTracker: React.FC<ScreenSpaceHotspotTrackerProps> = ({
  hotspots,
  onProjectedUpdate,
}) => {
  const { camera } = useThree();
  const tempVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!hotspots || hotspots.length === 0) {
      onProjectedUpdate([]);
      return;
    }

    const projected: ProjectedScreenHotspot[] = hotspots.map((h) => {
      tempVec.current.set(...h.worldPosition);
      tempVec.current.project(camera);

      // In front of camera check (z < 1.0)
      const inFront = tempVec.current.z < 1.0;
      const xPercent = (tempVec.current.x * 0.5 + 0.5) * 100;
      const yPercent = (-tempVec.current.y * 0.5 + 0.5) * 100;

      const isVisible = inFront && xPercent >= 3 && xPercent <= 97 && yPercent >= 4 && yPercent <= 96;

      return {
        ...h,
        screenX: xPercent,
        screenY: yPercent,
        isVisible,
      };
    });

    onProjectedUpdate(projected);
  });

  return null;
};
