import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users, Languages, Car, Heart } from "lucide-react";
import { useTranslate } from "@tolgee/react";

const items = [
  { key: "safety", Icon: ShieldCheck },
  { key: "tailor_made", Icon: Sparkles },
  { key: "languages", Icon: Languages },
  { key: "comfort", Icon: Car },
  { key: "private", Icon: Users },
  { key: "local", Icon: Heart },
] as const;

export function WhyLotus() {
  const { t } = useTranslate();
  return (
    <section id="why" className="relative gradient-deep py-28 text-white lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold">{t("why.eyebrow")}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t("why.title")}
          </h2>
          <p className="mt-6 text-white/75">{t("why.intro")}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/4 p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 font-display text-xl">{t(`why.items.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t(`why.items.${key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
