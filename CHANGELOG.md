# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Language-prefixed URLs (`/pt-br`, `/es`) with canonical and hreflang
- Full tour pages (`/tours/<id>`) with highlights, inclusions, FAQ and structured data
- JSON-LD (TravelAgency, Person, WebSite, FAQPage, TouristTrip, BreadcrumbList)
- Generated `sitemap.xml` and `llms.txt`; robots.txt allowing search and AI crawlers
- GA4 with Consent Mode v2 and cookie banner; `whatsapp_click` events
- Responsive WebP images and 1200x630 social previews (`npm run images`)
- DESIGN.md, CLAUDE.md and UI primitives in `src/components/ui`

### Changed

- Replaced Tolgee with typed in-repo dictionaries, so the server renders the full text
- Tour cards link to their pages; the Tours section is back on the home page

### Fixed

- Server HTML was an empty `<body>`; content is now rendered on the server
- Testimonial text and dates were shifted for reviews 8 to 12
- "Excelent" typo; `<html lang>` now follows the page language

## [1.0.0] - 2026-05-20

### Added

- Initial production release
- Responsive landing page
- Internationalization with Tolgee
- SSR with TanStack Start
- Cloudflare Workers deployment
- Tours showcase section
- Testimonials carousel
- FAQ section
- WhatsApp integration
- SEO metadata and Open Graph tags

### Technical

- React 19 + TypeScript setup
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Framer Motion animations
- Vitest testing setup
- Husky + lint-staged configuration
