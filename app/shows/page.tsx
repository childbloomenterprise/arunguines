import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowRight, ArrowUpRight } from "../icons";
import { createPageMetadata, soloStageKeywords } from "../seo";
import { PageFrame, PageHero, ProgramCards } from "../site-components";

const description = "Live music and voice artistry for Malayali associations, cultural festivals, family gatherings and events worldwide. Find your Arun Guinness show.";
export const metadata = createPageMetadata({ title: "Live Shows for Your Community", description, path: "/shows", keywords: soloStageKeywords });

export default function ShowsPage() {
  return <PageFrame tone="stone">
    <PageSchema path="/shows" name="Live Shows" description={description} type="CollectionPage" />
    <PageHero variant="shows" label="Live shows" title="A different voice" accent="for every room." description="From an intimate gathering to a festival stage, find a shape that fits your evening." highlights={[]} />
    <section className="inner-section section-shell first-task show-formats" id="formats"><ProgramCards /><div className="section-action"><BookingLink className="button button-brass" aria-label="Check Availability">Find your date <ArrowUpRight /></BookingLink></div></section>
    <section className="shows-proof section-shell"><div className="shows-proof-image portfolio-animate" data-reveal="scale"><Image src="/portfolio/01-live-in-red.webp" alt="Arun Guinness singing into a microphone during a live show" fill sizes="(max-width: 699px) calc(100vw - 40px), 49vw" /></div><div className="shows-proof-copy portfolio-animate" data-reveal><span className="eyebrow">See the work</span><h2>Watch the show <em>before you plan one.</em></h2><p>Explore complete performance films and moments from the audiences Arun has met.</p><Link className="text-link" href="/proof">Open the portfolio <ArrowRight /></Link></div></section>
  </PageFrame>;
}
