const fs = require('fs');
let code = fs.readFileSync('src/components/showroom/VehicleShowroom.tsx', 'utf8');

// Add imports
if (!code.includes('PremiumLoadingOverlay')) {
  code = code.replace(
    "import { ScreenSpaceHotspotsOverlay } from './ScreenSpaceHotspotsOverlay';",
    "import { ScreenSpaceHotspotsOverlay } from './ScreenSpaceHotspotsOverlay';\nimport { PremiumLoadingOverlay } from './PremiumLoadingOverlay';\nimport { VehicleImagePresentation } from '../3d/VehicleImagePresentation';"
  );
}

// Add state for model loading error
if (!code.includes('const [modelError, setModelError]')) {
  code = code.replace(
    "const [retryKey, setRetryKey] = useState(0);",
    "const [retryKey, setRetryKey] = useState(0);\n  const [modelError, setModelError] = useState(false);"
  );
}

// Fix the render logic
const renderCanvasBlock = `
        {/* Layer 1: Pure 3D WebGL Canvas */}
        <CanvasErrorBoundary onRetry={() => setRetryKey((k) => k + 1)} onClose={onClose}>
`;

const renderCanvasReplacement = `
        {/* Layer 0: Loading Overlay */}
        <PremiumLoadingOverlay vehicle={vehicle} isVisible={isLoading} progress={loadingProgress} />

        {/* Layer 1: 3D or Image Fallback */}
        {vehicle3DConfig.is3DAvailable && !modelError ? (
          <CanvasErrorBoundary onRetry={() => setRetryKey((k) => k + 1)} onClose={onClose}>
            <Suspense fallback={null}>
              <Canvas
                key={retryKey}
                shadows
                camera={{ fov: 42, near: 0.1, far: 50 }}
                gl={{ 
                  antialias: true, 
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                  preserveDrawingBuffer: true
                }}
              >
                <VehicleScene
                  vehicle={vehicle}
                  modelUrl={vehicle.model3D}
                  selectedColorHex={selectedColor?.hex}
                  resetTrigger={resetTrigger}
                  viewMode={viewMode}
                  environmentMode={environmentMode}
                  outdoorLocation={outdoorLocation}
                  showHotspots={showHotspots}
                  isExploded={isExploded}
                  activeExplodedPart={selectedExplodedPart}
                  onSelectExplodedPart={handleSelectComponent}
                  perspectivePreset={perspectivePreset}
                  isCinematicPaused={isCinematicPaused}
                  currentShotIndex={currentShotIndex}
                  thirdPersonPreset={thirdPersonPreset}
                  onShotChange={setCurrentShotIndex}
                  onProjectedHotspots={setProjectedHotspots}
                  onModelLoadedState={(loaded, hasSeparableNodes) => {
                    if (loaded) {
                      setIsLoading(false);
                      setLoadingProgress(100);
                      setModelError(false);
                      setHasSeparableComponents(hasSeparableNodes);
                    }
                  }}
                  onError={(err) => {
                    console.error('Failed to load 3D model, falling back to images', err);
                    setModelError(true);
                    setIsLoading(false);
                    setHasSeparableComponents(false);
                  }}
                />
              </Canvas>
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <VehicleImagePresentation 
            vehicle={vehicle} 
            images={vehicle3DConfig.exteriorImages || []} 
            activePart={selectedExplodedPart}
          />
        )}
`;

// Replace the old canvas with the new logic
const oldCanvasStart = code.indexOf('<CanvasErrorBoundary');
const oldCanvasEnd = code.indexOf('</CanvasErrorBoundary>') + '</CanvasErrorBoundary>'.length;
if (oldCanvasStart !== -1 && oldCanvasEnd !== -1) {
  code = code.slice(0, oldCanvasStart) + renderCanvasReplacement.trim() + code.slice(oldCanvasEnd);
}

// Remove the old `<Suspense fallback={null}> <Canvas ... ` because my replacement replaces CanvasErrorBoundary 
// which wrapped it.

fs.writeFileSync('src/components/showroom/VehicleShowroom.tsx', code);
