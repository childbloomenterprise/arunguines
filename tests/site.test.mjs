import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { programs, stagePortfolio, stagePresets, videos, youtubePosterSources } from "../app/site-data.ts";
import { composeBookingMessage, normalizePhoneInput, recommendShow, validateBookingDraft } from "../app/site-logic.ts";
import { resolveSiteUrl } from "../app/site-url.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");



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

test("original photographs and PDF additions form a browsable portfolio", async () => {
  assert.equal(stagePortfolio.length, 25);
  assert.equal(new Set(stagePortfolio.map((photo) => photo.src)).size, stagePortfolio.length);
  assert.ok(stagePortfolio.every((photo) => photo.src.startsWith("/portfolio/") && photo.alt && photo.caption && photo.collection));
  assert.equal(stagePortfolio.filter((photo) => photo.sourcePage).length, 11);
  await Promise.all(stagePortfolio.map((photo) => readFile(new URL(`public${photo.src}`, root))));

  const [gallery, homepage, proof, css] = await Promise.all([
    read("app/photo-portfolio.tsx"),
    read("app/page.tsx"),
    read("app/proof/page.tsx"),
    read("app/portfolio.css"),
  ]);
  assert.match(gallery, /showModal/);
  assert.match(gallery, /aria-label="Previous photos"/);
  assert.match(gallery, /aria-label="Next photos"/);
  assert.match(css, /\.photo-viewer-image img \{ object-fit: contain; \}/);
  assert.match(homepage, /featuredPhotos/);
  assert.match(homepage, /moments-grid/);
  assert.match(homepage, /homepageVideos/);
  assert.match(homepage, /One Man, /);
  assert.match(proof, /PhotoPortfolio/);
});

test("booking validation normalizes phones and reports required fields", () => {
  assert.equal(normalizePhoneInput(" +91 (96567) 12941 "), "+919656712941");
  assert.equal(normalizePhoneInput("0091-96567-12941"), "00919656712941");
  const errors = validateBookingDraft({ country: "", source: "/book", name: "", phone: "123", show: "", date: "2026-01-01", location: "", event: "", audience: "", notes: "" }, "2026-08-28");
  assert.deepEqual(Object.keys(errors).sort(), ["country", "date", "event", "location", "name", "phone"]);
});


test("public pages omit unresolved launch claims", async () => {
  const publicFiles = await Promise.all(["app/page.tsx", "app/artist/page.tsx", "app/proof/page.tsx", "app/site-components.tsx", "app/site-data.ts"].map(read));
  const publicText = publicFiles.join("\n");
  for (const claim of ["3,000+", "50+", "35+", "nearly two decades", "reconfirmation before public launch", "Guinness certificate verification pending"]) {
    assert.doesNotMatch(publicText, new RegExp(claim.replace(/[+]/g, "\\+"), "i"));
  }
});

test("canonical routes and permanent redirects replace legacy structure", async () => {
  const [navigation, footer, sitemap, config] = await Promise.all([read("app/site-data.ts"), read("app/site-components.tsx"), read("app/sitemap.xml"), read("next.config.ts")]);
  for (const route of ["/shows", "/artist", "/proof"]) {
    assert.ok(navigation.includes(`href: "${route}"`) || footer.includes(`href="${route}"`));
    assert.ok(sitemap.includes(`arunguinness.com${route}</loc>`));
  }
  assert.match(config, /output: "export"/);
  assert.match(config, /unoptimized: true/);
  for (const route of ["programs", "about", "videos", "gallery", "testimonials"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.match(page, /permanentRedirect/);
  }
  assert.match(await read("app/contact/page.tsx"), /location\.search/);
});

test("supporting pages emit route-specific canonical metadata", async () => {
  const seo = await read("app/seo.ts");
  for (const route of ["shows", "school-college-shows", "artist", "proof", "book"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.ok(page.includes(`path: "/${route}"`));
  }
  assert.match(seo, /alternates: \{ canonical: path \}/);
  assert.match(seo, /url: path/);
});

test("school and college stage offering keeps verified video and direct enquiry", async () => {
  const [page, selector, data] = await Promise.all([
    read("app/school-college-shows/page.tsx"),
    read("app/campus-stage-selector.tsx"),
    read("app/site-data.ts"),
  ]);
  assert.match(page, /P22go-G5Xnc/);
  assert.match(page, /Mary Mount Public School/);
  assert.match(page, /Check Availability/);
  assert.match(selector, /encodeURIComponent\(stage\.event\)/);
  assert.match(data, /Malayali associations/);
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


test("canonical site URL cannot drift to a preview deployment hostname", () => {
  for (const value of [undefined, "", "not a URL", "https://arunguines.vercel.app"]) {
    assert.equal(resolveSiteUrl(value), "https://www.arunguinness.com");
  }
});

test("sitemap and robots preserve the existing canonical hostname", async () => {
  const [sitemap, robots] = await Promise.all([read("app/sitemap.xml"), read("app/robots.ts")]);
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
  assert.ok(urls.length >= 8);
  assert.ok(urls.every((url) => url.origin === resolveSiteUrl(undefined)));
  assert.ok(robots.includes("sitemap"));
});

test("only canonical URLs appear in sitemap", async () => {
  const sitemap = await read("app/sitemap.xml");
  for (const route of ["/programs", "/about", "/videos", "/gallery", "/testimonials", "/contact"]) assert.ok(!sitemap.includes(`arunguinness.com${route}</loc>`));
});

test("SEO keyword strategy exceeds the requested 75 unique phrases", async () => {
  const seo = await read("app/seo.ts");
  const extractArray = (name) => {
    const block = seo.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
    assert.ok(block, `Missing ${name}`);
    return [...block[1].matchAll(/^\s+"([^"]+)",?$/gm)].map((match) => match[1]);
  };
  const performerKeywords = extractArray("performerKeywords");
  const soloStageKeywords = extractArray("soloStageKeywords");
  const regionalStageKeywords = extractArray("regionalStageKeywords");
  const seoKeywords = [...performerKeywords, ...soloStageKeywords, ...regionalStageKeywords];
  assert.ok(performerKeywords.length > 25);
  assert.ok(soloStageKeywords.length > 75);
  assert.ok(regionalStageKeywords.length > 75);
  assert.ok(seoKeywords.length > 150);
  assert.equal(new Set(seoKeywords.map((keyword) => keyword.toLowerCase())).size, seoKeywords.length);
  for (const phrase of ["solo stage shows", "Kochi solo stage shows", "Arun Guinness", "Iron Guinness", "Malayali association stage show", "stage shows abroad"]) {
    assert.ok(seoKeywords.includes(phrase), `Missing SEO phrase: ${phrase}`);
  }
});

test("dedicated solo and Kochi pages retain canonical metadata and booking paths", async () => {
  for (const route of ["solo-stage-shows", "kochi-stage-shows"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.ok(page.includes(`path: "/${route}"`));
    assert.match(page, /VideoPlayer/);
    assert.match(page, /Check Availability/);
  }
});

test("sitemap includes every indexable SEO landing page", async () => {
  const sitemap = await read("app/sitemap.xml");
  for (const route of ["/solo-stage-shows", "/kochi-stage-shows"]) assert.ok(sitemap.includes(`arunguinness.com${route}</loc>`));
  assert.doesNotMatch(sitemap, /new Date\(\)/);
});
