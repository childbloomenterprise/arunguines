import type { Metadata } from "next";
import { Noto_Sans_Malayalam, Oswald } from "next/font/google";
import { Footer, Header } from "./site-components";
import "./globals.css";

const malayalam = Noto_Sans_Malayalam({ variable: "--font-body", subsets: ["malayalam", "latin"], display: "swap" });
const display = Oswald({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://arun-guinness.example.com"),
  title: { default: "Arun Guinness – Stage Programs", template: "%s | Arun Guinness" },
  description: "Arun Guinness അവതരിപ്പിക്കുന്ന One Man Show, Mimicry, Comedy, Musical & Variety Shows — Kerala മുഴുവൻ ബുക്കിംഗിന്.",
  keywords: ["Arun Guinness", "Arun Guinness Stage Show", "Mimicry Artist Kerala", "One Man Show Kerala", "Malayalam Stage Programs", "Corporate Entertainment Kerala"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Arun Guinness – Stage Programs", description: "ചിരിയും മിമിക്രിയും സംഗീതവും നിറഞ്ഞ മലയാളം സ്റ്റേജ് പ്രോഗ്രാമുകൾ.", type: "website", locale: "ml_IN", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Arun Guinness Stage Programs" }] },
  twitter: { card: "summary_large_image", title: "Arun Guinness – Stage Programs", description: "ചിരിയുടെ വേദി. ഓർമ്മകളുടെ രാത്രി.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ml"><body className={`${malayalam.variable} ${display.variable}`}><Header />{children}<Footer /></body></html>;
}
