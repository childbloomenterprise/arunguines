import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "../icons";
import { InteractiveTimeline } from "../experience";
import { ActHeading, MeaningIcon, PageFrame, PageHero, StatsStrip } from "../site-components";
import { artistModes, milestones, voiceRoster } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Discover Arun Guinness—Kerala singer, voice-imitation performer, mimicry artist, actor, sound engineer and live entertainer.";
export const metadata: Metadata = { title: "The Artist", description, alternates: { canonical: "/artist" }, openGraph: { title: "The Artist | Arun Guinness", description, url: "/artist" } };

export default function ArtistPage() {
  return <PageFrame><PageHero label="Artist" title="Built by sound." accent="Alive on stage." description="Singer. Voice artist. Sound engineer. Showman." highlights={["Singer", "Voice artist", "Worldwide"]} /><section className="artist-profile section-shell"><div data-reveal><VideoPlayer id="a0BScpW4hkA" title="The Arun Guinness story" alt="Arun Guinness profile and award video" className="profile-player" sizes="(max-width: 850px) 100vw, 48vw" badge="Artist profile" variant="portrait" /></div><div data-reveal><ActHeading act="01" label="Kerala" title="One singer." accent="Many voices." /><p className="lead">Playback voices—male and female—sung live, then shaped with music, mimicry and timing.</p><Link className="button button-dark" href="/book">Book Arun <ArrowUpRight /></Link></div></section><section className="craft-section section-shell"><ActHeading act="02" label="Craft" title="Four skills." accent="One instinct." /><div className="craft-grid">{artistModes.map((mode) => <article key={mode.number} data-reveal><MeaningIcon meaning={mode.title} /><h3>{mode.title}</h3><p>{mode.text}</p></article>)}</div></section><section className="voice-library section-shell"><ActHeading act="03" label="Voices" title="Recognisable." accent="Controlled live." /><div className="voice-grid">{voiceRoster.map((voice) => <article key={voice.name}><div><Image src={voice.photo} alt={`${voice.name}, playback singer`} fill sizes="(max-width: 600px) 45vw, 22vw" style={{ objectPosition: voice.position }} /></div><h3>{voice.name}</h3><p>{voice.register}</p><small>{voice.language}</small></article>)}</div></section><section className="timeline-section section-shell"><ActHeading act="04" label="Journey" title="Sound →" accent="stage." /><InteractiveTimeline items={milestones} /><StatsStrip /></section></PageFrame>;
}
