import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { MotionController } from "./motion-controller";
import { Header } from "./navigation";
import { Footer, MobileBookingBar } from "./site-components";
import { contact } from "./site-data";
import { siteUrl } from "./site-url";
import "./globals.css";

const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Bodoni_Moda({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0a0f", colorScheme: "dark light" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Arun Guinness | One Man. Many Voices.", template: "%s | Arun Guinness" },
  description: "Book Arun Guinness—Kerala singer, voice-imitation artist, mimicry performer and live entertainer—for school annual days, college fests, one-man shows and international stages.",
  keywords: ["Arun Guinness", "mimicry artist Kerala", "one man show Kerala", "school annual day performer Kerala", "college fest singer Kerala", "campus stage show", "voice artist Kerala", "Gulf stage show", "male female voice singer"],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Arun Guinness | One Man. Many Voices.", description: "Singer. Voice artist. Mimicry performer. One unforgettable live show.", type: "website", locale: "en_IN", url: siteUrl, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Arun Guinness live entertainer" }] },
  twitter: { card: "summary_large_image", title: "Arun Guinness | One Man. Many Voices.", description: "Dozens of voices. One unforgettable performer.", images: ["/og.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arun Guinness",
  jobTitle: "Singer, voice artist and live entertainer",
  description: "Kerala-based singer and mimicry performer known for singing in the voices of male and female playback singers.",
  url: siteUrl,
  telephone: contact.phone,
  homeLocation: { "@type": "Place", name: "Kochi, Kerala, India" },
  sameAs: [contact.instagram, contact.youtube, contact.facebook],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
