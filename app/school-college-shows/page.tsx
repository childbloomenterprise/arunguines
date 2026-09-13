import { BookingLink } from "../booking-link";
import { ArrowUpRight } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { createPageMetadata } from "../seo";
import { VideoPlayer } from "../video-player";

const description = "Arun Guinness performs live music, voice impressions and mimicry for school and college events.";
export const metadata = createPageMetadata({ title: "School & College Shows", description, path: "/school-college-shows", keywords: ["school annual day stage show", "college fest stage show", "campus stage show Kerala"] });

export default function SchoolCollegeShowsPage() {
  return <PageFrame>
    <PageHero label="School & college shows" title="A live show" accent="for your campus." description="Songs, voices and audience moments for annual days and college festivals." highlights={[]} media={<VideoPlayer id="P22go-G5Xnc" title="Arun Guinness at Mary Mount Public School" alt="Arun Guinness performing at Mary Mount Public School" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="simple-route-cta section-shell"><p>Tell us your date, city and event.</p><BookingLink className="button button-brass" href="/book?event=School%20annual%20day">Check Availability <ArrowUpRight /></BookingLink></section>
  </PageFrame>;
}
