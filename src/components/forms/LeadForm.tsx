import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUTM } from "@/hooks/useUTM";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type Props = {
  variant?: "light" | "dark";
  source?: string;
  compact?: boolean;
  showMessage?: boolean;
};

export function LeadForm({
  variant = "light",
  source = "general",
  compact = false,
  showMessage = true,
}: Props) {
  const utm = useUTM();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    // eslint-disable-next-line no-console
    console.log("[Lead]", { ...payload, ...utm, source, submitted_at: new Date().toISOString() });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you! Our expert will call you within 30 minutes.");
    }, 600);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl">Request received</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Our consultant will reach out within 30 minutes.
        </p>
      </div>
    );
  }

  const labelCls = variant === "dark" ? "text-white/80" : "text-foreground";
  const inputCls =
    variant === "dark"
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/50"
      : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={compact ? "grid grid-cols-1 gap-3" : "grid sm:grid-cols-2 gap-3"}>
        <div className="space-y-1.5">
          <Label htmlFor="name" className={labelCls}>Name</Label>
          <Input id="name" name="name" required placeholder="Your full name" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelCls}>Phone</Label>
          <Input id="phone" name="phone" required type="tel" placeholder="+91 98xxx xxxxx" className={inputCls} />
        </div>
      </div>

      <div className={compact ? "grid grid-cols-1 gap-3" : "grid sm:grid-cols-2 gap-3"}>
        <div className="space-y-1.5">
          <Label htmlFor="email" className={labelCls}>Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="project_type" className={labelCls}>Project type</Label>
          <Select name="project_type" defaultValue="residential">
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
              <SelectItem value="interior">Interior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showMessage && (
        <div className="space-y-1.5">
          <Label htmlFor="message" className={labelCls}>Message (optional)</Label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your plot, budget, timeline…"
            className={inputCls}
          />
        </div>
      )}

      {/* Hidden UTM + tracking fields */}
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="utm_source" value={utm.utm_source ?? ""} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium ?? ""} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign ?? ""} />
      <input type="hidden" name="utm_term" value={utm.utm_term ?? ""} />
      <input type="hidden" name="utm_content" value={utm.utm_content ?? ""} />
      <input type="hidden" name="gclid" value={utm.gclid ?? ""} />
      <input type="hidden" name="fbclid" value={utm.fbclid ?? ""} />
      <input type="hidden" name="page_url" value={utm.page_url ?? ""} />
      <input type="hidden" name="referrer" value={utm.referrer ?? ""} />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-gold"
      >
        {loading ? "Sending…" : "Get Free Consultation"}
      </Button>
      <p className={`text-xs text-center ${variant === "dark" ? "text-white/60" : "text-muted-foreground"}`}>
        Replies within 30 minutes. No spam, ever.
      </p>
    </form>
  );
}
