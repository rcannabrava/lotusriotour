import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { useI18n } from "@/i18n";
import { LocalLink } from "@/components/ui/LocalLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { buttonStyles } from "@/components/ui/button-styles";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function Hero() {
  const { d } = useI18n();
  return (
    <section className="relative h-svh min-h-160 w-full overflow-hidden">
      <ResponsiveImage
        name="hero-rio"
        sizes="100vw"
        alt={d.hero.imageAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="absolute inset-0 bg-[oklch(0.1_0.03_215/0.25)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-5 min-[500px]:px-10 min-[500px]:pb-32 [@media(max-height:710px)]:pb-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow inline-flex items-center gap-2 text-white">
            <MapPin size={14} /> {d.hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl [@media(max-height:710px)]:mt-2">
            {d.hero.titleLine1}
            <br />
            <span className="italic text-gold">{d.hero.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {d.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppLink placement="hero" className={buttonStyles("primary")}>
              {d.hero.ctaPrimary}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </WhatsAppLink>
            <LocalLink to="/#tours" className={buttonStyles("ghost")}>
              {d.hero.ctaSecondary}
            </LocalLink>
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
          <span className="text-[10px] tracking-[0.4em]">{d.hero.scroll}</span>
          <ArrowDown size={16} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
