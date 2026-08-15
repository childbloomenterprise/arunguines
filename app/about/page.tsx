import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "../icons";
import { Eyebrow, MediaRail, PageHero, StatsStrip } from "../site-components";
import { artistModes, milestones } from "../site-data";
import { VideoPlayer } from "../video-player";

export const metadata: Metadata = { title: "The Artist", description: "Discover Arun Guinness—Kerala singer, voice-imitation performer, mimicry artist, actor, sound engineer and live entertainer." };

export default function About() {
  return (
    <main id="main-content">
      <PageHero label="The artist" title="Built by sound." accent="Driven by stage." description="From electronics and sound engineering to thousands of live performances—Arun's craft combines technical listening with fearless entertainment." />
      <section className="artist-story section-shell">
        <div className="artist-portrait" data-reveal>
          <VideoPlayer id="a0BScpW4hkA" title="The Arun Guinness story" alt="Arun Guinness profile and award video" className="artist-profile-player" sizes="(max-width: 800px) 100vw, 48vw" badge="Watch profile here" variant="portrait" />
        </div>
        <div className="artist-copy" data-reveal>
          <Eyebrow>Kothamangalam · Kerala</Eyebrow>
          <h2>A singer who<br /><em>became the voices.</em></h2>
          <p className="lead">Arun Guinness is known for something rarer than mimicry: recreating playback singers while actually singing—including transformations between male and female voices in one performance.</p>
          <p>His path moved through electronics, sound-engineering studies, music, television and live entertainment. That technical ear now powers shows combining voice artistry, characters, comedy and direct audience connection.</p>
          <p>From cultural festivals and institutions to Kuwait, Oman and the UAE, every stage becomes a space for surprise.</p>
          <Link className="button button-dark" href="/contact">Bring Arun to your stage <ArrowUpRight /></Link>
        </div>
      </section>
      <section className="artist-modes section-shell">
        <div className="section-intro" data-reveal><Eyebrow>The whole artist</Eyebrow><h2>Four crafts.<br /><em>One instinct.</em></h2></div>
        <div className="mode-orbit">{artistModes.map((mode) => <article key={mode.number} data-reveal><span>{mode.number}</span><h3>{mode.title}</h3><p>{mode.text}</p></article>)}<div className="mode-core" aria-hidden="true">AG</div></div>
      </section>
      <section className="about-stats section-shell"><StatsStrip /><p className="source-note">*Career figures originate from Arun&apos;s published 2023 profile and require final reconfirmation before public launch.</p></section>
      <section className="timeline-section section-shell">
        <div className="section-intro" data-reveal><Eyebrow>The journey</Eyebrow><h2>Every stage<br /><em>changed the voice.</em></h2></div>
        <div className="timeline-list">
          {milestones.map((item, index) => <article key={item.year} data-reveal style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}><span>{item.year}</span><h3>{item.title}</h3><p>{item.text}</p><i /></article>)}
        </div>
      </section>
      <section className="media-proof section-shell"><MediaRail /></section>
    </main>
  );
}
