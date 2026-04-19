export type Project = {
  slug: string;
  title: string;
  type: "Residential" | "Commercial" | "Villa" | "Renovation" | "Interior";
  location: string;
  area: string;
  timeline: string;
  budget: string;
  status: "Completed" | "Ongoing";
  cover: string;
  gallery: string[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  quote?: { text: string; author: string };
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "the-mansarovar-villa",
    title: "The Mansarovar Villa",
    type: "Villa",
    location: "Mansarovar, Jaipur",
    area: "4,200 sq.ft",
    timeline: "11 months",
    budget: "₹ 1.6 Cr",
    status: "Completed",
    cover: u("photo-1600585154340-be6161a56a0c"),
    gallery: [
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1616486338812-3dadae4b4ace"),
    ],
    description:
      "A contemporary 4BHK villa blending Jaipur's stone heritage with modern minimalism. Floor-to-ceiling glazing, double-height living, and a private courtyard.",
    highlights: [
      "Imported Italian marble flooring",
      "VRV climate control",
      "Smart home automation (Lutron)",
      "Rooftop infinity pool",
    ],
    specs: [
      { label: "Plot Size", value: "350 sq.yd" },
      { label: "Built-up", value: "4,200 sq.ft" },
      { label: "Bedrooms", value: "4 + Study" },
      { label: "Parking", value: "3 cars" },
    ],
    quote: {
      text: "SingleStop turned our dream into a precision-built reality. The transparency was unmatched.",
      author: "Mr. & Mrs. Agarwal, Owners",
    },
  },
  {
    slug: "vaishali-heights-residence",
    title: "Vaishali Heights Residence",
    type: "Residential",
    location: "Vaishali Nagar, Jaipur",
    area: "2,800 sq.ft",
    timeline: "9 months",
    budget: "₹ 95 L",
    status: "Completed",
    cover: u("photo-1582268611958-ebfd161ef9cf"),
    gallery: [
      u("photo-1582268611958-ebfd161ef9cf"),
      u("photo-1600210492486-724fe5c67fb0"),
      u("photo-1600573472550-8090b5e0745e"),
    ],
    description:
      "A G+2 family residence designed for three generations. Light wells and central courtyard create a serene Jaipur haveli aesthetic.",
    highlights: ["Vastu-compliant layout", "Solar + inverter ready", "Italian modular kitchen"],
    specs: [
      { label: "Plot Size", value: "200 sq.yd" },
      { label: "Built-up", value: "2,800 sq.ft" },
      { label: "Floors", value: "G + 2" },
      { label: "Parking", value: "2 cars" },
    ],
    quote: {
      text: "Weekly site walkthroughs and the live tracking dashboard kept us in control even from Dubai.",
      author: "Mr. Sharma, NRI Client",
    },
  },
  {
    slug: "jagatpura-commercial-tower",
    title: "Jagatpura Commercial Tower",
    type: "Commercial",
    location: "Jagatpura, Jaipur",
    area: "18,000 sq.ft",
    timeline: "16 months",
    budget: "₹ 6.4 Cr",
    status: "Ongoing",
    cover: u("photo-1486406146926-c627a92ad1ab"),
    gallery: [
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1497366216548-37526070297c"),
      u("photo-1497366811353-6870744d04b2"),
    ],
    description:
      "A G+5 mixed-use commercial tower with retail on ground and Grade-A office floors above. IGBC Gold targeted.",
    highlights: ["IGBC Gold pre-certified", "Curtain wall facade", "DG + Solar hybrid"],
    specs: [
      { label: "Floors", value: "G + 5" },
      { label: "Built-up", value: "18,000 sq.ft" },
      { label: "Lifts", value: "3" },
      { label: "Parking", value: "60 cars" },
    ],
  },
  {
    slug: "c-scheme-heritage-renovation",
    title: "C-Scheme Heritage Renovation",
    type: "Renovation",
    location: "C-Scheme, Jaipur",
    area: "3,500 sq.ft",
    timeline: "7 months",
    budget: "₹ 65 L",
    status: "Completed",
    cover: u("photo-1505691938895-1758d7feb511"),
    gallery: [
      u("photo-1505691938895-1758d7feb511"),
      u("photo-1600121848594-d8644e57abab"),
      u("photo-1600585154526-990dced4db0d"),
    ],
    description:
      "Restoration of a 1960s Jaipur bungalow preserving original jharokhas while adding modern utilities and a contemporary kitchen.",
    highlights: ["Original facade restored", "Structural retrofit", "Modern utilities"],
    specs: [
      { label: "Built-up", value: "3,500 sq.ft" },
      { label: "Era", value: "1960s" },
      { label: "Type", value: "Heritage Bungalow" },
      { label: "Status", value: "Restored" },
    ],
  },
  {
    slug: "malviya-nagar-luxe-interior",
    title: "Malviya Nagar Luxe Interior",
    type: "Interior",
    location: "Malviya Nagar, Jaipur",
    area: "3,200 sq.ft",
    timeline: "5 months",
    budget: "₹ 48 L",
    status: "Completed",
    cover: u("photo-1616486338812-3dadae4b4ace"),
    gallery: [
      u("photo-1616486338812-3dadae4b4ace"),
      u("photo-1618219740975-d40978bb7378"),
      u("photo-1600210491892-03d54c0aaf87"),
    ],
    description:
      "Full apartment interiors with imported veneers, custom millwork, and integrated lighting design.",
    highlights: ["Custom millwork", "Imported veneers", "Architectural lighting"],
    specs: [
      { label: "Built-up", value: "3,200 sq.ft" },
      { label: "Bedrooms", value: "4" },
      { label: "Style", value: "Contemporary Luxe" },
      { label: "Duration", value: "5 months" },
    ],
  },
  {
    slug: "tonk-road-modern-villa",
    title: "Tonk Road Modern Villa",
    type: "Villa",
    location: "Tonk Road, Jaipur",
    area: "5,800 sq.ft",
    timeline: "14 months",
    budget: "₹ 2.4 Cr",
    status: "Ongoing",
    cover: u("photo-1613490493576-7fde63acd811"),
    gallery: [
      u("photo-1613490493576-7fde63acd811"),
      u("photo-1600596542815-ffad4c1539a9"),
      u("photo-1600047509807-ba8f99d2cdde"),
    ],
    description:
      "A 5BHK contemporary villa with an open courtyard, basement entertainment lounge, and rooftop garden.",
    highlights: ["Basement lounge", "Rooftop garden", "Home theatre"],
    specs: [
      { label: "Plot Size", value: "500 sq.yd" },
      { label: "Built-up", value: "5,800 sq.ft" },
      { label: "Bedrooms", value: "5" },
      { label: "Parking", value: "4 cars" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
