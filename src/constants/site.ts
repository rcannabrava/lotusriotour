export const SITE = {
  name: "Lotus Rio Tour",
  guide: "Patricia Cannabrava",
  tagline: "Private Tour Guide in Rio de Janeiro",
  url: "https://lotusriotour.com",
  foundingYear: 2015,
  phone: "+5521971577557",
  whatsappNumber: "5521971577557",
  whatsappUrl: "https://wa.me/5521971577557",
  instagram: "https://www.instagram.com/lotusriotour",
  facebook: "https://www.facebook.com/lotusturismoeeventos",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g303506-d19921867-Reviews-Lotus_Rio_Tour-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html",
  ogImage: "/og-image.jpg",
} as const;

/**
 * Verifiable facts about the business. Leave a field undefined until the real value is
 * confirmed, so nothing is ever invented.
 */
type VerifiedFacts = {
  /**
   * Tripadvisor average rating, e.g. 5. Reference only: it is deliberately NOT emitted as
   * schema.org aggregateRating (Google treats a business rating itself as a self-serving review).
   */
  rating?: number;
  /** Total number of Tripadvisor reviews, e.g. 115. Reference only, same as `rating`. */
  reviewCount?: number;
  /** Google Maps / Business Profile URL */
  googleBusinessUrl?: string;
  /** Cadastur registration number (official Brazilian tour guide registry) */
  cadastur?: string;
  /** schema.org priceRange, e.g. "$$$" */
  priceRange?: string;
};

export const FACTS: VerifiedFacts = {
  rating: 5.0, // nota média exata que aparece no Tripadvisor
  reviewCount: 119, // total exato de avaliações no Tripadvisor
  googleBusinessUrl: "https://maps.app.goo.gl/DUZw8EZQz37s5Ybc7", // link do perfil no Google Maps
  cadastur: "19.025494.96-4", // número exatamente como está no certificado
  priceRange: "$$", // opcional: $, $$, $$$ ou $$$$
};

export const STATS = {
  years: "10+",
  languages: "3",
  travelers: "1k+",
  rating: "5★",
} as const;
