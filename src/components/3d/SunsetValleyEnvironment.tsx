import React, { useMemo } from 'react';
import { Environment, ContactShadows, Sky } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Canyon Mesa Formation
const CanyonMesa: React.FC<{
  position: [number, number, number];
  scale?: [number, number, number];
  rotationY?: number;
}> = ({ position, scale = [1, 1, 1], rotationY = 0 }) => {
  const canyonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#783824'),
        roughness: 0.94,
        metalness: 0.05,
        flatShading: true,
      }),
    []
  );

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Tier 1 Mesa Base */}
      <mesh position={[0, 4, 0]} material={canyonMat} castShadow receiveShadow>
        <cylinderGeometry args={[14, 18, 8, 8]} />
      </mesh>
      {/* Tier 2 Mesa Top Plateau */}
      <mesh position={[0, 10, 0]} material={canyonMat} castShadow receiveShadow>
        <cylinderGeometry args={[11, 14, 6, 8]} />
      </mesh>
    </group>
  );
};

export const SunsetValleyEnvironment: React.FC = () => {
  const materials = useMemo(() => {
    const asphalt = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#221c1a'),
      roughness: 0.75,
      metalness: 0.15,
      envMapIntensity: 1.2,
    });

    const roadLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fed7aa'),
      roughness: 0.6,
      metalness: 0.1,
    });

    const yellowLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      roughness: 0.5,
      metalness: 0.1,
    });

    const desertSand = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#452317'),
      roughness: 0.96,
      metalness: 0.02,
      flatShading: true,
    });

    return { asphalt, roadLine, yellowLine, desertSand };
  }, []);

  return (
    <>
      {/* 1. WARM GOLDEN SUNSET SKY & LIGHTING */}
      <Sky
        distance={450000}
        sunPosition={[50, 6, 25]}
        inclination={0.62}
        azimuth={0.35}
        turbidity={8.5}
        rayleigh={2.2}
        mieCoefficient={0.015}
        mieDirectionalG={0.88}
      />

      <Environment preset="sunset" background={false} />

      {/* Atmospheric Warm Golden Dust Fog */}
      <fog attach="fog" args={['#2c1511', 25, 140]} />

      {/* Warm Sunset Ambient */}
      <ambientLight intensity={0.55} color="#fdba74" />

      {/* Low-Angle Warm Sun (Creates long cinematic vehicle shadows) */}
      <directionalLight
        position={[32, 8, 16]}
        intensity={3.4}
        color="#ff7e40"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />

      {/* Sky Blue/Violet Ambient Fill */}
      <directionalLight
        position={[-20, 12, -20]}
        intensity={0.6}
        color="#818cf8"
      />

      {/* Warm Canyon Ground Reflection */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.4}
        color="#7c2d12"
      />

      {/* 2. DESERT HIGHWAY ASPHALT & ROAD MARKINGS */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.asphalt}>
        <planeGeometry args={[14, 120]} />
      </mesh>

      {/* Highway Center Stripes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.yellowLine}>
        <planeGeometry args={[0.18, 120]} />
      </mesh>

      {/* Road Edge Shoulder Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.2, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.14, 120]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.2, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.14, 120]} />
      </mesh>

      {/* Desert Red Sand Ground Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={materials.desertSand}>
        <planeGeometry args={[160, 160]} />
      </mesh>

      {/* 3. CANYON MESAS & ROCK FORMATIONS */}
      <CanyonMesa position={[-42, 0, -25]} scale={[1.8, 1.6, 1.8]} rotationY={0.4} />
      <CanyonMesa position={[48, 0, 15]} scale={[2.2, 1.9, 2.0]} rotationY={1.1} />
      <CanyonMesa position={[-38, 0, 45]} scale={[1.5, 1.4, 1.6]} rotationY={2.2} />
      <CanyonMesa position={[52, 0, -55]} scale={[2.5, 2.2, 2.4]} rotationY={0.8} />

      {/* 4. SOFT GROUND CONTACT SHADOWS */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.92}
        scale={9.5}
        blur={1.4}
        far={4.0}
        resolution={1024}
        color="#1a0905"
      />
    </>
  );
};
