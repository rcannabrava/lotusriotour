import type { ComponentProps } from "react";
import { SITE } from "@/constants/site";
import { useI18n } from "@/i18n";
import { trackWhatsAppClick, type WhatsAppPlacement } from "@/lib/analytics/analytics";

type Props = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & {
  placement: WhatsAppPlacement;
  tour?: string;
  /** Pre-filled message sent to Patricia */
  message?: string;
};

/** Every WhatsApp CTA goes through here so clicks are measured by placement, tour and language. */
export function WhatsAppLink({ placement, tour, message, onClick, children, ...rest }: Props) {
  const { locale } = useI18n();
  const href = message
    ? `${SITE.whatsappUrl}?text=${encodeURIComponent(message)}`
    : SITE.whatsappUrl;
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackWhatsAppClick({ placement, locale, tour });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
