import { defineConfig } from "@playwright/test";

const viewports = [
  ["phone-320x568", 320, 568],
  ["phone-375x812", 375, 812],
  ["phone-390x844", 390, 844],
  ["landscape-844x390", 844, 390],
  ["tablet-768x1024", 768, 1024],
  ["tablet-1024x768", 1024, 768],
  ["desktop-1440x900", 1440, 900],
  ["desktop-1920x1080", 1920, 1080],
] as const;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.02 } },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    colorScheme: "dark",
    locale: "en-IN",
    trace: "retain-on-failure",
  },
  projects: viewports.map(([name, width, height]) => ({ name, use: { viewport: { width, height } } })),
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
