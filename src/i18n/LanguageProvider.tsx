import { useCallback, useEffect, type ReactNode } from "react";
import { TolgeeProvider, useTolgee } from "@tolgee/react";
import { tolgee } from "./tolgee";
import { useLanguage } from "./languages";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <TolgeeProvider tolgee={tolgee} fallback={null}>
      <HtmlLangSync />
      {children}
    </TolgeeProvider>
  );
}

function HtmlLangSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
