import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 6);
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Portfolio</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              Featured <span className="text-gold">projects</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-sm font-semibold text-foreground hover:text-gold inline-flex items-center gap-1"
          >
            View all projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block relative overflow-hidden rounded-2xl bg-card aspect-[4/5] shadow-soft hover:shadow-elegant transition-shadow"
              >
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-ink text-[10px] font-bold tracking-wider uppercase">
                    {p.type}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display font-bold text-lg leading-tight">{p.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-white/70">{p.area} · {p.budget}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-gold">
                      View <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
