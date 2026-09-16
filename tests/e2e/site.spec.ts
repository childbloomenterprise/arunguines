import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/shows", "/solo-stage-shows", "/kochi-stage-shows", "/school-college-shows", "/artist", "/proof", "/book"];
const ready = async (page: Page) => {
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  await page.evaluate(() => document.fonts.ready);
};
const completeBrief = async (page: Page) => {
  await page.getByLabel("Your name", { exact: true }).fill("Asha");
  await page.getByLabel("Event type", { exact: true }).fill("Malayali association");
  await page.getByLabel("Event country", { exact: true }).fill("United Kingdom");
  await page.getByLabel("Event city", { exact: true }).fill("London");
};
const blockExternalHandoff = async (page: Page) => {
  await page.addInitScript(() => {
    window.open = (url) => { document.documentElement.dataset.handoff = String(url); return null; };
  });
};

for (const route of routes) {
  test(route + " renders without overflow or page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await ready(page);
    await expect(page.locator("main h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(route === "/" ? "arunguinness.com/?$" : route + "/?$"));
  });
}

test("hero identifies the artist and reaches booking with attribution", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("One Man, Many Voices");
  await expect(page.locator(".hero-art img")).toHaveAttribute("alt", "Arun Guinness live one-man show poster with Arun holding a recording microphone under blue and purple stage lights");
  expect(await page.locator(".hero-art img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".voices-section .performance-tile")).toHaveCount(8);
  await expect(page.locator(".moments-grid .moment-card")).toHaveCount(5);
  await page.locator(".hero-actions").getByRole("link", { name: "Check Availability" }).click();
  await expect(page).toHaveURL(/\/book\/?\?source=%2F$/);
  await expect(page.getByLabel("Date not decided")).toBeChecked();
  await expect(page.getByLabel("Show preference")).toHaveValue("");
  await expect(page.getByLabel("Phone number")).not.toBeVisible();
  await page.getByRole("button", { name: "Festival", exact: true }).click();
  await expect(page.getByLabel("Event type", { exact: true })).toHaveValue("Onam / cultural festival");
  await expect(page.locator(".show-suggestion")).toContainText("Mega Show");
  await page.getByRole("button", { name: "Use this format" }).click();
  await expect(page.getByLabel("Show preference")).toHaveValue("Mega Show");
});

test("show and campus links preserve their booking context", async ({ page }) => {
  await page.goto("/shows");
  await expect(page.locator(".show-builder")).toHaveCount(0);
  await page.getByRole("link", { name: "Check Availability for Mega Show", exact: true }).click();
  await expect(page.getByLabel("Show preference")).toHaveValue("Mega Show");
  await expect(page).toHaveURL(/source=%2Fshows(?:%2F)?/);
  await page.goto("/school-college-shows");
  await page.locator(".campus-booking").getByRole("link", { name: "Check Availability" }).click();
  await expect(page.getByLabel("Event type", { exact: true })).toHaveValue("School annual day");
  await expect(page).toHaveURL(/source=%2Fschool-college-shows(?:%2F)?/);
});

test("early enquiry validates, opens the correct message and preserves values", async ({ page }) => {
  await blockExternalHandoff(page);
  await page.goto("/book?source=%2Fshows");
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toBeFocused();
  await expect(page.getByText("Enter the event country.")).toBeVisible();
  await completeBrief(page);
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  const handoff = await page.locator("html").getAttribute("data-handoff");
  const url = new URL(handoff!);
  expect(url.origin + url.pathname).toBe("https://wa.me/919656712941");
  const message = url.searchParams.get("text")!;
  for (const value of ["Asha", "London", "United Kingdom", "Date not decided", "Help me choose", "Website · /shows"]) expect(message).toContain(value);
  await expect(page.getByRole("link", { name: "Open WhatsApp", exact: true })).toHaveAttribute("href", handoff!);
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("Asha");
  await expect(page.getByRole("status")).toContainText("If no tab opened");
  await page.getByLabel("Event city", { exact: true }).fill("Manchester");
  await expect(page.locator(".booking-summary")).toHaveCount(0);
});

test("decided dates and optional phone validate without losing the brief", async ({ page }) => {
  await blockExternalHandoff(page);
  await page.goto("/book");
  await completeBrief(page);
  await page.getByLabel("Date not decided").uncheck();
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  await expect(page.getByText("Choose a date or select Date not decided.")).toBeVisible();
  await page.getByLabel("Choose your event date").fill("2020-01-01");
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  await expect(page.getByText("Choose today or a future date.")).toBeVisible();
  await page.getByLabel("Date not decided").check();
  await page.getByText("Add more details", { exact: false }).click();
  await page.getByLabel("Phone number").fill("123");
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  await expect(page.getByText("Enter a valid phone number with country code.")).toBeVisible();
  await page.getByLabel("Phone number").fill("+44 (7700) 900123");
  await page.getByRole("button", { name: "Prepare my WhatsApp note" }).click();
  await expect(page.locator(".booking-summary")).toContainText("+447700900123");
});

test("clipboard failure leaves a selectable enquiry and WhatsApp fallback", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("Unavailable"); } }, configurable: true }));
  await page.goto("/book");
  await completeBrief(page);
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Select the enquiry text below");
  await expect(page.locator(".booking-summary pre")).toContainText("London");
  await expect(page.getByRole("link", { name: "Open WhatsApp", exact: true })).toBeVisible();
});

test("performance filters and user-initiated playback work", async ({ page }) => {
  await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ contentType: "text/html", body: "<html><body>Test video frame</body></html>" }));
  await page.goto("/proof");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "International", exact: true }).click();
  await expect(page.locator(".performance-tile")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "International", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.locator(".performance-tile").first().getByRole("button", { name: /Play/ }).click();
  await expect(page.getByRole("dialog", { name: /Watching Kuwait/ })).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Open on YouTube" })).toBeVisible();
  await page.getByRole("button", { name: /Close Kuwait/ }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await expect(page.locator(".performance-tile")).toHaveCount(1);
});

test("portfolio filters and full-photo controls show complete frames", async ({ page }) => {
  await page.goto("/proof");
  await expect(page.locator(".photo-portfolio-grid .photo-card")).toHaveCount(25);
  await page.locator(".photo-portfolio-grid .photo-card").first().getByRole("button").click();
  const viewer = page.getByRole("dialog", { name: "Portfolio photograph" });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator(".photo-viewer-image img")).toHaveCSS("object-fit", "contain");
  await expect(viewer.locator(".photo-viewer-caption")).toContainText("01 / 25");
  await viewer.getByRole("button", { name: "Next photos" }).click();
  await expect(viewer.locator(".photo-viewer-caption")).toContainText("02 / 25");
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(page.locator(".photo-portfolio-grid .photo-card").first().getByRole("button")).toBeFocused();
  await page.getByRole("button", { name: "Campus", exact: true }).click();
  await expect(page.locator(".photo-portfolio-grid .photo-card")).toHaveCount(10);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("mobile navigation, focus and Escape work", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  if ((page.viewportSize()?.width ?? 1440) < 1000) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    const menu = page.locator("#mobile-navigation");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveCSS("pointer-events", "auto");
    await expect(menu).toHaveCSS("background-color", "rgb(251, 250, 246)");
    await expect(menu).toHaveCSS("opacity", "1");
    const menuBox = await menu.boundingBox();
    expect(menuBox?.x).toBe(0);
    expect(menuBox?.width).toBe(page.viewportSize()?.width);
    expect(Math.round((menuBox?.y ?? 0) + (menuBox?.height ?? 0))).toBeGreaterThanOrEqual((page.viewportSize()?.height ?? 0) - 1);
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Shows" }).click();
    await expect(page).toHaveURL(/\/shows\/?$/);
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  }
});

test("open navigation closes cleanly when viewport becomes desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "tablet-1024x768", "One breakpoint regression check is sufficient");
  await page.setViewportSize({ width: 999, height: 768 });
  await page.goto("/proof");
  await ready(page);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
});

test("social contact dock expands verified profiles and stays above mobile actions", async ({ page }) => {
  await page.goto("/proof");
  await ready(page);
  const dock = page.getByRole("complementary", { name: "Connect with Arun Guinness" });
  const toggle = dock.getByRole("button", { name: "Open social links" });
  await expect(toggle).toBeVisible();
  await expect(dock.getByRole("link")).toHaveCount(0);
  await toggle.click();
  await expect(dock.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "https://wa.me/919656712941");
  await expect(dock.getByRole("link", { name: /Facebook/ })).toHaveAttribute("href", "https://www.facebook.com/arunguinness");
  await expect(dock.getByRole("link", { name: /Instagram/ })).toHaveAttribute("href", "https://www.instagram.com/arun_guinness/");
  if ((page.viewportSize()?.width ?? 1440) < 700) {
    const dockBox = await dock.boundingBox();
    const bookingBox = await page.locator(".mobile-booking").boundingBox();
    if (dockBox && bookingBox) expect(dockBox.y + dockBox.height).toBeLessThanOrEqual(bookingBox.y);
  }
  await page.keyboard.press("Escape");
  await expect(dock.getByRole("link")).toHaveCount(0);
  await expect(toggle).toBeFocused();
});

test("legacy redirects preserve parameters", async ({ page }) => {
  await page.goto("/contact?show=One%20Man%20Show&event=Association&location=Muscat");
  await expect(page).toHaveURL(/\/book\/?\?/);
  await expect(page.getByLabel("Show preference")).toHaveValue("One Man Show");
  await expect(page.getByLabel("Event city", { exact: true })).toHaveValue("Muscat");
});

test("hero visual and mobile booking fit", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  await expect(page.locator('.hero-poster-frame img[src*="arun-live-show-poster"]')).toBeVisible();
  await expect(page.locator(".hero-art img")).toBeVisible();
  await expect(page.locator(".home-hero")).toBeVisible();
});

test("reduced motion retains readable content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/shows");
  await ready(page);
  await expect(page.locator(".page-hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".program-cards article")).toHaveCount(4);
});
