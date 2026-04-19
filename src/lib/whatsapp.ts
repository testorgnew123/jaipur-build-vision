// WhatsApp prefill helper. Replace WHATSAPP_NUMBER with the real number before launch.
export const WHATSAPP_NUMBER = "919876543210"; // placeholder — country code + number, no +

type WhatsAppContext =
  | "hero"
  | "pricing"
  | "finance"
  | "project"
  | "contact"
  | "exit-intent"
  | "general"
  | "nri";

const messages: Record<WhatsAppContext, (extra?: string) => string> = {
  hero: () =>
    "Hi SingleStop, I'd like a free consultation for my construction project in Jaipur.",
  pricing: () =>
    "Hi SingleStop, I'd like more details on your construction packages and pricing.",
  finance: () =>
    "Hi SingleStop, I'd like guidance on construction finance and home loan eligibility.",
  project: (name) =>
    `Hi SingleStop, I'm interested in a project similar to ${name ?? "the one on your website"}. Can we discuss?`,
  contact: () => "Hi SingleStop, I'd like to get in touch about a new project.",
  "exit-intent": () =>
    "Hi SingleStop, I'd like to claim my free 30-min consultation and cost estimate.",
  nri: () =>
    "Hi SingleStop, I'm an NRI and would like to discuss building a home in Jaipur remotely.",
  general: () => "Hi SingleStop, I have a question about your services.",
};

export function buildWhatsAppUrl(context: WhatsAppContext = "general", extra?: string) {
  const text = encodeURIComponent(messages[context](extra));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
