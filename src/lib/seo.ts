import { SITE } from "@/constants/site";
import { LOCALES, getLocaleMeta, localizedPath, type Locale } from "@/i18n/config";

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** hreflang alternates for a locale-agnostic path, plus x-default (English). */
export function alternateLinks(
  path: string,
  locales: readonly Locale[] = LOCALES.map((l) => l.code),
) {
  const links: { rel: string; hrefLang: string; href: string }[] = locales.map((code) => ({
    rel: "alternate",
    hrefLang: getLocaleMeta(code).htmlLang,
    href: absoluteUrl(localizedPath(code, path)),
  }));
  if (locales.includes("en")) {
    links.push({
      rel: "alternate",
      hrefLang: "x-default",
      href: absoluteUrl(localizedPath("en", path)),
    });
  }
  return links;
}

type BuildHeadInput = {
  locale: Locale;
  /** Locale-agnostic path: "/", "/tours", "/tours/boat" */
  path: string;
  title: string;
  description: string;
  /** Absolute URL or site-relative path of the social image */
  image?: string;
  type?: "website" | "article";
  /** One or more schema.org nodes, emitted as a single @graph */
  jsonLd?: object[];
  /** Locales that really exist for this page (defaults to all) */
  locales?: readonly Locale[];
  noindex?: boolean;
};

/** Head tags for a route: title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD. */
export function buildHead({
  locale,
  path,
  title,
  description,
  image = SITE.ogImage,
  type = "website",
  jsonLd,
  locales = LOCALES.map((l) => l.code),
  noindex,
}: BuildHeadInput) {
  const url = absoluteUrl(localizedPath(locale, path));
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const meta = [
    { title },
    { name: "description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:locale", content: getLocaleMeta(locale).ogLocale },
    ...locales
      .filter((code) => code !== locale)
      .map((code) => ({ property: "og:locale:alternate", content: getLocaleMeta(code).ogLocale })),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];

  const links = [{ rel: "canonical", href: url }, ...alternateLinks(path, locales)];

  const scripts = jsonLd?.length
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd }),
        },
      ]
    : [];

  return { meta, links, scripts };
}
