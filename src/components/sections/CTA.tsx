import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-rio.jpg";
import { SITE } from "@/constants/site";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CTA() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.12_0.03_215/0.8)]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center text-white lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow text-gold">{t.cta.eyebrow}</span>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] text-balance sm:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">{t.cta.intro}</p>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-gold-foreground shadow-elegant transition-transform hover:scale-[1.03]"
          >
            <MessageCircle size={18} />
            {t.cta.button}
          </a>
          <p className="mt-5 text-xs uppercase tracking-widest text-white/55">{t.cta.footnote}</p>
        </motion.div>
      </div>
    </section>
  );
}
