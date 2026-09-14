import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionController } from "./motion-controller";
import { Header } from "./navigation";
import { Footer, MobileBookingBar } from "./site-components";
import { createPageMetadata, seoKeywords, serializeJsonLd, siteStructuredData } from "./seo";
import { siteUrl } from "./site-url";
import "./globals.css";
import "./stage.css";
import "./refresh.css";

const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["500", "600", "700"] });
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fffaf3", colorScheme: "light" };

const baseMetadata = createPageMetadata({
  title: "Arun Guinness | Live Stage Shows & Voice Artistry",
  description: "Live music, voice transformations and entertainment for Malayali communities worldwide. Explore Arun Guinness performances and check availability for your event.",
  path: "/",
  keywords: seoKeywords,
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(siteUrl),
  title: { default: "Arun Guinness | Live Stage Shows & Voice Artistry", template: "%s | Arun Guinness" },
  icons: { icon: "/arun-cartoon-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${body.variable} ${display.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionController />
        <Header />
        {children}
        <Footer />
        <MobileBookingBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteStructuredData) }} />
      </body>
    </html>
  );
}
