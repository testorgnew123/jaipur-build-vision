import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, MessageCircle, Calendar, IndianRupee, Ruler } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { projectSchema } from "@/lib/schema";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project — SingleStop" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — SingleStop Jaipur` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:image", content: p.cover },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(projectSchema({
            title: p.title, description: p.description, image: p.cover, location: p.location, slug: p.slug,
          })),
        },
      ],
    };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="text-center">
          <p className="text-destructive">{error.message}</p>
          <Button onClick={() => { router.invalidate(); reset(); }} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-5xl font-bold">Project not found</h1>
        <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/projects">Browse all projects</Link>
        </Button>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const related = projects.filter((x) => x.slug !== p.slug && x.type === p.type).slice(0, 3);

  return (
    <>
      <section className="relative pt-28 lg:pt-36 bg-ink text-white">
        <div className="container-px mx-auto max-w-7xl">
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-gold">
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
              <img src={p.gallery[0]} alt={p.title} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {p.gallery.slice(1, 4).map((g, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img src={g} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-ink text-white">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-gold text-gold-foreground text-xs font-bold uppercase tracking-wider">{p.type}</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">{p.status}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight">{p.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4 text-gold" /> {p.location}
            </div>
            <p className="mt-6 text-white/80 leading-relaxed">{p.description}</p>

            <h2 className="mt-10 font-display text-2xl font-bold">Highlights</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-white/80"><span className="text-gold">✓</span> {h}</li>
              ))}
            </ul>

            {p.quote && (
              <blockquote className="mt-10 p-6 rounded-2xl bg-white/5 border-l-4 border-gold">
                <p className="font-display italic text-lg">"{p.quote.text}"</p>
                <footer className="mt-3 text-sm text-gold">— {p.quote.author}</footer>
              </blockquote>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="grid grid-cols-2 gap-4">
                {p.specs.map((s) => (
                  <div key={s.label}>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
                    <div className="font-display font-bold text-lg mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div><Ruler className="w-4 h-4 mx-auto text-gold" /><div className="text-xs mt-1 text-white/70">{p.area}</div></div>
                <div><Calendar className="w-4 h-4 mx-auto text-gold" /><div className="text-xs mt-1 text-white/70">{p.timeline}</div></div>
                <div><IndianRupee className="w-4 h-4 mx-auto text-gold" /><div className="text-xs mt-1 text-white/70">{p.budget}</div></div>
              </div>
            </div>
            <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/contact">Build something similar</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
              <a href={buildWhatsAppUrl("project", p.title)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" /> Discuss on WhatsApp
              </a>
            </Button>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="container-px mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-bold mb-8">Related projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} to="/projects/$slug" params={{ slug: r.slug }} className="group block relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src={r.cover} alt={r.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="font-display font-bold text-lg">{r.title}</div>
                    <div className="text-xs text-white/70 mt-1">{r.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
