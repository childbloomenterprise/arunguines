# Arun Guinness — Cinematic Stage Design System

## Direction

Premium live-stage portfolio built around Arun, performance footage, bold sans-serif type, negative space, controlled spotlights, and a direct booking path.

Story: **INTRODUCE → PROVE → BUILD TRUST → BOOK**

Avoid SaaS patterns, editorial serif styling, dashboard controls, excessive cards, ornamental labels, technical maps, cursor effects, and constant motion.

Copy rule: one idea per block. Prefer icon + number + 1–3 words. Keep explanation only for booking, evidence, and accessibility.

## 60 / 30 / 10 Color Ratio

| Ratio | Role | Token | Value |
|---|---|---|---|
| 60% | Stage / dominant background | `--stage` | `#0A0A0D` |
| 30% | Content / contrast | `--ivory` | `#F7F3EC` |
| 10% | Energy / brand accents | `--gold` + `--violet` | `#E5B45A` + `#8B5CF6` |

Supporting tokens:

| Role | Token | Value |
|---|---|---|
| Elevated dark surface | `--surface` | `#151519` |
| Secondary text | `--muted` | `#AAA6A1` |
| Deep violet atmosphere | `--violet-deep` | `#2A2038` |
| Divider | `--border` | `#29292E` |

Rules:

- Black and ivory own page area; accents never become section backgrounds.
- Gold: primary CTA, key headline, spotlight, small numbering.
- Violet: waveform, focus state, one interactive highlight, occasional rim light.
- Never use blue/pink gender coding. Voice transition uses gold → violet.

## Typography

- Family: Manrope through `next/font`.
- Headlines: 700–800, uppercase only where concert-poster energy helps.
- Body: 16–18px desktop, 15–17px mobile, line-height 1.55–1.75.
- Labels: minimum 11px, high tracking, short phrases only.
- No decorative serif font.
- Expression comes from scale, weight, spacing, and line composition.

## Layout

- Canvas: full-bleed sections with a `1240px` content shell.
- Section spacing: 96–160px desktop, about 90px mobile.
- Hero: full viewport; copy left, Arun right, no card container.
- Light sections carry proof, show formats, about, and public event notes.
- Dark sections carry hero, signature video, selected performances, journey, and booking.
- Mobile gets intentional stacking, full-width CTAs, responsive media, and one persistent WhatsApp action.

## Components

### Shape language

- Controls: `14px` squircle corners.
- Cards and grouped rows: `22px` squircle corners.
- Images, video, forms, and feature panels: `30px` squircle corners.
- Use `corner-shape: squircle` as progressive enhancement; `border-radius` remains fallback.
- Full-bleed stage sections stay edge-to-edge so page silhouette remains cinematic.

### Navigation

- Transparent over hero.
- Blurred near-black surface after scroll.
- Desktop: Home, Performances, Shows, About, Book Arun.
- Mobile: one menu button, full-screen list, single booking CTA.

### Buttons

- Minimum height: 48px; touch targets never below 44px.
- Primary: gold fill, near-black text.
- Secondary: transparent, subtle border, ivory text.
- Hover: restrained 1px lift or arrow shift; no glow.

### Video

- Thumbnail-first, click-to-load privacy-enhanced YouTube iframe.
- One central play button; no filter UI on homepage.
- No audio autoplay.

### Show formats

- Large typographic rows styled like concert programs.
- One purpose per row: format, description, best fit, action.
- No recommendation engine on homepage.

### Forms

- Visible labels, 16px inputs, clear focus state.
- Booking completes in under one minute.
- WhatsApp remains primary conversion path.

## Motion

- Curtain intro once per browsing session; skip action always available.
- Internal route change: curtains close, route swaps while covered, curtains reopen around the voice mark.
- Route curtain carries no visible copy; motion itself communicates the stage change.
- Reduced motion skips route interception and navigates instantly.
- Scroll reveal: opacity + translateY 20px, about 700ms.
- Image hover: 1.02–1.04 scale.
- Waveform: slow ambient scale; gold → violet.
- `prefers-reduced-motion`: skip intro and expose all content immediately.
- Animate only opacity and transforms.

## Accessibility & Performance

- Visible `:focus-visible` state.
- Semantic sections, labels, headings, and alt text.
- No horizontal overflow at 320px+.
- Hero preloads one optimized WebP; below-fold media lazy-loads.
- Remote YouTube iframes initialize only after click.
- Respect safe areas and preserve zoom.

## Pre-delivery Checklist

- [ ] Arun remains dominant visual focus.
- [ ] Hero reads “ONE MAN. MANY VOICES.” immediately.
- [ ] Signature performance follows hero.
- [ ] Public claims have documented sources.
- [ ] No invented testimonials or unverified record language.
- [ ] One persistent mobile booking action.
- [ ] Keyboard, focus, reduced motion, and 44px targets verified.
- [ ] 320, 375, 390, 768, 1024, 1440, and 1920 layouts verified.
- [ ] Typecheck, lint, unit tests, browser tests, and production build pass.
