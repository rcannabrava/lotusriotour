import { LOCALES, localizedPath, type Locale } from "@/i18n/config";
import { tours } from "@/data/tours";
import { getSitemapGuides } from "./guides";
import { absoluteUrl } from "./seo";

export type SitePage = {
  /** Locale-agnostic path */
  path: string;
  /** ISO date (YYYY-MM-DD) */
  lastmod?: string;
  /** Locales in which the page exists (defaults to all) */
  locales?: readonly Locale[];
};

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function getSitePages(): SitePage[] {
  const guides = getSitemapGuides();
  const guideIndexLocales = [...new Set(guides.flatMap((g) => g.locales))];
  return [
    { path: "/" },
    { path: "/tours" },
    ...tours.map((tour) => ({ path: `/tours/${tour.id}` })),
    { path: "/about" },
    ...(guides.length ? [{ path: "/guides", locales: guideIndexLocales }] : []),
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, locales: g.locales, lastmod: g.lastmod })),
  ].map((page) => ({ lastmod: BUILD_DATE, ...page }));
}

/** sitemap.xml with xhtml:link hreflang alternates, so each language version points to the others. */
export function buildSitemap(pages: SitePage[] = getSitePages()): string {
  const urls = pages.flatMap((page) => {
    const locales = page.locales ?? LOCALES.map((l) => l.code);
    const alternates = locales
      .map((code) => {
        const meta = LOCALES.find((l) => l.code === code)!;
        return `    <xhtml:link rel="alternate" hreflang="${meta.htmlLang}" href="${absoluteUrl(localizedPath(code, page.path))}"/>`;
      })
      .concat(
        locales.includes("en")
          ? [
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(localizedPath("en", page.path))}"/>`,
            ]
          : [],
      )
      .join("\n");

    return locales.map(
      (code) =>
        `  <url>\n    <loc>${absoluteUrl(localizedPath(code, page.path))}</loc>\n` +
        (page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>\n` : "") +
        `${alternates}\n  </url>`,
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}
