import { createFileRoute, notFound } from "@tanstack/react-router";
import { SITE } from "@/constants/site";
import { getTour } from "@/data/tours";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format, useI18n } from "@/i18n";
import { formatGuideDate, getGuide, getGuides, guideLocales } from "@/lib/guides";
import { absoluteUrl, buildHead } from "@/lib/seo";
import { article, breadcrumbList, entityGraph, faqPage } from "@/lib/schema";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { GuideCard } from "@/components/ui/GuideCard";
import { LocalLink } from "@/components/ui/LocalLink";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal, Section, SectionHeader } from "@/components/ui/Section";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { buttonStyles } from "@/components/ui/button-styles";

export const Route = createFileRoute("/{-$lang}/guides/$slug")({
  beforeLoad: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    if (!getGuide(params.slug, locale)) throw notFound();
  },
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const guide = getGuide(params.slug, locale);
    if (!guide) return {};
    const d = getDictionary(locale);
    const tour = guide.tour ? getTour(guide.tour) : undefined;
    const image = absoluteUrl(tour?.ogImage ?? SITE.ogImage);
    return buildHead({
      locale,
      path: `/guides/${guide.slug}`,
      title: guide.title,
      description: guide.description,
      image,
      type: "article",
      locales: guideLocales(guide.slug),
      // drafts are only visible in preview builds and must never be indexed
      noindex: guide.status === "draft",
      jsonLd: [
        ...entityGraph(locale),
        article(locale, guide, image),
        breadcrumbList(locale, [
          { name: d.common.home, path: "/" },
          { name: d.nav.guides, path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]),
        ...(guide.faq.length ? [faqPage(guide.faq)] : []),
      ],
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const { d, locale } = useI18n();
  const guide = getGuide(slug, locale);
  if (!guide) throw notFound();

  const tour = guide.tour ? getTour(guide.tour) : undefined;
  const tourCopy = tour ? d.tours.items[tour.id] : undefined;
  const related = getGuides(locale)
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 2);

  return (
    <main className="bg-background">
      <article>
        <header className="pt-32 pb-12 lg:pt-40">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <LocalLink to="/" className="hover:text-foreground">
                    {d.common.home}
                  </LocalLink>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <LocalLink to="/guides" className="hover:text-foreground">
                    {d.nav.guides}
                  </LocalLink>
                </li>
              </ol>
            </nav>

            {guide.status === "draft" && (
              <p className="mt-6 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-foreground">
                {d.guides.draft}
              </p>
            )}

            <h1 className="mt-8 font-display text-4xl leading-[1.1] text-foreground text-balance sm:text-5xl lg:text-6xl">
              {guide.title}
            </h1>
            <p className="mt-6 text-sm text-muted-foreground">
              {format(d.guides.by, { name: SITE.guide })} ·{" "}
              <LocalLink to="/about" className="underline decoration-gold underline-offset-4">
                {d.about.role}
              </LocalLink>{" "}
              ·{" "}
              {format(d.guides.updated, {
                date: formatGuideDate(guide.updated ?? guide.date, locale),
              })}{" "}
              · {format(d.guides.minutes, { n: guide.minutes })}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 pb-24 lg:px-10">
          <ResponsiveImage
            name={tour?.imageName ?? "hero-rio"}
            sizes="(min-width: 896px) 832px, 100vw"
            alt=""
            width={1280}
            height={720}
            fetchPriority="high"
            className="aspect-video w-full rounded-2xl object-cover shadow-elegant"
          />

          <aside className="mt-10 rounded-2xl bg-card p-6 shadow-soft ring-1 ring-border sm:p-8">
            <span className="eyebrow text-gold">{d.guides.quickAnswer}</span>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{guide.quickAnswer}</p>
          </aside>

          {guide.toc.length >= 3 && (
            <nav aria-label={d.guides.onThisPage} className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {d.guides.onThisPage}
              </p>
              <ol className="mt-4 space-y-2 text-sm">
                {guide.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-foreground hover:text-primary">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose-lotus mt-12"
            // Markdown is authored in this repository (content/guides) and reviewed in pull requests
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          {tour && tourCopy && (
            <div className="mt-16 overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border sm:flex">
              <ResponsiveImage
                name={tour.imageName}
                sizes="(min-width: 640px) 240px, 100vw"
                alt={tourCopy.title}
                loading="lazy"
                width={640}
                height={800}
                className="h-48 w-full object-cover sm:h-auto sm:w-60"
              />
              <div className="p-6 sm:p-8">
                <span className="eyebrow text-gold">{d.guides.doItWith}</span>
                <h2 className="mt-3 font-display text-2xl text-foreground">{tourCopy.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.guides.doItWithText}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <WhatsAppLink
                    placement="guide"
                    tour={tour.id}
                    message={format(d.tours.inquireMessage, { title: tourCopy.title })}
                    className={buttonStyles("primary", "px-6 py-3")}
                  >
                    {d.cta.button}
                  </WhatsAppLink>
                  <LocalLink
                    to={`/tours/${tour.id}`}
                    className="text-sm font-medium text-foreground hover:text-gold"
                  >
                    {d.common.viewTour} →
                  </LocalLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {guide.faq.length > 0 && (
        <Section tone="soft" width="6xl" className="lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow={d.faq.eyebrow} title={d.guides.faqTitle} />
            </div>
            <div className="lg:col-span-7">
              <FaqAccordion items={guide.faq} />
            </div>
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="lg:py-32">
          <Reveal>
            <SectionHeader eyebrow={d.nav.guides} title={d.guides.relatedGuides} />
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {related.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
