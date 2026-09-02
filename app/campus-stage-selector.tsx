"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";
import { VideoPlayer } from "./video-player";

type CampusStageMode = "school" | "college";

const stageModes = {
  school: {
    label: "School stage",
    eyebrow: "Annual day ready",
    title: "Warm, surprising and student-friendly.",
    description: "A clean, audience-aware performance that fits annual days, arts festivals, inaugurations and family-facing programmes.",
    show: "Guest Performance",
    event: "School annual day",
    video: { id: "P22go-G5Xnc", title: "Arun Guinness at Mary Mount Public School", caption: "Mary Mount Public School · Annual Day 2024", badge: "Verified school stage" },
    formats: [
      ["20–30 min", "Chief-guest moment", "Opening interaction and signature voice set"],
      ["45–60 min", "Annual-day feature", "Music, mimicry and clean audience participation"],
      ["90 min", "One-man headline", "Complete staged show with adaptable language mix"],
    ],
  },
  college: {
    label: "College stage",
    eyebrow: "Festival energy",
    title: "Fast, musical and built for a live crowd.",
    description: "A higher-energy format for college fests, cultural nights, youth festivals and campus inaugurations.",
    show: "Variety Musical",
    event: "College fest",
    video: { id: "e66PF3ImXIQ", title: "Two voices. One performer.", caption: "Official signature performance", badge: "Campus-ready signature" },
    formats: [
      ["30 min", "Festival feature", "Signature transformations inside a larger programme"],
      ["60–90 min", "Variety musical", "Live music, mimicry and crowd-aware pacing"],
      ["2+ hours", "Expanded production", "Band-backed scale for headline campus nights"],
    ],
  },
} as const;

export function CampusStageSelector() {
  const [mode, setMode] = useState<CampusStageMode>("school");
  const stage = stageModes[mode];
  const bookingHref = `/book?show=${encodeURIComponent(stage.show)}&event=${encodeURIComponent(stage.event)}`;

  return <div className="campus-stage-selector">
    <div className="campus-mode-controls" role="group" aria-label="Choose institution stage type">
      {(Object.keys(stageModes) as CampusStageMode[]).map((key) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)}><span>{key === "school" ? "01" : "02"}</span><strong>{stageModes[key].label}</strong><small>{key === "school" ? "Annual days + arts events" : "Fests + cultural nights"}</small></button>)}
    </div>
    <article key={mode} className="campus-mode-stage" aria-live="polite">
      <div className="campus-mode-copy"><span>{stage.eyebrow}</span><h3>{stage.title}</h3><p>{stage.description}</p><div className="campus-mode-formats">{stage.formats.map(([time, title, text], index) => <div key={title}><span>0{index + 1} · {time}</span><strong>{title}</strong><small>{text}</small></div>)}</div><Link className="button button-brass" href={bookingHref}>Plan this stage <ArrowUpRight /></Link></div>
      <div className="campus-mode-media" data-depth-media="true"><VideoPlayer id={stage.video.id} title={stage.video.title} alt={`${stage.video.title} official performance`} className="campus-mode-player" sizes="(max-width: 900px) calc(100vw - 40px), 48vw" badge={stage.video.badge} caption={stage.video.caption} ratio="16:9" /><Link href={bookingHref}>Open prefilled enquiry <ArrowRight /></Link></div>
    </article>
  </div>;
}
