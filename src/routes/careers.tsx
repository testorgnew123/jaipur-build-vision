import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, ArrowRight, Zap, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface Job {
  id: number;
  title: string;
  type: string;
  experience: string;
  location: string;
  description: string;
  skills: string[];
  is_active: boolean;
}

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at SingleStop — Build Jaipur's Future With Us" },
      { name: "description", content: "Join SingleStop — Jaipur's premium construction company. Open roles for architects, site engineers, interior designers, and more." },
      { property: "og:title", content: "Careers at SingleStop" },
      { property: "og:description", content: "Be part of Jaipur's most trusted construction team." },
    ],
  }),
  component: CareersPage,
});

const perks = [
  {
    icon: TrendingUp,
    title: "Grow Fast",
    desc: "We're scaling quickly — top performers get promoted, not sidelined.",
  },
  {
    icon: Zap,
    title: "Ownership",
    desc: "You'll own your projects end-to-end. No micromanagement.",
  },
  {
    icon: Star,
    title: "Real Impact",
    desc: "Every home you help build is a family's dream come true.",
  },
];

const heroImg = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80";

function CareersPage() {
  const waBase = buildWhatsAppUrl("contact");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Job[]) => setJobs(Array.isArray(data) ? data : []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  function applyUrl(role: string) {
    return waBase + encodeURIComponent(`\nI'd like to apply for the ${role} position at SingleStop.`);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ink text-white overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
        <div className="relative container-px mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">We're Hiring</p>
          <h1 className="mt-4 font-display text-4xl lg:text-7xl font-bold tracking-tight">
            Build with <span className="text-gold">us.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-white/70 text-lg">
            Join Jaipur's most trusted construction team. We move fast, care deeply,
            and build things that last.
          </p>
          <a
            href="#open-roles"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-gold-foreground font-semibold hover:bg-gold/90 transition-colors"
          >
            See Open Roles <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Culture / Perks */}
      <section className="py-16 lg:py-24 bg-muted/40 border-b border-border">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Why SingleStop</p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold tracking-tight">
              A team that builds <span className="text-gold">careers, not just homes.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl bg-background border border-border p-7 text-center hover:border-gold/40 hover:shadow-soft transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold-soft text-gold grid place-items-center mx-auto">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Open Positions</p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold tracking-tight">
              Current openings
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              All roles are based in Jaipur, Rajasthan. Competitive salary + performance incentives.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-sm text-muted-foreground">Loading roles…</p>
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-8 text-center">
              <p className="font-display text-lg font-bold">No open roles right now</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We're always interested in talented people. Send your CV and we'll be in touch.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {jobs.map((j) => (
                <div
                  key={j.id}
                  className="rounded-2xl bg-card border border-border p-6 lg:p-8 hover:border-gold/50 hover:shadow-elegant transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-gold-soft text-gold text-xs font-semibold">
                          {j.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {j.experience}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {j.location}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold">{j.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{j.description}</p>
                      {Array.isArray(j.skills) && j.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {j.skills.map((skill) => (
                            <span key={skill} className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground/80">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0">
                      <Button
                        asChild
                        className="w-full sm:w-auto bg-ink text-white hover:bg-ink/90 h-11 px-6"
                      >
                        <a href={applyUrl(j.title)} target="_blank" rel="noopener noreferrer">
                          Apply via WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-muted/60 border border-border p-7 text-center">
            <p className="font-display text-lg font-bold">Don't see your role?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We're always looking for talented people. Send us your CV on WhatsApp.
            </p>
            <Button
              asChild
              className="mt-4 bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <a href={buildWhatsAppUrl("contact")} target="_blank" rel="noopener noreferrer">
                Send Your CV
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
