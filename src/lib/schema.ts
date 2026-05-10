import { reviews, aggregateRating } from "@/data/reviews";

const SITE_URL = "https://singlestop.co.in";
const PHONE = "+91-94627-23134";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Single Stop Building Solutions Pvt Ltd",
  image: `${SITE_URL}/og-cover.jpg`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: PHONE,
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "MNIT Innovation and Incubation Center, MNIT Campus, Mansarovar",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302020",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 26.83970737659342, longitude: 75.74023611162876 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.instagram.com/singlestop",
    "https://www.facebook.com/singlestop",
    "https://www.linkedin.com/company/single-stop-building-solutions-pvt-ltd",
    "https://share.google/6YgEo5rHtYl0JexCO",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: aggregateRating.rating,
    reviewCount: aggregateRating.count,
  },
  review: reviews.slice(0, 5).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Single Stop Building Solutions Pvt Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Single Stop Building Solutions Pvt Ltd",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function projectSchema(p: {
  title: string;
  description: string;
  image: string;
  location: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    image: p.image,
    creator: { "@type": "Organization", name: "Single Stop Building Solutions Pvt Ltd" },
    locationCreated: { "@type": "Place", name: p.location },
    url: `${SITE_URL}/projects/${p.slug}`,
  };
}

export function articleSchema(p: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedAt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    image: p.image,
    author: { "@type": "Person", name: p.author },
    publisher: {
      "@type": "Organization",
      name: "Single Stop Building Solutions Pvt Ltd",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: p.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
  };
}
