import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { ArrowRight, ArrowUpRight, Facebook, Instagram, Message, Phone, VoiceMark, Whatsapp } from "./icons";
import { bookingSteps, contact, eventExperiences, faqs, mediaEvidence, programs, stats } from "./site-data";
import { BookingLink } from "./booking-link";
import { VideoPlayer } from "./video-player";
export { PerformanceMap } from "./performance-map";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter="page-enter" exit="page-exit" default="none"><main id="main-content">{children}</main></ViewTransition>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "is-light" : ""}`}><i aria-hidden="true" />{children}</span>;
}

export function SectionHeading({ label, title, accent, description, light = false }: { label: string; title: string; accent: string; description?: string; light?: boolean }) {
  return <div className={`act-heading ${light ? "is-light" : ""}`}><Eyebrow light={light}>{label}</Eyebrow><h2>{title} <span>{accent}</span></h2>{description ? <p>{description}</p> : null}</div>;
}

// Keep the existing landing-page interface while removing editorial numbering.
export function ActHeading(props: Parameters<typeof SectionHeading>[0] & { act: string }) { return <SectionHeading {...props} />; }

export function StatsStrip() {
  return <div className="stats-strip">{stats.map((stat, index) => <details key={stat.label} data-reveal><summary><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></summary><p><a href={stat.sourceUrl} target="_blank" rel="noreferrer">{stat.source} <ArrowUpRight /></a></p></details>)}</div>;
}

export function MediaRail() {
  return <div className="media-rail" aria-label="Documented media and event evidence"><span>Documented by</span><div>{mediaEvidence.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer"><strong>{item.label}</strong><ArrowUpRight /></a>)}</div></div>;
}

export function ProgramCards({ detailed = false }: { detailed?: boolean }) {
  return <div className="program-cards">{programs.map((program) => <article key={program.slug}><div><VoiceMark /></div><h3>{program.title}</h3><p>{program.description}</p>{detailed ? <ul>{program.inclusions.map((item) => <li key={item}>{item}</li>)}</ul> : null}<BookingLink href={`/book?show=${encodeURIComponent(program.title)}`} aria-label={`Check Availability for ${program.title}`}>Explore a date <ArrowRight /></BookingLink></article>)}</div>;
}

export function EventExperiences() {
  return <><div className="event-experiences">{eventExperiences.map((event) => <BookingLink key={event.event} href={`/book?event=${encodeURIComponent(event.event)}`} className="event-experience"><span>{event.label}</span><h3>{event.title}</h3><p>{event.text}</p><strong>Plan your evening <ArrowUpRight /></strong></BookingLink>)}</div><p className="event-secondary">Also bringing live entertainment to <BookingLink href="/book?event=Corporate%20event">corporate events</BookingLink>, <Link href="/school-college-shows">schools and colleges</Link>, and <Link href="/kochi-stage-shows">celebrations across India</Link>.</p></>;
}

export function BookingSteps() {
  return <ol className="booking-steps">{bookingSteps.map((step, index) => <li key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}

export function FaqSection() {
  return <div className="faq-section"><h3>A few things you might be wondering.</h3><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div>;
}

export function CampusStageFeature() {
  return <div className="campus-feature" data-reveal>
    <div className="campus-feature-media">
      <VideoPlayer id="P22go-G5Xnc" title="Arun Guinness at Mary Mount Public School" alt="Arun Guinness performing with a microphone on the Mary Mount Public School annual-day stage" className="campus-player" sizes="(max-width: 800px) calc(100vw - 40px), 52vw" ratio="16:9" badge="Verified school stage" caption="Mary Mount Public School · Annual Day 2024" />
    </div>
    <div className="campus-feature-copy">
      <Eyebrow light>Schools + colleges</Eyebrow>
      <h3>From annual day<br /><em>to campus night.</em></h3>
      <p>Choose a compact guest appearance, a 90-minute one-man show or a larger production. Running time, language mix and audience interaction adapt to the institution.</p>
      <div className="campus-feature-tags" aria-label="Suitable institutional events"><span>Annual days</span><span>College fests</span><span>Arts days</span><span>Inaugurations</span></div>
      <div className="campus-feature-actions"><Link className="button button-brass" href="/school-college-shows">Explore campus shows <ArrowRight /></Link><Link className="button button-outline" href="/book?show=Guest%20Performance&event=School%20annual%20day">Check a date <ArrowUpRight /></Link></div>
      <a className="campus-source" href="https://www.youtube.com/watch?v=P22go-G5Xnc" target="_blank" rel="noreferrer">Official school performance source <ArrowUpRight /></a>
    </div>
  </div>;
}

export function PageHero({ label, title, accent, description, highlights, media, variant = "default", motionPreset = "subtle" }: { label: string; title: string; accent: string; description: string; highlights: readonly string[]; media?: React.ReactNode; variant?: "default" | "shows" | "artist" | "proof" | "book"; motionPreset?: "subtle" | "cinematic" }) {
  return <section className={`page-hero page-hero-${variant} motion-${motionPreset}`}><div className="page-hero-copy" data-reveal="hero"><Eyebrow>{label}</Eyebrow><h1>{title} <span>{accent}</span></h1><p>{description}</p><div className="page-highlights">{highlights.map((item, index) => <span key={item} style={{ "--reveal-index": index } as React.CSSProperties}>{item}</span>)}</div></div>{media ? <div className="page-hero-media" data-reveal="scale" data-depth-media={motionPreset === "cinematic" ? "true" : undefined}>{media}</div> : null}</section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-simple"><Link href="/" className="footer-identity"><Image src="/arun-cartoon-icon.png" alt="" width={52} height={52} /><strong>Arun Guinness</strong></Link><nav aria-label="Footer navigation"><Link href="/#voices">Videos</Link><Link href="/proof">Portfolio</Link><Link href="/shows">Shows</Link><Link href="/artist">Arun</Link><BookingLink>Find a date</BookingLink></nav><div className="footer-social"><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={contact.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={`tel:${contact.phone}`}>Call Arun</a></div></div><div className="footer-base"><span>© {new Date().getFullYear()} Arun Guinness</span><span>Kochi · Worldwide</span></div></footer>;
}

const socialLinks = [
  { label: "WhatsApp", href: contact.whatsapp, icon: Whatsapp, className: "is-whatsapp" },
  { label: "Facebook", href: contact.facebook, icon: Facebook, className: "is-facebook" },
  { label: "Instagram", href: contact.instagram, icon: Instagram, className: "is-instagram" },
] as const;

export function SocialRail() {
  return <aside className="social-rail" aria-label="Connect with Arun Guinness">
    {socialLinks.map(({ label, href, icon: Icon, className }) => <a key={label} className={className} href={href} target="_blank" rel="noreferrer" aria-label={`${label} — Arun Guinness`}><span>{label}</span><i aria-hidden="true"><Icon /></i></a>)}
  </aside>;
}

export function MobileBookingBar() {
  return <div className="mobile-booking" aria-label="Quick booking actions"><a href={`tel:${contact.phone}`}><Phone />Call Arun</a><BookingLink><Message />Find a date</BookingLink></div>;
}
