import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "../icons";
import { Eyebrow, PageHero } from "../site-components";

export const metadata: Metadata = { title: "Stage Credibility", description: "Documented television, international and institutional appearances by Arun Guinness." };

const evidence = [
  { title: "Kuwait · Onavesham 2024", text: "Independent event coverage documented Arun's range from feminine melodic voices to medleys and powerful vocals.", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" },
  { title: "SFS Public School", text: "Arun inaugurated the Carpe Diem event and delivered a featured live performance for students and families.", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/" },
  { title: "Flowers · Comedy Utsavam", text: "Multiple indexed performances connect Arun directly with Kerala's popular television entertainment stage.", href: "https://www.youtube.com/watch?v=3vXZZvHX208" },
];

export default function Testimonials() {
  return (
    <main id="main-content">
      <PageHero label="Documented appearances" title="Trust built." accent="Stage by stage." description="No invented testimonials—only public performance evidence while organizer reviews and certificates are collected for final launch." />
      <section className="evidence-grid section-shell">{evidence.map((item, index) => <a href={item.href} target="_blank" rel="noreferrer" key={item.title} data-reveal><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p><strong>View source <ArrowUpRight /></strong></a>)}</section>
      <section className="review-call section-shell"><div data-reveal><Eyebrow>Worked with Arun?</Eyebrow><h2>Put your experience<br /><em>on the record.</em></h2><p>Organizer testimonials with name, event and organization will be added only after verification.</p><a className="button button-dark" href="mailto:arunguinnes@gmail.com?subject=Arun%20Guinness%20Event%20Review">Submit a review <ArrowUpRight /></a></div><Link className="round-cta dark-round" href="/contact"><span>Book<br />next</span><ArrowUpRight /></Link></section>
    </main>
  );
}
