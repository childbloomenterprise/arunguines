import { expect, test } from "@playwright/test";

test("light theme stays readable with reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(251, 250, 246)");
  await expect(page.locator(".stage-atmosphere")).toHaveCount(0);
  await page.locator(".hero-actions").getByRole("link", { name: "Check Availability" }).click();
  await expect(page.getByRole("button", { name: "Prepare my WhatsApp note" })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByLabel("Your name", { exact: true })).toBeVisible();
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
