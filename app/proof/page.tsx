import type { Metadata } from "next";
import { EvidenceDeck, PerformanceDeck } from "../experience";
import { ActHeading, MediaRail, PageFrame, PageHero, PerformanceMap, StatsStrip } from "../site-components";
import { proofItems, videos } from "../site-data";

export const metadata: Metadata = { title: "Performance Proof", description: "Watch verified Arun Guinness performances and review documented television, institutional and international appearances." };

export default function ProofPage() {
  return <PageFrame><PageHero label="Act / Proof" title="Do not take our word." accent="Press play." description="Official performances, public evidence and clear source notes—without invented testimonials or inflated claims." highlights={["6 official performances", "Public evidence", "Click-to-load video"]} /><section id="performances" className="inner-section section-shell"><ActHeading act="01" label="Official archive" title="Every claim needs" accent="a visible performance." /><PerformanceDeck performances={videos} /></section><section className="inner-section section-shell"><ActHeading act="02" label="Career figures" title="Numbers with" accent="their source attached." /><StatsStrip /></section><section className="inner-section section-shell"><ActHeading act="03" label="Documented reach" title="Kerala to" accent="the Gulf." /><PerformanceMap /><MediaRail /></section><section id="evidence" className="inner-section section-shell"><ActHeading act="04" label="Evidence over hype" title="Open the" accent="original source." /><EvidenceDeck items={proofItems} /><p className="source-note">Organizer testimonials and certificate wording will appear only after verification.</p></section></PageFrame>;
}
