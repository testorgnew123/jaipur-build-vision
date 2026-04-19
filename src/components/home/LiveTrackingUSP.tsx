import { Activity, BarChart3, Camera, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function LiveTrackingUSP() {
  return (
    <section className="py-20 lg:py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-px mx-auto max-w-7xl relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Industry First in Jaipur
          </div>
          <h2 className="mt-5 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Live tracking dashboard. <br /><span className="text-gold">Built for clarity.</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-lg">
            Watch your project unfold in real time. Daily site photos, milestone tracking,
            transparent billing, and material logs — all in one elegant dashboard.
          </p>
          <Button asChild size="lg" className="mt-7 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/live-tracking">Explore Dashboard</Link>
          </Button>
        </div>

        <div className="relative">
          <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-elegant">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-white/50">Project</div>
                <div className="font-display font-bold">Mansarovar Villa</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                On Track
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Activity, label: "Progress", value: "67%" },
                { icon: BarChart3, label: "Spent", value: "₹ 92 L" },
                { icon: Camera, label: "Photos", value: "248" },
                { icon: FileText, label: "Bills", value: "32" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <s.icon className="w-4 h-4 text-gold" />
                  <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-white/60 mb-1.5">
                <span>Milestone: Finishing</span>
                <span>67%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-gold" style={{ width: "67%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
