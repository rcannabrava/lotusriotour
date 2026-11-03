import { createFileRoute } from "@tanstack/react-router";
import { DEFAULT_LOCALE, LOCALES, isLocale, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n";
import { getGuides } from "@/lib/guides";
import { absoluteUrl, buildHead } from "@/lib/seo";
import { breadcrumbList, entityGraph } from "@/lib/schema";
import { GuideCard } from "@/components/ui/GuideCard";
import { Section, SectionHeader } from "@/components/ui/Section";

export const Route = createFileRoute("/{-$lang}/guides/")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const d = getDictionary(locale);
    const guides = getGuides(locale);
    return buildHead({
      locale,
      path: "/guides",
      title: d.seo.guides.title,
      description: d.seo.guides.description,
      // an empty index is not worth indexing
      noindex: guides.length === 0,
      // hreflang only to languages that have guides (an empty index is noindex, an invalid alternate)
      locales: LOCALES.map((l) => l.code).filter((code) => getGuides(code).length > 0),
      jsonLd: [
        ...entityGraph(locale),
        breadcrumbList(locale, [
          { name: d.common.home, path: "/" },
          { name: d.nav.guides, path: "/guides" },
        ]),
        {
          "@type": "ItemList",
          itemListElement: guides.map((guide, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: guide.title,
            url: absoluteUrl(localizedPath(locale, `/guides/${guide.slug}`)),
          })),
        },
      ],
    });
  },
  component: GuidesPage,
});

function GuidesPage() {
  const { d, locale } = useI18n();
  const guides = getGuides(locale);

  return (
    <main className="pt-20">
      <Section>
        <SectionHeader
          as="h1"
          eyebrow={d.guides.eyebrow}
          title={d.guides.title}
          intro={d.guides.intro}
        />
        {guides.length ? (
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-muted-foreground">{d.guides.empty}</p>
        )}
      </Section>
    </main>
  );
}
