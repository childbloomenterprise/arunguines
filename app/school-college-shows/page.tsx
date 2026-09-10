import { BookingLink } from "../booking-link";
import { ArrowRight, ArrowUpRight } from "../icons";
import { CampusStageSelector } from "../campus-stage-selector";
import { createPageMetadata } from "../seo";
import { ActHeading, Eyebrow, PageFrame, PageHero } from "../site-components";
import { VideoPlayer } from "../video-player";

const description = "Book Arun Guinness for school annual days, college fests, arts and cultural days, campus inaugurations and student-friendly stage shows.";
export const metadata = createPageMetadata({
  title: "School & College Stage Shows",
  description,
  path: "/school-college-shows",
  keywords: ["school annual day stage show", "college fest stage show", "campus stage show Kerala", "arts day stage show", "youth festival stage show", "college fest performer Kochi", "school annual day performer Kochi"],
});

export default function SchoolCollegeShowsPage() {
  return <PageFrame>
    <PageHero
      label="School + college shows"
      title="Built for the stage."
      accent="Ready for the campus."
      description="Arun brings live singing, rapid voice transformations, mimicry, clean comedy and audience-aware interaction to annual days, college fests and institutional celebrations."
      highlights={["School-ready", "College-fest energy", "Custom running time"]}
      motionPreset="cinematic"
      media={<VideoPlayer id="P22go-G5Xnc" title="Arun Guinness at Mary Mount Public School" alt="Arun Guinness performing on the Mary Mount Public School annual-day stage" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Verified school stage" ratio="16:9" caption="Mary Mount Public School · 26th Annual Day" />}
    />

    <section className="inner-section section-shell first-task">
      <ActHeading act="01" label="Choose the room" title="School warmth." accent="College energy." description="Switch stages to see suitable running times, performance proof and a ready-to-use booking path." />
      <CampusStageSelector />
      <p className="campus-venue-note">Also available for youth associations, award ceremonies, faculty events, alumni meets, public festivals, corporate programmes, private celebrations and international stages.</p>
    </section>

    <section className="inner-section section-shell campus-proof">
      <ActHeading act="02" label="Institutional proof" title="Already welcomed." accent="Already documented." description="Public school records and official performance footage verify Arun's experience on student-facing stages." />
      <div className="campus-proof-grid">
        <a href="https://www.youtube.com/watch?v=P22go-G5Xnc" target="_blank" rel="noreferrer"><span>Official video · 2024</span><h3>Mary Mount Public School</h3><p>26th Annual Day performance by chief guest Arun Guinness.</p><strong>Watch source <ArrowUpRight /></strong></a>
        <a href="https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/" target="_blank" rel="noreferrer"><span>Institutional record · 2025</span><h3>SFS Public School</h3><p>Carpe Diem inauguration and documented 30-minute featured performance.</p><strong>Read source <ArrowUpRight /></strong></a>
      </div>
    </section>

    <section className="booking-cta section-shell campus-booking" data-reveal>
      <div><Eyebrow light>School annual day</Eyebrow><h2>Give students<br /><em>a live surprise.</em></h2></div>
      <div><p>Share date, city, audience size and available stage time. The booking enquiry opens directly in WhatsApp.</p><BookingLink className="button button-brass" href="/book?show=Guest%20Performance&event=School%20annual%20day">Plan a school show <ArrowUpRight /></BookingLink><BookingLink className="campus-college-link" href="/book?show=Variety%20Musical&event=College%20fest">Planning a college fest? Start here <ArrowRight /></BookingLink></div>
    </section>
  </PageFrame>;
}
