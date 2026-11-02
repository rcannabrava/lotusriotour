import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Clock, Globe, Car, Users, Tag } from "lucide-react";
import { getTour, tours } from "@/data/tours";
import { DEFAULT_LOCALE, isLocale, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format, useI18n } from "@/i18n";
import { buildHead, absoluteUrl } from "@/lib/seo";
import { breadcrumbList, entityGraph, faqPage, touristTrip } from "@/lib/schema";
import { LocalLink } from "@/components/ui/LocalLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal, Section, SectionHeader } from "@/components/ui/Section";
import { buttonStyles } from "@/components/ui/button-styles";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export const Route = createFileRoute("/{-$lang}/tours/$tourId")({
  beforeLoad: ({ params }) => {
    if (!getTour(params.tourId)) throw notFound();
  },
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const tour = getTour(params.tourId);
    if (!tour) return {};
    const d = getDictionary(locale);
    const copy = d.tours.items[tour.id];
    const image = absoluteUrl(tour.ogImage);
    return buildHead({
      locale,
      path: `/tours/${tour.id}`,
      title: copy.seoTitle,
      description: copy.seoDescription,
      image,
      jsonLd: [
        ...entityGraph(locale),
        touristTrip(locale, tour, image),
        breadcrumbList(locale, [
          { name: d.common.home, path: "/" },
          { name: d.nav.tours, path: "/tours" },
          { name: copy.title, path: `/tours/${tour.id}` },
        ]),
        faqPage(copy.faq),
      ],
    });
  },
  component: TourPage,
});

function TourPage() {
  const { tourId } = Route.useParams();
  const { d, href, locale } = useI18n();
  const tour = getTour(tourId);
  if (!tour) throw notFound();

  const copy = d.tours.items[tour.id];
  const page = d.tourPage;
  const message = format(d.tours.inquireMessage, { title: copy.title });

  const facts = [
    { Icon: Clock, label: page.duration, value: copy.duration },
    { Icon: Globe, label: page.languages, value: page.languagesValue },
    { Icon: Car, label: page.pickup, value: page.pickupValue },
    { Icon: Users, label: page.group, value: page.groupValue },
    ...(tour.priceFrom
      ? [
          {
            Icon: Tag,
            label: page.from,
            value: new Intl.NumberFormat(locale, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(tour.priceFrom),
          },
        ]
      : []),
  ];

  return (
    <main className="bg-background">
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <LocalLink to="/" className="hover:text-foreground">
                    {d.common.home}
                  </LocalLink>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <LocalLink to="/tours" className="hover:text-foreground">
                    {d.nav.tours}
                  </LocalLink>
                </li>
                <li aria-hidden>›</li>
                <li aria-current="page" className="text-foreground">
                  {copy.title}
                </li>
              </ol>
            </nav>

            <span className="eyebrow mt-8 block text-gold">{copy.location}</span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground text-balance sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.summary}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WhatsAppLink
                placement="tour_page"
                tour={tour.id}
                message={message}
                className={buttonStyles("primary")}
              >
                {d.cta.button}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </WhatsAppLink>
              <LocalLink to="/tours" className={buttonStyles("outline")}>
                {d.common.allTours}
              </LocalLink>
            </div>

            <dl className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-primary">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <ResponsiveImage
              name={tour.imageName}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={copy.title}
              width={1280}
              height={1600}
              fetchPriority="high"
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-elegant"
            />
          </div>
        </div>
      </section>

      <Section tone="soft" className="lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              {page.highlightsTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {copy.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/85">
                  <Check size={18} className="mt-1 shrink-0 text-primary" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
              <h2 className="font-display text-xl text-foreground">{page.includedTitle}</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {page.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
              <h2 className="font-display text-xl text-foreground">{page.goodToKnowTitle}</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm text-muted-foreground marker:text-gold">
                {page.goodToKnow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section width="6xl" className="lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={d.faq.eyebrow} title={page.faqTitle} />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={copy.faq} />
          </div>
        </div>
      </Section>

      <Section tone="deep" width="4xl" className="text-center lg:py-32">
        <Reveal>
          <span className="eyebrow text-gold">{copy.title}</span>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] text-balance sm:text-5xl">
            {page.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">{page.ctaText}</p>
          <WhatsAppLink
            placement="tour_page"
            tour={tour.id}
            message={message}
            className={buttonStyles("primary", "mt-10")}
          >
            {d.cta.button}
          </WhatsAppLink>
        </Reveal>
      </Section>

      <Section className="lg:py-32">
        <SectionHeader eyebrow={d.nav.tours} title={page.moreToursTitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours
            .filter((other) => other.id !== tour.id)
            .slice(0, 3)
            .map((other) => {
              const otherCopy = d.tours.items[other.id];
              return (
                <LocalLink
                  key={other.id}
                  to={`/tours/${other.id}`}
                  className="group overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
                >
                  <ResponsiveImage
                    name={other.imageName}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    alt={otherCopy.title}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="aspect-4/3 w-full object-cover transition-transform duration-1200ms group-hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl text-foreground">{otherCopy.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{otherCopy.duration}</p>
                  </div>
                </LocalLink>
              );
            })}
        </div>
      </Section>
    </main>
  );
}
