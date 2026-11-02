import { SITE } from "@/constants/site";
import { LOCALES, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { tours } from "@/data/tours";
import { allGuideFiles, getSitemapGuides } from "./guides";
import { absoluteUrl } from "./seo";

/** llms.txt: a plain-text briefing for AI assistants, generated from the English dictionary. */
export function buildLlmsTxt(): string {
  const d = getDictionary("en");

  const tourLines = tours.map((tour) => {
    const copy = d.tours.items[tour.id];
    return `- [${copy.title}](${absoluteUrl(localizedPath("en", `/tours/${tour.id}`))}): ${copy.summary}`;
  });

  const guideLines = getSitemapGuides()
    .filter((g) => g.locales.includes("en"))
    .map((g) => {
      const url = absoluteUrl(localizedPath("en", `/guides/${g.slug}`));
      const guide = allGuideFiles.find((x) => x.slug === g.slug && x.locale === "en");
      return `- [${guide?.title ?? g.slug}](${url})${guide ? `: ${guide.description}` : ""}`;
    });

  const guideSection = guideLines.length ? `## Travel guides\n${guideLines.join("\n")}\n\n` : "";

  const faqLines = d.faq.items.map((item) => `- ${item.q} ${item.a}`);

  const otherLanguages = LOCALES.filter((l) => l.code !== "en").map(
    (l) => `- ${l.label}: ${absoluteUrl(localizedPath(l.code, "/"))}`,
  );

  return `# ${SITE.name}

> Private, tailor-made tours in Rio de Janeiro, Brazil, guided by ${SITE.guide} since ${SITE.foundingYear}. Tours are available in English, Portuguese and Spanish. Every tour is private, with hotel pickup on request. Bookings and quotes are handled directly on WhatsApp.

## About
- Guide and founder: ${SITE.guide}, born and raised in Rio de Janeiro. ${d.about.p1}
- Service area: Rio de Janeiro, Brazil
- Languages: English, Portuguese, Spanish
- Contact (WhatsApp): ${SITE.phone} (${SITE.whatsappUrl})
- Reviews: ${SITE.tripadvisor}

## Tours
${tourLines.join("\n")}

${guideSection}## Frequently asked questions
${faqLines.join("\n")}

## Site in other languages
${otherLanguages.join("\n")}
`;
}
