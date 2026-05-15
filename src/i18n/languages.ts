export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pt-BR", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "es-ES", label: "Español", short: "ES", flag: "🇪🇸" },
] as const;
export type Lang = (typeof LANGUAGES)[number]["code"];
export const DEFAULT_LANG: Lang = "en";
