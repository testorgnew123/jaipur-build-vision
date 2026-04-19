import { ShieldCheck, Award, Leaf, FileBadge, BadgeCheck, Building } from "lucide-react";

const certs = [
  { icon: ShieldCheck, label: "ISO 9001:2015" },
  { icon: Building, label: "JDA Approved" },
  { icon: FileBadge, label: "RERA Registered" },
  { icon: Leaf, label: "IGBC Member" },
  { icon: BadgeCheck, label: "MSME Registered" },
  { icon: Award, label: "GST Compliant" },
];

export function TrustLogos() {
  return (
    <section className="py-10 lg:py-14 bg-muted/40 border-y border-border">
      <div className="container-px mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Certified · Approved · Trusted
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {certs.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-background rounded-xl border border-border hover:border-gold transition-colors group"
            >
              <c.icon className="w-7 h-7 text-muted-foreground group-hover:text-gold transition-colors" />
              <span className="text-[11px] lg:text-xs font-semibold text-center text-foreground/80">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
