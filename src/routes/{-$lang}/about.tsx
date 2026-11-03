import { createFileRoute } from "@tanstack/react-router";
import { Check, Facebook, Instagram, Star } from "lucide-react";
import { FACTS, SITE, STATS } from "@/constants/site";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n";
import { buildHead } from "@/lib/seo/seo";
import { breadcrumbList, entityGraph, profilePage } from "@/lib/seo/schema";
import { LocalLink } from "@/components/ui/LocalLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Reveal, Section } from "@/components/ui/Section";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { buttonStyles } from "@/components/ui/button-styles";

export const Route = createFileRoute("/{-$lang}/about")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const d = getDictionary(locale);
    return buildHead({
      locale,
      path: "/about",
      title: d.seo.about.title,
      description: d.seo.about.description,
      jsonLd: [
        ...entityGraph(locale),
        profilePage(locale),
        breadcrumbList(locale, [
          { name: d.common.home, path: "/" },
          { name: d.aboutPage.eyebrow, path: "/about" },
        ]),
      ],
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { d } = useI18n();
  const page = d.aboutPage;
  const stats = [
    { value: STATS.years, label: d.about.stats.years },
    { value: STATS.languages, label: d.about.stats.languages },
    { value: STATS.travelers, label: d.about.stats.travelers },
    { value: STATS.rating, label: d.about.stats.rating },
  ];

  const links = [
    { href: SITE.tripadvisor, label: page.tripadvisor, Icon: Star },
    { href: SITE.instagram, label: page.instagram, Icon: Instagram },
    { href: SITE.facebook, label: page.facebook, Icon: Facebook },
  ];

  return (
    <main className="bg-background">
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-7">
            <span className="eyebrow text-gold">{page.eyebrow}</span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground text-balance sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{page.lead}</p>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-border pl-4">
                  <dt className="font-display text-3xl text-foreground">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <ResponsiveImage
              name="about-rio"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={d.about.imageAlt}
              width={1280}
              height={1600}
              fetchPriority="high"
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-elegant"
            />
          </div>
        </div>
      </section>

      <Section tone="soft" width="6xl" className="lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">{page.storyTitle}</h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="space-y-5 leading-relaxed text-muted-foreground lg:col-span-7"
          >
            <p>{d.about.p1}</p>
            <p>{d.about.p2}</p>
          </Reveal>
        </div>
      </Section>

      <Section width="6xl" className="lg:py-32">
        <Reveal>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">{page.howTitle}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {page.how.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-primary">
                  <Check size={18} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl text-foreground">{page.languagesTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{page.languagesText}</p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl text-foreground">{page.findTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {links.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-foreground hover:text-primary"
                  >
                    <Icon size={16} strokeWidth={1.6} className="text-gold" />
                    {label}
                  </a>
                </li>
              ))}
              {FACTS.cadastur && (
                <li className="text-muted-foreground">
                  {page.cadastur}: {FACTS.cadastur}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="deep" width="4xl" className="text-center lg:py-32">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.1] text-balance sm:text-5xl">
            {page.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">{page.ctaText}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <WhatsAppLink placement="cta" className={buttonStyles("primary")}>
              {d.cta.button}
            </WhatsAppLink>
            <LocalLink to="/tours" className={buttonStyles("ghost")}>
              {d.common.allTours}
            </LocalLink>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
