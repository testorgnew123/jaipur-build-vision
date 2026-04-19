import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  return (
    <a
      href={buildWhatsAppUrl("general")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elegant grid place-items-center hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="sr-only">WhatsApp</span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  );
}
