const fs = require('fs');
const content = fs.readFileSync('src/data/vehicle3DRegistry.ts', 'utf8');

// Replace Vehicle3DAssetRecord interface
const updatedContent = content.replace(
  /export interface Vehicle3DAssetRecord \{[\s\S]*?\}/,
  `export interface Vehicle3DAssetRecord {
  vehicleId: string;
  geometryType: GeometryType;
  modelUrl?: string;
  exteriorImages?: string[];
  interiorImages?: string[];
  is3DAvailable: boolean;
  dimensions: VehicleDimensions;
  cameraConfig: VehicleCameraConfig;
  defaultEnvironment: 'SHOWROOM' | 'OUTDOOR';
  customHotspots?: VehicleHotspotItem[];
}`
);

fs.writeFileSync('src/data/vehicle3DRegistry.ts', updatedContent);
