import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, soloStageKeywords } from "../seo";
import { BookingSteps, CampusStageFeature, EventExperiences, FaqSection, PageFrame, PageHero, ProgramCards, SectionHeading } from "../site-components";

const description = "Live music and voice artistry for Malayali associations, cultural festivals, family gatherings and events worldwide. Find your Arun Guinness show.";
export const metadata = createPageMetadata({ title: "Live Shows for Your Community", description, path: "/shows", keywords: soloStageKeywords });

export default function ShowsPage() {
  return <PageFrame>
    <PageSchema path="/shows" name="Live Shows" description={description} type="CollectionPage" />
    <PageHero variant="shows" label="Live shows" title="Your people." accent="An evening to remember." description={description} highlights={["Community celebrations", "Cultural festivals", "India + worldwide"]} />
    <section className="inner-section section-shell first-task"><EventExperiences /></section>
    <section className="inner-section section-shell" id="formats"><SectionHeading label="Find your format" title="A featured moment." accent="Or the whole evening." description="Explore the experience, then discuss running time and production around your event." /><ProgramCards detailed /><div className="section-action"><p>You don&apos;t need to choose a format to get in touch.</p><BookingLink className="button button-brass">Help me choose <ArrowUpRight /></BookingLink></div></section>
    <section className="inner-section section-shell" id="campus-shows"><SectionHeading label="More ways to bring people together" title="School mornings." accent="College nights." /><CampusStageFeature /></section>
    <section className="planning-section"><div className="section-shell"><BookingSteps /><FaqSection /></div></section>
  </PageFrame>;
}
