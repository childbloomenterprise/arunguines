import type { Metadata } from "next";
import { ShowBuilder } from "../experience";
import { ActHeading, CampusStageFeature, PageFrame, PageHero, ProgramCards } from "../site-components";
import { faqs, videos } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Choose and configure an Arun Guinness one-man show, variety musical, mega show or guest performance.";
export const metadata: Metadata = { title: "Live Shows", description, alternates: { canonical: "/shows" }, openGraph: { title: "Live Shows | Arun Guinness", description, url: "/shows" } };

export default function ShowsPage() {
  return <PageFrame>
    <PageHero variant="shows" motionPreset="cinematic" label="Shows" title="Choose the scale." accent="Keep the surprise." description="Start with audience, occasion and stage time. Arun's team shapes the running order around the room." highlights={["4 adaptable formats", "90-minute flagship", "Domestic + international"]} media={<VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing a male and female voice transformation" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Flagship act" ratio="16:9" caption="Official performance" />} />
    <section className="inner-section section-shell first-task"><ActHeading act="01" label="Show recommender" title="Find your" accent="best starting point." /><ShowBuilder /></section>
    <section className="inner-section section-shell"><ActHeading act="02" label="All formats" title="Four ways" accent="onto the stage." /><ProgramCards /></section>
    <section className="inner-section section-shell" id="campus-shows"><ActHeading act="03" label="Institution stages" title="School mornings." accent="College nights." description="Audience-aware formats for annual days, arts festivals, campus inaugurations and college cultural stages." /><CampusStageFeature /></section>
    <section className="inner-section section-shell faq-section"><ActHeading act="04" label="Practical answers" title="Before the" accent="show begins." /><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
  </PageFrame>;
}
