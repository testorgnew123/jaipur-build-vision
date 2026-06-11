import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { packages } from "@/data/packages";

const rateOf = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;
const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const inrShort = (n: number) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return inr(n);
};

export function EstimateCalculator() {
  const [area, setArea] = useState("");
  const [slug, setSlug] = useState(packages[0].slug);

  const pkg = packages.find((p) => p.slug === slug) ?? packages[0];
  const rate = rateOf(pkg.price);
  const sqft = Math.max(0, Number(area) || 0);
  const total = sqft * rate;

  return (
    <div className="mt-10 text-left rounded-2xl border border-border bg-card shadow-soft p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="area">Built-up area (sq.ft)</Label>
          <Input
            id="area"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="e.g. 2000"
            value={area}
            onChange={(e) => setArea(e.currentTarget.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Package</Label>
          <div className="grid grid-cols-2 gap-2">
            {packages.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSlug(p.slug)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold text-left transition-colors cursor-pointer ${
                  p.slug === slug
                    ? "border-gold bg-gold-soft text-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-gold/50"
                }`}
              >
                {p.name.replace(" Villa", "")}
                <span className="block text-xs font-normal text-muted-foreground">{p.price} {p.unit}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-xl bg-ink text-white p-6 flex flex-col justify-center">
        <div className="text-xs uppercase tracking-wider text-white/50">Estimated cost</div>
        <div className="mt-1 font-display text-4xl lg:text-5xl font-bold text-gold leading-tight break-words">
          {sqft > 0 ? inrShort(total) : "—"}
        </div>
        <div className="mt-2 text-sm text-white/60 break-words">
          {sqft > 0
            ? `${inr(total)} · ${sqft.toLocaleString("en-IN")} sq.ft × ${pkg.price}/sq.ft`
            : "Enter your area to estimate"}
        </div>
        <Button asChild className="mt-5 w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
          <Link to="/contact">Get exact quote</Link>
        </Button>
        <p className="mt-3 text-xs text-white/45 leading-relaxed">
          Indicative only. Final quote depends on plot, design, soil and finishes.
        </p>
      </div>
    </div>
  );
}
