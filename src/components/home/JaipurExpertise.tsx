import { MapPin } from "lucide-react";

const localities = [
  "Mansarovar", "Vaishali Nagar", "Jagatpura", "Malviya Nagar",
  "C-Scheme", "Tonk Road", "Ajmer Road", "Sirsi Road",
  "Bani Park", "Civil Lines", "Raja Park", "Jhotwara",
];

export function JaipurExpertise() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Local Expertise
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Born in Jaipur. <br /><span className="text-gold">Built for Jaipur.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We know Jaipur's soil conditions, climate, JDA approval workflows, RERA compliance,
            heritage zone restrictions, and local material supply chains intimately. Eight years of
            building exclusively in the Pink City means your project moves faster, cheaper, and smoother.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-gold">✓</span> Direct liaison with JDA, JMC and BSUP</li>
            <li className="flex gap-2"><span className="text-gold">✓</span> RERA-compliant documentation</li>
            <li className="flex gap-2"><span className="text-gold">✓</span> Local material network — no markup</li>
            <li className="flex gap-2"><span className="text-gold">✓</span> Vastu-trained architects on staff</li>
          </ul>
        </div>

        <div>
          <div className="rounded-2xl bg-background border border-border p-7">
            <div className="flex items-center gap-2 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 text-gold" />
              Active Project Areas
            </div>
            <div className="flex flex-wrap gap-2">
              {localities.map((l) => (
                <span
                  key={l}
                  className="px-3 py-1.5 rounded-full bg-muted hover:bg-gold hover:text-gold-foreground text-xs font-medium cursor-default transition-colors"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
