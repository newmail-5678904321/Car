import React, { useMemo } from 'react';
import { Environment, ContactShadows, Sky } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Organic Alpine Pine Tree with varied foliage tiers and wood bark
const AlpinePineTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  foliageColor?: string;
}> = ({
  position,
  scale = 1,
  rotationY = 0,
  foliageColor = '#182b20',
}) => {
  const foliageMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(foliageColor),
        roughness: 0.88,
        metalness: 0.04,
        flatShading: true,
      }),
    [foliageColor]
  );

  const trunkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#281b14'),
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Organic Trunk */}
      <mesh position={[0, 1.4, 0]} material={trunkMat} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 2.8, 8]} />
      </mesh>
      {/* Tier 1 - Bottom dense branch tier */}
      <mesh position={[0, 2.6, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[1.55, 2.4, 8]} />
      </mesh>
      {/* Tier 2 - Mid branch tier */}
      <mesh position={[0, 3.8, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[1.2, 2.2, 8]} />
      </mesh>
      {/* Tier 3 - Upper mid branch tier */}
      <mesh position={[0, 4.9, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[0.85, 2.0, 8]} />
      </mesh>
      {/* Tier 4 - Pine Spire Top */}
      <mesh position={[0, 5.8, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[0.45, 1.6, 7]} />
      </mesh>
    </group>
  );
};

// Procedural Weathered Granite Boulder Formation
const MountainBoulder: React.FC<{
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}> = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) => {
  const rockMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d333e'),
        roughness: 0.92,
        metalness: 0.08,
        flatShading: true,
      }),
    []
  );

  return (
    <mesh position={position} scale={scale} rotation={rotation} material={rockMat} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 1]} />
    </mesh>
  );
};

export const AlpineRoadEnvironment: React.FC = () => {
  // Road, Terrain & Guardrail Materials
  const {
    asphaltMat,
    roadLineMat,
    roadYellowLineMat,
    shoulderGravelMat,
    guardrailPostMat,
    guardrailBeamMat,
    reflectorAmberMat,
    terrainRockMat,
    distantMountainMat,
  } = useMemo(() => {
    // High-grade mountain asphalt with subtle aggregate specularity
    const asphalt = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#191d24'),
      roughness: 0.8,
      metalness: 0.12,
      envMapIntensity: 0.8,
    });

    // Crisp white road shoulder line
    const roadLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      roughness: 0.55,
      metalness: 0.1,
    });

    // Double yellow mountain pass center divider
    const roadYellowLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#eab308'),
      roughness: 0.55,
      metalness: 0.1,
    });

    // Dark crushed gravel road shoulder
    const shoulderGravel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#232a36'),
      roughness: 0.94,
      metalness: 0.06,
    });

    // Weathered mountain rock and embankment
    const terrainRock = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c222c'),
      roughness: 0.94,
      metalness: 0.06,
      flatShading: true,
    });

    // Distant mountain ridge material (atmospheric tone)
    const distantMountain = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#222b39'),
      roughness: 0.95,
      metalness: 0.04,
      flatShading: true,
    });

    // Galvanized steel guardrail posts
    const guardrailPost = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#475569'),
      roughness: 0.45,
      metalness: 0.85,
    });

    // Brushed steel guardrail W-beam
    const guardrailBeam = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#64748b'),
      roughness: 0.38,
      metalness: 0.9,
      envMapIntensity: 1.5,
    });

    // Roadside amber safety reflector
    const reflectorAmber = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      emissive: new THREE.Color('#d97706'),
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5,
    });

    return {
      asphaltMat: asphalt,
      roadLineMat: roadLine,
      roadYellowLineMat: roadYellowLine,
      shoulderGravelMat: shoulderGravel,
      guardrailPostMat: guardrailPost,
      guardrailBeamMat: guardrailBeam,
      reflectorAmberMat: reflectorAmber,
      terrainRockMat: terrainRock,
      distantMountainMat: distantMountain,
    };
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. SKY, ATMOSPHERE & NATURAL LIGHTING                        */}
      {/* ============================================================ */}

      {/* Realistic Natural Sun Sky Simulation */}
      <Sky
        distance={450000}
        sunPosition={[35, 22, 42]}
        inclination={0.54}
        azimuth={0.28}
        turbidity={4.2}
        rayleigh={0.85}
        mieCoefficient={0.005}
        mieDirectionalG={0.82}
      />

      {/* Environment Map for Natural Physical Reflections */}
      <Environment preset="sunset" background={false} />

      {/* Atmospheric Aerial Perspective (Soft distant peaks, sharp vehicle) */}
      <fog attach="fog" args={['#6d8ba8', 35, 210]} />

      {/* Natural Sky Ambient Illumination */}
      <ambientLight intensity={0.7} color="#d4e2f0" />

      {/* Primary Directional Sunlight (Golden-hour warm sunlight) */}
      <directionalLight
        position={[22, 18, 25]}
        intensity={2.6}
        color="#fff6eb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00012}
      />

      {/* Secondary Sky Fill Light (Soft mountain fill for readable shadows) */}
      <directionalLight
        position={[-18, 14, -18]}
        intensity={0.75}
        color="#9ec4e8"
      />

      {/* Natural Ground Environmental Bounce Light */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.3}
        color="#48433d"
      />

      {/* ============================================================ */}
      {/* 2. MOUNTAIN ROAD & ASPHALT SURFACE                           */}
      {/* ============================================================ */}

      {/* Main Asphalt Road Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={asphaltMat}>
        <planeGeometry args={[12.5, 120, 1, 1]} />
      </mesh>

      {/* Double Yellow Center Line Mountain Road Divider */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.08, 0.002, 0]} material={roadYellowLineMat}>
        <planeGeometry args={[0.12, 120]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.08, 0.002, 0]} material={roadYellowLineMat}>
        <planeGeometry args={[0.12, 120]} />
      </mesh>

      {/* Solid White Road Edge Shoulder Stripes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.6, 0.002, 0]} material={roadLineMat}>
        <planeGeometry args={[0.16, 120]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.6, 0.002, 0]} material={roadLineMat}>
        <planeGeometry args={[0.16, 120]} />
      </mesh>

      {/* Crushed Gravel Road Shoulders */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8.0, -0.01, 0]} receiveShadow material={shoulderGravelMat}>
        <planeGeometry args={[6.5, 120]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8.0, -0.01, 0]} receiveShadow material={shoulderGravelMat}>
        <planeGeometry args={[6.5, 120]} />
      </mesh>

      {/* ============================================================ */}
      {/* 3. ROADSIDE MINIMALIST ALPINE GUARDRAIL                      */}
      {/* ============================================================ */}
      <group position={[5.4, 0, 0]}>
        {/* Continuous Horizontal W-Beam */}
        <mesh position={[0, 0.66, 0]} material={guardrailBeamMat} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.28, 110]} />
        </mesh>
        {/* Guardrail Support Posts with Amber Safety Reflectors */}
        {Array.from({ length: 28 }).map((_, i) => {
          const z = -54 + i * 4;
          return (
            <group key={i} position={[0, 0.35, z]}>
              <mesh material={guardrailPostMat} castShadow>
                <boxGeometry args={[0.12, 0.72, 0.12]} />
              </mesh>
              {/* Roadside Safety Reflector */}
              <mesh position={[-0.065, 0.22, 0]} material={reflectorAmberMat}>
                <boxGeometry args={[0.015, 0.06, 0.08]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 4. ROADSIDE CLIFFS, BOULDERS & NATURAL PINE FORESTS          */}
      {/* ============================================================ */}

      {/* West Roadside Rocky Mountain Embankment */}
      <group position={[-11.0, 0, 0]}>
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, -0.36]} material={terrainRockMat} receiveShadow castShadow>
          <boxGeometry args={[8.5, 4.5, 115]} />
        </mesh>
        
        {/* Weathered Granite Boulders along the base */}
        <MountainBoulder position={[-1.2, 0.6, 6]} scale={[1.5, 0.9, 1.7]} rotation={[0.2, 0.4, 0.1]} />
        <MountainBoulder position={[-0.8, 0.5, -6]} scale={[1.3, 0.8, 1.4]} rotation={[-0.1, 0.8, 0.2]} />
        <MountainBoulder position={[-1.6, 0.8, -18]} scale={[1.9, 1.3, 1.6]} rotation={[0.4, -0.3, 0.1]} />
        <MountainBoulder position={[-1.1, 0.7, 19]} scale={[1.6, 1.0, 1.8]} rotation={[0.1, 0.6, -0.2]} />
        <MountainBoulder position={[-1.4, 0.9, 36]} scale={[1.7, 1.1, 1.5]} rotation={[-0.3, 0.5, 0.2]} />
        <MountainBoulder position={[-1.5, 0.9, -38]} scale={[1.8, 1.2, 1.6]} rotation={[0.3, -0.4, -0.1]} />
        
        {/* Layered Alpine Pine Trees with natural organic color variations */}
        <AlpinePineTree position={[-2.4, 1.8, -8]} scale={1.25} rotationY={0.5} foliageColor="#1a2d21" />
        <AlpinePineTree position={[-3.4, 2.4, -20]} scale={1.55} rotationY={1.2} foliageColor="#16261b" />
        <AlpinePineTree position={[-2.8, 2.0, 12]} scale={1.35} rotationY={2.1} foliageColor="#1c3024" />
        <AlpinePineTree position={[-3.6, 2.6, 26]} scale={1.65} rotationY={0.9} foliageColor="#17281d" />
        <AlpinePineTree position={[-2.3, 1.6, 42]} scale={1.15} rotationY={3.0} foliageColor="#1e3326" />
        <AlpinePineTree position={[-3.0, 2.2, -36]} scale={1.4} rotationY={1.7} foliageColor="#182a1e" />
      </group>

      {/* East Valley Overlook Slope (Beyond Guardrail into Valley) */}
      <group position={[15, -4.5, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.42]} material={terrainRockMat} receiveShadow>
          <boxGeometry args={[15, 9, 115]} />
        </mesh>
        {/* Valley Floor Pine Canopy */}
        <AlpinePineTree position={[-1.5, -0.4, -14]} scale={1.45} rotationY={0.4} foliageColor="#18291e" />
        <AlpinePineTree position={[-0.8, -0.9, 9]} scale={1.55} rotationY={1.7} foliageColor="#142319" />
        <AlpinePineTree position={[-2.2, -0.7, 24]} scale={1.35} rotationY={2.8} foliageColor="#1b2e22" />
        <AlpinePineTree position={[-1.8, -0.8, -34]} scale={1.5} rotationY={0.8} foliageColor="#16271c" />
      </group>

      {/* ============================================================ */}
      {/* 5. DISTANT ALPINE MOUNTAIN RANGES & HORIZON                  */}
      {/* ============================================================ */}
      
      {/* North Alpine Peaks */}
      <group position={[28, 0, -90]}>
        <mesh position={[0, 26, 0]} rotation={[0, 0.2, 0]} castShadow material={distantMountainMat}>
          <coneGeometry args={[48, 58, 5]} />
        </mesh>
        <mesh position={[-44, 20, -18]} rotation={[0, -0.3, 0]} material={distantMountainMat}>
          <coneGeometry args={[40, 48, 5]} />
        </mesh>
        <mesh position={[50, 24, -22]} rotation={[0, 0.5, 0]} material={distantMountainMat}>
          <coneGeometry args={[42, 52, 5]} />
        </mesh>
      </group>

      {/* South Alpine Peaks */}
      <group position={[32, 0, 90]}>
        <mesh position={[-16, 24, 0]} rotation={[0, 0.8, 0]} material={distantMountainMat}>
          <coneGeometry args={[44, 52, 5]} />
        </mesh>
        <mesh position={[38, 20, -12]} rotation={[0, -0.4, 0]} material={distantMountainMat}>
          <coneGeometry args={[38, 44, 5]} />
        </mesh>
      </group>

      {/* Distant West High Mountain Ridge */}
      <group position={[-80, 0, 0]}>
        <mesh position={[0, 34, -32]} rotation={[0, 0.4, 0]} material={distantMountainMat}>
          <coneGeometry args={[58, 72, 5]} />
        </mesh>
        <mesh position={[0, 30, 42]} rotation={[0, -0.2, 0]} material={distantMountainMat}>
          <coneGeometry args={[52, 64, 5]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 6. SOFT CONTACT SHADOWS UNDER VEHICLE WHEELS                 */}
      {/* ============================================================ */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.88}
        scale={9.5}
        blur={1.6}
        far={4.0}
        resolution={1024}
        color="#080b12"
      />
    </>
  );
};

