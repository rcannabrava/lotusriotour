import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function WhatsAppFloat() {
  const { d } = useI18n();
  return (
    <WhatsAppLink
      placement="float"
      aria-label={d.whatsappAria}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-elegant transition-transform hover:scale-110"
    >
      <MessageCircle size={24} />
    </WhatsAppLink>
  );
}
