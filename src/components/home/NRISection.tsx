import { Globe2, Video, FileSignature, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const flags = ["🇦🇪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇸🇬"];
const features = [
  { icon: Video, title: "Weekly drone footage", desc: "Cinematic aerial updates delivered to your inbox." },
  { icon: FileSignature, title: "POA-friendly process", desc: "Streamlined Power of Attorney workflow for absentee clients." },
  { icon: ShieldCheck, title: "Escrow-style payments", desc: "Milestone-linked payments protect your investment." },
  { icon: Globe2, title: "Time-zone aware comms", desc: "Dedicated relationship manager available in your timezone." },
];

export function NRISection() {
  return (
    <section className="py-20 lg:py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-px mx-auto max-w-7xl relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            For NRI Clients
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Build in Jaipur. <span className="text-gold">From anywhere.</span>
          </h2>
          <p className="mt-4 text-white/70">
            We've helped 30+ NRI families build their Jaipur dream home — without setting foot on site until handover.
          </p>
          <div className="mt-5 flex justify-center gap-3 text-3xl">
            {flags.map((f) => <span key={f}>{f}</span>)}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 hover:border-gold/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/20 text-gold grid place-items-center">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-display font-bold text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <a href={buildWhatsAppUrl("nri")} target="_blank" rel="noopener noreferrer">
              Book NRI Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
