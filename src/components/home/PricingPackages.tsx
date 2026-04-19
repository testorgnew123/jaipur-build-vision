import { Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Essential",
    price: "₹ 1,650",
    unit: "per sq.ft",
    desc: "Civil shell + standard finishing for thoughtful homes.",
    features: [
      "RCC structure (M25 grade)",
      "Standard ceramic tiles",
      "Asian / Berger paints",
      "Branded sanitary fittings",
      "Basic electrical layout",
      "8-month timeline",
    ],
    highlight: false,
  },
  {
    name: "Signature",
    price: "₹ 2,450",
    unit: "per sq.ft",
    desc: "Our most popular package. Premium finishes + smart features.",
    features: [
      "Designer Italian tiles",
      "Royale / Apex paints",
      "Modular kitchen included",
      "False ceiling + cove lighting",
      "Branded CP & sanitary",
      "Smart switches included",
      "10-month timeline",
    ],
    highlight: true,
  },
  {
    name: "Luxe",
    price: "₹ 3,800",
    unit: "per sq.ft",
    desc: "Turnkey luxury with imported finishes and full automation.",
    features: [
      "Imported marble flooring",
      "Premium veneer doors",
      "Designer interior package",
      "Full home automation (Lutron)",
      "Imported CP fittings",
      "Landscape + pool ready",
      "12-month timeline",
    ],
    highlight: false,
  },
];

export function PricingPackages() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Pricing</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Transparent packages. <span className="text-gold">Zero surprises.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            All prices include design, materials, labour, supervision and 10-year structural warranty.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-7 lg:p-8 border transition-all ${
                t.highlight
                  ? "bg-ink text-white border-gold shadow-elegant lg:-translate-y-2"
                  : "bg-card border-border hover:border-gold/50"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-gold text-ink text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}
              <h3 className={`font-display text-2xl font-bold ${t.highlight ? "text-gold" : ""}`}>
                {t.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className={`text-sm ${t.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  {t.unit}
                </span>
              </div>
              <p className={`mt-2 text-sm ${t.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                {t.desc}
              </p>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.highlight ? "text-gold" : "text-gold"}`} />
                    <span className={t.highlight ? "text-white/85" : "text-foreground/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`mt-7 w-full font-semibold ${
                  t.highlight
                    ? "bg-gold text-gold-foreground hover:bg-gold/90"
                    : "bg-ink text-white hover:bg-ink/90"
                }`}
              >
                <Link to="/contact">Choose {t.name}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          * Prices indicative for Jaipur municipal limits. Final quote depends on plot, design and finishes.
        </p>
      </div>
    </section>
  );
}
