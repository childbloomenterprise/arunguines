import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";
import { PerformanceDeck } from "./experience";
import { ActHeading, Eyebrow, MediaRail, PageFrame, ProgramCards, StatsStrip } from "./site-components";
import { artistModes, videos } from "./site-data";
import { VideoPlayer } from "./video-player";

export default function Home() {
  return (
    <PageFrame>
      <section className="home-hero" id="home">
        <div className="hero-copy" data-reveal>
          <Eyebrow>Kerala · India · Worldwide</Eyebrow>
          <span className="hero-name">Arun Guinness</span>
          <h1>One man.<strong>Many voices.</strong></h1>
          <p>Arun Guinness is a singer, voice artist and live entertainer known for moving between male and female playback styles in one performance.</p>
        </div>
        <div className="hero-performance" data-reveal="scale" data-depth-media="true">
          <VideoPlayer
            id={videos[0].id}
            title={videos[0].title}
            alt="Arun Guinness singing into a microphone during his signature double-voice performance"
            className="hero-player"
            sizes="(max-width: 760px) calc(100vw - 40px), 52vw"
            eager
            ratio="16:9"
            badge="Signature performance"
            caption="Official performance · Plays here"
          />
        </div>
        <div className="hero-actions" data-reveal>
          <Link className="button button-brass" href="/book">Book Arun <ArrowUpRight /></Link>
          <span>Direct WhatsApp enquiry · No account required</span>
        </div>
      </section>

      <section className="proof-strip section-shell" aria-label="Verified career signals"><StatsStrip /></section>
      <section className="trust-strip section-shell"><MediaRail /></section>

      <section className="home-section section-shell" id="shows-home">
        <ActHeading act="01" label="Choose a format" title="A show shaped" accent="for your room." description="Four practical formats cover focused appearances, flagship one-man shows and large-stage productions." />
        <ProgramCards />
        <Link className="text-link" href="/shows">Compare every show format <ArrowRight /></Link>
      </section>

      <section className="home-section performance-home section-shell" id="performances-home">
        <ActHeading act="02" label="Watch first" title="The performance" accent="explains everything." description="Press play on verified live recordings without leaving the page." light />
        <PerformanceDeck performances={videos.slice(0, 3)} compact />
        <Link className="text-link text-link-light" href="/proof">Open the full performance archive <ArrowRight /></Link>
      </section>

      <section className="home-section about-preview section-shell" id="about-home">
        <div data-reveal>
          <Eyebrow>About Arun</Eyebrow>
          <h2>Technical listening.<br /><em>Live instinct.</em></h2>
          <p>Sound-engineering discipline meets singing, mimicry and audience-aware timing. Each performance adapts to the event instead of following one fixed script.</p>
          <Link className="button button-dark" href="/artist">Meet the artist <ArrowUpRight /></Link>
        </div>
        <div className="about-facts">
          {artistModes.slice(0, 3).map((mode) => <article key={mode.number} data-reveal><span>{mode.number}</span><h3>{mode.title}</h3><p>{mode.text}</p></article>)}
        </div>
      </section>

      <section className="booking-cta section-shell" id="book-home" data-reveal>
        <div><Eyebrow light>Check availability</Eyebrow><h2>Your date.<br /><em>Arun&apos;s stage.</em></h2></div>
        <div><p>Share date, city and audience details. The enquiry opens in WhatsApp; nothing is stored on this website.</p><Link className="button button-brass" href="/book">Start an enquiry <ArrowUpRight /></Link></div>
      </section>
    </PageFrame>
  );
}
