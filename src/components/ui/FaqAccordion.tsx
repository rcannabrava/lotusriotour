import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-foreground sm:text-xl">{item.q}</span>
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
                  <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
