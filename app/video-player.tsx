"use client";

import Image from "next/image";
import { useState } from "react";
import { Close, Play } from "./icons";
import { youtubeThumbnail } from "./site-data";

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

  if (playing) {
    return (
      <div className={`embedded-video embedded-video-${variant} is-playing ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <button className="video-close" type="button" onClick={() => setPlaying(false)} aria-label={`Close ${title}`}>
          <Close />
        </button>
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
      <Image
        src={youtubeThumbnail(id)}
        alt={alt}
        fill
        preload={eager}
        sizes={sizes}
      />
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
