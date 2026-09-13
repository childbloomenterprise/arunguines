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
    <PageHero variant="proof" label="Watch & see" title="Arun" accent="on stage." description="Performances and photos from Arun's shows." highlights={[]} />
    <section id="performances" className="inner-section section-shell first-task"><SectionHeading label="Videos" title="Press" accent="play." /><PerformanceGallery performances={[videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2), profileVideo]} /></section>
    <section id="photo-portfolio" className="portfolio-section"><div className="section-shell"><SectionHeading label="Photos" title="Moments from" accent="the stage." /><PhotoPortfolio label="Arun Guinness performance photographs" /></div></section>
  </PageFrame>;
}
