import type { Metadata } from "next";
import { EvidenceDeck, PerformanceDeck } from "../experience";
import { ActHeading, MediaRail, PageFrame, PageHero, PerformanceMap, StatsStrip } from "../site-components";
import { proofItems, videos } from "../site-data";

const description = "Watch verified Arun Guinness performances and review documented television, institutional and international appearances.";
export const metadata: Metadata = { title: "Performance Proof", description, alternates: { canonical: "/proof" }, openGraph: { title: "Performance Proof | Arun Guinness", description, url: "/proof" } };

export default function ProofPage() {
  return <PageFrame><PageHero label="Performances" title="No hype." accent="Press play." description="Watch. Verify. Decide." highlights={["6 videos", "3 sources", "4 regions"]} /><section id="performances" className="inner-section section-shell"><ActHeading act="01" label="Watch" title="The proof" accent="performs." /><PerformanceDeck performances={videos} /></section><section className="inner-section section-shell"><ActHeading act="02" label="Numbers" title="Measured." accent="Sourced." /><StatsStrip /></section><section className="inner-section section-shell"><ActHeading act="03" label="Reach" title="Kerala →" accent="Gulf." /><PerformanceMap /><MediaRail /></section><section id="evidence" className="inner-section section-shell"><ActHeading act="04" label="Sources" title="Open" accent="originals." /><EvidenceDeck items={proofItems} /></section></PageFrame>;
}
