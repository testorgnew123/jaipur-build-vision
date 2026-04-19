import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const bg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-ink text-white">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <div className="relative container-px mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          Ready to build?
        </p>
        <h2 className="mt-4 font-display text-4xl lg:text-6xl font-bold tracking-tight">
          Your Jaipur dream home <br />
          <span className="text-gold">starts with one call.</span>
        </h2>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto">
          Free 30-minute consultation. Custom estimate. Zero pressure.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold">
            <Link to="/contact">
              <Calendar className="mr-2 w-4 h-4" /> Book Consultation
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <a href="tel:+919876543210">
              <Phone className="mr-2 w-4 h-4" /> Call Now
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <a href={buildWhatsAppUrl("hero")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
