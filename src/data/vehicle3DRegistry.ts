import { Vehicle, GeometryType, VehicleDimensions, VehicleCameraConfig, VehicleHotspotItem } from '../types';

export interface Vehicle3DAssetRecord {
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
}

/**
 * Physical Dimensions & 3D Visual Configurations for Every Vehicle in the AETHER Database
 */
export const VEHICLE_3D_REGISTRY: Record<string, Vehicle3DAssetRecord> = {
  'aether-apex-valkyrie-amr': {
    vehicleId: 'aether-apex-valkyrie-amr',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'porsche-911-gt3-rs': {
    vehicleId: 'porsche-911-gt3-rs',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'ferrari-sf90-stradale': {
    vehicleId: 'ferrari-sf90-stradale',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'lamborghini-revuelto': {
    vehicleId: 'lamborghini-revuelto',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'aston-martin-dbs-superleggera': {
    vehicleId: 'aston-martin-dbs-superleggera',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'rolls-royce-phantom': {
    vehicleId: 'rolls-royce-phantom',
    geometryType: 'luxury_sedan',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1631835695289-53f0ccfcba64?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.5,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 6.2,
      height: 1.6,
      targetY: 0.55,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'bentley-continental-gt-speed': {
    vehicleId: 'bentley-continental-gt-speed',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'bugatti-chiron-super-sport': {
    vehicleId: 'bugatti-chiron-super-sport',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'mclaren-750s': {
    vehicleId: 'mclaren-750s',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1620882814836-98a44b150961?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'mercedes-benz-amg-gt-63-s-e-performance': {
    vehicleId: 'mercedes-benz-amg-gt-63-s-e-performance',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1605515298946-d062f2e9dc53?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'audi-rs-e-tron-gt': {
    vehicleId: 'audi-rs-e-tron-gt',
    geometryType: 'luxury_sedan',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c3fe?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.5,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 6.2,
      height: 1.6,
      targetY: 0.55,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'land-rover-range-rover-sv': {
    vehicleId: 'land-rover-range-rover-sv',
    geometryType: 'performance_suv',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1550262143-6df51b2cce4a?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.8,
      wheelbaseM: 2.7,
      groundClearanceM: 0.2,
    },
    cameraConfig: {
      distance: 6.5,
      height: 1.85,
      targetY: 0.7,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'lexus-lfa': {
    vehicleId: 'lexus-lfa',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1582236353381-80bb6eebdb0a?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'maserati-mc20': {
    vehicleId: 'maserati-mc20',
    geometryType: 'supercar_midengine',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1503376760366-501b87a030b7?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.2,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 5.5,
      height: 1.42,
      targetY: 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
  'genesis-g90': {
    vehicleId: 'genesis-g90',
    geometryType: 'luxury_sedan',
    is3DAvailable: false,
    exteriorImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=2400'
    ],
    interiorImages: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=2400',
      'https://images.unsplash.com/photo-1600712243189-aaa2152723b4?auto=format&fit=crop&q=80&w=2400'
    ],
    dimensions: {
      lengthM: 4.7,
      widthM: 2.0,
      heightM: 1.5,
      wheelbaseM: 2.7,
      groundClearanceM: 0.1,
    },
    cameraConfig: {
      distance: 6.2,
      height: 1.6,
      targetY: 0.55,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  },
};

export function getVehicle3DConfig(vehicle: Vehicle): Vehicle3DAssetRecord {
  if (VEHICLE_3D_REGISTRY[vehicle.id]) {
    return VEHICLE_3D_REGISTRY[vehicle.id];
  }

  // Sensible adaptive fallback based on category
  const isSUV = vehicle.category?.toLowerCase().includes('suv');
  const isSedan = vehicle.category?.toLowerCase().includes('sedan') || vehicle.category?.toLowerCase().includes('executive');
  const isGT = vehicle.category?.toLowerCase().includes('tourer');
  const isEV = vehicle.category?.toLowerCase().includes('electric');
  const isTrack = vehicle.category?.toLowerCase().includes('track');

  let geometryType: GeometryType = 'supercar_midengine';
  if (isSUV) geometryType = 'performance_suv';
  else if (isSedan) geometryType = 'luxury_sedan';
  else if (isGT) geometryType = 'grand_tourer';
  else if (isEV) geometryType = 'electric_hypergt';
  else if (isTrack) geometryType = 'track_prototype';
  else if (vehicle.category?.toLowerCase().includes('hypercar')) geometryType = 'hypercar_aeroblade';

  return {
    vehicleId: vehicle.id,
    geometryType,
    is3DAvailable: true,
    dimensions: {
      lengthM: 4.65,
      widthM: 1.98,
      heightM: isSUV ? 1.8 : isSedan ? 1.5 : 1.2,
      wheelbaseM: 2.75,
      groundClearanceM: isSUV ? 0.2 : 0.1,
    },
    cameraConfig: {
      distance: isSUV ? 6.5 : isSedan ? 6.2 : 5.5,
      height: isSUV ? 1.85 : isSedan ? 1.6 : 1.42,
      targetY: isSUV ? 0.7 : isSedan ? 0.55 : 0.46,
      minDistance: 2.3,
      maxDistance: 10.5,
      fov: 43,
    },
    defaultEnvironment: 'SHOWROOM',
  };
}

/**
 * Dynamic Hotspots Customized by Vehicle Category & Architecture
 * (Ensures every category has appropriate, non-generic inspection nodes)
 */
export function getVehicleHotspots(vehicle: Vehicle): VehicleHotspotItem[] {
  const config = getVehicle3DConfig(vehicle);
  const { geometryType, dimensions } = config;
  const lengthScale = dimensions.lengthM / 4.65;
  const heightScale = dimensions.heightM / 1.2;

  switch (geometryType) {
    case 'hypercar_aeroblade':
      return [
        {
          id: 'aero',
          title: 'AERODYNAMICS & S-DUCT',
          category: 'ACTIVE AERO',
          iconName: 'wind',
          position: [0, 0.42 * heightScale, 2.05 * lengthScale],
          description: `Carbon-fiber front splitter and integrated S-Duct channel generate up to ${
            vehicle.specs?.downforceAt250KmhKg || 540
          } kg of front downforce at high velocities with Cd ${vehicle.specs?.dragCoefficientCd || 0.33}.`,
          metricLabel: 'DOWNFORCE',
          metricValue: `${vehicle.specs?.downforceAt250KmhKg || 540} KG @ 250 KM/H`,
        },
        {
          id: 'powertrain',
          title: 'POWERTRAIN & ENGINE',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.72 * heightScale, -1.15 * lengthScale],
          description: `Mid-mounted ${vehicle.powertrain} producing ${
            vehicle.specs?.horsepower
          } BHP and ${vehicle.specs?.torqueNm} Nm of torque paired with ${vehicle.specs?.transmission}.`,
          metricLabel: 'OUTPUT',
          metricValue: `${vehicle.specs?.horsepower} BHP / ${vehicle.specs?.torqueNm} NM`,
        },
        {
          id: 'cockpit',
          title: 'CARBON MONOCOQUE',
          category: 'CHASSIS & SAFETY',
          iconName: 'shield',
          position: [0, 0.92 * heightScale, 0.05 * lengthScale],
          description: `Autoclave-cured ${vehicle.specs?.chassisStructure} keeping curb weight to ${
            vehicle.specs?.weightKg || 1350
          } kg.`,
          metricLabel: 'CURB WEIGHT',
          metricValue: `${vehicle.specs?.weightKg || 1350} KG`,
        },
        {
          id: 'brakes',
          title: 'FORGED WHEELS & CERAMICS',
          category: 'DYNAMICS',
          iconName: 'disc',
          position: [0.96, 0.38 * heightScale, 1.36 * lengthScale],
          description: `Center-lock forged alloy wheels with 410mm carbon-ceramic rotors (100–0 km/h in ${
            vehicle.specs?.braking100To0M || 29.2
          }m).`,
          metricLabel: 'BRAKING (100–0)',
          metricValue: `${vehicle.specs?.braking100To0M || 29.2} METERS`,
        },
        {
          id: 'lighting',
          title: 'MATRIX LED OPTICS',
          category: 'LIGHTING',
          iconName: 'eye',
          position: [-0.64, 0.52 * heightScale, 2.14 * lengthScale],
          description: `High-throw adaptive crystal matrix LED laser projectors with dynamic cornering illumination.`,
          metricLabel: 'ILLUMINATION',
          metricValue: 'ADAPTIVE MATRIX LED',
        },
        {
          id: 'rear_wing',
          title: 'ACTIVE DOWNFORCE WING',
          category: 'STABILITY',
          iconName: 'gauge',
          position: [0, 1.12 * heightScale, -2.12 * lengthScale],
          description: `Dual swan-neck mounted full-carbon aerofoil with hydraulic DRS delivering stability across ${
            vehicle.specs?.lateralGForce || 1.55
          }G lateral loads.`,
          metricLabel: 'LATERAL GRIP',
          metricValue: `${vehicle.specs?.lateralGForce || 1.55} G`,
        },
      ];

    case 'track_prototype':
      return [
        {
          id: 'track_aero',
          title: 'GT MOTORSPORT AERO',
          category: 'ACTIVE AERO',
          iconName: 'wind',
          position: [0, 0.44 * heightScale, 2.0 * lengthScale],
          description: `Front diffuser flaps and hood extraction louvers generating continuous aerodynamic balance (${
            vehicle.specs?.downforceAt250KmhKg || 860
          } kg peak downforce).`,
          metricLabel: 'TOTAL DOWNFORCE',
          metricValue: `${vehicle.specs?.downforceAt250KmhKg || 860} KG`,
        },
        {
          id: 'track_engine',
          title: 'COMPETITION POWERTRAIN',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.70 * heightScale, -1.35 * lengthScale],
          description: `High-revving ${vehicle.powertrain} revving to 9,000 RPM, producing ${vehicle.specs?.horsepower} BHP through ${vehicle.specs?.transmission}.`,
          metricLabel: 'MAX REVS / POWER',
          metricValue: `9,000 RPM / ${vehicle.specs?.horsepower} BHP`,
        },
        {
          id: 'track_chassis',
          title: 'LIGHTWEIGHT CHASSIS & CAGE',
          category: 'CHASSIS & RIGIDITY',
          iconName: 'shield',
          position: [0, 0.95 * heightScale, 0.0],
          description: `Aluminum-steel composite body with carbon-fiber doors, magnesium roof, and integrated safety roll-cage.`,
          metricLabel: 'WEIGHT',
          metricValue: `${vehicle.specs?.weightKg || 1450} KG`,
        },
        {
          id: 'track_brakes',
          title: 'PCCB CERAMIC BRAKES',
          category: 'DYNAMICS',
          iconName: 'disc',
          position: [0.94, 0.36 * heightScale, 1.25 * lengthScale],
          description: `Forged lightweight magnesium wheels with cross-drilled ceramic composite discs and race-compound pads.`,
          metricLabel: 'DECELERATION',
          metricValue: `${vehicle.specs?.braking100To0M || 28.5} M (100–0)`,
        },
        {
          id: 'track_wing',
          title: 'SWAN-NECK GT WING',
          category: 'DOWNFORCE',
          iconName: 'gauge',
          position: [0, 1.25 * heightScale, -2.05 * lengthScale],
          description: `Continuously adjustable active DRS swan-neck aerofoil providing instantaneous airbrake functionality under heavy braking.`,
          metricLabel: 'DRS FUNCTION',
          metricValue: 'ACTIVE HYDRAULIC DRS',
        },
      ];

    case 'luxury_sedan':
      return [
        {
          id: 'sedan_grille',
          title: 'ILLUMINATED PANTHEON GRILLE',
          category: 'PRESENCE & ARCHITECTURE',
          iconName: 'sparkles',
          position: [0, 0.78 * heightScale, 2.45 * lengthScale],
          description: `Hand-polished 316L stainless steel monument grille with warm laser backlighting and iconic hood mascot.`,
          metricLabel: 'CRAFT',
          metricValue: 'HAND-POLISHED STAINLESS',
        },
        {
          id: 'sedan_engine',
          title: 'EFFORTLESS V12 SYMPHONY',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.75 * heightScale, 1.35 * lengthScale],
          description: `Smooth ${vehicle.powertrain} delivering ${vehicle.specs?.horsepower} BHP and ${vehicle.specs?.torqueNm} Nm from just 1,700 RPM.`,
          metricLabel: 'EFFORTLESS TORQUE',
          metricValue: `${vehicle.specs?.torqueNm} NM @ LOW RPM`,
        },
        {
          id: 'sedan_cabin',
          title: 'WHISPER ACOUSTIC VAULT',
          category: 'LUXURY & COMFORT',
          iconName: 'shield',
          position: [0, 0.98 * heightScale, 0.0],
          description: `130kg of sound deadening with 6mm double-glazed acoustic glass and Starlight Headliner optical fiber ceiling.`,
          metricLabel: 'INTERIOR AMBIENCE',
          metricValue: '<52 DB @ 120 KM/H',
        },
        {
          id: 'sedan_lounge',
          title: 'EXECUTIVE REAR SUITE',
          category: 'SERENITY',
          iconName: 'layers',
          position: [0, 0.95 * heightScale, -0.9 * lengthScale],
          description: `First-class reclining lounge seating with heated massage, champagne chiller, and rear entertainment screens.`,
          metricLabel: 'SEATING',
          metricValue: 'FIRST CLASS SUITE',
        },
        {
          id: 'sedan_suspension',
          title: 'MAGIC CARPET AIR SUSPENSION',
          category: 'DYNAMICS',
          iconName: 'compass',
          position: [0.95, 0.40 * heightScale, 1.45 * lengthScale],
          description: `Flagbearer camera system reads road undulations ahead and pre-adjusts adaptive air dampers in milliseconds.`,
          metricLabel: 'RIDE QUALITY',
          metricValue: 'PREDICTIVE AIR RIDE',
        },
      ];

    case 'performance_suv':
      return [
        {
          id: 'suv_terrain',
          title: 'ALL-TERRAIN RESPONSE DYNAMICS',
          category: 'CAPABILITY',
          iconName: 'compass',
          position: [0, 0.85 * heightScale, 2.2 * lengthScale],
          description: `Intelligent active all-wheel drive with twin-speed transfer box and electronic active locking rear differential.`,
          metricLabel: 'TERRAIN SYSTEM',
          metricValue: 'DYNAMIC AWD + LOCKERS',
        },
        {
          id: 'suv_engine',
          title: 'HIGH-OUTPUT TWIN-TURBO',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.95 * heightScale, 1.25 * lengthScale],
          description: `${vehicle.powertrain} producing ${vehicle.specs?.horsepower} BHP, propelling this luxury SUV from 0-100 in ${vehicle.specs?.zeroToHundredKmh}s.`,
          metricLabel: '0–100 KM/H',
          metricValue: `${vehicle.specs?.zeroToHundredKmh} SECONDS`,
        },
        {
          id: 'suv_cabin',
          title: 'COMMAND DRIVING POSITION',
          category: 'INTERIOR',
          iconName: 'shield',
          position: [0, 1.25 * heightScale, 0.2 * lengthScale],
          description: `Semi-aniline Windsor leather seats, 13.1" curved glass Pivi Pro display, and active road noise cancellation.`,
          metricLabel: 'SOUND SYSTEM',
          metricValue: 'MERIDIAN SIGNATURE 1600W',
        },
        {
          id: 'suv_brakes',
          title: '23" FORGED WHEELS & BRAKES',
          category: 'CHASSIS',
          iconName: 'disc',
          position: [1.02, 0.48 * heightScale, 1.4 * lengthScale],
          description: `Massive 420mm ventilated brake discs with 8-piston calipers engineered for maximum thermal endurance.`,
          metricLabel: 'WHEEL SIZE',
          metricValue: '23-INCH FORGED ALLOY',
        },
        {
          id: 'suv_suspension',
          title: 'DYNAMIC AIR SUSPENSION',
          category: 'ADAPTIVE RIDE',
          iconName: 'gauge',
          position: [0, 0.65 * heightScale, -2.1 * lengthScale],
          description: `Switchable-volume air springs with twin-valve active dampers offering up to ${Math.round(
            dimensions.groundClearanceM * 1000
          )}mm of variable ground clearance.`,
          metricLabel: 'GROUND CLEARANCE',
          metricValue: `${Math.round(dimensions.groundClearanceM * 1000)} MM`,
        },
      ];

    case 'electric_hypergt':
      return [
        {
          id: 'ev_battery',
          title: '800V HIGH-DENSITY BATTERY',
          category: 'ENERGY ARCHITECTURE',
          iconName: 'battery',
          position: [0, 0.25 * heightScale, 0.0],
          description: `Underfloor liquid-cooled lithium-ion battery pack with 800-volt architecture supporting up to 270 kW ultra-fast charging.`,
          metricLabel: 'CHARGING SPEED',
          metricValue: '800V ULTRA-FAST (270 KW)',
        },
        {
          id: 'ev_powertrain',
          title: 'DUAL-MOTOR TORQUE VECTORING',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.62 * heightScale, 1.2 * lengthScale],
          description: `Permanently excited synchronous motors delivering instantaneous torque of ${vehicle.specs?.torqueNm} Nm with electric torque vectoring.`,
          metricLabel: 'INSTANT TORQUE',
          metricValue: `${vehicle.specs?.torqueNm} NM (0 RPM)`,
        },
        {
          id: 'ev_aero',
          title: 'ACTIVE FLUSH AERODYNAMICS',
          category: 'EFFICIENCY',
          iconName: 'wind',
          position: [0, 0.48 * heightScale, 2.15 * lengthScale],
          description: `Controllable cool-air intakes and smooth underbody aero panels yielding an ultra-low drag coefficient of Cd ${
            vehicle.specs?.dragCoefficientCd || 0.24
          }.`,
          metricLabel: 'DRAG COEFFICIENT',
          metricValue: `CD ${vehicle.specs?.dragCoefficientCd || 0.24}`,
        },
        {
          id: 'ev_brakes',
          title: 'REGENERATIVE BRAKING',
          category: 'ENERGY RECOVERY',
          iconName: 'disc',
          position: [0.95, 0.38 * heightScale, 1.35 * lengthScale],
          description: `Recovers up to 265 kW of kinetic energy during braking, blended seamlessly with tungsten carbide or ceramic discs.`,
          metricLabel: 'RECUPERATION',
          metricValue: 'UP TO 265 KW REGEN',
        },
        {
          id: 'ev_lighting',
          title: 'ANIMATED MATRIX LIGHT BAR',
          category: 'LIGHTING',
          iconName: 'eye',
          position: [0, 0.60 * heightScale, -2.25 * lengthScale],
          description: `Full-width rear OLED light bar with dynamic staging animations on approach and departure.`,
          metricLabel: 'LIGHT SIGNATURE',
          metricValue: 'CONTINUOUS OLED BLADE',
        },
      ];

    case 'grand_tourer':
    default:
      return [
        {
          id: 'gt_front',
          title: 'AERODYNAMIC GRAND TOURING NOSE',
          category: 'AERO & COOLING',
          iconName: 'wind',
          position: [0, 0.52 * heightScale, 2.15 * lengthScale],
          description: `Sculpted front aperture feeding massive heat exchangers with integrated carbon-fiber aerodynamic side splitters.`,
          metricLabel: 'COOLING FLOW',
          metricValue: 'HIGH-VOLUME APERTURE',
        },
        {
          id: 'gt_engine',
          title: 'FRONT-MID GRAND TOURER SYMPHONY',
          category: 'PROPULSION',
          iconName: 'zap',
          position: [0, 0.72 * heightScale, 1.15 * lengthScale],
          description: `Front-mid mounted ${vehicle.powertrain} producing ${
            vehicle.specs?.horsepower
          } BHP and ${vehicle.specs?.torqueNm} Nm of peak torque.`,
          metricLabel: 'POWER & TORQUE',
          metricValue: `${vehicle.specs?.horsepower} BHP / ${vehicle.specs?.torqueNm} NM`,
        },
        {
          id: 'gt_cabin',
          title: 'HAND-CRAFTED GT CABIN',
          category: 'INTERIOR LUXURY',
          iconName: 'shield',
          position: [0, 0.95 * heightScale, -0.1 * lengthScale],
          description: `Bridge of Weir hand-stitched leather upholstery, knurled metal switchgear, and acoustic comfort glazing.`,
          metricLabel: 'CABIN FINISH',
          metricValue: 'HAND-STITCHED LEATHER',
        },
        {
          id: 'gt_brakes',
          title: 'CARBON-CERAMIC BRAKING SYSTEM',
          category: 'DYNAMICS',
          iconName: 'disc',
          position: [0.95, 0.38 * heightScale, 1.35 * lengthScale],
          description: `Lightweight 10-spoke forged alloys housing 410mm carbon-ceramic discs with 6-piston monobloc calipers.`,
          metricLabel: 'STOPPING POWER',
          metricValue: `${vehicle.specs?.braking100To0M || 30.5} M (100–0)`,
        },
        {
          id: 'gt_exhaust',
          title: 'QUAD ACTIVE EXHAUST VALVES',
          category: 'ACOUSTICS',
          iconName: 'gauge',
          position: [0, 0.55 * heightScale, -2.25 * lengthScale],
          description: `Electronic active bypass valves transition seamlessly from whisper-quiet highway cruising to roaring full-throttle symphony.`,
          metricLabel: 'EXHAUST VALVES',
          metricValue: 'DUAL-MODE ACTIVE',
        },
      ];
  }
}
