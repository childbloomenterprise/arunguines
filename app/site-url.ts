const CANONICAL_SITE_URL = "https://www.arunguinness.com";

/**
 * Keep search metadata on the public domain even when a deployment-level
 * environment variable still points at a preview hostname.
 */
export function resolveSiteUrl(): string {
  return CANONICAL_SITE_URL;
}

export const siteUrl = CANONICAL_SITE_URL;
