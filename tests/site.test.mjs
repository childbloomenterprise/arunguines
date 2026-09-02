import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { programs, stagePresets, videos, youtubePosterSources } from "../app/site-data.ts";
import { composeBookingMessage, normalizePhoneInput, recommendShow, validateBookingDraft } from "../app/site-logic.ts";
import { resolveSiteUrl } from "../app/site-url.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage delivers the simplified conversion narrative", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /className="hero-name">Arun Guinness<\/span>/);
  assert.match(page, /One man\./);
  assert.match(page, /Many voices\./);
  for (const section of ["shows-home", "performances-home", "about-home", "book-home"]) assert.match(page, new RegExp(`id="${section}"`));
  assert.match(page, /PerformanceDeck/);
  assert.match(page, /ProgramCards/);
  assert.match(page, /MediaRail/);
  assert.doesNotMatch(page, /ShowBuilder|InteractiveTimeline|PerformanceMap|BookingForm/);
});

test("hero uses explicit responsive media instead of decorative portrait crops", async () => {
  const [page, player, layout, navigation, css] = await Promise.all([read("app/page.tsx"), read("app/video-player.tsx"), read("app/layout.tsx"), read("app/navigation.tsx"), read("app/globals.css")]);
  assert.match(page, /ratio="16:9"/);
  assert.match(player, /ratio\?: "16:9" \| "4:3" \| "1:1"/);
  assert.match(player, /focalPoint\?: string/);
  assert.match(css, /\.media-ratio-16-9 \{ aspect-ratio: 16\/9; \}/);
  assert.doesNotMatch(css, /aspect-ratio:\s*4\/5/);
  assert.doesNotMatch(page, /hero-ticket|hero-frame|hero-spotlight/);
  assert.doesNotMatch(layout, /StageIntro|site-progress/);
  assert.doesNotMatch(navigation, /Replay|arun:replay-intro/);
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

test("stage presets map to deterministic recommendations and energy", () => {
  const expected = { campus: "variety-musical", festival: "mega-show", corporate: "variety-musical", guest: "guest-performance" };
  for (const preset of stagePresets) {
    assert.equal(recommendShow(programs, preset).slug, expected[preset.key]);
    assert.ok(preset.energy >= 0 && preset.energy <= 100);
  }
});

test("performance posters expose verified fallback sources", () => {
  const voice = videos.find((video) => video.id === "P1jg8u0ldbs");
  assert.ok(voice);
  const sources = youtubePosterSources(voice.id, voice.poster);
  assert.equal(sources.length, 2);
  assert.match(sources[0], /hqdefault\.jpg$/);
  assert.match(sources[1], /maxresdefault\.jpg$/);
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
  for (const route of ["/shows", "/school-college-shows", "/artist", "/proof", "/book"]) {
    assert.ok(navigation.includes(`href: "${route}"`));
    assert.ok(sitemap.includes(`"${route}"`));
    if (route !== "/school-college-shows") assert.ok(config.includes(`destination: "${route}`));
  }
  for (const route of ["/programs", "/about", "/videos", "/gallery", "/testimonials", "/contact"]) assert.ok(config.includes(`source: "${route}"`));
});

test("supporting pages emit route-specific canonical metadata", async () => {
  for (const route of ["shows", "school-college-shows", "artist", "proof", "book"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.ok(page.includes(`canonical: "/${route}"`));
    assert.ok(page.includes(`url: "/${route}"`));
  }
});

test("school and college stage offering uses verified institutional evidence", async () => {
  const [page, selector, data, shows] = await Promise.all([
    read("app/school-college-shows/page.tsx"),
    read("app/campus-stage-selector.tsx"),
    read("app/site-data.ts"),
    read("app/shows/page.tsx"),
  ]);
  const campusText = `${page}\n${selector}`;
  for (const venue of ["School stage", "College stage", "annual days", "college fests", "arts festivals", "campus inaugurations"]) assert.match(campusText, new RegExp(venue, "i"));
  assert.match(campusText, /P22go-G5Xnc/);
  assert.match(page, /Mary Mount Public School/);
  assert.match(page, /SFS Public School/);
  assert.match(selector, /encodeURIComponent\(stage\.event\)/);
  assert.match(data, /href: "\/school-college-shows"/);
  assert.match(shows, /CampusStageFeature/);
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
  assert.match(experience, /performance-progress/);
  assert.match(player, /youtubePosterSources/);
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

test("menus and performance filters expose complete keyboard semantics", async () => {
  const [navigation, experience] = await Promise.all([read("app/navigation.tsx"), read("app/experience.tsx")]);
  assert.match(navigation, /focusables/);
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /\.inert = open/);
  assert.match(experience, /aria-pressed/);
  assert.doesNotMatch(experience, /role="tab"/);
  assert.doesNotMatch(experience, /StageIntro|ReplayIntroButton/);
});

test("mobile navigation, booking actions, and performance map respond to context", async () => {
  const [navigation, motion, map, css, page] = await Promise.all([
    read("app/navigation.tsx"),
    read("app/motion-controller.tsx"),
    read("app/performance-map.tsx"),
    read("app/globals.css"),
    read("app/page.tsx"),
  ]);
  for (const section of ["home", "shows-home", "performances-home", "about-home", "book-home"]) {
    assert.match(page, new RegExp(`id="${section}"`));
  }
  assert.doesNotMatch(navigation, /Homepage sections/);
  assert.match(motion, /scrolling-down/);
  assert.match(motion, /near-booking/);
  assert.match(css, /scrolling-down body:not\(\.menu-open\) \.site-header/);
  assert.match(css, /\.past-hero:not\(\.scrolling-down\):not\(\.near-booking\) \.mobile-booking/);
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
