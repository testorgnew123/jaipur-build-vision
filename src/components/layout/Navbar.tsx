import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/live-tracking", label: "Live Tracking" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-background/80 backdrop-blur-xl border-b border-border/60",
        isHome && "bg-background/70",
      )}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-display font-bold text-lg shadow-soft">
            S
          </div>
          <div className="font-display font-bold text-lg tracking-tight">
            Single<span className="text-gold">Stop</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href="tel:+919462723134"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <Phone className="w-4 h-4 text-gold" />
            +91 94627 23134
          </a>
          <Button asChild className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-gold">
            <Link to="/contact">Get Quote</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden p-2 rounded-md text-foreground"
              aria-label="Open menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-80">
            <div className="flex flex-col gap-1 mt-8">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium rounded-lg hover:bg-muted"
                  activeProps={{ className: "bg-muted text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-4 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold"
              >
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Get Free Quote
                </Link>
              </Button>
              <a
                href="tel:+919462723134"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-lg border border-border"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91 94627 23134
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
