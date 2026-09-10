import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Arun Guinness — One man. Many voices. Live stage shows for Malayali communities worldwide.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SocialImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "60px 70px", color: "#f7f5f0", background: "linear-gradient(120deg, #30251c 0%, #101116 48%, #32233f 100%)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23, color: "#ffc36a" }}><span>ARUN GUINNESS</span><span>LIVE STAGE SHOWS</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 77, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.08 }}><span>Many voices.</span><span style={{ color: "#ffc36a" }}>One unforgettable evening.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 26, borderTop: "1px solid #706278", fontSize: 21 }}><span>One man. Many voices.</span><span>Kerala to the world.</span></div>
    </div>, size,
  );
}
