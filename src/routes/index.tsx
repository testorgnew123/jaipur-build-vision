import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { TrustStats } from "@/components/home/TrustStats";
import { TrustLogos } from "@/components/home/TrustLogos";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhySingleStop } from "@/components/home/WhySingleStop";
import { CTABand } from "@/components/home/CTABand";
import { PricingPackages } from "@/components/home/PricingPackages";
import { FinanceSection } from "@/components/home/FinanceSection";
import { ProjectCosts } from "@/components/home/ProjectCosts";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LiveTrackingUSP } from "@/components/home/LiveTrackingUSP";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FounderTeam } from "@/components/home/FounderTeam";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { JaipurExpertise } from "@/components/home/JaipurExpertise";
import { NRISection } from "@/components/home/NRISection";
import { FAQ, faqs } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { faqSchema, organizationSchema, websiteSchema } from "@/lib/schema";

const BeforeAfterSlider = lazy(() => import("@/components/home/BeforeAfterSlider"));
const VideoTestimonials = lazy(() => import("@/components/home/VideoTestimonials"));

const heroOg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SingleStop — Premium Construction Company in Jaipur" },
      {
        name: "description",
        content:
          "Build your dream home in Jaipur with SingleStop. Architectural design, construction, renovation, live tracking and home loan assistance — all in one premium partner.",
      },
      { property: "og:title", content: "SingleStop — Premium Construction in Jaipur" },
      { property: "og:description", content: "End-to-end construction with transparent pricing, live tracking and finance assistance." },
      { property: "og:image", content: heroOg },
      { name: "twitter:image", content: heroOg },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs.map(f => ({ q: f.q, a: f.a })))) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStats />
      <TrustLogos />
      <ServicesGrid />
      <WhySingleStop />
      <CTABand
        eyebrow="Need Expert Guidance?"
        title="Talk to a senior architect — free."
        subtitle="30 minutes. Real advice. No commitment."
        primaryLabel="Get Free Estimate"
        secondaryLabel="Book Site Visit"
        whatsappContext="hero"
      />
      <PricingPackages />
      <FinanceSection />
      <ProjectCosts />
      <CTABand
        variant="gold"
        title="Ready to lock your build cost?"
        subtitle="Get a fixed, all-inclusive quote within 48 hours."
        primaryLabel="Request Quote"
        secondaryLabel="WhatsApp Us"
        whatsappContext="pricing"
      />
      <FeaturedProjects />
      <LiveTrackingUSP />
      <Suspense fallback={<div className="h-[60vh] bg-muted/40" />}>
        <BeforeAfterSlider />
      </Suspense>
      <CTABand
        title="Want results like this?"
        subtitle="Renovate your home with Jaipur's most trusted team."
        primaryLabel="Plan My Renovation"
        whatsappContext="general"
      />
      <ProcessTimeline />
      <FounderTeam />
      <GoogleReviews />
      <Suspense fallback={<div className="h-[60vh] bg-muted/40" />}>
        <VideoTestimonials />
      </Suspense>
      <CTABand
        variant="light"
        title="Join 100+ happy SingleStop families."
        subtitle="Your project is the next great story we tell."
        primaryLabel="Start My Project"
        whatsappContext="hero"
      />
      <JaipurExpertise />
      <NRISection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
