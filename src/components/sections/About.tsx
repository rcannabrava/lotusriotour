import { motion } from "framer-motion";
import aboutImg from "@/assets/about-rio.jpg";
import { SITE } from "@/constants/site";
import { useTranslation } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useTranslation();
  const stats = [
    { value: "10+", label: t.about.stats.years },
    { value: "3", label: t.about.stats.languages },
    { value: "1k+", label: t.about.stats.travelers },
    { value: "5★", label: t.about.stats.rating },
  ];
  return (
    <section id="about" className="relative bg-background py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <img
              src={aboutImg}
              alt="Colorful colonial street in Santa Teresa, Rio de Janeiro"
              loading="lazy"
              width={1280}
              height={1600}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-elegant"
            />
            <div className="absolute -bottom-8 -right-6 hidden rounded-2xl bg-card p-6 shadow-elegant ring-1 ring-border lg:block">
              <p className="font-display text-2xl text-foreground">{SITE.guide}</p>
              <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                {t.about.role}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <span className="eyebrow text-gold">{t.about.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-foreground text-balance sm:text-5xl">
            {t.about.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

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
        </motion.div>
      </div>
    </section>
  );
}
