import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { useI18n } from "@/i18n";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** Locale-agnostic path, optionally with a hash: "/tours/boat", "/#about" */
  to: string;
  children?: ReactNode;
};

/**
 * Internal link that keeps the visitor in the current language.
 * <LocalLink to="/tours"> renders /tours, /pt-br/tours or /es/tours.
 */
export function LocalLink({ to, children, ...rest }: Props) {
  const { href } = useI18n();
  const [path, hash] = to.split("#");
  // Paths are built at runtime from the locale, so they cannot be checked against the generated route tree.
  const target = href(path || "/") as never;
  return (
    <Link to={target} hash={hash} {...(rest as object)}>
      {children}
    </Link>
  );
}
