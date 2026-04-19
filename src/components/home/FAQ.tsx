import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "How long does a typical Jaipur villa take to build?",
    a: "A 3-4 BHK villa (2,500–4,500 sq.ft) typically takes 9–12 months from groundbreaking to handover, depending on finish level and approvals.",
  },
  {
    q: "Are your prices truly all-inclusive?",
    a: "Yes. Our quotes include design, materials, labour, supervision, statutory approvals (extra at actuals), and a 10-year structural warranty. No hidden line items appear later.",
  },
  {
    q: "Do you help with home loans?",
    a: "Yes. We have tie-ups with HDFC, ICICI, SBI, Axis, Kotak, BoB, PNB and LIC Housing Finance. Our team helps with eligibility, documentation, and EMI planning. Final approval rests with the bank.",
  },
  {
    q: "Can you build for NRI clients?",
    a: "Absolutely. We've delivered 30+ NRI projects with weekly drone footage, live dashboard tracking, POA-friendly workflows, and milestone-linked payments.",
  },
  {
    q: "What happens if you miss a deadline?",
    a: "Our contracts include a penalty clause for missed milestones — credited back to you. Our 8-year track record shows 98% on-time handover.",
  },
  {
    q: "Do you handle JDA / RERA approvals?",
    a: "Yes. Our in-house liaison team handles JDA approvals, RERA registration (where applicable), and structural NOCs end-to-end.",
  },
  {
    q: "Can I use your live tracking dashboard?",
    a: "Every active client gets dashboard access with daily site photos, milestone progress, billing, material logs and real-time messaging with your project manager.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">FAQ</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Questions, <span className="text-gold">answered.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-xl bg-card px-5"
            >
              <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
