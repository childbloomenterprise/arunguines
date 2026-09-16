import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowRight, ArrowUpRight } from "../icons";
import { createPageMetadata, performerKeywords } from "../seo";
import { PageFrame, PageHero } from "../site-components";
import { profileVideo } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Meet Arun Guinness, a singer, voice artist and live entertainer bringing music and familiar voices to Malayali communities worldwide.";
export const metadata = createPageMetadata({ title: "Meet Arun Guinness", description, path: "/artist", keywords: performerKeywords });

export default function ArtistPage() {
  return <PageFrame>
    <PageSchema path="/artist" name="About Arun Guinness" description={description} type="AboutPage" />
    <PageHero variant="artist" label="Meet Arun" title="The voice is only" accent="the beginning." description="Arun Guinness sings, shifts voices and draws the audience into the moment. He is based in Kochi, Kerala." highlights={[]} media={<VideoPlayer id={profileVideo.id} title={profileVideo.title} alt="Arun Guinness in his official profile film" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="artist-story artist-portfolio section-shell">
      <div className="artist-portfolio-image portfolio-animate" data-reveal="scale"><Image src="/portfolio/06-blue-kurta-portrait.webp" alt="Arun Guinness smiling in a blue kurta between performances" fill priority sizes="(max-width: 699px) calc(100vw - 40px), 42vw" /></div>
      <div className="artist-portfolio-copy portfolio-animate" data-reveal><span className="eyebrow">Meet Arun</span><h2>One artist. <em>Many ways to connect.</em></h2><p>Based in Kochi, Arun brings voice transformations, live singing and audience interaction to stages in India and abroad.</p><div><Link className="text-link" href="/proof">Explore the portfolio <ArrowRight /></Link><BookingLink className="button button-brass" aria-label="Check Availability">Find a date <ArrowUpRight /></BookingLink></div></div>
    </section>
  </PageFrame>;
}
