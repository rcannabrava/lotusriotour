import { useI18n } from "@/i18n";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function FAQ() {
  const { d } = useI18n();

  return (
    <section id="faq" className="bg-secondary/40 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <span className="eyebrow text-gold">{d.faq.eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {d.faq.title}
          </h2>
          <p className="mt-6 text-muted-foreground">{d.faq.intro}</p>
        </div>

        <div className="lg:col-span-7">
          <FaqAccordion items={d.faq.items} />
        </div>
      </div>
    </section>
  );
}
