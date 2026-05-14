import { Tolgee, DevTools, FormatSimple, LanguageDetector, LanguageStorage } from "@tolgee/web";
import { DEFAULT_LANG, LANGUAGES } from "./languages";

// Tolgee Cloud is the single source of truth. Translations are fetched
// remotely at runtime — no local dictionaries, no staticData.
const apiKey = import.meta.env.VITE_TOLGEE_API_KEY as string | undefined;
const apiUrl = import.meta.env.VITE_TOLGEE_API_URL as string | undefined;
export const tolgee = builder.init({
  apiKey,
  apiUrl,
  availableLanguages: LANGUAGES.map((l) => l.code),
  defaultLanguage: DEFAULT_LANG,
  fallbackLanguage: DEFAULT_LANG,
});
