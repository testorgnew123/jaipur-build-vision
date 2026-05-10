const steps = [
  { n: "01", title: "Discovery Call", desc: "Free 30-min consultation to understand your needs, site, and budget." },
  { n: "02", title: "Planning & Quote", desc: "Architectural and structural planning with a clear project scope." },
  { n: "03", title: "Site Mobilisation", desc: "Senior PM, safety setup, team alignment, and material staging." },
  { n: "04", title: "Build", desc: "Coordinated construction with regular progress updates and quality checks." },
  { n: "05", title: "Finishing", desc: "Painting, fittings, interiors, and final finishing details." },
  { n: "06", title: "Handover & Support", desc: "Snagging, handover, and after-service support for your project." },
];

export function ProcessTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Our process</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Six steps. <span className="text-gold">Total clarity.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl bg-background border border-border p-6 hover:border-gold/40 hover:shadow-soft transition-all"
            >
              <div className="font-display text-5xl font-bold text-gold/30">{s.n}</div>
              <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
