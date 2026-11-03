import { en, type Dictionary } from "./locales/en";
import { ptBr } from "./locales/pt-br";
import { es } from "./locales/es";
import type { Locale } from "./config";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, "pt-br": ptBr, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replaces {name} placeholders: format("Hi {name}", { name: "Pat" }) */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
