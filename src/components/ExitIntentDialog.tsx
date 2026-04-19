import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/LeadForm";
import { Sparkles } from "lucide-react";

const KEY = "ss_exit_intent_shown";

export function ExitIntentDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    if (sessionStorage.getItem(KEY)) return;

    let armed = false;
    const arm = setTimeout(() => (armed = true), 10000);

    const onLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        sessionStorage.setItem(KEY, "1");
        setOpen(true);
        document.removeEventListener("mouseleave", onLeave);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(arm);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-gold mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">Wait — Exclusive Offer</span>
          </div>
          <DialogTitle className="font-display text-2xl">
            Free 30-min consultation + cost estimate
          </DialogTitle>
          <DialogDescription>
            Talk to a senior architect about your Jaipur project. No obligation.
          </DialogDescription>
        </DialogHeader>
        <LeadForm source="exit-intent" compact showMessage={false} />
      </DialogContent>
    </Dialog>
  );
}
