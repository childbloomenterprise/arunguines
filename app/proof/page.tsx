import { createPageMetadata, performerKeywords } from "../seo";
import { PageSchema } from "../page-schema";
import { PageFrame, PageHero, SectionHeading } from "../site-components";
import { profileVideo, proofItems, videos } from "../site-data";
import { PerformanceGallery } from "../performance-gallery";
import { PhotoPortfolio } from "../photo-portfolio";

const description = "Hear Arun Guinness transform familiar voices and watch live performances, television appearances and overseas community shows.";
export const metadata = createPageMetadata({ title: "Watch Arun Guinness Live", description, path: "/proof", keywords: performerKeywords });

export default function ProofPage() {
  return <PageFrame>
    <PageSchema path="/proof" name="Watch Arun Live" description={description} type="CollectionPage" />
    <PageHero variant="proof" label="Watch Arun live" title="The best introduction?" accent="Press play." description={description} highlights={["Voice transformations", "Live music", "Community stages"]} />
    <section id="photo-portfolio" className="portfolio-section"><div className="section-shell"><SectionHeading label="Stage & event portfolio" title="The performance" accent="beyond the frame." description="Live songs, community celebrations, institutional programmes and moments of recognition." light /><PhotoPortfolio label="Arun Guinness project and performance photographs" /></div></section>
    <section id="performances" className="inner-section section-shell first-task"><PerformanceGallery performances={[...videos, profileVideo]} /></section>
    <section id="evidence" className="inner-section section-shell"><SectionHeading label="Beyond the performance" title="Stories from" accent="the stage." /><div className="stage-stories">{proofItems.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a></article>)}</div></section>
  </PageFrame>;
}
