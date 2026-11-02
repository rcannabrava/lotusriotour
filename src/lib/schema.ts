import { FACTS, SITE } from "@/constants/site";
import { getLocaleMeta, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { TourMeta } from "@/data/tours";
import type { Guide } from "./guides";
import { absoluteUrl } from "./seo";

const ids = {
  business: `${SITE.url}/#business`,
  person: `${SITE.url}/#patricia`,
  website: `${SITE.url}/#website`,
};

const LANGUAGES = ["English", "Portuguese", "Spanish"];

const sameAs = () =>
  [SITE.instagram, SITE.facebook, SITE.tripadvisor, FACTS.googleBusinessUrl].filter(Boolean);

/** Business, guide and website entities. Included on every page so AI engines can resolve "who is Lotus / Patricia". */
export function entityGraph(locale: Locale) {
  const d = getDictionary(locale);

  const business = {
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ids.business,
    name: SITE.name,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    description: d.seo.organizationDescription,
    telephone: SITE.phone,
    foundingDate: String(SITE.foundingYear),
    founder: { "@id": ids.person },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: "Rio de Janeiro" },
    availableLanguage: LANGUAGES,
    knowsLanguage: ["en", "pt", "es"],
    sameAs: sameAs(),
    ...(FACTS.priceRange && { priceRange: FACTS.priceRange }),
    ...(FACTS.rating &&
      FACTS.reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: FACTS.rating,
          reviewCount: FACTS.reviewCount,
          bestRating: 5,
        },
      }),
  };

  const person = {
    "@type": "Person",
    "@id": ids.person,
    name: SITE.guide,
    jobTitle: d.about.role,
    worksFor: { "@id": ids.business },
    knowsLanguage: ["en", "pt", "es"],
    knowsAbout: [
      "Rio de Janeiro",
      "Private tours",
      "Christ the Redeemer",
      "Sugarloaf Mountain",
      "Tijuca Forest",
      "Brazilian Carnival",
    ],
    sameAs: sameAs(),
    ...(FACTS.cadastur && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Cadastur (Brazilian Ministry of Tourism)",
        identifier: FACTS.cadastur,
      },
    }),
  };

  const website = {
    "@type": "WebSite",
    "@id": ids.website,
    url: SITE.url,
    name: SITE.name,
    inLanguage: getLocaleMeta(locale).htmlLang,
    publisher: { "@id": ids.business },
  };

  return [business, person, website];
}

export function faqPage(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbList(locale: Locale, crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(localizedPath(locale, crumb.path)),
    })),
  };
}

export function touristTrip(locale: Locale, tour: TourMeta, imageUrl: string) {
  const d = getDictionary(locale);
  const copy = d.tours.items[tour.id];
  return {
    "@type": "TouristTrip",
    "@id": `${absoluteUrl(localizedPath(locale, `/tours/${tour.id}`))}#trip`,
    name: copy.title,
    description: copy.summary,
    url: absoluteUrl(localizedPath(locale, `/tours/${tour.id}`)),
    image: imageUrl,
    inLanguage: getLocaleMeta(locale).htmlLang,
    touristType: "Private tour",
    provider: { "@id": ids.business },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.attractions.map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name },
      })),
    },
    ...(tour.priceFrom && {
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: tour.priceFrom,
        url: absoluteUrl(localizedPath(locale, `/tours/${tour.id}`)),
        seller: { "@id": ids.business },
      },
    }),
  };
}

export function article(locale: Locale, guide: Guide, imageUrl: string) {
  const url = absoluteUrl(localizedPath(locale, `/guides/${guide.slug}`));
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    image: imageUrl,
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    inLanguage: getLocaleMeta(locale).htmlLang,
    mainEntityOfPage: url,
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
  };
}

/** About page: marks Patricia as the main entity so search and AI engines connect the page to the Person node. */
export function profilePage(locale: Locale) {
  const url = absoluteUrl(localizedPath(locale, "/about"));
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    inLanguage: getLocaleMeta(locale).htmlLang,
    mainEntity: { "@id": ids.person },
  };
}
