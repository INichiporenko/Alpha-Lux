"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.setProperty("--progress", String(p));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="scroll-progress" className="progress-bar" />;
}

function jumpTop() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previous;
}

export function ScrollToTop() {
  const pathname = usePathname();
  const reloadHandled = useRef(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload" && !reloadHandled.current;

    if (isReload) {
      reloadHandled.current = true;
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      jumpTop();
      return;
    }

    if (sessionStorage.getItem("alphalux-contact") === "1") return;

    if (!window.location.hash) {
      jumpTop();
    }
  }, [pathname]);

  return null;
}
