import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tours } from "@/components/sections/Tours";
import { WhyLotus } from "@/components/sections/WhyLotus";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lotus Rio Tour — Private Tour Guide in Rio de Janeiro" },
      {
        name: "description",
        content:
          "Bespoke private tours of Rio de Janeiro by Patricia Cannabrava. Christ the Redeemer, Sugarloaf, helicopter, boat and tailor-made experiences in English, Spanish and Portuguese.",
      },
      { property: "og:title", content: "Lotus Rio Tour — Private Tours in Rio" },
      {
        property: "og:description",
        content:
          "Private, unhurried days in Rio designed around you. 10+ years guiding international travelers.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Tours />
      <WhyLotus />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
