import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/marketSegments.css";

const segments = [
  {
    title: "Pressure Parts",
    products: [
      {
        name: "Steam Drum & Water Drum",
        detail: "Cylindrical vessels that store steam and water.",
      },
      {
        name: "Headers",
        detail: "Distribute steam or water between tubes; custom-welded for flow efficiency.",
      },
      {
        name: "Boiler Tubes",
        detail: "Carry water or steam; include water wall tubes, riser tubes, and downcomers.",
      },
      {
        name: "Evaporator Coils",
        detail: "Tubes that convert water to steam using heat.",
      },
      {
        name: "Superheater Coils",
        detail: "Elevate steam temperature for turbine efficiency.",
      },
      {
        name: "Economizer Coils",
        detail: "Recover heat from flue gases to preheat feedwater.",
      },
    ],
  },
  {
    title: "Non Pressure Parts",
    products: [
      {
        name: "Waterwall Panels",
        detail: "Tube assemblies forming the furnace walls.",
      },
      {
        name: "Casing & Hopper",
        detail: "External shell and ash collection units.",
      },
      {
        name: "Air Preheater",
        detail: "Transfers heat from flue gases to incoming air.",
      },
      {
        name: "Flues and Ducts",
        detail: "Guide exhaust gases through the system.",
      },
      {
        name: "Cyclones & Dust Collectors",
        detail: "Remove particulates from flue gases.",
      },
      {
        name: "Refractory & Insulation",
        detail: "Protects boiler internals from heat loss.",
      },
    ],
  },
  {
    title: "Piping & Fittings",
    products: [
      {
        name: "Steam & Feedwater Piping",
        detail: "Made from carbon steel or alloy steel.",
      },
      {
        name: "Nozzles & Stub Ends",
        detail: "Welded to headers and drums for pipe connections.",
      },
      {
        name: "Pipe Supports & Expansion Joints",
        detail: "Allow for thermal movement and stability.",
      },
    ],
  },
  {
    title: "Industrial Products",
    products: [
      {
        name: "Pressure vessels and heat exchangers",
        detail: "Built for process control and thermal efficiency.",
      },
      {
        name: "Boilers, chimneys, and furnaces",
        detail: "Complete systems for heat generation and exhaust management.",
      },
      {
        name: "Storage tanks",
        detail: "For chemicals, oil, and water storage.",
      },
      {
        name: "Piping systems and pipe supports",
        detail: "Fabricated networks for industrial flow.",
      },
      {
        name: "Skid-mounted process units",
        detail: "Pre-assembled modular systems for fast deployment.",
      },
      {
        name: "Industrial ducting and ventilation systems",
        detail: "Air handling for large-scale facilities.",
      },
    ],
  },
  {
    title: "Automotive & Transportation",
    products: [
      {
        name: "Chassis frames and body panels",
        detail: "Structural and exterior components.",
      },
      {
        name: "Railway components",
        detail: "Bogie frames and couplers.",
      },
      {
        name: "Truck trailers and container bodies",
        detail: "High-strength mobile structures.",
      },
      {
        name: "Custom vehicle modifications",
        detail: "Armored vehicles and mobile units.",
      },
    ],
  },
  {
    title: "Precision & Sheet Metal",
    products: [
      {
        name: "Laser-cut components",
        detail: "High-precision profiles for assemblies.",
      },
      {
        name: "CNC-machined parts",
        detail: "Tight tolerance mechanical parts.",
      },
      {
        name: "Stamped metal parts",
        detail: "High-volume formed components.",
      },
      {
        name: "Sheet metal enclosures and cabinets",
        detail: "Protective housings for equipment.",
      },
      {
        name: "Control panels and electrical boxes",
        detail: "Fabricated control solutions.",
      },
    ],
  },
  {
    title: "Construction & Infrastructure",
    products: [
      {
        name: "Structural steel frameworks",
        detail: "Load-bearing industrial structures.",
      },
      {
        name: "Pre-engineered buildings (PEBs)",
        detail: "Factory-fabricated building systems.",
      },
      {
        name: "Canopies, gates, and railings",
        detail: "Fabricated access and safety structures.",
      },
      {
        name: "Walkways, platforms, and stairs",
        detail: "Access solutions for plants and worksites.",
      },
      {
        name: "Facade systems and cladding panels",
        detail: "Architectural and protective exterior systems.",
      },
    ],
  },
  {
    title: "Specialised Industrial Application",
    products: [
      {
        name: "Combustion chambers and burners",
        detail: "Thermal processing and high-heat assemblies.",
      },
      {
        name: "Custom jigs and fixtures",
        detail: "Production tooling for precision builds.",
      },
      {
        name: "Cleanroom structures",
        detail: "Controlled environment enclosures.",
      },
      {
        name: "Fabricated lab equipment",
        detail: "Custom research and testing equipment.",
      },
      {
        name: "OEM components for heavy machinery",
        detail: "Built to OEM specifications.",
      },
    ],
  },
  {
    title: "Aerospace & Defense",
    products: [
      {
        name: "Aircraft ground support equipment",
        detail: "Specialized support systems for aviation.",
      },
      {
        name: "Missile launch platforms",
        detail: "High-integrity, defense-grade structures.",
      },
      {
        name: "Radar towers",
        detail: "Durable towers for sensing systems.",
      },
      {
        name: "Defense-grade enclosures",
        detail: "Protected housings for critical equipment.",
      },
    ],
  },
  {
    title: "Agriculture Equipments",
    products: [
      {
        name: "Greenhouse structures",
        detail: "Controlled growing environments.",
      },
      {
        name: "Irrigation system components",
        detail: "Fabricated delivery and support systems.",
      },
      {
        name: "Composting units",
        detail: "Industrial composting equipment.",
      },
      {
        name: "Waste treatment tanks",
        detail: "Handling and storage for agricultural waste.",
      },
    ],
  },
];

const partners = [
  {
    partner: "TRINITY",
    mode: "Direct",
    existing: "New",
    project: "Components",
    details: "Fabricated/ Foundry Components",
    initiation: "2026",
    projection: "100.00",
    estValue: "100.00",
    status:
      "TPAP process of 5 line items are in progress. Audit completed.",
  },
  {
    partner: "TRINITY",
    mode: "Direct",
    existing: "New",
    project: "Coil Car",
    details: "Engineering-GCC",
    initiation: "2025",
    projection: "25.00",
    estValue: "25.00",
    status:
      "Design work is going on and expected to complete FEA by 15 Jan 2026.",
  },
  {
    partner: "TRINITY",
    mode: "Collaboration",
    existing: "New",
    project: "Truck Assembly",
    details: "Full truck assembly",
    initiation: "2026",
    projection: "3,000.00",
    estValue: "3,000.00",
    status: "Work in progress.",
  },
  {
    partner: "Siemens India",
    mode: "Direct",
    existing: "New",
    project: "Dahod",
    details: "45 T Loco Shell",
    initiation: "2026",
    projection: "25.00",
    estValue: "500.00",
    status: "Lost due to price.",
  },
  {
    partner: "Siemens India",
    mode: "Direct",
    existing: "New",
    project: "Exports",
    details: "54 T Loco Shell",
    initiation: "2027",
    projection: "10.00",
    estValue: "180.00",
    status: "Work in progress.",
  },
  {
    partner: "Siemens India",
    mode: "Direct",
    existing: "New",
    project: "Exports",
    details: "Flat bed Freight Car",
    initiation: "2027",
    projection: "5.00",
    estValue: "360.00",
    status: "Work in progress.",
  },
  {
    partner: "Siemens USA",
    mode: "Direct",
    existing: "New",
    project: "Passenger comp",
    details: "Fabricated/ Foundry Components",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "On hold due to tariff.",
  },
  {
    partner: "Howden India",
    mode: "Direct",
    existing: "New",
    project: "Pump Casing",
    details: "Fabrication",
    initiation: "2026",
    projection: "50.00",
    estValue: "50.00",
    status: "Order received.",
  },
  {
    partner: "TIL",
    mode: "Direct",
    existing: "New",
    project: "Akash Launcher Frame and others",
    details: "Fabrication",
    initiation: "2025",
    projection: "20.00",
    estValue: "20.00",
    status: "Manufacturing in progress.",
  },
  {
    partner: "Premium Transmission",
    mode: "Direct",
    existing: "New",
    project: "Gear Box Casing",
    details: "Fabrication",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Pricing issues, did not pursue.",
  },
  {
    partner: "Wabtec India",
    mode: "Direct",
    existing: "New",
    project: "Pressure Vessel",
    details: "Fabrication",
    initiation: "2026",
    projection: "50.00",
    estValue: "50.00",
    status: "Commercial finalized. ASME+ design approval WIP.",
  },
  {
    partner: "Wabtec India",
    mode: "Direct",
    existing: "New",
    project: "Piping System",
    details: "Cold form",
    initiation: "2026",
    projection: "30.00",
    estValue: "30.00",
    status: "Commercial discussion in final stages.",
  },
  {
    partner: "Wabtec India",
    mode: "Collaboration",
    existing: "New",
    project: "Discharges Gate Mechanism",
    details: "Fab + Foundry",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "-",
  },
  {
    partner: "L&T India",
    mode: "Direct",
    existing: "New",
    project: "Sub Assy",
    details: "Fabrication",
    initiation: "2025",
    projection: "25.00",
    estValue: "25.00",
    status:
      "Big fabrication structure outside our capability. Order received for 22 L.",
  },
  {
    partner: "Tubes India",
    mode: "Internal",
    existing: "New",
    project: "CRF",
    details: "Freight Car",
    initiation: "2026",
    projection: "50.00",
    estValue: "50.00",
    status: "Dropped since TI is not interested to sell the asset.",
  },
  {
    partner: "Nevomo",
    mode: "Collaboration",
    existing: "New",
    project: "MagRail",
    details: "DPA-Kandla-Proto",
    initiation: "2026",
    projection: "150.00",
    estValue: "150.00",
    status: "Expect order worth Rs 20 cr.",
  },
  {
    partner: "Nevomo",
    mode: "Collaboration",
    existing: "New",
    project: "MagRail",
    details: "Bremen-Germany",
    initiation: "2026",
    projection: "-",
    estValue: "-",
    status: "Discussion ongoing to finalize scope.",
  },
  {
    partner: "Hormann",
    mode: "Collaboration",
    existing: "New",
    project: "Design & Engineering",
    details: "MRVC",
    initiation: "MOU signed on Sep 25",
    projection: "-",
    estValue: "-",
    status: "Open.",
  },
  {
    partner: "Hormann",
    mode: "Collaboration",
    existing: "New",
    project: "Design & Engineering",
    details: "Nagpur Metro",
    initiation: "MOU signed on Sep 26",
    projection: "-",
    estValue: "-",
    status: "Open.",
  },
  {
    partner: "Hormann",
    mode: "Collaboration",
    existing: "New",
    project: "Design & Engineering",
    details: "Kolkata Metro",
    initiation: "MOU signed on Sep 27",
    projection: "-",
    estValue: "-",
    status: "Open.",
  },
  {
    partner: "Hormann",
    mode: "Collaboration",
    existing: "New",
    project: "Design & Engineering",
    details: "Vietnam Light Rail",
    initiation: "MOU signed on Sep 28",
    projection: "-",
    estValue: "-",
    status: "Open.",
  },
  {
    partner: "Silex",
    mode: "Collaboration",
    existing: "New",
    project: "Semi High Speed Trains + Flat Bed Wagon",
    details: "Warsaw-Project",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Open.",
  },
  {
    partner: "Silex",
    mode: "Collaboration",
    existing: "New",
    project: "Kavach",
    details: "IR",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "On hold from our side.",
  },
  {
    partner: "Silex",
    mode: "Collaboration",
    existing: "New",
    project: "Door System",
    details: "Domestic",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Make in India door manufacturing.",
  },
  {
    partner: "Luchinni",
    mode: "Collaboration",
    existing: "New",
    project: "Wheel Set Manufacturing",
    details: "Green Field project-India",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Open for final direction.",
  },
  {
    partner: "Nippon",
    mode: "Collaboration",
    existing: "New",
    project: "Wheel Set Manufacturing",
    details: "Green Field project-India",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Open for final direction.",
  },
  {
    partner: "RTTE",
    mode: "Collaboration",
    existing: "New",
    project: "Passenger Coach manufacturing",
    details: "Green Field project-India",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Open for final direction.",
  },
  {
    partner: "VED",
    mode: "Acquisition",
    existing: "New",
    project: "Assembled Bogies",
    details: "Fab. Bogie",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Closed due to higher acquisition price.",
  },
  {
    partner: "ABB",
    mode: "Collaboration",
    existing: "New",
    project: "Rail Passenger car market",
    details: "Propulsion",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status:
      "In principle aligned for India market. Final decision/direction WIP.",
  },
  {
    partner: "Hitech-New",
    mode: "Brown Field-ICF/MCF/RCF",
    existing: "New",
    project: "Assembled Bogies",
    details: "Fab. Bogie",
    initiation: "2028",
    projection: "300.00",
    estValue: "300.00",
    status: "Initiated the project.",
  },
  {
    partner: "Coil Spring-Unit",
    mode: "Acquisition",
    existing: "New",
    project: "Coil Spring for mobility market-Trinity & Y 25",
    details: "Brown Field",
    initiation: "2026",
    projection: "400.00",
    estValue: "400.00",
    status: "Due diligence going on.",
  },
  {
    partner: "BMBS",
    mode: "JV",
    existing: "New",
    project: "JSS Russia",
    details: "Green Field project-India",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Open for final direction.",
  },
  {
    partner: "BEML",
    mode: "Direct",
    existing: "New",
    project: "Chennai/Bengaluru Metro",
    details: "Bogie Frames",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "No projects offloaded due to internal capacity.",
  },
  {
    partner: "CLW",
    mode: "-",
    existing: "New",
    project: "WAG 9 / 9H",
    details: "Loco Shell",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Closed due to pricing issues.",
  },
  {
    partner: "CLW",
    mode: "-",
    existing: "New",
    project: "WAG 9 / 9H",
    details: "Loco Bogie frame",
    initiation: "-",
    projection: "1.00",
    estValue: "-",
    status: "Project initiated.",
  },
  {
    partner: "ICF",
    mode: "Direct",
    existing: "New",
    project: "Axle Box",
    details: "Foundry",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Dropped due to low margins.",
  },
  {
    partner: "Nymwag",
    mode: "Direct",
    existing: "Existing",
    project: "Fabricated Y 25 Bogie",
    details: "Fabrication",
    initiation: "2026",
    projection: "50.00",
    estValue: "-",
    status:
      "Fresh bogie sub-assembly fabrication and inspection done; final direction awaited from NYMWAG.",
  },
  {
    partner: "Construction Equip",
    mode: "Direct",
    existing: "New",
    project: "Fabricated Boom etc",
    details: "Fabrication",
    initiation: "-",
    projection: "-",
    estValue: "-",
    status: "Closed due to low margins.",
  },
];

const hitechRows = [
  {
    segment: "Railway",
    customer: "Wabtec",
    mode: "Existing",
    market: "Export",
    application: "Locomotive",
    products: "Various",
    outlook: "30% Contribution",
    fy26: "2122",
    fy27: "3000",
    fy28: "3300",
    fy29: "3600",
    fy30: "3600",
    remarks:
      "Additional Shed of 10000 Sqmt + Fixtures & Tooling. (New part addition & Increase of Business Share).",
  },
  {
    segment: "Railway",
    customer: "",
    mode: "Existing",
    market: "Domestic",
    application: "Locomotive",
    products: "Various",
    outlook: "30% Contribution",
    fy26: "2540",
    fy27: "3000",
    fy28: "3000",
    fy29: "2000",
    fy30: "0",
    remarks: "",
  },
  {
    segment: "Railway",
    customer: "Alstom",
    mode: "Existing",
    market: "Domestic",
    application: "Locomotive",
    products: "Various",
    outlook: "30% Contribution",
    fy26: "1255",
    fy27: "1255",
    fy28: "1255",
    fy29: "1255",
    fy30: "0",
    remarks: "",
  },
  {
    segment: "Railway",
    customer: "Siemens Loco 9000 hp",
    mode: "New",
    market: "Domestic",
    application: "Locomotive",
    products: "Loco Shell",
    outlook: "20% Contribution",
    fy26: "400",
    fy27: "400",
    fy28: "1600",
    fy29: "6000",
    fy30: "8000",
    remarks: "Investment considered in the project Rs 14 Cr",
  },
  {
    segment: "Railway",
    customer: "Wabtec",
    mode: "New",
    market: "Export",
    application: "Locomotive",
    products: "Pressure vessel / Storage tanks",
    outlook: "30% Contribution",
    fy26: "0",
    fy27: "800",
    fy28: "2000",
    fy29: "3000",
    fy30: "3000",
    remarks: "Additional Shed 5000 Sqmt + Rs 100 L (New Business)",
  },
  {
    segment: "Railway",
    customer: "Wabtec",
    mode: "New",
    market: "Export",
    application: "Locomotive",
    products: "Piping System",
    outlook: "30% Contribution",
    fy26: "0",
    fy27: "1000",
    fy28: "1000",
    fy29: "1000",
    fy30: "1000",
    remarks: "Additional Shed 3000 Sqmt + Rs 80 L (New Business)",
  },
  {
    segment: "Railway",
    customer: "Trinity (fabrication)",
    mode: "New",
    market: "Export",
    application: "",
    products: "Various",
    outlook: "30% Contribution",
    fy26: "800",
    fy27: "900",
    fy28: "1000",
    fy29: "1100",
    fy30: "1200",
    remarks: "",
  },
  {
    segment: "Construction",
    customer: "TIL",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "TLV Frame",
    outlook: "30% Contribution",
    fy26: "400",
    fy27: "400",
    fy28: "400",
    fy29: "400",
    fy30: "400",
    remarks: "",
  },
  {
    segment: "All",
    customer: "MISC",
    mode: "Existing",
    market: "Domestic",
    application: "Industry-All",
    products: "Various",
    outlook: "20% Contribution",
    fy26: "2700",
    fy27: "3000",
    fy28: "3300",
    fy29: "3600",
    fy30: "4000",
    remarks: "VMC + Drill m/c (Approx Rs 2.5 cr)",
  },
  {
    type: "subtotal",
    label: "Sub Total",
    fy26: "10217",
    fy27: "13755",
    fy28: "16855",
    fy29: "21955",
    fy30: "21200",
  },
  {
    segment: "Railway",
    customer: "Kinet / TI",
    mode: "New",
    market: "Domestic",
    application: "Bogie Frame-VB",
    products: "Vande Bharat Bogie frame",
    outlook: "15% contribution",
    fy26: "0",
    fy27: "0",
    fy28: "0",
    fy29: "0",
    fy30: "0",
    remarks:
      "Contacted Operation head & Purchase Head. They will take complete bogies assembly including Motor & they have finalised two vendors as of now.",
  },
  {
    segment: "Railway",
    customer: "Y 25 Bogie For Europe",
    mode: "New",
    market: "Export",
    application: "Freight & Passenger",
    products: "Bogie frame",
    outlook: "30% Contribution",
    fy26: "0",
    fy27: "1500",
    fy28: "2500",
    fy29: "3500",
    fy30: "5000",
    remarks: "Investment on Fixture & Robot/cobot (Exploring Thru Agent)",
  },
  {
    segment: "Power Plant",
    customer: "Thermax/ISGEC/ L&T",
    mode: "New",
    market: "Domestic",
    application: "Pressure Vessel MS",
    products: "Vessel / Storage Tanks",
    outlook: "20% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Power Plant",
    customer: "Thermax/ISGEC/ L&T",
    mode: "New",
    market: "Domestic",
    application: "Pressure Vessel SS",
    products: "Vessel / Storage Tanks",
    outlook: "20% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Pharma",
    customer: "All Drug manufacturer",
    mode: "New",
    market: "Domestic",
    application: "Pressure Vessel SS",
    products: "Vessel / Storage Tanks",
    outlook: "20% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Chemical",
    customer: "ALL Chemical Units",
    mode: "New",
    market: "Domestic",
    application: "Pressure Vessel (MS & SS)",
    products: "Pressure vessel / Storage tanks",
    outlook: "20% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "Tata Hitachi",
    mode: "New",
    market: "Domestic",
    application: "Heavy Frame Section",
    products: "Bucket/Boom",
    outlook: "10% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "JCB",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "",
    outlook: "0",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "Hyundai",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "",
    outlook: "0",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "SANY",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "",
    outlook: "0",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "Various",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "Truck Trailor Frame/ Dump bucket",
    outlook: "10% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "Tata Motors",
    mode: "New",
    market: "Domestic",
    application: "Dump Bucket",
    products: "Bucket",
    outlook: "10% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Construction",
    customer: "Bull India",
    mode: "New",
    market: "Domestic",
    application: "Heavy Frame Section",
    products: "Truck Trailor Frame/ Dump bucket",
    outlook: "10% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Infra",
    customer: "Airports/Telecom tower/",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "Towers/ Bridge, Airport Structures Buildings",
    outlook: "10% Contribution",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "Exporing business opportunity",
  },
  {
    segment: "Infra",
    customer: "Howden",
    mode: "New",
    market: "Domestic",
    application: "Draught Fan",
    products: "Draught Fan Casing",
    outlook: "20% Contribution",
    fy26: "600",
    fy27: "900",
    fy28: "1200",
    fy29: "1500",
    fy30: "2000",
    remarks: "Space requirement to be estimated. Howden to Audit our facility.",
  },
  {
    segment: "OIL & Gas",
    customer: "",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "Off Shore Platforms",
    outlook: "Spl Job Work",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "",
  },
  {
    segment: "Renewable",
    customer: "",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "Hydro / Solar / Wind structures",
    outlook: "Spl Job Work",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "",
  },
  {
    segment: "Defense",
    customer: "",
    mode: "New",
    market: "Domestic",
    application: "",
    products: "Naval Vessel/Hangers",
    outlook: "Spl Job Work",
    fy26: "0",
    fy27: "",
    fy28: "",
    fy29: "",
    fy30: "",
    remarks: "",
  },
  {
    type: "total",
    label: "Total",
    fy26: "10817",
    fy27: "16155",
    fy28: "20555",
    fy29: "26955",
    fy30: "28200",
  },
];

const MarketSegments = () => {
  const pageRef = useRef(null);
  const topRef = useRef(null);
  const hitechRef = useRef(null);

  const handleExport = async () => {
    if (!pageRef.current || !topRef.current || !hitechRef.current) return;

    pageRef.current.classList.add("segment-export");
    await new Promise((resolve) => setTimeout(resolve, 50));

    const pdf = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: "a4",
      compress: true,
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 28;
    const imgWidth = pdfWidth - margin * 2;
    const captureSection = async (element) => {
      const canvas = await html2canvas(element, {
        scale: 1.25,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.72);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      return { imgData, imgHeight };
    };

    const topShot = await captureSection(topRef.current);
    pdf.addImage(topShot.imgData, "JPEG", margin, margin, imgWidth, topShot.imgHeight);

    const hitechShot = await captureSection(hitechRef.current);
    pdf.addPage();
    pdf.addImage(hitechShot.imgData, "JPEG", margin, margin, imgWidth, hitechShot.imgHeight);

    pageRef.current.classList.remove("segment-export");
    pdf.save("market-segments.pdf");
  };

  const normalizeStatus = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const getStatusCategory = (value) => {
    const text = normalizeStatus(value);
    if (!text || text === "-") return "Open";
    if (text.includes("on hold") || text.includes("hold")) return "On hold";
    if (
      text.includes("closed") ||
      text.includes("dropped") ||
      text.includes("lost") ||
      text.includes("pricing issues") ||
      text.includes("did not pursue")
    ) {
      return "Closed";
    }
    if (
      text.includes("work in progress") ||
      text.includes("manufacturing in progress") ||
      text.includes("order received") ||
      text.includes("initiated") ||
      text.includes("design work") ||
      text.includes("design approval") ||
      text.includes("audit completed")
    ) {
      return "Work in progress";
    }
    if (
      text.includes("discussion") ||
      text.includes("final stages") ||
      text.includes("awaited") ||
      text.includes("aligned") ||
      text.includes("expect order") ||
      text.includes("due diligence") ||
      text.includes("final direction")
    ) {
      return "Discussion ongoing";
    }
    if (text.includes("open")) return "Open";
    return "Open";
  };

  const statusTone = (category) => {
    switch (category) {
      case "Work in progress":
        return "positive";
      case "Discussion ongoing":
        return "open";
      case "Closed":
        return "risk";
      case "On hold":
        return "hold";
      default:
        return "neutral";
    }
  };

  const statusPriority = {
    "Work in progress": 0,
    "Discussion ongoing": 1,
    Open: 2,
    "On hold": 3,
    Closed: 4,
  };

  const parseAmount = (value) => {
    if (!value || value === "-") return 0;
    const numeric = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const sortedPartners = [...partners].sort((a, b) => {
    const aCategory = getStatusCategory(a.status);
    const bCategory = getStatusCategory(b.status);
    const aRank = statusPriority[aCategory] ?? 99;
    const bRank = statusPriority[bCategory] ?? 99;
    if (aRank !== bRank) return aRank - bRank;
    return a.partner.localeCompare(b.partner);
  });

  const statusTotals = sortedPartners.reduce((acc, row) => {
    const category = getStatusCategory(row.status);
    if (!acc[category]) {
      acc[category] = { projection: 0, estValue: 0 };
    }
    acc[category].projection += parseAmount(row.projection);
    acc[category].estValue += parseAmount(row.estValue);
    return acc;
  }, {});

  const totalProducts = segments.reduce(
    (count, segment) => count + segment.products.length,
    0
  );

  return (
    <div className="segment-page" ref={pageRef}>
      <header className="segment-hero">
        <div className="segment-hero-content">
          <p className="segment-kicker">Market segment map</p>
          <h1>Fabrication Portfolio by Segment</h1>
          <p className="segment-subtitle">
            A structured view of manufacturing capability across core industries,
            from boiler internals to defense-grade assemblies.
          </p>
          <div className="segment-stats">
            <div className="segment-stat">
              <span>Segments</span>
              <strong>{segments.length}</strong>
            </div>
            <div className="segment-stat">
              <span>Total product families</span>
              <strong>{totalProducts}</strong>
            </div>
            <div className="segment-stat">
              <span>Capability focus</span>
              <strong>Heavy + precision fabrication</strong>
            </div>
          </div>
        </div>
        <div className="segment-actions" data-html2canvas-ignore="true">
          <button type="button" onClick={handleExport}>
            Export PDF
          </button>
        </div>
      </header>

      <div ref={topRef}>
        <section className="segment-table">
          {segments.map((segment) => (
            <div key={segment.title} className="segment-row">
              <div className="segment-label">
                <h3>{segment.title}</h3>
                <span>{segment.products.length} products</span>
              </div>
              <div className="segment-products">
                {segment.products.map((product) => (
                  <span key={product.name} className="segment-product">
                    <strong>{product.name}</strong>
                    <span>{product.detail}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="partner-section">
          <div className="partner-header">
            <div>
              <p className="segment-kicker">Partner pipeline</p>
              <h2>Strategic Partnerships and Project Pipeline</h2>
              <p className="partner-subtitle">
                Active opportunities with status, projections, and initiation
                timelines as of Nov 2025.
              </p>
            </div>
            <div className="partner-totals">
              <div>
                <span>Total projection (FY30)</span>
                <strong>4,291.00 Cr</strong>
              </div>
              <div>
                <span>Est. project value</span>
                <strong>5,240.00 Cr</strong>
              </div>
              <div className="partner-status-totals">
                {Object.keys(statusPriority).map((category) => (
                  <div key={category}>
                    <span>{category}</span>
                    <strong>
                      {statusTotals[category]?.projection.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) ?? "0.00"}
                      {" Cr / "}
                      {statusTotals[category]?.estValue.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) ?? "0.00"}
                      {" Cr"}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="partner-table">
            <div className="partner-row partner-head">
              <span>Partners</span>
              <span>Mode</span>
              <span>Existing/New</span>
              <span>Project</span>
              <span>Details</span>
              <span>Business Initiation</span>
              <span>Total Projection (FY30) Cr</span>
              <span>Est Project Value Cr</span>
              <span>Status as on Nov 2025</span>
            </div>
            {sortedPartners.map((row, index) => {
              const category = getStatusCategory(row.status);
              const normalizedStatus = normalizeStatus(row.status);
              const normalizedCategory = normalizeStatus(category);
              const note =
                normalizedStatus && normalizedStatus !== normalizedCategory
                  ? row.status
                  : "";
              return (
              <div
                key={`${row.partner}-${row.project}-${index}`}
                className="partner-row"
              >
                <span>{row.partner}</span>
                <span>{row.mode}</span>
                <span>{row.existing}</span>
                <span>{row.project}</span>
                <span>{row.details}</span>
                <span>{row.initiation}</span>
                <span>{row.projection}</span>
                <span>{row.estValue}</span>
                <span className={`partner-status tone-${statusTone(category)}`}>
                  <strong>{category}</strong>
                  {note && <span>{note}</span>}
                </span>
              </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="hitech-section" ref={hitechRef}>
        <div className="hitech-header">
          <div>
            <p className="segment-kicker">Hitech Unit</p>
            <h2>Estimated Business Projection (INR Lacs)</h2>
          </div>
        </div>
        <div className="hitech-summary">
          <div className="hitech-summary-card">
            <span>FY26 to FY30 total</span>
            <strong>10817 | 16155 | 20555 | 26955 | 28200</strong>
          </div>
          <div className="hitech-summary-card">
            <span>Base subtotal (existing + near-term)</span>
            <strong>10217 to 21200</strong>
          </div>
          <div className="hitech-summary-card">
            <span>Growth drivers</span>
            <strong>Railway programs + infra expansion</strong>
          </div>
        </div>
        <div className="hitech-scroll">
          <table className="hitech-table">
            <thead>
              <tr>
                <th>Market Segment</th>
                <th>Customer</th>
                <th>Mode</th>
                <th>Market</th>
                <th>Application</th>
                <th>Products</th>
                <th>Business Outlook</th>
                <th>FY 26</th>
                <th>FY 27</th>
                <th>FY 28</th>
                <th>FY 29</th>
                <th>FY 30</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {hitechRows.map((row, index) => {
                if (row.type === "subtotal") {
                  return (
                    <tr key={`subtotal-${index}`} className="hitech-subtotal">
                      <td colSpan="7">{row.label}</td>
                      <td>{row.fy26}</td>
                      <td>{row.fy27}</td>
                      <td>{row.fy28}</td>
                      <td>{row.fy29}</td>
                      <td>{row.fy30}</td>
                      <td />
                    </tr>
                  );
                }

                if (row.type === "total") {
                  return (
                    <tr key={`total-${index}`} className="hitech-total">
                      <td colSpan="7">{row.label}</td>
                      <td>{row.fy26}</td>
                      <td>{row.fy27}</td>
                      <td>{row.fy28}</td>
                      <td>{row.fy29}</td>
                      <td>{row.fy30}</td>
                      <td />
                    </tr>
                  );
                }

                return (
                  <tr key={`${row.segment}-${row.customer}-${index}`}>
                    <td>{row.segment}</td>
                    <td>{row.customer}</td>
                    <td>{row.mode}</td>
                    <td>{row.market}</td>
                    <td>{row.application}</td>
                    <td>{row.products}</td>
                    <td>{row.outlook}</td>
                    <td>{row.fy26}</td>
                    <td>{row.fy27}</td>
                    <td>{row.fy28}</td>
                    <td>{row.fy29}</td>
                    <td>{row.fy30}</td>
                    <td>{row.remarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MarketSegments;
