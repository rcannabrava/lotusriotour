import { useTolgee } from "@tolgee/react";
import { useCallback, useEffect } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pt-BR", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "es-ES", label: "Español", short: "ES", flag: "🇪🇸" },
] as const;
export type Lang = (typeof LANGUAGES)[number]["code"];
export const DEFAULT_LANG: Lang = "en";

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
