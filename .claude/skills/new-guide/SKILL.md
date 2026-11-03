---
name: new-guide
description: Create a new travel guide (blog post) for the Lotus Rio Tour site as a draft Markdown file, following the project's SEO and voice rules. Use when asked to write, draft or add a guide, blog post or article about Rio de Janeiro travel.
---

# New travel guide

Topic: `$ARGUMENTS`

1. Read `content/guides/README.md` (rules, frontmatter, workflow) and `DESIGN.md` section 8. Read one existing guide in `content/guides/*/en.md` for tone and structure.
2. Choose a slug (lowercase, hyphens) and create the file with `npm run new:guide -- <slug>`. Work on a branch named `content/<slug>`.
3. Write `content/guides/<slug>/en.md`:
   - `status: draft`; title with the search phrase; description 50-160 characters; `quickAnswer` that answers the question alone; 2-4 real FAQ questions; `tour` set to the most relevant tour id.
   - Answer first. 5-8 H2 sections, 700-1,200 words, short paragraphs, voice of Patricia (warm, precise, "you").
   - Link at least one tour with a locale-agnostic path (`/tours/rio-express`) and `/about`.
   - **Facts**: only what is verifiable or already stated on the site. Never invent prices, hours, rules or credentials. If a fact is uncertain, leave it out and list it in your final message for Patricia.
   - Add 1-3 `> **Patricia's tip:** ...` blockquotes, each preceded by `<!-- REVIEW: Patricia to confirm or replace this tip with her own -->`.
4. Run `npm run test` (validates frontmatter, links and tours). To preview: `VITE_SHOW_DRAFTS=true npm run dev` and open `/guides/<slug>`.
5. Do not set `status: published` and do not create translations: Patricia reviews the English draft first (see the workflow in `content/guides/README.md`).
6. Report: file path, the facts Patricia must confirm, and the next steps (review, translations, publish).
