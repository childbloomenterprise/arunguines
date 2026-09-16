import { BookingLink } from "../booking-link";
import { ArrowUpRight } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { videos } from "../site-data";
import { createPageMetadata, soloStageKeywords } from "../seo";
import { VideoPlayer } from "../video-player";

const description = "Arun Guinness brings live singing, voice impressions and mimicry to solo stage shows in Kerala and worldwide.";
export const metadata = createPageMetadata({ title: "Solo Stage Shows", description, path: "/solo-stage-shows", keywords: soloStageKeywords });

export default function SoloStageShowsPage() {
  return <PageFrame>
    <PageHero label="Solo stage shows" title="One artist." accent="An entire evening." description="Songs shift voice. Characters appear. The room follows along." highlights={[]} media={<VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing live" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="simple-route-cta section-shell"><p>Have a room and a date in mind?</p><BookingLink className="button button-brass" aria-label="Check Availability" href="/book?show=One%20Man%20Show">Explore a date <ArrowUpRight /></BookingLink></section>
  </PageFrame>;
}
