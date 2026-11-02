# Security

How the Lotus Rio Tour site is protected, and the rules every change must follow. The site is small on purpose: no login, no forms, no database, no API of its own. Every conversion goes to WhatsApp. Most of the protection below keeps it that way.

## Reporting a vulnerability

Do not open a public issue. Report it privately through [GitHub private vulnerability reporting](https://github.com/rcannabrava/lotusriotour/security/advisories/new) (Security tab → "Report a vulnerability").

## 1. Threat model

| Asset                                     | Main risk                                              | Where it is handled                       |
| ----------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| The site's content and reputation         | Defacement, injected scripts, clickjacking             | Security headers (§2), content rules (§4) |
| Visitors                                  | XSS, tracking without consent                          | CSP (§2), Consent Mode in `analytics.ts`  |
| Domain, Cloudflare, GitHub, Google access | Account takeover (the most likely attack on this site) | Accounts (§5)                             |
| Build and runtime                         | Vulnerable or hijacked npm packages                    | Dependencies (§3)                         |

Out of scope today: CSRF, rate limiting, custom WAF rules, CAPTCHA, authentication. There is nothing for them to protect. **Revisit this file if the site ever gets a form, a login, a server function that writes data, or user-submitted content.**

## 2. HTTP security headers

Two places set them:

- **Pages** (everything rendered by the Worker): [`src/lib/security/security-headers.ts`](src/lib/security/security-headers.ts), applied to every response in [`src/server.ts`](src/server.ts), error pages included. Tested in [`src/tests/security/security-headers.test.ts`](src/tests/security/security-headers.test.ts).
- **Static files** (JS, CSS, images, favicon), which Cloudflare serves without running the Worker: [`public/_headers`](public/_headers).

| Header                       | Value                                             | Why                                               |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `Content-Security-Policy`    | Allowlist, see below                              | Blocks scripts and resources from unknown origins |
| `Strict-Transport-Security`  | `max-age=31536000; includeSubDomains`             | Forces HTTPS for a year                           |
| `X-Content-Type-Options`     | `nosniff`                                         | Stops the browser from guessing file types        |
| `X-Frame-Options`            | `DENY` (plus CSP `frame-ancestors 'none'`)        | No one can embed the site in an iframe            |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`                 | Other sites only see the domain, not the full URL |
| `Permissions-Policy`         | camera, microphone, geolocation, payment, usb off | Turns off browser APIs the site never uses        |
| `Cross-Origin-Opener-Policy` | `same-origin`                                     | Isolates the window from pages it opens           |

A header already set by a route is kept, so a route can override one when it really needs to.

### Content Security Policy

Allowed third parties:

| Directive     | Origins                                                               | For                     |
| ------------- | --------------------------------------------------------------------- | ----------------------- |
| `script-src`  | `'self'`, `'unsafe-inline'`, `www.googletagmanager.com`               | App, hydration, GA4     |
| `style-src`   | `'self'`, `'unsafe-inline'`, `fonts.googleapis.com`                   | Tailwind, Google Fonts  |
| `font-src`    | `'self'`, `fonts.gstatic.com`                                         | Google Fonts files      |
| `img-src`     | `'self'`, `data:`, `cdn.trustindex.io`, GTM, `*.google-analytics.com` | TripAdvisor badges, GA4 |
| `connect-src` | `'self'`, GTM, `*.google-analytics.com`, `*.analytics.google.com`     | GA4 hits                |

Everything else is `'self'` or `'none'` (`object-src`, `frame-ancestors`), and `base-uri` / `form-action` are locked to `'self'`.

`'unsafe-inline'` in `script-src` is a known trade-off: TanStack Start's SSR hydration emits inline `<script>` tags. Removing it needs nonce support in the router (`ssr.nonce`). Worth doing if the site ever renders user-supplied content.

**Adding a third party** (new font, embed, map, pixel, image CDN): add its origin to `CSP_DIRECTIVES` in `security-headers.ts` in the same change, or the browser will silently block it. Check the browser console on the deployed preview for `Refused to load` errors.

## 3. Dependencies

- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs `npm audit --omit=dev --audit-level=high` before lint. A high or critical vulnerability in a production dependency fails the build.
- **Dependabot** ([`.github/dependabot.yml`](.github/dependabot.yml)) opens a grouped PR every week for npm minor/patch updates, and every month for GitHub Actions.
- **TanStack is pinned on purpose.** `@tanstack/react-start` stays on `~1.168` because 1.169+ requires Vite 8. `@tanstack/react-router` and `@tanstack/router-plugin` are pinned to the exact versions Start bundles: two copies of the router break the types. Dependabot ignores the three. Upgrade them together with Vite, by hand, when moving to Vite 8.
- **Remove unused packages.** Fewer packages, fewer advisories. Before adding one, check that the platform or an existing dependency doesn't already cover it.
- Dev-only advisories (eslint, vitest) are not gated in CI. Clear them when upgrading those tools.

## 4. Code and content rules

- **`VITE_*` variables are public.** Vite inlines them into the browser bundle. Never put a token, key or password in one. Today there are only `VITE_GA_ID` and `VITE_SHOW_DRAFTS`, and both are fine to expose. Real secrets go in Worker secrets (`wrangler secret put`) and are read on the server only.
- **Guides are trusted HTML.** Markdown in `content/guides/` is rendered with `marked` and injected with `dangerouslySetInnerHTML` ([`src/routes/{-$lang}/guides/$slug.tsx`](src/routes/{-$lang}/guides/$slug.tsx)). `marked` does not sanitize. This is safe only because the content comes from this repository and goes through review. Never render Markdown or HTML from any other source (CMS, form, API, AI output not reviewed) without sanitizing it with DOMPurify first.
- **No other `dangerouslySetInnerHTML`.** JSON-LD goes through `buildHead()` in `src/lib/seo/seo.ts`, which serializes it with `JSON.stringify`.
- **External links** open with `target="_blank"` and always `rel="noopener noreferrer"`. `WhatsAppLink` and the guide renderer already do this.
- **Error pages never leak details.** `src/server.ts` logs the real error to the Worker logs and returns the generic branded page. Keep it that way.
- **Analytics only after consent.** GA4 loads with Consent Mode v2 and `analytics_storage: denied` until the visitor accepts the cookie banner (`src/lib/analytics/analytics.ts`). Don't add trackers that bypass it.

## 5. Accounts and infrastructure (manual)

Not in the code, but this is where a site like this is most likely to be attacked. Check these once, and again when someone joins or leaves:

- [ ] 2FA on Cloudflare, GitHub, the domain registrar, and Google (Analytics, Search Console, Business Profile)
- [ ] Branch protection on `main`: pull request required, CI must pass
- [ ] GitHub private vulnerability reporting enabled (Settings → Code security)
- [ ] Cloudflare: **Always Use HTTPS** on, **Minimum TLS 1.2**, **DNSSEC** on
- [ ] Cloudflare **Bot Fight Mode**: if on, confirm that Googlebot, GPTBot, ClaudeBot and PerplexityBot still reach the site, since being read by them is the site's goal
- [ ] Remove access for people who no longer work on the site

## Checklist for changes

- [ ] New third-party origin → added to the CSP
- [ ] New secret → Worker secret, not `VITE_*`
- [ ] New HTML rendered from a string → comes from the repo, or is sanitized
- [ ] New dependency → actually needed, and `npm audit --omit=dev` stays clean
- [ ] Form, login, or data written by visitors → revisit §1 first
