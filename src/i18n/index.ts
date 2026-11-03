import { useParams } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale, localizedPath, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

export * from "./config";
export { getDictionary, format, type Dictionary } from "./dictionaries";

/** Current locale (from the optional /{-$lang} URL segment), dictionary and path helper. */
export function useI18n() {
  const { lang } = useParams({ strict: false }) as { lang?: string };
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return {
    locale,
    d: getDictionary(locale),
    href: (path = "/") => localizedPath(locale, path),
  };
}
