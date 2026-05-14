import { useCallback, useEffect, type ReactNode } from "react";
import { TolgeeProvider, useTolgee } from "@tolgee/react";
import { tolgee } from "./tolgee";

import { DEFAULT_LANG, LANGUAGES, type Lang } from "./languages";

export { useTranslate } from "@tolgee/react";
export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <TolgeeProvider tolgee={tolgee} fallback={null}>
      <HtmlLangSync />
      {children}
    </TolgeeProvider>
  );
}
function isLang(value: string | undefined): value is Lang {
  return !!value && LANGUAGES.some((l) => l.code === value);
}

export function useLanguage() {
  const tg = useTolgee(["language"]);
  const raw = tg.getLanguage();
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
  const setLang = useCallback(
    (l: Lang) => {
      void tg.changeLanguage(l);
    },
    [tg],
  );
  return { lang, setLang };
}
function HtmlLangSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
