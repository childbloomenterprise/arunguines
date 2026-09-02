import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight, ArrowUpRight, Instagram, MapPin, Message, Phone, VoiceMark, Youtube } from "./icons";
import { contact, mediaEvidence, programs, stats } from "./site-data";
import { VideoPlayer } from "./video-player";
export { PerformanceMap } from "./performance-map";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter="page-enter" exit="page-exit" default="none"><main id="main-content">{children}</main></ViewTransition>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "is-light" : ""}`}><i aria-hidden="true" />{children}</span>;
}

export function ActHeading({ act, label, title, accent, description, light = false }: { act: string; label: string; title: string; accent: string; description?: string; light?: boolean }) {
  return <div className={`act-heading ${light ? "is-light" : ""}`} data-reveal><div><span>{act}</span><Eyebrow light={light}>{label}</Eyebrow></div><h2>{title} <em>{accent}</em></h2>{description ? <p>{description}</p> : null}</div>;
}

export function StatsStrip() {
  return <div className="stats-strip">{stats.map((stat, index) => <details key={stat.label} data-reveal><summary><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></summary><p><a href={stat.sourceUrl} target="_blank" rel="noreferrer">{stat.source} <ArrowUpRight /></a></p></details>)}</div>;
}

export function MediaRail() {
  return <div className="media-rail" aria-label="Documented media and event evidence"><span>Documented by</span><div>{mediaEvidence.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer"><strong>{item.label}</strong><ArrowUpRight /></a>)}</div></div>;
}

export function ProgramCards() {
  return <div className="program-cards">{programs.map((program, index) => <article key={program.slug} data-reveal style={{ "--reveal-index": index } as React.CSSProperties}><div><span>{program.number}</span><small>{program.duration}</small></div><h3>{program.title}</h3><p>{program.description}</p><strong>{program.bestFor}</strong><Link href={`/book?show=${encodeURIComponent(program.title)}`}>Plan this show <ArrowRight /></Link></article>)}</div>;
}

export function CampusStageFeature() {
  return <div className="campus-feature" data-reveal>
    <div className="campus-feature-media">
      <VideoPlayer id="P22go-G5Xnc" title="Arun Guinness at Mary Mount Public School" alt="Arun Guinness performing with a microphone on the Mary Mount Public School annual-day stage" className="campus-player" sizes="(max-width: 800px) calc(100vw - 40px), 52vw" ratio="16:9" badge="Verified school stage" caption="Mary Mount Public School · Annual Day 2024" />
    </div>
    <div className="campus-feature-copy">
      <Eyebrow light>Schools + colleges</Eyebrow>
      <h3>From annual day<br /><em>to campus night.</em></h3>
      <p>Choose a compact guest appearance, a 90-minute one-man show or a band-backed production. Running time, language mix and audience interaction adapt to the institution.</p>
      <div className="campus-feature-tags" aria-label="Suitable institutional events"><span>Annual days</span><span>College fests</span><span>Arts days</span><span>Inaugurations</span></div>
      <div className="campus-feature-actions"><Link className="button button-brass" href="/school-college-shows">Explore campus shows <ArrowRight /></Link><Link className="button button-outline" href="/book?show=Guest%20Performance&event=School%20annual%20day">Check a date <ArrowUpRight /></Link></div>
      <a className="campus-source" href="https://www.youtube.com/watch?v=P22go-G5Xnc" target="_blank" rel="noreferrer">Official school performance source <ArrowUpRight /></a>
    </div>
  </div>;
}

export function PageHero({ label, title, accent, description, highlights, media, variant = "default", motionPreset = "subtle" }: { label: string; title: string; accent: string; description: string; highlights: readonly string[]; media?: React.ReactNode; variant?: "default" | "shows" | "artist" | "proof" | "book"; motionPreset?: "subtle" | "cinematic" }) {
  return <section className={`page-hero page-hero-${variant} motion-${motionPreset}`}><div className="page-hero-copy" data-reveal="hero"><Eyebrow>{label}</Eyebrow><h1>{title} <em>{accent}</em></h1><p>{description}</p><div className="page-highlights">{highlights.map((item, index) => <span key={item} style={{ "--reveal-index": index } as React.CSSProperties}>{item}</span>)}</div></div>{media ? <div className="page-hero-media" data-reveal="scale" data-depth-media={motionPreset === "cinematic" ? "true" : undefined}>{media}</div> : null}</section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-cta"><div><Eyebrow light>Ready when you are</Eyebrow><h2>Bring every voice<br /><em>to your stage.</em></h2></div><Link className="button button-brass" href="/book">Book Arun <ArrowUpRight /></Link></div><div className="footer-links"><div className="footer-brand"><VoiceMark /><strong>Arun Guinness</strong><p>Singer · voice artist · mimicry performer · live entertainer</p></div><div><small>Explore</small><Link href="/shows">Shows</Link><Link href="/school-college-shows">Schools + colleges</Link><Link href="/proof">Watch</Link><Link href="/artist">About</Link><Link href="/book">Book</Link></div><div><small>Direct</small><a href={`tel:${contact.phone}`}><Phone />{contact.phoneDisplay}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message />WhatsApp</a></div><div><small>Follow</small><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a><a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube</a><a href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin />Kochi</a></div></div><div className="footer-base"><span>© {new Date().getFullYear()} Arun Guinness</span><span>Official performance portfolio · Kochi, Kerala</span></div></footer>;
}

export function MobileBookingBar() {
  return <div className="mobile-booking" aria-label="Quick booking actions"><a href={`tel:${contact.phone}`}><Phone />Call</a><Link href="/book"><Message />Plan a show</Link></div>;
}
