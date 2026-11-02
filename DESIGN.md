# Lotus Rio Tour: Design System

Single reference for how the site looks and behaves. **Every new page or component must follow this file**; if something you need is missing, add it here first, then build it. Source of truth in code: [`src/styles.css`](src/styles.css) (tokens) and [`src/components/ui/`](src/components/ui) (primitives).

## 1. Identity

A private guide, not a tour operator. The site should feel **warm, elegant and unhurried**: generous white space, large photography, editorial serif headlines, one confident accent color. Tagline: _Private. Seamless. Authentic._

- Voice: first person (Patricia), warm and precise. "You travel light. I take care of the rest."
- Never use agency jargon, exclamation marks or urgency tricks ("Book now!", "Limited spots").
- Every conversion goes to **WhatsApp** (no forms, no checkout).

## 2. Color tokens

Defined in `:root` of `src/styles.css`, exposed to Tailwind as `bg-*`, `text-*`, `border-*`. **Never hard-code hex/oklch in components** (use tokens).

| Token                        | Value                               | Use                                                                   |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| `background`                 | `oklch(0.985 0.008 85)` (cream)     | Default page and section background                                   |
| `foreground`                 | `oklch(0.18 0.025 200)`             | Headings and main text                                                |
| `muted-foreground`           | `oklch(0.46 0.02 200)`              | Body copy, captions                                                   |
| `primary`                    | `oklch(0.32 0.06 195)` (deep ocean) | Icons on light, `shadow-*` tint, dark sections                        |
| `secondary` / `secondary/40` | `oklch(0.95 0.015 85)`              | Alternate section background (`bg-secondary/40`), hovers              |
| `card`                       | white                               | Cards on cream backgrounds                                            |
| `border`                     | `oklch(0.88 0.015 85)`              | Dividers, card rings (`ring-1 ring-border`)                           |
| `gold`                       | `#bad448` (lime)                    | **The only accent**: eyebrows, primary CTA, icon tints, active states |
| `gold-foreground`            | dark teal                           | Text on `gold`                                                        |

> The token is called `gold` for historical reasons but the color is lime green. Keep the name.

Gradients (utilities): `gradient-hero-overlay` (photo overlay), `gradient-deep` (dark teal section), `gradient-gold`.

Rules:

- `gold` is for emphasis and actions, never for long text or large backgrounds.
- Dark sections use `gradient-deep` + `text-white`, with secondary text at `text-white/70–80`.
- Text over photos always sits on an overlay (`bg-linear-to-t from-black/70 …` or `gradient-hero-overlay`).
- The `.dark` theme exists in the CSS but is **not used**; do not design for it.

## 3. Typography

| Role     | Font                          | Notes                                       |
| -------- | ----------------------------- | ------------------------------------------- |
| Headings | **Fraunces** (`font-display`) | Applied to h1–h4, `letter-spacing: -0.02em` |
| Body/UI  | **Inter** (`font-sans`)       | 300–600                                     |

Scale actually in use:

| Element              | Classes                                                                                |
| -------------------- | -------------------------------------------------------------------------------------- |
| Hero H1              | `font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance`            |
| Page H1 (tour/guide) | `font-display text-5xl sm:text-6xl leading-[1.05] text-balance`                        |
| Section H2           | `font-display text-4xl sm:text-5xl leading-tight text-balance`                         |
| Sub-section H2       | `font-display text-3xl sm:text-4xl`                                                    |
| Card title           | `font-display text-xl` – `text-2xl`                                                    |
| Lead paragraph       | `text-lg leading-relaxed text-muted-foreground`                                        |
| Body                 | `text-base leading-relaxed text-muted-foreground`                                      |
| Small / meta         | `text-sm` / `text-xs`                                                                  |
| **Eyebrow**          | `.eyebrow text-gold` (0.72rem, `tracking 0.32em`, uppercase) above every section H2/H1 |

Highlight one phrase of a hero headline in _italic_ `text-gold` (see Hero). Use `text-balance` on headings.

## 4. Layout and rhythm

- Container: `mx-auto max-w-7xl px-6 lg:px-10` (grids). Editorial blocks `max-w-6xl`; reading text `max-w-4xl` (use `<Section width>`).
- Section padding: `py-28 lg:py-40` (denser pages may use `lg:py-32`).
- Background rhythm: alternate `bg-background` → `bg-secondary/40` → `gradient-deep` → photo+overlay CTA. Never two identical backgrounds in a row.
- Grids: cards `md:grid-cols-2 lg:grid-cols-3 gap-7`; editorial `lg:grid-cols-12` with a 5/7 split (About, FAQ).
- Pages other than the home start under the fixed navbar: add `pt-32 lg:pt-40` (or `pt-20` when the first block is a `<Section>`).
- Mobile first. Check 375 px and a 700 px tall viewport (the Hero has dedicated `max-height:710px` rules).

## 5. Components and primitives

Use these instead of re-writing classes.

| Primitive         | File                     | Use                                                          |
| ----------------- | ------------------------ | ------------------------------------------------------------ |
| `Section`         | `ui/Section.tsx`         | Section wrapper: `tone` (background/soft/deep), `width`      |
| `SectionHeader`   | `ui/Section.tsx`         | Eyebrow + title + intro (`as="h1"` on page heads)            |
| `Reveal`          | `ui/Section.tsx`         | Entrance animation                                           |
| `buttonStyles()`  | `ui/button-styles.ts`    | Pill buttons: `primary`, `ghost` (on photos), `outline`      |
| `WhatsAppLink`    | `ui/WhatsAppLink.tsx`    | **Every** WhatsApp link (adds tracking + pre-filled message) |
| `LocalLink`       | `ui/LocalLink.tsx`       | **Every** internal link (keeps the language prefix)          |
| `ResponsiveImage` | `ui/ResponsiveImage.tsx` | Photos (WebP `srcset`)                                       |
| `FaqAccordion`    | `ui/FaqAccordion.tsx`    | FAQ lists                                                    |

Patterns (copy from the referenced file):

- **Primary button**: `rounded-full bg-gold px-7 py-4 text-sm font-medium shadow-elegant hover:scale-[1.03]`, with a `→` that slides 4 px on hover.
- **Tour card** (`sections/Tours.tsx`): `rounded-2xl bg-card shadow-soft ring-1 ring-border`, `hover:-translate-y-1 hover:shadow-elegant`, `aspect-4/5` photo with bottom gradient and title over the photo; badge `rounded-full bg-gold text-[10px] uppercase tracking-widest`.
- **Info card** (tour page): `rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border`.
- **Dark card** (`sections/WhyLotus.tsx`): `rounded-2xl border border-white/10 bg-white/4 p-8`, icon in `rounded-xl bg-gold/15 text-gold`.
- **Stat** (`sections/About.tsx`): `border-l pl-4`, value in Fraunces `text-3xl`, label `text-xs uppercase tracking-widest`.
- **Icon bubble**: `h-10 w-10 rounded-xl bg-gold/15` + lucide icon `size 18 strokeWidth 1.6` (`text-primary` on light, `text-gold` on dark).
- Icons: **lucide-react** only, sizes 12–20, `strokeWidth 1.6` when decorative.
- Shadows: `shadow-soft` (resting), `shadow-elegant` (hover/hero cards). Radii: `rounded-2xl` for cards/photos, `rounded-full` for buttons/badges.

## 6. Images

- Photos are `object-cover`, `rounded-2xl`, portrait `aspect-4/5` for people/tours, landscape `aspect-4/3` for secondary cards, hero is full-bleed.
- Always through `ResponsiveImage` with a correct `sizes`; explicit `width`/`height`; `loading="lazy"` except the first image on a page (`fetchPriority="high"`).
- Add a photo: put the original in `src/assets/`, register it in `scripts/optimize-images.mjs`, run `npm run images`.
- `alt` text is descriptive, translated (dictionary), never "image of".
- Social previews: 1200×630 JPG under 250 KB in `public/` (`/og-image.jpg` default, `/og/<tour>.jpg` per tour).

## 7. Motion (Framer Motion)

- Entrance: `opacity 0→1`, `y 24–30→0`, `duration 0.6–0.8`, `viewport once`, margin `-80px`; stagger `i * 0.05–0.06`; easing `[0.22, 1, 0.36, 1]`. Use `Reveal`.
- Hover: scale ≤ 1.03 on buttons, `-translate-y-1` on cards, slow image zoom `scale-105` over 1200 ms.
- Motion is decorative: never hide content behind it (SSR renders content visible).

## 8. Long-form content (guides)

Markdown guides render inside `.prose-lotus` (defined in `styles.css`) with the same tokens:

- H2 Fraunces `text-3xl`, H3 `text-xl`; paragraphs `leading-relaxed text-foreground/85`.
- Links: underline with `decoration-gold`, hover `text-primary`.
- Lists with `marker:text-gold`; images `rounded-2xl`; tables with `border-border`.
- **Quick answer** box: top of every guide; card style (`bg-card ring-1 ring-border rounded-2xl p-6`) with an eyebrow.
- **Patricia's tip**: `> **Patricia's tip:** …` renders as a card with a gold left border (`border-l-2 border-gold`).
- Related tour card at the end uses the tour card pattern.

## 9. Microcopy

- All visible strings live in `src/i18n/locales/{en,pt-br,es}.ts`; add the key to `en.ts` first (it defines the type), then translate. No hard-coded text in components.
- CTAs: "Chat on WhatsApp", "Plan your tour", "View tour". Eyebrows are short noun phrases ("Curated experiences").
- Numbers and currency are formatted with `Intl.NumberFormat(locale)`.

## 10. Known inconsistencies (fix when touching the file)

- `Testimonials.tsx` uses hard-coded `text-black` / `bg-white` instead of tokens.
- `--ring` is gold-orange, outside the palette.
- The Hero/Navbar duplicate a few pill-button class strings instead of using `buttonStyles`.
- The `.dark` theme is defined but unused.

## 11. Checklist for a new page

1. Page chrome comes from `routes/{-$lang}/route.tsx` (Navbar, Footer, WhatsApp button); do not add your own.
2. Start with `SectionHeader as="h1"` or the pattern in `routes/{-$lang}/tours/$tourId.tsx`; exactly one H1.
3. Compose with `Section`, alternate the background tones.
4. Links via `LocalLink`; WhatsApp via `WhatsAppLink` with a `placement`.
5. Photos via `ResponsiveImage`.
6. Strings in the three dictionaries.
7. `head()` with `buildHead` + JSON-LD (`src/lib/schema.ts`), add the page to `src/lib/sitemap.ts`.
8. Check at 375 px and 1440 px; run `npm run typecheck && npm run lint && npm run test`.
