import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { buttonStyles } from "@/components/ui/button-styles";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function CTA() {
  const { d } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <ResponsiveImage
        name="hero-rio"
        sizes="100vw"
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
          <span className="eyebrow text-gold">{d.cta.eyebrow}</span>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] text-balance sm:text-6xl">
            {d.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">{d.cta.intro}</p>
          <WhatsAppLink placement="cta" className={buttonStyles("primary", "mt-10 gap-3 px-8")}>
            <MessageCircle size={18} />
            {d.cta.button}
          </WhatsAppLink>
          <p className="mt-5 text-xs uppercase tracking-widest text-white/55">{d.cta.footnote}</p>
        </motion.div>
      </div>
    </section>
  );
}
