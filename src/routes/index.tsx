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
      { title: "Luxury Private Tours in Rio | Lotus Rio Tour" },
      {
        name: "description",
        content:
          "Private luxury tours and bespoke experiences in Rio de Janeiro with Patricia Cannabrava. Discover Christ the Redeemer, Sugarloaf, beaches, yachts and exclusive tailor-made itineraries in English, Spanish and Portuguese.",
      },
      {
        property: "og:title",
        content: "Luxury Private Tours in Rio | Lotus Rio Tour",
      },
      {
        property: "og:description",
        content:
          "Private, elegant and unhurried experiences in Rio de Janeiro designed entirely around you.",
      },
      { property: "og:type", content: "website" },
      {
        links: {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      },
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
