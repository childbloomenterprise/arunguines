import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolveSiteUrl } from "../app/site-url.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage leads with differentiated positioning and booking", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /One man\./);
  assert.match(page, /Many voices\./);
  assert.match(page, /Book a show/);
  assert.match(page, /e66PF3ImXIQ|videos\[0\]/);
});

test("portfolio uses official social profiles and verified real videos", async () => {
  const data = await read("app/site-data.ts");
  assert.match(data, /instagram\.com\/arun_guinness/);
  assert.match(data, /youtube\.com\/@arunguinnes/);
  assert.match(data, /e66PF3ImXIQ/);
  assert.match(data, /6OQvkHQJ2LU/);
});

test("booking stays database-free and sends through WhatsApp", async () => {
  const form = await read("app/contact/booking-form.tsx");
  const pkg = await read("package.json");
  assert.match(form, /window\.open/);
  assert.match(form, /encodeURIComponent/);
  assert.doesNotMatch(pkg, /drizzle|supabase|prisma/);
});

test("site includes accessibility, SEO, and reduced-motion safeguards", async () => {
  const [layout, css] = await Promise.all([read("app/layout.tsx"), read("app/globals.css")]);
  assert.match(layout, /Skip to content/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});

test("canonical site URL survives empty or invalid deployment configuration", () => {
  assert.equal(resolveSiteUrl(undefined), "https://arunguinness.com");
  assert.equal(resolveSiteUrl(""), "https://arunguinness.com");
  assert.equal(resolveSiteUrl("not a URL"), "https://arunguinness.com");
  assert.equal(resolveSiteUrl("ftp://example.com"), "https://arunguinness.com");
  assert.equal(resolveSiteUrl(" https://example.com/path/ "), "https://example.com");
});

test("footer exposes every booking and enquiry channel", async () => {
  const [footer, data] = await Promise.all([read("app/site-components.tsx"), read("app/site-data.ts")]);
  assert.match(footer, /Booking &amp; enquiries/);
  assert.match(footer, /Official YouTube/);
  assert.match(footer, /Official Instagram/);
  assert.match(footer, /Gmail enquiries/);
  assert.match(footer, /Office \/ base/);
  assert.match(data, /arunguinnes@gmail\.com/);
  assert.match(data, /Kothamangalam, Kerala, India/);
});

test("official YouTube performances play inside the website", async () => {
  const [player, components, gallery] = await Promise.all([
    read("app/video-player.tsx"),
    read("app/site-components.tsx"),
    read("app/gallery/page.tsx"),
  ]);
  assert.match(player, /youtube-nocookie\.com\/embed/);
  assert.match(player, /allowFullScreen/);
  assert.doesNotMatch(components, /youtubeUrl\(video\.id\)/);
  assert.match(gallery, /VideoPlayer/);
});
