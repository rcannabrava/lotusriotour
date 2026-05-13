import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LANG, LANGUAGES, translations, type Dictionary, type Lang } from "./translations";

const STORAGE_KEY = "lotus.lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<Ctx | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  if (nav.startsWith("pt")) return "pt-BR";
  if (nav.startsWith("es")) return "es";
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}
