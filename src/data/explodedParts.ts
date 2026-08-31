import { Vehicle } from '../types';

export interface ExplodedComponentData {
  id: string;
  name: string;
  category: 'AERO' | 'BODY' | 'ENGINE' | 'BRAKES' | 'WHEELS' | 'SUSPENSION' | 'INTERIOR' | 'EXHAUST';
  position: [number, number, number]; // 3D anchor position on vehicle
  cameraTarget: [number, number, number]; // Center of focus for isolated view
  cameraPosition: [number, number, number]; // Framing position for ~40-60% viewport
  description: string;
  material: string;
  functionSummary: string;
  performanceMetric: string;
  metricLabel: string;
  metricValue: string;
}

export function getVehicleExplodedParts(vehicle: Vehicle): ExplodedComponentData[] {
  const isEV = vehicle.powertrain?.toLowerCase().includes('electric') || vehicle.powertrain?.toLowerCase().includes('ev');
  const isHybrid = vehicle.powertrain?.toLowerCase().includes('hybrid');
  const horsepower = vehicle.specs?.horsepower || 800;
  const torque = vehicle.specs?.torqueNm || 850;
  const downforce = vehicle.specs?.downforceAt250KmhKg || 480;
  const weight = vehicle.specs?.weightKg || 1420;
  const braking = vehicle.specs?.braking100To0M || 29.5;
  const lateralG = vehicle.specs?.lateralGForce || 1.45;

  return [
    {
      id: 'body',
      name: 'CARBON MONOCOQUE BODY',
      category: 'BODY',
      position: [0, 0.85, 0.4],
      cameraTarget: [0, 0.65, 0.1],
      cameraPosition: [-3.2, 1.3, 3.2],
      description: 'High-modulus carbon-fiber composite shell cured in negative pressure autoclave for maximum structural rigidity and low mass.',
      material: 'Dry Prepreg T800 Carbon Fiber & Epoxy Resin Matrix',
      functionSummary: 'Distributes aerodynamic loads and delivers 52,000 Nm/deg torsional resistance.',
      performanceMetric: `${Math.round(weight * 0.22)} kg total monocoque weight (-45% vs aluminum)`,
      metricLabel: 'TORSIONAL RIGIDITY',
      metricValue: '52,000 NM / DEG',
    },
    {
      id: 'engine',
      name: isEV ? '800V DUAL DRIVE UNIT' : isHybrid ? 'HYBRID V-BLOCK & MOTOR' : 'POWERTRAIN DRIVE BLOCK',
      category: 'ENGINE',
      position: [0, 0.55, -0.6],
      cameraTarget: [0, 0.45, -0.6],
      cameraPosition: [-1.8, 1.1, -0.2],
      description: `${vehicle.powertrain} engineered with dry-sump lubrication, forged internals, and high-frequency motorsport ECU management.`,
      material: isEV ? 'Silicon-Carbide Inverters & Hairpin Copper Stators' : 'Aluminium-Silicium Crankcase & Titanium Con-Rods',
      functionSummary: 'Converts thermal & electrical energy into instantaneous mechanical drive.',
      performanceMetric: `${horsepower} BHP output with peak torque of ${torque} Nm.`,
      metricLabel: 'POWER OUTPUT',
      metricValue: `${horsepower} HP / ${torque} NM`,
    },
    {
      id: 'brakes',
      name: 'CARBON CERAMIC BRAKES',
      category: 'BRAKES',
      position: [-0.85, 0.35, 1.38],
      cameraTarget: [-0.82, 0.34, 1.38],
      cameraPosition: [-2.1, 0.65, 1.75],
      description: '410mm cross-drilled carbon-silicon-carbide vented rotors clamped by 6-piston monobloc aluminium-titanium calipers.',
      material: 'Carbon-Silicon Carbide (C/SiC) & Monobloc Aluminum',
      functionSummary: 'Provides zero-fade deceleration under thermal loads exceeding 1,000°C.',
      performanceMetric: `Full emergency deceleration 100-0 km/h in ${braking} meters.`,
      metricLabel: 'STOPPING DISTANCE',
      metricValue: `${braking} M (100–0)`,
    },
    {
      id: 'wheels',
      name: 'FORGED CENTER-LOCK WHEELS',
      category: 'WHEELS',
      position: [-0.95, 0.35, 1.38],
      cameraTarget: [-0.92, 0.34, 1.38],
      cameraPosition: [-2.35, 0.55, 1.95],
      description: 'Ultra-lightweight forged multi-spoke alloy wheels with integrated flow channels to evacuate high-pressure air from the arches.',
      material: 'Aerospace Forged 6061-T6 Aluminum Alloy',
      functionSummary: 'Minimizes rotational unsprung mass and improves directional response.',
      performanceMetric: `8.4 kg per corner mass saving with ${lateralG}G peak grip.`,
      metricLabel: 'UNSPRUNG SAVING',
      metricValue: '-32% PER CORNER',
    },
    {
      id: 'suspension',
      name: 'ACTIVE PUSHROD SUSPENSION',
      category: 'SUSPENSION',
      position: [-0.65, 0.42, 1.15],
      cameraTarget: [-0.55, 0.42, 1.05],
      cameraPosition: [-1.75, 0.85, 1.55],
      description: 'Motorsport-derived double wishbone suspension with horizontal inboard pushrod coilover dampers and active magnetorheological fluid.',
      material: 'Billet 7075 Aluminum Wishbones & Titanium Pushrods',
      functionSummary: 'Adapts damping valving in under 2 milliseconds across dynamic loads.',
      performanceMetric: 'Continuous 1,000 Hz electronic damping response rate.',
      metricLabel: 'ADAPTIVE RATE',
      metricValue: '1,000 HZ / 2MS',
    },
    {
      id: 'aero',
      name: 'ACTIVE DRS REAR WING & SPLITTER',
      category: 'AERO',
      position: [0, 0.85, -2.1],
      cameraTarget: [0, 0.75, -2.0],
      cameraPosition: [-1.9, 1.25, -2.9],
      description: 'Active electro-hydraulic swan-neck carbon wing paired with front underbody S-Duct venturi tunnels.',
      material: 'Multi-Ply Prepreg Carbon Fiber & Titanium Actuators',
      functionSummary: 'Transitions from low-drag DRS mode to 80° vertical airbrake under heavy braking.',
      performanceMetric: `Generates ${downforce} kg net downforce at 250 km/h.`,
      metricLabel: 'MAX DOWNFORCE',
      metricValue: `${downforce} KG @ 250 KM/H`,
    },
    {
      id: 'interior',
      name: 'CARBON MONOCOQUE COCKPIT',
      category: 'INTERIOR',
      position: [0, 0.75, -0.15],
      cameraTarget: [0, 0.7, -0.15],
      cameraPosition: [-1.55, 1.25, 0.45],
      description: 'Fixed structural carbon bucket seating integrated directly into the chassis monocoque with motorized pedal box adjustment.',
      material: 'Raw Satin Carbon Tub, Alcantara & Anodized Billet Switchgear',
      functionSummary: 'Optimizes driver center of mass while providing unyielding crash-cell protection.',
      performanceMetric: 'Lowers total vehicle center-of-gravity by 22mm.',
      metricLabel: 'DRIVER H-POINT',
      metricValue: '-22MM LOWERED',
    },
    {
      id: 'exhaust',
      name: isEV ? 'THERMAL ENERGY RECOVERY SYSTEM' : 'TITANIUM ACTIVE VALVED EXHAUST',
      category: 'EXHAUST',
      position: [0, 0.45, -2.15],
      cameraTarget: [0, 0.42, -2.05],
      cameraPosition: [-1.75, 0.85, -2.85],
      description: isEV 
        ? 'High-throughput liquid cooling glycol loop with dual heat exchangers for sustained battery and motor discharge.' 
        : 'Hydroformed titanium mandrel-bent exhaust system with electro-pneumatic bypass valves and ceramic thermal coating.',
      material: isEV ? 'Aluminum Radiators & Braided Fluoropolymer Lines' : 'Grade 5 Titanium & Ceramic Heat Shielding',
      functionSummary: isEV ? 'Maintains battery cell temperatures below 45°C.' : 'Maximizes exhaust gas velocity and reduces backpressure by 40%.',
      performanceMetric: isEV ? 'Sustains 350kW continuous discharge' : '-40% Backpressure / -14 kg mass saving',
      metricLabel: isEV ? 'THERMAL FLUX' : 'MASS REDUCTION',
      metricValue: isEV ? '350 KW COOLING' : '-14 KG VS INOX',
    },
  ];
}
