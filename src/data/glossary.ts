export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Aerodynamics' | 'Powertrain' | 'Chassis & Dynamics' | 'Materials' | 'Electrification';
  headline: string;
  whatItIs: string;
  whatItDoes: string;
  whyItMatters: string;
  whereItIsUsed: string;
  keyMetricOrFormula?: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'carbon-ceramic-brakes',
    term: 'Carbon-Ceramic Matrix Brakes (CCB)',
    category: 'Materials',
    headline: 'Thermal Resistance & Unsprung Weight Reduction',
    whatItIs: 'Brake rotors constructed from carbon fiber reinforced silicon carbide composite rather than traditional cast iron.',
    whatItDoes: 'Withstands rotor temperatures exceeding 1,000°C without mechanical warping or brake fade during repetitive high-speed stops.',
    whyItMatters: 'Reduces unsprung rotating mass by up to 50% (approx 20-30 kg per car), transforming steering agility and suspension response.',
    whereItIsUsed: 'Aether Apex V12, Stuttgart GT3 RS, Monza 812, Maranello SF90 XX',
    keyMetricOrFormula: '100-0 km/h in < 28.5 meters; Thermal stability > 1,050 °C'
  },
  {
    id: 'pushrod-suspension',
    term: 'Inboard Pushrod Suspension',
    category: 'Chassis & Dynamics',
    headline: 'Formula 1 Aerodynamic Packaging & Motion Ratio',
    whatItIs: 'A suspension geometry where the coil-over damper and spring units are mounted horizontally inside the chassis tub rather than on the wheel upright.',
    whatItDoes: 'A diagonal strut (the pushrod) transfers wheel vertical motion via a pivoting bellcrank to the inboard damper.',
    whyItMatters: 'Cleans airflow around the front wheels for massive downforce generation and keeps high-mass dampers centralized low inside the chassis.',
    whereItIsUsed: 'Aether Apex Valkyrie, LMP1 & F1 Prototypes',
    keyMetricOrFormula: 'Motion ratio efficiency: 1.0:1 direct damping rate'
  },
  {
    id: 'venturi-ground-effect',
    term: 'Venturi Underbody Ground Effect',
    category: 'Aerodynamics',
    headline: 'Bernoulli Pressure Drop for Pure Drag-Free Downforce',
    whatItIs: 'Sculpted converging and diverging tunnels beneath the vehicle underfloor.',
    whatItDoes: 'Accelerates underbody airflow, creating a localized low-pressure zone that literally sucks the vehicle down onto the asphalt.',
    whyItMatters: 'Generates extraordinary cornering grip with a fraction of the parasitic aerodynamic drag penalty caused by conventional large wings.',
    whereItIsUsed: 'Aether Apex Valkyrie, Modern F1 Ground Effect Cars',
    keyMetricOrFormula: 'Bernoulli Principle: P₁ + ½ρv₁² = P₂ + ½ρv₂² (Over 1,100 kg downforce)'
  },
  {
    id: 'drs-active-aero',
    term: 'Active Aerodynamics & DRS (Drag Reduction System)',
    category: 'Aerodynamics',
    headline: 'Variable Downforce vs Low Drag on Demand',
    whatItIs: 'Hydraulically or electromechanically actuated wing flaps, active front diffusers, and airbrakes that change shape in real time.',
    whatItDoes: 'Flattens wing angle on straightaways to maximize top speed (DRS), increases angle of attack in braking and cornering.',
    whyItMatters: 'Allows a vehicle to corner at 2.0+ Gs while still effortlessly reaching 350+ km/h straight-line speeds.',
    whereItIsUsed: 'Stuttgart GT3 RS Weissach, Maranello SF90 XX, Aether Apex',
    keyMetricOrFormula: 'Reduces drag coefficient Cd by ~30% in DRS open mode'
  },
  {
    id: 'torque-vectoring-800v',
    term: '800V Multi-Motor Torque Vectoring',
    category: 'Electrification',
    headline: 'Microsecond Yaw Torque Distribution per Wheel',
    whatItIs: 'Powertrain architecture utilizing independent electric motors per wheel running at 800+ Volts.',
    whatItDoes: 'Applies positive drive torque to the outside wheel while applying regenerative braking to the inside wheel in turns.',
    whyItMatters: 'Rotates the vehicle actively around the apex, eliminating understeer and defying traditional laws of inertia.',
    whereItIsUsed: 'Kallista Nemesis GT, Rimac Nevera, Porsche Taycan Turbo GT',
    keyMetricOrFormula: '100 Hz microsecond response rate; 97.2% Silicon Carbide inverter efficiency'
  },
  {
    id: 'power-to-weight-ratio',
    term: 'Power-to-Weight Ratio',
    category: 'Powertrain',
    headline: 'The True Measure of Acceleration Physics',
    whatItIs: 'The ratio of peak engine/motor output to the total mass of the vehicle, measured in Horsepower per Tonne (HP/tonne).',
    whatItDoes: 'Determines how rapidly a vehicle can alter its kinetic velocity in accordance with Newton’s Second Law (F = ma).',
    whyItMatters: 'A 1,000 kg car with 1,000 HP (1,000 HP/tonne) will out-accelerate and out-handle a 2,000 kg car with 1,500 HP (750 HP/tonne).',
    whereItIsUsed: 'Universal performance metric across Hypercars and Supercars',
    keyMetricOrFormula: 'Power / Mass [HP / (Weight in kg / 1000)]'
  },
  {
    id: 'carbon-monocoque',
    term: 'Carbon-Fiber Monocoque Survival Tub',
    category: 'Materials',
    headline: 'Structural Torsional Rigidity with Featherweight Mass',
    whatItIs: 'A single, continuous structural tub manufactured from aerospace-grade carbon fiber autoclaved under high temperature and vacuum.',
    whatItDoes: 'Forms the central passenger cell while directly anchoring the front suspension and rear powertrain subframes.',
    whyItMatters: 'Delivers astronomical torsional rigidity (over 45,000 Nm/degree) to ensure suspension kinematics work with 100% precision.',
    whereItIsUsed: 'Aether Apex V12, Kallista Nemesis GT, Koenigsegg Jesko',
    keyMetricOrFormula: 'Torsional rigidity > 48,000 Nm/degree at < 100 kg weight'
  }
];
