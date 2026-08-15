import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "../icons";
import { Eyebrow, PageHero, ProgramGrid } from "../site-components";
import { faqs } from "../site-data";

export const metadata: Metadata = { title: "Live Shows", description: "Book Arun Guinness for a 90-minute One Man Show, musical variety performance, mega show or featured guest appearance." };

export default function Programs() {
  return (
    <main id="main-content">
      <PageHero label="Live experiences" title="Pick the format." accent="Feel the energy." description="One voice act can open the room. A full-scale production can own the night. Choose your starting point—we shape the rest around your event." />
      <section className="programs-page section-shell"><ProgramGrid /></section>
      <section className="flagship section-shell">
        <div className="flagship-number" aria-hidden="true">90</div>
        <div className="flagship-copy" data-reveal><Eyebrow light>Flagship format</Eyebrow><h2>The Arun Guinness<br /><em>One Man Show</em></h2><p>90 minutes. One performer. Dozens of voices.</p><ul>{["Male and female playback-singer impressions", "Music, mimicry, characters and clean comedy", "Live audience interaction", "Flexible language and event context"].map((item) => <li key={item}><Check />{item}</li>)}</ul><Link className="button button-gold" href="/contact?show=One%20Man%20Show">Book the flagship show <ArrowUpRight /></Link></div>
      </section>
      <section className="event-fit section-shell">
        <div className="section-heading" data-reveal><div><Eyebrow>Made for real stages</Eyebrow><h2>Where Arun<br /><em>performs best.</em></h2></div></div>
        <div className="event-tags">{["Corporate nights", "College festivals", "School annual days", "Cultural festivals", "Malayali associations", "Gulf events", "Inaugurations", "Private celebrations", "Award ceremonies", "Conferences"].map((event, index) => <span key={event} data-reveal style={{ "--delay": `${(index % 5) * 60}ms` } as React.CSSProperties}>{event}<i>0{index + 1}</i></span>)}</div>
      </section>
      <section className="faq-section section-shell">
        <div className="section-intro" data-reveal><Eyebrow>Booking questions</Eyebrow><h2>Quick answers.</h2></div>
        <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} data-reveal><summary><span>0{index + 1}</span>{faq.question}<i /></summary><p>{faq.answer}</p></details>)}</div>
      </section>
    </main>
  );
}
