import { describe, expect, it } from "vitest";
import { LOCALES, isLocale, localizedPath, stripLocale } from "@/i18n/config";
import { format, getDictionary } from "@/i18n/dictionaries";
import { tours } from "@/data/tours";
import { testimonials } from "@/data/testimonials";

describe("locales", () => {
  it("supports en, pt-br and es", () => {
    expect(LOCALES.map((l) => l.code)).toEqual(["en", "pt-br", "es"]);
  });

  it("validates locale codes", () => {
    expect(isLocale("pt-br")).toBe(true);
    expect(isLocale("tours")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("localizedPath", () => {
  it("keeps English without prefix", () => {
    expect(localizedPath("en", "/")).toBe("/");
    expect(localizedPath("en", "/tours/boat")).toBe("/tours/boat");
  });

  it("prefixes other languages", () => {
    expect(localizedPath("pt-br", "/")).toBe("/pt-br");
    expect(localizedPath("es", "/tours/boat")).toBe("/es/tours/boat");
  });

  it("stripLocale is the inverse", () => {
    expect(stripLocale("/pt-br")).toBe("/");
    expect(stripLocale("/es/tours/boat")).toBe("/tours/boat");
    expect(stripLocale("/tours/")).toBe("/tours");
  });
});

type Shape = string | Shape[] | { [key: string]: Shape };

function collect(node: Shape, path = ""): { path: string; value: string }[] {
  if (typeof node === "string") return [{ path, value: node }];
  const entries = Array.isArray(node)
    ? node.map((v, i) => [String(i), v] as const)
    : Object.entries(node);
  return entries.flatMap(([key, value]) => collect(value, path ? `${path}.${key}` : key));
}

describe("dictionaries", () => {
  const en = collect(getDictionary("en") as Shape);

  for (const locale of LOCALES.map((l) => l.code).filter((c) => c !== "en")) {
    it(`${locale} has exactly the same keys as English (including array lengths)`, () => {
      const other = collect(getDictionary(locale) as Shape);
      expect(other.map((e) => e.path).sort()).toEqual(en.map((e) => e.path).sort());
    });
  }

  for (const code of LOCALES.map((l) => l.code)) {
    it(`${code} has no empty strings`, () => {
      const empty = collect(getDictionary(code) as Shape).filter((e) => !e.value.trim());
      expect(empty).toEqual([]);
    });

    it(`${code} has copy for every tour and review`, () => {
      const d = getDictionary(code);
      for (const tour of tours) {
        const copy = d.tours.items[tour.id];
        expect(copy.title).toBeTruthy();
        expect(copy.seoDescription.length).toBeLessThanOrEqual(165);
        expect(copy.faq.length).toBeGreaterThan(0);
      }
      for (const t of testimonials) {
        expect(d.testimonials.reviews[t.id as keyof typeof d.testimonials.reviews]).toBeTruthy();
      }
    });
  }
});

describe("format", () => {
  it("replaces placeholders", () => {
    expect(format("Hi {name}", { name: "Pat" })).toBe("Hi Pat");
  });
});
