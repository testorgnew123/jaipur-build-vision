import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OG_IMAGE } from "@/lib/schema";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  published_at: string;
  reading_time: string;
  tags: string[];
}

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Construction Blog - Single Stop Building Solutions Pvt Ltd Jaipur" },
      { name: "description", content: "Insights on construction costs, design, Vastu, NRI building, materials and more — from Jaipur's premium builder." },
      { property: "og:title", content: "Single Stop Building Solutions Pvt Ltd Blog" },
      { property: "og:description", content: "Construction insights from Jaipur's premium builder." },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://singlestop.co.in/blog" }],
  }),
  loader: async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) return { posts: [] as Post[] };
      const ct = res.headers.get("content-type") ?? "";
      if (!ct.includes("application/json")) return { posts: [] as Post[] };
      const data = await res.json();
      return { posts: Array.isArray(data) ? (data as Post[]) : [] };
    } catch {
      return { posts: [] as Post[] };
    }
  },
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Insights</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            The Single Stop <span className="text-gold">journal.</span>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="text-center max-w-md mx-auto py-12 lg:py-16">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft text-gold grid place-items-center mx-auto">
                <Newspaper className="w-8 h-8" />
              </div>
              <h2 className="mt-5 font-display text-2xl lg:text-3xl font-bold">Articles coming soon</h2>
              <p className="mt-3 text-muted-foreground">
                We're putting together helpful guides on construction costs, design, Vastu and more.
                Check back shortly.
              </p>
              <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
          ) : (
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
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.reading_time}</span>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
