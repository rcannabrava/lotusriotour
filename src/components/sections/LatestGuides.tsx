import { useI18n } from "@/i18n";
import { getGuides } from "@/lib/guides";
import { GuideCard } from "@/components/ui/GuideCard";
import { LocalLink } from "@/components/ui/LocalLink";
import { Section, SectionHeader } from "@/components/ui/Section";

/** Home teaser for the newest guides. Renders nothing until at least one guide is published. */
export function LatestGuides() {
  const { d, locale } = useI18n();
  const guides = getGuides(locale).slice(0, 3);
  if (!guides.length) return null;

  return (
    <Section id="guides" tone="soft">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader eyebrow={d.guides.eyebrow} title={d.guides.title} intro={d.guides.intro} />
        <LocalLink to="/guides" className="text-sm font-medium text-foreground hover:text-gold">
          {d.nav.guides} →
        </LocalLink>
      </div>
      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </Section>
  );
}
