import { format, useI18n } from "@/i18n";
import { getTour } from "@/data/tours";
import { formatGuideDate, type Guide } from "@/lib/content/guides";
import { LocalLink } from "./LocalLink";
import { ResponsiveImage } from "./ResponsiveImage";

/** Card for the guides index, the home page and "keep reading". Same pattern as the tour card. */
export function GuideCard({ guide }: { guide: Guide }) {
  const { d, locale } = useI18n();
  const image = (guide.tour && getTour(guide.tour)?.imageName) ?? "hero-rio";
  return (
    <LocalLink
      to={`/guides/${guide.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
    >
      <ResponsiveImage
        name={image}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        alt=""
        loading="lazy"
        width={1280}
        height={960}
        className="aspect-4/3 w-full object-cover transition-transform duration-1200ms group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {format(d.guides.minutes, { n: guide.minutes })} ·{" "}
          {formatGuideDate(guide.updated ?? guide.date, locale)}
        </p>
        <h3 className="mt-3 font-display text-xl text-foreground">{guide.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-gold">
          {d.guides.readGuide}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </LocalLink>
  );
}
