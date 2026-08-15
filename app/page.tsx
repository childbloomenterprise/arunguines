import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram, Play, Youtube } from "./icons";
import { Eyebrow, MediaRail, ProgramGrid, SocialButtons, StatsStrip, VideoCard } from "./site-components";
import { artistModes, contact, videos, voiceRoster } from "./site-data";
import { VideoPlayer } from "./video-player";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-orbit orbit-a" aria-hidden="true"><span /></div>
        <div className="hero-orbit orbit-b" aria-hidden="true"><span /></div>
        <div className="hero-copy" data-reveal>
          <Eyebrow light>Kerala · India · Worldwide</Eyebrow>
          <h1 aria-label="One man. Many voices."><span>One</span> man.<strong>Many voices.</strong></h1>
          <p className="hero-lead">Singer. Voice artist. Mimicry performer. A complete live entertainer who transforms between male and female playback voices.</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/contact">Book a show <ArrowUpRight /></Link>
            <a className="button button-ghost" href="#featured-performance"><Play />Watch here</a>
          </div>
          <div className="hero-facts">
            <p><small>01 / Signature</small><strong>Dual-register singing</strong></p>
            <p><small>02 / Repertoire</small><strong>35+ artist voices</strong></p>
            <p><small>03 / Flagship</small><strong>90-minute live show</strong></p>
          </div>
        </div>

        <div className="hero-stage" id="featured-performance" data-reveal="scale">
          <div className="sphere-caption"><span>Live archive</span><strong>Voice, in orbit</strong></div>
          <VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing a male and female double-voice song" className="hero-media" sizes="(max-width: 900px) 94vw, 46vw" eager badge="Signature performance" variant="hero" />
          <span className="stage-note note-a">Singer</span><span className="stage-note note-b">Performer</span><span className="stage-note note-c">35+ voices</span>
        </div>
        <div className="hero-scroll"><span>Scroll to enter</span><i /></div>
      </section>

      <section className="kinetic-band" aria-label="Performance disciplines">
        <div><span>Singing</span><i /> <span>35+ voices</span><i /> <span>Mimicry</span><i /> <span>Comedy</span><i /> <span>Live energy</span><i /> <span>Singing</span><i /> <span>35+ voices</span><i /> <span>Mimicry</span></div>
      </section>

      <section className="proof-block section-shell">
        <div className="section-intro" data-reveal><Eyebrow>Career in numbers</Eyebrow><h2>Not an act.<br /><em>A phenomenon.</em></h2><p>Nearly two decades spent turning voice, music and character into live moments audiences remember.</p></div>
        <StatsStrip />
        <p className="source-note">*Performance figures reported in Arun&apos;s published 2023 professional profile; final counts to be reconfirmed before launch.</p>
      </section>

      <section className="voices-section section-shell">
        <div className="section-heading" data-reveal><div><Eyebrow>The proof is in the performance</Eyebrow><h2>Hear the<br /><em>impossible.</em></h2></div><a href={contact.youtube} target="_blank" rel="noreferrer">Official YouTube <ArrowUpRight /></a></div>
        <div className="video-bento">
          {videos.slice(0, 4).map((video, index) => <VideoCard key={video.id} video={video} index={index} feature={index === 0} />)}
        </div>
      </section>

      <section className="repertoire-section section-shell">
        <div className="section-heading" data-reveal><div><Eyebrow>Inside the voice library</Eyebrow><h2>Familiar voices.<br /><em>Fresh surprise.</em></h2></div><p>A selection from Arun&apos;s reported multilingual repertoire—performed as live interpretation, not playback.</p></div>
        <div className="voice-roster">
          {voiceRoster.map((voice, index) => <article key={voice.name} data-reveal style={{ "--delay": `${(index % 4) * 55}ms` } as React.CSSProperties}><span>0{index + 1}</span><h3>{voice.name}</h3><p>{voice.register}</p><small>{voice.language}</small></article>)}
        </div>
      </section>

      <section className="transformation">
        <div className="transformation-copy" data-reveal>
          <Eyebrow light>Signature ability</Eyebrow>
          <h2>Male voice.<br /><span>Female voice.</span><br />Same song.</h2>
          <p>Arun moves between playback-singer styles while actually singing—then layers music, mimicry, comedy and audience interaction around it.</p>
          <Link className="text-link light-link" href="/videos">Explore the voices <ArrowRight /></Link>
        </div>
        <div className="voice-visual" aria-hidden="true" data-reveal>
          <div className="voice-side voice-male"><small>Voice 01</small><strong>LOW</strong><span>Male register</span></div>
          <div className="voice-wave">{Array.from({ length: 26 }).map((_, index) => <i key={index} style={{ "--wave": `${20 + ((index * 17) % 78)}%`, "--wave-delay": `${index * -45}ms` } as React.CSSProperties} />)}</div>
          <div className="voice-side voice-female"><small>Voice 02</small><strong>HIGH</strong><span>Female register</span></div>
        </div>
      </section>

      <section className="shows-section section-shell">
        <div className="section-heading" data-reveal><div><Eyebrow>Choose your experience</Eyebrow><h2>One artist.<br /><em>Four formats.</em></h2></div><p>Every performance configured around audience, occasion, stage time and venue.</p></div>
        <ProgramGrid compact />
      </section>

      <section className="artist-modes section-shell">
        <div className="section-intro" data-reveal><Eyebrow>One artist · four dimensions</Eyebrow><h2>More than<br /><em>an impression.</em></h2></div>
        <div className="mode-orbit">
          {artistModes.map((mode) => <article key={mode.number} data-reveal><span>{mode.number}</span><h3>{mode.title}</h3><p>{mode.text}</p></article>)}
          <div className="mode-core" aria-hidden="true">AG</div>
        </div>
      </section>

      <section className="reach-section">
        <div className="reach-copy" data-reveal><Eyebrow light>Kerala to the Gulf</Eyebrow><h2>Built locally.<br /><em>Performed globally.</em></h2><p>Documented appearances across Kuwait, Oman and the UAE—plus television, schools, institutions, corporate stages and cultural festivals across Kerala.</p><Link className="button button-light" href="/about">Discover the journey <ArrowUpRight /></Link></div>
        <div className="reach-map" aria-label="Documented performance regions" data-reveal>
          <span className="map-line line-a" /><span className="map-line line-b" /><span className="map-line line-c" />
          {[
            ["Kerala", "62%", "58%"], ["Kuwait", "35%", "31%"], ["Oman", "48%", "47%"], ["UAE", "29%", "53%"],
          ].map(([name, left, top]) => <div className="map-point" key={name} style={{ left, top }}><i /><span>{name}</span></div>)}
          <strong>LIVE<br />WITHOUT<br />BORDERS</strong>
        </div>
      </section>

      <section className="media-proof section-shell">
        <MediaRail />
        <div className="media-statement" data-reveal><span>Television</span><strong>Comedy Utsavam · female-voice features · live performance segments</strong><span>International</span><strong>Kuwait · Muscat · Sharjah · Dubai</strong></div>
      </section>

      <section className="social-stage section-shell">
        <div className="social-copy" data-reveal><Eyebrow>Follow the live journey</Eyebrow><h2>Stage energy,<br /><em>unfiltered.</em></h2><p>New performances, voice experiments, backstage moments and international shows—published directly by Arun.</p><SocialButtons /></div>
        <div className="social-cards" data-reveal>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="social-card instagram-card"><Instagram /><small>Instagram</small><strong>Reels from<br />every stage.</strong><span>@arun_guinness</span><ArrowUpRight /></a>
          <a href={contact.youtube} target="_blank" rel="noreferrer" className="social-card youtube-card"><Youtube /><small>YouTube</small><strong>Watch every<br />voice change.</strong><span>@arunguinnes</span><ArrowUpRight /></a>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" />
        <div data-reveal><Eyebrow light>Planning an event?</Eyebrow><h2>Give your audience<br /><em>something unforgettable.</em></h2><div className="hero-actions"><Link className="button button-gold" href="/contact">Check availability <ArrowUpRight /></Link><a className="button button-ghost" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp Arun</a></div></div>
        <div className="cta-word" aria-hidden="true">LIVE</div>
      </section>
    </main>
  );
}
