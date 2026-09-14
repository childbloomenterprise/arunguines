import { expect, test } from "@playwright/test";

test("missing posters and blocked playback retain a usable source link", async ({ page }) => {
  await page.route("https://i.ytimg.com/**", (route) => route.abort());
  await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<html><body>Unavailable player fixture<script>addEventListener('message', () => parent.postMessage(JSON.stringify({ event: 'onError', info: 150 }), '*'))</script></body></html>" }));
  await page.goto("/");
  const player = page.locator(".voices-section .performance-tile").first().locator(".embedded-video");
  await player.scrollIntoViewIfNeeded();
  await expect(player.locator(".thumbnail-fallback")).toBeVisible();
  await player.click();
  await expect(page.locator(".voices-section .performance-tile").first().getByRole("status")).toContainText("cannot play inside this browser");
  await expect(page.getByRole("link", { name: "Watch the original", exact: true })).toHaveAttribute("href", "https://www.youtube.com/watch?v=e66PF3ImXIQ");
  await page.getByRole("button", { name: "Close Two voices. One performer.", exact: true }).click();
  await expect(page.locator(".voices-section .performance-tile").first().locator("button.embedded-video")).toBeFocused();
});

test("copy uses the latest brief and reports success", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: async (text: string) => { document.documentElement.dataset.copied = text; } }, configurable: true }));
  await page.goto("/book?country=Canada&location=Toronto&event=Onam&source=%2F");
  await page.getByLabel("Your name", { exact: true }).fill("Asha");
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Enquiry copied");
  await page.getByLabel("Event city", { exact: true }).fill("Ottawa");
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  expect(await page.locator("html").getAttribute("data-copied")).toContain("Ottawa");
  expect(await page.locator("html").getAttribute("data-copied")).not.toContain("Toronto");
});

test("content remains readable without JavaScript and under forced colors", async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  const staticPage = await context.newPage();
  await staticPage.goto("http://localhost:3000");
  await expect(staticPage.locator("h1")).toBeVisible();
  await expect(staticPage.locator(".hero-actions").getByRole("link", { name: "Check Availability" })).toBeVisible();
  await context.close();
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/book");
  await expect(page.getByLabel("Your name", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Prepare my WhatsApp note" })).toBeVisible();
});
