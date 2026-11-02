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
  /** 문단 아래 근거 조각. 없으면 화면을 잘라서 보여 준다 */
  evidence?: React.ReactNode;
  /** 화면을 잘라 보여 줄 때 위에서부터 건너뛸 높이(px) */
  crop?: number;
};

/** 앱 화면(360×760)의 한 부분을 잘라 칼럼 폭 안에 보여 준다 */
function ScreenCrop({ children, crop = 0 }: { children: React.ReactNode; crop?: number }) {
  return (
    <div data-ui className="reveal flex h-[300px] justify-center overflow-hidden rounded-[14px] bg-surface-1 pt-6">
      <div className="h-fit overflow-hidden rounded-t-[28px]" style={{ height: 276 }}>
        <div inert style={{ marginTop: -crop }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * 첫 화면과 기능 설명을 한 판으로 묶은 분할 무대.
 * 데스크톱: 왼쪽 무대는 화면에 고정되고, 처음엔 태그 달린 오너 사진, 기능 문단이 가운데 오면 3D 폰 속 그 화면으로 바뀐다.
 * 모바일: 무대는 맨 위 사진으로만 쓰고, 문단마다 화면 조각을 붙인다.
 */
export function SplitStage({ hero, heading, steps }: { hero: React.ReactNode; heading: React.ReactNode; steps: Step[] }) {
  // -1 = 히어로(사진), 0.. = 기능 문단
  const [active, setActive] = useState(-1);
  const webgl = useSyncExternalStore(noop, canUseWebGL, () => false);
  const reduced = useSyncExternalStore(noop, prefersReduced, () => false);
  const wide = useSyncExternalStore(onWide, isWide, () => false);
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

  const phoneOn = active >= 0;
  const screens = (
    <div className="relative h-[760px] w-[360px]">
      {steps.map((s, i) => (
        <div key={s.id} inert className={`absolute inset-0 transition-opacity duration-300 ${active === i || (active < 0 && i === 0) ? "opacity-100" : "opacity-0"}`}>
          {s.screen}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={root} className="lg:grid lg:grid-cols-[47%_53%]">
      {/* 무대 */}
      <div className="p-3 lg:sticky lg:top-0 lg:h-svh lg:p-5">
        <div className="relative h-[58svh] overflow-hidden rounded-[14px] bg-surface-1 md:h-[52svh] lg:h-full">
          <div className={`absolute inset-0 transition-opacity duration-500 ${phoneOn ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <HeroPhoto />
          </div>
          {wide && (
            <div
              aria-hidden
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${phoneOn ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {webgl ? (
                <div className="relative aspect-[440/820] h-[min(820px,calc(100svh-80px))]">
                  <IPhone3D reducedMotion={reduced}>{screens}</IPhone3D>
                </div>
              ) : (
                <div data-ui className="origin-center scale-[0.85] overflow-hidden rounded-[40px] [@media(min-height:960px)]:scale-100">
                  {screens}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 스크롤 칼럼 */}
      <div className="relative z-10">
        <div data-stage={-1}>{hero}</div>

        <section id="how" aria-labelledby="how-title" className="scroll-mt-6 px-5 pt-24 pb-10 md:px-12 lg:px-[72px] lg:pt-[20svh]">
          <div className="max-w-[560px]">
            {heading}
            <ol className="mt-12 flex flex-col gap-14 lg:gap-0">
              {steps.map((s, i) => (
                <li
                  key={s.id}
                  id={s.id}
                  data-stage={i}
                  className={`flex flex-col gap-5 transition-opacity duration-300 lg:min-h-[80svh] lg:justify-center ${active === i ? "" : "lg:opacity-40"}`}
                >
                  <p className="reveal text-[17px] leading-[1.6] text-text-2 md:text-lg">
                    <strong className="font-bold text-text-1">{s.lead}</strong> {s.body}
                  </p>
                  {s.evidence ?? <ScreenCrop crop={s.crop}>{s.screen}</ScreenCrop>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
