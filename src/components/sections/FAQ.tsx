import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-secondary/40 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <span className="eyebrow text-gold">{t.faq.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t.faq.title}
          </h2>
          <p className="mt-6 text-muted-foreground">{t.faq.intro}</p>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-border border-y border-border">
            {t.faq.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-foreground sm:text-xl">{f.q}</span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
