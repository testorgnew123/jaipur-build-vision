import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { getPackage, packages } from "@/data/packages";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  Hammer,
  Layers,
  MessageCircle,
  PencilRuler,
  ShieldCheck,
  Star,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { OG_IMAGE, SITE_URL, packageSchema } from "@/lib/schema";

export const Route = createFileRoute("/packages_/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.pkg;
    const canonical = `${SITE_URL}/packages/${params.slug}`;
    if (!p) {
      return { meta: [{ title: "Package — SingleStop" }], links: [{ rel: "canonical", href: canonical }] };
    }
    const title = `${p.name} — ${p.price} ${p.unit} | SingleStop`;
    const description = p.desc.slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            packageSchema({
              name: p.name,
              description: p.desc,
              price: p.price,
              unit: p.unit,
              slug: p.slug,
            }),
          ),
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
        <h1 className="font-display text-5xl font-bold">Package not found</h1>
        <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/pricing">Browse all packages</Link>
        </Button>
      </div>
    </div>
  ),
  component: PackageDetail,
});

const sectionIcon = (title: string) => {
  if (title === "Planning") return PencilRuler;
  if (title === "PMC") return ClipboardCheck;
  return Hammer;
};

function PackageDetail() {
  const { pkg: p } = Route.useLoaderData();
  const others = packages.filter((x) => x.slug !== p.slug);
  const hasSpec = p.sections.length > 0;
  const prefersReduced = useReducedMotion();

  const totalItems = useMemo(
    () => p.sections.reduce((a, s) => a + s.rows.length, 0),
    [p.sections],
  );

  const navItems = useMemo(() => {
    const items: { id: string; label: string }[] = [{ id: "overview", label: "Overview" }];
    p.sections.forEach((s) => items.push({ id: s.title.toLowerCase(), label: s.title }));
    if (p.notes.length) items.push({ id: "charges", label: "Charges" });
    return items;
  }, [p.sections, p.notes.length]);

  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      setActive(id);
    }
  };

  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.4, delay },
        };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-ink text-white pt-28 lg:pt-36 pb-14">
        <div className="pointer-events-none absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative container-px mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/50">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/pricing" className="hover:text-gold transition-colors">Packages</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{p.name}</span>
          </nav>

          {p.highlight && (
            <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-gradient-gold text-ink px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-gold">
              <Star className="w-3 h-3 fill-current" /> Most Popular
            </div>
          )}

          <h1 className="mt-4 font-display text-4xl lg:text-6xl font-bold tracking-tight">{p.name}</h1>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl lg:text-5xl font-bold text-gold">{p.price}</span>
            <span className="text-sm text-white/60">{p.unit}</span>
          </div>

          <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">{p.desc}</p>

          {/* Stat pills */}
          <div className="mt-7 flex flex-wrap gap-3">
            {[
              { icon: Check, label: `${p.features.length} key inclusions` },
              ...(hasSpec ? [{ icon: Hammer, label: `${totalItems} spec items` }] : []),
              { icon: ShieldCheck, label: "10-yr structural warranty" },
            ].map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-sm text-white/85 backdrop-blur-sm"
              >
                <s.icon className="w-4 h-4 text-gold" /> {s.label}
              </span>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
              <Link to="/contact">Choose {p.name}</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <a href={buildWhatsAppUrl("pricing")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky section nav */}
      <div className="sticky top-16 lg:top-20 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="container-px mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  active === it.id
                    ? "bg-gold text-gold-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="py-12 lg:py-16">
        <div className="container-px mx-auto max-w-6xl grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview / What's included */}
            <motion.div
              id="overview"
              className="scroll-mt-32 lg:scroll-mt-40 rounded-2xl border border-border bg-card shadow-soft p-6 lg:p-8"
              {...reveal()}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-gold-soft text-gold">
                  <Layers className="w-5 h-5" />
                </span>
                <h2 className="font-display text-xl lg:text-2xl font-bold">What's included</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {p.features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft text-foreground px-3.5 py-2 text-sm font-medium"
                  >
                    <Check className="w-4 h-4 text-gold shrink-0" /> {f}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Full specification */}
            {hasSpec ? (
              p.sections.map((sec, i) => {
                const Icon = sectionIcon(sec.title);
                return (
                  <motion.section
                    key={sec.title}
                    id={sec.title.toLowerCase()}
                    className="scroll-mt-32 lg:scroll-mt-40 rounded-2xl border border-border bg-card shadow-soft hover:shadow-elegant transition-shadow duration-300 overflow-hidden"
                    {...reveal()}
                  >
                    <header className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 lg:px-7 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-gold text-white shadow-gold">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold">
                            Part {String.fromCharCode(65 + i)}
                          </p>
                          <h2 className="font-display text-lg lg:text-xl font-bold leading-tight">{sec.title}</h2>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full bg-background border border-border text-muted-foreground px-2.5 py-0.5 text-xs font-medium">
                        {sec.rows.length} {sec.rows.length === 1 ? "item" : "items"}
                      </span>
                    </header>

                    <div className="p-2.5 lg:p-4 divide-y divide-border/60">
                      {sec.rows.map((row, ri) => (
                        <div
                          key={row.label}
                          className="group flex gap-3 rounded-xl px-2.5 py-3 hover:bg-muted/50 transition-colors"
                        >
                          <span className="shrink-0 mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-gold-soft text-gold text-xs font-bold tabular-nums">
                            {ri + 1}
                          </span>
                          <div className="flex-1 grid sm:grid-cols-[170px_1fr] gap-0.5 sm:gap-4">
                            <div className="text-sm font-semibold text-foreground">{row.label}</div>
                            <div className="text-sm text-muted-foreground leading-relaxed">
                              {row.detail}
                              {row.sub && (
                                <div className="mt-3 rounded-xl border border-border bg-muted/40 p-3 space-y-2">
                                  {row.sub.map((s) => (
                                    <div key={s.label} className="grid sm:grid-cols-[130px_1fr] gap-0.5 sm:gap-3">
                                      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {s.label}
                                      </div>
                                      <div className="text-xs text-muted-foreground leading-relaxed">{s.detail}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
                <p className="text-muted-foreground">
                  Detailed material breakdown coming soon — talk to us for the full BOQ.
                </p>
                <Button asChild className="mt-4 bg-ink text-white hover:bg-ink/90 font-semibold">
                  <a href={buildWhatsAppUrl("pricing")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 w-4 h-4" /> Request full breakdown
                  </a>
                </Button>
              </div>
            )}

            {/* Charges / Notes */}
            {p.notes.length > 0 && (
              <motion.div
                id="charges"
                className="scroll-mt-32 lg:scroll-mt-40 rounded-2xl bg-gold-soft border border-gold/20 border-l-4 border-l-gold p-6"
                {...reveal()}
              >
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <AlertCircle className="w-5 h-5 text-gold" /> Additional charges
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {p.notes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-gold shrink-0" /> {n}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-36 self-start">
            <div className="rounded-2xl bg-ink text-white p-6 shadow-elegant">
              <div className="text-xs text-white/50 uppercase tracking-wider">Starting at</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold text-gold">{p.price}</span>
                <span className="text-sm text-white/60">{p.unit}</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm text-white/80">
                {["Design, materials & labour", "On-site supervision", "10-year structural warranty"].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-gold shrink-0" /> {t}
                  </li>
                ))}
              </ul>

              <Button asChild className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                <Link to="/contact">Choose {p.name}</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                <a href={buildWhatsAppUrl("pricing")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-4 h-4" /> Discuss on WhatsApp
                </a>
              </Button>

              <Link
                to="/pricing"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-gold hover:gap-2 transition-all"
              >
                Compare all packages <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="mt-4 pt-4 border-t border-white/10 text-xs text-white/45 leading-relaxed">
                Indicative for Jaipur municipal limits. Final quote depends on plot, design & finishes.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Other packages */}
      {others.length > 0 && (
        <section className="py-12 lg:py-20 border-t border-border bg-muted/30">
          <div className="container-px mx-auto max-w-6xl">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">Compare other packages</h2>
            <p className="mt-2 text-muted-foreground">Explore the full range and find your fit.</p>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/packages/$slug"
                  params={{ slug: o.slug }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:border-gold/50 hover:-translate-y-1 transition-all duration-200 motion-reduce:transform-none"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{o.name}</h3>
                    {o.highlight && <Star className="w-4 h-4 text-gold fill-current" />}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold">
                    {o.price}
                    <span className="text-xs text-muted-foreground font-sans font-normal"> {o.unit}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{o.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
                    View details <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
