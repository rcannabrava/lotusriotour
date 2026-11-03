import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tours } from "@/components/sections/Tours";
import { WhyLotus } from "@/components/sections/WhyLotus";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LatestGuides } from "@/components/sections/LatestGuides";
import { CTA } from "@/components/sections/CTA";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildHead } from "@/lib/seo";
import { entityGraph, faqPage } from "@/lib/schema";

export const Route = createFileRoute("/{-$lang}/")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const d = getDictionary(locale);
    return buildHead({
      locale,
      path: "/",
      title: d.seo.home.title,
      description: d.seo.home.description,
      jsonLd: [...entityGraph(locale), faqPage(d.faq.items)],
    });
  },
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Tours />
      <WhyLotus />
      <Testimonials />
      <LatestGuides />
      <FAQ />
      <CTA />
    </main>
  );
}
