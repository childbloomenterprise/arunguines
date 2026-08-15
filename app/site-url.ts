const DEFAULT_SITE_URL = "https://arunguinness.com";

export function resolveSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  const candidate = value?.trim();

  if (!candidate) return DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl();
