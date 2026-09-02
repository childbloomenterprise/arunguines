import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "../icons";
import { InteractiveTimeline, VoiceExplorer } from "../experience";
import { ActHeading, PageFrame, PageHero, StatsStrip } from "../site-components";
import { artistModes, milestones } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Discover Arun Guinness—Kerala singer, voice-imitation performer, mimicry artist, actor, sound engineer and live entertainer.";
export const metadata: Metadata = { title: "About Arun", description, alternates: { canonical: "/artist" }, openGraph: { title: "About Arun | Arun Guinness", description, url: "/artist" } };

export default function ArtistPage() {
  return <PageFrame>
    <PageHero variant="artist" motionPreset="cinematic" label="About Arun" title="Built by sound." accent="Driven by stage." description="Technical listening, fearless performance and years spent learning what makes a room come alive." highlights={["Singer + voice artist", "Sound-engineering roots", "Kothamangalam · Kerala"]} media={<VideoPlayer id="a0BScpW4hkA" title="The Arun Guinness story" alt="Arun Guinness in his official profile video" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Artist profile" ratio="16:9" caption="Official profile" />} />
    <section className="artist-story section-shell"><div data-reveal><ActHeading act="01" label="The differentiator" title="A singer who" accent="became the voices." /></div><div data-reveal><p className="lead">Arun is known for something rarer than speaking mimicry: recreating playback-singer styles while actually singing—including transformations between male and female voices in one performance.</p><p>Electronics and sound-engineering studies developed the technical ear. Television and documented international programmes sharpened the timing. Each voice remains a respectful live impression, never a claim of identity or affiliation.</p><Link className="button button-dark" href="/book">Bring Arun to your stage <ArrowUpRight /></Link></div></section>
    <section className="craft-section section-shell"><ActHeading act="02" label="The whole artist" title="Four crafts." accent="One instinct." /><div className="craft-grid">{artistModes.map((mode) => <article key={mode.number} data-reveal><span>{mode.number}</span><h3>{mode.title}</h3><p>{mode.text}</p></article>)}</div></section>
    <section className="voice-library section-shell"><ActHeading act="03" label="Explore the repertoire" title="Recognisable styles." accent="Recorded live." description="Choose a voice reference, then open the paired official performance without leaving the page." /><VoiceExplorer /></section>
    <section className="timeline-section section-shell"><ActHeading act="04" label="Journey" title="Every stage" accent="changed the voice." /><InteractiveTimeline items={milestones} /><StatsStrip /></section>
  </PageFrame>;
}
