import Image from "next/image";
import Link from "next/link";
import { PageSchema } from "./page-schema";
import { ArrowRight, ArrowUpRight } from "./icons";
import { BookingLink } from "./booking-link";
import { PageFrame } from "./site-components";
import { contact, homepageVideos, stagePortfolio, videos } from "./site-data";
import { VideoPlayer } from "./video-player";

const performances = [videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2)];
const featuredPhotos = [stagePortfolio[0], stagePortfolio[1], stagePortfolio[2], stagePortfolio[4], stagePortfolio[12]];

export default function Home() {
  return <PageFrame>
    <PageSchema path="/" name="Arun Guinness — Live Stage Shows" description="Live singing and voice artistry by Arun Guinness." />
    <section className="home-hero stage-hero" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Arun Guinness · Live voice artistry</span>
        <h1>One artist.<strong>A roomful of voices.</strong></h1>
        <p>Familiar songs find an unexpected voice. Arun brings them to life, right there in your room.</p>
        <div className="hero-actions">
          <BookingLink className="button button-brass" aria-label="Check Availability">Find your date <ArrowUpRight /></BookingLink>
          <Link className="hero-watch" href="#voices">Hear Arun live <ArrowRight /></Link>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-art-disc"><Image src="/arun-cartoon-logo.webp" alt="Illustrated portrait of Arun Guinness beside a studio recording microphone" width={760} height={760} priority sizes="(max-width: 699px) 75vw, 480px" /></div>
        <span className="hero-art-note">Singing · Voices · A little magic in the room</span>
      </div>
    </section>

    <section className="home-section section-shell voices-section" id="voices">
      <div className="simple-section-heading"><span className="eyebrow">The performances</span><h2>Every voice has its moment.</h2><p>Signature transformations, songs and live stages. Press play.</p></div>
      <div className="performance-grid">
        {performances.map((video, index) => <article className="performance-tile" key={video.id}>
          <VideoPlayer id={video.id} title={video.title} alt={`${video.title} by Arun Guinness`} sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px" ratio="16:9" poster={video.poster} eager={index === 0} />
          <div><h3>{video.title}</h3></div>
        </article>)}
      </div>
      <Link className="text-link" href="/proof">Explore the full archive <ArrowRight /></Link>
    </section>

    <section className="moments-section section-shell" id="moments">
      <div className="moments-heading"><div><span className="eyebrow">In the room</span><h2>The song stays.<br /><em>So does the moment.</em></h2></div><Link className="text-link" href="/proof#photo-portfolio">See all 14 photos <ArrowUpRight /></Link></div>
      <div className="moments-grid">
        {featuredPhotos.map((photo, index) => <figure className={`moment-card moment-card-${index + 1}`} key={photo.src}>
          <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 699px) 100vw, 55vw" : "(max-width: 699px) 50vw, 30vw"} style={{ objectPosition: index === 2 ? "50% 10%" : photo.focalPoint ?? "50% 50%" }} />
          <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.category}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="idea-section section-shell">
      <div><span className="eyebrow">From Idea to Anything</span><h2>Give your evening a voice.</h2><p>A date, a place, a beginning of an idea. We can shape the rest together.</p><div className="idea-choices"><BookingLink href="/book?event=Onam%20%2F%20cultural%20festival">A festival</BookingLink><BookingLink href="/book?event=Family%20%2F%20community%20gathering">A gathering</BookingLink><BookingLink href="/book?event=School%20annual%20day">A campus stage</BookingLink></div></div>
      <div className="idea-actions"><BookingLink className="button button-brass" aria-label="Check Availability">Explore a date <ArrowUpRight /></BookingLink><a className="call-link" href={`tel:${contact.phone}`}>Speak to Arun <ArrowRight /></a></div>
    </section>
  </PageFrame>;
}
