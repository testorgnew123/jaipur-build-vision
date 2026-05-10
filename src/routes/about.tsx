import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Target, Heart, ShieldCheck, Sparkles, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Single Stop Building Solutions Pvt Ltd - Jaipur Construction Brand" },
      {
        name: "description",
        content:
          "The story, mission and vision behind Single Stop Building Solutions Pvt Ltd, an end-to-end building solutions company in Jaipur.",
      },
      { property: "og:title", content: "About Single Stop Building Solutions Pvt Ltd" },
      { property: "og:description", content: "One place for complete building solutions." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "Transparency", desc: "Clear scope, practical guidance, and honest communication." },
  { icon: Award, title: "Quality", desc: "Premium materials, senior supervision, and careful finishing." },
  { icon: Heart, title: "Care", desc: "We treat every site like a family project, not a transaction." },
  { icon: Target, title: "Accountability", desc: "One team responsible for coordination, quality, and progress." },
  { icon: Users, title: "One Team", desc: "Architects, engineers, contractors, and consultants working together." },
  { icon: Sparkles, title: "Support", desc: "After-service support for issues like seepage, cracks, and maintenance." },
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
            One place for <br /><span className="text-gold">complete building solutions.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/75">
            Single Stop Building Solutions Pvt Ltd was created to make construction more
            transparent, accountable, coordinated, and stress-free for clients.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Mission</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              To protect clients from the <span className="text-gold">unorganized construction sector.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We believe clients deserve a smooth construction experience where planning,
              execution, coordination, and after-service support are handled by one professional
              team. From the first design discussion to support for issues like seepage, cracks,
              and maintenance, our role is to bring clarity and confidence to every stage.
            </p>
            <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/contact">Work with us</Link>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
              alt="Single Stop Building Solutions Pvt Ltd team reviewing plans"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
              alt="Jaipur skyline future vision"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our Vision</p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              Building should bring <span className="text-gold">confidence, not confusion.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our vision is a construction system where one professional team manages planning,
              execution, coordination, quality, and after-service support with transparency and
              accountability. We want every client to feel protected from unnecessary stress,
              unclear material decisions, and disconnected vendors.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "2020", label: "Founded" },
                { value: "4.9", label: "Rating" },
                { value: "33", label: "Reviews" },
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

      <section className="relative py-24 lg:py-36 overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/70" />
        <div className="relative container-px mx-auto max-w-6xl">
          <div className="text-center mb-14 lg:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Force Behind The Story</p>
            <h2 className="mt-4 font-display text-3xl lg:text-5xl font-bold tracking-tight">
              Why we do what we <span className="text-gold">do.</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-sm lg:text-base text-white/65 leading-relaxed">
              The story behind Single Stop is personal. It started with one family's painful
              construction experience and a simple belief: building should never feel this hard.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 lg:p-10">
                <Quote className="absolute -top-5 left-8 w-10 h-10 text-gold bg-ink rounded-full p-2 border border-gold/40" />
                <blockquote className="font-display text-xl lg:text-2xl font-semibold leading-relaxed text-white/95">
                  During my engineering days, I watched my father step away from his business
                  because our family home construction became stressful, unorganized, and full of
                  coordination problems.
                  <span className="block mt-4 text-gold">
                    That moment made me believe there had to be a better way.
                  </span>
                </blockquote>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 shrink-0 ring-2 ring-gold/40">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      alt="Neeraj Singhal, Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg text-white">Neeraj Singhal</div>
                    <div className="mt-0.5 text-xs text-gold tracking-wider uppercase">
                      Founder &amp; CEO
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {[
                {
                  label: "The Problem",
                  body: "Contractors called at odd hours for materials. Plumbers and electricians delayed work or stopped answering. Suppliers pushed unnecessary items. Coordination between teams was missing.",
                },
                {
                  label: "The Insight",
                  body: "Watching someone who guided others in business struggle through a disorganized build made one thing clear — clients needed a single accountable partner, not a chain of vendors.",
                },
                {
                  label: "The Solution",
                  body: "Single Stop is an end-to-end project management solution built around transparency, accountability, quality, and proper coordination — from first design to final handover.",
                },
              ].map((item) => (
                <div key={item.label} className="relative pl-5 border-l-2 border-gold/40">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm lg:text-base text-white/75 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
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
