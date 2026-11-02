"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HeroPhoto } from "./HeroPhoto";

const IPhone3D = dynamic(() => import("./IPhone3D"), { ssr: false });
const noop = () => () => {};
const canUseWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
};
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isWide = () => window.matchMedia("(min-width: 1024px)").matches;
const onWide = (cb: () => void) => {
  const m = window.matchMedia("(min-width: 1024px)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export type Step = {
  id: string;
  /** 문단 앞의 굵은 말머리 */
  lead: string;
  body: string;
  screen: React.ReactNode;
  /** 데스크톱 오른쪽 확대 화면: 화면(360×760) 안의 중심점 x, y와 배율 */
  focus: [number, number, number];
};

/** 앱 화면의 한 부분(중심점 x, y)을 키워 칸 폭 전체에 보여 준다. 배율은 최소 z, 칸 폭을 꽉 채울 만큼 */
function ScreenZoom({ focus: [x, y, z], children }: { focus: [number, number, number]; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const k = Math.max(z, w / 360);
  // 화면 가장자리가 칸 안으로 들어오지 않게 중심점을 안쪽으로 당긴다
  const cx = Math.min(Math.max(x, w / k / 2), 360 - w / k / 2);
  return (
    <div ref={box} data-ui className="relative h-[min(460px,46svh)] w-full overflow-hidden rounded-[14px] bg-bg">
      <div inert className="absolute top-1/2 left-1/2 h-[760px] w-[360px] origin-top-left" style={{ transform: `scale(${k}) translate(${-cx}px, ${-y}px)` }}>
        {children}
      </div>
    </div>
  );
}

/** 모바일용 베젤 폰. 360×760 화면을 scale배로 담는다 */
function PhoneMock({ scale, children }: { scale: number; children: React.ReactNode }) {
  return (
    <div className="relative rounded-[46px] bg-black p-2.5 ring-[3px] ring-surface-4 ring-inset">
      <div className="relative overflow-hidden rounded-[36px]" style={{ width: 360 * scale, height: 760 * scale }}>
        <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
      <span aria-hidden className="absolute top-[20px] left-1/2 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

/** 모바일 폰 크기: 화면 높이와 폭 안에 들어가게, 최대 0.94배 */
const mobileScale = () => Math.max(0.6, Math.min(0.94, (window.innerHeight - 90) / 780, (window.innerWidth - 24) / 380));
const onResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};

/**
 * 첫 화면과 기능 설명을 한 판으로 묶은 분할 무대.
 * 데스크톱: 왼쪽 무대는 화면에 고정되고, 처음엔 태그 달린 오너 사진, 기능 문단이 가운데 오면 3D 폰 속 그 화면으로 바뀐다.
 * 모바일: 무대는 맨 위 사진으로만 쓰고, 기능 구간에서는 폰 목업 하나가 화면에 고정된 채 속 화면과 아래 설명글만 바뀐다.
 */
export function SplitStage({ hero, heading, steps }: { hero: React.ReactNode; heading: React.ReactNode; steps: Step[] }) {
  // -1 = 히어로(사진), 0.. = 기능 문단
  const [active, setActive] = useState(-1);
  const webgl = useSyncExternalStore(noop, canUseWebGL, () => false);
  const reduced = useSyncExternalStore(noop, prefersReduced, () => false);
  const wide = useSyncExternalStore(onWide, isWide, () => false);
  const mScale = useSyncExternalStore(onResize, mobileScale, () => 0.9);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-stage]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-stage")));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 첫 화면을 내리는 동안 무대가 줄어드는 정도. 움직임 줄이기면 고정
  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      el.style.setProperty("--shrink", (1 - (1 - p) ** 3).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const phoneOn = active >= 0;
  const cur = active < 0 ? 0 : active;
  const screens = (
    <div className="relative h-[760px] w-[360px]">
      {steps.map((s, i) => (
        <div
          key={s.id}
          inert
          data-on={active === i}
          className={`absolute inset-0 transition-opacity duration-300 ${active === i || (active < 0 && i === 0) ? "opacity-100" : "opacity-0"}`}
        >
          {s.screen}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={root} className="lg:grid lg:grid-cols-[38.2%_61.8%]">
      {/* 무대 */}
      {/* 데스크톱: 처음엔 여백 없이 꽉 차고, 내리면 가장자리가 안으로 들어오며 작아진다(--shrink 0→1) */}
      <div className="p-3 lg:sticky lg:top-0 lg:h-svh lg:p-0">
        <div className="relative h-[58svh] overflow-hidden rounded-[14px] bg-surface-1 md:h-[52svh] lg:h-full lg:rounded-none lg:[clip-path:inset(calc(var(--shrink,0)*32px)_calc(var(--shrink,0)*24px)_round_calc(var(--shrink,0)*24px))]">
          <div inert={phoneOn} className={`absolute inset-0 transition-opacity duration-500 ${phoneOn ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <HeroPhoto />
          </div>
          {wide && (
            <div
              aria-hidden
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${phoneOn ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {webgl ? (
                <div className="relative aspect-[440/820] h-[min(820px,calc(100svh-80px),calc((38.2vw-48px)*1.86))]">
                  <IPhone3D reducedMotion={reduced}>{screens}</IPhone3D>
                </div>
              ) : (
                <div
                  data-ui
                  className="relative origin-center scale-[0.75] rounded-[56px] bg-black p-2.5 ring-[3px] ring-surface-4 [@media(min-height:960px)]:scale-100"
                >
                  <div className="overflow-hidden rounded-[46px]">{screens}</div>
                  <span aria-hidden className="absolute top-[22px] left-1/2 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 스크롤 칼럼 */}
      <div className="relative z-10">
        <div data-stage={-1}>{hero}</div>

        <section id="how" aria-labelledby="how-title" className="scroll-mt-6 px-5 pt-24 pb-10 md:px-12 lg:px-12 lg:pt-[20svh] xl:px-14">
          <div>
            {heading}
            {/* 모바일: 고정된 폰 하나. 아래 문단(ol)이 그 뒤로 지나가며 화면과 설명글을 바꾼다 */}
            <div className="relative mt-8 lg:mt-0">
              {!wide && (
                <div aria-hidden className="absolute inset-y-0 -inset-x-5 md:-inset-x-12 lg:hidden">
                  <div className="sticky top-0 h-svh overflow-hidden">
                    <div data-ui className="flex justify-center pt-4">
                      <PhoneMock scale={mScale}>{screens}</PhoneMock>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 grid bg-linear-to-b from-transparent via-bg via-45% to-bg px-5 pt-32 pb-8 md:px-12">
                      {steps.map((s, i) => (
                        <p
                          key={s.id}
                          className={`text-[17px] leading-[1.6] text-text-2 transition-[opacity,translate] duration-300 [grid-area:1/1] md:text-lg ${(active < 0 ? 0 : active) === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                        >
                          <strong className="font-bold text-text-1">{s.lead}</strong> {s.body}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* 데스크톱: 기능 목록, 지금 기능 이름과 설명, 그 기능 부분을 확대한 앱 화면을 칸 폭 전체로 */}
              {wide && (
                <div aria-hidden className="absolute inset-0 max-lg:hidden">
                  <div className="sticky top-0 flex h-svh flex-col justify-center gap-8">
                    <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[19px] font-medium">
                      {steps.map((s, i) => (
                        <li key={s.id} className={`transition-colors duration-300 ${cur === i ? "text-text-1" : "text-muted"}`}>
                          {s.lead}
                        </li>
                      ))}
                    </ul>
                    <div className="grid">
                      {steps.map((s, i) => (
                        <div
                          key={s.id}
                          className={`flex flex-col gap-8 transition-[opacity,translate,visibility] duration-500 [grid-area:1/1] ${cur === i ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"}`}
                        >
                          <div className="flex flex-col gap-3">
                            <p className="text-[44px] leading-[1.2] font-bold tracking-[-0.03em] text-text-1">{s.lead}</p>
                            <p className="text-[22px] leading-[1.5] text-text-2">{s.body}</p>
                          </div>
                          <ScreenZoom focus={s.focus}>{s.screen}</ScreenZoom>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <ol className="flex flex-col">
                {steps.map((s, i) => (
                  <li key={s.id} id={s.id} data-stage={i} className="h-[80svh] lg:snap-center">
                    {/* 화면에는 고정 영역(폰, 기능 색인)이 보여 주므로 문단은 읽기 도구용으로만 남긴다 */}
                    <p className="sr-only">
                      {s.lead}: {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
