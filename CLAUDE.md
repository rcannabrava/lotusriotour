# Lotus Rio Tour

Website of a private tour company in Rio de Janeiro (guide: Patricia Cannabrava). Goal of the site: rank in Google and be cited by AI assistants for "private tour Rio de Janeiro" searches, and send visitors to WhatsApp.

## Read first

- [DESIGN.md](DESIGN.md): visual system. **All new UI must follow it** (tokens, typography, `src/components/ui/` primitives).
- [content/guides/README.md](content/guides/README.md): how to write travel guides (when present).
- [SECURITY.md](SECURITY.md): security headers, CSP, dependency policy and code rules. **Read before adding a third party, a secret, a dependency or any HTML rendered from a string.**

## Stack

TanStack Start (SSR) + TanStack Router (file routes), React 19, Tailwind v4, Framer Motion, Vitest. Deployed on Cloudflare Workers.

## Rules

- **Routes**: everything public lives under `src/routes/{-$lang}/`. English has no URL prefix; `pt-br` and `es` are prefixed. Never link with a plain `<a href>` or `Link`: use `LocalLink`.
- **i18n**: no Tolgee. Strings are typed dictionaries in `src/i18n/locales/` (`en.ts` defines the type; `pt-br.ts` and `es.ts` must match). Use `const { d } = useI18n()`. No hard-coded visible text.
- **SEO**: every route calls `buildHead()` (`src/lib/seo.ts`) in `head()` and emits JSON-LD from `src/lib/schema.ts`. New pages must be added to `src/lib/sitemap.ts`. Pages must render their content on the server (crawlers and AI bots do not run JS).
- **Structured data**: never invent facts. Optional values (`FACTS` in `src/constants/site.ts`, `priceFrom` in `src/data/tours.ts`) stay `undefined` until confirmed.
- **WhatsApp**: always `WhatsAppLink` with a `placement` (analytics).
- **Images**: `ResponsiveImage`; add sources to `scripts/optimize-images.mjs` and run `npm run images`.
- **Security**: a new external origin (font, script, image, embed) must be added to the CSP in `src/lib/security-headers.ts`. `VITE_*` variables are public: never put secrets in them. `dangerouslySetInnerHTML` only for Markdown from `content/` (it is not sanitized). External links get `rel="noopener noreferrer"`. Details in [SECURITY.md](SECURITY.md).
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`…). Files use LF line endings and Prettier (`npm run format`).

## Commands

`npm run dev` · `npm run build` · `npm run test` · `npm run lint` · `npm run typecheck` · `npm run images`

Before finishing a change: `npm run typecheck && npm run lint && npm run test && npm run build`.
