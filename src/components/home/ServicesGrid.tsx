import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const services = [
  {
    title: "Planning (Architectural & Structural)",
    desc: "Architectural planning, structural drawings, concept development, and build-ready documentation under one roof.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Construction (Residential & Commercial) Turnkey",
    desc: "Complete residential and commercial construction handled from foundation to handover by one accountable team.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "PMC (Project Management Consultancy)",
    desc: "Professional planning, coordination, quality checks, schedule control, and site reporting for smoother execution.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Interior & Finishing",
    desc: "Interior detailing, finishes, fixtures, lighting, and final-stage coordination for a polished handover.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">What we do</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Four services. <span className="text-gold">One partner.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the first sketch to the final handover, Single Stop Building Solutions Pvt Ltd
            delivers everything in-house so you talk to one team, not ten vendors.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
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
                    Learn more
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
