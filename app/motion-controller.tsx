"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;
    if (reduced) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px 12%", threshold: 0.05 });

      document.querySelectorAll("[data-reveal]").forEach((item) => observer?.observe(item));
    }
    let frame = 0;
    let lastY = window.scrollY;
    const bookingSection = document.getElementById("book-home");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const hero = document.querySelector<HTMLElement>(".home-hero,.page-hero");
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const delta = y - lastY;
        root.classList.toggle("has-scrolled", y > 24);
        root.classList.toggle("past-hero", Boolean(hero && hero.getBoundingClientRect().bottom < window.innerHeight * .72));
        root.style.setProperty("--page-progress", String(Math.min(y / scrollable, 1)));
        if (Math.abs(delta) > 6) {
          root.classList.toggle("scrolling-down", delta > 0 && y > 120);
          lastY = y;
        }
        const nearBooking = pathname === "/book"
          || Boolean(bookingSection && bookingSection.getBoundingClientRect().top < window.innerHeight * .84)
          || Boolean(footer && footer.getBoundingClientRect().top < window.innerHeight * .84);
        root.classList.toggle("near-booking", nearBooking);
        frame = 0;
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

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
    if (!reduced) hero?.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateScroll);
      hero?.removeEventListener("pointermove", updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.style.removeProperty("--page-progress");
      root.classList.remove("motion-ready", "has-scrolled", "past-hero", "scrolling-down", "near-booking");
    };
  }, [pathname]);

  return null;
}
