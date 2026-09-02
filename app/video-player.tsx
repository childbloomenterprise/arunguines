"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Close, Play } from "./icons";
import { type Performance, youtubePosterSources, youtubeUrl } from "./site-data";

type VideoPlayerProps = {
  id: string;
  title: string;
  alt: string;
  className?: string;
  sizes: string;
  eager?: boolean;
  badge?: string;
  category?: string;
  index?: string;
  ratio?: "16:9" | "4:3" | "1:1";
  focalPoint?: string;
  caption?: string;
  tone?: "light" | "dark";
  poster?: Performance["poster"];
};

export function VideoPlayer({
  id,
  title,
  alt,
  className = "",
  sizes,
  eager = false,
  badge,
  category,
  index,
  ratio = "16:9",
  focalPoint = "50% 50%",
  caption,
  tone = "dark",
  poster,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!playing) return;

    const listenForPlayerErrors = (event: MessageEvent) => {
      if (!event.origin.includes("youtube.com") && !event.origin.includes("youtube-nocookie.com")) return;
      try {
        const payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (payload?.event === "onError" && [100, 101, 150].includes(Number(payload.info))) setUnavailable(true);
      } catch {
        // YouTube sends non-JSON player messages alongside API events.
      }
    };
    const connect = () => iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: `video-${id}` }), "*");
    window.addEventListener("message", listenForPlayerErrors);
    const timer = window.setInterval(connect, 500);
    connect();
    return () => {
      window.removeEventListener("message", listenForPlayerErrors);
      window.clearInterval(timer);
    };
  }, [id, playing]);

  const closePlayer = () => {
    setPlaying(false);
    setUnavailable(false);
  };
  const ratioClass = `media-ratio-${ratio.replace(":", "-")}`;
  const mediaStyle = { "--media-position": focalPoint } as CSSProperties;
  const posterSources = youtubePosterSources(id, poster);
  const thumbnailFailed = posterIndex >= posterSources.length;

  if (playing) {
    return (
      <div className={`embedded-video ${ratioClass} tone-${tone} is-playing ${className}`} style={mediaStyle}>
        {unavailable ? (
          <div className="video-fallback" role="status"><span>Playback moved to YouTube</span><strong>This performance cannot play inside this browser.</strong><a href={youtubeUrl(id)} target="_blank" rel="noreferrer">Watch the original <ArrowUpRight /></a></div>
        ) : (
          <iframe
            ref={iframeRef}
            id={`video-${id}`}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setUnavailable(true)}
          />
        )}
        <button className="video-close" type="button" onClick={closePlayer} aria-label={`Close ${title}`}>
          <Close />
        </button>
        {!unavailable ? <a className="video-external" href={youtubeUrl(id)} target="_blank" rel="noreferrer">Open on YouTube <ArrowUpRight /></a> : null}
      </div>
    );
  }

  return (
    <button
      className={`embedded-video ${ratioClass} tone-${tone} ${className}`}
      style={mediaStyle}
      type="button"
      onClick={() => setPlaying(true)}
    >
      <span className="sr-only">Play {title} on this page.</span>
      {thumbnailFailed ? <span className="thumbnail-fallback" role="img" aria-label={alt}><strong>{title}</strong><small>Official performance · poster unavailable</small></span> : <Image src={posterSources[posterIndex]} alt={alt} fill preload={eager} sizes={sizes} onError={() => setPosterIndex((index) => index + 1)} />}
      <span className="video-wash" />
      {badge ? <span className="video-badge">{badge}</span> : null}
      {index ? <span className="video-index">{index}</span> : null}
      {category ? <span className="video-category">{category}</span> : null}
      <span className="video-play"><Play /></span>
      {caption ? <span className="video-caption">{caption}</span> : null}
    </button>
  );
}
