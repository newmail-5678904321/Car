const fs = require('fs');

const brands = [
  'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Ferrari', 
  'Ford', 'Genesis', 'Jaguar', 'Lamborghini', 'Land Rover', 'Lexus', 
  'Lotus', 'Maserati', 'McLaren', 'Mercedes-Benz', 'Porsche', 'Rolls-Royce', 
  'Tesla', 'Toyota', 'Aether'
];

const categories = [
  'Hypercar', 'Supercar', 'Sports Car', 'Grand Tourer', 'Coupe', 
  'Convertible', 'Roadster', 'Luxury Sedan', 'Executive Sedan', 
  'Performance Sedan', 'Luxury SUV', 'Performance SUV', 'Off-Road', 
  'Electric', 'Hybrid', 'Track', 'Limited Edition', 'Classic / Heritage'
];

const useCases = [
  'Daily Luxury', 'Weekend Exhilaration', 'Long-Distance Grand Touring', 'Track Dominance', 'Collector Asset'
];

function generateMockData() {
  const v = [];
  
  // Real world inspired
  const template = {
    id: '', brand: '', model: '', variant: 'Base', modelYear: 2026, tagline: '',
    category: '', bodyType: '', powertrain: '', drivetrain: '', accentColor: '#C5A880',
    geometryType: 'supercar_midengine', useCase: '',
    basePrice: { USD: 0, EUR: 0, GBP: 0, INR: 0, AED: 0 },
    specs: {
      horsepower: 0, torqueNm: 0, zeroToHundredKmh: 0, zeroToTwoHundredKmh: 0,
      topSpeedKmh: 0, weightKg: 0, powerToWeightHpPerTonne: 0, dragCoefficientCd: 0,
      downforceAt250KmhKg: 0, lateralGForce: 0, braking100To0M: 0, transmission: '8-Speed DCT',
      chassisStructure: 'Carbon Fiber'
    },
    paintOptions: [], wheelOptions: [], brakeOptions: [], interiorOptions: [],
    engineeringComponents: [], interiorHotspots: [],
    editorial: {
      verdict: '', characterScores: { performance: 90, comfort: 90, luxury: 90, driverEngagement: 90, practicality: 90, exclusivity: 90 },
      whoIsThisFor: { targetProfile: 'Weekend Weapon', rationale: '' }, strengths: [], tradeOffs: [], directCompetitors: []
    }
  };

  const list = [
    { brand: 'Aether', model: 'Apex Valkyrie AMR', category: 'Hypercar', hp: 1140, torque: 900, zeroToHundred: 2.4, topSpeed: 402, price: 3450000, powertrain: 'Naturally Aspirated V12', drivetrain: 'RWD', useCase: 'Track Dominance' },
    { brand: 'Porsche', model: '911 GT3 RS', category: 'Track', hp: 518, torque: 465, zeroToHundred: 3.2, topSpeed: 296, price: 241300, powertrain: 'Flat-6 Naturally Aspirated', drivetrain: 'RWD', useCase: 'Track Dominance' },
    { brand: 'Ferrari', model: 'SF90 Stradale', category: 'Hypercar', hp: 986, torque: 800, zeroToHundred: 2.5, topSpeed: 340, price: 524815, powertrain: 'Twin-Turbo V8 Hybrid', drivetrain: 'AWD', useCase: 'Weekend Exhilaration' },
    { brand: 'Lamborghini', model: 'Revuelto', category: 'Supercar', hp: 1001, torque: 725, zeroToHundred: 2.5, topSpeed: 350, price: 608358, powertrain: 'V12 PHEV', drivetrain: 'AWD', useCase: 'Weekend Exhilaration' },
    { brand: 'Aston Martin', model: 'DBS Superleggera', category: 'Grand Tourer', hp: 715, torque: 900, zeroToHundred: 3.4, topSpeed: 340, price: 333686, powertrain: 'Twin-Turbo V12', drivetrain: 'RWD', useCase: 'Long-Distance Grand Touring' },
    { brand: 'Rolls-Royce', model: 'Phantom', category: 'Luxury Sedan', hp: 563, torque: 900, zeroToHundred: 5.3, topSpeed: 250, price: 493000, powertrain: 'Twin-Turbo V12', drivetrain: 'RWD', useCase: 'Daily Luxury' },
    { brand: 'Bentley', model: 'Continental GT Speed', category: 'Grand Tourer', hp: 650, torque: 900, zeroToHundred: 3.5, topSpeed: 335, price: 291225, powertrain: 'Twin-Turbo W12', drivetrain: 'AWD', useCase: 'Long-Distance Grand Touring' },
    { brand: 'Bugatti', model: 'Chiron Super Sport', category: 'Hypercar', hp: 1578, torque: 1600, zeroToHundred: 2.4, topSpeed: 440, price: 3825000, powertrain: 'Quad-Turbo W16', drivetrain: 'AWD', useCase: 'Collector Asset' },
    { brand: 'McLaren', model: '750S', category: 'Supercar', hp: 740, torque: 800, zeroToHundred: 2.8, topSpeed: 332, price: 324000, powertrain: 'Twin-Turbo V8', drivetrain: 'RWD', useCase: 'Weekend Exhilaration' },
    { brand: 'Mercedes-Benz', model: 'AMG GT 63 S E Performance', category: 'Performance Sedan', hp: 831, torque: 1400, zeroToHundred: 2.9, topSpeed: 315, price: 180000, powertrain: 'Twin-Turbo V8 Hybrid', drivetrain: 'AWD', useCase: 'Daily Luxury' },
    { brand: 'Audi', model: 'RS e-tron GT', category: 'Electric', hp: 637, torque: 830, zeroToHundred: 3.3, topSpeed: 250, price: 147100, powertrain: 'Dual-Motor EV', drivetrain: 'AWD', useCase: 'Daily Luxury' },
    { brand: 'Land Rover', model: 'Range Rover SV', category: 'Luxury SUV', hp: 606, torque: 750, zeroToHundred: 4.5, topSpeed: 261, price: 234000, powertrain: 'Twin-Turbo V8 MHEV', drivetrain: 'AWD', useCase: 'Daily Luxury' },
    { brand: 'Lexus', model: 'LFA', category: 'Classic / Heritage', hp: 552, torque: 480, zeroToHundred: 3.7, topSpeed: 325, price: 375000, powertrain: 'Naturally Aspirated V10', drivetrain: 'RWD', useCase: 'Collector Asset' },
    { brand: 'Maserati', model: 'MC20', category: 'Supercar', hp: 621, torque: 730, zeroToHundred: 2.9, topSpeed: 325, price: 239000, powertrain: 'Twin-Turbo V6', drivetrain: 'RWD', useCase: 'Weekend Exhilaration' },
    { brand: 'Genesis', model: 'G90', category: 'Executive Sedan', hp: 409, torque: 549, zeroToHundred: 5.2, topSpeed: 250, price: 100500, powertrain: 'Twin-Turbo V6 48V e-SC', drivetrain: 'AWD', useCase: 'Daily Luxury' }
  ];

  list.forEach(item => {
    v.push({
      ...template,
      id: item.brand.toLowerCase().replace(/ /g, '-') + '-' + item.model.toLowerCase().replace(/ /g, '-'),
      brand: item.brand,
      model: item.model,
      category: item.category,
      bodyType: item.category, // Simplification
      powertrain: item.powertrain,
      drivetrain: item.drivetrain,
      useCase: item.useCase,
      basePrice: { USD: item.price, EUR: item.price, GBP: item.price, INR: item.price * 83, AED: item.price * 3.67 },
      specs: {
        ...template.specs,
        horsepower: item.hp,
        torqueNm: item.torque,
        zeroToHundredKmh: item.zeroToHundred,
        topSpeedKmh: item.topSpeed
      }
    });
  });

  const output = `import { Vehicle } from '../types';

export const VEHICLES_DATABASE: Vehicle[] = ${JSON.stringify(v, null, 2)};
`;

  fs.writeFileSync('src/data/vehicles.ts', output);
}

generateMockData();
