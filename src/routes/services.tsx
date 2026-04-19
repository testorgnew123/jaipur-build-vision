import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Compass, Home, Building2, Hammer, Sofa, Trees, HardHat, Activity } from "lucide-react";
import { PricingPackages } from "@/components/home/PricingPackages";
import { CTABand } from "@/components/home/CTABand";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services in Jaipur — SingleStop" },
      { name: "description", content: "Architectural design, residential and commercial construction, renovation, interiors, landscaping and live project tracking — Jaipur." },
      { property: "og:title", content: "SingleStop Services" },
      { property: "og:description", content: "Eight services. One trusted partner." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Compass, title: "Architectural Design", desc: "Bespoke 3D design, BOQ, structural drawings and full statutory documentation. Vastu-compliant by default.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80" },
  { icon: Home, title: "Residential Construction", desc: "Turnkey villas, duplexes and apartments — from foundation to handover with locked timelines.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" },
  { icon: Building2, title: "Commercial Construction", desc: "Offices, retail, mixed-use towers — IGBC-ready Grade-A construction at scale.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80" },
  { icon: Hammer, title: "Renovation & Restoration", desc: "Heritage bungalows and modern apartments. Structural retrofit, modernisation, full facelifts.", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" },
  { icon: Sofa, title: "Interior Design", desc: "Custom millwork, lighting, modular kitchens, premium veneers and integrated automation.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80" },
  { icon: Trees, title: "Landscape & Pools", desc: "Outdoor architecture: pools, gardens, gazebos, terrace farms, hardscaping.", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80" },
  { icon: HardHat, title: "Project Management", desc: "Senior PM on every site. Daily reports, safety protocols, milestone tracking.", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80" },
  { icon: Activity, title: "Live Site Tracking", desc: "Industry-first dashboard: progress, billing, photos, materials — 24/7 visibility.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" },
];

function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Services</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Eight services. <span className="text-gold">One partner.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            Every discipline you need to build, renovate, or interior — under one accountable roof.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl space-y-16">
          {services.map((s, i) => (
            <div key={s.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold text-gold-foreground grid place-items-center">
                  <s.icon className="w-6 h-6" />
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <Button asChild className="mt-5 bg-gold text-gold-foreground hover:bg-gold/90">
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
