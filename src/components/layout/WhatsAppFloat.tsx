import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { useTranslate } from "@tolgee/react";

export function WhatsAppFloat() {
  const { t } = useTranslate();
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappAria", "Chat on WhatsApp")}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-elegant transition-transform hover:scale-110"
    >
      <MessageCircle size={24} />
    </a>
  );
}
