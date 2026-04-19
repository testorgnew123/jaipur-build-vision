

# SingleStop — Complete Build Plan

End-to-end plan combining all approved scope: base site, elite upgrade, production launch features, and the Home Loan / Construction Finance section.

## 1. Tech & Design System
- **Stack**: TanStack Start + Tailwind v4 + shadcn/ui + Framer Motion + lucide-react.
- **Tokens** (`src/styles.css`): `--primary #111111`, `--background #FFFFFF`, `--accent #C9A227` (gold), `--muted #F8F8F8`, `--muted-foreground #666666`. Manrope (headings) + Inter (body) self-hosted with `font-display: swap`. Gold shimmer, gradient-border, marquee, soft-shadow utilities. `prefers-reduced-motion` respected.

## 2. Global Layout
- Sticky transparent → solid Navbar with: Home, About, Services, Projects, Pricing, Live Tracking, Blog, Contact + gold "Get Quote" CTA.
- Mobile: Sheet hamburger + sticky bottom CTA bar (Call · WhatsApp · Quote).
- WhatsApp floating FAB sitewide with **prefilled contextual messages**.
- Footer with brand, links, Jaipur address, socials.
- Desktop **exit-intent dialog** (10s arm, once/session, mini lead form).

## 3. Routes (8 + dynamic)
```text
src/routes/
  __root.tsx            fonts, Navbar, Footer, FAB, MobileCTA, ExitIntent,
                        Analytics, LocalBusiness JSON-LD, 404 boundary
  index.tsx             18 home sections (below)
  about.tsx             Story, Mission, Values, Team, Certifications
  services.tsx          Per-service detailed sections + pricing recap
  projects.tsx          Filter chips + masonry grid → links to detail
  projects.$slug.tsx    Dynamic project detail (gallery, specs, JSON-LD)
  pricing.tsx           Full comparison + calculator preview + FAQ
  live-tracking.tsx     SaaS-style dashboard showcase
  blog.tsx              Card grid from src/data/posts.ts
  blog.$slug.tsx        Dynamic post (Article JSON-LD, prose layout)
  contact.tsx           Form, phone, WhatsApp, email, Map, hours
```
Each route has unique `head()` (title/description/og:title/og:description, og:image where a hero exists). Per-route `errorComponent` + `notFoundComponent`.

## 4. Home Page Sections (in order)
1. **Hero** — autoplay muted looped cinematic video + image fallback, headline, 2 CTAs, glass lead form (desktop), trust badges (100+ Projects · 4.9★ · Jaipur Focused · **Loan Facility Available**).
2. **TrustStats** — animated counters.
3. **TrustLogos** — certifications + client logos strip (grayscale, hover color, marquee on mobile).
4. **ServicesGrid** — 8 luxury cards.
5. **WhySingleStop** — pain points vs solutions split.
6. **CTA Band #1** — "Need Expert Guidance?" → Get Estimate / Book Site Visit.
7. **PricingPackages** — Essential / Signature (gold ribbon) / Luxe.
8. **FinanceSection** *(NEW)* — Construction Finance:
   - Headline: "Flexible Construction Finance Available"
   - 8 bank wordmark cards (HDFC, ICICI, SBI, Axis, Kotak, BoB, PNB, LIC Housing) — grayscale, hover color, gold hairline.
   - 7 feature chips (Construction Loans, Home Loans, Plot+Construction, Balance Transfer, Eligibility, EMI Planning, Documentation).
   - CTAs: "Check Eligibility" (gold) + "Talk to Loan Expert" (WhatsApp prefilled).
   - Disclaimer: "Subject to bank approval and eligibility."
9. **ProjectCosts** — real cost example cards with Civil/Finishing/Interior chips.
10. **CTA Band #2**.
11. **FeaturedProjects** — premium carousel → links to detail pages.
12. **LiveTrackingUSP** — dashboard mockup.
13. **BeforeAfterSlider** — draggable comparison (lazy-loaded).
14. **CTA Band #3**.
15. **ProcessTimeline** — 7 steps.
16. **FounderTeam** — founder spotlight + 3 team cards.
17. **GoogleReviews** — 4.9★ + 6 review cards + Review JSON-LD.
18. **VideoTestimonials** — elegant cards with play overlays (lazy).
19. **CTA Band #4**.
20. **JaipurExpertise** — SEO copy + locality chips (Mansarovar, Vaishali Nagar, Jagatpura, Malviya Nagar, C-Scheme, Tonk Rd, Ajmer Rd, Sirsi Rd).
21. **NRISection** — features + country flags (UAE, USA, UK, Canada, Australia, Singapore).
22. **FAQ** — accordion + FAQPage JSON-LD.
23. **FinalCTA** — cinematic bg, Book Consultation / Call / WhatsApp.

## 5. Production Launch Features
- **Schema** (`src/lib/schema.ts`): LocalBusiness (root), FAQPage + Organization + WebSite (home), Project (project detail), Article (blog detail), Review (reviews section).
- **Analytics** (`src/components/analytics/Analytics.tsx`): GA4 + Meta Pixel placeholders (`VITE_GA_ID`, `VITE_META_PIXEL_ID`), SPA pageview via router subscribe, deferred load.
- **UTM tracking** (`src/hooks/useUTM.ts`): captures utm_*, gclid, fbclid into sessionStorage (first-touch); injected as hidden fields in every lead form + page_url + referrer + submitted_at.
- **WhatsApp prefill** (`src/lib/whatsapp.ts`): contextual messages by source (hero, pricing, finance, project).
- **Performance**: hero `fetchPriority="high"`, video `preload="metadata"`, lazy/`decoding="async"` + responsive Unsplash srcset on below-fold images, font preload, `React.lazy` for BeforeAfterSlider/VideoTestimonials/Carousel, preconnect to fonts.gstatic.com / images.unsplash.com / wa.me.

## 6. Data Layer (CMS-ready)
```text
src/data/projects.ts   typed Project[] (slug, gallery, specs, story, quote)
src/data/posts.ts      typed Post[] (slug, cover, author, tags, content)
src/data/reviews.ts    typed Review[] for GoogleReviews + schema
src/data/banks.ts      bank list for FinanceSection
```

## 7. Conversion Layer
- 4 CTA bands on home (every 2 sections).
- LeadForm in Hero, Contact page, Exit-intent, Pricing.
- Trust badges throughout, sticky mobile CTA, WhatsApp FAB.

## Out of Scope
- Real form backend (toast confirmation; UTMs ready to POST when endpoint provided).
- Real Google Reviews API, real cost calculator math, real video files.
- MDX pipeline (posts use HTML strings; structure swap-ready).
- Cookie consent banner, multi-language.

