import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { programs } from "../app/site-data.ts";
import { composeBookingMessage, recommendShow } from "../app/site-logic.ts";
import { resolveSiteUrl } from "../app/site-url.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage delivers the complete five-act experience", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /One man\./);
  assert.match(page, /Many voices\./);
  for (const act of ["Meet the Performer", "Hear the Impossible", "Build the Show", "Trust the Stage", "Encore"]) assert.match(page, new RegExp(act));
  assert.match(page, /PerformanceDeck/);
  assert.match(page, /ShowBuilder/);
  assert.match(page, /BookingForm/);
});

test("intro plays once per session, stays under budget, and remains replayable", async () => {
  const [experience, navigation, css] = await Promise.all([read("app/experience.tsx"), read("app/navigation.tsx"), read("app/globals.css")]);
  assert.match(experience, /sessionStorage\.getItem\(INTRO_KEY\)/);
  assert.match(experience, /1180/);
  assert.match(experience, /Escape/);
  assert.match(experience, /arun:replay-intro/);
  assert.match(navigation, /arun:replay-intro/);
  assert.match(css, /prefers-reduced-motion/);
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
    assert.ok(navigation.includes(`href: "${route}"`));
    assert.ok(sitemap.includes(`"${route}"`));
    assert.ok(config.includes(`destination: "${route}`));
  }
  for (const route of ["/programs", "/about", "/videos", "/gallery", "/testimonials", "/contact"]) assert.ok(config.includes(`source: "${route}"`));
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

test("site includes accessibility, SEO, and responsive safeguards", async () => {
  const [layout, css, frame] = await Promise.all([read("app/layout.tsx"), read("app/globals.css"), read("app/site-components.tsx")]);
  assert.match(layout, /Skip to content/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /100dvh/);
  assert.match(css, /orientation: landscape/);
  assert.match(frame, /ViewTransition/);
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
