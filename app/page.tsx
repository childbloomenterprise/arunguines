import Image from "next/image";
import Link from "next/link";
import { PageSchema } from "./page-schema";
import { ArrowRight, ArrowUpRight } from "./icons";
import { BookingLink } from "./booking-link";
import { PageFrame } from "./site-components";
import { contact, homepageVideos, stagePortfolio, videos } from "./site-data";
import { VideoPlayer } from "./video-player";

const performances = [videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2)];
const featuredPhotoPaths = [
  "/portfolio/01-live-in-red.webp",
  "/portfolio/17-among-students.webp",
  "/portfolio/15-campus-inauguration.webp",
  "/portfolio/18-night-stage.webp",
  "/portfolio/25-institutional-recognition.webp",
];
const featuredPhotos = featuredPhotoPaths.map((src) => stagePortfolio.find((photo) => photo.src === src)!);

export default function Home() {
  return <PageFrame>
    <PageSchema path="/" name="Arun Guinness — One Man, Many Voices" description="The performance portfolio of Arun Guinness: live voice artistry, shows and events." />
    <section className="home-hero stage-hero" id="home">
      <div className="hero-copy portfolio-animate" data-reveal="hero">
        <span className="eyebrow">Arun Guinness · Performance portfolio</span>
        <h1>One Man, <strong>Many Voices</strong></h1>
        <p>A voice they know. A room that responds. Watch Arun turn familiar songs into live moments.</p>
        <div className="hero-actions">
          <BookingLink className="button button-brass" aria-label="Check Availability">Find your date <ArrowUpRight /></BookingLink>
          <Link className="hero-watch" href="#voices">Watch the performances <ArrowRight /></Link>
        </div>
      </div>
      <div className="hero-art hero-photo hero-poster portfolio-animate" data-reveal="scale">
        <div className="hero-photo-frame hero-poster-frame"><Image src="/portfolio/arun-live-show-poster.webp" alt="Arun Guinness live one-man show poster with Arun holding a recording microphone under blue and purple stage lights" fill priority sizes="(max-width: 699px) calc(100vw - 40px), 430px" /></div>
        <div className="hero-photo-note">
          <i aria-hidden="true" />
          <span><small>One performer</small><strong>An entire live show</strong></span>
        </div>
      </div>
    </section>

    <section className="home-section section-shell voices-section" id="voices">
      <div className="simple-section-heading portfolio-animate" data-reveal><span className="eyebrow">Watch Arun</span><h2>Hear the turn. Feel the room.</h2><p>Signature voices and live performances, ready to play in full view.</p></div>
      <div className="performance-grid">
        {performances.map((video, index) => <article className="performance-tile portfolio-animate" data-reveal key={video.id} style={{ "--reveal-index": index % 3 } as React.CSSProperties}>
          <VideoPlayer id={video.id} title={video.title} alt={`${video.title} by Arun Guinness`} sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px" ratio="16:9" poster={video.poster} eager={index === 0} />
          <div><h3>{video.title}</h3></div>
        </article>)}
      </div>
      <Link className="text-link" href="/proof">Explore the complete portfolio <ArrowRight /></Link>
    </section>

    <section className="moments-section section-shell" id="moments">
      <div className="moments-heading portfolio-animate" data-reveal><div><span className="eyebrow">The portfolio</span><h2>More than a stage.<br /><em>A room to remember.</em></h2></div><Link className="text-link" href="/proof#photo-portfolio">See all {stagePortfolio.length} photographs <ArrowUpRight /></Link></div>
      <div className="moments-grid">
        {featuredPhotos.map((photo, index) => <figure className={`moment-card moment-card-${index + 1} portfolio-animate`} data-reveal key={photo.src} style={{ "--reveal-index": index } as React.CSSProperties}>
          <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 699px) 100vw, 55vw" : "(max-width: 699px) 50vw, 30vw"} style={{ objectPosition: index === 2 ? "50% 10%" : photo.focalPoint ?? "50% 50%" }} />
          <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.collection}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="campus-preview section-shell" aria-labelledby="campus-preview-title">
      <div className="campus-preview-image portfolio-animate" data-reveal="scale"><Image src="/portfolio/23-school-auditorium.webp" alt="Arun Guinness facing a full school auditorium from the stage" fill sizes="(max-width: 699px) calc(100vw - 40px), 52vw" /></div>
      <div className="campus-preview-copy portfolio-animate" data-reveal>
        <span className="eyebrow">For schools and colleges</span>
        <h2 id="campus-preview-title">When the hall <em>sings back.</em></h2>
        <p>See Arun with students, on campus stages and at the moments around the show.</p>
        <Link className="text-link" href="/school-college-shows">Explore the campus portfolio <ArrowRight /></Link>
      </div>
    </section>

    <section className="idea-section section-shell">
      <div><span className="eyebrow">From Idea to Anything</span><h2>Give your evening a voice.</h2><p>A date, a place, a beginning of an idea. We can shape the rest together.</p><div className="idea-choices"><BookingLink href="/book?event=Onam%20%2F%20cultural%20festival">A festival</BookingLink><BookingLink href="/book?event=Family%20%2F%20community%20gathering">A gathering</BookingLink><BookingLink href="/book?event=School%20annual%20day">A campus stage</BookingLink></div></div>
      <div className="idea-actions"><BookingLink className="button button-brass" aria-label="Check Availability">Explore a date <ArrowUpRight /></BookingLink><a className="call-link" href={`tel:${contact.phone}`}>Speak to Arun <ArrowRight /></a></div>
    </section>
  </PageFrame>;
}
