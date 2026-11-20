"use client";

import { useEffect, useRef, useState } from "react";

export function BandRhythm() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="band-rhythm" data-active={visible && !paused}>
    <div className="band-equalizer" aria-hidden="true">{Array.from({ length: 15 }, (_, index) => <i key={index} style={{ "--beat": `${index * -0.17}s`, "--level": `${25 + (index * 23) % 70}%` } as React.CSSProperties} />)}</div>
    <button className="band-animation-toggle" type="button" aria-pressed={paused} aria-label="Pause band animations" onClick={() => setPaused((value) => !value)}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7Z" /> : <><path d="M8 5v14" /><path d="M16 5v14" /></>}</svg>
      <span>{paused ? "Resume motion" : "Pause motion"}</span>
    </button>
  </div>;
}
