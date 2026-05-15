import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslate } from "@tolgee/react";
import { LANGUAGES, type Lang } from "@/i18n/languages";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "floating" | "solid";
  className?: string;
};

export function LanguageSwitcher({ variant = "floating", className }: Props) {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const triggerStyles =
    variant === "floating"
      ? "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
      : "border-border bg-background/80 text-foreground hover:bg-secondary";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300",
          triggerStyles,
        )}
      >
        <Globe size={14} className="opacity-80" aria-hidden />
        <span>{current.short}</span>
        <ChevronDown
          size={14}
          className={cn("opacity-70 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border/70 bg-background/95 p-1.5 shadow-elegant backdrop-blur-xl"
          >
            {LANGUAGES.map((l) => {
              const active = l.code === lang;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setLang(l.code as Lang);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      active
                        ? "bg-secondary text-foreground"
                        : "text-foreground/80 hover:bg-secondary/70 hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-base leading-none" aria-hidden>
                        {l.flag}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">{l.label}</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {l.short}
                        </span>
                      </span>
                    </span>
                    {active && <Check size={14} className="text-gold" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
