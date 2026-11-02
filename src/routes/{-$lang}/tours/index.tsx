import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/sections/FAQ";
import { Tours } from "@/components/sections/Tours";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { tours } from "@/data/tours";
import { buildHead, absoluteUrl } from "@/lib/seo";
import { breadcrumbList, entityGraph, faqPage } from "@/lib/schema";
import { localizedPath } from "@/i18n/config";

export const Route = createFileRoute("/{-$lang}/tours/")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const d = getDictionary(locale);
    return buildHead({
      locale,
      path: "/tours",
      title: d.seo.tours.title,
      description: d.seo.tours.description,
      jsonLd: [
        ...entityGraph(locale),
        breadcrumbList(locale, [
          { name: d.common.home, path: "/" },
          { name: d.nav.tours, path: "/tours" },
        ]),
        {
          "@type": "ItemList",
          itemListElement: tours.map((tour, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.tours.items[tour.id].title,
            url: absoluteUrl(localizedPath(locale, `/tours/${tour.id}`)),
          })),
        },
        faqPage(d.faq.items),
      ],
    });
  },
  component: ToursPage,
});

function ToursPage() {
  return (
    <main className="pt-20">
      <Tours headingAs="h1" />
      <FAQ />
    </main>
  );
}
