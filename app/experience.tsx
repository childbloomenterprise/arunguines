"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "./icons";
import { programs, stagePresets, videos, voiceRoster, type Milestone, type Performance, type ProofItem, type ShowFormat, youtubePosterSources } from "./site-data";
import { recommendShow } from "./site-logic";
import { VideoPlayer } from "./video-player";

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
      <div className="filter-row" role="group" aria-label="Filter performances">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setActiveId((item === "All" ? performances[0] : performances.find((performance) => performance.category === item))?.id ?? ""); }}>{item}</button>)}
      </div>
      {/* Gesture handling supplements the native previous/next buttons below. */}
      <div className="performance-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(activeIndex + 1) / filtered.length})` }} /></div>
      <div className="performance-stage" onTouchStart={(event) => { pointerStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (pointerStart.current === null) return; const delta = event.changedTouches[0].clientX - pointerStart.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); pointerStart.current = null; }}>
        <div className="performance-media" data-depth-media="true">
          <VideoPlayer key={active.id} id={active.id} title={active.title} alt={`${active.title} official performance`} className="deck-player" sizes="(max-width: 900px) 100vw, 62vw" eager={activeIndex === 0} category={active.category} ratio="16:9" poster={active.poster} />
        </div>
        <div key={active.id} className="performance-caption is-changing" aria-live="polite">
          <span>0{activeIndex + 1} / 0{filtered.length}</span><small>{active.category}</small>
          <h3>{active.title}</h3><p>{active.subtitle}</p>
          <div><button type="button" onClick={() => move(-1)} aria-label="Previous performance"><ChevronLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next performance"><ChevronRight /></button></div>
        </div>
      </div>
      <div className="performance-list" aria-label="Choose a performance">
        {filtered.map((item, index) => <button key={item.id} type="button" className={item.id === active.id ? "is-active" : ""} aria-pressed={item.id === active.id} onClick={() => setActiveId(item.id)}><span className="performance-thumb"><Image src={youtubePosterSources(item.id, item.poster)[0]} alt="" fill sizes="96px" /></span><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.category}</small></button>)}
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
  const activePreset = stagePresets.find((preset) => preset.event === event && preset.audience === audience && preset.duration === duration);
  const energy = activePreset?.energy ?? (duration === "over-120" || audience === "1000-plus" ? 92 : duration === "under-30" ? 48 : 72);
  const eventLabel = eventOptions.find(([value]) => value === event)?.[1] ?? event;

  const applyPreset = (preset: (typeof stagePresets)[number]) => {
    setEvent(preset.event);
    setAudience(preset.audience);
    setDuration(preset.duration);
  };

  return (
    <div className="show-builder">
      <form className="show-controls" onSubmit={(event) => event.preventDefault()}>
        <span className="act-label">Live recommendation</span><h3>Shape your stage.</h3>
        <div className="preset-list" role="group" aria-label="Quick stage presets">{stagePresets.map((preset) => <button key={preset.key} type="button" aria-pressed={activePreset?.key === preset.key} onClick={() => applyPreset(preset)}><strong>{preset.label}</strong><small>{preset.description}</small></button>)}</div>
        <label>Event type<select value={event} onChange={(e) => setEvent(e.target.value)}>{eventOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Audience size<select value={audience} onChange={(e) => setAudience(e.target.value)}><option value="under-250">Under 250</option><option value="250-1000">250–1,000</option><option value="1000-plus">1,000+</option></select></label>
        <label>Stage time<select value={duration} onChange={(e) => setDuration(e.target.value)}><option value="under-30">Under 30 minutes</option><option value="60-120">60–120 minutes</option><option value="over-120">Over 2 hours</option></select></label>
        <label>City / country<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Kochi, Muscat, Kuwait..." /></label>
      </form>
      <div className="show-result" aria-live="polite">
        <span>Recommended format</span><small>{recommendation.duration}</small><div key={`${event}-${audience}-${duration}`} className="show-result-copy"><h3>{recommendation.title}</h3><p>{recommendation.description}</p><strong>{recommendation.bestFor}</strong></div>
        <div className="show-shape" aria-label={`Stage energy ${energy} percent`}><div><span>Stage energy</span><strong>{energy}%</strong></div><i><span style={{ transform: `scaleX(${energy / 100})` }} /></i><small>{eventLabel} · {audience === "1000-plus" ? "1,000+ audience" : audience === "under-250" ? "Under 250" : "250–1,000"}</small></div>
        <Link className="button button-brass" href={bookingHref}>Check this format <ArrowUpRight /></Link>
      </div>
      <div className="format-compare">
        {formats.map((format) => {
          const open = openSlug === format.slug;
          const detailsId = `format-${format.slug}`;
          return <article key={format.slug} className={format.slug === recommendation.slug ? "is-recommended" : ""}><button type="button" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpenSlug(open ? "" : format.slug)}><span>{format.number}</span><strong>{format.title}</strong><small>{format.duration}</small><i>{open ? "Close" : "Details"}</i></button>{open ? <div id={detailsId} className="format-details"><p>{format.production}</p><ul>{format.inclusions.map((item) => <li key={item}>{item}</li>)}</ul><Link href={`/book?show=${encodeURIComponent(format.title)}&event=${encodeURIComponent(event)}&location=${encodeURIComponent(location)}`}>Plan this show <ArrowRight /></Link></div> : null}</article>;
        })}
      </div>
    </div>
  );
}

export function InteractiveTimeline({ items }: { items: readonly Milestone[] }) {
  const [active, setActive] = useState(0);
  const controlsRef = useRef<HTMLDivElement>(null);
  const move = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    controlsRef.current?.querySelectorAll("button")[next]?.focus();
  };
  return <div className="interactive-timeline"><div ref={controlsRef} role="group" aria-label="Career timeline">{items.map((item, index) => <button key={item.year} type="button" aria-pressed={active === index} aria-controls="timeline-detail" onClick={() => setActive(index)} onKeyDown={(event) => { if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) { event.preventDefault(); move(index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1)); } }}><span>{item.year}</span><strong>{item.title}</strong></button>)}</div><article key={items[active].year} id="timeline-detail" className="timeline-detail" aria-live="polite"><span>0{active + 1}</span><h3>{items[active].title}</h3><p>{items[active].text}</p><a href={items[active].sourceUrl} target="_blank" rel="noreferrer">{items[active].source} <ArrowUpRight /></a></article></div>;
}

export function VoiceExplorer() {
  const [active, setActive] = useState(0);
  const controlsRef = useRef<HTMLDivElement>(null);
  const voice = voiceRoster[active];
  const performance = videos[active % 4];
  const move = (index: number) => {
    const next = (index + voiceRoster.length) % voiceRoster.length;
    setActive(next);
    controlsRef.current?.querySelectorAll("button")[next]?.focus();
  };

  return <div className="voice-explorer"><div ref={controlsRef} className="voice-selector" role="group" aria-label="Explore voice repertoire">{voiceRoster.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} aria-controls="voice-detail" onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(index + (event.key === "ArrowRight" ? 1 : -1)); } }}><span><Image src={item.photo} alt="" fill sizes="64px" style={{ objectPosition: item.position }} /></span><strong>{item.name}</strong><small>{item.register}</small></button>)}</div><article key={voice.name} id="voice-detail" className="voice-detail" aria-live="polite"><div><span>Voice reference · {String(active + 1).padStart(2, "0")}</span><h3>{voice.name}</h3><p>{voice.register} · {voice.language}</p><a href={voice.source} target="_blank" rel="noreferrer">Portrait source <ArrowUpRight /></a></div><VideoPlayer id={performance.id} title={performance.title} alt={`${performance.title} official performance`} className="voice-player" sizes="(max-width: 900px) calc(100vw - 40px), 48vw" category={performance.category} ratio="16:9" poster={performance.poster} /></article></div>;
}

export function EvidenceDeck({ items }: { items: readonly ProofItem[] }) {
  const [open, setOpen] = useState(0);
  return <div className="evidence-deck">{items.map((item, index) => { const panelId = `evidence-${index}`; return <article key={item.title} className={open === index ? "is-open" : ""}><button type="button" aria-expanded={open === index} aria-controls={panelId} onClick={() => setOpen(index)}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.label}</small><ChevronRight /></button>{open === index ? <div id={panelId}><p>{item.text}</p><a href={item.href} target="_blank" rel="noreferrer">Open verified source <ArrowUpRight /></a></div> : null}</article>; })}</div>;
}
