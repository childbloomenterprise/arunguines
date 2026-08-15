# Arun Guinness — Orbital Design System

## Direction

Airy editorial music portfolio built from circles, orbits, soft capsules, and generous negative space. Energy comes from scale, voice, and motion—not dense decoration.

## Color

| Role | Token | Value |
|---|---|---|
| Canvas | `--paper` | `#F7F4EE` |
| Surface | `--paper-2` | `#FFFDF9` |
| Ink / dark section | `--black` | `#17132F` |
| Primary accent | `--gold` | `#7052D9` |
| Warm accent | `--orange` | `#E85F57` |
| Cool accent | `--sky` | `#72D3E7` |
| Secondary accent | `--mint` | `#8BD5B5` |
| Muted text | `--muted` | `#6E687C` |

No yellow, pure black, hard monochrome, or full-canvas dark treatment.

## Typography

- Display: Cormorant Garamond, weights 400–700; expressive, editorial, often italicized for emphasis.
- Body/UI: Manrope; precise, compact, highly legible.
- Hero: fluid mixed-case composition; no condensed all-caps display treatment.
- Body measure: 60–75 characters desktop, 35–60 mobile.

Both fonts load through `next/font` and are self-hosted by Next.js.

## Shape Language

- Hero media: full circle.
- Data/repertoire cards: circles or soft ellipses.
- Program cards: asymmetric organic corner radii.
- Navigation/buttons/tags: capsules.
- Standard cards: minimum 28px radius.
- Thin orbital lines; colored satellite dots; no sharp rectangular framing.

## Motion

- Scroll entrances: opacity + translate + subtle scale only.
- Stagger: 55–70ms within grids.
- Scroll progress: one requestAnimationFrame-throttled CSS variable.
- Media hover: subtle transform and saturation.
- YouTube: click-to-load privacy-enhanced iframe; no iframe cost before interaction.
- `prefers-reduced-motion`: removes transitions, progress animation, and transformed layouts.

## Layout

- Spacious density: 92–180px section spacing.
- Mobile-first; validated at 390×844 and 844×390.
- Desktop canvas validated at 1440×1000.
- No horizontal overflow.
- Fixed header and mobile booking bar use pill geometry and preserve touch clearance.

## Interaction / Accessibility

- Minimum 44×44px icon controls.
- Visible focus rings and skip link.
- Native buttons for embedded video triggers.
- Every video trigger states that playback happens on-page.
- Form labels remain explicit; no placeholder-only fields.
- Meaningful images have alt text; decorative orbit elements are hidden from assistive technology.

## Performance Guardrails

- Animate only `transform` and `opacity`.
- Below-fold thumbnails remain lazy-loaded and responsive through `next/image`.
- Only hero thumbnail preloads.
- YouTube embeds initialize only after click.
- No WebGL, canvas loop, GSAP, or animation dependency.
