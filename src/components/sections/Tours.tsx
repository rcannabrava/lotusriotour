import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { tours } from "@/data/tours";
import { SITE } from "@/constants/site";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Tours() {
  const { t } = useTranslation();
  return (
    <section id="tours" className="relative bg-secondary/40 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-gold">{t.tours.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground text-balance sm:text-5xl">
              {t.tours.title}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">{t.tours.intro}</p>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => {
            const item = t.tours.items[tour.id];
            const highlightLabel = tour.highlight ? t.tours.highlights[tour.highlight] : null;
            return (
              <motion.article
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={item.title}
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
                    <h3 className="font-display text-2xl">{item.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <a
                    href={`${SITE.whatsappUrl}?text=${encodeURIComponent(
                      t.tours.inquireMessage(item.title),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold"
                  >
                    {t.tours.inquire}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
