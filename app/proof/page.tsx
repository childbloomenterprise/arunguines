import Link from "next/link";
import { createPageMetadata, performerKeywords } from "../seo";
import { PageSchema } from "../page-schema";
import { ArrowRight, ArrowUpRight } from "../icons";
import { BookingLink } from "../booking-link";
import { PageFrame, PageHero, SectionHeading } from "../site-components";
import { homepageVideos, profileVideo, videos } from "../site-data";
import { PerformanceGallery } from "../performance-gallery";
import { PhotoPortfolio } from "../photo-portfolio";

const description = "Explore Arun Guinness's performance portfolio: school programs, stage shows, inaugurations, invited appearances and recognition.";
export const metadata = createPageMetadata({ title: "Arun Guinness Portfolio | Videos & Events", description, path: "/proof", keywords: performerKeywords });

export default function ProofPage() {
  return <PageFrame tone="mist">
    <PageSchema path="/proof" name="Arun Guinness Portfolio" description={description} type="CollectionPage" />
    <PageHero variant="proof" label="The portfolio" title="The work," accent="in full view." description="Watch Arun perform. See the audiences, stages and events that hold the story." highlights={[]} />
    <section id="performances" className="inner-section section-shell first-task"><SectionHeading label="Performance films" title="Hear the voices." accent="Stay for the room." description="Choose a performance to watch in a full-size player." /><PerformanceGallery performances={[videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2), profileVideo]} /></section>
    <section id="photo-portfolio" className="portfolio-section"><div className="section-shell"><SectionHeading label="Event portfolio" title="Every setting." accent="Clearly organised." description="Browse school programs, stage shows, inaugurations, and the invitations and honours around them." /><PhotoPortfolio label="Arun Guinness performance photographs organised by event type" /></div></section>
    <section className="portfolio-next section-shell"><div><span className="eyebrow">Planning an event?</span><h2>See what Arun brings <em>to your room.</em></h2><p>Browse the campus portfolio for school and college shows, or share a date to begin a conversation.</p></div><div><Link className="text-link" href="/school-college-shows">Explore campus shows <ArrowRight /></Link><BookingLink className="button button-brass" aria-label="Check Availability">Check a date <ArrowUpRight /></BookingLink></div></section>
  </PageFrame>;
}
