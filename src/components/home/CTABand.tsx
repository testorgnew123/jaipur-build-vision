import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  whatsappContext?: "hero" | "pricing" | "finance" | "general" | "contact";
  variant?: "ink" | "gold" | "light";
};

export function CTABand({
  eyebrow,
  title,
  subtitle,
  primaryLabel = "Get Free Estimate",
  primaryTo = "/contact",
  secondaryLabel = "Chat on WhatsApp",
  whatsappContext = "general",
  variant = "ink",
}: Props) {
  const styles = {
    ink: "bg-ink text-white",
    gold: "bg-gradient-gold text-ink",
    light: "bg-muted text-foreground",
  }[variant];

  return (
    <section className={`py-14 lg:py-20 ${styles} relative overflow-hidden`}>
      {variant === "ink" && (
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      )}
      <div className="relative container-px mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${variant === "gold" ? "text-ink/70" : "text-gold"}`}>
              {eyebrow}
            </p>
          )}
          <h3 className="mt-2 font-display text-2xl lg:text-4xl font-bold tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className={`mt-2 text-sm lg:text-base ${variant === "ink" ? "text-white/70" : "text-current/80"}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className={
              variant === "gold"
                ? "bg-ink text-white hover:bg-ink/90"
                : "bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold"
            }
          >
            <Link to={primaryTo}>
              {primaryLabel} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className={
              variant === "ink"
                ? "bg-white/10 border-white/30 text-white hover:bg-white/20"
                : "border-ink/30 hover:bg-ink/5"
            }
          >
            <a href={buildWhatsAppUrl(whatsappContext)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 w-4 h-4" />
              {secondaryLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
