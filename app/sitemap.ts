import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arunguinness.com";
  return ["", "/about", "/programs", "/videos", "/gallery", "/testimonials", "/contact"].map((path, index) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/contact" ? 0.9 : 0.75,
  }));
}
