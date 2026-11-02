import { describe, expect, it } from "vitest";
import { allGuideFiles, guideLoadErrors, parseGuide, slugify } from "@/lib/guides";
import { tours } from "@/data/tours";

// Every file in content/guides is validated here, so CI fails on a broken guide before it reaches the site.
describe("guide files", () => {
  it("all parse and match the frontmatter schema", () => {
    expect(guideLoadErrors).toEqual([]);
  });

  it("has an English version of every guide", () => {
    const slugs = [...new Set(allGuideFiles.map((g) => g.slug))];
    for (const slug of slugs) {
      expect(allGuideFiles.some((g) => g.slug === slug && g.locale === "en")).toBe(true);
    }
  });

  for (const guide of allGuideFiles) {
    describe(`${guide.slug} (${guide.locale})`, () => {
      it("only links to pages that exist", () => {
        const internal = [...guide.html.matchAll(/href="(\/[^"#]*)/g)].map((m) => m[1]);
        const valid = (path: string) => {
          const bare = path.replace(/^\/(pt-br|es)(?=\/|$)/, "") || "/";
          if (["/", "/tours", "/about", "/guides"].includes(bare)) return true;
          const tour = bare.match(/^\/tours\/([^/]+)$/)?.[1];
          if (tour) return tours.some((t) => t.id === tour);
          const slug = bare.match(/^\/guides\/([^/]+)$/)?.[1];
          return !!slug && allGuideFiles.some((g) => g.slug === slug);
        };
        expect(internal.filter((p) => !valid(p))).toEqual([]);
      });

      it("links at least one tour", () => {
        expect(guide.html).toMatch(/href="[^"]*\/tours\//);
      });

      if (guide.status === "published") {
        it("has no unresolved REVIEW markers", () => {
          // checked on the rendered output too: comments are kept as HTML comments
          expect(guide.html).not.toMatch(/REVIEW/);
        });
      }
    });
  }
});

describe("parseGuide", () => {
  const valid = `---
title: "A valid title for a guide"
description: "A description that is long enough to satisfy the minimum length rule of the schema."
date: 2026-01-01
status: published
quickAnswer: "A direct answer that is long enough to be quoted by an assistant."
---

## First section

See [Rio Express](/tours/rio-express).
`;

  it("builds html, toc and a localized link", () => {
    const guide = parseGuide("/content/guides/demo/pt-br.md", valid);
    expect(guide.toc).toEqual([{ id: "first-section", text: "First section" }]);
    expect(guide.html).toContain('href="/pt-br/tours/rio-express"');
    expect(guide.html).toContain('<h2 id="first-section">');
  });

  it("rejects a description that is too long", () => {
    const long = valid.replace(/description: ".*"/, `description: "${"x".repeat(170)}"`);
    expect(() => parseGuide("/content/guides/demo/en.md", long)).toThrow();
  });

  it("rejects an unknown tour and a missing frontmatter", () => {
    expect(() =>
      parseGuide("/content/guides/demo/en.md", valid.replace("status:", "tour: nope\nstatus:")),
    ).toThrow();
    expect(() => parseGuide("/content/guides/demo/en.md", "# no frontmatter")).toThrow();
  });
});

describe("slugify", () => {
  it("strips accents and punctuation", () => {
    expect(slugify("Pão de Açúcar: 3 tips")).toBe("pao-de-acucar-3-tips");
  });
});
