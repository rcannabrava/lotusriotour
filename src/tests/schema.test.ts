/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { breadcrumbList, entityGraph, faqPage, touristTrip } from "@/lib/schema";
import { tours } from "@/data/tours";
import { FACTS } from "@/constants/site";

describe("entityGraph", () => {
  const graph = entityGraph("en") as Record<string, any>[];
  const business = graph.find((n) => String(n["@id"]).endsWith("#business"))!;
  const person = graph.find((n) => String(n["@id"]).endsWith("#patricia"))!;

  it("links business, guide and website", () => {
    expect(business["@type"]).toContain("TravelAgency");
    expect(business.founder).toEqual({ "@id": person["@id"] });
    expect(graph.some((n) => n["@type"] === "WebSite")).toBe(true);
  });

  it("only emits verified facts that are filled in FACTS", () => {
    expect(Boolean(business.aggregateRating)).toBe(Boolean(FACTS.rating && FACTS.reviewCount));
    expect(business.priceRange).toBe(FACTS.priceRange);
    expect(Boolean(person.hasCredential)).toBe(Boolean(FACTS.cadastur));
    if (FACTS.googleBusinessUrl) expect(business.sameAs).toContain(FACTS.googleBusinessUrl);
  });

  it("declares the languages and area served", () => {
    expect(business.availableLanguage).toEqual(["English", "Portuguese", "Spanish"]);
    expect(business.areaServed).toEqual({ "@type": "City", name: "Rio de Janeiro" });
  });
});

describe("touristTrip", () => {
  it("builds an itinerary for every tour", () => {
    for (const tour of tours) {
      const trip = touristTrip("en", tour, "https://lotusriotour.com/x.jpg") as Record<string, any>;
      expect(trip["@type"]).toBe("TouristTrip");
      expect(trip.itinerary.itemListElement.length).toBe(tour.attractions.length);
      expect(trip.url).toBe(`https://lotusriotour.com/tours/${tour.id}`);
    }
  });

  it("only includes offers when a price is set", () => {
    const base = tours[0];
    expect((touristTrip("en", base, "i") as Record<string, any>).offers).toBeUndefined();
    const priced = touristTrip("en", { ...base, priceFrom: 250 }, "i") as Record<string, any>;
    expect(priced.offers.price).toBe(250);
  });
});

describe("faqPage and breadcrumbList", () => {
  it("maps questions and answers", () => {
    const faq = faqPage([{ q: "Q?", a: "A." }]) as Record<string, any>;
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });

  it("uses localized absolute URLs", () => {
    const crumbs = breadcrumbList("es", [{ name: "Tours", path: "/tours" }]) as Record<string, any>;
    expect(crumbs.itemListElement[0].item).toBe("https://lotusriotour.com/es/tours");
  });
});
