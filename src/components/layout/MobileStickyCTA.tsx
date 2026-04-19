import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border shadow-elegant">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href="tel:+919462723134"
          className="flex flex-col items-center justify-center py-3 gap-1 text-xs font-semibold bg-brand text-white"
        >
          <Phone className="w-5 h-5" />
          Call
        </a>
        <a
          href={buildWhatsAppUrl("general")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 gap-1 text-xs font-semibold bg-success text-white"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <Link
          to="/contact"
          className="flex flex-col items-center justify-center py-3 gap-1 text-xs font-semibold bg-brand text-white border-l border-white/20"
        >
          <FileText className="w-5 h-5" />
          Get Quote
        </Link>
      </div>
    </div>
  );
}
