import type { Metadata } from "next";
import { EvidenceDeck, PerformanceDeck } from "../experience";
import { ActHeading, MediaRail, PageFrame, PageHero, PerformanceMap, StatsStrip } from "../site-components";
import { proofItems, videos } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Watch verified Arun Guinness performances and review documented television, institutional and international appearances.";
export const metadata: Metadata = { title: "Watch Arun", description, alternates: { canonical: "/proof" }, openGraph: { title: "Watch Arun | Arun Guinness", description, url: "/proof" } };

export default function ProofPage() {
  return <PageFrame>
    <PageHero variant="proof" motionPreset="cinematic" label="Watch" title="Do not take our word." accent="Press play." description="Official performances, public evidence and clear source notes—without invented testimonials or inflated claims." highlights={["6 official performances", "Public source links", "Click-to-load video"]} media={<VideoPlayer id={videos[2].id} title={videos[2].title} alt="Arun Guinness performing on the Flowers television stage" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Television proof" ratio="16:9" caption="Flowers television performance" poster={videos[2].poster} />} />
    <section id="performances" className="inner-section section-shell first-task"><ActHeading act="01" label="Official archive" title="Every claim needs" accent="a visible performance." /><PerformanceDeck performances={videos} /></section>
    <section className="inner-section section-shell"><ActHeading act="02" label="Verified signals" title="Claims with" accent="their source attached." /><StatsStrip /></section>
    <section className="inner-section section-shell"><ActHeading act="03" label="Documented reach" title="Kerala to" accent="the Gulf." /><PerformanceMap /><MediaRail /></section>
    <section id="evidence" className="inner-section section-shell"><ActHeading act="04" label="Evidence over hype" title="Open the" accent="original source." /><EvidenceDeck items={proofItems} /></section>
  </PageFrame>;
}
