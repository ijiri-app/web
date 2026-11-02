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
  /** 데스크톱 기능 칸에 화면 확대 대신 보여 줄 그림 */
  visual?: React.ReactNode;
};

/** 앱 화면의 한 부분(중심점 x, y)을 키워 칸 폭 전체에 보여 준다. 배율은 최소 z, 칸 폭을 꽉 채울 만큼 */
function ScreenZoom({
  focus: [x, y, z],
  className = "h-[300px]",
  children,
}: {
  focus: [number, number, number];
  className?: string;
  children: React.ReactNode;
}) {
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
    <div ref={box} data-ui className={`relative w-full overflow-hidden rounded-[20px] bg-bg ${className}`}>
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
 * 첫 화면(분할 무대)과 기능 구간.
 * 데스크톱: 첫 화면은 왼쪽 오너 사진과 오른쪽 글. 기능 구간은 가운데 3D 폰과 기능마다 한 칸씩 놓은 그리드.
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
  // 데스크톱 가운데 폰에 띄울 대표 화면(차종별 피드)
  const showcase = steps.find((s) => s.id === "feed") ?? steps[0];

  return (
    <div ref={root}>
      <div className="lg:grid lg:grid-cols-[38.2%_61.8%]">
        {/* 무대: 첫 화면 오너 사진. 데스크톱은 처음엔 여백 없이 꽉 차고, 내리면 가장자리가 안으로 들어오며 작아진다(--shrink 0→1) */}
        <div className="p-3 lg:sticky lg:top-0 lg:h-svh lg:p-0">
          <div className="relative h-[58svh] overflow-hidden rounded-[14px] bg-surface-1 md:h-[52svh] lg:h-full lg:rounded-none lg:[clip-path:inset(calc(var(--shrink,0)*32px)_calc(var(--shrink,0)*24px)_round_calc(var(--shrink,0)*24px))]">
            <HeroPhoto />
          </div>
        </div>
        <div className="relative z-10" data-stage={-1}>
          {hero}
        </div>
      </div>

      <section id="how" aria-labelledby="how-title" className="scroll-mt-6 px-5 pt-24 pb-10 md:px-12 lg:px-[72px] lg:pt-32 lg:pb-32">
        <div className="lg:text-center">{heading}</div>

        {/* 모바일: 고정된 폰 하나. 아래 빈 단계(ol)가 그 뒤로 지나가며 화면과 설명글을 바꾼다 */}
        <div className="relative mt-8 lg:hidden">
          {!wide && (
            <div aria-hidden className="absolute inset-y-0 -inset-x-5 md:-inset-x-12">
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
          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li key={s.id} id={s.id} data-stage={i} className="h-[80svh]">
                <p className="sr-only">
                  {s.lead}: {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 데스크톱: 가운데 3D 폰 하나, 아래에 기능마다 한 칸씩 (짧은 한 줄 + 그 기능 부분 화면) */}
        <div className="mx-auto hidden max-w-[1200px] lg:block">
          <div className="relative mx-auto mt-4 aspect-[440/820] h-[min(760px,82svh)]">
            {wide &&
              (webgl ? (
                <IPhone3D reducedMotion={reduced}>
                  <div className="relative h-[760px] w-[360px]">{showcase.screen}</div>
                </IPhone3D>
              ) : (
                <div className="flex size-full items-center justify-center">
                  <div data-ui className="relative origin-center scale-[0.8] rounded-[56px] bg-black p-2.5 ring-[3px] ring-surface-4">
                    <div inert className="overflow-hidden rounded-[46px]">
                      {showcase.screen}
                    </div>
                    <span aria-hidden className="absolute top-[22px] left-1/2 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
                  </div>
                </div>
              ))}
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-5">
            {steps.map((s) => {
              const wideCard = s.id === "capsule";
              return (
                <li key={s.id} className={`reveal flex flex-col gap-7 overflow-hidden rounded-[28px] bg-surface-1 p-8 ${wideCard ? "col-span-2" : ""}`}>
                  <div className="text-center">
                    <h3 className="text-[24px] leading-[1.3] font-bold">{s.lead}</h3>
                    <p className="mt-2 text-[17px] leading-[1.5] text-text-2">{s.body}</p>
                  </div>
                  {s.visual ?? (
                    <ScreenZoom focus={s.focus} className={wideCard ? "h-[420px]" : "h-[300px]"}>
                      {s.screen}
                    </ScreenZoom>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
