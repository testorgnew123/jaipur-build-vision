import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";
import { Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Construction Blog — SingleStop Jaipur" },
      { name: "description", content: "Insights on construction costs, design, Vastu, NRI building, materials and more — from Jaipur's premium builder." },
      { property: "og:title", content: "SingleStop Blog" },
      { property: "og:description", content: "Construction insights from Jaipur's premium builder." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Insights</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            The SingleStop <span className="text-gold">journal.</span>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant hover:border-gold/40 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-gold-soft text-gold text-[10px] font-bold uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                  <h2 className="font-display font-bold text-lg leading-snug group-hover:text-gold transition-colors">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readingTime}</span>
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
