/**
 * Review text and date live in the i18n dictionaries (testimonials.reviews[id]),
 * so every language shows the same review. Only identity and rating stay here.
 */
export interface Testimonial {
  id: number;
  name: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { id: 1, name: "Jamye G", rating: 5 },
  { id: 2, name: "Erin", rating: 5 },
  { id: 3, name: "Gabriela S", rating: 5 },
  { id: 4, name: "Anna Beatriz", rating: 5 },
  { id: 5, name: "Michelli A", rating: 5 },
  { id: 6, name: "Danilo C", rating: 5 },
  { id: 7, name: "Nicole Dutra", rating: 5 },
  { id: 12, name: "Marykuh", rating: 5 },
  { id: 8, name: "Deusenize Dantas", rating: 5 },
  { id: 9, name: "Eduardo Cardoso", rating: 5 },
  { id: 10, name: "Matheus S", rating: 5 },
  { id: 11, name: "Jade M", rating: 5 },
];
