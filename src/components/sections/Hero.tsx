// Hero section — fully translated via i18n
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-rio.jpg";
import { SITE } from "@/constants/site";
import { useTranslate } from "@tolgee/react";

export function Hero() {
  const { t } = useTranslate();
  return (
    <section className="relative h-svh min-h-160 w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Aerial view of Rio de Janeiro at sunset with Christ the Redeemer"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="absolute inset-0 bg-[oklch(0.1_0.03_215/0.25)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 lg:px-10 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow inline-flex items-center gap-2 text-white">
            <MapPin size={14} /> {t("hero.eyebrow")}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
            {t("hero.titleLine1")}
            <br />
            <span className="italic text-gold">{t("hero.titleLine2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-gold-foreground shadow-elegant transition-transform hover:scale-[1.03]"
            >
              {t("hero.ctaPrimary")}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#tours"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 lg:flex"
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-[0.4em]">{t("hero.scroll")}</span>
          <ArrowDown size={16} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
