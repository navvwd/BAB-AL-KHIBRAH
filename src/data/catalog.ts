export interface ChemicalComposition {
  element: string;
  min: number;
  max: number;
}

export interface MechanicalProperties {
  tensileStrengthMin?: number; // MPa
  tensileStrengthMax?: number; // MPa
  yieldStrengthMin?: number;   // MPa
  elongationMin?: number;      // %
  hardnessMax?: string;        // HB / HRC
}

export interface MaterialGrade {
  grade: string;
  family: 'Medium Carbon Steel' | 'Hard Chrome Plated Bar' | 'Tool Steel' | 'Alloy Steel' | 'Aluminium Alloy' | 'Stainless Steel';
  image: string;
  equivalents: {
    aisi?: string;
    din?: string;
    en?: string;
    bs?: string;
    jis?: string;
  };
  description: string;
  forms: ('Round bars' | 'Plates' | 'Pipes' | 'Rods' | 'Blocks' | 'Cut pieces' | 'Other requested sections')[];
  conditions: string[];
  chemicalComposition: ChemicalComposition[];
  mechanicalProperties: MechanicalProperties;
  applications: string[];
  machinability: string;
  heatTreatment: {
    annealing?: string;
    hardening?: string;
    tempering?: string;
  };
  status: 'In Stock' | 'Global Sourcing';
  disclaimer?: string;
}

export const materialCatalog: MaterialGrade[] = [
  {
    grade: "EN8",
    family: "Medium Carbon Steel",
    image: "/PRODUCTS/EN8.jpg",
    equivalents: { aisi: "1040 / 1045", din: "CK45 / C45E", en: "EN8 / 080M40", bs: "080M40", jis: "S45C" },
    description: "A medium carbon steel suitable for shafts, axles, gears, bolts, and studs. Widely used where moderate tensile strength and good machinability are required.",
    forms: ["Round bars", "Plates", "Cut pieces"],
    conditions: ["Normalized", "As Rolled"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.36, max: 0.44 },
      { element: "Silicon (Si)", min: 0.10, max: 0.40 },
      { element: "Manganese (Mn)", min: 0.60, max: 1.00 },
      { element: "Phosphorus (P)", min: 0, max: 0.05 },
      { element: "Sulphur (S)", min: 0, max: 0.05 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 550,
      tensileStrengthMax: 700,
      yieldStrengthMin: 280,
      elongationMin: 16,
      hardnessMax: "201 HB"
    },
    applications: [
      "General-purpose axles and shafts",
      "Gears and pinions",
      "Stressing bolts and studs",
      "Keys and keyways",
      "Hydraulic pistons and guide rods"
    ],
    machinability: "Good machinability, easily machined in normalized or as-rolled conditions. Weldable with appropriate pre-heating.",
    heatTreatment: {
      annealing: "Heat to 830-860°C, cool slowly in furnace.",
      hardening: "Heat to 830-860°C, quench in water or oil.",
      tempering: "Heat to 550-660°C, cool in still air."
    },
    status: "In Stock"
  },
  {
    grade: "Medium Carbon Steel C45",
    family: "Medium Carbon Steel",
    image: "/PRODUCTS/Medium Carbon Steel C-45.jpg",
    equivalents: { aisi: "1045", din: "1.1191", en: "C45 / CK45", bs: "080M46", jis: "S45C" },
    description: "Unalloyed medium carbon steel with excellent strength and wear resistance. Frequently flame or induction hardened to increase surface durability for high-wear mechanical parts.",
    forms: ["Round bars", "Plates", "Blocks", "Cut pieces"],
    conditions: ["Normalized", "As Rolled", "Induction Hardened (upon request)"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.42, max: 0.50 },
      { element: "Silicon (Si)", min: 0.15, max: 0.35 },
      { element: "Manganese (Mn)", min: 0.50, max: 0.80 },
      { element: "Chromium (Cr)", min: 0, max: 0.40 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 580,
      yieldStrengthMin: 305,
      elongationMin: 16,
      hardnessMax: "207 HB"
    },
    applications: [
      "Machined shafts and spindles",
      "Crankshafts and connecting rods",
      "Gears, axles, and rollers",
      "Die bolster blocks and base plates"
    ],
    machinability: "Excellent machining characteristics, suitable for turning, drilling, and milling.",
    heatTreatment: {
      annealing: "Heat slowly to 800-840°C, furnace cool.",
      hardening: "820-860°C, water or oil quench.",
      tempering: "550-660°C, air cool."
    },
    status: "In Stock"
  },
  {
    grade: "Medium Carbon Steel C45E",
    family: "Medium Carbon Steel",
    image: "/PRODUCTS/Medium Carbon Steel C45E.jpg",
    equivalents: { aisi: "1045", din: "1.1191", en: "C45E", bs: "080M46", jis: "S45C" },
    description: "Special quality medium carbon engineering steel with controlled sulphur content for superior forging, heat-treatment response, and machine tool performance.",
    forms: ["Round bars", "Plates", "Cut pieces"],
    conditions: ["Normalized", "As Rolled"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.42, max: 0.50 },
      { element: "Silicon (Si)", min: 0.15, max: 0.35 },
      { element: "Manganese (Mn)", min: 0.50, max: 0.80 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 590,
      yieldStrengthMin: 310,
      elongationMin: 16,
      hardnessMax: "210 HB"
    },
    applications: [
      "Forged axles and drive components",
      "High wear guide pins",
      "Stressed machine fasteners"
    ],
    machinability: "High machinability with consistent chip control.",
    heatTreatment: {
      annealing: "800-840°C furnace cool."
    },
    status: "In Stock"
  },
  {
    grade: "Hard Chrome Plated Bar C45E / CK45",
    family: "Hard Chrome Plated Bar",
    image: "/PRODUCTS/Hard Chrome Plated Bar C45E  CK45.jpg",
    equivalents: { aisi: "C45E Chrome", din: "CK45 Chrome", en: "EN8 Chrome", bs: "080M46 Chrome" },
    description: "Precision-ground cylindrical bars plated with a thick layer of hard chromium (min 20 micron depth). Provides extreme corrosion resistance, low friction, and scratch durability in hydraulic piston rods.",
    forms: ["Rods", "Cut pieces"],
    conditions: ["Hard Chrome Plated (Min 20 micron depth)", "Induction Hardened & Plated"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.42, max: 0.50 },
      { element: "Silicon (Si)", min: 0.15, max: 0.35 },
      { element: "Chrome Plating Depth", min: 0.02, max: 0.05 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 580,
      yieldStrengthMin: 305,
      hardnessMax: "Plating: 850-1000 HV (Core: 200 HB)"
    },
    applications: [
      "Hydraulic cylinders and pneumatic piston rods",
      "Guide bars, columns, and slide rods",
      "Linear bearing shafts",
      "Dump trucks and excavator lift arms"
    ],
    machinability: "Excellent core machinability. Plated layer handles smooth slide operations without flaking.",
    heatTreatment: {
      annealing: "Applied to precision ground CK45 core."
    },
    status: "In Stock"
  },
  {
    grade: "D2 / 1.2379 Cold Work Die Steel",
    family: "Tool Steel",
    image: "/PRODUCTS/Tool Steel  Cold Work Die Steel 1.2379  D2.jpg",
    equivalents: { aisi: "D2", din: "1.2379 / X153CrMoV12", en: "BD2", bs: "BD2", jis: "SKD11" },
    description: "High-carbon, high-chromium cold-work tool steel. Known for extreme wear resistance, excellent edge retention, and high compressive strength, making it the industry benchmark for tooling.",
    forms: ["Round bars", "Plates", "Blocks", "Cut pieces"],
    conditions: ["Annealed (approx. 250 HB max)"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 1.45, max: 1.60 },
      { element: "Chromium (Cr)", min: 11.00, max: 13.00 },
      { element: "Molybdenum (Mo)", min: 0.70, max: 1.00 },
      { element: "Vanadium (V)", min: 0.70, max: 1.00 }
    ],
    mechanicalProperties: {
      hardnessMax: "58-62 HRC (Post Hardening)"
    },
    applications: [
      "Stamping and blanking dies",
      "Thread rolling dies",
      "Slitting cutters and shear blades",
      "Cold extrusion and forming tools"
    ],
    machinability: "Annealed stock is machined to net-shape before vacuum hardening.",
    heatTreatment: {
      annealing: "830-870°C, slow furnace cool.",
      hardening: "1020-1040°C air/gas quench."
    },
    status: "In Stock"
  },
  {
    grade: "Plastic Mould Steel P20 / 1.2311 / 1.2312",
    family: "Tool Steel",
    image: "/PRODUCTS/Tool Steel  Plastic Mould Steel 1.2311  1.2312  P20.jpg",
    equivalents: { aisi: "P20", din: "1.2311 / 1.2312", en: "BP20", bs: "BP20", jis: "HPM2" },
    description: "Pre-hardened plastic mold steel with uniform hardness profile, high toughness, and clean photo-etching polishability. 1.2312 contains added sulphur for free-machining efficiency.",
    forms: ["Plates", "Blocks", "Cut pieces"],
    conditions: ["Pre-hardened (280-325 HB)"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.35, max: 0.45 },
      { element: "Manganese (Mn)", min: 1.30, max: 1.60 },
      { element: "Chromium (Cr)", min: 1.80, max: 2.10 },
      { element: "Molybdenum (Mo)", min: 0.15, max: 0.25 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 950,
      yieldStrengthMin: 800,
      hardnessMax: "280-325 HB"
    },
    applications: [
      "Plastic injection molds and compression dies",
      "Die holders, bolsters, and mold frames",
      "Extrusion dies and blow molds"
    ],
    machinability: "Pre-hardened steel with outstanding free-machining performance.",
    heatTreatment: {
      annealing: "Pre-hardened, no further hardening required."
    },
    status: "In Stock"
  },
  {
    grade: "Chromium-Molybdenum EN19 / 42CrMo4 / 4140",
    family: "Alloy Steel",
    image: "/PRODUCTS/Chromium-Molybdenum EN19  42CrMo4  4140.jpg",
    equivalents: { aisi: "4140", din: "1.7225 / 42CrMo4", en: "EN19 / 708M40", bs: "708M40", jis: "SCM440" },
    description: "High-tensile alloy steel containing chromium and molybdenum. Renowned for its high fatigue strength, toughness, and torsional shock load capacity in critical machine components.",
    forms: ["Round bars", "Plates", "Blocks", "Cut pieces"],
    conditions: ["Quenched & Tempered (Condition T)", "Annealed"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.38, max: 0.45 },
      { element: "Chromium (Cr)", min: 0.90, max: 1.20 },
      { element: "Molybdenum (Mo)", min: 0.15, max: 0.30 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 850,
      tensileStrengthMax: 1000,
      yieldStrengthMin: 680,
      hardnessMax: "248 HB (Pre-hardened)"
    },
    applications: [
      "High-stress engine crankshafts",
      "Gears, drive shafts, and axles under heavy load",
      "Piston rods and drill collars for oilfield equipment"
    ],
    machinability: "Good machinability in annealed condition. Machinable with carbide tooling in Condition T.",
    heatTreatment: {
      annealing: "800-850°C, furnace cool.",
      hardening: "820-860°C, oil quench."
    },
    status: "In Stock"
  },
  {
    grade: "Nickel-Chromium-Molybdenum EN24 / 34CrNiMo6 / 4340",
    family: "Alloy Steel",
    image: "/PRODUCTS/Nickel-Chromium-Molybdenum Steel EN24  34CrNiMo6  4340.jpg",
    equivalents: { aisi: "4340", din: "1.6582 / 34CrNiMo6", en: "EN24 / 817M40", bs: "817M40", jis: "SNCM439" },
    description: "Premium nickel-chromium-molybdenum high-tensile alloy steel. Provides superior ductility, high wear resistance, and deep hardenability under extreme structural stress.",
    forms: ["Round bars", "Blocks", "Cut pieces"],
    conditions: ["Quenched & Tempered (Condition U/W)", "Annealed"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0.36, max: 0.44 },
      { element: "Chromium (Cr)", min: 1.00, max: 1.40 },
      { element: "Nickel (Ni)", min: 1.30, max: 1.70 },
      { element: "Molybdenum (Mo)", min: 0.20, max: 0.35 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 950,
      tensileStrengthMax: 1100,
      yieldStrengthMin: 750,
      hardnessMax: "277 HB (Pre-hardened)"
    },
    applications: [
      "Heavy-duty aircraft and defense components",
      "Torsional shafts, power transmission gears, and spindles",
      "Marine engine shafts and heavy propeller shafts"
    ],
    machinability: "Best machined in annealed condition. Very high fatigue strength.",
    heatTreatment: {
      annealing: "830-850°C, slow furnace cool."
    },
    status: "In Stock"
  },
  {
    grade: "Aluminium Alloy 7075 T6 / T651",
    family: "Aluminium Alloy",
    image: "/PRODUCTS/Aluminium-Alloy 7075.png",
    equivalents: { aisi: "7075-T6", din: "3.4365", en: "AlZnMgCu1.5", bs: "2L95", jis: "A7075" },
    description: "Ultra-high strength aerospace-grade aluminium alloy. Offers exceptional strength-to-density ratio, high fatigue resistance, and mechanical toughness comparable to medium carbon steels.",
    forms: ["Round bars", "Plates", "Blocks", "Cut pieces"],
    conditions: ["T6", "T651"],
    chemicalComposition: [
      { element: "Zinc (Zn)", min: 5.10, max: 6.10 },
      { element: "Magnesium (Mg)", min: 2.10, max: 2.90 },
      { element: "Copper (Cu)", min: 1.20, max: 2.00 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 572,
      yieldStrengthMin: 503,
      elongationMin: 11,
      hardnessMax: "150 HB"
    },
    applications: [
      "Aircraft structural frames and tension fittings",
      "Highly stressed gears, shafts, and hydraulic valve bodies",
      "Precision tooling jigs and CNC prototype blocks"
    ],
    machinability: "Outstanding high-speed machining performance.",
    heatTreatment: {
      annealing: "415°C for 2-3 hours, slow cool."
    },
    status: "In Stock"
  },
  {
    grade: "Stainless Steel SS 316L / 304L",
    family: "Stainless Steel",
    image: "/PRODUCTS/Stainless Steel SS 316L.png",
    equivalents: { aisi: "316L / 304L", din: "1.4404 / 1.4307", en: "316S11 / 304S11", bs: "316S31", jis: "SUS316L" },
    description: "Low-carbon molybdenum-bearing austenitic stainless steel. Highly resistant to chloride environment pitting, marine corrosion, and chemical chemical attack in industrial process lines.",
    forms: ["Round bars", "Plates", "Pipes", "Cut pieces"],
    conditions: ["Solution Annealed"],
    chemicalComposition: [
      { element: "Carbon (C)", min: 0, max: 0.03 },
      { element: "Chromium (Cr)", min: 16.00, max: 18.00 },
      { element: "Nickel (Ni)", min: 10.00, max: 14.00 },
      { element: "Molybdenum (Mo)", min: 2.00, max: 3.00 }
    ],
    mechanicalProperties: {
      tensileStrengthMin: 485,
      yieldStrengthMin: 170,
      elongationMin: 40,
      hardnessMax: "95 HRB"
    },
    applications: [
      "Marine fittings and ship repair spare parts",
      "Chemical, pharmaceutical, and food machinery",
      "Desalination plant piping and heat exchangers"
    ],
    machinability: "Solution annealed condition, machines cleanly with sharp tools and rich coolants.",
    heatTreatment: {
      annealing: "1010-1150°C water quench."
    },
    status: "In Stock"
  }
];

export const equivalentGradesLookup = [
  { grade: "EN8", standard: "BS 970", equivalent: "080M40" },
  { grade: "C45", standard: "DIN EN 10083", equivalent: "1.1191" },
  { grade: "EN19", standard: "BS 970", equivalent: "708M40" },
  { grade: "EN24", standard: "BS 970", equivalent: "817M40" },
  { grade: "42CrMo4", standard: "DIN", equivalent: "1.7225" },
  { grade: "D2", standard: "AISI", equivalent: "D2" },
  { grade: "1.2379", standard: "DIN", equivalent: "X153CrMoV12" },
  { grade: "P20", standard: "AISI", equivalent: "P20" },
  { grade: "1.2311", standard: "DIN", equivalent: "40CrMnMo7" },
  { grade: "1.2312", standard: "DIN", equivalent: "40CrMnMoS8-6" },
  { grade: "7075-T651", standard: "ASTM", equivalent: "Alumec 89" }
];
