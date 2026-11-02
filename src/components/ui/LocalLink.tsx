import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { localizedPath, useI18n, type Locale } from "@/i18n";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** Locale-agnostic path, optionally with a hash: "/tours/boat", "/#about" */
  to: string;
  /** Target language. Defaults to the current one; set it only to switch languages. */
  locale?: Locale;
  children?: ReactNode;
};

/**
 * Internal link that keeps the visitor in the current language.
 * <LocalLink to="/tours"> renders /tours, /pt-br/tours or /es/tours.
 * <LocalLink to="/tours" locale="es"> always renders /es/tours (language switcher).
 */
export function LocalLink({ to, locale, children, ...rest }: Props) {
  const { locale: current } = useI18n();
  const [path, hash] = to.split("#");
  // Paths are built at runtime from the locale, so they cannot be checked against the generated route tree.
  const target = localizedPath(locale ?? current, path || "/") as never;
  return (
    <Link to={target} hash={hash} {...(rest as object)}>
      {children}
    </Link>
  );
}
