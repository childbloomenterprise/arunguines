import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight, ArrowUpRight, Check, Clock, Globe, Instagram, Mail, Message, Microphone, People, Play, Sliders, SoundWave, Sparkles, Stage, Television, VoiceMark, Youtube } from "./icons";
import { ReplayIntroButton } from "./experience";
import { contact, mediaLogos, programs, stats } from "./site-data";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter="page-enter" exit="page-exit" default="none"><main id="main-content">{children}</main></ViewTransition>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "is-light" : ""}`}><i aria-hidden="true" />{children}</span>;
}

export function MeaningIcon({ meaning }: { meaning: string }) {
  const value = meaning.toLowerCase();
  if (/time|min|hour/.test(value)) return <Clock />;
  if (/tv|media|broadcast/.test(value)) return <Television />;
  if (/world|region|kerala|kuwait|gulf/.test(value)) return <Globe />;
  if (/audience|festival|event|campus|school|corporate/.test(value)) return <People />;
  if (/proof|source|verified|official/.test(value)) return <Check />;
  if (/custom|adapt|flex/.test(value)) return <Sliders />;
  if (/voice|sing|melody|sound/.test(value)) return <SoundWave />;
  if (/performance|video|play/.test(value)) return <Play />;
  return <Sparkles />;
}

export function ShowSymbol({ slug }: { slug: string }) {
  if (slug === "one-man-show") return <Microphone />;
  if (slug === "variety-musical") return <SoundWave />;
  if (slug === "mega-show") return <Stage />;
  return <Sparkles />;
}

export function ActHeading({ act, label, title, accent, description, light = false }: { act: string; label: string; title: string; accent: string; description?: string; light?: boolean }) {
  return <div className={`act-heading ${light ? "is-light" : ""}`} data-reveal><div><span>{act}</span><Eyebrow light={light}>{label}</Eyebrow></div><h2><span>{title}</span><strong>{accent}</strong></h2>{description ? <p>{description}</p> : null}</div>;
}

export function StatsStrip() {
  return <div className="stats-strip">{stats.map((stat) => <div key={stat.label} data-reveal title={stat.source}><MeaningIcon meaning={stat.label} /><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>;
}

export function MediaRail() {
  return <div className="media-rail" aria-label="Verified television appearances"><span><Television /> Seen on</span><div>{mediaLogos.map((logo) => <strong key={logo}>{logo}</strong>)}</div></div>;
}

export function ProgramCards() {
  return <div className="program-cards">{programs.map((program) => <article id={program.slug} key={program.slug} data-reveal><span className="program-symbol" aria-hidden="true"><ShowSymbol slug={program.slug} /></span><div><small><Clock />{program.duration}</small><h3>{program.title}</h3><strong><People />{program.bestFor}</strong></div><Link href={`/book?show=${encodeURIComponent(program.title)}`} aria-label={`Book ${program.title}`}><ArrowRight /></Link></article>)}</div>;
}

export function PageHero({ label, title, accent, description, highlights }: { label: string; title: string; accent: string; description: string; highlights: readonly string[] }) {
  return <section className="page-hero"><div className="page-hero-copy" data-reveal><Eyebrow light>{label}</Eyebrow><h1><span>{title}</span><strong>{accent}</strong></h1><p>{description}</p><div className="page-highlights">{highlights.map((item) => <span key={item}><MeaningIcon meaning={item} /><b>{item}</b></span>)}</div></div></section>;
}

export function PerformanceMap() {
  return <div className="performance-map" data-reveal><span><Globe /> Documented stages</span><div><strong>Kerala</strong><strong>Kuwait</strong><strong>UAE</strong><strong>Oman</strong></div></div>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><VoiceMark /><div><strong>Arun Guinness</strong><p>One Man. Many Voices.</p></div></div><nav aria-label="Footer navigation"><Link href="/proof">Performances</Link><Link href="/shows">Shows</Link><Link href="/artist">About</Link><Link href="/book">Book</Link></nav><div className="footer-social"><a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube</a><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a><a href={`mailto:${contact.email}`}><Mail />Email</a></div><div className="footer-base"><span>© {new Date().getFullYear()} Arun Guinness</span><ReplayIntroButton /></div></footer>;
}

export function MobileBookingBar() {
  return <div className="mobile-booking" aria-label="Quick booking"><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message />WhatsApp Arun <ArrowUpRight /></a></div>;
}
