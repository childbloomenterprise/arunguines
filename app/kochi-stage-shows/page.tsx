import { BookingLink } from "../booking-link";
import { ArrowUpRight } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { videos } from "../site-data";
import { createPageMetadata, regionalStageKeywords } from "../seo";
import { VideoPlayer } from "../video-player";

const description = "Book Arun Guinness for live singing and voice artistry at events in Kochi, Ernakulam and beyond.";
export const metadata = createPageMetadata({ title: "Kochi Stage Shows", description, path: "/kochi-stage-shows", keywords: regionalStageKeywords });

export default function KochiStageShowsPage() {
  return <PageFrame>
    <PageHero label="Kochi stage shows" title="Kochi, bring" accent="the room alive." description="Familiar melodies and surprising voices, close to home." highlights={[]} media={<VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing live" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="simple-route-cta section-shell"><p>Share your date and venue. We’ll take it from there.</p><BookingLink className="button button-brass" aria-label="Check Availability" href="/book?location=Kochi">Explore a date <ArrowUpRight /></BookingLink></section>
  </PageFrame>;
}
