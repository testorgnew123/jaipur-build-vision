import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/packages";

export function PricingPackages() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Pricing</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Four packages. <span className="text-gold">Zero surprises.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            All prices include design, materials, labour, supervision and 10-year structural warranty.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-6 lg:p-7 border transition-all ${
                p.highlight
                  ? "bg-ink text-white border-gold shadow-elegant lg:-translate-y-2"
                  : "bg-card border-border hover:border-gold/50"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-gold text-ink text-xs font-bold tracking-wider uppercase flex items-center gap-1 whitespace-nowrap">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}
              <h3 className={`font-display text-xl font-bold ${p.highlight ? "text-gold" : ""}`}>
                {p.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">{p.price}</span>
                <span className={`text-xs ${p.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  {p.unit}
                </span>
              </div>
              <p className={`mt-2 text-xs leading-relaxed ${p.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                {p.desc}
              </p>

              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                    <span className={p.highlight ? "text-white/85" : "text-foreground/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/packages/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:gap-2 transition-all"
              >
                View full details <ArrowRight className="w-4 h-4" />
              </Link>

              <Button
                asChild
                className={`mt-4 w-full font-semibold text-sm ${
                  p.highlight
                    ? "bg-gold text-gold-foreground hover:bg-gold/90"
                    : "bg-ink text-white hover:bg-ink/90"
                }`}
              >
                <Link to="/contact">Choose {p.name}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          * Prices indicative for Jaipur municipal limits. Final quote depends on plot, design and finishes.
        </p>
      </div>
    </section>
  );
}
