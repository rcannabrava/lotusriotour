import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Testimonials() {
  const { t } = useTranslation();
  const items = t.testimonials.items;

  return (
    <section id="reviews" className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold">{t.testimonials.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-display text-lg text-foreground">
            {t.testimonials.ratingLabel}
          </span>
          <span className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span>· {t.testimonials.reviewsCount}</span>
          <span className="text-foreground/70">· {t.testimonials.source}</span>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl bg-card p-9 shadow-soft ring-1 ring-border"
            >
              <Quote className="text-gold" size={28} />
              <div className="mt-4 flex gap-0.5 text-gold">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-foreground">
                "{item.comment}"
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <div className="font-medium text-foreground">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {item.time}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
