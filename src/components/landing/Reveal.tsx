"use client";

import { useEffect } from "react";

/**
 * .reveal 요소가 화면에 들어오면 한 번 올라오게 한다.
 * 스크립트가 없거나 움직임 줄이기를 켠 경우엔 처음부터 그대로 보인다.
 */
export function Reveal() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const vh = window.innerHeight;
    // 이미 화면 안이거나 지나간 요소는 숨기지 않는다
    for (const el of els) if (el.getBoundingClientRect().top > vh) el.dataset.hidden = "";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          delete (e.target as HTMLElement).dataset.hidden;
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
