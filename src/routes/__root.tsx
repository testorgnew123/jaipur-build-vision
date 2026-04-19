import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
