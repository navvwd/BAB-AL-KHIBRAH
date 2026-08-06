export interface ProcessingService {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  supportedMaterials: string[];
  supportedForms: string[];
  machineryUsed: string[];
  capabilities: {
    maxDimension: string;
    tolerance: string;
    leadTime: string;
  };
  processSteps: string[];
  qualityChecks: string[];
  faqs: { question: string; answer: string }[];
}

export const processingServices: ProcessingService[] = [
  {
    id: "bandsaw-cutting",
    name: "Bandsaw Cutting",
    description: "High-precision mechanical cold-cutting for steel round bars, blocks, and heavy sections.",
    detailedDescription: "Our bandsaw cutting service offers high-precision cold cutting for steel round bars and blocks. Because bandsaw cutting is a mechanical cold process, it avoids introducing any heat-affected zones (HAZ), preserving the mechanical properties and microstructure of quenched & tempered or annealed engineering alloys.",
    supportedMaterials: ["Carbon Steel (EN8, CK45)", "Alloy Steel (EN19, EN24)", "Tool Steel (D2, P20)", "Aluminium (7075, 2024)", "Stainless Steel (304L, 316L)"],
    supportedForms: ["Round bars", "Blocks", "Pipes", "Other sections"],
    machineryUsed: ["Heavy-Duty Semi-Automatic Bandsaw Machine", "5-Ton Overhead Crane for material positioning"],
    capabilities: {
      maxDimension: "Up to 500mm diameter (Client-review-required)",
      tolerance: "±1.5mm (Client-review-required)",
      leadTime: "Same-day or next-day depending on volume"
    },
    processSteps: [
      "Material inspection and heat-number verification.",
      "Rigid clamping in bandsaw hydraulic vice.",
      "Blade speed and coolant flow adjustment based on grade hardness.",
      "Mechanical cutting execution under continuous monitoring.",
      "Deburring of cut surfaces."
    ],
    qualityChecks: [
      "Dimensional check using calibrated calipers.",
      "Visual check for cut perpendicularity.",
      "Heat-number stamp transfer preservation on cut-off pieces."
    ],
    faqs: [
      {
        question: "Does bandsaw cutting affect the steel hardness?",
        answer: "No. Bandsaw cutting is a cold cutting process. It uses continuous liquid coolant, meaning no thermal stress or heat-affected zone (HAZ) is created."
      },
      {
        question: "What is your maximum cutting capacity?",
        answer: "We can handle round bars up to approximately 500mm in diameter, though please contact our sales desk to confirm current machine limits for specific grades."
      }
    ]
  },
  {
    id: "oxy-fuel-cutting",
    name: "Oxy-Fuel Plate Cutting",
    description: "Heavy-duty thermal profile flame cutting for carbon and alloy steel plates up to thick gauges.",
    detailedDescription: "For heavy-gauge carbon steel plates, our oxy-fuel cutting service offers precise shape profiling, block cutting, and strip slicing. This thermal process is ideal for carbon and low-alloy steels, converting heavy plate materials into structural blanks ready for milling.",
    supportedMaterials: ["Medium Carbon Steel (CK45, C45 Plates)", "Low Alloy Structural Plates"],
    supportedForms: ["Plates"],
    machineryUsed: ["Multi-Torch Oxy-Fuel Profile Cutting Machine", "Portable Gas Cutting Machine"],
    capabilities: {
      maxDimension: "Plate thickness up to 150mm (Client-review-required)",
      tolerance: "±3.0mm (Client-review-required)",
      leadTime: "2 to 3 business days depending on design complexity"
    },
    processSteps: [
      "AutoCAD drawing upload and CAD nesting setup.",
      "Oxy-fuel preheating flame adjustments (oxygen-propane mixture).",
      "Thermal cutting along nested path.",
      "Slag removal and grinding of edges."
    ],
    qualityChecks: [
      "Profile tolerance check against drawing specifications.",
      "Visual check for edge squaring and gouging."
    ],
    faqs: [
      {
        question: "Can oxy-fuel cut stainless steel or aluminium?",
        answer: "No. Oxy-fuel cutting relies on the rapid oxidation of iron. Non-ferrous metals like aluminium and stainless steel do not oxidize in this way and require bandsaw cutting or sourcing."
      },
      {
        question: "Do you cut plates to custom drawings?",
        answer: "Yes. Customers can submit PDF, DXF, or DWG drawings via our RFQ desk, and we program our profile cutters to cut exactly to size."
      }
    ]
  },
  {
    id: "cut-to-size-processing",
    name: "Custom Cut-to-Size",
    description: "Multi-material dimensional cutting tailored for direct CNC feeding, reducing machining waste.",
    detailedDescription: "Our custom cut-to-size processing is designed to save machine shops time and scrap costs. Instead of buying full-length 6-meter bars or large plates, we supply material pre-cut to your finished blank lengths, ready for direct clamping into your CNC machines.",
    supportedMaterials: ["All Stocked Grades"],
    supportedForms: ["Round bars", "Plates", "Pipes", "Rods", "Blocks"],
    machineryUsed: ["Bandsaw Machines", "Oxy-Fuel Cutters", "Warehouse material handling grids"],
    capabilities: {
      maxDimension: "Tailored to client specs",
      tolerance: "Grade and shape dependent (typically ±1mm to ±2mm)",
      leadTime: "Same-day pickup for stock items"
    },
    processSteps: [
      "Customer shares grade, dimensions, and quantity.",
      "Material selection from appropriate stock bar or plate.",
      "Cutting method selection (cold saw vs flame profile).",
      "Precision cut execution and stamp identification transfer."
    ],
    qualityChecks: [
      "100% inspection of length and thickness parameters.",
      "Calibrated verification of diameters."
    ],
    faqs: [
      {
        question: "Can I buy just a single cut piece?",
        answer: "Yes. As a B2B supplier, we support machine shops and repair workshops with custom cut pieces to minimize material waste."
      },
      {
        question: "How do you trace grades on small cut pieces?",
        answer: "Every cut piece has its original mill heat number stamped or paint-marked onto it before shipment, and we supply the corresponding Mill Test Certificate (MTC)."
      }
    ]
  },
  {
    id: "special-sourcing",
    name: "Special Material Sourcing",
    description: "Global coordination to source hard-to-find alloy grades, custom shapes, and oversized sections.",
    detailedDescription: "When project specifications require niche grades, non-standard sizes, or international specifications not stocked locally, our procurement network steps in. We coordinate directly with international manufacturers and major European/Asian stockists to import special alloys with certified mill tracking.",
    supportedMaterials: ["Special alloys, Nickel alloys, high-performance bronzes, custom tool steels"],
    supportedForms: ["Forged bars", "Heavy wall pipes", "Oversized blocks", "Custom profiles"],
    machineryUsed: ["Global freight network", "Mill supplier logistics desks"],
    capabilities: {
      maxDimension: "Unlimited sourcing possibilities",
      tolerance: "Mill standard",
      leadTime: "Standard import schedules (Client-review-required)"
    },
    processSteps: [
      "Review engineering drawings and technical standards (ASTM, EN, DIN, etc.).",
      "Query registered international mills and specialized stockists.",
      "Provide custom quote containing pricing, origin, and delivery timeline.",
      "Import logistics and custom clearance coordination to our Sharjah warehouse."
    ],
    qualityChecks: [
      "Mill certificate validation before import.",
      "Visual and dimensional check upon warehouse arrival."
    ],
    faqs: [
      {
        question: "What is your typical lead time for imported materials?",
        answer: "Sourcing lead time depends on global availability and transport methods (air freight vs sea freight). Contact us for a project-specific estimate."
      }
    ]
  },
  {
    id: "inspection-testing",
    name: "Inspection & Testing Coordination",
    description: "Organizing third-party auditing and laboratory validation (PMI, UT, Tensile, MTC EN10204 3.1).",
    detailedDescription: "For critical B2B industries like oil & gas, defense, or heavy infrastructure, material verification is non-negotiable. We coordinate local third-party inspections and laboratory testing to provide verified material certificates before the steel leaves our yard.",
    supportedMaterials: ["All supplied metals"],
    supportedForms: ["All forms"],
    machineryUsed: ["Calibrated micrometers", "NDT instruments (OES, Ultrasonic) via local testing laboratories"],
    capabilities: {
      maxDimension: "N/A",
      tolerance: "In accordance with ISO and ASTM standards",
      leadTime: "Adds 1-2 business days to prep time"
    },
    processSteps: [
      "Review project inspection requirements.",
      "Schedule inspection with local service providers (Lloyd's Register, BV, TÜV, SGS).",
      "Supervise witness testing (PMI, hardness, dimensional checks).",
      "Collect and compile inspection certificates alongside Mill Test Certificates."
    ],
    qualityChecks: [
      "Verify inspector credentials.",
      "Audit laboratory reports for compliance with international standards."
    ],
    faqs: [
      {
        question: "Can you provide Lloyd's or Bureau Veritas certificates?",
        answer: "Yes. We coordinate third-party inspection agencies in the UAE to witness inspect, test, and stamp-verify materials according to your requirements."
      },
      {
        question: "Do all materials come with a Mill Test Certificate?",
        answer: "Yes. All steel and alloy products stocked in our warehouse are supplied with Mill Test Certificates (MTC) conforming to EN 10204 3.1 standards."
      }
    ]
  }
];

export const warehouseEquipment = [
  { name: "5-Ton Overhead Crane", purpose: "Safe, efficient handling and positioning of heavy plates, blocks, and bundles of steel bars." },
  { name: "Semi-Automatic Bandsaw Machines", purpose: "Precise cold-sawing of steel round bars and blocks without thermal structural changes." },
  { name: "Oxy-Fuel Profile Cutting Machine", purpose: "Gas flame cutting of heavy carbon steel plates up to 150mm thickness according to templates." },
  { name: "Heavy-Duty Forklift", purpose: "Loading and unloading logistics for warehouse racks and pickup delivery vehicles." },
  { name: "Portable Gas Cutting Machine", purpose: "In-yard straight-line plate splitting and sizing." },
  { name: "Logistics Pickup Fleet", purpose: "Local delivery across Dubai, Sharjah, and Northern Emirates." }
];
