import nodemailer from "nodemailer";

export interface LeadRow {
  id: number;
  client_name: string;
  client_phone: string;
  notes: string | null;
  created_at: string;
}

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || "info@singlestop.co.in";

// Netlify functions are killed at 10s. Cap the whole send well under that so a slow
// SMTP host cannot time the function out and make an already-saved lead look failed.
const SEND_TIMEOUT_MS = 6000;

const META_LABELS: Record<string, string> = {
  source: "Form",
  utm_source: "UTM source",
  utm_medium: "UTM medium",
  utm_campaign: "UTM campaign",
  utm_term: "UTM term",
  utm_content: "UTM content",
  gclid: "Google click ID",
  fbclid: "Meta click ID",
  page_url: "Page",
  referrer: "Referrer",
  submitted_at: "Submitted",
  notes: "Notes",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// The public form stores a JSON meta blob in `notes`; admin-created visits store free text.
function parseMeta(notes: string | null): Record<string, string> {
  if (!notes) return {};
  try {
    const parsed = JSON.parse(notes);
    if (!parsed || typeof parsed !== "object") return { notes };
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (value === null || value === undefined || value === "") continue;
      out[key] = String(value);
    }
    return out;
  } catch {
    return { notes };
  }
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Bound every stage so a stalled SMTP host cannot hold the form submit open.
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
}

/** Best-effort lead notification. Never throws - a mail failure must not lose the lead. */
export async function sendLeadNotification(visit: LeadRow): Promise<void> {
  const transport = createTransport();
  if (!transport) {
    console.warn(`[mail] SMTP not configured, skipped notification for visit ${visit.id}`);
    return;
  }

  const meta = parseMeta(visit.notes);
  const source = meta.source || "website";
  const digits = visit.client_phone.replace(/\D/g, "");

  const rows = Object.entries(meta)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap">${escapeHtml(
          META_LABELS[key] ?? key,
        )}</td><td style="padding:6px 0;font-size:13px;word-break:break-all">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#111827">
  <p style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin:0 0 4px">New consultation request</p>
  <h2 style="margin:0 0 2px;font-size:24px">${escapeHtml(visit.client_name)}</h2>
  <p style="margin:0 0 18px;font-size:20px;font-weight:600">
    <a href="tel:${escapeHtml(visit.client_phone)}" style="color:#b8860b;text-decoration:none">${escapeHtml(visit.client_phone)}</a>
    <a href="https://wa.me/${escapeHtml(digits)}" style="margin-left:10px;font-size:13px;font-weight:500;color:#25D366;text-decoration:none">WhatsApp</a>
  </p>
  <table cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:10px;width:100%">${rows}</table>
  <p style="margin:18px 0 0;font-size:12px;color:#9ca3af">Visit #${visit.id} &middot; manage at https://singlestop.co.in/admin/visits</p>
</div>`;

  const text = [
    `New consultation request`,
    ``,
    `Name:  ${visit.client_name}`,
    `Phone: ${visit.client_phone}`,
    ...Object.entries(meta).map(([key, value]) => `${META_LABELS[key] ?? key}: ${value}`),
    ``,
    `Visit #${visit.id} - https://singlestop.co.in/admin/visits`,
  ].join("\n");

  let timer: NodeJS.Timeout | undefined;
  try {
    await Promise.race([
      transport.sendMail({
        from: process.env.SMTP_FROM || `"Single Stop Website" <${process.env.SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: `New lead: ${visit.client_name} (${source})`,
        text,
        html,
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`send exceeded ${SEND_TIMEOUT_MS}ms`)), SEND_TIMEOUT_MS);
      }),
    ]);
  } catch (err) {
    console.error(`[mail] notification failed for visit ${visit.id}`, err);
  } finally {
    clearTimeout(timer);
    transport.close();
  }
}
