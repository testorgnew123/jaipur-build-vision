import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PricingPackages } from "@/components/home/PricingPackages";
import { CTABand } from "@/components/home/CTABand";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services in Jaipur - Single Stop Building Solutions Pvt Ltd" },
      {
        name: "description",
        content:
          "Planning, turnkey construction, PMC, interiors and finishing by Single Stop Building Solutions Pvt Ltd in Jaipur.",
      },
      { property: "og:title", content: "Single Stop Building Solutions Pvt Ltd Services" },
      { property: "og:description", content: "Four services. One trusted partner." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Planning (Architectural & Structural)",
    desc: "Architectural concepts, space planning, structural drawings, BOQ support, and build-ready documentation prepared with practical site execution in mind.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    tags: ["Architecture", "Structure", "BOQ", "Planning"],
  },
  {
    title: "Construction (Residential & Commercial) Turnkey",
    desc: "Turnkey residential and commercial construction from foundation to handover, coordinated by one team for quality, timelines, and site discipline.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    tags: ["Residential", "Commercial", "Turnkey", "Execution"],
  },
  {
    title: "PMC (Project Management Consultancy)",
    desc: "Project management consultancy for planning, vendor coordination, quality monitoring, progress reporting, and milestone control.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    tags: ["Coordination", "Quality Checks", "Scheduling", "Reporting"],
  },
  {
    title: "Interior & Finishing",
    desc: "Interior detailing, finishing materials, fixtures, lighting, modular work, and final handover coordination for complete spaces.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    tags: ["Interiors", "Finishing", "Lighting", "Fixtures"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Services</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Four services. <span className="text-gold">One partner.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            Every discipline you need to plan, build, manage, and finish your project under one
            accountable roof.
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
      <CTABand
        title="Not sure which service fits?"
        subtitle="Talk to our team and we will guide you."
        primaryLabel="Get Free Consultation"
      />
    </>
  );
}
