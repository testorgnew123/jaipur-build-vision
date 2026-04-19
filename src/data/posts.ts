export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  content: string; // HTML
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const posts: Post[] = [
  {
    slug: "construction-cost-jaipur-2025",
    title: "Construction Cost in Jaipur 2025: A Complete Breakdown",
    excerpt:
      "From civil shell to turnkey luxury — here's exactly what it costs to build per sq.ft in Jaipur this year.",
    cover: u("photo-1503387762-592deb58ef4e"),
    author: "Rohit Sharma",
    publishedAt: "2025-02-12",
    readingTime: "8 min read",
    tags: ["Costing", "Jaipur"],
    content: `<p>Building in Jaipur in 2025 typically ranges from ₹1,650/sq.ft (essential shell) to ₹3,800/sq.ft (luxury turnkey). The biggest variables are finishes, MEP grade, and site logistics.</p>
<h2>Civil shell</h2><p>Includes excavation, RCC, brickwork, plaster, basic plumbing and electrical conduiting.</p>
<h2>Finishing</h2><p>Tiles, paint, sanitary, doors, windows, false ceiling.</p>
<h2>Interior &amp; turnkey</h2><p>Modular kitchen, wardrobes, lighting, automation.</p>`,
  },
  {
    slug: "vastu-tips-modern-homes",
    title: "10 Vastu Tips for Modern Jaipur Homes",
    excerpt: "Practical Vastu principles that work seamlessly with contemporary architecture.",
    cover: u("photo-1600585154340-be6161a56a0c"),
    author: "Anjali Mehta",
    publishedAt: "2025-01-28",
    readingTime: "6 min read",
    tags: ["Design", "Vastu"],
    content: `<p>Modern architecture and Vastu can coexist. Orient the main entrance North/East, place the kitchen in the South-East, and avoid bedrooms directly above the garage.</p>`,
  },
  {
    slug: "nri-construction-guide",
    title: "NRI's Guide to Building a Home in Jaipur Remotely",
    excerpt: "Power of attorney, payments, live tracking, and quality control — all from abroad.",
    cover: u("photo-1582268611958-ebfd161ef9cf"),
    author: "Rohit Sharma",
    publishedAt: "2025-01-15",
    readingTime: "10 min read",
    tags: ["NRI", "Process"],
    content: `<p>Building remotely is straightforward when your contractor offers transparent live tracking, weekly drone footage, and a verifiable POA workflow.</p>`,
  },
  {
    slug: "choosing-the-right-marble",
    title: "Choosing the Right Marble for Indian Climate",
    excerpt: "Italian, Makrana, Onyx — what works, what doesn't, and what's worth the money.",
    cover: u("photo-1600210492486-724fe5c67fb0"),
    author: "Anjali Mehta",
    publishedAt: "2024-12-22",
    readingTime: "7 min read",
    tags: ["Materials"],
    content: `<p>Makrana white remains unbeatable for value. Italian Statuario delivers showpiece luxury but needs sealing every 3 years.</p>`,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
