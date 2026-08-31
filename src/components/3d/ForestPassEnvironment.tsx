import React, { useMemo } from 'react';
import { Environment, ContactShadows, Sky } from '@react-three/drei';
import * as THREE from 'three';

const ForestTree: React.FC<{ position: [number, number, number]; scale?: number; rotationY?: number }> = ({
  position,
  scale = 1,
  rotationY = 0,
}) => {
  const foliageMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#14281d'),
        roughness: 0.85,
        metalness: 0.05,
        flatShading: true,
      }),
    []
  );

  const trunkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d1f18'),
        roughness: 0.95,
      }),
    []
  );

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.8, 0]} material={trunkMat} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 3.6, 8]} />
      </mesh>
      <mesh position={[0, 3.5, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[1.8, 3.2, 8]} />
      </mesh>
      <mesh position={[0, 5.0, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[1.4, 2.8, 8]} />
      </mesh>
      <mesh position={[0, 6.2, 0]} material={foliageMat} castShadow receiveShadow>
        <coneGeometry args={[0.8, 2.2, 8]} />
      </mesh>
    </group>
  );
};

export const ForestPassEnvironment: React.FC = () => {
  const materials = useMemo(() => {
    const asphalt = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a2126'),
      roughness: 0.82,
      metalness: 0.1,
      envMapIntensity: 0.9,
    });

    const roadLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      roughness: 0.6,
      metalness: 0.1,
    });

    const forestFloor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#17231a'),
      roughness: 0.95,
      metalness: 0.02,
      flatShading: true,
    });

    return { asphalt, roadLine, forestFloor };
  }, []);

  return (
    <>
      {/* 1. FILTERED FOREST CANOPY LIGHTING */}
      <Sky
        distance={450000}
        sunPosition={[20, 35, 20]}
        inclination={0.45}
        azimuth={0.3}
        turbidity={5.0}
        rayleigh={1.2}
      />

      <Environment preset="forest" background={false} />

      {/* Emerald Forest Mist Fog */}
      <fog attach="fog" args={['#102219', 20, 110]} />

      {/* Ambient Forest Light */}
      <ambientLight intensity={0.45} color="#dcfce7" />

      {/* Filtered Golden Sunlight Dappling */}
      <directionalLight
        position={[18, 22, 14]}
        intensity={2.4}
        color="#fef3c7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />

      {/* Foliage Green Fill Light */}
      <directionalLight
        position={[-14, 12, -14]}
        intensity={0.6}
        color="#86efac"
      />

      {/* 2. FOREST ROADWAY */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.asphalt}>
        <planeGeometry args={[12, 110]} />
      </mesh>

      {/* Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.15, 110]} />
      </mesh>

      {/* Forest Floor Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={materials.forestFloor}>
        <planeGeometry args={[140, 140]} />
      </mesh>

      {/* 3. DENSE PINE & FIR FOREST CANOPY */}
      <group position={[-10, 0, 0]}>
        <ForestTree position={[-2, 0, -18]} scale={1.4} rotationY={0.5} />
        <ForestTree position={[-1, 0, -4]} scale={1.6} rotationY={1.2} />
        <ForestTree position={[-3, 0, 10]} scale={1.5} rotationY={2.1} />
        <ForestTree position={[-1.5, 0, 24]} scale={1.7} rotationY={0.8} />
        <ForestTree position={[-2.5, 0, 38]} scale={1.3} rotationY={3.0} />
      </group>

      <group position={[10, 0, 0]}>
        <ForestTree position={[2, 0, -12]} scale={1.5} rotationY={0.9} />
        <ForestTree position={[1, 0, 2]} scale={1.65} rotationY={1.8} />
        <ForestTree position={[2.5, 0, 18]} scale={1.4} rotationY={2.7} />
        <ForestTree position={[1.5, 0, 32]} scale={1.55} rotationY={0.4} />
      </group>

      {/* 4. SOFT GROUND CONTACT SHADOWS */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.88}
        scale={9.5}
        blur={1.6}
        far={4.0}
        resolution={1024}
        color="#05100a"
      />
    </>
  );
};
