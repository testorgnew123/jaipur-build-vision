import { Check, X } from "lucide-react";

const pains = [
  "Hidden costs that balloon the budget",
  "Multiple vendors blaming each other",
  "Zero visibility into site progress",
  "Endless delays past the promised date",
  "Compromised material quality",
];

const solutions = [
  "Locked transparent pricing — line by line",
  "One accountable team, end to end",
  "Live dashboard with daily photos",
  "Penalty clause for missed milestones",
  "Premium-grade materials, verified on-site",
];

export function WhySingleStop() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Why SingleStop</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Construction in Jaipur, <span className="text-gold">finally fixed.</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="rounded-2xl border border-border bg-background p-7 lg:p-9">
            <div className="text-xs font-semibold tracking-widest uppercase text-destructive">
              Old way
            </div>
            <h3 className="mt-1 font-display text-xl font-bold">Typical contractor experience</h3>
            <ul className="mt-5 space-y-3">
              {pains.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive grid place-items-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-ink text-white p-7 lg:p-9 shadow-elegant relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-semibold tracking-widest uppercase text-gold">
                The SingleStop way
              </div>
              <h3 className="mt-1 font-display text-xl font-bold">
                Premium, predictable, transparent
              </h3>
              <ul className="mt-5 space-y-3">
                {solutions.map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-gold text-gold-foreground grid place-items-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
