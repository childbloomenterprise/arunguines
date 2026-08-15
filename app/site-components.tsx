import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram, Mail, MapPin, Message, Phone, Youtube } from "./icons";
import { contact, mediaLogos, programs, stats } from "./site-data";
import { VideoPlayer } from "./video-player";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}><i />{children}</span>;
}

export function StatsStrip() {
  return (
    <div className="stats-strip" data-reveal>
      {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
    </div>
  );
}

export function MediaRail() {
  return (
    <div className="media-rail" aria-label="Television and media appearances">
      <span>Seen on</span>
      <div>{mediaLogos.map((logo) => <strong key={logo}>{logo}</strong>)}</div>
    </div>
  );
}

export function VideoCard({ video, index, feature = false }: {
  video: { id: string; title: string; subtitle: string; category: string };
  index: number;
  feature?: boolean;
}) {
  return (
    <article className={`video-card ${feature ? "video-card-feature" : ""}`} data-reveal style={{ "--delay": `${Math.min(index, 5) * 70}ms` } as React.CSSProperties}>
      <VideoPlayer id={video.id} title={video.title} alt={`${video.title} performance thumbnail`} className="video-poster" sizes={feature ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"} eager={feature} index={`0${index + 1}`} category={video.category} />
      <div className="video-copy"><h3>{video.title}</h3><p>{video.subtitle}</p><span>Watch here</span></div>
    </article>
  );
}

export function ProgramGrid({ compact = false }: { compact?: boolean }) {
  const items = compact ? programs.slice(0, 4) : programs;
  return (
    <div className="program-grid">
      {items.map((program, index) => (
        <article className="program-card" key={program.title} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
          <div className="program-top"><span>{program.number}</span><small>{program.duration}</small></div>
          <h3>{program.title}</h3>
          <p>{program.description}</p>
          <div className="program-fit">{program.bestFor}</div>
          <Link href={`/contact?show=${encodeURIComponent(program.title)}`}>Plan this show <ArrowRight /></Link>
        </article>
      ))}
    </div>
  );
}

export function PageHero({ label, title, accent, description }: { label: string; title: string; accent: string; description: string }) {
  return (
    <section className="page-hero">
      <div className="page-orbit orbit-one" /><div className="page-orbit orbit-two" />
      <div className="page-hero-copy" data-reveal>
        <Eyebrow light>{label}</Eyebrow>
        <h1>{title}<em>{accent}</em></h1>
        <p>{description}</p>
      </div>
      <span className="page-counter" aria-hidden="true">AG / LIVE</span>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-head">
        <div><Eyebrow light>Available worldwide</Eyebrow><h2>Bring every voice<br />to your stage.</h2></div>
        <Link className="round-cta" href="/contact" aria-label="Book Arun Guinness"><span>Book<br />Arun</span><ArrowUpRight /></Link>
      </div>
      <div className="footer-contact">
        <div className="footer-contact-intro"><small>Booking &amp; enquiries</small><strong>Choose your quickest route.</strong></div>
        <a href={`tel:${contact.phone}`}><Phone /><span><small>Call for bookings</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a>
        <a href={`${contact.whatsapp}?text=${encodeURIComponent("Hello Arun, I would like to enquire about booking a show.")}`} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp enquiry</small><strong>Message directly</strong></span><ArrowUpRight /></a>
        <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Booking enquiry for Arun Guinness")}`}><Mail /><span><small>Gmail enquiries</small><strong>{contact.email}</strong></span><ArrowUpRight /></a>
        <a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram /><span><small>Official Instagram</small><strong>@arun_guinness</strong></span><ArrowUpRight /></a>
        <a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube /><span><small>Official YouTube</small><strong>@arunguinnes</strong></span><ArrowUpRight /></a>
        <a className="footer-office" href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin /><span><small>Office / base</small><strong>{contact.office}</strong></span><ArrowUpRight /></a>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><strong>ARUN<br /><i>GUINNESS</i></strong><p>Singer · Voice artist · Mimicry performer · Live entertainer</p></div>
        <div><small>Navigate</small><Link href="/programs">Live shows</Link><Link href="/videos">The voices</Link><Link href="/about">The artist</Link><Link href="/contact">Book Arun</Link></div>
        <div><small>Explore</small><Link href="/gallery">Gallery</Link><Link href="/testimonials">Media proof</Link><a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a></div>
        <div><small>Response</small><p>For dates, fees and production requirements, send event date, city and audience size.</p><Link href="/contact">Start booking enquiry</Link></div>
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Arun Guinness</span><span>Performance claims marked * originate from Arun&apos;s published 2023 profile.</span></div>
    </footer>
  );
}

export function MobileBookingBar() {
  return (
    <div className="mobile-booking" aria-label="Quick booking actions">
      <a href={`tel:${contact.phone}`}><Phone />Call</a>
      <a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message />WhatsApp</a>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="social-buttons">
      <a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram <ArrowUpRight /></a>
      <a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube <ArrowUpRight /></a>
    </div>
  );
}
