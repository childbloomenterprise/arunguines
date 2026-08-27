import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Globe, Message, Phone, Play, QuoteMark } from "./icons";
import { BookingForm } from "./contact/booking-form";
import { Eyebrow, MediaRail, PageFrame, ShowSymbol, StatsStrip } from "./site-components";
import { contact, milestones, programs, stageNotes, videos } from "./site-data";
import { VideoPlayer } from "./video-player";

const featuredShows = [programs[0], programs[1], programs[3]];
const selectedPerformances = videos.slice(0, 3);

function Waveform() {
  return <div className="voice-wave" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} />)}</div>;
}

export default function Home() {
  return (
    <PageFrame>
      <section className="home-hero">
        <Image className="hero-image" src="/hero-arun-cinematic.webp" alt="Arun Guinness on stage holding a microphone under a warm spotlight" fill priority sizes="100vw" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <Eyebrow light>Singer · Voice Artist · Live Entertainer</Eyebrow>
          <h1><span>ONE MAN.</span><strong>MANY VOICES.</strong></h1>
          <p>Male. Female. Music. Mimicry. One live show.</p>
          <div className="hero-actions"><a className="button button-brass" href="#signature"><Play />Watch him perform</a><Link className="button button-ghost" href="/book">Book a show <ArrowUpRight /></Link></div>
          <small>Kerala · India · Worldwide</small>
        </div>
        <a className="scroll-cue" href="#signature" aria-label="Continue to signature performance"><span>Enter the performance</span><i /></a>
      </section>

      <section className="home-section signature-section section-shell" id="signature">
        <div className="signature-heading" data-reveal><Eyebrow light>Watch · Listen</Eyebrow><h2><span>Two voices.</span><strong>One performer.</strong></h2></div>
        <VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness changing between male and female singing voices" className="signature-player" sizes="(max-width: 900px) 100vw, 86vw" eager variant="gallery" />
        <div className="voice-transition"><span>Male voice</span><Waveform /><span>Female voice</span></div>
      </section>

      <section className="home-section proof-section" id="career-proof">
        <div className="section-shell"><div className="section-heading dark" data-reveal><Eyebrow>Proof</Eyebrow><h2>Stage-tested.</h2></div><StatsStrip /><MediaRail /></div>
      </section>

      <section className="home-section shows-section" id="shows">
        <div className="section-shell"><div className="section-heading dark" data-reveal><Eyebrow>Shows</Eyebrow><h2><span>One artist.</span><strong>Any stage.</strong></h2></div><div className="home-shows">{featuredShows.map((show) => <article key={show.slug} data-reveal><span className="home-show-symbol" aria-hidden="true"><ShowSymbol slug={show.slug} /></span><div><small><Clock />{show.duration}</small><h3>{show.title}</h3><strong>{show.bestFor}</strong></div><Link href={`/shows#${show.slug}`} aria-label={`Explore ${show.title}`}><ArrowRight /></Link></article>)}</div><Link className="text-link dark" href="/shows">All formats <ArrowRight /></Link></div>
      </section>

      <section className="home-section performances-section section-shell" id="performances">
        <div className="section-heading" data-reveal><Eyebrow light>Performances</Eyebrow><h2>Press play.<br /><strong>Hear it.</strong></h2></div>
        <div className="selected-performances">{selectedPerformances.map((performance, index) => <article key={performance.id} data-reveal><VideoPlayer id={performance.id} title={performance.title} alt={`${performance.title} by Arun Guinness`} sizes="(max-width: 720px) 100vw, 33vw" index={`0${index + 1}`} variant="card" /><div><small>{performance.category}</small><h3>{performance.title}</h3></div></article>)}</div>
        <Link className="text-link" href="/proof">All performances <ArrowRight /></Link>
      </section>

      <section className="home-section about-section" id="about">
        <div className="section-shell about-grid"><div className="about-image" data-reveal="scale"><Image src="/hero-arun-cinematic.webp" alt="Arun Guinness smiling with a microphone on stage" fill sizes="(max-width: 800px) 100vw, 46vw" /></div><div className="about-copy" data-reveal><Eyebrow>Arun</Eyebrow><h2><span>Voice,</span><strong>engineered.</strong></h2><p>Singer. Voice artist. Sound engineer. Kerala roots; worldwide stages.</p><Link className="text-link dark" href="/artist">Meet Arun <ArrowRight /></Link></div></div>
      </section>

      <section className="home-section journey-section section-shell" id="journey">
        <div className="section-heading" data-reveal><Eyebrow light>Journey</Eyebrow><h2>Kerala →<br /><strong>world stages.</strong></h2></div>
        <div className="journey-grid"><ol>{milestones.map((item) => <li key={item.year} data-reveal><span>{item.year}</span><h3>{item.title}</h3></li>)}</ol><div className="reach-list" aria-label="Documented performance locations"><span><Globe /> Reach</span><strong>Kerala</strong><strong>Kuwait</strong><strong>UAE</strong><strong>Oman</strong></div></div>
      </section>

      <section className="home-section stage-notes-section" id="stage-notes">
        <div className="section-shell"><div className="section-heading dark" data-reveal><Eyebrow>Verified words</Eyebrow><h2>Stage notes.</h2></div><div className="stage-notes">{stageNotes.map((note) => <blockquote key={note.href} data-reveal><QuoteMark /><p>“{note.quote}”</p><a href={note.href} target="_blank" rel="noreferrer">{note.source} <ArrowUpRight /></a></blockquote>)}</div></div>
      </section>

      <section className="home-section booking-section section-shell" id="book-home">
        <div className="booking-copy" data-reveal><Eyebrow light>Bookings</Eyebrow><h2><span>Your date.</span><strong>His stage.</strong></h2><p>Date + city + audience.</p><div className="booking-direct"><a className="button button-brass" href={contact.whatsapp} target="_blank" rel="noreferrer"><Message />WhatsApp</a><a className="button button-ghost" href={`tel:${contact.phone}`}><Phone />Call</a></div></div>
        <BookingForm compact />
      </section>
    </PageFrame>
  );
}
