import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/forms/LeadForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SingleStop — Jaipur Construction Experts" },
      { name: "description", content: "Get a free consultation with Jaipur's premium construction company. Call, WhatsApp or fill the form — replies within 30 minutes." },
      { property: "og:title", content: "Contact SingleStop" },
      { property: "og:description", content: "Free consultation with Jaipur's premium construction company." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Let's <span className="text-gold">build together.</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Free 30-minute consultation. Custom quote within 48 hours.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-2xl bg-card border border-border p-7 lg:p-9 shadow-soft">
            <h2 className="font-display text-2xl font-bold">Tell us about your project</h2>
            <p className="text-sm text-muted-foreground mt-1">A senior consultant will call within 30 minutes.</p>
            <div className="mt-6">
              <LeadForm source="contact" />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <a href="tel:+919462723134" className="block rounded-2xl bg-ink text-white p-6 hover:bg-ink/90 transition-colors">
              <Phone className="w-6 h-6 text-gold" />
              <div className="mt-3 text-xs text-white/60 uppercase tracking-wider">Call us</div>
              <div className="mt-1 font-display font-bold text-xl">+91 94627 23134</div>
              <div className="mt-1 text-xs text-white/60">Mon-Sat · 9 AM – 7 PM</div>
            </a>

            <a href={buildWhatsAppUrl("contact")} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-[#25D366] text-white p-6 hover:opacity-90 transition-opacity">
              <MessageCircle className="w-6 h-6" />
              <div className="mt-3 text-xs text-white/80 uppercase tracking-wider">WhatsApp</div>
              <div className="mt-1 font-display font-bold text-xl">Instant Reply</div>
              <div className="mt-1 text-xs text-white/80">Available 24/7</div>
            </a>

            <a href="mailto:info@singlestop.co.in" className="block rounded-2xl bg-card border border-border p-6 hover:border-gold transition-colors">
              <Mail className="w-6 h-6 text-gold" />
              <div className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">Email</div>
              <div className="mt-1 font-display font-bold text-xl">info@singlestop.co.in</div>
            </a>

            <div className="rounded-2xl bg-card border border-border p-6">
              <MapPin className="w-6 h-6 text-gold" />
              <div className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">Visit us</div>
              <div className="mt-1 font-semibold">SingleStop Studio</div>
              <div className="text-sm text-muted-foreground">C-Scheme, Jaipur, Rajasthan 302001</div>
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> Mon-Sat 9 AM – 7 PM
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl overflow-hidden border border-border aspect-[16/8]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.4!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1700000000000"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SingleStop Jaipur location"
          />
        </div>
      </div>
    </section>
  );
}
