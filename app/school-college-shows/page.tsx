import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "../booking-link";
import { ArrowRight, ArrowUpRight } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { createPageMetadata } from "../seo";
import { stagePortfolio } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Arun Guinness performs live music, voice impressions and mimicry for school and college events.";
export const metadata = createPageMetadata({ title: "School & College Shows", description, path: "/school-college-shows", keywords: ["school annual day stage show", "college fest stage show", "campus stage show Kerala"] });

export default function SchoolCollegeShowsPage() {
  const campusPhotos = [
    stagePortfolio.find((photo) => photo.sourcePage === 50)!,
    stagePortfolio.find((photo) => photo.sourcePage === 99)!,
    stagePortfolio.find((photo) => photo.sourcePage === 100)!,
    stagePortfolio.find((photo) => photo.sourcePage === 89)!,
  ];
  return <PageFrame>
    <PageHero label="School & college portfolio" title="Let the campus" accent="sing back." description="See Arun with students, on stage and in the middle of the audience. Start with a real school performance." highlights={[]} media={<VideoPlayer id="P22go-G5Xnc" title="Arun Guinness at Mary Mount Public School" alt="Arun Guinness performing at Mary Mount Public School" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="campus-story section-shell" aria-labelledby="campus-story-title">
      <div className="campus-story-heading portfolio-animate" data-reveal><span className="eyebrow">Around the performance</span><h2 id="campus-story-title">From first song <em>to the last smile.</em></h2><p>These photographs show the scale of the room, Arun&apos;s connection with students and the moments around a school event.</p></div>
      <div className="campus-story-grid">{campusPhotos.map((photo, index) => <figure className="campus-story-card portfolio-animate" data-reveal key={photo.src} style={{ "--reveal-index": index } as React.CSSProperties}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 1099px) 44vw, 540px" style={{ objectPosition: photo.focalPoint ?? "50% 50%" }} /></div><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.caption}</figcaption></figure>)}</div>
      <Link className="text-link" href="/proof#photo-portfolio">See the full event portfolio <ArrowRight /></Link>
    </section>
    <section className="campus-booking section-shell"><div><span className="eyebrow">Bring Arun to your campus</span><h2>A date. A hall. <em>A voice for the moment.</em></h2><p>Annual day, arts night or college festival—share the setting and Arun can discuss the right shape for the programme.</p></div><BookingLink className="button button-brass" aria-label="Check Availability" href="/book?event=School%20annual%20day">Check a date <ArrowUpRight /></BookingLink></section>
  </PageFrame>;
}
