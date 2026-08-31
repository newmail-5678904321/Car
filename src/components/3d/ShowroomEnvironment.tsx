import React, { useMemo } from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export const ShowroomEnvironment: React.FC = () => {
  // Architectural Showroom Materials
  const materials = useMemo(() => {
    // 1. Honed Polished Dark Basalt / Architectural Concrete Floor
    const floor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0c1017'),
      roughness: 0.22,
      metalness: 0.38,
      envMapIntensity: 1.2,
    });

    // 2. Low-Profile Dark Granite Display Plinth
    const plinth = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121722'),
      roughness: 0.28,
      metalness: 0.25,
      envMapIntensity: 0.9,
    });

    // 3. Satin Titanium Perimeter Inlay Trim
    const titaniumTrim = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8a92a0'),
      roughness: 0.15,
      metalness: 0.92,
      envMapIntensity: 2.0,
    });

    // 4. Matte Architectural Slate Feature Wall
    const slateWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#131720'),
      roughness: 0.85,
      metalness: 0.12,
    });

    // 5. Dark Architectural Concrete Columns & Beams
    const concreteBeam = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#161c28'),
      roughness: 0.75,
      metalness: 0.18,
    });

    // 6. Architectural Floor-to-Ceiling Tinted Glass Curtain
    const tintedGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0f1926'),
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.88,
      thickness: 0.5,
      transparent: true,
      opacity: 0.7,
      ior: 1.5,
    });

    // 7. Large Studio Softbox Diffuser Light Panels (High Emissive White)
    const softboxDiffuser = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 2.4,
      roughness: 0.3,
      metalness: 0.0,
    });

    // 8. Softbox Casing (Matte Dark Anodized Aluminum)
    const softboxCasing = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0d14'),
      roughness: 0.5,
      metalness: 0.8,
    });

    // 9. Recessed Cove Accent Linear Glow
    const coveLight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      emissive: new THREE.Color('#cbd5e1'),
      emissiveIntensity: 1.4,
    });

    return {
      floor,
      plinth,
      titaniumTrim,
      slateWall,
      concreteBeam,
      tintedGlass,
      softboxDiffuser,
      softboxCasing,
      coveLight,
    };
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. STUDIO HDR REFLECTIONS & PHOTOMETRIC LIGHTING             */}
      {/* ============================================================ */}

      {/* Neutral Studio Reflection Map for Automotive Clearcoat */}
      <Environment preset="studio" background={false} />

      {/* Ambient Gallery Fill */}
      <ambientLight intensity={0.45} color="#dbe5f0" />

      {/* Primary Key Light (45-degree angle overhead studio lighting) */}
      <directionalLight
        position={[7, 11, 7]}
        intensity={2.2}
        color="#fff9f2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.00012}
      />

      {/* Fill Light (Soft cool horizon fill for shadow legibility) */}
      <directionalLight
        position={[-8, 7, -6]}
        intensity={0.85}
        color="#cad8e8"
      />

      {/* Rear Rim Light (Highlights aerodynamic wing and shoulder lines) */}
      <directionalLight
        position={[0, 6.5, -9]}
        intensity={1.1}
        color="#f1f5f9"
      />

      {/* Front Nose Highlight Light */}
      <directionalLight
        position={[0, 5, 8.5]}
        intensity={0.9}
        color="#ffffff"
      />

      {/* Ground Bounce Fill Light */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.2}
        color="#2b3240"
      />

      {/* Subtle Architectural Atmosphere Fog */}
      <fog attach="fog" args={['#080c14', 20, 60]} />

      {/* ============================================================ */}
      {/* 2. DEDICATED VEHICLE DISPLAY PLATFORM & FLOOR                */}
      {/* ============================================================ */}

      {/* Main Architectural Honed Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={materials.floor}>
        <planeGeometry args={[80, 80]} />
      </mesh>

      {/* Dedicated Low-Profile Beveled Stone Display Plinth (7.4m x 3.6m) */}
      <group position={[0, 0.02, 0]}>
        {/* Main Plinth Slab */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow material={materials.plinth}>
          <boxGeometry args={[3.8, 0.04, 7.6]} />
        </mesh>

        {/* Satin Titanium Perimeter Inlay Frame */}
        <mesh position={[0, 0.022, 3.75]} material={materials.titaniumTrim}>
          <boxGeometry args={[3.76, 0.005, 0.04]} />
        </mesh>
        <mesh position={[0, 0.022, -3.75]} material={materials.titaniumTrim}>
          <boxGeometry args={[3.76, 0.005, 0.04]} />
        </mesh>
        <mesh position={[-1.85, 0.022, 0]} material={materials.titaniumTrim}>
          <boxGeometry args={[0.04, 0.005, 7.54]} />
        </mesh>
        <mesh position={[1.85, 0.022, 0]} material={materials.titaniumTrim}>
          <boxGeometry args={[0.04, 0.005, 7.54]} />
        </mesh>

        {/* Recessed Ambient Floor Shadow Gap */}
        <mesh position={[0, -0.02, 0]} material={materials.floor}>
          <boxGeometry args={[3.9, 0.01, 7.7]} />
        </mesh>
      </group>

      {/* Soft Ground Contact Shadows Under Vehicle & Tires */}
      <ContactShadows
        position={[0, 0.041, 0]}
        opacity={0.88}
        scale={9.5}
        blur={1.5}
        far={3.8}
        resolution={1024}
        color="#04060a"
      />

      {/* ============================================================ */}
      {/* 3. OVERHEAD STUDIO SOFTBOX DIFFUSERS (Long Reflections)      */}
      {/* ============================================================ */}

      {/* Central Overhead Primary Softbox Panel (Creates the classic automotive spine reflection) */}
      <group position={[0, 6.6, 0]}>
        {/* Diffuser Light Emitter */}
        <mesh position={[0, 0, 0]} material={materials.softboxDiffuser}>
          <boxGeometry args={[3.4, 0.06, 7.2]} />
        </mesh>
        {/* Dark Casing Rim */}
        <mesh position={[0, 0.04, 0]} material={materials.softboxCasing}>
          <boxGeometry args={[3.5, 0.08, 7.3]} />
        </mesh>
      </group>

      {/* Angled Left Studio Light Bank */}
      <group position={[-5.8, 5.2, 0]} rotation={[0, 0, -0.45]}>
        <mesh material={materials.softboxDiffuser}>
          <boxGeometry args={[1.4, 0.05, 6.8]} />
        </mesh>
        <mesh position={[0, 0.03, 0]} material={materials.softboxCasing}>
          <boxGeometry args={[1.48, 0.07, 6.9]} />
        </mesh>
      </group>

      {/* Angled Right Studio Light Bank */}
      <group position={[5.8, 5.2, 0]} rotation={[0, 0, 0.45]}>
        <mesh material={materials.softboxDiffuser}>
          <boxGeometry args={[1.4, 0.05, 6.8]} />
        </mesh>
        <mesh position={[0, 0.03, 0]} material={materials.softboxCasing}>
          <boxGeometry args={[1.48, 0.07, 6.9]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 4. MINIMALIST ARCHITECTURAL GALLERY STRUCTURE                */}
      {/* ============================================================ */}

      {/* Rear Architectural Accent Wall with Vertical Acoustic Fluting */}
      <group position={[0, 4, -14]}>
        {/* Main Wall Plane */}
        <mesh receiveShadow material={materials.slateWall}>
          <boxGeometry args={[36, 8, 0.6]} />
        </mesh>

        {/* Minimal Vertical Architectural Slats */}
        {[-14, -10, -6, -2, 2, 6, 10, 14].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.32]} material={materials.concreteBeam}>
            <boxGeometry args={[0.3, 8, 0.1]} />
          </mesh>
        ))}

        {/* Base Cove Linear Light Strip */}
        <mesh position={[0, -3.95, 0.35]} material={materials.coveLight}>
          <boxGeometry args={[34, 0.04, 0.08]} />
        </mesh>
      </group>

      {/* Left Architectural Glass Curtain Wall (Overlooking dark ambient courtyard) */}
      <group position={[-16, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Tinted Glass Panes */}
        <mesh material={materials.tintedGlass}>
          <boxGeometry args={[28, 8, 0.05]} />
        </mesh>
        {/* Minimal Black Mullions */}
        {[-10, -5, 0, 5, 10].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} material={materials.softboxCasing}>
            <boxGeometry args={[0.08, 8, 0.12]} />
          </mesh>
        ))}
      </group>

      {/* Right Minimalist Textured Wall with Recessed Plinth Niche */}
      <group position={[16, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow material={materials.slateWall}>
          <boxGeometry args={[28, 8, 0.6]} />
        </mesh>
        {/* Soft Linear Horizontal Light Groove */}
        <mesh position={[0, 0, 0.32]} material={materials.coveLight}>
          <boxGeometry args={[26, 0.03, 0.05]} />
        </mesh>
      </group>

      {/* High Ceiling Structural Girders / Beams */}
      <group position={[0, 7.8, 0]}>
        {[-8, 0, 8].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} material={materials.concreteBeam}>
            <boxGeometry args={[32, 0.4, 0.35]} />
          </mesh>
        ))}
      </group>
    </>
  );
};
