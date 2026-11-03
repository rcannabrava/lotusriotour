import { motion } from "framer-motion";
import { SITE, STATS } from "@/constants/site";
import { useI18n } from "@/i18n";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { LocalLink } from "@/components/ui/LocalLink";

export function About() {
  const { d } = useI18n();
  const stats = [
    { value: STATS.years, label: d.about.stats.years },
    { value: STATS.languages, label: d.about.stats.languages },
    { value: STATS.travelers, label: d.about.stats.travelers },
    { value: STATS.rating, label: d.about.stats.rating },
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
            <ResponsiveImage
              name="about-rio"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={d.about.imageAlt}
              loading="lazy"
              width={1280}
              height={1600}
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-elegant"
            />
            <div className="absolute -bottom-8 -right-6 hidden rounded-2xl bg-card p-6 shadow-elegant ring-1 ring-border lg:block">
              <p className="font-display text-2xl text-foreground">{SITE.guide}</p>
              <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                {d.about.role}
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
          <span className="eyebrow text-gold">{d.about.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-foreground text-balance sm:text-5xl">
            {d.about.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{d.about.p1}</p>
            <p>{d.about.p2}</p>
          </div>
          <LocalLink
            to="/about"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold"
          >
            {d.about.more} <span>→</span>
          </LocalLink>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="border-l border-border pl-4">
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
