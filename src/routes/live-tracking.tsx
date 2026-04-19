import { createFileRoute } from "@tanstack/react-router";
import { LiveTrackingUSP } from "@/components/home/LiveTrackingUSP";
import { Activity, Camera, FileText, MessageSquare, BarChart3, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/live-tracking")({
  head: () => ({
    meta: [
      { title: "Live Project Tracking Dashboard — SingleStop Jaipur" },
      { name: "description", content: "Watch your Jaipur construction project unfold in real time. Daily photos, milestone tracking, transparent billing." },
      { property: "og:title", content: "Live Tracking Dashboard" },
      { property: "og:description", content: "Real-time visibility into your construction project." },
    ],
  }),
  component: LiveTrackingPage,
});

const features = [
  { icon: Activity, title: "Real-time Progress", desc: "Milestone-by-milestone progress, updated daily." },
  { icon: Camera, title: "Daily Site Photos", desc: "Drone + ground-level photos pushed to your dashboard." },
  { icon: BarChart3, title: "Transparent Billing", desc: "Every invoice, every material — fully visible." },
  { icon: FileText, title: "Document Vault", desc: "Approvals, contracts, NOCs — securely stored." },
  { icon: MessageSquare, title: "Direct PM Chat", desc: "Message your project manager without delay." },
  { icon: ShieldCheck, title: "Quality Logs", desc: "Inspection reports, material tests, audit trails." },
];

function LiveTrackingPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">SingleStop App</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Your project. <span className="text-gold">In your pocket.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            Industry-first live tracking dashboard built for total clarity.
          </p>
        </div>
      </section>

      <LiveTrackingUSP />

      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-soft transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-soft text-gold grid place-items-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
