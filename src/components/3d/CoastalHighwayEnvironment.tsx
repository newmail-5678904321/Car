import React, { useMemo } from 'react';
import { Environment, ContactShadows, Sky } from '@react-three/drei';
import * as THREE from 'three';

export const CoastalHighwayEnvironment: React.FC = () => {
  const materials = useMemo(() => {
    const asphalt = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c202a'),
      roughness: 0.7,
      metalness: 0.2,
      envMapIntensity: 1.4,
    });

    const oceanWater = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0c2d48'),
      roughness: 0.12,
      metalness: 0.85,
      envMapIntensity: 2.2,
      flatShading: true,
    });

    const cliffRock = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#28303d'),
      roughness: 0.92,
      metalness: 0.08,
      flatShading: true,
    });

    const guardrail = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#94a3b8'),
      roughness: 0.25,
      metalness: 0.95,
      envMapIntensity: 2.0,
    });

    const roadLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'),
      roughness: 0.5,
      metalness: 0.1,
    });

    return { asphalt, oceanWater, cliffRock, guardrail, roadLine };
  }, []);

  return (
    <>
      {/* 1. CRISP COASTAL SKY & ATMOSPHERE */}
      <Sky
        distance={450000}
        sunPosition={[30, 28, 40]}
        inclination={0.48}
        azimuth={0.25}
        turbidity={3.0}
        rayleigh={0.65}
        mieCoefficient={0.003}
        mieDirectionalG={0.8}
      />

      <Environment preset="dawn" background={false} />

      {/* Coastal Sea Mist Fog */}
      <fog attach="fog" args={['#476f8a', 40, 200]} />

      {/* Daylight Ambient */}
      <ambientLight intensity={0.65} color="#e0f2fe" />

      {/* Bright Ocean Sunlight */}
      <directionalLight
        position={[24, 22, 28]}
        intensity={2.8}
        color="#fffbeb"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={55}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />

      {/* Deep Ocean Blue Fill Light */}
      <directionalLight
        position={[-22, 14, -18]}
        intensity={0.8}
        color="#38bdf8"
      />

      {/* 2. COASTAL HIGHWAY ROAD SURFACE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.asphalt}>
        <planeGeometry args={[13, 120]} />
      </mesh>

      {/* Road Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.15, 120]} />
      </mesh>

      {/* Roadside Shoulder White Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.8, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.15, 120]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.8, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.15, 120]} />
      </mesh>

      {/* 3. PACIFIC OCEAN WATER SURFACE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[45, -5.5, 0]} material={materials.oceanWater}>
        <planeGeometry args={[80, 160]} />
      </mesh>

      {/* 4. SEAWALL & CLIFFSIDE GUARDRAILS */}
      <group position={[5.6, 0, 0]}>
        <mesh position={[0, 0.65, 0]} material={materials.guardrail} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.25, 110]} />
        </mesh>
      </group>

      {/* 5. INLAND ROCK CLIFFS */}
      <group position={[-14, 0, 0]}>
        <mesh position={[0, 3.5, 0]} rotation={[0, 0, -0.4]} material={materials.cliffRock} receiveShadow castShadow>
          <boxGeometry args={[12, 8, 120]} />
        </mesh>
      </group>

      {/* 6. SOFT CONTACT SHADOWS */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.88}
        scale={9.5}
        blur={1.5}
        far={4.0}
        resolution={1024}
        color="#08101a"
      />
    </>
  );
};
