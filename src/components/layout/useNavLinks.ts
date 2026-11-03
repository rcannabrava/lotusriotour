import { useI18n } from "@/i18n";
import { getGuides } from "@/lib/guides";

/** Main navigation, shared by the Navbar and the Footer. "Guides" appears once a guide is published. */
export function useNavLinks() {
  const { d, locale } = useI18n();
  return [
    { label: d.nav.about, to: "/#about" },
    { label: d.nav.tours, to: "/tours" },
    { label: d.nav.why, to: "/#why" },
    { label: d.nav.reviews, to: "/#reviews" },
    ...(getGuides(locale).length ? [{ label: d.nav.guides, to: "/guides" }] : []),
    { label: d.nav.faq, to: "/#faq" },
  ];
}
