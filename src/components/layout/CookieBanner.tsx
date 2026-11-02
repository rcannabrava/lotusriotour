import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import { getStoredConsent, isAnalyticsEnabled, setConsent } from "@/lib/analytics/analytics";
import { buttonStyles } from "@/components/ui/button-styles";

/** Consent Mode banner. Renders only when analytics is configured and the visitor has not chosen yet. */
export function CookieBanner() {
  const { d } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isAnalyticsEnabled() && getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-card p-5 shadow-elegant ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">{d.cookies.text}</p>
      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={buttonStyles("outline", "px-5 py-2.5")}
        >
          {d.cookies.decline}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={buttonStyles("primary", "px-5 py-2.5")}
        >
          {d.cookies.accept}
        </button>
      </div>
    </div>
  );
}
