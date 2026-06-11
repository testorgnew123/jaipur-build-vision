import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="bg-ink text-white/90">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 inline-flex bg-white rounded-lg p-3 shadow-soft">
            <img
              src={logo}
              alt="Single Stop Building Solutions Pvt Ltd"
              className="h-12 w-auto object-contain"
              width={200}
              height={48}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Jaipur's end-to-end building solutions company for planning, construction,
            PMC, interiors, finishing, finance assistance, and project tracking.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="https://www.instagram.com/single__stop?igsh=MWxocHIxeHFyc2ZrZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/share/1ArPjusBti/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/single-stop-building-solutions-pvt-ltd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://share.google/6YgEo5rHtYl0JexCO" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
                <path fill="currentColor" d="M44.5 20H24v8.5h11.8C34.7 33 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6.4-6.4C34.6 5 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.2-2.7-.5-4z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/pricing" className="hover:text-gold">Pricing &amp; Packages</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-gold">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-gold">Planning (Architectural & Structural)</Link></li>
            <li><Link to="/services" className="hover:text-gold">Construction Turnkey</Link></li>
            <li><Link to="/services" className="hover:text-gold">PMC</Link></li>
            <li><Link to="/services" className="hover:text-gold">Interior & Finishing</Link></li>
            <li><Link to="/live-tracking" className="hover:text-gold">Live Site Tracking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <span>S9, Gulab Vihar, near Domino's, Sheer Sagar Patrakar Colony, Dholai, Jaipur, Rajasthan 302020</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href="tel:+919571835363" className="hover:text-gold">+91 95718 35363</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href="mailto:info@singlestop.co.in" className="hover:text-gold">info@singlestop.co.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>Copyright {new Date().getFullYear()} Single Stop Building Solutions Pvt Ltd. All rights reserved.</p>
          <p>RERA Registered - ISO 9001 Certified - JDA Approved</p>
        </div>
      </div>
    </footer>
  );
}
