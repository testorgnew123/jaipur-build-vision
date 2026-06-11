export type SpecRow = {
  label: string;
  detail: string;
  sub?: { label: string; detail: string }[]; // nested items, e.g. Bathroom / Kitchen
};
export type PackageSection = { title: string; rows: SpecRow[] };

export type Package = {
  slug: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[]; // top features shown on the home card
  highlight: boolean;
  sections: PackageSection[]; // full spec for the detail page; [] when not yet supplied
  notes: string[]; // "Additional charges" block; [] when none
};

export const packages: Package[] = [
  {
    slug: "standard",
    name: "Standard Villa",
    price: "₹ 1,949",
    unit: "per sq.ft",
    desc: "Solid civil shell with quality standard finishes for value-conscious homebuilders.",
    features: [
      "RCC — Jindal steel & ISI cement",
      "Ceramic flooring (up to ₹40/sq.ft)",
      "Asian Paints distemper finish",
      "CERA bathroom fittings",
      "Finolex wiring + Anchor switches",
      "Granite kitchen platform + steel sink",
    ],
    highlight: false,
    sections: [
      {
        title: "Planning",
        rows: [
          {
            label: "Architectural",
            detail: "2D Plan, Electricity, Plumbing, Working Plan, Elevation, Isometric",
          },
          { label: "Structural", detail: "Footing, Column, Beam, Slab" },
        ],
      },
      {
        title: "PMC",
        rows: [{ label: "PMC", detail: "Project Management & Consultancy" }],
      },
      {
        title: "Execution",
        rows: [
          {
            label: "Sand",
            detail: "Banas river sand (in RCC & strength work); M-Sand (in masonry work)",
          },
          { label: "Brick", detail: "Standard size modular brick" },
          {
            label: "Stone",
            detail: "In foundation (strip footing for outer wall); Harmada & Jhalana hills",
          },
          { label: "Cement", detail: "ISI brands per availability — ACC, Ambuja, Birla etc." },
          { label: "Aggregate", detail: "Modi crusher (20 mm size)" },
          { label: "Steel", detail: "Reinforcement (Jindal)" },
          { label: "Clear cover", detail: "Mould of CC" },
          {
            label: "Flooring",
            detail: "Ceramic tiles (up to ₹40/sq.ft); granite at staircase (up to ₹70/sq.ft)",
          },
          { label: "Chaukhat", detail: "Bijolia hills stone" },
          { label: "Electricity Wire", detail: "Finolex" },
          { label: "AC Wire", detail: "Papriwal copper pipe" },
          { label: "Sanitary Pipe", detail: "Kissan (KSR)" },
          { label: "Electric Switches", detail: "Anchor Penta" },
          { label: "Concealed Light", detail: "Bajaj" },
          { label: "Almirah", detail: "Granite stone" },
          {
            label: "Window",
            detail:
              "Iron grill + mesh & glass palla, fix glass, or UPVC (without grill), with handle & chatkani",
          },
          {
            label: "Door",
            detail:
              "Flush door (palm board with mica on both sides); accessories: chatkani, gate stopper, locks - Jainson",
          },
          {
            label: "Bathroom",
            detail: "Accessories fitting (max ₹20,000)",
            sub: [
              { label: "Commode", detail: "CERA (wall hanging)" },
              { label: "Shower", detail: "CERA (diverter)" },
              { label: "Tap", detail: "CERA" },
              { label: "Floor", detail: "Ceramic tiles (anti-skid) up to ₹40/sq.ft" },
              { label: "Walls", detail: "Ceramic tiles up to 7 ft (up to ₹40/sq.ft)" },
              {
                label: "Wash Basin",
                detail: "Readymade (in bathroom); table top (only near living or dining space)",
              },
            ],
          },
          {
            label: "Kitchen",
            detail: "Granite platform & stainless steel sink",
            sub: [
              { label: "Platform", detail: "Granite (up to ₹80/sq.ft)" },
              { label: "Sink", detail: "Stainless steel" },
            ],
          },
          { label: "Roof", detail: "Vajrafoot or Kaleji (natural/unpolished)" },
          { label: "Railing", detail: "Stainless steel" },
          { label: "Putti", detail: "Wonder / Birla / NCL" },
          { label: "Paint", detail: "Distemper (Asian Paints)" },
          { label: "Main Door", detail: "Iron gate (up to ₹20,000)" },
        ],
      },
    ],
    notes: [
      "Tank cost: ₹10 / litre",
      "If only ground floor is constructed, an extra 10% of the standard villa rate (₹1,949/sq.ft) applies for foundation work.",
    ],
  },
  {
    slug: "classic",
    name: "Classic Villa",
    price: "₹ 2,149",
    unit: "per sq.ft",
    desc: "Enhanced finishes with better materials — a solid step up from basic.",
    features: [
      "RCC — Jindal Panther steel & ISI cement",
      "Granite + ceramic flooring (up to ₹60/sq.ft)",
      "Royal Color (Asian Paints)",
      "CERA bathroom fittings",
      "Finolex wiring + Anchor switches",
      "P.O.P. fall ceiling (per design)",
    ],
    highlight: false,
    sections: [
      {
        title: "Planning",
        rows: [
          {
            label: "Architectural",
            detail: "2D Plan, Electricity, Plumbing, Working Plan, Elevation, Isometric, 3D View",
          },
          { label: "Structural", detail: "Footing, Column, Beam, Slab" },
        ],
      },
      {
        title: "PMC",
        rows: [{ label: "PMC", detail: "Project Management & Consultancy" }],
      },
      {
        title: "Execution",
        rows: [
          {
            label: "Sand",
            detail: "Banas river sand (in RCC & strength work); M-Sand (in masonry work)",
          },
          { label: "Brick", detail: "Standard size modular brick" },
          {
            label: "Stone",
            detail: "In foundation (strip footing for outer wall); Harmada & Jhalana hills",
          },
          { label: "Cement", detail: "ISI brands per availability — ACC, Ultra, Ambuja, Birla etc." },
          { label: "Aggregate", detail: "Modi crusher (20 mm size)" },
          { label: "Steel", detail: "Reinforcement (Jindal Panther)" },
          { label: "Clear cover", detail: "Mould of CC" },
          {
            label: "Flooring",
            detail: "Granite, ceramic tiles (up to ₹60/sq.ft); granite at staircase (up to ₹80/sq.ft)",
          },
          { label: "Chaukhat", detail: "Bijolia hills stone" },
          { label: "Electricity Wire", detail: "Finolex" },
          { label: "AC Wire", detail: "Papriwal copper pipe" },
          { label: "Sanitary Pipe", detail: "Kissan (KSR)" },
          { label: "Electric Switches", detail: "Anchor Penta" },
          { label: "Concealed Light", detail: "Bajaj" },
          {
            label: "Almirah",
            detail:
              "(Acc. to design) Granite stone completely turned whitish by Royal Shine, with iron frame",
          },
          {
            label: "Window",
            detail:
              "Iron grill + mesh palla & glass palla & fix glass with standard quality chutkani & handles",
          },
          {
            label: "Door",
            detail:
              "30mm Palm flush door (palm board + mica both sides); accessories: chatkani, door stopper, lock - Jainson",
          },
          {
            label: "Bathroom",
            detail: "Accessories (max ₹25,000)",
            sub: [
              { label: "Commode", detail: "CERA (wall hanging)" },
              { label: "Diverter", detail: "CERA" },
              { label: "Shower", detail: "CERA" },
              { label: "Tap", detail: "CERA, gravity" },
              { label: "Floor", detail: "Ceramic tiles (anti-skid) up to ₹40/ft" },
              { label: "Walls", detail: "Ceramic tiles (7 ft) up to ₹40/sq.ft" },
              { label: "Wash Basin", detail: "Table top (nearby dining zone); readymade (in bathroom)" },
            ],
          },
          {
            label: "Kitchen",
            detail: "South Black granite platform, steel sink & gas line",
            sub: [
              { label: "Platform", detail: "South Black granite or equivalent" },
              { label: "Sink", detail: "Stainless steel" },
              { label: "Gas Pipe Line", detail: "Standard quality (only in kitchen)" },
            ],
          },
          { label: "Railing", detail: "Stainless steel, glass based (only in duplex at stairs)" },
          { label: "Putti", detail: "Wonder, Birla" },
          { label: "POP", detail: "JK" },
          { label: "Primer", detail: "Asian Paints" },
          { label: "Base", detail: "Chowk Mitti" },
          { label: "Paint", detail: "Royal Color (Asian Paints)" },
          { label: "Main Door", detail: "Iron gate up to ₹20,000" },
          { label: "Fall Ceiling", detail: "P.O.P. based (Acc. to design)" },
          { label: "Roof", detail: "Vajrafoot or Kaleji (natural/unpolished)" },
        ],
      },
    ],
    notes: [
      "Tank cost: ₹10 / litre",
      "If only ground floor is constructed, an extra 10% of the standard villa rate (₹1,949/sq.ft) applies for foundation work.",
    ],
  },
  {
    slug: "premium",
    name: "Premium Villa",
    price: "₹ 2,390",
    unit: "per sq.ft",
    desc: "Our most popular package. Modular kitchen, furniture and premium finishes included.",
    features: [
      "RCC — Jindal Panther steel & ISI cement",
      "Granite + ceramic flooring (up to ₹60/sq.ft)",
      "Modular kitchen (soft-close Tandem fittings)",
      "TV panel furniture (per design)",
      "P.O.P. fall ceiling (per design)",
      "CERA bathroom fittings",
      "Royal Color (Asian Paints)",
    ],
    highlight: true,
    sections: [
      {
        title: "Planning",
        rows: [
          {
            label: "Architectural",
            detail: "2D Plan, Electricity, Plumbing, Working Plan, Elevation, Isometric, 3D View",
          },
          { label: "Structural", detail: "Footing, Column, Beam, Slab" },
        ],
      },
      {
        title: "PMC",
        rows: [{ label: "PMC", detail: "Project Management & Consultancy" }],
      },
      {
        title: "Execution",
        rows: [
          {
            label: "Sand",
            detail: "Banas river sand (in RCC & strength work); M-Sand (in masonry work)",
          },
          { label: "Brick", detail: "Standard size modular brick" },
          {
            label: "Stone",
            detail: "In foundation (strip footing for outer wall); Harmada & Jhalana hills",
          },
          { label: "Cement", detail: "ISI brands per availability — ACC, Ultra, Ambuja, Birla etc." },
          { label: "Aggregate", detail: "Modi crusher (20 mm size)" },
          { label: "Steel", detail: "Reinforcement (Jindal Panther)" },
          { label: "Clear cover", detail: "Mould of CC" },
          {
            label: "Flooring",
            detail: "Granite, ceramic tiles (up to ₹60/sq.ft); granite at staircase (up to ₹80/sq.ft)",
          },
          { label: "Chaukhat", detail: "Bijolia hills stone" },
          { label: "Electricity Wire", detail: "Finolex" },
          { label: "AC Wire", detail: "Papriwal copper pipe" },
          { label: "Sanitary Pipe", detail: "Kissan (KSR)" },
          { label: "Electric Switches", detail: "Anchor Penta" },
          { label: "Concealed Light", detail: "Bajaj" },
          {
            label: "Almirah",
            detail:
              "Chaps (granite stone completely turned whitish by Royal Shine) with iron frame 22 gauge",
          },
          {
            label: "Window",
            detail:
              "Iron grill + mesh palla & glass palla & fix glass with standard quality chutkani & handles",
          },
          {
            label: "Door",
            detail:
              "30mm Palm flush door (palm board + mica both sides); accessories: chatkani, door stopper, lock - Jainson",
          },
          {
            label: "Bathroom",
            detail: "Accessories (max ₹25,000)",
            sub: [
              { label: "Commode", detail: "CERA (wall hanging)" },
              { label: "Diverter", detail: "CERA" },
              { label: "Shower", detail: "CERA" },
              { label: "Tap", detail: "CERA, gravity" },
              { label: "Floor", detail: "Ceramic tiles (anti-skid) up to ₹40/ft" },
              { label: "Walls", detail: "Ceramic tiles (7 ft) up to ₹40/sq.ft" },
              { label: "Wash Basin", detail: "Table top (nearby dining zone); readymade (in bathroom)" },
            ],
          },
          {
            label: "Kitchen",
            detail: "South Black granite platform, modular units, steel sink & gas line",
            sub: [
              { label: "Platform", detail: "South Black granite or equivalent" },
              { label: "Sink", detail: "Stainless steel" },
              {
                label: "Modular",
                detail: "Innovate, Soft-close, Tandem fitting with laminate outside & linear backside",
              },
              { label: "Gas Pipe Fitting", detail: "Standard quality (only in kitchen)" },
            ],
          },
          { label: "Railing", detail: "Stainless steel, glass based (only in duplex at stairs)" },
          { label: "Putti", detail: "Wonder, Birla" },
          { label: "POP", detail: "JK" },
          { label: "Primer", detail: "Asian Paints" },
          { label: "Base", detail: "Chowk Mitti" },
          { label: "Paint", detail: "Royal Color (Asian Paints)" },
          { label: "Main Door", detail: "Iron gate up to ₹20,000" },
          {
            label: "Furniture",
            detail: "TV panel",
            sub: [{ label: "TV Panel", detail: "In living room or drawing room (Acc. to design)" }],
          },
          { label: "Fall Ceiling", detail: "P.O.P. based (Acc. to design)" },
          { label: "Roof", detail: "Vajrafoot or Kaleji (natural/unpolished)" },
        ],
      },
    ],
    notes: [
      "Tank cost: ₹10 / litre",
      "If only ground floor is constructed, an extra 10% of the standard villa rate (₹1,949/sq.ft) applies for foundation work.",
    ],
  },
  {
    slug: "luxury",
    name: "Luxury Villa",
    price: "₹ 2,690",
    unit: "per sq.ft",
    desc: "Turnkey luxury — full furniture, modular kitchen, chimney and premium finishes.",
    features: [
      "Granite + ceramic flooring (up to ₹60/sq.ft)",
      "Modular kitchen + Prestige/Elica chimney",
      "Furniture pkg — hydraulic beds, sofa, TV panel, almirah",
      "CERA bathroom fittings (₹30,000 budget)",
      "30mm flush / UPVC doors (Godrej & Jainson locks)",
      "Iron main gate (up to ₹35,000) + glass railing",
    ],
    highlight: false,
    sections: [
      {
        title: "Planning",
        rows: [
          {
            label: "Architectural",
            detail: "2D Plan, Electricity, Plumbing, Working Plan, Elevation, Isometric, 3D View",
          },
          { label: "Structural", detail: "Footing, Column, Beam, Slab" },
        ],
      },
      {
        title: "PMC",
        rows: [{ label: "PMC", detail: "Project Management & Consultancy" }],
      },
      {
        title: "Execution",
        rows: [
          {
            label: "Sand",
            detail: "Banas river sand (in RCC & strength work); M-Sand (in masonry work)",
          },
          { label: "Brick", detail: "Standard size modular brick" },
          {
            label: "Stone",
            detail: "In foundation (strip footing for outer wall); Harmada & Jhalana hills",
          },
          { label: "Cement", detail: "ISI brands per availability — Ultra, Ambuja, Birla etc." },
          { label: "Aggregate", detail: "Modi crusher (20 mm size)" },
          { label: "Steel", detail: "Reinforcement (Jindal)" },
          { label: "Clear cover", detail: "Mould of CC" },
          {
            label: "Flooring",
            detail: "Granite, ceramic tiles (up to ₹60/sq.ft); granite at staircase (up to ₹80/sq.ft)",
          },
          { label: "Chaukhat", detail: "Bijolia hills stone" },
          { label: "Electricity Wire", detail: "Finolex" },
          { label: "AC Wire", detail: "Papriwal copper pipe" },
          { label: "Sanitary Pipe", detail: "Kissan (KSR)" },
          { label: "Electric Switches", detail: "Anchor Penta" },
          { label: "Concealed Light", detail: "Bajaj" },
          {
            label: "Almirah",
            detail:
              "Chapas granite stone completely turned whitish by Royal Shine. Door - plyboard + mica front, liner at back; accessories: lock (Godrej), handle, chutkani",
          },
          {
            label: "Window",
            detail:
              "Iron grill + mesh palla + glass palla (with standard chutkani & handle) or UPVC (without stone baiwan)",
          },
          {
            label: "Door",
            detail:
              "Flush door (30mm plyboard) or UPVC doors (without stone baiwan); accessories: standard quality chatkani, door stopper & locks - Jainson",
          },
          {
            label: "Bathroom",
            detail: "Accessories (max ₹30,000)",
            sub: [
              { label: "Commode", detail: "CERA (wall hanging)" },
              { label: "Diverter", detail: "CERA" },
              { label: "Shower", detail: "CERA Diverter" },
              { label: "Tap", detail: "CERA" },
              { label: "Floor", detail: "Ceramic tiles (anti-skid)" },
              { label: "Walls", detail: "Ceramic tiles up to ₹60/sq.ft" },
              { label: "Wash Basin", detail: "Table top (near dining area); readymade (in bathroom)" },
            ],
          },
          {
            label: "Kitchen",
            detail: "South Black granite platform, modular units, chimney, steel sink & gas line",
            sub: [
              { label: "Platform", detail: "South Black granite or equivalent" },
              { label: "Sink", detail: "Stainless steel" },
              {
                label: "Modular",
                detail: "Innovate, Soft-close, Tandem fitting with laminate outside & liner backside",
              },
              { label: "Gas Pipe Fitting", detail: "Standard quality (only in kitchen)" },
              { label: "Chimney", detail: "Prestige, Elica (max ₹12,000)" },
            ],
          },
          {
            label: "Railing",
            detail: "Stainless steel / glass-based (glass railing at stairs only in duplex, otherwise SS)",
          },
          { label: "Putti", detail: "Wonder, Birla" },
          { label: "POP", detail: "JK" },
          { label: "Primer", detail: "Asian Paints" },
          { label: "Base", detail: "Chowk Mitti" },
          { label: "Paint", detail: "Royal Color (Asian Paints)" },
          { label: "Main Door", detail: "Iron gate up to ₹35,000" },
          {
            label: "Furniture",
            detail: "Almirah, TV panel, beds & sofa (Acc. to design)",
            sub: [
              { label: "Almirah", detail: "Chapas with front side mica, liner backside (Acc. to design)" },
              { label: "TV Panel", detail: "In living room or drawing room (Acc. to design)" },
              {
                label: "Bed",
                detail: "One bed in every bedroom with hydraulic lift system (Acc. to design)",
              },
              { label: "Sofa", detail: "In drawing or living area (up to 10 seat)" },
            ],
          },
          { label: "Fall Ceiling", detail: "P.O.P. based (Acc. to design)" },
          { label: "Roof", detail: "Vajrafoot or Kaleji (natural/unpolished)" },
        ],
      },
    ],
    notes: [
      "Tank cost: ₹10 / litre",
      "If only ground floor is constructed, an extra 10% of the standard villa rate (₹1,949/sq.ft) applies for foundation work in this slab.",
    ],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
