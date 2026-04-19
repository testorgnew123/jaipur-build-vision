import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Target, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FounderTeam } from "@/components/home/FounderTeam";
import { TrustLogos } from "@/components/home/TrustLogos";

const heroImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SingleStop — Jaipur's Premium Construction Brand" },
      { name: "description", content: "Founded in Jaipur. Built on trust. Meet the architects, engineers and designers behind SingleStop's 100+ projects." },
      { property: "og:title", content: "About SingleStop" },
      { property: "og:description", content: "Founded in Jaipur. Built on trust." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "Transparency", desc: "Locked pricing, line-by-line quotes, no hidden charges." },
  { icon: Award, title: "Craft", desc: "Premium materials, senior PMs, meticulous finishing." },
  { icon: Heart, title: "Care", desc: "We treat every site like our own family home." },
  { icon: Target, title: "On Time", desc: "98% on-time handover with penalty clauses." },
  { icon: Users, title: "One Team", desc: "Architects, engineers, designers — all in-house." },
  { icon: Sparkles, title: "Innovation", desc: "Live dashboards, drone tracking, smart automation." },
];

function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ink text-white overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="relative container-px mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Story</p>
          <h1 className="mt-4 font-display text-4xl lg:text-7xl font-bold tracking-tight">
            Building Jaipur's <br /><span className="text-gold">future homes.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/75">
            SingleStop was founded in 2017 with a simple belief: construction in India deserves the
            same transparency, craft and accountability as luxury automobiles. Eight years and 100+
            projects later, we're Jaipur's most trusted name in premium building.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Mission</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              To make premium construction <span className="text-gold">predictable.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              For too long, building a home in India meant chasing contractors, fighting cost overruns,
              and accepting delays as inevitable. We're rebuilding the experience from the ground up:
              transparent pricing, in-house teams, live tracking, and on-time delivery — every single time.
            </p>
            <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/contact">Work with us</Link>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
              alt="SingleStop team reviewing plans"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Values</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              What we stand for.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-background border border-border p-6 hover:border-gold/40 hover:shadow-soft transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-soft text-gold grid place-items-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderTeam />
      <TrustLogos />
    </>
  );
}
