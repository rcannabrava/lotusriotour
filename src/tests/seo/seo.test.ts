import { describe, expect, it } from "vitest";
import { alternateLinks, buildHead } from "@/lib/seo/seo";

type Tag = Record<string, string>;
const find = (tags: Tag[], key: string, value: string) => tags.find((t) => t[key] === value);

describe("buildHead", () => {
  const head = buildHead({
    locale: "pt-br",
    path: "/tours/boat",
    title: "Título",
    description: "Descrição",
  });

  it("builds an absolute, locale-aware canonical", () => {
    expect(find(head.links, "rel", "canonical")?.href).toBe(
      "https://lotusriotour.com/pt-br/tours/boat",
    );
  });

  it("lists every language plus x-default", () => {
    const alternates = head.links.filter((l) => l.rel === "alternate") as Tag[];
    expect(alternates.map((l) => l.hrefLang)).toEqual(["en", "pt-BR", "es", "x-default"]);
    expect(find(alternates, "hrefLang", "x-default")?.href).toBe(
      "https://lotusriotour.com/tours/boat",
    );
  });

  it("sets Open Graph locale and alternates", () => {
    const meta = head.meta as unknown as Tag[];
    expect(find(meta, "property", "og:locale")?.content).toBe("pt_BR");
    expect(meta.filter((m) => m.property === "og:locale:alternate").map((m) => m.content)).toEqual([
      "en_US",
      "es_ES",
    ]);
  });

  it("uses an absolute social image", () => {
    expect(find(head.meta as unknown as Tag[], "property", "og:image")?.content).toMatch(
      /^https:\/\/lotusriotour\.com\//,
    );
  });

  it("only advertises existing translations", () => {
    const links = alternateLinks("/guides/x", ["en", "es"]);
    expect(links.map((l) => l.hrefLang)).toEqual(["en", "es", "x-default"]);
  });

  it("emits JSON-LD as a single @graph", () => {
    const withLd = buildHead({
      locale: "en",
      path: "/",
      title: "t",
      description: "d",
      jsonLd: [{ "@type": "WebSite" }],
    });
    const parsed = JSON.parse(withLd.scripts[0].children);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"]).toHaveLength(1);
  });
});
