import type { Metadata } from "next";
import { ShowBuilder } from "../experience";
import { ActHeading, PageFrame, PageHero, ProgramCards } from "../site-components";
import { faqs } from "../site-data";

const description = "Choose and configure an Arun Guinness one-man show, variety musical, mega show or guest performance.";
export const metadata: Metadata = { title: "Live Shows", description, alternates: { canonical: "/shows" }, openGraph: { title: "Live Shows | Arun Guinness", description, url: "/shows" } };

export default function ShowsPage() {
  return <PageFrame><PageHero label="Shows" title="Choose scale." accent="Keep surprise." description="Audience + time + occasion." highlights={["4 formats", "90 min", "Worldwide"]} /><section className="inner-section section-shell"><ActHeading act="01" label="Match" title="Find your" accent="format." /><ShowBuilder /></section><section className="inner-section section-shell"><ActHeading act="02" label="Formats" title="Four ways" accent="on stage." /><ProgramCards /></section><section className="inner-section section-shell faq-section"><ActHeading act="03" label="Answers" title="Before" accent="showtime." /><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section></PageFrame>;
}
