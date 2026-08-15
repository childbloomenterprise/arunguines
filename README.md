# Arun Guinness — Official Website

Conversion-focused, mobile-first portfolio for Kerala singer, voice artist, mimicry performer and live entertainer Arun Guinness.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4/PostCSS
- Vercel hosting
- No database

Booking enquiries open directly in WhatsApp. No personal data is stored by this website.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Vercel deployment

1. Import repository into Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Add `NEXT_PUBLIC_SITE_URL` with final production domain.
5. Deploy.

No database or server secret is required for version 1.

Copy `.env.example` to `.env.local` for local canonical-URL testing. On Vercel, configure the same value in Production, Preview, and Development environments after the final domain is known.

GitHub Actions runs lint, TypeScript, tests, and a production build for every push and pull request. Vercel Git integration can deploy `main` to production and create previews for future branches.

## Content still needed before final public launch

- Guinness World Records certificate and exact record title
- Rotary award certificates/official wording
- Final career/show/country counts
- Professional portrait and original stage photographs
- Five verified organizer testimonials
- Final booking numbers and official spelling confirmation
