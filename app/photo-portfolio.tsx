"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "./icons";
import { stagePortfolio } from "./site-data";

export function PhotoPortfolio({ label = "Arun Guinness stage and event portfolio" }: { label?: string }) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.78), behavior: "smooth" });
  };

  return <div className="photo-portfolio">
    <div className="photo-portfolio-toolbar">
      <p><strong>{stagePortfolio.length} moments</strong><span>Swipe, drag or use the arrows</span></p>
      <div aria-label="Photo gallery controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous photos"><ArrowRight /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next photos"><ArrowRight /></button>
      </div>
    </div>
    <div className="photo-portfolio-rail" ref={railRef} role="region" aria-label={label}>
      {stagePortfolio.map((photo, index) => <figure className={`photo-card is-${photo.orientation}`} key={photo.src}>
        <div className="photo-card-media" style={{ "--photo-position": photo.focalPoint ?? "50% 50%" } as React.CSSProperties}>
          <Image src={photo.src} alt={photo.alt} fill sizes={photo.orientation === "portrait" ? "(max-width: 699px) 76vw, 360px" : "(max-width: 699px) 86vw, (max-width: 1199px) 62vw, 620px"} />
          <span>{photo.category}</span>
        </div>
        <figcaption><small>{String(index + 1).padStart(2, "0")}</small><p>{photo.caption}</p></figcaption>
      </figure>)}
    </div>
  </div>;
}
