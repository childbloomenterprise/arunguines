"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Close, Menu, Replay, VoiceMark } from "./icons";
import { navItems } from "./site-data";

const homeSections = [
  { id: "home", label: "Intro", number: "01" },
  { id: "act-two", label: "Watch", number: "02" },
  { id: "build-show", label: "Build", number: "03" },
  { id: "act-four", label: "Journey", number: "04" },
  { id: "book-home", label: "Book", number: "05" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = homeSections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const current = visible.at(-1)?.target.id;
      if (current) setActiveSection(current);
    }, { rootMargin: "-26% 0px -62%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className={`site-header ${pathname === "/" ? "has-section-nav" : ""}`} style={{ viewTransitionName: "site-header" }}>
      <Link href="/" className="brand" aria-label="Arun Guinness home">
        <span className="brand-disc"><VoiceMark /></span>
        <span className="brand-copy"><strong>Arun Guinness</strong><small>One man · Many voices</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <button className="header-replay" type="button" aria-label="Replay stage opening" onClick={() => window.dispatchEvent(new Event("arun:replay-intro"))}><Replay /></button>
      <Link href="/book" className="header-book">Book Arun <ArrowUpRight /></Link>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <Close /> : <Menu />}
      </button>
      <div id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
        <p>Music · mimicry · character · live entertainment</p>
      </div>
      {pathname === "/" ? (
        <nav className="mobile-section-nav" aria-label="Homepage sections">
          {homeSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? "location" : undefined}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.number}</span>{section.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
