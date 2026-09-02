"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
    const depthCleanups: Array<() => void> = [];

    if (!reduced && finePointer) {
      document.querySelectorAll<HTMLElement>("[data-depth-media]").forEach((item) => {
        const move = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
          const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
          item.style.setProperty("--depth-x", x.toFixed(3));
          item.style.setProperty("--depth-y", y.toFixed(3));
        };
        const reset = () => {
          item.style.setProperty("--depth-x", "0");
          item.style.setProperty("--depth-y", "0");
        };
        item.addEventListener("pointermove", move, { passive: true });
        item.addEventListener("pointerleave", reset);
        depthCleanups.push(() => {
          item.removeEventListener("pointermove", move);
          item.removeEventListener("pointerleave", reset);
        });
      });
    }
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        root.classList.toggle("has-scrolled", y > 24);
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        root.style.setProperty("--scroll-progress", Math.min(1, y / scrollable).toFixed(4));
        root.classList.toggle("past-hero", Boolean(hero && hero.getBoundingClientRect().bottom < window.innerHeight * .72));
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

    return () => {
      observer?.disconnect();
      depthCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready", "has-scrolled", "past-hero", "scrolling-down", "near-booking");
      root.style.removeProperty("--scroll-progress");
    };
  }, [pathname]);

  return null;
}
