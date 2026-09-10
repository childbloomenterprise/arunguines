"use client";

import { useEffect, useState } from "react";

/** Decorative lighting only: content and booking never depend on animation. */
export function StageAtmosphere() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(preference.matches);
      document.documentElement.dataset.stageMotion = paused || preference.matches || document.hidden ? "paused" : "running";
    };
    update();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      delete document.documentElement.dataset.stageMotion;
    };
  }, [paused]);

  return <>
    <div className="stage-atmosphere" aria-hidden="true">
      <div className="stage-beam stage-beam-amber" />
      <div className="stage-beam stage-beam-violet" />
      <div className="stage-haze" />
      <div className="stage-dust" />
      <div className="stage-orbit stage-orbit-one" />
      <div className="stage-orbit stage-orbit-two" />
    </div>
    <div className="stage-controls">
      <button type="button" className="stage-motion-toggle" aria-label={reduced ? "Stage lighting motion disabled by system preference" : paused ? "Resume stage lighting" : "Pause stage lighting"} aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused((value) => !value)}>
        <span className="light-meter" aria-hidden="true"><i /><i /><i /></span>
        <span>{reduced ? "Motion off" : paused ? "Lights paused" : "Pause lights"}</span>
      </button>
    </div>
  </>;
}
