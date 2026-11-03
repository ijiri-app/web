"use client";

import { useEffect, useRef } from "react";
import { LOGO_PATH } from "@/lib/brand";
import { INTRO_KEY } from "@/lib/intro";

/*
 * 첫 진입 로고 모션 (ijiri_logo.mp4 재현)
 * 0.0s 흰 바탕에 검은 로고
 * 0.2~1.1s 빛이 왼쪽에서 오른쪽으로 지나가며 로고가 파랗게 물듦
 * 1.1~1.45s 살짝 커졌다 돌아옴
 * 1.5s 바탕이 파랑, 로고가 흰색으로 바뀜
 * 그다음 로고가 헤더 자리로 날아가고 막이 걷힘
 *
 * 세션당 한 번. 켤지 말지는 src/lib/intro.ts의 스크립트가 첫 그리기 전에 정한다. 스크립트가 없으면 나오지 않는다.
 */

const VB = { x: 19, y: 48, w: 90, h: 30 };
/** 빛 띠의 폭(로고 좌표). 영상에서 로고 폭의 절반쯤 */
const BAND = 46;
/** 빛 띠가 글자 기울기를 따라 눕는 각도 */
const TILT = (12 * Math.PI) / 180;

/** 빛 띠 색: 지나간 쪽(왼쪽) 파랑 → 밝은 하늘색 → 아직 안 지나간 쪽(오른쪽) 검정. 영상 프레임에서 뽑은 값 */
const START = VB.x - 8;
const END = VB.x + VB.w + BAND + 8;

/** 빛 띠 오른쪽 끝이 s에 있을 때의 그라데이션 좌표 */
function bandAt(s: number) {
  const cy = VB.y + VB.h / 2;
  return { x1: s - BAND * Math.cos(TILT), y1: cy - BAND * Math.sin(TILT), x2: s, y2: cy };
}

const stops = [
  [0, "var(--color-accent)"],
  [0.25, "#5f92fd"],
  [0.45, "#a6d7ff"],
  [0.65, "#6094fc"],
  [0.85, "#2f59cf"],
  [1, "#0a0b10"],
] as const;

export function LogoIntro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.intro) return;
    const el = root.current!;
    const svg = el.querySelector("svg")!;
    const path = el.querySelector("path")!;
    const grad = el.querySelector("linearGradient")!;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      delete html.dataset.intro;
      el.remove();
    };
    // 무슨 일이 있어도 막이 남지 않게
    const safety = window.setTimeout(finish, 6000);

    const setBand = (s: number) => {
      for (const [k, v] of Object.entries(bandAt(s))) grad.setAttribute(k, String(v));
    };

    let tl: { timeScale: (n: number) => unknown; kill: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const band = { s: START };
      const t = gsap.timeline({ onComplete: finish });
      tl = t;

      t.to(band, { s: END, duration: 0.9, ease: "power1.inOut", onUpdate: () => setBand(band.s) }, 0.2)
        .to(svg, { scale: 1.03, duration: 0.25, ease: "sine.out" }, 1.05)
        .to(svg, { scale: 1, duration: 0.2, ease: "sine.in" }, 1.3)
        .add(() => {
          el.style.backgroundColor = "var(--color-accent)";
          path.setAttribute("fill", "#fff");
        }, 1.5)
        .addLabel("fly", 2.1)
        .add(() => {
          // 헤더 로고 자리로. 크기와 위치는 그 순간 화면에서 잰다
          const target = document.querySelector<HTMLElement>("[data-logo]")?.getBoundingClientRect();
          const from = svg.getBoundingClientRect();
          if (!target || !target.width) return;
          gsap.to(svg, {
            x: target.left + target.width / 2 - (from.left + from.width / 2),
            y: target.top + target.height / 2 - (from.top + from.height / 2),
            scale: target.width / from.width,
            duration: 0.65,
            ease: "power3.inOut",
          });
        }, "fly")
        .to(el, { backgroundColor: "rgba(45, 98, 255, 0)", duration: 0.35, ease: "power2.in" }, "fly+=0.35")
        // 헤더 로고와 겹쳐 바꿔 낀다
        .add(() => {
          html.dataset.intro = "2";
        }, "fly+=0.5")
        .to(svg, { opacity: 0, duration: 0.2 }, "fly+=0.55");
    })().catch(finish);

    // 누르거나 키를 치면 빨리 감기
    const skip = () => tl?.timeScale(5);
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      tl?.kill();
    };
  }, []);

  return (
    <div ref={root} aria-hidden data-intro-overlay className="fixed inset-0 z-[100] hidden items-center justify-center bg-white">
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="w-[min(56vw,520px)] overflow-visible will-change-transform">
        <defs>
          <linearGradient id="intro-sweep" gradientUnits="userSpaceOnUse" {...bandAt(START)}>
            {stops.map(([o, c]) => (
              <stop key={o} offset={o} style={{ stopColor: c }} />
            ))}
          </linearGradient>
        </defs>
        <path d={LOGO_PATH} fill="url(#intro-sweep)" />
      </svg>
    </div>
  );
}
