import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, soloStageKeywords } from "../seo";
import { PageFrame, PageHero, ProgramCards } from "../site-components";

const description = "Live music and voice artistry for Malayali associations, cultural festivals, family gatherings and events worldwide. Find your Arun Guinness show.";
export const metadata = createPageMetadata({ title: "Live Shows for Your Community", description, path: "/shows", keywords: soloStageKeywords });

export default function ShowsPage() {
  return <PageFrame>
    <PageSchema path="/shows" name="Live Shows" description={description} type="CollectionPage" />
    <PageHero variant="shows" label="Live shows" title="A different voice" accent="for every room." description="From an intimate gathering to a festival stage, find a shape that fits your evening." highlights={[]} />
    <section className="inner-section section-shell first-task" id="formats"><ProgramCards /><div className="section-action"><BookingLink className="button button-brass" aria-label="Check Availability">Find your date <ArrowUpRight /></BookingLink></div></section>
  </PageFrame>;
}
