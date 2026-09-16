"use client";

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Plus, Whatsapp } from "./icons";
import { contact } from "./site-data";

const socialLinks = [
  { label: "WhatsApp", href: contact.whatsapp, icon: Whatsapp, className: "is-whatsapp" },
  { label: "Instagram", href: contact.instagram, icon: Instagram, className: "is-instagram" },
  { label: "Facebook", href: contact.facebook, icon: Facebook, className: "is-facebook" },
] as const;

export function SocialDock() {
  const [open, setOpen] = useState(false);
  const dockRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  return <aside ref={dockRef} className={`social-dock ${open ? "is-open" : ""}`} aria-label="Connect with Arun Guinness">
    <div id="social-dock-links" className="social-dock-links" hidden={!open}>
      {socialLinks.map(({ label, href, icon: Icon, className }, index) => <a key={label} className={className} href={href} target="_blank" rel="noreferrer" aria-label={`${label} — Arun Guinness`} style={{ "--social-index": index } as React.CSSProperties}><span>{label}</span><i aria-hidden="true"><Icon /></i></a>)}
    </div>
    <button ref={toggleRef} className="social-dock-toggle" type="button" aria-label={open ? "Close social links" : "Open social links"} aria-expanded={open} aria-controls="social-dock-links" onClick={() => setOpen((value) => !value)}><Plus /></button>
  </aside>;
}
