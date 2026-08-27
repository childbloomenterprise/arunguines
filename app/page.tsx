import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "./icons";
import { EvidenceDeck, InteractiveTimeline, PerformanceDeck, ShowBuilder } from "./experience";
import { ActHeading, Eyebrow, MediaRail, PageFrame, PerformanceMap, StatsStrip } from "./site-components";
import { contact, milestones, proofItems, videos } from "./site-data";
import { VideoPlayer } from "./video-player";
import { BookingForm } from "./contact/booking-form";

export default function Home() {
  return (
    <PageFrame>
      <section className="home-hero" id="home">
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-frame" aria-hidden="true"><i /><i /></div>
        <div className="hero-copy" data-reveal>
          <Eyebrow light>Kerala · India · Worldwide</Eyebrow>
          <span className="hero-act">Act I · Meet the Performer</span>
          <h1><span>One man.</span><strong>Many voices.</strong></h1>
          <p>A singer, voice artist and live entertainer who transforms between male and female playback voices—then turns the whole room into part of the show.</p>
          <div className="hero-actions"><Link className="button button-brass" href="/book">Book a show <ArrowUpRight /></Link><a className="button button-ghost" href="#act-two"><Play />Watch performance</a></div>
          <div className="hero-status"><i />Booking desk open · worldwide enquiries</div>
        </div>
        <div className="hero-performance" data-reveal="scale">
          <VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing his signature double-voice act" className="hero-player" sizes="(max-width: 760px) 100vw, 52vw" eager badge="Signature performance" category="Official live archive" variant="hero" />
          <div className="hero-ticket"><span>Live / 01</span><strong>Voice<br />without limits.</strong><small>Press play · Sound starts only by choice</small></div>
        </div>
        <a className="scroll-cue" href="#act-two"><span>Enter the show</span><i /></a>
      </section>

      <section className="proof-strip section-shell" aria-label="Career highlights"><StatsStrip /></section>

      <section className="act-section act-two section-shell" id="act-two">
        <ActHeading act="Act II" label="Hear the Impossible" title="Proof lives" accent="in the performance." description="Filter the official archive, choose a stage, and play every video here—without losing your place." />
        <PerformanceDeck performances={videos} compact />
      </section>

      <section className="act-section act-three section-shell" id="build-show">
        <ActHeading act="Act III" label="Build the Show" title="Your audience." accent="The right format." description="Four questions turn a broad enquiry into a practical starting point." light />
        <ShowBuilder />
      </section>

      <section className="act-section act-four section-shell" id="act-four">
        <ActHeading act="Act IV" label="Trust the Stage" title="From Kerala" accent="to Gulf stages." description="Follow the milestones, then select a location to explore the documented live trail." />
        <div className="trust-grid"><InteractiveTimeline items={milestones} /><PerformanceMap /></div>
        <MediaRail />
        <EvidenceDeck items={proofItems} />
        <Link className="text-link" href="/proof">Open the complete proof archive <ArrowRight /></Link>
      </section>

      <section className="act-section act-five section-shell" id="book-home">
        <div className="encore-copy" data-reveal><ActHeading act="Act V" label="Encore" title="Your stage." accent="Every voice." description="Share the essentials. The enquiry opens in WhatsApp; nothing is stored on this website." light /><div className="direct-lines"><a href={`tel:${contact.phone}`}>Call {contact.phoneDisplay}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer">Message directly</a></div></div>
        <BookingForm compact />
      </section>
    </PageFrame>
  );
}
