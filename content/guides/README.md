# Travel guides

Guides answer the questions travelers type into Google or ask an AI assistant ("Is Rio safe?", "Rio in one day"). Each guide ranks, gets cited, and ends with a path to the right tour. Visual rules: [DESIGN.md](../../DESIGN.md) section 8.

## Folder layout

```
content/guides/
  _template.md           copy this to start a guide
  rio-in-one-day/        folder name = URL slug (same in every language)
    en.md                required (primary language)
    pt-br.md             optional
    es.md                optional
```

- URLs: `/guides/rio-in-one-day`, `/pt-br/guides/rio-in-one-day`, `/es/guides/rio-in-one-day`.
- A language without its file simply does not exist for that guide: it is left out of hreflang and the sitemap, and the language switcher sends the visitor to the guides index.

## Frontmatter

| Field         | Required | Notes                                                                                                                                                   |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | yes      | 10-90 characters. Specific, with the search phrase. Also the H1.                                                                                        |
| `description` | yes      | 50-160 characters (Google cuts at ~155). Shown in search results.                                                                                       |
| `date`        | yes      | `YYYY-MM-DD`. A future date schedules the guide: it goes live on that day, no redeploy needed.                                                          |
| `updated`     | no       | `YYYY-MM-DD`. Set it whenever the content is revised (a freshness signal).                                                                              |
| `status`      | yes      | `draft` (never public) or `published`.                                                                                                                  |
| `tour`        | no       | Tour id (`rio-express`, `tailor-made`, `rio-nature`, `helicopter`, `carnaval`, `boat`). Adds the tour card and WhatsApp CTA, and picks the cover photo. |
| `quickAnswer` | yes      | The direct 1-3 sentence answer. Shown in a box under the title and quoted by search/AI engines.                                                         |
| `faq`         | no       | List of `q`/`a`. Rendered as an accordion and emitted as FAQPage structured data.                                                                       |

## Writing rules

1. **Answer first.** The `quickAnswer` and the first paragraph of each section answer the question; the rest explains.
2. **Real, verifiable facts only.** No invented prices, hours or rules. If unsure, leave it out or ask Patricia. Wrong facts hurt trust and AI citations.
3. **Patricia's voice.** Written for the traveler ("you"), warm, precise, no hype or urgency. Local knowledge is the value: tips, timing, what to skip.
4. **Structure.** H2 per question or step, optional H3. 5-8 sections, 700-1,200 words. Short paragraphs, lists for steps.
5. **Patricia's tip.** Use `> **Patricia's tip:** ...` (blockquote) 1-3 times per guide. Mark each one for review with `<!-- REVIEW: ... -->` until she confirms it.
6. **Links.** Use locale-agnostic paths (`/tours/rio-express`, `/about`); the site localizes them. Link at least one tour. External links open in a new tab.
7. **One topic per guide**, one main search phrase in the title, the first paragraph and one H2.

## Workflow

1. **Draft.** `npm run new:guide -- <slug>` (or ask Claude: `/new-guide <topic>`). The file is created with `status: draft` on a branch named `content/<slug>`.
2. **Preview.** Run `VITE_SHOW_DRAFTS=true npm run dev` (draft pages show a "Draft" badge and are `noindex`), or open the preview URL of the branch.
3. **Review (Patricia).** She checks facts, prices, hours and tone, and adds her own tips. Remove every `<!-- REVIEW: ... -->` comment once confirmed (CI blocks published guides that still have them).
4. **Translate.** After the English text is approved, create `pt-br.md` and `es.md` (same slug, same structure, same FAQ count).
5. **Publish.** Set `status: published` and `date`, open a pull request, merge. CI validates frontmatter, links and tours; the sitemap and `llms.txt` update by themselves.
6. **Promote.** Post the link on the Google Business Profile and Instagram.

To update a published guide: edit the file, set `updated`, open a pull request.

## Checklist before publishing

- [ ] Title and description within limits, search phrase present
- [ ] `quickAnswer` answers the question by itself
- [ ] Every fact confirmed by Patricia; no `REVIEW` comments left
- [ ] At least one tour linked; `tour` set
- [ ] FAQ has 2-4 real questions
- [ ] Translations created (or knowingly English only)
- [ ] `npm run test` passes
