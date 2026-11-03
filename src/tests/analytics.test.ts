import { describe, expect, it, vi } from "vitest";
import {
  getStoredConsent,
  initAnalytics,
  isAnalyticsEnabled,
  setConsent,
  subscribeConsent,
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

  it("notifies subscribers when the choice changes (CookieBanner store)", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeConsent(listener);
    setConsent("granted");
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    setConsent("denied");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("keeps the choice for the visit when localStorage is blocked", () => {
    const blocked = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    setConsent("granted");
    expect(getStoredConsent()).toBe("granted");
    blocked.mockRestore();
    vi.restoreAllMocks();
  });
});
