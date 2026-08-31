import React, { useMemo } from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export const CityNightEnvironment: React.FC = () => {
  const materials = useMemo(() => {
    // Wet Asphalt reflecting urban lights
    const wetAsphalt = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0d14'),
      roughness: 0.18,
      metalness: 0.82,
      envMapIntensity: 2.4,
    });

    const roadLine = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      roughness: 0.4,
      metalness: 0.2,
    });

    const skyscraperGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0f172a'),
      roughness: 0.08,
      metalness: 0.9,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 2.5,
    });

    const windowGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fef08a'),
      emissive: new THREE.Color('#fde047'),
      emissiveIntensity: 1.8,
    });

    const streetLightBeam = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0f2fe'),
      emissive: new THREE.Color('#bae6fd'),
      emissiveIntensity: 3.5,
    });

    const curbStone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1e293b'),
      roughness: 0.7,
      metalness: 0.2,
    });

    return { wetAsphalt, roadLine, skyscraperGlass, windowGlow, streetLightBeam, curbStone };
  }, []);

  return (
    <>
      {/* 1. URBAN NIGHT ENVIRONMENT REFLECTIONS */}
      <Environment preset="city" background={false} />

      <fog attach="fog" args={['#040711', 20, 90]} />

      {/* Cool Midnight Ambient */}
      <ambientLight intensity={0.25} color="#38bdf8" />

      {/* Main Street Overhead Sodium/LED Key Light */}
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.8}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0001}
      />

      {/* Cyan/Electric Blue Skyline Rim Light */}
      <directionalLight
        position={[-12, 8, -10]}
        intensity={1.2}
        color="#06b6d4"
      />

      {/* Amber Street Corner Secondary Glow */}
      <directionalLight
        position={[10, 6, -8]}
        intensity={0.9}
        color="#f59e0b"
      />

      {/* 2. WET DOWNTOWN BOULEVARD */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={materials.wetAsphalt}>
        <planeGeometry args={[14, 100]} />
      </mesh>

      {/* Road Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.16, 100]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.2, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.16, 100]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.2, 0.002, 0]} material={materials.roadLine}>
        <planeGeometry args={[0.16, 100]} />
      </mesh>

      {/* Sidewalk Curbs */}
      <mesh position={[-6.2, 0.1, 0]} material={materials.curbStone}>
        <boxGeometry args={[2, 0.2, 100]} />
      </mesh>
      <mesh position={[6.2, 0.1, 0]} material={materials.curbStone}>
        <boxGeometry args={[2, 0.2, 100]} />
      </mesh>

      {/* 3. DOWNTOWN SKYSCRAPER TOWERS */}
      <group position={[-24, 0, -10]}>
        <mesh position={[0, 18, 0]} material={materials.skyscraperGlass}>
          <boxGeometry args={[16, 36, 16]} />
        </mesh>
        {/* Illuminated Window Strips */}
        {[-6, -2, 2, 6].map((x, i) => (
          <mesh key={i} position={[x, 18, 8.05]} material={materials.windowGlow}>
            <boxGeometry args={[1.2, 28, 0.1]} />
          </mesh>
        ))}
      </group>

      <group position={[26, 0, 10]}>
        <mesh position={[0, 22, 0]} material={materials.skyscraperGlass}>
          <boxGeometry args={[18, 44, 18]} />
        </mesh>
        {[-6, -2, 2, 6].map((x, i) => (
          <mesh key={i} position={[x, 22, -9.05]} material={materials.windowGlow}>
            <boxGeometry args={[1.2, 34, 0.1]} />
          </mesh>
        ))}
      </group>

      <group position={[0, 0, -42]}>
        <mesh position={[0, 24, 0]} material={materials.skyscraperGlass}>
          <boxGeometry args={[28, 48, 14]} />
        </mesh>
      </group>

      {/* 4. SOFT GROUND CONTACT SHADOWS */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.94}
        scale={9.5}
        blur={1.2}
        far={4.0}
        resolution={1024}
        color="#000000"
      />
    </>
  );
};
