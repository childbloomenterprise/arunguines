import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { programs } from "../app/site-data.ts";
import { composeBookingMessage, recommendShow } from "../app/site-logic.ts";
import { resolveSiteUrl } from "../app/site-url.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage follows the cinematic introduce, prove, trust, book story", async () => {
  const page = await read("app/page.tsx");
  for (const line of ["ONE MAN.", "MANY VOICES.", "Watch · Listen", "Two voices.", "One performer.", "Stage-tested.", "Any stage.", "Voice,", "engineered.", "Your date.", "His stage."]) assert.match(page, new RegExp(line));
  for (const id of ["signature", "career-proof", "shows", "performances", "about", "journey", "stage-notes", "book-home"]) assert.match(page, new RegExp(`id="${id}"`));
  assert.match(page, /BookingForm/);
  assert.doesNotMatch(page, /ShowBuilder|PerformanceDeck|hero-status|hero-ticket|Act I/);
});

test("intro plays once per session, stays under budget, and remains replayable", async () => {
  const [experience, components, css] = await Promise.all([read("app/experience.tsx"), read("app/site-components.tsx"), read("app/globals.css")]);
  assert.match(experience, /sessionStorage\.getItem\(INTRO_KEY\)/);
  assert.match(experience, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(experience, /Escape/);
  assert.match(experience, /arun:replay-intro/);
  assert.match(components, /ReplayIntroButton/);
  assert.match(css, /prefers-reduced-motion/);
});

test("internal navigation closes and opens an accessible stage curtain", async () => {
  const [experience, layout, css] = await Promise.all([read("app/experience.tsx"), read("app/layout.tsx"), read("app/globals.css")]);
  assert.match(experience, /export function RouteCurtain/);
  assert.match(experience, /closest\("a\[href\]"\)/);
  assert.match(experience, /router\.push/);
  assert.match(experience, /prefers-reduced-motion: reduce/);
  assert.match(layout, /<RouteCurtain \/>/);
  assert.match(css, /\.route-curtain-panel-left/);
  assert.match(css, /\.route-curtain-panel-right/);
});

test("visible copy stays concise and symbols carry repeated meaning", async () => {
  const [home, components, icons] = await Promise.all([read("app/page.tsx"), read("app/site-components.tsx"), read("app/icons.tsx")]);
  assert.match(home, /Male\. Female\. Music\. Mimicry\./);
  assert.doesNotMatch(home, /From powerful male vocals to iconic female playback voices/);
  assert.doesNotMatch(home, /Sound-engineering roots shaped his ear/);
  assert.match(components, /MeaningIcon/);
  for (const icon of ["Microphone", "Clock", "People", "Globe", "Television", "Sparkles"]) assert.match(icons, new RegExp(`function ${icon}`));
});

test("visual system encodes the requested 60/30/10 stage palette", async () => {
  const css = await read("app/globals.css");
  for (const color of ["#0a0a0d", "#f7f3ec", "#e5b45a", "#8b5cf6"]) assert.match(css.toLowerCase(), new RegExp(color));
  assert.match(css, /--stage-ratio-dark:\s*60%/);
  assert.match(css, /--stage-ratio-ivory:\s*30%/);
  assert.match(css, /--stage-ratio-energy:\s*10%/);
});

test("interactive surfaces use a consistent progressive squircle system", async () => {
  const css = await read("app/globals.css");
  for (const token of ["--squircle-control", "--squircle-card", "--squircle-media"]) assert.match(css, new RegExp(token));
  assert.match(css, /@supports\s*\(corner-shape:\s*squircle\)/);
  assert.match(css, /corner-shape:\s*squircle/);
  assert.doesNotMatch(css, /border-radius:\s*0;/);
});

test("show recommendation responds deterministically to event context", () => {
  assert.equal(recommendShow(programs, { event: "corporate", audience: "250-1000", duration: "60-120" }).slug, "variety-musical");
  assert.equal(recommendShow(programs, { event: "association", audience: "250-1000", duration: "60-120" }).slug, "one-man-show");
  assert.equal(recommendShow(programs, { event: "public-festival", audience: "1000-plus", duration: "over-120" }).slug, "mega-show");
  assert.equal(recommendShow(programs, { event: "awards", audience: "under-250", duration: "under-30" }).slug, "guest-performance");
});

test("booking composer includes every operational field", () => {
  const message = composeBookingMessage({ name: "Asha", phone: "+91 99999 99999", show: "One Man Show", date: "2026-12-18", location: "Kochi", event: "Association", audience: "800", notes: "Malayalam and Hindi" });
  for (const value of ["Asha", "+91 99999 99999", "One Man Show", "2026-12-18", "Kochi", "Association", "800", "Malayalam and Hindi"]) assert.ok(message.includes(value));
});

test("booking stays database-free with popup fallback and copy action", async () => {
  const [form, pkg] = await Promise.all([read("app/contact/booking-form.tsx"), read("package.json")]);
  assert.match(form, /window\.open/);
  assert.match(form, /popup\.opener = null/);
  assert.match(form, /handoff-fallback/);
  assert.match(form, /navigator\.clipboard\.writeText/);
  assert.match(form, /encodeURIComponent/);
  assert.doesNotMatch(pkg, /drizzle|supabase|prisma/);
});

test("canonical routes and permanent redirects replace legacy structure", async () => {
  const [navigation, sitemap, config] = await Promise.all([read("app/site-data.ts"), read("app/sitemap.ts"), read("next.config.ts")]);
  for (const route of ["/shows", "/artist", "/proof", "/book"]) {
    assert.ok(sitemap.includes(`"${route}"`));
    assert.ok(config.includes(`destination: "${route}`));
  }
  for (const route of ["/shows", "/artist", "/proof"]) assert.ok(navigation.includes(`href: "${route}"`));
  for (const route of ["/programs", "/about", "/videos", "/gallery", "/testimonials", "/contact"]) assert.ok(config.includes(`source: "${route}"`));
});

test("supporting pages emit route-specific canonical metadata", async () => {
  for (const route of ["shows", "artist", "proof", "book"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.ok(page.includes(`canonical: "/${route}"`));
    assert.ok(page.includes(`url: "/${route}"`));
  }
});

test("performance deck uses verified media and click-to-load embeds", async () => {
  const [data, player, experience] = await Promise.all([read("app/site-data.ts"), read("app/video-player.tsx"), read("app/experience.tsx")]);
  for (const id of ["e66PF3ImXIQ", "7FufHDMK8Xw", "LcwIFf_3A34"]) assert.match(data, new RegExp(id));
  assert.match(data, /instagram\.com\/arun_guinness/);
  assert.match(data, /youtube\.com\/@arunguinnes/);
  assert.match(player, /youtube-nocookie\.com\/embed/);
  assert.match(player, /allowFullScreen/);
  assert.match(player, /setPlaying\(true\)/);
  assert.match(experience, /onTouchStart/);
  assert.match(experience, /ArrowRight/);
});

test("public proof avoids pending claims and invented testimonials", async () => {
  const [data, home] = await Promise.all([read("app/site-data.ts"), read("app/page.tsx")]);
  assert.doesNotMatch(data, /verification pending|reconfirmation pending/i);
  assert.doesNotMatch(home, /3,000\+|50\+ countries|Guinness World Record holder/i);
  assert.match(home, /Verified words|stageNotes/);
});

test("site includes accessibility, SEO, and responsive safeguards", async () => {
  const [layout, css, frame] = await Promise.all([read("app/layout.tsx"), read("app/globals.css"), read("app/site-components.tsx")]);
  assert.match(layout, /Skip to content/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /100dvh/);
  assert.match(css, /orientation: landscape/);
  assert.match(frame, /ViewTransition/);
  assert.match(frame, /mobile-booking/);
  assert.match(frame, /WhatsApp/);
});

test("canonical site URL survives empty or invalid deployment configuration", () => {
  assert.equal(resolveSiteUrl(undefined), "https://arunguinness.com");
  assert.equal(resolveSiteUrl(""), "https://arunguinness.com");
  assert.equal(resolveSiteUrl("not a URL"), "https://arunguinness.com");
  assert.equal(resolveSiteUrl("ftp://example.com"), "https://arunguinness.com");
  assert.equal(resolveSiteUrl(" https://example.com/path/ "), "https://example.com");
});

test("only canonical URLs appear in sitemap", async () => {
  const sitemap = await read("app/sitemap.ts");
  for (const route of ["/programs", "/about", "/videos", "/gallery", "/testimonials", "/contact"]) assert.doesNotMatch(sitemap, new RegExp(`"${route}"`));
});
