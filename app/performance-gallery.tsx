"use client";

import { useState } from "react";
import type { Performance } from "./site-data";
import { VideoPlayer } from "./video-player";

export function PerformanceGallery({ performances }: { performances: readonly Performance[] }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(performances.map((item) => item.category))];
  const filtered = performances.filter((item) => category === "All" || category === item.category);
  return <div className="performance-gallery"><div className="filter-row" role="group" aria-label="Filter performances">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="gallery-count" role="status">{filtered.length} {filtered.length === 1 ? "performance" : "performances"}</p><div className="performance-grid">{filtered.map((item, index) => <article key={item.id} className="performance-tile"><VideoPlayer id={item.id} title={item.title} alt={item.title + " by Arun Guinness"} sizes="(max-width: 699px) calc(100vw - 40px), 390px" ratio="16:9" poster={item.poster} eager={index === 0} /><div><span>{item.category}</span><h2>{item.title}</h2><p>{item.subtitle}</p></div></article>)}</div></div>;
}
