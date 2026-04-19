import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  BadgeIndianRupee,
  Home,
  Landmark,
  Repeat,
  Calculator,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { banks } from "@/data/banks";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const features = [
  { icon: BadgeIndianRupee, label: "Construction Loans" },
  { icon: Home, label: "Home Loans" },
  { icon: Landmark, label: "Plot + Construction Loans" },
  { icon: Repeat, label: "Balance Transfer Support" },
  { icon: ShieldCheck, label: "Fast Eligibility Guidance" },
  { icon: Calculator, label: "EMI Planning Assistance" },
  { icon: ClipboardCheck, label: "Documentation Support" },
];

export function FinanceSection() {
  return (
    <section id="finance" className="py-20 lg:py-28 bg-muted/40 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-px mx-auto max-w-7xl relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-soft text-gold-foreground text-xs font-semibold tracking-wider uppercase mb-4">
            <FileCheck className="w-3.5 h-3.5 text-gold" />
            Finance Partners
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Flexible Construction <span className="text-gold">Finance Available</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Build your dream home with easy loan assistance from leading banks and financial institutions.
          </p>
        </div>

        {/* Bank logos */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
          {banks.map((b, i) => (
            <motion.div
              key={b.short}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative rounded-xl bg-background border border-border p-4 lg:p-5 flex flex-col items-center justify-center min-h-[140px]"
            >
              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 lg:max-h-20 w-auto object-contain"
                />
              </div>
              <div className="mt-2 text-[10px] lg:text-xs text-muted-foreground text-center font-medium">
                {b.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:border-gold/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-soft text-gold grid place-items-center shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-success hover:bg-success/90 text-white font-semibold shadow-success"
          >
            <Link to="/contact">
              <Calculator className="mr-2 w-4 h-4" /> Check Eligibility
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-brand hover:bg-brand/90 text-white font-semibold shadow-brand"
          >
            <a href={buildWhatsAppUrl("finance")} target="_blank" rel="noopener noreferrer">
              Talk to Loan Expert
            </a>
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          * Subject to bank approval and eligibility. SingleStop facilitates loan applications;
          final approval rests with the respective financial institution.
        </p>
      </div>
    </section>
  );
}
