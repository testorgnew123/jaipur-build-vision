import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const slabs = [
  { name: "Basic", rate: 1890 },
  { name: "Standard", rate: 2090 },
  { name: "Premium", rate: 2249 },
  { name: "Luxury", rate: 2499 },
];

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(1)} Lakh`;
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export function PriceCalculator() {
  const [selectedSlab, setSelectedSlab] = useState(slabs[2]);
  const [area, setArea] = useState("");

  const areaNum = parseFloat(area);
  const isValid = !isNaN(areaNum) && areaNum > 0;
  const estimated = isValid ? areaNum * selectedSlab.rate : null;

  return (
    <section className="py-16 lg:py-24 bg-muted/40 border-y border-border">
      <div className="container-px mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-soft text-gold text-xs font-semibold tracking-wider uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" /> Quick Estimator
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
            Estimate your <span className="text-gold">build cost</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto">
            Select your slab and enter your build area for an instant ballpark estimate.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 lg:p-10">
          {/* Slab selector */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Choose your slab</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slabs.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelectedSlab(s)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    selectedSlab.name === s.name
                      ? "bg-ink text-white border-ink shadow-elegant"
                      : "bg-background border-border hover:border-gold text-foreground"
                  }`}
                >
                  <div className="font-display font-bold text-base">{s.name}</div>
                  <div className={`text-xs mt-0.5 ${selectedSlab.name === s.name ? "text-gold" : "text-muted-foreground"}`}>
                    ₹ {s.rate.toLocaleString("en-IN")}/sq.ft
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Area input */}
          <div className="mt-6">
            <Label htmlFor="calc-area" className="text-sm font-semibold mb-2 block">
              Built-up area (sq.ft)
            </Label>
            <Input
              id="calc-area"
              type="number"
              min="100"
              placeholder="e.g. 2200"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="text-lg h-12"
            />
          </div>

          {/* Result */}
          <div className={`mt-6 rounded-xl p-5 transition-all ${isValid ? "bg-ink text-white" : "bg-muted"}`}>
            {isValid && estimated !== null ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Estimated Cost</div>
                  <div className="font-display text-4xl font-bold text-gold">{formatINR(estimated)}</div>
                  <div className="text-xs text-white/50 mt-1">
                    {areaNum.toLocaleString("en-IN")} sq.ft × ₹{selectedSlab.rate.toLocaleString("en-IN")} ({selectedSlab.name} slab)
                  </div>
                </div>
                <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 shrink-0 h-11">
                  <Link to="/contact">Get Exact Quote</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">
                Enter your area above to see an instant estimate
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-center text-muted-foreground">
            * This is a rough estimate only. Final cost depends on plot conditions, design complexity and finish choices. Prices valid for Jaipur municipal limits.
          </p>
        </div>
      </div>
    </section>
  );
}
