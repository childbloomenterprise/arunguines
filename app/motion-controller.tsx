"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        root.classList.toggle("has-scrolled", window.scrollY > 24);
        root.style.setProperty("--page-progress", String(Math.min(window.scrollY / scrollable, 1)));
        frame = 0;
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty("--page-progress");
      root.classList.remove("motion-ready", "has-scrolled");
    };
  }, []);

  return null;
}
