import { expect, test } from "@playwright/test";

test("stage lighting pauses, survives navigation and follows system preference", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-stage-motion", "running");
  await page.getByRole("button", { name: "Pause stage lighting", exact: true }).click();
  await expect(page.locator(".stage-beam").first()).toHaveCSS("animation-play-state", "paused");
  await page.locator(".hero-actions").getByRole("link", { name: "Check Availability" }).click();
  await expect(page.getByRole("button", { name: "Resume stage lighting", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Resume stage lighting", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-stage-motion", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-stage-motion", "paused");
  await expect(page.locator(".stage-beam").first()).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("button", { name: "Stage lighting motion disabled by system preference" })).toBeDisabled();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-stage-motion", "running");
});

test("public metadata uses consistent identity and connected page schema", async ({ page }) => {
  for (const path of ["/", "/shows", "/proof", "/artist", "/book?source=%2Fshows"]) {
    await page.goto(path);
    expect((await page.title()).match(/Arun Guinness/g)).toHaveLength(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Arun Guinness|Arun/);
    await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = schemas.flatMap((text) => JSON.parse(text)["@graph"] ?? []);
    expect(nodes.some((node) => node["@id"].endsWith("#webpage") && node.inLanguage === "en")).toBe(true);
    expect(nodes.find((node) => node["@type"] === "Person").name).toBe("Arun Guinness");
    expect(schemas.join("")).not.toMatch(/Iron Guinness|ml-IN/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
  }
});
