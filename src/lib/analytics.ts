/**
 * GA4 with Consent Mode v2. Nothing loads without VITE_GA_ID (dev, tests, previews),
 * and analytics storage stays denied until the visitor accepts the cookie banner.
 */
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const CONSENT_KEY = "lotus-consent";

export type Consent = "granted" | "denied";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const isBrowser = () => typeof window !== "undefined";

export function isAnalyticsEnabled(): boolean {
  return isBrowser() && !!GA_ID;
}

export function getStoredConsent(): Consent | null {
  if (!isBrowser()) return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

// gtag.js only understands the `arguments` object, not a plain array
function gtag(..._args: unknown[]) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

let initialized = false;

export function initAnalytics(): void {
  if (!isAnalyticsEnabled() || initialized) return;
  initialized = true;

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (getStoredConsent() === "granted") gtag("consent", "update", { analytics_storage: "granted" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

export function setConsent(value: Consent): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: the choice only lasts for this visit */
  }
  if (isAnalyticsEnabled()) {
    gtag("consent", "update", { analytics_storage: value });
  }
}

export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  if (!isAnalyticsEnabled()) return;
  gtag("event", name, params);
}

export type WhatsAppPlacement =
  "hero" | "navbar" | "float" | "cta" | "footer" | "tour_card" | "tour_page" | "guide";

export function trackWhatsAppClick(params: {
  placement: WhatsAppPlacement;
  locale: string;
  tour?: string;
}) {
  trackEvent("whatsapp_click", params);
}
