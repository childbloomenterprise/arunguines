"use client";

import { useEffect, useRef, useState } from "react";

const places = [
  { id: "kerala", name: "Kerala", label: "Home stage", detail: "Where the voice began." },
  { id: "kuwait", name: "Kuwait", label: "Live archive", detail: "Festival stages across the Gulf." },
  { id: "uae", name: "UAE", label: "Live archive", detail: "International audiences, same live energy." },
  { id: "oman", name: "Oman", label: "Live archive", detail: "A documented cross-border stage." },
] as const;

export function PerformanceMap() {
  const [activeId, setActiveId] = useState<(typeof places)[number]["id"]>("kerala");
  const mapRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const active = places.find((place) => place.id === activeId) ?? places[0];

  useEffect(() => () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
  }, []);

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      const map = mapRef.current;
      if (!map) {
        frame.current = 0;
        return;
      }
      const bounds = map.getBoundingClientRect();
      map.style.setProperty("--map-x", `${event.clientX - bounds.left}px`);
      map.style.setProperty("--map-y", `${event.clientY - bounds.top}px`);
      frame.current = 0;
    });
  };

  return (
    <div ref={mapRef} className="performance-map" data-reveal onPointerMove={updatePointer}>
      <div className="map-grid" aria-hidden="true" />
      <div className="map-glow" aria-hidden="true" />
      <svg className="map-route" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <path className="map-route-shadow" d="M150 375C270 120 600 70 830 230C980 340 850 500 650 510C430 525 245 465 150 375Z" />
        <path className="map-route-line" d="M150 375C270 120 600 70 830 230C980 340 850 500 650 510C430 525 245 465 150 375Z" />
      </svg>
      <span className="map-status"><i aria-hidden="true" />Live footprint</span>
      <div className="map-points" role="group" aria-label="Documented performance regions">
        {places.map((place) => (
          <button
            key={place.id}
            type="button"
            className={`map-point ${place.id}`}
            aria-pressed={activeId === place.id}
            onClick={() => setActiveId(place.id)}
            onFocus={() => setActiveId(place.id)}
            onPointerEnter={() => setActiveId(place.id)}
          >
            <i aria-hidden="true"><span /></i>
            <strong>{place.name}</strong>
            <small>{place.label}</small>
          </button>
        ))}
      </div>
      <div className="map-caption" aria-live="polite">
        <span>Documented reach · {String(places.indexOf(active) + 1).padStart(2, "0")}</span>
        <strong>{active.name}</strong>
        <p>{active.detail}</p>
        <small>Regions shown—not flight paths.</small>
      </div>
    </div>
  );
}
