export type Market = 'USA' | 'UK' | 'EUROPE' | 'INDIA' | 'MIDDLE_EAST';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED';

export type BodyType = string;

export type PowertrainType = string;

export type DrivetrainType = string;

export type CameraPreset = 
  | 'HERO'
  | 'FRONT' 
  | 'FRONT_3_4' 
  | 'SIDE' 
  | 'REAR_3_4' 
  | 'REAR' 
  | 'DRIVER_SIDE' 
  | 'PASSENGER_SIDE' 
  | 'LOW_ANGLE' 
  | 'ROOF'
  | 'DRIVER_EYE'
  | 'COCKPIT_CENTER'
  | 'COCKPIT_STEERING'
  | 'COCKPIT_PASSENGER';

export type LightingMode = 'DAY' | 'SUNSET' | 'BLUE_HOUR' | 'NIGHT';

export type EnvironmentSetting = 'STUDIO' | 'CITY_NIGHT' | 'ALPINE' | 'TRACK' | 'COASTAL' | 'VAULT';

export type ViewExperienceMode = 
  | 'EXTERIOR' 
  | 'CINEMATIC' 
  | 'INTERIOR' 
  | 'ENGINEERING' 
  | 'PERFORMANCE' 
  | 'CONFIGURATOR'
  | 'EDITORIAL';

export type InteriorMaterial = 'LEATHER' | 'ALCANTARA' | 'CARBON_FIBER' | 'ALUMINIUM' | 'OPEN_PORE_WOOD' | 'ANODIZED_TITANIUM';

export type InteriorLightingTone = 'WARM_AMBER' | 'ELECTRIC_CYAN' | 'RACING_CRIMSON' | 'PURIST_WHITE' | 'ULTRAVIOLET';

export interface VehiclePaint {
  id: string;
  name: string;
  category: 'Metallic' | 'Satin Matte' | 'Pearlescent' | 'Carbon Heritage';
  hex: string;
  metallicFactor: number;
  roughness: number;
  clearcoat: number;
  priceDelta: number;
}

export interface VehicleWheel {
  id: string;
  name: string;
  sizeInch: number;
  finish: string;
  hex: string;
  priceDelta: number;
}

export interface BrakeCaliperOption {
  id: string;
  name: string;
  hex: string;
  material: 'Carbon-Ceramic' | 'High-Thermal Cast';
  priceDelta: number;
}

export interface InteriorTrimOption {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  materialType: InteriorMaterial;
  priceDelta: number;
}

export interface EngineeringComponent {
  id: string;
  name: string;
  category: 'Chassis & Tub' | 'Powertrain' | 'Suspension & Brakes' | 'Aerodynamics' | 'Cooling & Exhaust' | 'Electronics';
  metric: string;
  explodeOffset: [number, number, number];
  description: {
    whatItIs: string;
    whatItDoes: string;
    whyItMatters: string;
  };
  telemetry: {
    material: string;
    operatingTemp?: string;
    weightKg?: number;
    efficiencyRating?: string;
    peakLoad?: string;
  };
}

export interface InteriorHotspot {
  id: string;
  title: string;
  shortLabel: string;
  position: [number, number, number]; // 3D coordinate
  description: string;
  features: string[];
}

export interface VehicleSpecs {
  horsepower: number;
  torqueNm: number;
  zeroToHundredKmh: number;
  zeroToTwoHundredKmh: number;
  topSpeedKmh: number;
  weightKg: number;
  powerToWeightHpPerTonne: number;
  dragCoefficientCd: number;
  downforceAt250KmhKg: number;
  lateralGForce: number;
  braking100To0M: number;
  engineDisplacementLiters?: number;
  batteryCapacityKWh?: number;
  electricRangeKm?: number;
  transmission: string;
  chassisStructure: string;
}

export interface MarketPrice {
  USD: number;
  EUR: number;
  GBP: number;
  INR: number;
  AED: number;
}

export interface VehicleEditorial {
  verdict: string;
  characterScores: {
    performance: number; // 0-100
    comfort: number;
    luxury: number;
    driverEngagement: number;
    practicality: number;
    exclusivity: number;
  };
  whoIsThisFor: {
    targetProfile: 'Daily Driver' | 'Weekend Weapon' | 'Grand Continental Tourer' | 'Track Specialist' | 'Collector Asset';
    rationale: string;
  };
  strengths: string[];
  tradeOffs: string[];
  directCompetitors: string[]; // vehicle IDs
}

export type GeometryType = 
  | 'hypercar_aeroblade' 
  | 'supercar_midengine' 
  | 'grand_tourer' 
  | 'electric_hypergt' 
  | 'track_prototype' 
  | 'performance_suv'
  | 'luxury_sedan';

export interface VehicleDimensions {
  lengthM: number;
  widthM: number;
  heightM: number;
  wheelbaseM: number;
  groundClearanceM: number;
}

export interface VehicleCameraConfig {
  distance?: number;
  height?: number;
  targetY?: number;
  minDistance?: number;
  maxDistance?: number;
  fov?: number;
}

export type OutdoorLocation = 
  | 'ALPINE' 
  | 'SUNSET' 
  | 'COASTAL' 
  | 'CITY_NIGHT' 
  | 'FOREST';

export type PerspectivePreset = 
  | 'DEFAULT'
  | 'FRONT_3_4' 
  | 'REAR_3_4' 
  | 'SIDE' 
  | 'FRONT' 
  | 'REAR' 
  | 'TOP' 
  | 'LOW_ANGLE'
  | 'DRIVER_POV'
  | 'COCKPIT_CENTER';

export interface ExplodedPartInfo {
  id: string;
  name: string;
  category: string;
  offset: [number, number, number];
  description: string;
  materialSpec: string;
  engineeringMetric: string;
}

export interface VehicleHotspotItem {
  id: string;
  title: string;
  category: string;
  iconName: 'wind' | 'zap' | 'shield' | 'disc' | 'eye' | 'gauge' | 'sparkles' | 'compass' | 'battery' | 'layers';
  position: [number, number, number];
  description: string;
  metricLabel: string;
  metricValue: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  variant: string;
  modelYear: number;
  tagline: string;
  category: string;
  bodyType: string;
  useCase: string;
  powertrain: PowertrainType;
  drivetrain: DrivetrainType;
  accentColor: string;
  basePrice: MarketPrice;
  specs: VehicleSpecs;
  paintOptions: VehiclePaint[];
  wheelOptions: VehicleWheel[];
  brakeOptions: BrakeCaliperOption[];
  interiorOptions: InteriorTrimOption[];
  engineeringComponents: EngineeringComponent[];
  interiorHotspots: InteriorHotspot[];
  editorial: VehicleEditorial;
  geometryType: GeometryType;
  model3D?: string;
  dimensions?: VehicleDimensions;
  cameraConfig?: VehicleCameraConfig;
  environmentDefault?: 'SHOWROOM' | 'OUTDOOR';
}

export interface VehicleConfiguration {
  vehicleId: string;
  paint: VehiclePaint;
  wheel: VehicleWheel;
  caliper: BrakeCaliperOption;
  interior: InteriorTrimOption;
  carbonExteriorPack: boolean;
  sportTitaniumExhaust: boolean;
  aerodynamicTelemetryPack: boolean;
  totalPriceUSD: number;
  timestamp: string;
}

export interface SavedGarageItem {
  id: string;
  type: 'configured_build' | 'pinned_vehicle';
  vehicle: Vehicle;
  config?: VehicleConfiguration;
  savedAt: string;
  notes?: string;
}

export interface AdvisorAnswers {
  budgetRange: 'sub_150k' | '150k_300k' | '300k_600k' | 'over_600k' | 'unlimited';
  primaryUseCase: 'Daily Luxury' | 'Weekend Exhilaration' | 'Long-Distance Grand Touring' | 'Track Dominance' | 'Collector Asset';
  powertrainPreference: 'Pure ICE Symphony' | 'Instant Electric Surge' | 'Hybrid Synergy' | 'Any Masterpiece';
  drivingPriority: 'Razor-Sharp Agility' | 'Unmatched Straight-Line Velocity' | 'Effortless Cabin Serenity' | 'Exotic Presence';
  seatingNeed: '2 Seater Cockpit' | '2+2 GT' | '4+ Luxury Space';
}

export interface AdvisorMatchResult {
  vehicle: Vehicle;
  matchScore: number;
  matchReasons: string[];
  strengthsHighlight: string[];
  considerations: string[];
  recommendedConfigSummary: string;
}

export type AutomotiveFinishType = 'GLOSS' | 'METALLIC' | 'MATTE' | 'CARBON';
