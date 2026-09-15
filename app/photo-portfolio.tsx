"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "./icons";
import { stagePortfolio, type PortfolioPhoto } from "./site-data";

const collections = ["All", "Stage", "Campus", "Occasions", "Portraits"] as const;
type Collection = (typeof collections)[number];

const orderedPhotos = [
  ...stagePortfolio.filter((photo) => photo.sourcePage === 94),
  ...stagePortfolio.filter((photo) => photo.sourcePage !== 94),
];

export function PhotoPortfolio({ label = "Arun Guinness stage and event portfolio" }: { label?: string }) {
  const [collection, setCollection] = useState<Collection>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const photos = collection === "All" ? orderedPhotos : orderedPhotos.filter((photo) => photo.collection === collection);
  const selected = selectedIndex === null ? null : photos[selectedIndex];
  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("media-viewer-open");
    dialog?.showModal();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((index) => index === null ? null : (index + 1) % photos.length);
      }
    };
    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("media-viewer-open");
      requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
    };
  }, [isOpen, photos.length]);

  const openPhoto = (index: number, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelectedIndex(index);
  };

  const chooseCollection = (next: Collection) => {
    setSelectedIndex(null);
    setCollection(next);
  };

  return <div className="portfolio-gallery" aria-label={label}>
    <div className="photo-portfolio-toolbar">
      <div><p><strong>{stagePortfolio.length} photographs</strong> · {photos.length} in view</p><small>Choose a frame to see the complete photograph.</small></div>
      <div className="portfolio-filters" role="group" aria-label="Filter portfolio photographs">
        {collections.map((item) => <button key={item} type="button" aria-pressed={collection === item} onClick={() => chooseCollection(item)}>{item}</button>)}
      </div>
    </div>
    <p className="sr-only" role="status">{photos.length} photographs in {collection === "All" ? "the portfolio" : collection}</p>
    <div className="photo-portfolio-grid">
      {photos.map((photo, index) => <figure className={`photo-card ${index === 0 ? "is-featured" : ""}`} key={photo.src}>
        <button className="photo-card-media" type="button" onClick={(event) => openPhoto(index, event.currentTarget)} aria-label={`View complete photograph: ${photo.alt}`}>
          <Image src={photo.src} alt="" fill sizes={index === 0 ? "(max-width: 699px) calc(100vw - 40px), (max-width: 1199px) 65vw, 820px" : "(max-width: 699px) calc(100vw - 40px), (max-width: 1199px) 45vw, 390px"} style={{ objectPosition: photo.focalPoint ?? "50% 50%" }} />
          <span>{photo.collection}</span>
          <span className="photo-open" aria-hidden="true"><ArrowRight /></span>
        </button>
        <figcaption><small>{String(index + 1).padStart(2, "0")}</small><p>{photo.caption}</p></figcaption>
      </figure>)}
    </div>
    {selected && createPortal(<PhotoViewer
      dialogRef={dialogRef}
      photo={selected}
      index={selectedIndex!}
      total={photos.length}
      onClose={() => setSelectedIndex(null)}
      onMove={(direction) => setSelectedIndex((index) => index === null ? null : (index + direction + photos.length) % photos.length)}
    />, document.body)}
  </div>;
}

function PhotoViewer({ dialogRef, photo, index, total, onClose, onMove }: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  photo: PortfolioPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return <dialog ref={dialogRef} className="photo-viewer" aria-label="Portfolio photograph" onCancel={onClose} onClose={onClose}>
    <div className="photo-viewer-shell">
      <div className="photo-viewer-top"><span>Arun Guinness · {photo.collection}</span><button type="button" onClick={onClose} aria-label="Close photograph"><Close /></button></div>
      <div className="photo-viewer-stage">
        <button type="button" onClick={() => onMove(-1)} aria-label="Previous photos"><ArrowRight /></button>
        <div className="photo-viewer-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 699px) 96vw, 84vw" /></div>
        <button type="button" onClick={() => onMove(1)} aria-label="Next photos"><ArrowRight /></button>
      </div>
      <div className="photo-viewer-caption"><p>{photo.caption}</p><span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span></div>
    </div>
  </dialog>;
}
