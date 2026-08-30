"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Close, Menu, Replay, VoiceMark } from "./icons";
import { navItems } from "./site-data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const background = Array.from(document.querySelectorAll<HTMLElement>(".skip-link,main,.site-footer,.mobile-booking"));
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
      <Link href="/" className="brand" aria-label="Arun Guinness home">
        <span className="brand-disc"><VoiceMark /></span>
        <span className="brand-copy"><strong>Arun Guinness</strong><small>One man · Many voices</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <button className="header-replay" type="button" aria-label="Replay stage opening" onClick={() => window.dispatchEvent(new Event("arun:replay-intro"))}><Replay /></button>
      <Link href="/book" className="header-book">Book Arun <ArrowUpRight /></Link>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <Close /> : <Menu />}
      </button>
      <div ref={menuRef} id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
        <p>Music · mimicry · character · live entertainment</p>
      </div>
    </header>
  );
}
