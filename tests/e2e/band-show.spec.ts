import { expect, test } from "@playwright/test";

test("Manthrikam plays on the homepage and preserves the band enquiry", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => { document.documentElement.dataset.handoff = String(url); return null; };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const section = page.getByRole("region", { name: "Manthrikam. The band show." });
  await expect(section).toBeVisible();
  await expect(section.locator(".band-show-grid")).toHaveCSS("display", "grid");
  expect(await section.locator("h2").evaluate((heading) => parseFloat(getComputedStyle(heading).fontSize))).toBeGreaterThanOrEqual(44);
  await section.getByRole("button", { name: "Play Manthrikam — Arun Guinness band show on this page." }).click();
  await expect(page.getByRole("dialog").locator("iframe")).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/NHA7R_KQ2G8\?/);
  await expect(page.getByRole("dialog").getByRole("link", { name: "Open on YouTube" })).toHaveAttribute("href", "https://www.youtube.com/watch?v=NHA7R_KQ2G8");
  await page.getByRole("dialog").getByRole("button", { name: "Close Manthrikam — Arun Guinness band show" }).click();
  await expect(page.getByRole("dialog").locator("iframe")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await section.screenshot({ path: `audit-output/band-show-${test.info().project.name}.png` });
  await section.getByRole("link", { name: "Enquire about the band show" }).click();
  await expect(page.getByLabel("Show preference")).toHaveValue("Manthrikam — Band Show");
  await page.getByLabel("Your name", { exact: true }).fill("Asha");
  await page.getByLabel("Event type", { exact: true }).fill("Community celebration");
  await page.getByLabel("Event country", { exact: true }).fill("India");
  await page.getByLabel("Event city", { exact: true }).fill("Kochi");
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  const handoff = await page.locator("html").getAttribute("data-handoff");
  const message = new URL(handoff!).searchParams.get("text");
  expect(message).toContain("Manthrikam — Band Show");
  expect(message).toContain("Website · /");
  expect(errors).toEqual([]);
});


test("band motion pauses, respects reduced motion and fits touch screens", async ({ page }) => {
  await page.goto("/#band-show");
  const section = page.locator("#band-show");
  await section.scrollIntoViewIfNeeded();
  const rhythm = section.locator(".band-rhythm");
  const bar = section.locator(".band-equalizer i").first();
  await expect(rhythm).toHaveAttribute("data-active", "true");
  await expect(bar).toHaveCSS("animation-play-state", "running");
  const toggle = section.getByRole("button", { name: "Pause band animations" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(bar).toHaveCSS("animation-play-state", "paused");
  await toggle.click();
  await expect(bar).toHaveCSS("animation-play-state", "running");
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(rhythm).toHaveAttribute("data-active", "false");
  await section.scrollIntoViewIfNeeded();
  const cta = section.getByRole("link", { name: "Enquire about the band show" });
  const box = await cta.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(bar).toHaveCSS("animation-name", "none");
  await expect(toggle).not.toBeVisible();
  await expect(cta).toBeVisible();
});
