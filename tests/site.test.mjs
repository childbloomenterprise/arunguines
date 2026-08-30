import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { programs } from "../app/site-data.ts";
import { composeBookingMessage, normalizePhoneInput, recommendShow, validateBookingDraft } from "../app/site-logic.ts";
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
  assert.match(experience, /innerWidth >= 700/);
  assert.match(experience, /saveData/);
  assert.match(experience, /980/);
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
  for (const value of ["Asha", "+919999999999", "One Man Show", "2026-12-18", "Kochi", "Association", "800", "Malayalam and Hindi"]) assert.ok(message.includes(value));
});

test("booking validation normalizes phones and reports required fields", () => {
  assert.equal(normalizePhoneInput(" +91 (96567) 12941 "), "+919656712941");
  assert.equal(normalizePhoneInput("0091-96567-12941"), "00919656712941");
  const errors = validateBookingDraft({ name: "", phone: "123", show: "", date: "2026-01-01", location: "", event: "", audience: "", notes: "" }, "2026-08-28");
  assert.deepEqual(Object.keys(errors).sort(), ["date", "location", "name", "phone", "show"]);
});

test("booking stays database-free with popup fallback and copy action", async () => {
  const [form, pkg] = await Promise.all([read("app/contact/booking-form.tsx"), read("package.json")]);
  assert.match(form, /window\.open/);
  assert.match(form, /popup\.opener = null/);
  assert.match(form, /handoff-fallback/);
  assert.match(form, /navigator\.clipboard\.writeText/);
  assert.match(form, /navigator\.webdriver/);
  assert.match(form, /aria-describedby/);
  assert.match(form, /booking-summary/);
  assert.match(form, /encodeURIComponent/);
  assert.doesNotMatch(pkg, /drizzle|supabase|prisma/);
});

test("public pages omit unresolved launch claims", async () => {
  const publicFiles = await Promise.all(["app/page.tsx", "app/artist/page.tsx", "app/proof/page.tsx", "app/site-components.tsx", "app/site-data.ts"].map(read));
  const publicText = publicFiles.join("\n");
  for (const claim of ["3,000+", "50+", "35+", "nearly two decades", "reconfirmation before public launch", "Guinness certificate verification pending"]) {
    assert.doesNotMatch(publicText, new RegExp(claim.replace(/[+]/g, "\\+"), "i"));
  }
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

test("site includes accessibility, SEO, and responsive safeguards", async () => {
  const [layout, css, frame] = await Promise.all([read("app/layout.tsx"), read("app/globals.css"), read("app/site-components.tsx")]);
  assert.match(layout, /Skip to content/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /100dvh/);
  assert.match(css, /orientation: landscape/);
  assert.match(frame, /ViewTransition/);
  assert.match(css, /forced-colors/);
});

test("menus, intro, and performance filters expose complete keyboard semantics", async () => {
  const [navigation, experience] = await Promise.all([read("app/navigation.tsx"), read("app/experience.tsx")]);
  assert.match(navigation, /focusables/);
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /\.inert = open/);
  assert.match(experience, /introButtonRef/);
  assert.match(experience, /aria-pressed/);
  assert.doesNotMatch(experience, /role="tab"/);
});

test("mobile navigation, booking actions, and performance map respond to context", async () => {
  const [navigation, motion, map, css, page] = await Promise.all([
    read("app/navigation.tsx"),
    read("app/motion-controller.tsx"),
    read("app/performance-map.tsx"),
    read("app/globals.css"),
    read("app/page.tsx"),
  ]);
  for (const section of ["home", "act-two", "build-show", "act-four", "book-home"]) {
    assert.match(navigation, new RegExp(section));
    assert.match(page, new RegExp(`id="${section}"`));
  }
  assert.match(navigation, /aria-current=.*location/);
  assert.match(motion, /scrolling-down/);
  assert.match(motion, /near-booking/);
  assert.match(css, /\.scrolling-down \.mobile-booking/);
  assert.match(css, /\.near-booking \.mobile-booking/);
  assert.match(map, /aria-pressed/);
  assert.match(map, /onPointerMove/);
  assert.match(map, /aria-live="polite"/);
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
