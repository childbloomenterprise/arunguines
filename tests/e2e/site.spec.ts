import { expect, test } from "@playwright/test";

const routes = ["/", "/shows", "/artist", "/proof", "/book"] as const;
const waitForHydration = async (page: import("@playwright/test").Page) => expect(page.locator("html")).toHaveClass(/motion-ready/);

test.beforeEach(async ({ page }, testInfo) => {
  if (!testInfo.title.startsWith("opening runs")) await page.addInitScript(() => sessionStorage.setItem("arun-curtain-intro-v1", "seen"));
});

for (const route of routes) {
  test(`${route} renders without overflow or console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(route);
    await waitForHydration(page);
    await expect(page.locator("main")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("opening stays out of the mobile critical path and remains replayable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone-390x844");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const intro = page.getByRole("dialog", { name: "Opening stage sequence" });
  await expect(intro).toBeHidden();
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  await page.getByRole("button", { name: "Replay stage opening" }).click();
  await expect(intro).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(intro).toBeHidden();
});

test("performance filters, controls, and click-to-load media work", async ({ page }) => {
  await page.goto("/proof");
  await page.getByRole("button", { name: "Voice", exact: true }).click();
  await expect(page.getByRole("button", { name: "Voice", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Next performance" }).click();
  const player = page.locator(".performance-stage .embedded-video").first();
  await expect(player.locator("iframe")).toHaveCount(0);
  await player.click();
  await expect(player.locator("iframe")).toHaveCount(1);
});

test("booking validates inline, preserves values, and never opens WhatsApp in automation", async ({ page }) => {
  const externalPages: string[] = [];
  page.context().on("page", (popup) => externalPages.push(popup.url()));
  await page.goto("/book");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid phone number.")).toBeVisible();
  await page.getByLabel("Your name").fill("Asha");
  await page.getByLabel("Phone number").fill("+91 (99999) 99999");
  await page.getByLabel("Preferred show").selectOption("One Man Show");
  await page.getByLabel("Event date").fill("2026-12-18");
  await page.getByLabel("City / venue").fill("Kochi");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.locator(".booking-summary")).toContainText("Asha");
  await expect(page.getByLabel("Your name")).toHaveValue("Asha");
  await expect(page.getByLabel("Phone number")).toHaveValue("+919999999999");
  expect(externalPages).toEqual([]);
});

test("configurator recommendation reaches prefilled booking", async ({ page }) => {
  await page.goto("/shows");
  await page.getByLabel("Event type").selectOption("public-festival");
  await page.getByLabel("Audience size").selectOption("1000-plus");
  await expect(page.locator(".show-result")).toContainText("Mega Show");
  await page.getByRole("link", { name: "Check this format" }).click();
  await expect(page).toHaveURL(/\/book\?show=Mega(?:%20|\+)Show/);
  await expect(page.getByLabel("Preferred show")).toHaveValue("Mega Show");
});

test("mobile navigation and keyboard focus remain operable", async ({ page }) => {
  await page.goto("/");
  if ((page.viewportSize()?.width ?? 1440) < 1000) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Shows", exact: true }).click();
    await expect(page).toHaveURL(/\/shows$/);
  }
  await page.goto("/");
  await page.keyboard.press("Home");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
});

test("mobile section rail, map, and booking bar react to scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone-390x844");
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  const rail = page.getByRole("navigation", { name: "Homepage sections" });
  await page.locator("#act-two").scrollIntoViewIfNeeded();
  await expect(rail).toBeVisible();
  await expect(rail.getByRole("link", { name: /Watch/ })).toHaveAttribute("aria-current", "location");
  await expect(page.locator(".mobile-booking")).toHaveCSS("opacity", "0");

  await rail.getByRole("link", { name: /Journey/ }).click();
  await expect(rail.getByRole("link", { name: /Journey/ })).toHaveAttribute("aria-current", "location");
  await page.locator(".performance-map").scrollIntoViewIfNeeded();
  await page.locator(".map-point.uae").click();
  await expect(page.locator(".map-caption strong")).toHaveText("UAE");

  await rail.getByRole("link", { name: /Book/ }).click();
  await expect(page.locator(".mobile-booking")).toHaveCSS("opacity", "0");
});

test("legacy route redirect preserves query", async ({ page }) => {
  const response = await page.goto("/programs?show=One%20Man%20Show");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/shows\?show=One(?:%20|\+)Man(?:%20|\+)Show$/);
});

test("responsive homepage visual", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(page.locator(".home-hero")).toHaveScreenshot("homepage-hero.png", { caret: "initial" });
});

test("desktop canonical routes and interaction states remain visually stable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440x900");
  for (const route of routes) {
    await page.goto(route);
    await waitForHydration(page);
    await expect(page.locator("main")).toHaveScreenshot(`route-${route === "/" ? "home" : route.slice(1)}.png`, { caret: "initial" });
  }
  await page.goto("/shows");
  await page.locator(".format-compare article").first().getByRole("button").click();
  await expect(page.locator(".show-builder")).toHaveScreenshot("show-builder-expanded.png", { caret: "initial" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("main")).toHaveScreenshot("shows-reduced-motion.png", { caret: "initial" });
});
