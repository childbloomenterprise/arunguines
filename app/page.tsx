import Link from "next/link";
import { PageSchema } from "./page-schema";
import { ArrowRight, ArrowUpRight, VoiceMark } from "./icons";
import { BookingLink } from "./booking-link";
import { BookingSteps, EventExperiences, Eyebrow, FaqSection, MediaRail, PageFrame, ProgramCards, SectionHeading } from "./site-components";
import { contact, featuredPerformances, videos } from "./site-data";
import { VideoPlayer } from "./video-player";
import { PhotoPortfolio } from "./photo-portfolio";

export default function Home() {
  return <PageFrame>
    <PageSchema path="/" name="Arun Guinness — Live Stage Shows" description="Live singing, voice transformations and shared celebration for Malayali communities worldwide." />
    <section className="home-hero stage-hero" id="home">
      <div className="hero-copy">
        <Eyebrow light>Live stage shows · Kerala to the world</Eyebrow>
        <span className="hero-name">Arun Guinness</span>
        <h1>Many voices.<strong>One unforgettable<br className="desktop-break" /> evening.</strong></h1>
        <p>Live singing, remarkable voice transformations, and shared celebration for Malayali communities worldwide.</p>
        <div className="hero-actions">
          <BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink>
          <Link className="hero-watch" href="#performances-home">Watch Arun Live <ArrowRight /></Link>
        </div>
      </div>
      <div className="hero-performance">
        <div className="stage-media-label"><span><i />Step into the spotlight.</span><VoiceMark /></div>
        <VideoPlayer id={videos[0].id} title={videos[0].title} alt="Arun Guinness performing his signature male and female voice transformation" className="hero-player" sizes="(max-width: 999px) calc(100vw - 40px), 540px" eager ratio="16:9" />
        <div className="stage-media-footer"><div><strong>ONE MAN. MANY VOICES.</strong><span>Hear the transformation. Recorded live.</span></div><span className="live-pill">LIVE PERFORMANCE</span></div>
      </div>
      <div className="hero-bottom"><span>Singing <i /> Voice artistry <i /> Live entertainment</span><span>Kochi, Kerala ↗ Worldwide</span></div>
    </section>

    <section className="home-section section-shell" id="performances-home">
      <SectionHeading label="Press play. Meet Arun." title="Some things are better" accent="heard live." description="Familiar voices. Unexpected transformations. A feel for the evening you could bring to your community." />
      <div className="performance-grid">
        {featuredPerformances.map((video) => <article className="performance-tile" key={video.id}>
          <VideoPlayer id={video.id} title={video.title} alt={video.title + " by Arun Guinness"} sizes="(max-width: 699px) calc(100vw - 40px), 390px" ratio="16:9" poster={video.poster} />
          <div><span>{video.category === "Signature" ? "THE SIGNATURE" : video.category === "International" ? "ACROSS BORDERS" : "ON STAGE"}</span><h3>{video.title}</h3><p>{video.subtitle}</p></div>
        </article>)}
      </div>
      <Link className="text-link" href="/proof">Explore the performances <ArrowRight /></Link>
    </section>

    <section className="portfolio-section" id="portfolio-home"><div className="section-shell">
      <SectionHeading label="Stage & event portfolio" title="Songs, celebrations," accent="and shared moments." description="A growing visual archive of Arun's live shows, guest appearances and community programmes." light />
      <PhotoPortfolio />
      <Link className="text-link text-link-light portfolio-link" href="/proof#photo-portfolio">See the full performance story <ArrowRight /></Link>
    </div></section>

    <section className="event-section" id="events-home"><div className="section-shell">
      <SectionHeading label="Your people. Your occasion." title="An evening that brings" accent="everyone together." description="For the organisers bringing a little of Kerala to communities around the world." />
      <EventExperiences />
    </div></section>

    <section className="home-section section-shell" id="shows-home">
      <SectionHeading label="Choose your experience" title="Your stage." accent="Your kind of show." description="A featured moment or the main event. Start with the experience you have in mind; shape the details together." />
      <ProgramCards />
      <div className="section-action"><p>Not sure which format fits?</p><BookingLink className="text-link">Help me choose <ArrowRight /></BookingLink></div>
    </section>

    <section className="community-section section-shell">
      <div><Eyebrow light>Kerala roots. A wider stage.</Eyebrow><h2>Familiar voices.<br /><span>Far from home.</span></h2><p>From Kerala television to community celebrations in Kuwait, explore Arun&apos;s performances and the events that brought people together.</p><a className="text-link" href="https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" target="_blank" rel="noreferrer">Onavesham 2024 · Kuwait event coverage <ArrowUpRight /></a></div>
      <div><VideoPlayer id={videos[2].id} title={videos[2].title} alt="Arun Guinness performing on the Flowers television stage" sizes="(max-width: 800px) calc(100vw - 80px), 500px" ratio="16:9" caption="Flowers television performance" /><MediaRail /></div>
    </section>

    <section className="home-section about-preview section-shell" id="about-home">
      <div><Eyebrow>The artist behind the voices</Eyebrow><h2>A musical ear.<br /><span>A feel for the room.</span></h2></div>
      <div><p className="lead">Arun Guinness is a singer, voice artist and live entertainer based in Kochi, Kerala.</p><p>His sound-engineering background meets the instinct of a live performer: moving between playback styles, music and mimicry, and making space for the audience to join in.</p><Link className="text-link" href="/artist">Meet Arun <ArrowRight /></Link></div>
    </section>

    <section className="planning-section"><div className="section-shell"><SectionHeading label="Plan with confidence" title="From an idea" accent="to an evening." /><BookingSteps /><FaqSection /></div></section>
    <section className="booking-cta section-shell" id="book-home"><div><Eyebrow light>The next spotlight could be yours</Eyebrow><h2>Bring Arun<br /><span>to your stage.</span></h2></div><div><p>From an Onam celebration to a community&apos;s big night: tell us your event, city and date. Let&apos;s start planning the performance.</p><BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink><a className="text-link call-stage" href={`tel:${contact.phone}`}>Talk about your stage <ArrowUpRight /></a><a className="text-link" href={contact.whatsapp + "?text=" + encodeURIComponent("Hello Arun, I found you on your website (/) and would like to discuss an event.")} target="_blank" rel="noreferrer">Prefer to chat directly? WhatsApp us <ArrowRight /></a></div></section>
  </PageFrame>;
}
