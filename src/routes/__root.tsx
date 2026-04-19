import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ExitIntentDialog } from "@/components/ExitIntentDialog";
import { Analytics } from "@/components/analytics/Analytics";
import { Toaster } from "@/components/ui/sonner";
import { localBusinessSchema } from "@/lib/schema";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold hover:bg-gold/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SingleStop — Premium Construction Company in Jaipur" },
      {
        name: "description",
        content:
          "Jaipur's premium end-to-end construction company. Architectural design, residential & commercial construction, renovation, interior, live tracking and home loan assistance.",
      },
      { name: "author", content: "SingleStop" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SingleStop" },
      { name: "theme-color", content: "#111111" },
      { property: "og:title", content: "SingleStop — Premium Construction Company in Jaipur" },
      { name: "twitter:title", content: "SingleStop — Premium Construction Company in Jaipur" },
      { name: "description", content: "Premium Jaipur construction company website offering end-to-end services from design to maintenance." },
      { property: "og:description", content: "Premium Jaipur construction company website offering end-to-end services from design to maintenance." },
      { name: "twitter:description", content: "Premium Jaipur construction company website offering end-to-end services from design to maintenance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/586fa348-c23b-4083-8f37-ed19b1707294/id-preview-5f8bb3ac--6a062d22-95b2-4d2d-a94d-d6c4c9c45f35.lovable.app-1776585855466.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/586fa348-c23b-4083-8f37-ed19b1707294/id-preview-5f8bb3ac--6a062d22-95b2-4d2d-a94d-d6c4c9c45f35.lovable.app-1776585855466.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Analytics />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
      <MobileStickyCTA />
      <ExitIntentDialog />
      <Toaster richColors position="top-center" />
      <div className="lg:hidden h-16" aria-hidden />
    </>
  );
}
