"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "./icons";
import { stagePortfolio, type PortfolioPhoto } from "./site-data";

const portfolioCollections = ["School Programs", "Stage Shows", "Inaugurations", "Invitations & Honours"] as const;
const collections = ["All", ...portfolioCollections] as const;
type Collection = (typeof collections)[number];
type PortfolioCollection = (typeof portfolioCollections)[number];

const collectionDetails: Record<PortfolioCollection, { description: string; examples: string }> = {
  "School Programs": {
    description: "Performances shaped for students, staff and families—with the audience becoming part of the show.",
    examples: "Annual days · arts festivals · student celebrations · campus honours",
  },
  "Stage Shows": {
    description: "Arun in performance, from close-room voice craft to festival and international stages.",
    examples: "One-man shows · cultural festivals · community stages · overseas events",
  },
  Inaugurations: {
    description: "Ceremonial openings where Arun joins hosts and invited guests before the programme begins.",
    examples: "Lamp lighting · annual-day openings · Onam inaugurations · institutional launches",
  },
  "Invitations & Honours": {
    description: "Invited appearances, guest moments and presentations that sit around the performance itself.",
    examples: "Chief-guest appearances · prize distributions · commemorative gifts · recognition",
  },
};

const orderedPhotos = portfolioCollections.flatMap((name) => stagePortfolio.filter((photo) => photo.collection === name));

export function PhotoPortfolio({ label = "Arun Guinness stage and event portfolio" }: { label?: string }) {
  const [collection, setCollection] = useState<Collection>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const photos = collection === "All" ? orderedPhotos : orderedPhotos.filter((photo) => photo.collection === collection);
  const visibleCollections: readonly PortfolioCollection[] = collection === "All" ? portfolioCollections : [collection];
  const photoGroups = visibleCollections.map((name) => ({ name, photos: photos.filter((photo) => photo.collection === name) }));
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
    <div className="photo-portfolio-groups">
      {photoGroups.map((group, groupIndex) => {
        const headingId = `portfolio-${group.name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
        const detail = collectionDetails[group.name];
        return <section className="photo-portfolio-group" aria-labelledby={headingId} key={group.name}>
          <div className="photo-portfolio-group-heading">
            <span>{String(groupIndex + 1).padStart(2, "0")}</span>
            <div><h3 id={headingId}>{group.name}</h3><p>{detail.description}</p><small>{detail.examples}</small></div>
            <strong>{group.photos.length} photographs</strong>
          </div>
          <div className="photo-portfolio-grid">
            {group.photos.map((photo, groupPhotoIndex) => {
              const photoIndex = photos.findIndex((item) => item.src === photo.src);
              return <figure className={`photo-card ${groupPhotoIndex === 0 ? "is-featured" : ""}`} key={photo.src}>
                <button className="photo-card-media" type="button" onClick={(event) => openPhoto(photoIndex, event.currentTarget)} aria-label={`View complete photograph: ${photo.alt}`}>
                  <Image src={photo.src} alt="" fill priority={photoIndex === 0} sizes={groupPhotoIndex === 0 ? "(max-width: 699px) calc(100vw - 40px), (max-width: 1199px) 65vw, 820px" : "(max-width: 699px) calc(100vw - 40px), (max-width: 1199px) 45vw, 390px"} style={{ objectPosition: photo.focalPoint ?? "50% 50%" }} />
                  <span>{photo.collection}</span>
                  <span className="photo-open" aria-hidden="true"><ArrowRight /></span>
                </button>
                <figcaption><small>{String(groupPhotoIndex + 1).padStart(2, "0")}</small><p>{photo.caption}</p></figcaption>
              </figure>;
            })}
          </div>
        </section>;
      })}
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
