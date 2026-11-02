import { describe, expect, it } from "vitest";
import { getTour, tours } from "@/data/tours";

describe("tour routes", () => {
  it("resolves every tour id used in URLs", () => {
    for (const tour of tours) expect(getTour(tour.id)).toBe(tour);
  });

  it("returns undefined for unknown ids (the route answers 404)", () => {
    expect(getTour("does-not-exist")).toBeUndefined();
  });

  it("uses unique, URL-safe slugs", () => {
    const ids = tours.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });
});
