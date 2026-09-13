import Image from "next/image";
import Link from "next/link";
import { PageSchema } from "./page-schema";
import { ArrowRight, ArrowUpRight } from "./icons";
import { BookingLink } from "./booking-link";
import { PageFrame } from "./site-components";
import { homepageVideos, videos } from "./site-data";
import { VideoPlayer } from "./video-player";

const performances = [videos[0], videos[1], homepageVideos[1], homepageVideos[0], ...videos.slice(2)];

export default function Home() {
  return <PageFrame>
    <PageSchema path="/" name="Arun Guinness — Live Stage Shows" description="Live singing and voice artistry by Arun Guinness." />
    <section className="home-hero stage-hero" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Live singer & voice artist</span>
        <h1>One man.<strong>Many voices.</strong></h1>
        <p>Meet Arun Guinness. Hear the voices, watch the performances, and bring the show to your stage.</p>
        <div className="hero-actions">
          <BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink>
          <Link className="hero-watch" href="#voices">Watch the videos <ArrowRight /></Link>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-art-disc"><Image src="/arun-cartoon-logo.webp" alt="Illustrated portrait of Arun Guinness" width={760} height={760} priority sizes="(max-width: 699px) 75vw, 480px" /></div>
        <span className="hero-art-note">Singing · Voice artistry · Live shows</span>
      </div>
    </section>

    <section className="home-section section-shell voices-section" id="voices">
      <div className="simple-section-heading"><span className="eyebrow">Step into the spotlight</span><h2>Hear every voice.</h2><p>Arun&apos;s signature voice transformations and live performances, all in one place.</p></div>
      <div className="performance-grid">
        {performances.map((video, index) => <article className="performance-tile" key={video.id}>
          <VideoPlayer id={video.id} title={video.title} alt={`${video.title} by Arun Guinness`} sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px" ratio="16:9" poster={video.poster} eager={index === 0} />
          <div><h3>{video.title}</h3></div>
        </article>)}
      </div>
      <Link className="text-link" href="/proof">See photos & more videos <ArrowRight /></Link>
    </section>

    <section className="idea-section section-shell">
      <div><span className="eyebrow">From Idea to Anything</span><h2>Tell us your idea. We&apos;ll shape the show.</h2><p>From a quick guest appearance to a full evening of voices and music.</p></div>
      <BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink>
    </section>
  </PageFrame>;
}
