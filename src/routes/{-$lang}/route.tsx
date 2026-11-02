import { Outlet, createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

/**
 * English is the default locale and lives without prefix, so /en/... is a duplicate:
 * redirect it permanently. Any other unknown prefix is a 404.
 */
export const Route = createFileRoute("/{-$lang}")({
  beforeLoad: ({ params, location }) => {
    const { lang } = params;
    if (lang === undefined) return;
    if (!isLocale(lang)) throw notFound();
    if (lang === DEFAULT_LOCALE) {
      const rest = location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
      throw redirect({ href: rest, statusCode: 301 });
    }
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
