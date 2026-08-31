const fs = require('fs');

const content = fs.readFileSync('src/data/vehicle3DRegistry.ts', 'utf8');

// We will replace the VEHICLE_3D_REGISTRY object.
// To do this reliably, we can use a regex to find the start and the end, or we can just replace everything between 
// 'export const VEHICLE_3D_REGISTRY: Record<string, Vehicle3DAssetRecord> = {'
// and the next 'export function getVehicle3DConfig'

const startIndex = content.indexOf('export const VEHICLE_3D_REGISTRY: Record<string, Vehicle3DAssetRecord> = {');
const endIndex = content.indexOf('export function getVehicle3DConfig');

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find registry boundaries");
  process.exit(1);
}

const unsplashUrls = {
  'porsche-911-gt3-rs': [
    'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400', // porsche generic
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2400',
  ],
  'ferrari-sf90-stradale': [
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400'
  ],
  'lamborghini-revuelto': [
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=2400'
  ],
  'aston-martin-dbs-superleggera': [
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2400'
  ],
  'rolls-royce-phantom': [
    'https://images.unsplash.com/photo-1631835695289-53f0ccfcba64?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80&w=2400'
  ],
  'bentley-continental-gt-speed': [
    'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=2400'
  ],
  'bugatti-chiron-super-sport': [
    'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
  ],
  'mclaren-750s': [
    'https://images.unsplash.com/photo-1620882814836-98a44b150961?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400'
  ],
  'mercedes-benz-amg-gt-63-s-e-performance': [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1605515298946-d062f2e9dc53?auto=format&fit=crop&q=80&w=2400'
  ],
  'audi-rs-e-tron-gt': [
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c3fe?auto=format&fit=crop&q=80&w=2400'
  ],
  'land-rover-range-rover-sv': [
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1550262143-6df51b2cce4a?auto=format&fit=crop&q=80&w=2400'
  ],
  'lexus-lfa': [
    'https://images.unsplash.com/photo-1582236353381-80bb6eebdb0a?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2400'
  ],
  'maserati-mc20': [
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400'
  ],
  'genesis-g90': [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=2400'
  ],
  'aether-apex-valkyrie-amr': [
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400',
    'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400'
  ]
};

const defaultImages = [
  'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400',
  'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400'
];

const allIds = [
  'aether-apex-valkyrie-amr',
  'porsche-911-gt3-rs',
  'ferrari-sf90-stradale',
  'lamborghini-revuelto',
  'aston-martin-dbs-superleggera',
  'rolls-royce-phantom',
  'bentley-continental-gt-speed',
  'bugatti-chiron-super-sport',
  'mclaren-750s',
  'mercedes-benz-amg-gt-63-s-e-performance',
  'audi-rs-e-tron-gt',
  'land-rover-range-rover-sv',
  'lexus-lfa',
  'maserati-mc20',
  'genesis-g90'
];

let registryText = 'export const VEHICLE_3D_REGISTRY: Record<string, Vehicle3DAssetRecord> = {\n';

allIds.forEach(id => {
  const isSUV = id.includes('rover');
  const isSedan = id.includes('phantom') || id.includes('g90') || id.includes('audi');
  
  registryText += `  '${id}': {
    vehicleId: '${id}',
    geometryType: '${isSUV ? 'performance_suv' : isSedan ? 'luxury_sedan' : 'supercar_midengine'}',
    is3DAvailable: false,
    exteriorImages: [
${(unsplashUrls[id] || defaultImages).map(url => `      '${url}'`).join(',\n')}
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: ${isSUV ? 1.8 : isSedan ? 1.5 : 1.2},
      wheelbaseM: 2.7,
      groundClearanceM: ${isSUV ? 0.2 : 0.1},
    },
    cameraConfig: {
      distance: ${isSUV ? 6.5 : isSedan ? 6.2 : 5.5},
      height: ${isSUV ? 1.85 : isSedan ? 1.6 : 1.42},
      targetY: ${isSUV ? 0.7 : isSedan ? 0.55 : 0.46},
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },\n`;
});

registryText += '};\n\n';

const newContent = content.slice(0, startIndex) + registryText + content.slice(endIndex);

fs.writeFileSync('src/data/vehicle3DRegistry.ts', newContent);
console.log('Done!');
