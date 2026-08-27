import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight, ArrowUpRight, Instagram, Mail, MapPin, Message, Phone, VoiceMark, Youtube } from "./icons";
import { ReplayIntroButton } from "./experience";
import { contact, mediaLogos, programs, stats } from "./site-data";
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
  return <div className="stats-strip">{stats.map((stat, index) => <details key={stat.label} data-reveal><summary><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></summary><p>{stat.source}</p></details>)}</div>;
}

export function MediaRail() {
  return <div className="media-rail" aria-label="Television and media appearances"><span>Seen on</span><div>{mediaLogos.map((logo) => <strong key={logo}>{logo}</strong>)}</div></div>;
}

export function ProgramCards() {
  return <div className="program-cards">{programs.map((program) => <article key={program.slug} data-reveal><div><span>{program.number}</span><small>{program.duration}</small></div><h3>{program.title}</h3><p>{program.description}</p><strong>{program.bestFor}</strong><Link href={`/book?show=${encodeURIComponent(program.title)}`}>Plan this show <ArrowRight /></Link></article>)}</div>;
}

export function PageHero({ label, title, accent, description, highlights }: { label: string; title: string; accent: string; description: string; highlights: readonly string[] }) {
  return <section className="page-hero"><div className="page-curtain" aria-hidden="true" /><div className="page-hero-copy" data-reveal><Eyebrow light>{label}</Eyebrow><h1>{title} <em>{accent}</em></h1><p>{description}</p><div className="page-highlights">{highlights.map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div></div><div className="page-stage-mark" aria-hidden="true"><VoiceMark /><span>Arun / Live</span></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-marquee" aria-hidden="true"><span>One man · Many voices · One unforgettable stage · </span></div><div className="footer-cta"><div><Eyebrow light>Encore</Eyebrow><h2>Bring every voice<br /><em>to your stage.</em></h2></div><Link className="button button-brass" href="/book">Start booking <ArrowUpRight /></Link></div><div className="footer-links"><div className="footer-brand"><VoiceMark /><strong>Arun Guinness</strong><p>Singer · voice artist · mimicry performer · live entertainer</p><ReplayIntroButton /></div><div><small>Explore</small><Link href="/shows">Shows</Link><Link href="/artist">Artist</Link><Link href="/proof">Proof</Link><Link href="/book">Book</Link></div><div><small>Direct</small><a href={`tel:${contact.phone}`}><Phone />{contact.phoneDisplay}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message />WhatsApp</a><a href={`mailto:${contact.email}`}><Mail />Email</a></div><div><small>Follow</small><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a><a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube</a><a href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin />Kothamangalam</a></div></div><div className="footer-base"><span>© {new Date().getFullYear()} Arun Guinness</span><span>*Selected career figures require final reconfirmation before public launch.</span></div></footer>;
}

export function MobileBookingBar() {
  return <div className="mobile-booking" aria-label="Quick booking actions"><a href={`tel:${contact.phone}`}><Phone />Call</a><Link href="/book"><Message />Plan a show</Link></div>;
}
