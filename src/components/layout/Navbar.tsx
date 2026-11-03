import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { LocalLink } from "@/components/ui/LocalLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logo from "@/assets/brand/logo.svg";
import { TripadvisorIcon } from "./tripadvisorIcon";
import { useNavLinks } from "./useNavLinks";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { d, href } = useI18n();

  const location = useLocation();

  const isHome = location.pathname.replace(/\/$/, "") === href("/").replace(/\/$/, "");

  const navTextColor = !isHome || scrolled ? "text-foreground" : "text-white";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useNavLinks();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <LocalLink
          to="/"
          className={cn(
            "font-display text-xl tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-white",
            navTextColor,
          )}
        >
          <img src={logo} alt="Lotus Rio Tour" className="h-20 w-20 sm:w-auto" />
        </LocalLink>
        <nav className="hidden items-center gap-9 px-3 md:flex">
          {links.map((link) => (
            <LocalLink
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                scrolled ? "text-foreground/80" : "text-white/85",
                navTextColor,
              )}
            >
              {link.label}
            </LocalLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher variant={scrolled ? "solid" : "floating"} />
          <WhatsAppLink
            placement="navbar"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            {d.nav.cta}
          </WhatsAppLink>
          <TripadvisorIcon />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher variant={scrolled ? "solid" : "floating"} />
          <button
            aria-label={d.common.openMenu}
            onClick={() => setOpen((v) => !v)}
            className={cn(scrolled ? "text-foreground" : "text-white")}
          >
            {open ? <X size={26} /> : <Menu size={25} />}
          </button>
          <TripadvisorIcon />
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
            {links.map((link) => (
              <LocalLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-foreground/85 hover:bg-secondary"
              >
                {link.label}
              </LocalLink>
            ))}
            <WhatsAppLink
              placement="navbar"
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-gold-foreground"
            >
              {d.nav.cta}
            </WhatsAppLink>
          </div>
        </div>
      )}
    </header>
  );
}
