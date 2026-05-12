import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useTranslation();
  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.tours, href: "#tours" },
    { label: t.nav.why, href: "#why" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.faq, href: "#faq" },
  ];
  return (
    <footer className="bg-[oklch(0.14_0.03_215)] text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="font-display text-2xl text-white">
            Lotus<span className="text-gold">.</span>Rio
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{t.footer.tagline}</p>
          <div className="mt-8 flex items-center gap-3">
            <SocialLink href={SITE.instagram} label="Instagram">
              <Instagram size={16} />
            </SocialLink>
            <SocialLink href={SITE.facebook} label="Facebook">
              <Facebook size={16} />
            </SocialLink>
            <SocialLink href={SITE.whatsappUrl} label="WhatsApp">
              <MessageCircle size={16} />
            </SocialLink>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs uppercase tracking-widest text-gold">{t.footer.explore}</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs uppercase tracking-widest text-gold">{t.footer.contact}</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>{SITE.pickup}</li>
            <li>
              <a
                href={SITE.whatsappUrl}
                className="hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                +55 21 97157 7557
              </a>
            </li>
            <li>
              {t.footer.languagesLabel}: {SITE.languages.join(" · ")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
          </p>
          <p>{t.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
