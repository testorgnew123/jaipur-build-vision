import { createFileRoute } from "@tanstack/react-router";
import { PricingPackages } from "@/components/home/PricingPackages";
import { FAQ } from "@/components/home/FAQ";
import { CTABand } from "@/components/home/CTABand";
import { Calculator } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Construction Pricing in Jaipur — SingleStop Packages" },
      { name: "description", content: "Transparent construction packages from ₹1,650/sq.ft. Essential, Signature and Luxe options with full inclusion lists." },
      { property: "og:title", content: "SingleStop Pricing" },
      { property: "og:description", content: "Locked, all-inclusive construction packages in Jaipur." },
    ],
  }),
  component: PricingPage,
});

const compare = [
  { feature: "Structure (RCC)", essential: "M25", signature: "M25", luxe: "M30" },
  { feature: "Tiles", essential: "Standard ceramic", signature: "Designer Italian", luxe: "Imported marble" },
  { feature: "Paints", essential: "Asian / Berger", signature: "Royale / Apex", luxe: "Premium emulsion" },
  { feature: "Modular kitchen", essential: "—", signature: "Included", luxe: "Premium imported" },
  { feature: "Smart home", essential: "—", signature: "Smart switches", luxe: "Lutron full automation" },
  { feature: "Warranty", essential: "10 yrs structural", signature: "10 yrs + finishes", luxe: "10 yrs + lifetime support" },
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
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold">Essential</th>
                  <th className="p-4 font-semibold text-gold">Signature</th>
                  <th className="p-4 font-semibold">Luxe</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.essential}</td>
                    <td className="p-4 text-center font-semibold">{row.signature}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.luxe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-3xl text-center">
          <Calculator className="w-12 h-12 mx-auto text-gold" />
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-bold tracking-tight">
            Want a custom estimate?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Share your plot size and finish preferences — we'll send back a detailed quote within 48 hours.
          </p>
        </div>
      </section>

      <FAQ />
      <CTABand title="Lock your build cost today." primaryLabel="Request Custom Quote" whatsappContext="pricing" />
    </>
  );
}
