import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { Star, MapPin, Building2, Landmark, ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const heroImage =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";

const heroVideo =
  "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-modern-house-7833/1080p.mp4";

const badges = [
  { icon: Building2, label: "100+ Projects" },
  { icon: Star, label: "4.9★ Rated" },
  { icon: MapPin, label: "Jaipur Focused" },
  { icon: Landmark, label: "Loan Facility Available" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-20 lg:pt-24 overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Jaipur villa built by SingleStop"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      <div className="relative container-px mx-auto max-w-7xl py-12 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur text-xs font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Jaipur's Premium Construction Brand
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/15 border border-danger/40 text-danger text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
              Jaipur Only
            </div>
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Build smarter.
            <br />
            <span className="text-gold">Live luxuriously.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl">
            End-to-end design + build + finance assistance for Jaipur's most discerning
            homeowners. Transparent pricing, live tracking, on-time handover.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-gold"
            >
              <Link to="/contact">
                Get Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
            >
              <a href={buildWhatsAppUrl("hero")} target="_blank" rel="noopener noreferrer">
                <PlayCircle className="mr-2 w-4 h-4" />
                Talk on WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-xs font-medium"
              >
                <b.icon className="w-3.5 h-3.5 text-success" />
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl text-foreground p-6 lg:p-7 shadow-elegant gold-border">
            <div className="text-xs font-semibold tracking-widest text-gold uppercase">
              Free Consultation
            </div>
            <h3 className="font-display text-xl font-bold mt-1 mb-4">
              Get a custom cost estimate
            </h3>
            <LeadForm source="hero" compact showMessage={false} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
