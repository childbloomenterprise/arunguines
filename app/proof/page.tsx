import { createPageMetadata, performerKeywords } from "../seo";
import { PageSchema } from "../page-schema";
import { PageFrame, PageHero, SectionHeading } from "../site-components";
import { homepageVideos, profileVideo, videos } from "../site-data";
import { PerformanceGallery } from "../performance-gallery";
import { PhotoPortfolio } from "../photo-portfolio";

const description = "Hear Arun Guinness transform familiar voices and watch live performances, television appearances and overseas community shows.";
export const metadata = createPageMetadata({ title: "Watch Arun Guinness Live", description, path: "/proof", keywords: performerKeywords });

export default function ProofPage() {
  return <PageFrame>
    <PageSchema path="/proof" name="Watch Arun Live" description={description} type="CollectionPage" />
    <PageHero variant="proof" label="The archive" title="See how a room" accent="comes alive." description="Voices on film. Moments from the stage." highlights={[]} />
    <section id="performances" className="inner-section section-shell first-task"><SectionHeading label="Videos" title="Hear it" accent="for yourself." /><PerformanceGallery performances={[videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2), profileVideo]} /></section>
    <section id="photo-portfolio" className="portfolio-section"><div className="section-shell"><SectionHeading label="Photos" title="The moments" accent="that stayed." /><PhotoPortfolio label="Arun Guinness performance photographs" /></div></section>
  </PageFrame>;
}
