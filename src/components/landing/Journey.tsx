"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

export type Step = {
  id: string;
  title: React.ReactNode;
  body: string;
  screen: React.ReactNode;
  alerts?: boolean;
};

/** 폰 틀. 360×760 화면을 데스크톱은 그대로, 모바일은 0.85배로 담는다 */
function Device({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 rounded-[44px] border border-line-strong bg-surface-4 p-1 shadow-[0_40px_90px_-20px_rgba(0,5,25,0.7)] md:rounded-[54px] md:p-[5px]">
      <div className="relative h-[646px] w-[306px] overflow-hidden rounded-[40px] bg-black md:h-[760px] md:w-[360px] md:rounded-[49px]">
        <div className="origin-top-left scale-[0.85] md:scale-100">{children}</div>
        <span aria-hidden className="absolute top-2.5 left-1/2 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black md:top-3 md:h-7 md:w-[92px]" />
      </div>
    </div>
  );
}

const alerts = [
  { body: "RAYS TE37을 3명이 담아 갔어요", time: "지금" },
  { body: "오늘 내 부품을 12명이 담아 갔어요", time: "어제" },
];

function Alerts() {
  return (
    <ul aria-label="담기 알림 예시" className="flex w-full flex-col gap-2.5 md:w-[400px]">
      {alerts.map((a, i) => (
        <li key={a.body} className={`flex items-center gap-3 rounded-[20px] bg-surface-3 px-3.5 py-3.5 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.6)] ${i ? "opacity-70" : ""}`}>
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white font-logo text-[12px] leading-none text-black">
            IJIRI
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-bold">이지리</span>
            <span className="text-[13px] text-text-2">{a.body}</span>
          </span>
          <span className="text-xs text-text-3">{a.time}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 기능을 사용 흐름 순서로 보여준다.
 * 데스크톱: 오른쪽 폰은 화면에 고정되고, 왼쪽 문단이 가운데 오면 그 화면으로 바뀐다.
 * 모바일: 문단 아래에 그 화면을 바로 붙인다.
 */
export function Journey({ steps, titleClass }: { steps: Step[]; titleClass: string }) {
  const [active, setActive] = useState(0);
  const webgl = useSyncExternalStore(noop, canUseWebGL, () => false);
  const reduced = useSyncExternalStore(noop, prefersReduced, () => false);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="이지리 기능" className="bg-bg-deep">
      <div className="mx-auto max-w-[1160px] md:grid md:grid-cols-[1fr_440px] md:gap-[60px]">
        <ol className="flex flex-col">
          {steps.map((s, i) => (
            <li
              key={s.id}
              id={s.id}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex flex-col justify-center gap-9 border-t border-surface-3 px-5 py-20 first:border-t-0 md:min-h-[88vh] md:border-t-0 md:px-0 md:py-0"
            >
              <div className={`flex flex-col gap-5 transition-opacity duration-300 md:gap-6 ${active === i ? "md:opacity-100" : "md:opacity-35"}`}>
                <h2 className={titleClass}>{s.title}</h2>
                <p className="max-w-[460px] text-base leading-[1.6] text-text-2 md:text-[19px]">{s.body}</p>
              </div>
              {/* 모바일: 문단마다 화면 */}
              <div className="flex flex-col items-center gap-5 md:hidden">
                {s.alerts && <Alerts />}
                <Device>{s.screen}</Device>
              </div>
            </li>
          ))}
        </ol>

        {/* 데스크톱: 고정된 폰 */}
        <div className="hidden md:block">
          <div className="sticky top-[calc(50vh-410px)] flex h-[820px] items-center justify-center">
            <div className="relative h-[820px] w-[440px]">
              {webgl ? (
                <IPhone3D reducedMotion={reduced}>
                  <div className="relative h-[760px] w-[360px]">
                  {steps.map((s, i) => (
                    <div
                      key={s.id}
                      aria-hidden={active !== i}
                      className={`absolute inset-0 transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
                    >
                      {s.screen}
                    </div>
                  ))}
                </div>
                </IPhone3D>
              ) : (
                <div className="flex size-full items-center justify-center">
                  <Device>
                    <div className="relative h-[760px] w-[360px]">
                  {steps.map((s, i) => (
                    <div
                      key={s.id}
                      aria-hidden={active !== i}
                      className={`absolute inset-0 transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
                    >
                      {s.screen}
                    </div>
                  ))}
                </div>
                  </Device>
                </div>
              )}
              <div
                className={`absolute top-28 -left-[360px] z-10 transition-all duration-300 ${steps[active]?.alerts ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
              >
                <Alerts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
