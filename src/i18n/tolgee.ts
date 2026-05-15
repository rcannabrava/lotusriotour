import { Tolgee, LanguageDetector, LanguageStorage } from "@tolgee/web";

import { DevTools, FormatSimple } from "@tolgee/react";

import { DEFAULT_LANG, LANGUAGES } from "./languages";

const apiKey = import.meta.env.VITE_TOLGEE_API_KEY as string | undefined;
const apiUrl = import.meta.env.VITE_TOLGEE_API_URL as string | undefined;

const isBrowser = typeof window !== "undefined";

let builder = Tolgee().use(DevTools()).use(FormatSimple());
if (isBrowser) {
  builder = builder.use(LanguageDetector()).use(LanguageStorage());
}

export const tolgee = builder.init({
  apiKey,
  apiUrl,
  staticData: undefined,
  observerOptions: {
    fullKeyEncode: true,
  },
  availableLanguages: LANGUAGES.map((l) => l.code),
  defaultLanguage: DEFAULT_LANG,
  fallbackLanguage: DEFAULT_LANG,
});
