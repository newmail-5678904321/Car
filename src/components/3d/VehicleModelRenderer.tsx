import React, { useMemo, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Vehicle } from '../../types';
import { getVehicle3DConfig } from '../../data/vehicle3DRegistry';
import { ExplodedComponentData } from '../../data/explodedParts';

interface VehicleModelRendererProps {
  vehicle: Vehicle;
  modelUrl: string;
  selectedColorHex?: string;
  isExploded?: boolean;
  activeExplodedPart?: ExplodedComponentData | null;
  onModelLoaded?: (info: {
    bbox: THREE.Box3;
    size: THREE.Vector3;
    center: THREE.Vector3;
    hasSeparableNodes: boolean;
    nodeNames: string[];
  }) => void;
  onModelError?: (error: Error) => void;
}

export const VehicleModelRenderer: React.FC<VehicleModelRendererProps> = ({
  vehicle,
  modelUrl,
  selectedColorHex,
  isExploded = false,
  activeExplodedPart = null,
  onModelLoaded,
  onModelError,
}) => {
  const config = useMemo(() => getVehicle3DConfig(vehicle), [vehicle]);
  const explodedFactor = useRef(0);
  const separableNodesRef = useRef<{
    hood?: THREE.Object3D;
    doors?: THREE.Object3D[];
    wheels?: THREE.Object3D[];
    spoiler?: THREE.Object3D;
    engine?: THREE.Object3D;
  }>({});

  // Load GLTF Model
  let gltfResult: any = null;
  let loadError: Error | null = null;

  try {
    gltfResult = useGLTF(modelUrl);
  } catch (err: any) {
    loadError = err instanceof Error ? err : new Error(String(err));
  }

  useEffect(() => {
    if (loadError && onModelError) {
      onModelError(loadError);
    }
  }, [loadError, onModelError]);

  // Process, Validate and Enhance GLTF Model
  const { processedScene, modelMetrics, hasSeparableNodes, nodeNames } = useMemo(() => {
    if (!gltfResult || !gltfResult.scene) {
      return { processedScene: null, modelMetrics: null, hasSeparableNodes: false, nodeNames: [] };
    }

    const scene = gltfResult.scene;
    const cloned = scene.clone(true);

    // 1. Validate meshes exist
    let meshCount = 0;
    const foundNodeNames: string[] = [];
    const detectedNodes: {
      hood?: THREE.Object3D;
      doors?: THREE.Object3D[];
      wheels?: THREE.Object3D[];
      spoiler?: THREE.Object3D;
      engine?: THREE.Object3D;
    } = { doors: [], wheels: [] };

    cloned.traverse((child: THREE.Object3D) => {
      if (child.name) {
        foundNodeNames.push(child.name);
        const lower = child.name.toLowerCase();
        if (lower.includes('hood') || lower.includes('bonnet')) detectedNodes.hood = child;
        else if (lower.includes('door')) detectedNodes.doors?.push(child);
        else if (lower.includes('wheel') || lower.includes('tire') || lower.includes('rim')) detectedNodes.wheels?.push(child);
        else if (lower.includes('spoiler') || lower.includes('wing')) detectedNodes.spoiler = child;
        else if (lower.includes('engine') || lower.includes('motor')) detectedNodes.engine = child;
      }

      if ((child as THREE.Mesh).isMesh) {
        meshCount++;
      }
    });

    if (meshCount === 0) {
      if (onModelError) onModelError(new Error('Model contains no renderable meshes'));
      return { processedScene: null, modelMetrics: null, hasSeparableNodes: false, nodeNames: [] };
    }

    // 2. Validate Bounding Box & Scale to Physical Dimensions
    const bbox = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);

    if (size.x === 0 && size.y === 0 && size.z === 0) {
      if (onModelError) onModelError(new Error('Model has zero bounding box dimensions'));
      return { processedScene: null, modelMetrics: null, hasSeparableNodes: false, nodeNames: [] };
    }

    const targetLength = config.dimensions.lengthM || 4.65;
    // Determine maximum bounding dimension on horizontal plane (Z or X)
    const currentLength = Math.max(size.z, size.x);
    const scaleFactor = currentLength > 0 ? targetLength / currentLength : 1.0;

    cloned.scale.setScalar(scaleFactor);

    // Align center horizontally and ground tires exactly on y = 0
    const scaledMinY = bbox.min.y * scaleFactor;
    cloned.position.set(
      -center.x * scaleFactor,
      -scaledMinY,
      -center.z * scaleFactor
    );

    // 3. Upgrade Materials to Automotive PBR
    const activeHex = selectedColorHex || vehicle.paintOptions?.[0]?.hex || vehicle.accentColor || '#d40000';
    const activeColor = new THREE.Color(activeHex);

    cloned.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          const matName = (mat.name || mesh.name || '').toLowerCase();

          // Body Paint Materials
          if (
            matName.includes('body') ||
            matName.includes('paint') ||
            matName.includes('car_paint') ||
            matName.includes('exterior') ||
            matName.includes('chassis') ||
            matName.includes('metal')
          ) {
            const pbrPaint = new THREE.MeshPhysicalMaterial({
              color: activeColor,
              metalness: 0.85,
              roughness: 0.15,
              clearcoat: 1.0,
              clearcoatRoughness: 0.08,
              reflectivity: 0.95,
              envMapIntensity: 1.4,
            });
            mesh.material = pbrPaint;
          }
          // Glass Materials
          else if (
            matName.includes('glass') ||
            matName.includes('window') ||
            matName.includes('windshield')
          ) {
            const pbrGlass = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color('#10141a'),
              transparent: true,
              opacity: 0.35,
              transmission: 0.85,
              roughness: 0.05,
              metalness: 0.1,
              ior: 1.52,
              reflectivity: 0.95,
              clearcoat: 1.0,
            });
            mesh.material = pbrGlass;
          }
          // Tires / Rubber
          else if (matName.includes('tire') || matName.includes('rubber')) {
            const pbrRubber = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#121214'),
              roughness: 0.85,
              metalness: 0.1,
            });
            mesh.material = pbrRubber;
          }
          // Carbon Fiber
          else if (matName.includes('carbon')) {
            const pbrCarbon = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#151618'),
              roughness: 0.3,
              metalness: 0.4,
            });
            mesh.material = pbrCarbon;
          }
          // Rims / Wheels
          else if (matName.includes('rim') || matName.includes('wheel')) {
            const pbrRim = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#8a9098'),
              metalness: 0.9,
              roughness: 0.2,
            });
            mesh.material = pbrRim;
          }
          // Lights / Emissive
          else if (matName.includes('light') || matName.includes('lamp') || matName.includes('headlight')) {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.emissive = new THREE.Color('#ffffff');
              mat.emissiveIntensity = 1.8;
            }
          }
        }
      }
    });

    separableNodesRef.current = detectedNodes;
    const hasSeparable =
      Boolean(detectedNodes.hood) ||
      (detectedNodes.doors?.length ?? 0) > 0 ||
      (detectedNodes.wheels?.length ?? 0) > 0;

    return {
      processedScene: cloned,
      modelMetrics: { bbox, size, center },
      hasSeparableNodes: hasSeparable,
      nodeNames: foundNodeNames,
    };
  }, [gltfResult, vehicle, selectedColorHex, config, onModelError]);

  // Inform parent of model metadata and bounding box
  useEffect(() => {
    if (processedScene && modelMetrics && onModelLoaded) {
      onModelLoaded({
        bbox: modelMetrics.bbox,
        size: modelMetrics.size,
        center: modelMetrics.center,
        hasSeparableNodes,
        nodeNames,
      });
    }
  }, [processedScene, modelMetrics, hasSeparableNodes, nodeNames, onModelLoaded]);

  // Exploded View Component Interpolation (if separable nodes exist)
  useFrame((_, delta) => {
    const target = isExploded ? 1.0 : 0.0;
    explodedFactor.current = THREE.MathUtils.damp(explodedFactor.current, target, 5.0, delta);
    const f = explodedFactor.current;

    const { hood, doors, wheels, spoiler } = separableNodesRef.current;
    if (hood) {
      hood.position.y = f * 0.4;
      hood.position.z = f * 0.3;
    }
    if (doors && doors.length > 0) {
      doors.forEach((door, idx) => {
        door.position.x = (idx % 2 === 0 ? -1 : 1) * f * 0.5;
      });
    }
    if (wheels && wheels.length > 0) {
      wheels.forEach((w, idx) => {
        w.position.x = (idx % 2 === 0 ? -1 : 1) * f * 0.35;
      });
    }
    if (spoiler) {
      spoiler.position.y = f * 0.35;
    }
  });


  useEffect(() => {
    if (!processedScene) return;
    
    // Reset all to visible first
    processedScene.traverse((child) => {
      if (child.isMesh) {
        child.visible = true;
      }
    });

    if (activeExplodedPart) {
      const cat = activeExplodedPart.category.toUpperCase();
      
      processedScene.traverse((child) => {
        if (!child.isMesh) return;
        
        const name = (child.name || '').toLowerCase();
        const mat = child.material ? (Array.isArray(child.material) ? child.material[0] : child.material) : null;
        const matName = mat ? (mat.name || '').toLowerCase() : '';
        
        let keep = false;

        if (cat.includes('WHEEL') || cat.includes('TIRE')) {
          if (name.includes('wheel') || name.includes('tire') || name.includes('rim') || matName.includes('rubber') || matName.includes('rim')) keep = true;
        } else if (cat.includes('BRAKE') || cat.includes('SUSPENSION')) {
          if (name.includes('brake') || name.includes('caliper') || name.includes('suspension') || name.includes('rotor')) keep = true;
        } else if (cat.includes('POWERTRAIN') || cat.includes('ENGINE') || cat.includes('EXHAUST')) {
          if (name.includes('engine') || name.includes('motor') || name.includes('exhaust') || name.includes('pipe')) keep = true;
        } else if (cat.includes('AERO')) {
          if (name.includes('spoiler') || name.includes('wing') || name.includes('splitter') || name.includes('diffuser') || name.includes('aero')) keep = true;
        } else if (cat.includes('INTERIOR') || cat.includes('CABIN')) {
          if (name.includes('interior') || name.includes('seat') || name.includes('steering') || name.includes('dash') || name.includes('leather')) keep = true;
        } else if (cat.includes('GLASS')) {
          if (name.includes('glass') || name.includes('window') || name.includes('windshield') || matName.includes('glass')) keep = true;
        } else if (cat.includes('BODY') || cat.includes('CHASSIS')) {
          if (name.includes('body') || name.includes('hood') || name.includes('door') || name.includes('chassis') || name.includes('paint') || matName.includes('paint')) keep = true;
        } else if (cat.includes('LIGHT')) {
          if (name.includes('light') || name.includes('lamp') || name.includes('headlight')) keep = true;
        }
        
        if (!keep) {
          child.visible = false;
        }
      });
    }
  }, [processedScene, activeExplodedPart]);

  if (!processedScene) return null;

  return (
    <group>
      <primitive object={processedScene} />
      
      {/* Contact Ground Shadow under the vehicle */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[config.dimensions.widthM * 1.4, config.dimensions.lengthM * 1.15]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
