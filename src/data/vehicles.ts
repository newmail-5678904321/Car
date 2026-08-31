import { Vehicle } from '../types';

export const VEHICLES_DATABASE: Vehicle[] = [
  {
    id: "aether-apex-valkyrie-amr",
    brand: "Aether",
    model: "Apex Valkyrie AMR",
    variant: "Track Edition",
    modelYear: 2026,
    tagline: "The Zenith of Atmospheric V12 Motorsport Engineering",
    category: "Hypercar",
    bodyType: "Hypercar",
    powertrain: "6.5L Naturally Aspirated Cosworth V12 + KERS",
    drivetrain: "RWD",
    accentColor: "#00d2be",
    geometryType: "hypercar_aeroblade",
    useCase: "Track Dominance",
    basePrice: {
      USD: 3450000,
      EUR: 3180000,
      GBP: 2750000,
      INR: 286350000,
      AED: 12661500,
    },
    specs: {
      horsepower: 1140,
      torqueNm: 900,
      zeroToHundredKmh: 2.4,
      zeroToTwoHundredKmh: 5.4,
      topSpeedKmh: 402,
      weightKg: 1030,
      powerToWeightHpPerTonne: 1106,
      dragCoefficientCd: 0.33,
      downforceAt250KmhKg: 1100,
      lateralGForce: 3.3,
      braking100To0M: 27.5,
      engineDisplacementLiters: 6.5,
      transmission: "7-Speed Ricardo Sequential Paddle-Shift",
      chassisStructure: "Full Pre-Preg Carbon Fiber Monocoque",
    },
    paintOptions: [
      { id: "aether-teal", name: "Aether Hyper Teal", category: "Metallic", hex: "#00d2be", metallicFactor: 0.95, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "cosmic-carbon", name: "Exposed Twill Carbon", category: "Carbon Heritage", hex: "#16171b", metallicFactor: 0.2, roughness: 0.25, clearcoat: 0.95, priceDelta: 45000 },
      { id: "monaco-silver", name: "Monaco Liquid Titanium", category: "Pearlescent", hex: "#b8bcc6", metallicFactor: 0.98, roughness: 0.1, clearcoat: 1.0, priceDelta: 18000 },
      { id: "solar-ember", name: "Solar Flare Orange", category: "Metallic", hex: "#e65100", metallicFactor: 0.9, roughness: 0.15, clearcoat: 1.0, priceDelta: 12000 },
      { id: "obsidian-black", name: "Obsidian Deep Matte", category: "Satin Matte", hex: "#0a0a0c", metallicFactor: 0.1, roughness: 0.75, clearcoat: 0.3, priceDelta: 15000 }
    ],
    wheelOptions: [
      { id: "aero-forged", name: "20/21 Ultra-Light Magnesium Center-Lock", sizeInch: 20, finish: "Satin Satin Bronze", hex: "#8c7b60", priceDelta: 0 },
      { id: "carbon-turbofan", name: "Forged Carbon Aeroblade Turbofans", sizeInch: 21, finish: "Gloss Carbon", hex: "#1a1a1e", priceDelta: 28000 }
    ],
    brakeOptions: [
      { id: "ceramics-cyan", name: "Akebono 410mm Carbon-Ceramic (Cyan)", hex: "#00d2be", material: "Carbon-Ceramic", priceDelta: 0 },
      { id: "ceramics-gold", name: "Brembo Racing Carbon-Ceramic (Anodized Gold)", hex: "#d4af37", material: "Carbon-Ceramic", priceDelta: 4500 }
    ],
    interiorOptions: [
      { id: "alcantara-track", name: "Lightweight Black Alcantara & Exposed Tub", primaryColor: "#121316", accentColor: "#00d2be", materialType: "ALCANTARA", priceDelta: 0 },
      { id: "titanium-weave", name: "Titanium Inlaid Carbon Harness Cockpit", primaryColor: "#1c1d22", accentColor: "#b8bcc6", materialType: "CARBON_FIBER", priceDelta: 15000 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "An uncompromising atmospheric hypercar engineered directly from Formula 1 aerodynamics.",
      characterScores: { performance: 100, comfort: 35, luxury: 50, driverEngagement: 100, practicality: 20, exclusivity: 100 },
      whoIsThisFor: { targetProfile: "Track Specialist", rationale: "Purist collectors demanding direct Formula 1 level downforce and visceral 11,000 RPM acoustics." },
      strengths: ["Class-leading 1,100kg downforce", "11,000 RPM V12 symphony", "Featherweight 1,030kg monocoque"],
      tradeOffs: ["Extreme track-biased cabin ingress", "Zero luggage space"],
      directCompetitors: ["porsche-911-gt3-rs", "bugatti-chiron-super-sport"]
    }
  },

  {
    id: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS",
    variant: "Weissach Package",
    modelYear: 2026,
    tagline: "The Pinnacle of Naturally Aspirated Circuit Precision",
    category: "Track",
    bodyType: "Track",
    powertrain: "4.0L Naturally Aspirated Boxer-6",
    drivetrain: "RWD",
    accentColor: "#e63946",
    geometryType: "track_prototype",
    useCase: "Track Dominance",
    basePrice: {
      USD: 241300,
      EUR: 248000,
      GBP: 215000,
      INR: 20027900,
      AED: 885571,
    },
    specs: {
      horsepower: 518,
      torqueNm: 465,
      zeroToHundredKmh: 3.2,
      zeroToTwoHundredKmh: 10.6,
      topSpeedKmh: 296,
      weightKg: 1450,
      powerToWeightHpPerTonne: 357,
      dragCoefficientCd: 0.38,
      downforceAt250KmhKg: 860,
      lateralGForce: 2.1,
      braking100To0M: 28.5,
      engineDisplacementLiters: 4.0,
      transmission: "7-Speed Porsche Doppelkupplung (PDK)",
      chassisStructure: "Aluminum-Steel Hybrid with Carbon Weissach Enclosures",
    },
    paintOptions: [
      { id: "guards-red", name: "Guards Red", category: "Metallic", hex: "#cc1100", metallicFactor: 0.85, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 },
      { id: "python-green", name: "Python Green", category: "Pearlescent", hex: "#1e824c", metallicFactor: 0.9, roughness: 0.12, clearcoat: 1.0, priceDelta: 4200 },
      { id: "shark-blue", name: "Shark Blue", category: "Metallic", hex: "#006699", metallicFactor: 0.92, roughness: 0.14, clearcoat: 1.0, priceDelta: 4200 },
      { id: "gt-silver", name: "GT Silver Metallic", category: "Metallic", hex: "#a4a7ab", metallicFactor: 0.98, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "arctic-grey", name: "Arctic Grey", category: "Satin Matte", hex: "#5a626a", metallicFactor: 0.3, roughness: 0.4, clearcoat: 0.8, priceDelta: 3800 }
    ],
    wheelOptions: [
      { id: "weissach-magnesium", name: "20/21 GT3 RS Forged Magnesium Center-Locks", sizeInch: 20, finish: "Satin Pyro Red", hex: "#b31b1b", priceDelta: 0 },
      { id: "satin-dark-silver", name: "Forged Aluminum in Darksilver Finish", sizeInch: 20, finish: "Satin Darksilver", hex: "#3e4248", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "pccb-yellow", name: "Porsche Ceramic Composite Brakes (PCCB) - Racing Yellow", hex: "#ffd700", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "weissach-leather-race-tex", name: "Race-Tex Interior with Guards Red Stitching & Carbon Bucket Seats", primaryColor: "#151618", accentColor: "#cc1100", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "The benchmark road-legal circuit weapon with active Formula-style DRS and 9,000 RPM precision.",
      characterScores: { performance: 98, comfort: 40, luxury: 60, driverEngagement: 100, practicality: 45, exclusivity: 92 },
      whoIsThisFor: { targetProfile: "Track Specialist", rationale: "Track drivers seeking telepathic feedback and aerodynamic adjustability on the Nürburgring." },
      strengths: ["860kg active downforce with DRS", "Razor-sharp 9,000 RPM throttle response", "PDK transmission lightning shifts"],
      tradeOffs: ["Stiff low-speed ride on rough tarmac", "No rear seats due to roll cage"],
      directCompetitors: ["ferrari-sf90-stradale", "mclaren-750s"]
    }
  },

  {
    id: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    variant: "Assetto Fiorano",
    modelYear: 2026,
    tagline: "The 1,000 HP Hybrid Supercar from Maranello",
    category: "Supercar",
    bodyType: "Supercar",
    powertrain: "4.0L Twin-Turbo V8 + 3 Electric Motors (PHEV)",
    drivetrain: "AWD",
    accentColor: "#d40000",
    geometryType: "supercar_midengine",
    useCase: "Weekend Exhilaration",
    basePrice: {
      USD: 524815,
      EUR: 485000,
      GBP: 420000,
      INR: 43559645,
      AED: 1926071,
    },
    specs: {
      horsepower: 986,
      torqueNm: 800,
      zeroToHundredKmh: 2.5,
      zeroToTwoHundredKmh: 6.7,
      topSpeedKmh: 340,
      weightKg: 1570,
      powerToWeightHpPerTonne: 628,
      dragCoefficientCd: 0.34,
      downforceAt250KmhKg: 390,
      lateralGForce: 1.65,
      braking100To0M: 29.0,
      engineDisplacementLiters: 4.0,
      batteryCapacityKWh: 7.9,
      electricRangeKm: 25,
      transmission: "8-Speed F1 Dual-Clutch Transmission",
      chassisStructure: "Multi-Material Carbon Fiber & Aluminum Spaceframe",
    },
    paintOptions: [
      { id: "rosso-corsa", name: "Rosso Corsa", category: "Metallic", hex: "#d40000", metallicFactor: 0.88, roughness: 0.14, clearcoat: 1.0, priceDelta: 0 },
      { id: "giallo-modena", name: "Giallo Modena", category: "Metallic", hex: "#f9c80e", metallicFactor: 0.9, roughness: 0.12, clearcoat: 1.0, priceDelta: 12000 },
      { id: "blu-tour-de-france", name: "Blu Tour de France", category: "Metallic", hex: "#0f2f56", metallicFactor: 0.96, roughness: 0.1, clearcoat: 1.0, priceDelta: 14000 },
      { id: "bianco-avus", name: "Bianco Avus", category: "Pearlescent", hex: "#f0f2f5", metallicFactor: 0.85, roughness: 0.18, clearcoat: 1.0, priceDelta: 9500 },
      { id: "nero-daytona", name: "Nero Daytona Metallic", category: "Metallic", hex: "#111215", metallicFactor: 0.95, roughness: 0.15, clearcoat: 1.0, priceDelta: 8500 }
    ],
    wheelOptions: [
      { id: "carbon-wheels", name: "20-inch Forged Carbon Multi-Spoke Wheels", sizeInch: 20, finish: "Gloss Carbon", hex: "#18191d", priceDelta: 24000 },
      { id: "diamond-forged", name: "20-inch Diamond Cut Forged Rims", sizeInch: 20, finish: "Diamond Cut Silver", hex: "#c8ccd2", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "brembo-rosso", name: "Brembo Carbon-Ceramic Calipers - Rosso Scuderia", hex: "#d40000", material: "Carbon-Ceramic", priceDelta: 0 },
      { id: "brembo-giallo", name: "Brembo Carbon-Ceramic Calipers - Giallo Modena", hex: "#f9c80e", material: "Carbon-Ceramic", priceDelta: 1500 }
    ],
    interiorOptions: [
      { id: "cuoio-leather", name: "Cuoio Heritage Tan Leather with Carbon Racing Seats", primaryColor: "#a3602d", accentColor: "#111215", materialType: "LEATHER", priceDelta: 0 },
      { id: "nero-alcantara", name: "Nero Alcantara with Rosso Corsa Highlights", primaryColor: "#131417", accentColor: "#d40000", materialType: "ALCANTARA", priceDelta: 8000 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "A hyper-capable AWD hybrid marvel that combines explosive acceleration with all-electric silence.",
      characterScores: { performance: 99, comfort: 70, luxury: 85, driverEngagement: 95, practicality: 55, exclusivity: 95 },
      whoIsThisFor: { targetProfile: "Weekend Weapon", rationale: "Enthusiasts seeking 1,000 hp hybrid rocket performance with classic Ferrari emotive styling." },
      strengths: ["Electrifying 0-100 in 2.5 seconds", "AWD electric torque vectoring", "Zero-emission pure EV city mode"],
      tradeOffs: ["Touch-sensitive haptic steering controls take learning", "Reduced frunk luggage space"],
      directCompetitors: ["lamborghini-revuelto", "mclaren-750s"]
    }
  },

  {
    id: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    variant: "Base",
    modelYear: 2026,
    tagline: "The 1,015 HP High-Performance Electrified Vehicle (HPEV)",
    category: "Supercar",
    bodyType: "Supercar",
    powertrain: "6.5L Naturally Aspirated V12 + 3 Electric Motors",
    drivetrain: "AWD",
    accentColor: "#e4a100",
    geometryType: "supercar_midengine",
    useCase: "Weekend Exhilaration",
    basePrice: {
      USD: 608358,
      EUR: 560000,
      GBP: 490000,
      INR: 50493714,
      AED: 2232673,
    },
    specs: {
      horsepower: 1001,
      torqueNm: 725,
      zeroToHundredKmh: 2.5,
      zeroToTwoHundredKmh: 7.0,
      topSpeedKmh: 350,
      weightKg: 1772,
      powerToWeightHpPerTonne: 565,
      dragCoefficientCd: 0.35,
      downforceAt250KmhKg: 380,
      lateralGForce: 1.62,
      braking100To0M: 29.8,
      engineDisplacementLiters: 6.5,
      batteryCapacityKWh: 3.8,
      transmission: "8-Speed Transverse Dual-Clutch",
      chassisStructure: "Monofuselage Carbon-Fiber Monocoque with Forged Composites Front",
    },
    paintOptions: [
      { id: "giallo-inti", name: "Giallo Inti (Bright Pearl Yellow)", category: "Pearlescent", hex: "#e4a100", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "arancio-apis", name: "Arancio Apis (Electric Orange)", category: "Metallic", hex: "#e65100", metallicFactor: 0.92, roughness: 0.14, clearcoat: 1.0, priceDelta: 14000 },
      { id: "verde-mantis", name: "Verde Mantis (Lime Metallic)", category: "Metallic", hex: "#43a047", metallicFactor: 0.9, roughness: 0.15, clearcoat: 1.0, priceDelta: 14000 },
      { id: "grigio-telesto", name: "Grigio Telesto (Battleship Grey)", category: "Metallic", hex: "#545b62", metallicFactor: 0.4, roughness: 0.25, clearcoat: 1.0, priceDelta: 16500 },
      { id: "nero-nemesis", name: "Nero Nemesis (Matte Black)", category: "Satin Matte", hex: "#111214", metallicFactor: 0.1, roughness: 0.8, clearcoat: 0.2, priceDelta: 18500 }
    ],
    wheelOptions: [
      { id: "alitan-forged", name: "21/22 Alitan Forged Center-Lock Alloys", sizeInch: 21, finish: "Titanium Matt", hex: "#6c757d", priceDelta: 0 },
      { id: "venancio-shiny", name: "21/22 Venancio Gloss Black with Diamond Lip", sizeInch: 21, finish: "Gloss Black", hex: "#1a1a1c", priceDelta: 8500 }
    ],
    brakeOptions: [
      { id: "calipers-giallo", name: "Carbon-Ceramic Calipers in Giallo", hex: "#e4a100", material: "Carbon-Ceramic", priceDelta: 0 },
      { id: "calipers-arancio", name: "Carbon-Ceramic Calipers in Arancio", hex: "#e65100", material: "Carbon-Ceramic", priceDelta: 1800 }
    ],
    interiorOptions: [
      { id: "corsa-alcantara-yellow", name: "Nero Ade with Giallo Belenus Stitching & Carbon Package", primaryColor: "#141518", accentColor: "#e4a100", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "Sant'Agata's glorious 9,500 RPM V12 lives on, electrified to deliver unmatched visual and acoustic drama.",
      characterScores: { performance: 99, comfort: 65, luxury: 85, driverEngagement: 98, practicality: 45, exclusivity: 98 },
      whoIsThisFor: { targetProfile: "Weekend Weapon", rationale: "Supercar purists demanding theatrical scissor doors, screaming naturally aspirated V12, and AWD rocket thrust." },
      strengths: ["9,500 RPM V12 auditory masterclass", "Striking Y-motif aerodynamic architecture", "Seamless hybrid torque filling"],
      tradeOffs: ["Heavy hybrid battery curb weight (1,772kg)", "Low rear visibility"],
      directCompetitors: ["ferrari-sf90-stradale", "bugatti-chiron-super-sport"]
    }
  },

  {
    id: "aston-martin-dbs-superleggera",
    brand: "Aston Martin",
    model: "DBS Superleggera",
    variant: "Volante Coupe",
    modelYear: 2026,
    tagline: "The Brute in a Savile Row Suit",
    category: "Grand Tourer",
    bodyType: "Grand Tourer",
    powertrain: "5.2L Twin-Turbo V12",
    drivetrain: "RWD",
    accentColor: "#004225",
    geometryType: "grand_tourer",
    useCase: "Long-Distance Grand Touring",
    basePrice: {
      USD: 333686,
      EUR: 310000,
      GBP: 265000,
      INR: 27695938,
      AED: 1224627,
    },
    specs: {
      horsepower: 715,
      torqueNm: 900,
      zeroToHundredKmh: 3.4,
      zeroToTwoHundredKmh: 10.1,
      topSpeedKmh: 340,
      weightKg: 1693,
      powerToWeightHpPerTonne: 422,
      dragCoefficientCd: 0.36,
      downforceAt250KmhKg: 180,
      lateralGForce: 1.45,
      braking100To0M: 30.5,
      engineDisplacementLiters: 5.2,
      transmission: "ZF 8-Speed Torque-Converter Automatic",
      chassisStructure: "Extruded Bonded Aluminum Structure with Carbon Body Panels",
    },
    paintOptions: [
      { id: "racing-green", name: "Aston Martin Racing Green", category: "Metallic", hex: "#004225", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "onyx-black", name: "Onyx Black Pearl", category: "Pearlescent", hex: "#0e0f11", metallicFactor: 0.92, roughness: 0.16, clearcoat: 1.0, priceDelta: 5400 },
      { id: "hyper-red", name: "Hyper Red Metallic", category: "Metallic", hex: "#990000", metallicFactor: 0.96, roughness: 0.14, clearcoat: 1.0, priceDelta: 6800 },
      { id: "xenon-grey", name: "Xenon Grey Metallic", category: "Metallic", hex: "#4a4f56", metallicFactor: 0.9, roughness: 0.18, clearcoat: 1.0, priceDelta: 4500 }
    ],
    wheelOptions: [
      { id: "forged-y-spoke", name: "21-inch Twin-Spoke Forged Satin Black", sizeInch: 21, finish: "Satin Black", hex: "#1f2024", priceDelta: 0 },
      { id: "shadow-chrome", name: "21-inch Shadow Chrome Diamond Turned Wheels", sizeInch: 21, finish: "Shadow Chrome", hex: "#8a9098", priceDelta: 4200 }
    ],
    brakeOptions: [
      { id: "calipers-bronze", name: "Carbon-Ceramic Calipers in Dark Anodized Bronze", hex: "#7a5c36", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "oxford-tan-leather", name: "Bridge of Weir Oxford Tan Leather with Brogue Quilting", primaryColor: "#915024", accentColor: "#18191c", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "A monstrous 900 Nm twin-turbo V12 engine cloaked in sublime British luxury and design.",
      characterScores: { performance: 92, comfort: 88, luxury: 95, driverEngagement: 88, practicality: 65, exclusivity: 94 },
      whoIsThisFor: { targetProfile: "Grand Continental Tourer", rationale: "Discerning drivers seeking continent-crossing pace, majestic V12 power, and head-turning elegance." },
      strengths: ["Titanic 900 Nm torque surge", "Timeless British styling proportions", "Effortless grand touring comfort"],
      tradeOffs: ["Infotainment tech from previous generation", "Rear seats suited only for luggage"],
      directCompetitors: ["bentley-continental-gt-speed", "ferrari-sf90-stradale"]
    }
  },

  {
    id: "rolls-royce-phantom",
    brand: "Rolls-Royce",
    model: "Phantom",
    variant: "Series II",
    modelYear: 2026,
    tagline: "The Undisputed Monarch of Automotive Luxury",
    category: "Luxury Sedan",
    bodyType: "Luxury Sedan",
    powertrain: "6.75L Twin-Turbo V12",
    drivetrain: "RWD",
    accentColor: "#0a1128",
    geometryType: "luxury_sedan",
    useCase: "Daily Luxury",
    basePrice: {
      USD: 493000,
      EUR: 460000,
      GBP: 395000,
      INR: 40919000,
      AED: 1809310,
    },
    specs: {
      horsepower: 563,
      torqueNm: 900,
      zeroToHundredKmh: 5.3,
      zeroToTwoHundredKmh: 16.5,
      topSpeedKmh: 250,
      weightKg: 2560,
      powerToWeightHpPerTonne: 220,
      dragCoefficientCd: 0.35,
      downforceAt250KmhKg: 50,
      lateralGForce: 0.95,
      braking100To0M: 36.5,
      engineDisplacementLiters: 6.75,
      transmission: "ZF 8-Speed Satellite-Aided Automatic",
      chassisStructure: "Architecture of Luxury All-Aluminum Spaceframe",
    },
    paintOptions: [
      { id: "midnight-sapphire", name: "Midnight Sapphire", category: "Metallic", hex: "#0a1128", metallicFactor: 0.95, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "english-white", name: "English White", category: "Pearlescent", hex: "#f4f6f8", metallicFactor: 0.8, roughness: 0.16, clearcoat: 1.0, priceDelta: 16000 },
      { id: "darkest-tungsten", name: "Darkest Tungsten Two-Tone", category: "Metallic", hex: "#3b3f46", metallicFactor: 0.96, roughness: 0.12, clearcoat: 1.0, priceDelta: 28000 },
      { id: "belladonna-purple", name: "Belladonna Velvet Purple", category: "Pearlescent", hex: "#2b1028", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 22000 }
    ],
    wheelOptions: [
      { id: "part-polished-shadow", name: "22-inch Part Polished Shadow Rims with Self-Righting Center Hubs", sizeInch: 22, finish: "Polished Chrome", hex: "#d0d4dc", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "calipers-silver", name: "Rolls-Royce High-Thermal Calipers in Sovereign Silver", hex: "#9ca3af", material: "High-Thermal Cast", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "starlight-grace-white", name: "Grace White & Navy Blue Bespoke Leather with Starlight Headliner", primaryColor: "#f8f9fa", accentColor: "#0a1128", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "The absolute pinnacle of serenely isolated, hand-crafted automotive opulence.",
      characterScores: { performance: 75, comfort: 100, luxury: 100, driverEngagement: 50, practicality: 90, exclusivity: 100 },
      whoIsThisFor: { targetProfile: "Collector Asset", rationale: "Captains of industry and royalty requiring peerless sanctuary, whisper silence, and supreme presence." },
      strengths: ["Magic Carpet Ride air suspension", "Starlight headliner with shooting stars", "130kg acoustic sound insulation vault"],
      tradeOffs: ["Monumental dimensions make tight urban parking challenging", "Driver-engagement not the priority"],
      directCompetitors: ["bentley-continental-gt-speed", "genesis-g90"]
    }
  },

  {
    id: "bentley-continental-gt-speed",
    brand: "Bentley",
    model: "Continental GT Speed",
    variant: "Speed Edition",
    modelYear: 2026,
    tagline: "The Ultimate Grand Tourer with W12 Heritage",
    category: "Grand Tourer",
    bodyType: "Grand Tourer",
    powertrain: "6.0L Twin-Turbo W12",
    drivetrain: "AWD",
    accentColor: "#1d3557",
    geometryType: "grand_tourer",
    useCase: "Long-Distance Grand Touring",
    basePrice: {
      USD: 291225,
      EUR: 275000,
      GBP: 235000,
      INR: 24171675,
      AED: 1068795,
    },
    specs: {
      horsepower: 650,
      torqueNm: 900,
      zeroToHundredKmh: 3.5,
      zeroToTwoHundredKmh: 11.2,
      topSpeedKmh: 335,
      weightKg: 2273,
      powerToWeightHpPerTonne: 286,
      dragCoefficientCd: 0.32,
      downforceAt250KmhKg: 120,
      lateralGForce: 1.35,
      braking100To0M: 31.8,
      engineDisplacementLiters: 6.0,
      transmission: "8-Speed Dual-Clutch Automatic",
      chassisStructure: "Superformed Aluminum and Steel Monocoque with Active 48V Anti-Roll",
    },
    paintOptions: [
      { id: "sequin-blue", name: "Sequin Blue Metallic", category: "Metallic", hex: "#1d3557", metallicFactor: 0.96, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "verdant-green", name: "Verdant Green", category: "Pearlescent", hex: "#143628", metallicFactor: 0.92, roughness: 0.14, clearcoat: 1.0, priceDelta: 6500 },
      { id: "glacier-white", name: "Glacier White", category: "Pearlescent", hex: "#f7f8f9", metallicFactor: 0.85, roughness: 0.15, clearcoat: 1.0, priceDelta: 4800 },
      { id: "beluga-black", name: "Beluga Gloss Black", category: "Metallic", hex: "#0b0c0e", metallicFactor: 0.9, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "speed-22-inch", name: "22-inch Speed Dark Tint Forged Wheels", sizeInch: 22, finish: "Dark Tint", hex: "#3a3c42", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "carbon-brakes-red", name: "Carbon-Silicon-Carbide Brakes with Red Calipers", hex: "#cc1100", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "hotspur-mulliner", name: "Hotspur Red & Beluga Leather with Diamond-in-Diamond Quilting", primaryColor: "#800e13", accentColor: "#0b0c0e", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "Effortless high-velocity grand touring with 4-wheel steering and rotating 3-sided dashboard display.",
      characterScores: { performance: 90, comfort: 96, luxury: 98, driverEngagement: 85, practicality: 70, exclusivity: 92 },
      whoIsThisFor: { targetProfile: "Grand Continental Tourer", rationale: "High-mileage trans-continental drivers who demand supreme vault quietness paired with W12 muscle." },
      strengths: ["Rotating 3-sided dashboard display", "All-wheel steering agility", "Supreme cabin handcrafted materials"],
      tradeOffs: ["Heavy curb weight (2,273kg)", "Firm ride on optional 22-inch rims"],
      directCompetitors: ["aston-martin-dbs-superleggera", "rolls-royce-phantom"]
    }
  },

  {
    id: "bugatti-chiron-super-sport",
    brand: "Bugatti",
    model: "Chiron Super Sport",
    variant: "300+ Edition",
    modelYear: 2026,
    tagline: "The Unrivaled 1,600 HP Quad-Turbo Hypercar",
    category: "Hypercar",
    bodyType: "Hypercar",
    powertrain: "8.0L Quad-Turbocharged W16",
    drivetrain: "AWD",
    accentColor: "#002395",
    geometryType: "hypercar_aeroblade",
    useCase: "Collector Asset",
    basePrice: {
      USD: 3825000,
      EUR: 3500000,
      GBP: 3100000,
      INR: 317475000,
      AED: 14037750,
    },
    specs: {
      horsepower: 1578,
      torqueNm: 1600,
      zeroToHundredKmh: 2.4,
      zeroToTwoHundredKmh: 5.8,
      topSpeedKmh: 440,
      weightKg: 1978,
      powerToWeightHpPerTonne: 798,
      dragCoefficientCd: 0.35,
      downforceAt250KmhKg: 450,
      lateralGForce: 1.55,
      braking100To0M: 30.2,
      engineDisplacementLiters: 8.0,
      transmission: "7-Speed Dual-Clutch with Ricardo Long-Ratio Final Drive",
      chassisStructure: "Full Carbon Fiber Monocoque with Torsional Rigidity of 50,000 Nm/deg",
    },
    paintOptions: [
      { id: "french-racing-blue", name: "Bugatti French Racing Blue & Exposed Carbon", category: "Pearlescent", hex: "#002395", metallicFactor: 0.95, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "jet-orange-carbon", name: "Super Sport Jet Orange Stripes on Black Carbon", category: "Carbon Heritage", hex: "#ff6200", metallicFactor: 0.85, roughness: 0.2, clearcoat: 1.0, priceDelta: 85000 },
      { id: "nocturne-black", name: "Nocturne Gloss Black", category: "Metallic", hex: "#0c0d0f", metallicFactor: 0.9, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "super-sport-alloys", name: "20/21 Super Sport Magnesium Y-Spoke Wheels", sizeInch: 20, finish: "Diamond Cut Platinum", hex: "#cbd3db", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "bugatti-titanium", name: "AP Racing 3D-Printed Titanium 8-Piston Calipers", hex: "#002395", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "leather-carbon-blue", name: "Beluga Black & French Racing Blue Leather with Machined Aluminum Console", primaryColor: "#101114", accentColor: "#002395", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "The absolute zenith of internal combustion engineering capable of exceeding 440 km/h.",
      characterScores: { performance: 100, comfort: 85, luxury: 95, driverEngagement: 92, practicality: 35, exclusivity: 100 },
      whoIsThisFor: { targetProfile: "Collector Asset", rationale: "Elite collectors seeking the ultimate masterpiece of W16 quadri-turbocharged human achievement." },
      strengths: ["1,600 BHP Quad-Turbo W16 locomotive acceleration", "Longtail high-speed aero stability", "440 km/h top speed capability"],
      tradeOffs: ["Astronomical purchase and tire maintenance costs", "Extremely restricted luggage room"],
      directCompetitors: ["aether-apex-valkyrie-amr", "lamborghini-revuelto"]
    }
  },

  {
    id: "mclaren-750s",
    brand: "McLaren",
    model: "750S",
    variant: "Coupe",
    modelYear: 2026,
    tagline: "Benchmarks Benchmarked: 750 PS of Pure Driver Purity",
    category: "Supercar",
    bodyType: "Supercar",
    powertrain: "4.0L Twin-Turbo V8",
    drivetrain: "RWD",
    accentColor: "#ff8000",
    geometryType: "supercar_midengine",
    useCase: "Weekend Exhilaration",
    basePrice: {
      USD: 324000,
      EUR: 300000,
      GBP: 255000,
      INR: 26892000,
      AED: 1189080,
    },
    specs: {
      horsepower: 740,
      torqueNm: 800,
      zeroToHundredKmh: 2.8,
      zeroToTwoHundredKmh: 7.2,
      topSpeedKmh: 332,
      weightKg: 1277,
      powerToWeightHpPerTonne: 579,
      dragCoefficientCd: 0.32,
      downforceAt250KmhKg: 320,
      lateralGForce: 1.70,
      braking100To0M: 28.8,
      engineDisplacementLiters: 4.0,
      transmission: "7-Speed Dual-Clutch Seamless Shift Gearbox (SSG)",
      chassisStructure: "Carbon Fiber Monocage II-S with Integrated Upper Structure",
    },
    paintOptions: [
      { id: "papaya-spark", name: "Papaya Spark Heritage Metallic", category: "Metallic", hex: "#ff8000", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "saris-blue", name: "Saris Blue", category: "Pearlescent", hex: "#0066b2", metallicFactor: 0.96, roughness: 0.1, clearcoat: 1.0, priceDelta: 5800 },
      { id: "saros-grey", name: "Saros Grey Metallic", category: "Metallic", hex: "#52575e", metallicFactor: 0.92, roughness: 0.15, clearcoat: 1.0, priceDelta: 3200 },
      { id: "silica-white", name: "Silica White", category: "Pearlescent", hex: "#f3f4f6", metallicFactor: 0.85, roughness: 0.18, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "ultra-light-10-spoke", name: "19/20-inch Ultra-Lightweight Forged Turbine Wheels (Saves 13.8kg)", sizeInch: 19, finish: "Gloss Black", hex: "#151618", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "calipers-mclaren-orange", name: "McLaren Orange 6-Piston Monobloc Calipers", hex: "#ff8000", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "carbon-black-alcantara", name: "Carbon Black Alcantara with McLaren Orange Accent Piping", primaryColor: "#121315", accentColor: "#ff8000", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "Hydraulic steering feel and a featherweight 1,277kg dry weight deliver unmatched supercar purity.",
      characterScores: { performance: 97, comfort: 75, luxury: 80, driverEngagement: 99, practicality: 60, exclusivity: 90 },
      whoIsThisFor: { targetProfile: "Weekend Weapon", rationale: "Drivers who value steering feedback, low mass agility, and lightning hydraulic suspension response above all." },
      strengths: ["Hydraulic power steering telepathic feedback", "Proactive Chassis Control III suspension", "Sub-1,300kg featherweight carbon chassis"],
      tradeOffs: ["Exhaust note less sonorous than naturally aspirated V12", "Firm ingress over carbon sill"],
      directCompetitors: ["ferrari-sf90-stradale", "porsche-911-gt3-rs"]
    }
  },

  {
    id: "mercedes-benz-amg-gt-63-s-e-performance",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S E Performance",
    variant: "4-Door Coupe",
    modelYear: 2026,
    tagline: "Affalterbach's Most Powerful Production Monster (843 HP / 1,400 Nm)",
    category: "Performance Sedan",
    bodyType: "Performance Sedan",
    powertrain: "4.0L Biturbo V8 + Rear Electric Drive Unit",
    drivetrain: "AWD",
    accentColor: "#b5179e",
    geometryType: "grand_tourer",
    useCase: "Daily Luxury",
    basePrice: {
      USD: 180000,
      EUR: 198000,
      GBP: 172000,
      INR: 14940000,
      AED: 660600,
    },
    specs: {
      horsepower: 831,
      torqueNm: 1400,
      zeroToHundredKmh: 2.9,
      zeroToTwoHundredKmh: 9.8,
      topSpeedKmh: 315,
      weightKg: 2380,
      powerToWeightHpPerTonne: 349,
      dragCoefficientCd: 0.32,
      downforceAt250KmhKg: 95,
      lateralGForce: 1.30,
      braking100To0M: 32.1,
      engineDisplacementLiters: 4.0,
      batteryCapacityKWh: 6.1,
      electricRangeKm: 12,
      transmission: "AMG SPEEDSHIFT MCT 9G + 2-Speed Rear Transmission",
      chassisStructure: "Aluminum-Steel Spaceframe with AMG RIDE CONTROL+ Multi-Chamber Air Suspension",
    },
    paintOptions: [
      { id: "magno-green-hell", name: "AMG Green Hell Magno Matte", category: "Satin Matte", hex: "#38b000", metallicFactor: 0.2, roughness: 0.75, clearcoat: 0.3, priceDelta: 7500 },
      { id: "selenite-grey", name: "Selenite Grey Metallic", category: "Metallic", hex: "#50545a", metallicFactor: 0.95, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 },
      { id: "obsidian-black-amg", name: "Obsidian Black Metallic", category: "Metallic", hex: "#101113", metallicFactor: 0.92, roughness: 0.16, clearcoat: 1.0, priceDelta: 0 },
      { id: "spectral-blue", name: "MANUFAKTUR Spectral Blue Magno", category: "Satin Matte", hex: "#1e3d59", metallicFactor: 0.3, roughness: 0.7, clearcoat: 0.4, priceDelta: 6800 }
    ],
    wheelOptions: [
      { id: "amg-forged-cross-spoke", name: "21-inch AMG Forged Cross-Spoke Black Matte", sizeInch: 21, finish: "Matte Black with Polished Flange", hex: "#232428", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "amg-ceramic-bronze", name: "AMG Carbon-Ceramic Calipers in Bronze", hex: "#a67c52", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "nappa-titanium-grey", name: "Exclusive Nappa Leather Titanium Grey Pearl with Yellow Stitching", primaryColor: "#3a3c42", accentColor: "#ffd60a", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "An earth-shattering 1,400 Nm hybrid sedan with four executive seats and supercar acceleration.",
      characterScores: { performance: 94, comfort: 85, luxury: 90, driverEngagement: 86, practicality: 85, exclusivity: 88 },
      whoIsThisFor: { targetProfile: "Daily Driver", rationale: "Executives needing genuine 4-door family versatility paired with 831 HP hypercar launch control." },
      strengths: ["Colossal 1,400 Nm hybrid torque surge", "Full 4-passenger executive comfort", "AMG Drift Mode AWD disconnect"],
      tradeOffs: ["Heavy 2,380kg curb weight", "Short pure-electric range (12km)"],
      directCompetitors: ["bentley-continental-gt-speed", "audi-rs-e-tron-gt"]
    }
  },

  {
    id: "audi-rs-e-tron-gt",
    brand: "Audi",
    model: "RS e-tron GT",
    variant: "Performance Edition",
    modelYear: 2026,
    tagline: "Electrified Grand Touring Sculpture with 800V Architecture",
    category: "Electric",
    bodyType: "Electric",
    powertrain: "Dual Permanently Excited Synchronous Motors (800V EV)",
    drivetrain: "AWD",
    accentColor: "#00b4d8",
    geometryType: "electric_hypergt",
    useCase: "Daily Luxury",
    basePrice: {
      USD: 147100,
      EUR: 145000,
      GBP: 125000,
      INR: 12209300,
      AED: 539857,
    },
    specs: {
      horsepower: 637,
      torqueNm: 830,
      zeroToHundredKmh: 3.3,
      zeroToTwoHundredKmh: 10.9,
      topSpeedKmh: 250,
      weightKg: 2345,
      powerToWeightHpPerTonne: 271,
      dragCoefficientCd: 0.24,
      downforceAt250KmhKg: 40,
      lateralGForce: 1.25,
      braking100To0M: 33.2,
      batteryCapacityKWh: 93.4,
      electricRangeKm: 472,
      transmission: "2-Speed Transmission on Rear Axle, 1-Speed on Front Axle",
      chassisStructure: "Hot-Formed Steel and Aluminum Composite Structure with Integrated Battery Housing",
    },
    paintOptions: [
      { id: "tactical-green", name: "Tactical Green Metallic", category: "Metallic", hex: "#2b4c3f", metallicFactor: 0.94, roughness: 0.14, clearcoat: 1.0, priceDelta: 0 },
      { id: "kemora-grey", name: "Kemora Grey Metallic", category: "Pearlescent", hex: "#637081", metallicFactor: 0.9, roughness: 0.16, clearcoat: 1.0, priceDelta: 1200 },
      { id: "floret-silver", name: "Floret Silver Metallic", category: "Metallic", hex: "#b4b9c1", metallicFactor: 0.98, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "mythos-black", name: "Mythos Black Metallic", category: "Metallic", hex: "#111316", metallicFactor: 0.92, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "aero-blade-21", name: "21-inch 5-Twin-Spoke Concave Aero Blade Wheels", sizeInch: 21, finish: "Bi-Color Black & Machined Silver", hex: "#495057", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "carbide-brakes-orange", name: "Tungsten Carbide Coated Brakes with Orange Calipers", hex: "#f77f00", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "leather-free-cascade", name: "Dinamica & Cascade Eco-Luxury Textile Cockpit in Anthracite", primaryColor: "#1d2026", accentColor: "#00b4d8", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "A stunning electric grand tourer pairing ultra-fast 270kW charging with low-slung aerodynamic proportions.",
      characterScores: { performance: 88, comfort: 92, luxury: 90, driverEngagement: 80, practicality: 80, exclusivity: 85 },
      whoIsThisFor: { targetProfile: "Daily Driver", rationale: "Drivers seeking futuristic silent electric velocity and fast charging without sacrificing sculpted coupe proportions." },
      strengths: ["800-volt charging (5% to 80% in 22.5 mins)", "Whisper quiet acoustic cabin", "Seductive wide-track body stance"],
      tradeOffs: ["Rear seat headroom restricted by fastback roofline", "Software user interface could be faster"],
      directCompetitors: ["porsche-911-gt3-rs", "mercedes-benz-amg-gt-63-s-e-performance"]
    }
  },

  {
    id: "land-rover-range-rover-sv",
    brand: "Land Rover",
    model: "Range Rover SV",
    variant: "SV Signature Suite",
    modelYear: 2026,
    tagline: "The Pinnacle of High-Command Luxury and All-Terrain Capability",
    category: "Luxury SUV",
    bodyType: "Luxury SUV",
    powertrain: "4.4L Twin-Turbo V8 MHEV",
    drivetrain: "AWD",
    accentColor: "#c5a880",
    geometryType: "performance_suv",
    useCase: "Daily Luxury",
    basePrice: {
      USD: 234000,
      EUR: 225000,
      GBP: 195000,
      INR: 19422000,
      AED: 858780,
    },
    specs: {
      horsepower: 606,
      torqueNm: 750,
      zeroToHundredKmh: 4.5,
      zeroToTwoHundredKmh: 15.2,
      topSpeedKmh: 261,
      weightKg: 2585,
      powerToWeightHpPerTonne: 234,
      dragCoefficientCd: 0.30,
      downforceAt250KmhKg: 20,
      lateralGForce: 0.92,
      braking100To0M: 35.8,
      engineDisplacementLiters: 4.4,
      transmission: "ZF 8-Speed Automatic with Twin-Speed Low Range Transfer Box",
      chassisStructure: "MLA-Flex Architecture with Electronic Air Suspension and Active Locking Differentials",
    },
    paintOptions: [
      { id: "sv-bespoke-sunset-gold", name: "SV Bespoke Sunset Gold Satin", category: "Satin Matte", hex: "#c5a880", metallicFactor: 0.3, roughness: 0.7, clearcoat: 0.4, priceDelta: 9500 },
      { id: "british-racing-green-sv", name: "British Racing Green Gloss", category: "Metallic", hex: "#0b3c2e", metallicFactor: 0.92, roughness: 0.14, clearcoat: 1.0, priceDelta: 4500 },
      { id: "santorini-black", name: "Santorini Black Metallic", category: "Metallic", hex: "#0c0d10", metallicFactor: 0.94, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 },
      { id: "ostuni-pearl-white", name: "Ostuni Pearl White", category: "Pearlescent", hex: "#f0f2f5", metallicFactor: 0.88, roughness: 0.16, clearcoat: 1.0, priceDelta: 3200 }
    ],
    wheelOptions: [
      { id: "sv-23-inch-forged", name: "23-inch Style 1077 Forged Gloss Dark Grey with Satin Black Inserts", sizeInch: 23, finish: "Gloss Dark Grey", hex: "#3b3e45", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "sv-brembo-black", name: "High-Performance SV Brembo Calipers in Gloss Black", hex: "#16171a", material: "High-Thermal Cast", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "sv-signature-caraway", name: "SV Caraway Near-Aniline Leather with White Ceramic Switchgear & Club Table", primaryColor: "#9c6b3e", accentColor: "#f4ede2", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "The benchmark high-riding sanctuary delivering whisper quiet comfort across any terrain on Earth.",
      characterScores: { performance: 80, comfort: 99, luxury: 98, driverEngagement: 65, practicality: 98, exclusivity: 95 },
      whoIsThisFor: { targetProfile: "Daily Driver", rationale: "Discerning families wanting supreme command seating, 7-foot wading capability, and presidential rear lounge comfort." },
      strengths: ["Electrically deployed Club Table & champagne cooler", "Terrain Response 2 all-conquering AWD", "World-class acoustic refinement"],
      tradeOffs: ["Heavy 2.6-tonne mass limits track agility", "Expansive height requires mindful clearance in low parkades"],
      directCompetitors: ["rolls-royce-phantom", "bentley-continental-gt-speed"]
    }
  },

  {
    id: "lexus-lfa",
    brand: "Lexus",
    model: "LFA",
    variant: "Nürburgring Package",
    modelYear: 2026,
    tagline: "The 9,000 RPM V10 Acoustic Masterpiece",
    category: "Classic / Heritage",
    bodyType: "Classic / Heritage",
    powertrain: "4.8L Naturally Aspirated Yamaha-Tuned V10 (1LR-GUE)",
    drivetrain: "RWD",
    accentColor: "#f8f9fa",
    geometryType: "supercar_midengine",
    useCase: "Collector Asset",
    basePrice: {
      USD: 375000,
      EUR: 350000,
      GBP: 310000,
      INR: 31125000,
      AED: 1376250,
    },
    specs: {
      horsepower: 552,
      torqueNm: 480,
      zeroToHundredKmh: 3.7,
      zeroToTwoHundredKmh: 11.4,
      topSpeedKmh: 325,
      weightKg: 1480,
      powerToWeightHpPerTonne: 373,
      dragCoefficientCd: 0.31,
      downforceAt250KmhKg: 140,
      lateralGForce: 1.48,
      braking100To0M: 31.0,
      engineDisplacementLiters: 4.8,
      transmission: "6-Speed Automated Sequential Gearbox (ASG)",
      chassisStructure: "65% Carbon Fiber Reinforced Plastic (CFRP) with In-House 3D Braided Looms",
    },
    paintOptions: [
      { id: "whitest-white", name: "Whitest White Pearl", category: "Pearlescent", hex: "#fcfcfc", metallicFactor: 0.9, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "nurburgring-orange", name: "Nürburgring Competition Orange", category: "Metallic", hex: "#ff5400", metallicFactor: 0.95, roughness: 0.12, clearcoat: 1.0, priceDelta: 15000 },
      { id: "starlight-black", name: "Starlight Black Metallic", category: "Metallic", hex: "#0e0f11", metallicFactor: 0.92, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 },
      { id: "pearl-yellow", name: "Pearl Yellow", category: "Pearlescent", hex: "#ffd000", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 12000 }
    ],
    wheelOptions: [
      { id: "bbs-magnesium-lfa", name: "20-inch BBS Lightweight Forged Magnesium Wheels", sizeInch: 20, finish: "Satin Dark Silver", hex: "#4b5056", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "brembo-ccm-silver", name: "Carbon Ceramic Material (CCM) with Silver Calipers", hex: "#b0b5bc", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "lfa-red-alcantara", name: "Bespoke Red Leather & Alcantara with Anodized Titanium Accents", primaryColor: "#b7094c", accentColor: "#212529", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "Considered by engineers to possess the greatest engine sound in automotive history.",
      characterScores: { performance: 91, comfort: 65, luxury: 85, driverEngagement: 100, practicality: 40, exclusivity: 100 },
      whoIsThisFor: { targetProfile: "Collector Asset", rationale: "Purist acoustic connoisseurs seeking the purest Yamaha-tuned F1-revving naturally aspirated V10." },
      strengths: ["0.6-second idle-to-redline engine response", "Yamaha tuned titanium surge tank acoustics", "Pioneering 65% CFRP woven tub structure"],
      tradeOffs: ["Single-clutch ASG shifts clunky in low-speed traffic", "No modern Apple CarPlay or touchscreen"],
      directCompetitors: ["porsche-911-gt3-rs", "ferrari-sf90-stradale"]
    }
  },

  {
    id: "maserati-mc20",
    brand: "Maserati",
    model: "MC20",
    variant: "Cielo / Coupe",
    modelYear: 2026,
    tagline: "Italian Elegance with F1 Pre-Chamber Combustion Technology",
    category: "Supercar",
    bodyType: "Supercar",
    powertrain: "3.0L Twin-Turbo Nettuno V6 with Twin Spark F1 Pre-Chamber",
    drivetrain: "RWD",
    accentColor: "#1d4ed8",
    geometryType: "supercar_midengine",
    useCase: "Weekend Exhilaration",
    basePrice: {
      USD: 239000,
      EUR: 225000,
      GBP: 195000,
      INR: 19837000,
      AED: 877130,
    },
    specs: {
      horsepower: 621,
      torqueNm: 730,
      zeroToHundredKmh: 2.9,
      zeroToTwoHundredKmh: 8.8,
      topSpeedKmh: 325,
      weightKg: 1475,
      powerToWeightHpPerTonne: 421,
      dragCoefficientCd: 0.38,
      downforceAt250KmhKg: 100,
      lateralGForce: 1.55,
      braking100To0M: 31.2,
      engineDisplacementLiters: 3.0,
      transmission: "8-Speed Wet Dual-Clutch Transmission",
      chassisStructure: "Carbon Fiber Monocoque co-developed with Dallara",
    },
    paintOptions: [
      { id: "blu-infinito", name: "Blu Infinito Pearl", category: "Pearlescent", hex: "#1d4ed8", metallicFactor: 0.96, roughness: 0.1, clearcoat: 1.0, priceDelta: 0 },
      { id: "bianco-audace", name: "Bianco Audace (Matte White with Blue Pearl)", category: "Satin Matte", hex: "#e9ecef", metallicFactor: 0.4, roughness: 0.6, clearcoat: 0.5, priceDelta: 9500 },
      { id: "giallo-genio", name: "Giallo Genio Metallic", category: "Metallic", hex: "#facc15", metallicFactor: 0.94, roughness: 0.12, clearcoat: 1.0, priceDelta: 7500 },
      { id: "nero-enigma", name: "Nero Enigma", category: "Metallic", hex: "#111317", metallicFactor: 0.9, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "birdcage-forged-20", name: "20-inch Birdcage Gloss Black Diamond Cut Wheels", sizeInch: 20, finish: "Diamond Cut Gloss Black", hex: "#343a40", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "brembo-blu-infinito", name: "Brembo Carbon-Ceramic Calipers in Blu", hex: "#1d4ed8", material: "Carbon-Ceramic", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "nero-alcantara-blue", name: "Laser-cut Nero Alcantara with Blu Accents & Carbon Central Tunnel", primaryColor: "#16171b", accentColor: "#1d4ed8", materialType: "ALCANTARA", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "Pure Italian sculpture paired with F1 pre-chamber combustion Nettuno engine punch.",
      characterScores: { performance: 93, comfort: 78, luxury: 88, driverEngagement: 92, practicality: 55, exclusivity: 90 },
      whoIsThisFor: { targetProfile: "Weekend Weapon", rationale: "Connoisseurs wanting bespoke carbon-tub supercar lightness and Butterfly door theatre with daily usable compliance." },
      strengths: ["F1 patented pre-chamber combustion engine", "Sublime fluid Italian silhouette with no protruding wings", "Dallara carbon monocoque rigidity"],
      tradeOffs: ["Engine soundtrack less orchestral than atmospheric V8/V12", "Minimal interior storage pockets"],
      directCompetitors: ["mclaren-750s", "ferrari-sf90-stradale"]
    }
  },

  {
    id: "genesis-g90",
    brand: "Genesis",
    model: "G90",
    variant: "Long Wheelbase",
    modelYear: 2026,
    tagline: "The New Standard of Korean Athletic Elegance and Executive Sanctuary",
    category: "Executive Sedan",
    bodyType: "Executive Sedan",
    powertrain: "3.5L Twin-Turbo V6 with 48V Electric Supercharger (e-S/C)",
    drivetrain: "AWD",
    accentColor: "#9381ff",
    geometryType: "luxury_sedan",
    useCase: "Daily Luxury",
    basePrice: {
      USD: 100500,
      EUR: 96000,
      GBP: 85000,
      INR: 8341500,
      AED: 368835,
    },
    specs: {
      horsepower: 409,
      torqueNm: 549,
      zeroToHundredKmh: 5.2,
      zeroToTwoHundredKmh: 17.5,
      topSpeedKmh: 250,
      weightKg: 2295,
      powerToWeightHpPerTonne: 178,
      dragCoefficientCd: 0.27,
      downforceAt250KmhKg: 25,
      lateralGForce: 0.90,
      braking100To0M: 35.5,
      engineDisplacementLiters: 3.5,
      transmission: "8-Speed Shift-by-Wire Automatic",
      chassisStructure: "High-Strength Steel and Aluminum Composite Body with Multi-Chamber Air Suspension",
    },
    paintOptions: [
      { id: "capri-blue-g90", name: "Capri Blue Metallic", category: "Metallic", hex: "#1e3a8a", metallicFactor: 0.95, roughness: 0.12, clearcoat: 1.0, priceDelta: 0 },
      { id: "makalu-grey", name: "Makalu Grey Matte", category: "Satin Matte", hex: "#4b5563", metallicFactor: 0.25, roughness: 0.7, clearcoat: 0.4, priceDelta: 1500 },
      { id: "uyuni-white", name: "Uyuni White Pearl", category: "Pearlescent", hex: "#f8fafc", metallicFactor: 0.88, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 },
      { id: "vik-black", name: "Vik Black Metallic", category: "Metallic", hex: "#0f172a", metallicFactor: 0.92, roughness: 0.15, clearcoat: 1.0, priceDelta: 0 }
    ],
    wheelOptions: [
      { id: "g90-21-inch-dish", name: "21-inch Forged Multi-Spoke Dish Wheels with G-Matrix Pattern", sizeInch: 21, finish: "Satin Silver", hex: "#cbd5e1", priceDelta: 0 }
    ],
    brakeOptions: [
      { id: "genesis-monobloc-silver", name: "Genesis 4-Piston Monobloc Front Calipers in Silver", hex: "#94a3b8", material: "High-Thermal Cast", priceDelta: 0 }
    ],
    interiorOptions: [
      { id: "dune-beige-nappa", name: "Dune Beige Semi-Aniline Leather with Forged Carbon Wood Inlays", primaryColor: "#d6c7b2", accentColor: "#1e293b", materialType: "LEATHER", priceDelta: 0 }
    ],
    engineeringComponents: [],
    interiorHotspots: [],
    editorial: {
      verdict: "A tour-de-force of contemporary Korean luxury, multi-chamber air suspension, and Bang & Olufsen sound.",
      characterScores: { performance: 76, comfort: 97, luxury: 95, driverEngagement: 60, practicality: 92, exclusivity: 88 },
      whoIsThisFor: { targetProfile: "Daily Driver", rationale: "Executives desiring cutting-edge intuitive technology, autonomous power-closing doors, and serene massage seating." },
      strengths: ["Power-assisted EasyClose doors", "Virtual Acoustics mood modes", "Preview Electronic Control Suspension (ECS)"],
      tradeOffs: ["Heritage brand cachet still growing vs century-old competitors", "Brisk rather than high-performance acceleration"],
      directCompetitors: ["rolls-royce-phantom", "mercedes-benz-amg-gt-63-s-e-performance"]
    }
  }
];
