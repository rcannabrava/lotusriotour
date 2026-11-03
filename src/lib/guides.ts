import { Marked } from "marked";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { tours, type TourId } from "@/data/tours";
import { LOCALES, localizedPath, type Locale } from "@/i18n/config";

/**
 * Travel guides live in content/guides/<slug>/<locale>.md (see content/guides/README.md).
 * Files are bundled at build time; visibility (status + date) is evaluated on every request.
 */
const files = import.meta.glob<string>("/content/guides/*/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const SHOW_DRAFTS = import.meta.env.VITE_SHOW_DRAFTS === "true";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD");
const tourIds = tours.map((t) => t.id) as [TourId, ...TourId[]];

export const frontmatterSchema = z.object({
  title: z.string().min(10).max(90),
  /** Google truncates around 155-160 characters */
  description: z.string().min(50).max(160),
  date: isoDate,
  updated: isoDate.optional(),
  status: z.enum(["draft", "published"]),
  tour: z.enum(tourIds).optional(),
  /** 1-3 sentence direct answer, shown at the top and cited by search and AI engines */
  quickAnswer: z.string().min(40),
  faq: z.array(z.object({ q: z.string().min(5), a: z.string().min(10) })).default([]),
});

export type Guide = z.infer<typeof frontmatterSchema> & {
  slug: string;
  locale: Locale;
  html: string;
  toc: { id: string; text: string }[];
  minutes: number;
};

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderer(locale: Locale) {
  return new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(tokens.map((t) => t.raw).join(""));
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        // "/path" is internal; "//host" is protocol-relative, i.e. external
        if (href.startsWith("/") && !href.startsWith("//")) {
          const [path, hash] = href.split("#");
          const url = localizedPath(locale, path) + (hash ? `#${hash}` : "");
          return `<a href="${escapeAttr(url)}"${titleAttr}>${text}</a>`;
        }
        if (href.startsWith("#")) return `<a href="${escapeAttr(href)}"${titleAttr}>${text}</a>`;
        return `<a href="${escapeAttr(href)}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
      },
    },
  });
}

function splitFrontmatter(raw: string): { data: unknown; body: string } {
  const match = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("missing frontmatter block (--- ... ---)");
  return { data: parseYaml(match[1]), body: match[2] };
}

export function parseGuide(path: string, raw: string): Guide {
  const [, slug, localeCode] = path.match(/\/content\/guides\/([^/]+)\/([^/]+)\.md$/) ?? [];
  const locale = LOCALES.find((l) => l.code === localeCode)?.code;
  if (!slug || !locale) throw new Error(`unknown locale in file name (${localeCode})`);

  const { data, body } = splitFrontmatter(raw);
  const meta = frontmatterSchema.parse(data);
  const marked = renderer(locale);
  const toc = marked
    .lexer(body)
    .flatMap((token) => (token.type === "heading" && token.depth === 2 ? [token] : []))
    .map((token) => ({ id: slugify(token.raw), text: token.text }));
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    ...meta,
    slug,
    locale,
    html: marked.parse(body, { async: false }),
    toc,
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

function loadAll() {
  const guides: Guide[] = [];
  const errors: string[] = [];
  for (const [path, raw] of Object.entries(files)) {
    try {
      guides.push(parseGuide(path, raw));
    } catch (error) {
      // The site keeps working; the test suite (guides.test.ts) fails CI on any error
      errors.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return { guides, errors };
}

const loaded = loadAll();

export const guideLoadErrors = loaded.errors;
export const allGuideFiles = loaded.guides;

const today = () => new Date().toISOString().slice(0, 10);

export function isVisible(guide: Guide, now = today()): boolean {
  return SHOW_DRAFTS || (guide.status === "published" && guide.date <= now);
}

/** Visible guides in a locale, newest first. */
export function getGuides(locale: Locale): Guide[] {
  return loaded.guides
    .filter((g) => g.locale === locale && isVisible(g))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getGuide(slug: string, locale: Locale): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

/** Locales in which a guide is visible, so hreflang and the language switcher only point to real pages. */
export function guideLocales(slug: string): Locale[] {
  return LOCALES.map((l) => l.code).filter((code) => getGuide(slug, code));
}

/** Guides that can appear in the sitemap (never drafts), with their locales. */
export function getSitemapGuides() {
  const slugs = [...new Set(loaded.guides.map((g) => g.slug))];
  const now = today();
  return slugs
    .map((slug) => {
      const published = loaded.guides.filter(
        (g) => g.slug === slug && g.status === "published" && g.date <= now,
      );
      const locales = LOCALES.map((l) => l.code).filter((code) =>
        published.some((g) => g.locale === code),
      );
      // only public versions count: a draft or a translation scheduled later must not
      // advertise a future date for the pages that are already live
      const lastmod = published
        .map((g) => g.updated ?? g.date)
        .filter((date) => date <= now)
        .sort()
        .pop();
      return { slug, locales, lastmod };
    })
    .filter((g) => g.locales.length > 0);
}

export function formatGuideDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
