import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PricingPackages } from "@/components/home/PricingPackages";
import { CTABand } from "@/components/home/CTABand";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services in Jaipur — SingleStop" },
      { name: "description", content: "Architectural design, residential and commercial construction, interiors, landscaping and live project tracking — Jaipur's most trusted single partner." },
      { property: "og:title", content: "SingleStop Services" },
      { property: "og:description", content: "Six services. One trusted partner." },
    ],
    links: [{ rel: "canonical", href: "https://singlestop.co.in/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Planning & Architecture",
    desc: "Bespoke 3D design, BOQ, structural drawings and full statutory documentation. Vastu-compliant by default. Our senior architects handle everything from concept to municipal approval — so you never chase paperwork.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    tags: ["3D Design", "Vastu", "BOQ", "Approvals", "Project Management"],
  },
  {
    title: "Residential Construction",
    desc: "Turnkey villas and duplexes — from foundation to handover with locked timelines and transparent pricing. We work exclusively on residential plots. We do not build apartments.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    tags: ["Villas", "Duplexes", "Bungalows", "Plots only"],
  },
  {
    title: "Commercial Construction",
    desc: "Offices, retail, mixed-use towers — IGBC-ready Grade-A construction at scale. Engineered for performance and designed to impress.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    tags: ["Offices", "Retail", "Mixed-use", "IGBC"],
  },
  {
    title: "Interior Design",
    desc: "Custom millwork, lighting, modular kitchens, premium veneers and integrated automation. Every detail handled by our in-house design team.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    tags: ["Modular Kitchen", "Lighting", "Automation", "Millwork"],
  },
  {
    title: "Landscape & Pools",
    desc: "Outdoor architecture: pools, gardens, gazebos, terrace farms, hardscaping. We turn your outdoor space into an extension of your home.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
    tags: ["Pools", "Gardens", "Gazebos", "Terrace Farms"],
  },
  {
    title: "Live Site Tracking",
    desc: "Industry-first dashboard: progress updates, billing transparency, site photos, and materials log — 24/7 visibility so you're always in control, no matter where you are.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    tags: ["Real-time Updates", "Billing", "Photos", "NRI Friendly"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Services</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Six services. <span className="text-gold">One partner.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            Every discipline you need to build or design your home — under one accountable roof.
            We work on residential plots only; we do not take renovation or apartment projects.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl space-y-16 lg:space-y-24">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gold-soft text-gold text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to="/contact">Discuss this service</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PricingPackages />
      <CTABand title="Not sure which service fits?" subtitle="Talk to our team — we'll guide you." primaryLabel="Get Free Consultation" />
    </>
  );
}
