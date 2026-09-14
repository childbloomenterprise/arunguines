"use client";

import Link from "next/link";
import Image from "next/image";
import { BookingLink } from "./booking-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Close, Menu } from "./icons";
import { contact, navItems } from "./site-data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const background = Array.from(document.querySelectorAll<HTMLElement>(".skip-link,main,.site-footer,.mobile-booking,.stage-controls"));
    const returnFocus = toggleRef.current;
    background.forEach((element) => { element.inert = open; });
    if (!open) return () => {
      document.body.classList.remove("menu-open");
      background.forEach((element) => { element.inert = false; });
    };
    const focusables = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []);
    focusables[0]?.focus();
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyboard);
      background.forEach((element) => { element.inert = false; });
      returnFocus?.focus();
    };
  }, [open]);

  return (
    <header className="site-header" style={{ viewTransitionName: "site-header" }}>
      <span className="scroll-progress" aria-hidden="true" />
      <Link href="/" className="brand" aria-label="Arun Guinness home">
        <span className="brand-disc"><Image src="/arun-cartoon-icon.png" alt="" width={48} height={48} loading="eager" /></span>
        <span className="brand-copy"><strong>Arun Guinness</strong><small>Live voice artistry</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <a className="header-call" href={`tel:${contact.phone}`}>Call Arun</a><BookingLink className="header-book" aria-label="Check Availability">Find a date <ArrowUpRight /></BookingLink>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <Close /> : <Menu />}
      </button>
      <div ref={menuRef} id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>Home</Link>
          {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <BookingLink onClick={() => setOpen(false)}>Find a date</BookingLink><a href={`tel:${contact.phone}`} onClick={() => setOpen(false)}>Call Arun</a></nav>
      </div>
    </header>
  );
}
