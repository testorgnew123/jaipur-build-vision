import { createFileRoute } from "@tanstack/react-router";
import { OG_IMAGE, faqSchema } from "@/lib/schema";
import { PricingPackages } from "@/components/home/PricingPackages";
import { EstimateCalculator } from "@/components/home/EstimateCalculator";
import { FAQ, faqs } from "@/components/home/FAQ";
import { CTABand } from "@/components/home/CTABand";
import { Calculator } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Construction Pricing in Jaipur - Single Stop Building Solutions Pvt Ltd Packages" },
      { name: "description", content: "Transparent construction packages from ₹1,949/sq.ft. Standard, Classic, Premium and Luxury villa packages with full inclusion lists." },
      { property: "og:title", content: "Single Stop Building Solutions Pvt Ltd Pricing" },
      { property: "og:description", content: "Locked, all-inclusive construction packages in Jaipur." },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://singlestop.co.in/pricing" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
  }),
  component: PricingPage,
});

type TierKey = "std" | "cls" | "prm" | "lux";
const tiers: { key: TierKey; name: string; popular?: boolean }[] = [
  { key: "std", name: "Standard" },
  { key: "cls", name: "Classic" },
  { key: "prm", name: "Premium", popular: true },
  { key: "lux", name: "Luxury" },
];

const compare: ({ feature: string } & Record<TierKey, string>)[] = [
  { feature: "Price / sq.ft", std: "₹1,949", cls: "₹2,149", prm: "₹2,390", lux: "₹2,690" },
  { feature: "Reinforcement steel", std: "Jindal", cls: "Jindal Panther", prm: "Jindal Panther", lux: "Jindal" },
  { feature: "Flooring", std: "Ceramic (≤₹40)", cls: "Granite + ceramic (≤₹60)", prm: "Granite + ceramic (≤₹60)", lux: "Granite + ceramic (≤₹60)" },
  { feature: "Paint", std: "Distemper (Asian)", cls: "Royal Color (Asian)", prm: "Royal Color (Asian)", lux: "Royal Color (Asian)" },
  { feature: "Bathroom budget", std: "₹20,000", cls: "₹25,000", prm: "₹25,000", lux: "₹30,000" },
  { feature: "Modular kitchen", std: "—", cls: "—", prm: "Included", lux: "Included" },
  { feature: "Chimney", std: "—", cls: "—", prm: "—", lux: "Prestige / Elica" },
  { feature: "P.O.P. fall ceiling", std: "—", cls: "Included", prm: "Included", lux: "Included" },
  { feature: "Furniture", std: "—", cls: "—", prm: "TV panel", lux: "Beds, sofa, TV, almirah" },
  { feature: "Main gate", std: "≤₹20,000", cls: "≤₹20,000", prm: "≤₹20,000", lux: "≤₹35,000" },
  { feature: "Structural warranty", std: "10 yrs", cls: "10 yrs", prm: "10 yrs", lux: "10 yrs" },
];

function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 bg-muted/40">
        <div className="container-px mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Pricing</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold tracking-tight">
            Honest pricing. <span className="text-gold">All inclusive.</span>
          </h1>
        </div>
      </section>

      <PricingPackages />

      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container-px mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl lg:text-4xl font-bold tracking-tight mb-10">
            Compare packages
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-background">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.key} className={`p-4 font-semibold ${t.popular ? "text-gold" : ""}`}>
                      {t.name}
                      {t.popular && (
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-gold/80">
                          Most popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="p-4 font-medium">{row.feature}</td>
                    {tiers.map((t) => (
                      <td
                        key={t.key}
                        className={`p-4 text-center ${
                          t.popular ? "font-semibold bg-gold-soft/40" : "text-muted-foreground"
                        }`}
                      >
                        {row[t.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-3xl">
          <div className="text-center">
            <Calculator className="w-12 h-12 mx-auto text-gold" />
            <h2 className="mt-4 font-display text-3xl lg:text-4xl font-bold tracking-tight">
              Want a custom estimate?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Enter your built-up area and pick a package for an instant ballpark — we'll send a
              detailed quote within 48 hours.
            </p>
          </div>
          <EstimateCalculator />
        </div>
      </section>

      <FAQ />
      <CTABand title="Lock your build cost today." primaryLabel="Request Custom Quote" whatsappContext="pricing" />
    </>
  );
}
