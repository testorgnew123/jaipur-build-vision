import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUTM } from "@/hooks/useUTM";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type Props = {
  variant?: "light" | "dark";
  source?: string;
  compact?: boolean;
  siteVisit?: boolean;
};

type FieldErrors = { name?: string; phone?: string };

function validateName(raw: string): string | undefined {
  const name = raw.trim();
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 80) return "Name is too long";
  // Unicode letters (covers Hindi/Latin), space, hyphen, apostrophe, dot
  if (!/^\p{L}[\p{L}\s.'’-]*$/u.test(name)) {
    return "Name can only contain letters, spaces, hyphens, apostrophes, and dots";
  }
  return undefined;
}

function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function validatePhone(raw: string): string | undefined {
  if (!raw.trim()) return "Mobile number is required";
  const local = normalizePhone(raw);
  if (local.length !== 10) return "Enter a valid 10-digit mobile number";
  if (!/^[6-9]/.test(local)) return "Indian mobile numbers start with 6, 7, 8, or 9";
  return undefined;
}

export function LeadForm({
  variant = "light",
  source = "general",
  compact = false,
  siteVisit = false,
}: Props) {
  const utm = useUTM();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleBlur(field: keyof FieldErrors, value: string) {
    const err = field === "name" ? validateName(value) : validatePhone(value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const phone = String(fd.get("phone") ?? "");

    const fieldErrors: FieldErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
    };
    if (fieldErrors.name || fieldErrors.phone) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const meta = {
      source,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_term: utm.utm_term ?? null,
      utm_content: utm.utm_content ?? null,
      gclid: utm.gclid ?? null,
      fbclid: utm.fbclid ?? null,
      page_url: utm.page_url ?? null,
      referrer: utm.referrer ?? null,
      submitted_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: name.trim(),
          client_phone: `+91${normalizePhone(phone)}`,
          notes: JSON.stringify(meta),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      setSubmitted(true);
      const msg = siteVisit
        ? "Visit request received! We'll call within 30 minutes."
        : "Thank you! Our expert will call you within 30 minutes.";
      toast.success(msg);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl">
          {siteVisit ? "Visit request received!" : "Request received"}
        </h3>
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
  const errorCls = "border-destructive focus-visible:ring-destructive";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className={compact || siteVisit ? "grid grid-cols-1 gap-4" : "grid sm:grid-cols-2 gap-4"}>
        <div className="space-y-1.5">
          <Label htmlFor="name" className={labelCls}>Name</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onBlur={(e) => handleBlur("name", e.currentTarget.value)}
            onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
            className={`h-11 ${inputCls} ${errors.name ? errorCls : ""}`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelCls}>Mobile number</Label>
          <Input
            id="phone"
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="+91 98xxx xxxxx"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onBlur={(e) => handleBlur("phone", e.currentTarget.value)}
            onChange={() => errors.phone && setErrors((p) => ({ ...p, phone: undefined }))}
            className={`h-11 ${inputCls} ${errors.phone ? errorCls : ""}`}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-gold"
      >
        {loading
          ? "Sending…"
          : siteVisit
          ? "Request Site Visit"
          : "Get Free Consultation"}
      </Button>
      <p className={`text-xs text-center ${variant === "dark" ? "text-white/60" : "text-muted-foreground"}`}>
        We'll call within 30 minutes. No spam, ever.
      </p>
    </form>
  );
}
