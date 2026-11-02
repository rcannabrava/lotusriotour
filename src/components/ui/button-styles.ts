import { cn } from "@/lib/utils";

/** Pill buttons from DESIGN.md. Apply to <a>/<button>/<Link>. */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-transform";

const variants = {
  primary: "bg-gold text-gold-foreground shadow-elegant hover:scale-[1.03]",
  ghost: "border border-white/30 text-white backdrop-blur-md transition-colors hover:bg-white/10",
  outline: "border border-border text-foreground transition-colors hover:bg-secondary",
} as const;

export function buttonStyles(variant: keyof typeof variants = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
