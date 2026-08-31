import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

export const StudioEnvironment: React.FC = () => {
  return (
    <>
      {/* Neutral Studio HDR Reflection Map */}
      <Environment preset="studio" background={false} />

      {/* Balanced Ambient Studio Fill */}
      <ambientLight intensity={0.5} color="#f1f5f9" />

      {/* Key Light (Soft Overhead Studio Softbox) */}
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      />

      {/* Fill Light (Soft Cool Horizon Light) */}
      <directionalLight
        position={[-6, 6, -4]}
        intensity={0.8}
        color="#e2e8f0"
      />

      {/* Rim / Silhouette Light (Highlights roofline & rear curves) */}
      <directionalLight
        position={[0, 4, -8]}
        intensity={0.9}
        color="#f8fafc"
      />

      {/* Subtle Warm Ground Bounce */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.2}
        color="#cbd5e1"
      />

      {/* Studio Floor (Polished Dark Neutral Slate) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#090d16"
          roughness={0.3}
          metalness={0.4}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Realistic Soft Contact Shadows Under Wheels & Chassis */}
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.75}
        scale={8}
        blur={1.6}
        far={3.5}
        resolution={1024}
        color="#000000"
      />
    </>
  );
};
