# Arun Guinness Design System

Single source of truth for the public website. Implementation tokens live in `app/globals.css`.

## Direction

- Clean modern editorial portfolio; performance proof leads, decoration supports.
- Warm ivory canvas, charcoal text, plum structure, brass only for primary action and proof accents.
- Manrope handles navigation, controls and body copy. Bodoni Moda appears only in major headings.
- Cinematic editorial motion: 160–420ms opacity/transform transitions, restrained hero entrances, state crossfades and media depth on fine pointers only. No scroll hijacking, cursor spotlight or decorative loading sequence.

## Core Tokens

| Role | Value |
|---|---|
| Paper | `#FFFDF8` |
| Ivory | `#F4EFE6` |
| Ink | `#211C20` |
| Plum | `#4B2142` |
| Dark plum | `#261622` |
| Brass | `#D3AA62` |
| Muted text | `#6C6369` |
| Small radius | `12px` |
| Media radius | `20px` maximum |
| Content width | `1240px` maximum |

## Media Rules

- Performances and video thumbnails: `16:9`.
- Approved portrait/headshot assets: `4:3`.
- Voice-library and logo thumbnails: `1:1`.
- Every responsive image uses `next/image`, `fill`, an accurate `sizes` value and reserved aspect-ratio space.
- Center is default focal point; override only with documented per-asset `focalPoint`.
- Never crop performance video into arches, circles or tall portrait frames.
- One unobstructed badge and one concise caption maximum. Play control remains centered.

## Interaction and Accessibility

- Primary action: Book Arun. Video playback lives on the media itself.
- Minimum touch target: `44px`; default button height: `50px`.
- Minimum interface text: `12px`; body copy: `16px` or larger.
- All focus states remain visible. Do not remove outlines without a stronger replacement.
- Support keyboard navigation, forced colors, 200% zoom and `prefers-reduced-motion`.
- Limit motion to one or two focal elements per viewport; content remains immediately usable and every state change stays interruptible.
- Mobile booking bar appears only after the hero and disappears near the booking section/footer.

## Page Hierarchy

1. Home: hero → verified signals → shows → performance → about → booking CTA.
2. Shows: compact intro → recommender → formats → FAQ.
3. Watch: compact intro → performance archive → verified signals → reach → sources.
4. About: compact intro → differentiator → craft → repertoire → timeline.
5. Book: compact intro → guided form → direct contact fallback.

## Pre-Delivery Checklist

- No performance media uses `4:5`.
- No horizontal overflow from `320px` through `1920px`.
- Hero media and booking action remain visible within `390×844` first viewport.
- No UI text below `12px`; body text meets contrast requirements.
- Lint, TypeScript, unit tests, production build and responsive browser checks pass.
