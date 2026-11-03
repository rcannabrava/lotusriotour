import { describe, expect, it } from "vitest";
import {
  getStoredConsent,
  initAnalytics,
  isAnalyticsEnabled,
  setConsent,
  trackEvent,
} from "@/lib/analytics";

describe("analytics", () => {
  it("is disabled without VITE_GA_ID", () => {
    expect(isAnalyticsEnabled()).toBe(false);
  });

  it("loads nothing and does not throw when disabled", () => {
    initAnalytics();
    trackEvent("whatsapp_click", { placement: "hero" });
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });

  it("remembers the consent choice", () => {
    expect(getStoredConsent()).toBeNull();
    setConsent("denied");
    expect(getStoredConsent()).toBe("denied");
  });
});
