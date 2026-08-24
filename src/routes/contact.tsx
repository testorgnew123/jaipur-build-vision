import { createFileRoute } from "@tanstack/react-router";
import { OG_IMAGE } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Single Stop Building Solutions Pvt Ltd - Jaipur Construction Experts" },
      { name: "description", content: "Get a free consultation with Single Stop Building Solutions Pvt Ltd. Call, WhatsApp or fill the form - replies shortly" },
      { property: "og:title", content: "Contact Single Stop Building Solutions Pvt Ltd" },
      { property: "og:description", content: "Free consultation with Jaipur's premium construction company." },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://singlestop.co.in/contact" }],
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
            <h2 className="font-display text-2xl font-bold">Request a Site Visit</h2>
            <p className="text-sm text-muted-foreground mt-1">We'll call to schedule your visit shortly.</p>
            <div className="mt-6">
              <LeadForm source="contact" siteVisit />
            </div>

            <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4">
              {[
                { icon: Phone, title: "30-min callback", desc: "We ring you to schedule" },
                { icon: MapPin, title: "Free site survey", desc: "On-ground assessment" },
                { icon: Clock, title: "Quote in 48 hrs", desc: "Transparent, itemised" },
              ].map((s) => (
                <div key={s.title} className="text-center sm:text-left">
                  <div className="w-9 h-9 rounded-lg bg-gold-soft text-gold grid place-items-center mx-auto sm:mx-0">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <a href="tel:+919571835363" className="block rounded-2xl bg-ink text-white p-6 hover:bg-ink/90 transition-colors">
              <Phone className="w-6 h-6 text-gold" />
              <div className="mt-3 text-xs text-white/60 uppercase tracking-wider">Call us</div>
              <div className="mt-1 font-display font-bold text-xl">+91 95718 35363</div>
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
              <div className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">Head Office</div>
              <div className="mt-1 font-semibold">Single Stop Building Solutions Pvt Ltd</div>
              <div className="text-sm text-muted-foreground">S9, Gulab Vihar, near Domino's, Sheer Sagar Patrakar Colony, Dholai, Jaipur, Rajasthan 302020</div>
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> Mon-Sat 9 AM – 7 PM
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl overflow-hidden border border-border aspect-[16/8]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.007700639891!2d75.74023611162876!3d26.83970737659342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db773f668f9db%3A0xd797a9452a0c9735!2sSingle%20Stop%20Building%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1778411639249!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Single Stop Building Solutions Pvt Ltd Jaipur location"
          />
        </div>
      </div>
    </section>
  );
}
