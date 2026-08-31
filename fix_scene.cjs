const fs = require('fs');
let sceneContent = fs.readFileSync('src/components/3d/VehicleScene.tsx', 'utf8');

const regex = /<Suspense fallback=\{null\}>\s*\{\!activeExplodedPart[\s\S]*?\{\/\* Image Fallback Handled at Showroom Level \*\/\}\s*\)\}\s*<\/Suspense>/;
sceneContent = sceneContent.replace(regex, `<Suspense fallback={null}>
        {effectiveModelUrl && !hasModelError ? (
          <VehicleModelRenderer
            vehicle={vehicle}
            modelUrl={effectiveModelUrl}
            selectedColorHex={effectiveColorHex}
            isExploded={isExploded}
            activeExplodedPart={activeExplodedPart}
            onModelLoaded={handleModelLoaded}
            onModelError={handleModelError}
          />
        ) : null}
      </Suspense>`);

fs.writeFileSync('src/components/3d/VehicleScene.tsx', sceneContent);
