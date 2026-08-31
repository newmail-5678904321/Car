const fs = require('fs');
let content = fs.readFileSync('src/components/3d/VehicleModelRenderer.tsx', 'utf8');

if (!content.includes('activeExplodedPart?: ExplodedComponentData | null;')) {
  // 1. Add import
  content = content.replace(
    "import { getVehicle3DConfig } from '../../data/vehicle3DRegistry';",
    "import { getVehicle3DConfig } from '../../data/vehicle3DRegistry';\nimport { ExplodedComponentData } from '../../data/explodedParts';"
  );

  // 2. Add to Props
  content = content.replace(
    "isExploded?: boolean;",
    "isExploded?: boolean;\n  activeExplodedPart?: ExplodedComponentData | null;"
  );

  // 3. Add to Destructuring
  content = content.replace(
    "isExploded = false,",
    "isExploded = false,\n  activeExplodedPart = null,"
  );

  // 4. Update the component isolation logic (Component Structure & Isolation - prompt requirements 7 & 8)
  // Find where it renders `<primitive object={processedScene} />`
  // And wrap it or traverse to hide nodes not in activeExplodedPart.
  // Actually, wait! We can just apply visibility at the end of useMemo for processedScene, or in a useEffect.
  
  // Let's add a useEffect to handle activeExplodedPart visibility.
  const useEffectBlock = `
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
`;
  
  content = content.replace("  if (!processedScene) return null;", useEffectBlock + "\n  if (!processedScene) return null;");
  
  fs.writeFileSync('src/components/3d/VehicleModelRenderer.tsx', content);
}
