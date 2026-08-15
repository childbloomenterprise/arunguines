import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/programs", "/videos", "/gallery", "/testimonials", "/contact"].map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/contact" ? 0.9 : 0.75,
  }));
}
