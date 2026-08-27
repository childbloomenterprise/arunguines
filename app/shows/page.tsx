import type { Metadata } from "next";
import { ShowBuilder } from "../experience";
import { ActHeading, PageFrame, PageHero, ProgramCards } from "../site-components";
import { faqs } from "../site-data";

export const metadata: Metadata = { title: "Live Shows", description: "Choose and configure an Arun Guinness one-man show, variety musical, mega show or guest performance." };

export default function ShowsPage() {
  return <PageFrame><PageHero label="Act / Shows" title="Choose the scale." accent="Keep the surprise." description="Start with audience, occasion and stage time. Arun's team shapes the final running order around the room." highlights={["4 adaptable formats", "90-minute flagship", "Worldwide bookings"]} /><section className="inner-section section-shell"><ActHeading act="01" label="Show builder" title="Find your" accent="best starting point." /><ShowBuilder /></section><section className="inner-section section-shell"><ActHeading act="02" label="All formats" title="Four ways" accent="onto the stage." /><ProgramCards /></section><section className="inner-section section-shell faq-section"><ActHeading act="03" label="Practical answers" title="Before the" accent="house opens." /><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section></PageFrame>;
}
