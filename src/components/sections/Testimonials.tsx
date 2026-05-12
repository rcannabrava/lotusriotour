import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Testimonials() {
  const { t } = useTranslation();
  return (
    <section id="reviews" className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold">{t.testimonials.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {testimonials.map((person, i) => {
            const item = t.testimonials.items[i];
            if (!item) return null;
            return (
              <motion.figure
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl bg-card p-9 shadow-soft ring-1 ring-border"
              >
                <Quote className="text-gold" size={28} />
                <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-foreground">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <div className="font-medium text-foreground">{person.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {person.origin} · {item.trip}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
