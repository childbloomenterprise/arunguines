import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, performerKeywords } from "../seo";
import { PageFrame, PageHero, SectionHeading } from "../site-components";
import { artistModes, milestones, profileVideo } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Meet Arun Guinness, a singer, voice artist and live entertainer bringing music and familiar voices to Malayali communities worldwide.";
export const metadata = createPageMetadata({ title: "Meet Arun Guinness", description, path: "/artist", keywords: performerKeywords });

export default function ArtistPage() {
  return <PageFrame>
    <PageSchema path="/artist" name="About Arun Guinness" description={description} type="AboutPage" />
    <PageHero variant="artist" label="The artist" title="One man." accent="A world of voices." description={description} highlights={["Kochi, Kerala", "Singer + voice artist", "Live entertainer"]} media={<VideoPlayer id={profileVideo.id} title={profileVideo.title} alt="Arun Guinness in his official profile film" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager caption="Meet the artist · Official profile" />} />
    <section className="artist-story section-shell"><SectionHeading label="Behind the voices" title="Listening closely." accent="Connecting naturally." /><div><p className="lead">A familiar song can bring a whole room together. Arun builds his performances around that connection.</p><p>His live singing moves between male and female playback styles, bringing voice impressions, mimicry and audience interaction into the same evening. Electronics and sound-engineering studies helped develop the technical ear behind the craft.</p><p>Based in Kochi, he welcomes enquiries from Malayali communities abroad and event organisers across India.</p><BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink></div></section>
    <section className="craft-section section-shell"><SectionHeading label="The performance" title="Music at the heart." accent="Personality in every voice." /><div className="craft-grid">{artistModes.map((mode) => <article key={mode.number}><h3>{mode.title}</h3><p>{mode.text}</p></article>)}</div></section>
    <section className="inner-section section-shell"><SectionHeading label="Along the way" title="A life shaped" accent="by the stage." /><div className="artist-milestones">{milestones.map((item) => <article key={item.title}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source} <ArrowUpRight /></a></div></article>)}</div></section>
  </PageFrame>;
}
