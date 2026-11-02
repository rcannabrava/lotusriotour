import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { tours } from "@/data/tours";
import { format, useI18n } from "@/i18n";
import { LocalLink } from "@/components/ui/LocalLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function Tours({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const { d } = useI18n();
  return (
    <Section id="tours">
      <SectionHeader
        as={headingAs}
        eyebrow={d.tours.eyebrow}
        title={d.tours.title}
        intro={d.tours.intro}
      />

      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => {
          const copy = d.tours.items[tour.id];
          const highlightLabel = tour.highlight ? d.tours.highlights[tour.highlight] : null;
          return (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
            >
              <LocalLink to={`/tours/${tour.id}`} className="block" aria-label={copy.title}>
                <div className="relative aspect-4/5 overflow-hidden">
                  <ResponsiveImage
                    name={tour.imageName}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                    alt={copy.title}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-1200ms group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  {highlightLabel && (
                    <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-foreground">
                      {highlightLabel}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl">{copy.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {copy.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {copy.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </LocalLink>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <LocalLink
                    to={`/tours/${tour.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold"
                  >
                    {d.common.viewTour}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </LocalLink>
                  <WhatsAppLink
                    placement="tour_card"
                    tour={tour.id}
                    message={format(d.tours.inquireMessage, { title: copy.title })}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {d.tours.inquire}
                  </WhatsAppLink>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
