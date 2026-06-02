import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Target, Heart, ShieldCheck, Sparkles, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SingleStop — Jaipur's Premium Construction Brand" },
      { name: "description", content: "Founded in Jaipur. Built on trust. Meet the story and mission behind SingleStop's 100+ projects." },
      { property: "og:title", content: "About SingleStop" },
      { property: "og:description", content: "Founded in Jaipur. Built on trust." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://singlestop.co.in/about" }],
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
      {/* Hero */}
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

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Mission</p>
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

      {/* Vision */}
      <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
              alt="Jaipur skyline — future vision"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Vision</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              Redefining Jaipur's <span className="text-gold">skyline, one home at a time.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We envision a Jaipur where every family — whether building a modest home or a grand villa —
              has access to a trustworthy, end-to-end construction partner. A city where quality is the
              standard, not the exception. Where building your dream home is a joyful journey, not a
              stressful gamble.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "100+", label: "Homes Built" },
                { value: "8+", label: "Years in Jaipur" },
                { value: "98%", label: "On-time Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-background border border-border">
                  <div className="font-display text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Force Behind The Story */}
      <section className="relative py-24 lg:py-36 overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/70" />
        <div className="relative container-px mx-auto max-w-5xl">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Force Behind The Story</p>
            <h2 className="mt-4 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              Why we do what we <span className="text-gold">do.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 grid place-items-center mb-6">
                <Quote className="w-5 h-5 text-gold" />
              </div>
              <blockquote className="font-display text-xl lg:text-2xl font-bold leading-snug text-white/90">
                "I watched my father spend three years and twice his budget building our family home —
                chasing contractors who never showed up and getting bills that kept changing.
                I promised myself I would fix that experience for every family in Jaipur."
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-white">Rohit Sharma</div>
                  <div className="text-xs text-gold tracking-wider uppercase">Founder, SingleStop</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { year: "2017", event: "Founded in Jaipur with 3 people and 1 project" },
                { year: "2019", event: "Crossed 25 homes — opened our first dedicated studio" },
                { year: "2022", event: "Launched live tracking dashboard, a first in Jaipur" },
                { year: "2024", event: "100+ homes delivered, 4.9★ average client rating" },
              ].map((item) => (
                <div
                  key={item.year}
                  className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-gold/30 transition-all"
                >
                  <div className="font-display text-2xl font-bold text-gold">{item.year}</div>
                  <div className="mt-2 text-xs text-white/70 leading-relaxed">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Values</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              What we stand for.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </>
  );
}
