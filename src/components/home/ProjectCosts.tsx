const examples = [
  {
    title: "3BHK Residence — Vaishali Nagar",
    area: "2,400 sq.ft",
    total: "₹ 78 Lakh",
    chips: [
      { label: "Civil", value: "₹ 42 L" },
      { label: "Finishing", value: "₹ 22 L" },
      { label: "Interior", value: "₹ 14 L" },
    ],
  },
  {
    title: "4BHK Villa — Mansarovar",
    area: "4,200 sq.ft",
    total: "₹ 1.6 Cr",
    chips: [
      { label: "Civil", value: "₹ 78 L" },
      { label: "Finishing", value: "₹ 48 L" },
      { label: "Interior", value: "₹ 34 L" },
    ],
  },
  {
    title: "Duplex — Jagatpura",
    area: "3,200 sq.ft",
    total: "₹ 1.05 Cr",
    chips: [
      { label: "Civil", value: "₹ 56 L" },
      { label: "Finishing", value: "₹ 30 L" },
      { label: "Interior", value: "₹ 19 L" },
    ],
  },
];

export function ProjectCosts() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Real numbers</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Real project <span className="text-gold">cost examples</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Actual budgets from recently delivered SingleStop projects in Jaipur.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {examples.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl border border-border bg-card p-7 hover:shadow-elegant hover:border-gold/40 transition-all"
            >
              <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                {e.area}
              </div>
              <h3 className="mt-1 font-display text-xl font-bold">{e.title}</h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-gold">{e.total}</span>
                <span className="text-sm text-muted-foreground">total</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.chips.map((c) => (
                  <div
                    key={c.label}
                    className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium"
                  >
                    <span className="text-muted-foreground">{c.label}:</span>{" "}
                    <span className="text-foreground font-semibold">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
