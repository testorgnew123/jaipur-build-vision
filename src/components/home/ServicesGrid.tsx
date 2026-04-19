import { motion } from "framer-motion";
import {
  Compass,
  Home,
  Building2,
  Hammer,
  Sofa,
  Trees,
  HardHat,
  Activity,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  { icon: Compass, title: "Architectural Design", desc: "Bespoke design that blends Jaipur heritage with modern living." },
  { icon: Home, title: "Residential Construction", desc: "Turnkey homes built to last — transparent and on time." },
  { icon: Building2, title: "Commercial Projects", desc: "Offices, retail, towers — engineered for scale." },
  { icon: Hammer, title: "Renovation & Restoration", desc: "Heritage and modern renovation done right." },
  { icon: Sofa, title: "Interior Design", desc: "Custom millwork, lighting, and finishing." },
  { icon: Trees, title: "Landscape Architecture", desc: "Outdoor spaces that elevate your build." },
  { icon: HardHat, title: "Project Management", desc: "Senior PMs on every site, every day." },
  { icon: Activity, title: "Live Tracking Dashboard", desc: "Real-time progress, billing, and photos." },
];

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">What we do</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Eight services. <span className="text-gold">One partner.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the first sketch to the final handover, SingleStop delivers everything in-house —
            so you talk to one team, not ten vendors.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            >
              <Link
                to="/services"
                className="group block h-full p-6 rounded-2xl bg-card border border-border hover:border-gold hover:shadow-elegant transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-soft text-gold grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-gold">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
