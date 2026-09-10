import { serializeJsonLd } from "./seo";
import { siteUrl } from "./site-url";

export function PageSchema({ path, name, description, type = "WebPage" }: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
}) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": type, "@id": `${url}#webpage`, url, name, description,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#arun-guinness` },
      ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    }, ...(path !== "/" ? [{
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    }] : [])],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />;
}
