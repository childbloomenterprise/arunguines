"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Close, Play } from "./icons";
import { youtubeThumbnail, youtubeUrl } from "./site-data";

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
  variant?: "hero" | "card" | "gallery" | "portrait";
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
  variant = "card",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
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

  if (playing) {
    return (
      <div className={`embedded-video embedded-video-${variant} is-playing ${className}`}>
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
      className={`embedded-video embedded-video-${variant} ${className}`}
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title} on this page`}
    >
      {thumbnailFailed ? <span className="thumbnail-fallback" role="img" aria-label={alt}><strong>{title}</strong><small>Official performance · poster unavailable</small></span> : <Image src={youtubeThumbnail(id)} alt={alt} fill preload={eager} sizes={sizes} onError={() => setThumbnailFailed(true)} />}
      <span className="video-wash" />
      {badge ? <span className="video-badge">{badge}</span> : null}
      {index ? <span className="video-index">{index}</span> : null}
      {category ? <span className="video-category">{category}</span> : null}
      <span className="video-play"><Play /></span>
      {variant === "hero" ? (
        <>
          <span className="voice-chip chip-one">Male register</span>
          <span className="voice-chip chip-two">Female register</span>
          <span className="watch-here">Plays here · no redirect</span>
        </>
      ) : null}
    </button>
  );
}
