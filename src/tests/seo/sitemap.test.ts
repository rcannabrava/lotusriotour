import { describe, expect, it } from "vitest";
import { buildSitemap, getSitePages } from "@/lib/seo/sitemap";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { tours } from "@/data/tours";

describe("sitemap", () => {
  const xml = buildSitemap();

  it("contains every page in every language", () => {
    const pages = getSitePages();
    expect(pages.length).toBe(3 + tours.length);
    for (const loc of [
      "https://lotusriotour.com/",
      "https://lotusriotour.com/pt-br",
      "https://lotusriotour.com/es/tours/helicopter",
    ]) {
      expect(xml).toContain(`<loc>${loc}</loc>`);
    }
    expect((xml.match(/<url>/g) ?? []).length).toBe(pages.length * 3);
  });

  it("links the language alternates", () => {
    expect(xml).toContain('hreflang="pt-BR" href="https://lotusriotour.com/pt-br/tours"');
    expect(xml).toContain('hreflang="x-default" href="https://lotusriotour.com/tours"');
  });

  it("omits lastmod on pages without a known content date", () => {
    // a build or request time is not a modification date (on Workers it would even be 1970)
    const staticPages = getSitePages().filter((p) => !p.path.startsWith("/guides/"));
    expect(staticPages.filter((p) => p.lastmod !== undefined)).toEqual([]);
    expect(xml).not.toContain("<lastmod>1970");
  });

  it("never lists the redundant /en prefix", () => {
    expect(xml).not.toContain("lotusriotour.com/en");
  });
});

describe("llms.txt", () => {
  const txt = buildLlmsTxt();

  it("introduces the business and links every tour", () => {
    expect(txt).toContain("# Lotus Rio Tour");
    expect(txt).toContain("Patricia Cannabrava");
    for (const tour of tours) expect(txt).toContain(`/tours/${tour.id})`);
  });
});
