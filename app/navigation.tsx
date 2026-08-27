"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Close, Menu, Replay, VoiceMark } from "./icons";
import { navItems } from "./site-data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
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
    </header>
  );
}
