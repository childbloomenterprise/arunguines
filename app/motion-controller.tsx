"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionController() {
  const pathname = usePathname();

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
    }, { rootMargin: "0px 0px 12%", threshold: 0.05 });

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

    const hero = document.querySelector<HTMLElement>(".home-hero");
    let pointerFrame = 0;
    const updatePointer = (event: PointerEvent) => {
      if (!hero || event.pointerType === "touch" || pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        hero.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
        pointerFrame = 0;
      });
    };
    hero?.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      hero?.removeEventListener("pointermove", updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.style.removeProperty("--page-progress");
      root.classList.remove("motion-ready", "has-scrolled");
    };
  }, [pathname]);

  return null;
}
