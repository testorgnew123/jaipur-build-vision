import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { MapPin, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — SingleStop Jaipur" },
      { name: "description", content: "Browse SingleStop's portfolio of villas, residences, commercial towers and renovation projects across Jaipur." },
      { property: "og:title", content: "SingleStop Projects" },
      { property: "og:description", content: "Premium villas, residences and commercial projects in Jaipur." },
      { property: "og:image", content: projects[0].cover },
    ],
  }),
  component: ProjectsPage,
});

const filters = ["All", "Villa", "Residential", "Commercial", "Renovation", "Interior"] as const;

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Portfolio</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Our <span className="text-gold">work.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            Hand-picked projects from the SingleStop portfolio across Jaipur.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                  filter === f ? "bg-ink text-white" : "bg-background border border-border hover:border-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block relative overflow-hidden rounded-2xl aspect-[4/5] shadow-soft hover:shadow-elegant transition-shadow"
              >
                <img src={p.cover} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-ink text-[10px] font-bold uppercase tracking-wider">{p.type}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.status === "Completed" ? "bg-gold text-gold-foreground" : "bg-white/20 text-white border border-white/30"}`}>{p.status}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display font-bold text-lg leading-tight">{p.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-white/70">{p.area} · {p.budget}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-gold">View <ArrowUpRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
