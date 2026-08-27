"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Close, Replay } from "./icons";
import { programs, type Milestone, type Performance, type ProofItem, type ShowFormat } from "./site-data";
import { recommendShow } from "./site-logic";
import { VideoPlayer } from "./video-player";

const INTRO_KEY = "arun-curtain-intro-v1";

export function StageIntro() {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const play = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setVisible(true);
    setPlaying(false);
    window.requestAnimationFrame(() => setPlaying(true));
    closeTimer.current = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(INTRO_KEY, "seen");
    }, 980);
  }, []);

  const skip = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setVisible(false);
    sessionStorage.setItem(INTRO_KEY, "seen");
  }, []);

  useEffect(() => {
    const opening = window.setTimeout(() => {
      if (sessionStorage.getItem(INTRO_KEY) === "seen") return;
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const allowAutomaticIntro = window.innerWidth >= 700
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        && !connection?.saveData;
      if (allowAutomaticIntro) play();
      else sessionStorage.setItem(INTRO_KEY, "seen");
    }, 0);
    const replay = () => play();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") skip(); };
    window.addEventListener("arun:replay-intro", replay);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("arun:replay-intro", replay);
      window.removeEventListener("keydown", escape);
      window.clearTimeout(opening);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, [play, skip]);

  if (!visible) return null;
  return (
    <div className={`stage-intro ${playing ? "is-playing" : ""}`} role="dialog" aria-label="Opening stage sequence" aria-modal="true">
      <div className="intro-light" aria-hidden="true" />
      <div className="intro-panel intro-panel-left" aria-hidden="true" />
      <div className="intro-panel intro-panel-right" aria-hidden="true" />
      <div className="intro-title"><span>Now presenting</span><strong>Arun<br /><i>Guinness</i></strong><small>One man · Many voices</small></div>
      <button type="button" className="intro-skip" onClick={(event) => { event.stopPropagation(); skip(); }}>Skip intro <Close /></button>
    </div>
  );
}

export function ReplayIntroButton() {
  return <button type="button" className="replay-intro" onClick={() => window.dispatchEvent(new Event("arun:replay-intro"))}><Replay />Replay opening</button>;
}

export function PerformanceDeck({ performances, compact = false }: { performances: readonly Performance[]; compact?: boolean }) {
  const categories = ["All", ...Array.from(new Set(performances.map((item) => item.category)))] as const;
  const [category, setCategory] = useState<string>("All");
  const filtered = useMemo(() => category === "All" ? performances : performances.filter((item) => item.category === category), [category, performances]);
  const [activeId, setActiveId] = useState(performances[0]?.id ?? "");
  const activeIndex = Math.max(0, filtered.findIndex((item) => item.id === activeId));
  const active = filtered[activeIndex] ?? filtered[0];
  const pointerStart = useRef<number | null>(null);

  if (!active) return null;
  const move = (direction: number) => setActiveId(filtered[(activeIndex + direction + filtered.length) % filtered.length].id);

  return (
    <div className={`performance-deck ${compact ? "is-compact" : ""}`}>
      <div className="filter-row" role="tablist" aria-label="Filter performances">
        {categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => { setCategory(item); setActiveId((item === "All" ? performances[0] : performances.find((performance) => performance.category === item))?.id ?? ""); }}>{item}</button>)}
      </div>
      {/* Gesture handling supplements the native previous/next buttons below. */}
      <div className="performance-stage" onTouchStart={(event) => { pointerStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (pointerStart.current === null) return; const delta = event.changedTouches[0].clientX - pointerStart.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); pointerStart.current = null; }}>
        <div className="performance-media">
          <VideoPlayer key={active.id} id={active.id} title={active.title} alt={`${active.title} official performance`} className="deck-player" sizes="(max-width: 900px) 100vw, 62vw" eager={activeIndex === 0} category={active.category} variant="gallery" />
        </div>
        <div className="performance-caption" aria-live="polite">
          <span>0{activeIndex + 1} / 0{filtered.length}</span><small>{active.category}</small>
          <h3>{active.title}</h3><p>{active.subtitle}</p>
          <div><button type="button" onClick={() => move(-1)} aria-label="Previous performance"><ChevronLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next performance"><ChevronRight /></button></div>
        </div>
      </div>
      <div className="performance-list" aria-label="Choose a performance">
        {filtered.map((item, index) => <button key={item.id} type="button" className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.category}</small></button>)}
      </div>
    </div>
  );
}

const eventOptions = [
  ["association", "Association / cultural"], ["corporate", "Corporate"], ["campus", "Campus / school"], ["public-festival", "Public festival"], ["inauguration", "Inauguration"], ["awards", "Awards / special event"],
] as const;

export function ShowBuilder({ formats = programs }: { formats?: readonly ShowFormat[] }) {
  const [event, setEvent] = useState("association");
  const [audience, setAudience] = useState("250-1000");
  const [duration, setDuration] = useState("60-120");
  const [location, setLocation] = useState("");
  const [openSlug, setOpenSlug] = useState<string>("");
  const recommendation = recommendShow(formats, { event, audience, duration });
  const bookingHref = `/book?show=${encodeURIComponent(recommendation.title)}&event=${encodeURIComponent(event)}&location=${encodeURIComponent(location)}`;

  return (
    <div className="show-builder">
      <form className="show-controls" onSubmit={(event) => event.preventDefault()}>
        <span className="act-label">Live recommendation</span><h3>Shape your stage.</h3>
        <label>Event type<select value={event} onChange={(e) => setEvent(e.target.value)}>{eventOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Audience size<select value={audience} onChange={(e) => setAudience(e.target.value)}><option value="under-250">Under 250</option><option value="250-1000">250–1,000</option><option value="1000-plus">1,000+</option></select></label>
        <label>Stage time<select value={duration} onChange={(e) => setDuration(e.target.value)}><option value="under-30">Under 30 minutes</option><option value="60-120">60–120 minutes</option><option value="over-120">Over 2 hours</option></select></label>
        <label>City / country<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Kochi, Muscat, Kuwait..." /></label>
      </form>
      <div className="show-result" aria-live="polite">
        <span>Recommended format</span><small>{recommendation.duration}</small><h3>{recommendation.title}</h3><p>{recommendation.description}</p><strong>{recommendation.bestFor}</strong>
        <Link className="button button-brass" href={bookingHref}>Check this format <ArrowUpRight /></Link>
      </div>
      <div className="format-compare">
        {formats.map((format) => {
          const open = openSlug === format.slug;
          return <article key={format.slug} className={format.slug === recommendation.slug ? "is-recommended" : ""}><button type="button" aria-expanded={open} onClick={() => setOpenSlug(open ? "" : format.slug)}><span>{format.number}</span><strong>{format.title}</strong><small>{format.duration}</small><i>{open ? "Close" : "Details"}</i></button>{open ? <div className="format-details"><p>{format.production}</p><ul>{format.inclusions.map((item) => <li key={item}>{item}</li>)}</ul><Link href={`/book?show=${encodeURIComponent(format.title)}`}>Plan this show <ArrowRight /></Link></div> : null}</article>;
        })}
      </div>
    </div>
  );
}

export function InteractiveTimeline({ items }: { items: readonly Milestone[] }) {
  const [active, setActive] = useState(0);
  return <div className="interactive-timeline"><div role="tablist" aria-label="Career timeline">{items.map((item, index) => <button key={item.year} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{item.year}</span><strong>{item.title}</strong></button>)}</div><article aria-live="polite"><span>0{active + 1}</span><h3>{items[active].title}</h3><p>{items[active].text}</p>{items[active].source ? <small>{items[active].source}</small> : null}</article></div>;
}

export function EvidenceDeck({ items }: { items: readonly ProofItem[] }) {
  const [open, setOpen] = useState(0);
  return <div className="evidence-deck">{items.map((item, index) => <article key={item.title} className={open === index ? "is-open" : ""}><button type="button" aria-expanded={open === index} onClick={() => setOpen(index)}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.label}</small><ChevronRight /></button>{open === index ? <div><p>{item.text}</p><a href={item.href} target="_blank" rel="noreferrer">Open verified source <ArrowUpRight /></a></div> : null}</article>)}</div>;
}
