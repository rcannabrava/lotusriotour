export const LOCALES = [
  { code: "en", htmlLang: "en", ogLocale: "en_US", label: "English", short: "EN", flag: "🇬🇧" },
  {
    code: "pt-br",
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    label: "Português",
    short: "PT",
    flag: "🇧🇷",
  },
  { code: "es", htmlLang: "es", ogLocale: "es_ES", label: "Español", short: "ES", flag: "🇪🇸" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && LOCALES.some((l) => l.code === value);
}

export function getLocaleMeta(locale: Locale) {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/**
 * Builds a public path for a locale. English (default) has no prefix.
 * localizedPath("pt-br", "/tours/boat") -> "/pt-br/tours/boat"
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/** Removes the locale prefix: "/pt-br/tours/boat" -> "/tours/boat", "/es" -> "/" */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE)
    return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  return pathname.replace(/\/$/, "") || "/";
}
