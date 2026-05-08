import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const services = [
  {
    title: "Planning & Architecture",
    desc: "Bespoke 3D design, structural drawings, Vastu compliance and full project management — all under one roof.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Residential Construction",
    desc: "Turnkey villas and duplexes built to last — transparent pricing, locked timelines.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial Construction",
    desc: "Offices, retail, mixed-use towers — IGBC-ready Grade-A construction at scale.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Interior Design",
    desc: "Custom millwork, lighting, modular kitchens, premium veneers and smart automation.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Landscape & Pools",
    desc: "Outdoor architecture — pools, gardens, gazebos, terrace farms and hardscaping.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Live Site Tracking",
    desc: "Industry-first dashboard: real-time progress, billing, photos and materials — 24/7 visibility.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">What we do</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Six services. <span className="text-gold">One partner.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the first sketch to the final handover, SingleStop delivers everything in-house —
            so you talk to one team, not ten vendors.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
            >
              <Link
                to="/services"
                className="group block h-full rounded-2xl bg-card border border-border hover:border-gold hover:shadow-elegant transition-all overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="mt-4 inline-block text-xs font-semibold text-gold">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
