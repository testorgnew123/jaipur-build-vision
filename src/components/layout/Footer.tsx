import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-ink text-white/90">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 inline-flex bg-white rounded-lg p-3 shadow-soft">
            <img
              src={logo}
              alt="Single Stop Building Solutions"
              className="h-12 w-auto object-contain"
              width={200}
              height={48}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Jaipur's premium end-to-end construction company. Design, build, finance
            assistance, and live tracking — all in one stop.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-gold">Architectural Design</Link></li>
            <li><Link to="/services" className="hover:text-gold">Residential Construction</Link></li>
            <li><Link to="/services" className="hover:text-gold">Commercial Projects</Link></li>
            <li><Link to="/services" className="hover:text-gold">Interior &amp; Renovation</Link></li>
            <li><Link to="/live-tracking" className="hover:text-gold">Live Site Tracking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <span>C-Scheme, Jaipur, Rajasthan 302001</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href="tel:+919462723134" className="hover:text-gold">+91 94627 23134</a>
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
          <p>© {new Date().getFullYear()} SingleStop Construction Pvt. Ltd. All rights reserved.</p>
          <p>RERA Registered · ISO 9001 Certified · JDA Approved</p>
        </div>
      </div>
    </footer>
  );
}
