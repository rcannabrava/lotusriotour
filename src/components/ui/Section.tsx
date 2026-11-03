import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** Background rhythm from DESIGN.md */
  tone?: "background" | "soft" | "deep";
  className?: string;
  /** Container width: 7xl for grids, 6xl for editorial blocks, 4xl for reading */
  width?: "7xl" | "6xl" | "4xl";
  children: ReactNode;
};

const tones = {
  background: "bg-background",
  soft: "bg-secondary/40",
  deep: "gradient-deep text-white",
} as const;

const widths = { "7xl": "max-w-7xl", "6xl": "max-w-6xl", "4xl": "max-w-4xl" } as const;

export function Section({
  id,
  tone = "background",
  width = "7xl",
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-28 lg:py-40", tones[tone], className)}>
      <div className={cn("mx-auto px-6 lg:px-10", widths[width])}>{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  dark,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <span className="eyebrow text-gold">{eyebrow}</span>
      <Tag
        className={cn(
          "mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl",
          !dark && "text-foreground",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-6", dark ? "text-white/75" : "text-muted-foreground")}>{intro}</p>
      )}
    </div>
  );
}

/** Entrance animation shared by every section (DESIGN.md "Motion"). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
