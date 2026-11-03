# Contributing

Thank you for considering contributing to Lotus Rio Tour.

## Technologies Used

- React
- TypeScript
- TanStack Start
- Vite
- Tailwind CSS
- Cloudflare Workers
- Typed i18n dictionaries (`src/i18n/locales`)

## Prerequisites

Before getting started, make sure you have installed:

- Node.js
- npm
- Git

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/lotusriotour.git
```

Navigate to the project folder:

```bash
cd lotusriotour
```

Install the dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

To test the Cloudflare environment locally:

```bash
npx wrangler dev
```

## Commit Convention

This project follows the Conventional Commits standard.

Examples:

```bash
feat: add testimonials section
fix: correct hreflang for pt-br pages
refactor: simplify tour page layout
docs: update README
style: improve mobile spacing
```

## Basic Project Structure

```txt
src/
├── assets/       # photos (originals), brand (logo, icons), optimized (generated)
├── components/   # layout, sections, ui (design-system primitives)
├── i18n/         # locales and typed dictionaries
├── routes/       # pages under {-$lang}/
├── lib/          # seo, security, errors, content, analytics
├── tests/        # one folder per domain (seo, security, i18n, data, ...)
└── server.ts
```

## Pull Requests

Before opening a PR (read [DESIGN.md](../DESIGN.md) if you touch UI):

- Run `npm run typecheck && npm run lint && npm run test && npm run build`
- Avoid unnecessary commits
- Keep the code consistent with the current style
- Test your changes locally

## Branch Naming

Suggested naming conventions:

```bash
feature/feature-name
fix/fix-name
refactor/refactor-name
```

## License

By contributing to this project, you agree that your code will be distributed under the same license as the repository.
