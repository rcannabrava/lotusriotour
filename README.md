# Lotus Rio Tour

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![CI](https://github.com/rcannabrava/lotusriotour/actions/workflows/ci.yml/badge.svg)

Official website of Lotus Rio Tour, a private tourism company in Rio de Janeiro founded and led by Patricia Cannabrava. The website showcases the available tours, customer testimonials, information about the guide, and a direct contact channel through WhatsApp.

## About the project

Patricia has been guiding tourists from all over the world for more than 10 years, speaking Portuguese, English, and Spanish fluently. The website was built to reflect the experience she provides: personalized, elegant, and hassle-free. Every tour is fully private, from hotel pickup to drop-off.

## Stack

- React 19 with TypeScript
- TanStack Start (SSR) and TanStack Router (file-based routing)
- TanStack Query for async state management
- Tailwind CSS v4 for styling
- Framer Motion for animations
- Typed i18n dictionaries (EN, PT-BR, ES) with language-prefixed URLs
- Swiper for the testimonials carousel
- SEO: per-route metadata, canonical + hreflang, Open Graph, JSON-LD (schema.org), generated `sitemap.xml` and `llms.txt`
- GA4 with Consent Mode v2 (optional, via `VITE_GA_ID`)
- Cloudflare Workers as the production runtime
- Vite as the bundler

## Project structure

```txt
src/
  assets/
    photos/        # Original photos (source for npm run images)
    brand/         # Logo and brand icons
    optimized/     # Generated responsive WebP files (do not edit)
  components/
    layout/        # Navbar, Footer, WhatsApp float button, LanguageSwitcher, CookieBanner
    sections/      # Hero, About, Tours, WhyLotus, Testimonials, FAQ, CTA
    ui/            # Design-system primitives (Section, buttons, LocalLink, WhatsAppLink...)
  constants/       # Site constants (name, links, WhatsApp, verified facts)
  data/            # Tours and testimonials metadata
  i18n/            # Locales config and typed dictionaries (locales/en|pt-br|es.ts)
  lib/
    seo/           # buildHead, schema.ts (JSON-LD), sitemap, llms.txt
    security/      # HTTP security headers and CSP
    errors/        # Error capture and the branded error page
    content/       # Guides loader (Markdown from content/guides)
    analytics/     # GA4 with Consent Mode v2
    utils.ts       # cn() and other shared helpers
  routes/          # Pages under {-$lang}/ (file-based via TanStack Router)
  tests/           # Vitest, one folder per domain (seo, security, i18n, content...)
scripts/           # optimize-images.mjs (npm run images), new-guide.mjs
DESIGN.md          # Visual system, read before building UI
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Tests

```bash
npm run test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## Code quality

```bash
# Lint
npm run lint

# Type checking
npm run typecheck

# Formatting
npm run format
```

The project uses Husky with lint-staged to automatically run linting and formatting checks before each commit.

## Supported languages

| URL prefix | Language   |
| ---------- | ---------- |
| _(none)_   | English    |
| `/pt-br`   | Portuguese |
| `/es`      | Spanish    |

Each language has its own URL (`/tours/boat`, `/pt-br/tours/boat`, `/es/tours/boat`) so search engines index them separately, linked by `hreflang`. English is the default and has no prefix (`/en/...` redirects to `/...`). There is no automatic redirect by browser language. Visitors switch with the navbar selector.

Strings live in `src/i18n/locales/`. `en.ts` defines the type; `pt-br.ts` and `es.ts` must have the same shape (TypeScript and tests enforce it).

## Available tours

- Rio Express (Christ the Redeemer + main attractions)
- Tailor-Made (custom itinerary)
- Rio Nature (Tijuca Forest and nature tours)
- Helicopter Tour
- Brazilian Passions (Carnival Experience and Maracanã)
- Boat Tour

Each tour has its own page (`/tours/<id>`) with summary, highlights, inclusions, FAQ and structured data. Copy lives in the dictionaries; photos and facts in `src/data/tours.ts`.

## Direct contact

All call-to-action buttons on the website redirect users to [Patricia's WhatsApp](https://wa.me/5521971577557)

## SEO / GEO / AEO

- Every page renders its content on the server (no empty shell), so crawlers and AI bots can read it.
- `buildHead()` (`src/lib/seo/seo.ts`) generates title, description, canonical, hreflang, Open Graph and Twitter tags.
- `src/lib/seo/schema.ts` builds JSON-LD: `TravelAgency`/`LocalBusiness`, `Person`, `WebSite`, `FAQPage`, `TouristTrip`, `BreadcrumbList`.
- `/sitemap.xml` and `/llms.txt` are generated from the same data. `public/robots.txt` explicitly allows search and AI crawlers.
- Facts that are not confirmed (Tripadvisor rating/count, Google Business Profile URL, Cadastur number, prices) are left empty in `src/constants/site.ts` and `src/data/tours.ts`. They only appear in structured data once filled in.

## Analytics

Set `VITE_GA_ID` (GA4 measurement ID) to enable analytics. It loads with Consent Mode v2 (storage denied until the visitor accepts the cookie banner) and records a `whatsapp_click` event with `placement`, `tour` and `locale`. Without the variable nothing is loaded.

## Images

Put originals in `src/assets/photos/`, list them in `scripts/optimize-images.mjs`, then run `npm run images` to generate the responsive WebP files and the 1200x630 social previews.

## Commit conventions

The project follows Conventional Commits:

- `feat:` new feature
- `fix:` bug fix
- `build:` build process changes
- `chore:` maintenance tasks
- `refactor:` code refactoring without behavior changes
- `docs:` documentation updates
- `test:` test creation or updates
