"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CarPhoto } from "./CarPhoto";
import { partCategoryLabel, partColor, stageParts, unsplash, type PartCategory } from "./data";

/**
 * 뒷면 탭 부품 캡슐 (기획: 이지리 기획 정리 > 화면과 핵심 UX).
 * 캡슐은 테두리 없는 반투명 진한 회색이고 동시에 스르륵 올라온다.
 * 사진 중앙에서 퍼지는 파란 파동 하나가 캡슐 안에서만 보인다.
 */
export function CapsuleStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const capsuleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [shown, setShown] = useState(false);
  const [wave, setWave] = useState(0);

  // 파동 중심(사진 중앙)을 각 캡슐 기준 좌표로 넘겨 하나의 파동처럼 보이게 한다
  const placeWave = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const s = stage.getBoundingClientRect();
    const cx = s.left + s.width / 2;
    const cy = s.top + s.height / 2;
    capsuleRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--cx", `${cx - r.left}px`);
      el.style.setProperty("--cy", `${cy - r.top}px`);
    });
  }, []);

  useLayoutEffect(() => {
    placeWave();
    window.addEventListener("resize", placeWave);
    return () => window.removeEventListener("resize", placeWave);
  }, [placeWave]);

  const toggle = useCallback(() => {
    setShown((prev) => {
      if (!prev) {
        placeWave();
        setWave((n) => n + 1);
      }
      return !prev;
    });
  }, [placeWave]);

  // 무대가 화면에 처음 들어올 때 한 번만 보여준다
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          setTimeout(() => {
            placeWave();
            setShown(true);
            setWave((n) => n + 1);
          }, 400);
        }
      },
      { threshold: 0.55 },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [placeWave]);

  const categories = Object.keys(partCategoryLabel) as PartCategory[];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="text-[32px] leading-tight font-semibold md:text-[44px]">
          폰 뒷면을 톡,
          <br />
          사진 위에 부품이 떠요
        </h2>
        <p className="max-w-[420px] text-[17px] leading-relaxed text-text-2">
          게시물을 보다가 폰 뒷면을 가볍게 두드리면 달린 부품이 한꺼번에 올라와요. 사진을 눌러도 똑같이 볼 수
          있어요.
        </p>
      </div>

      <div
        ref={stageRef}
        data-shown={shown}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-surface-2 sm:aspect-[16/9]"
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={shown ? "부품 숨기기" : "부품 보기"}
          className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        >
          <CarPhoto src={unsplash("dveDkZQJVjQ", 1600)} alt="BMW M4 CS 오너 사진" className="size-full" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden />
        </button>

        <ul aria-label="이 사진에 달린 부품" className="pointer-events-none absolute inset-0">
          {stageParts.map((part, i) => (
            <li
              key={part.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${part.x}%`, top: `${part.y}%` }}
            >
              <span
                ref={(el) => {
                  capsuleRefs.current[i] = el;
                }}
                className="capsule relative flex items-center gap-2 overflow-hidden rounded-full bg-[rgba(24,27,32,0.66)] px-3.5 py-2 text-[14px] whitespace-nowrap text-text-1 backdrop-blur-md sm:text-[15px]"
              >
                <span key={wave} className="capsule-wave absolute inset-0" aria-hidden />
                <span className={`relative size-2 rounded-full ${partColor[part.category]} ring-1 ring-white/40`} aria-hidden />
                <span className="relative">{part.label}</span>
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 bottom-4 z-10 h-11 rounded-full bg-[rgba(17,20,24,0.72)] px-5 text-[15px] font-semibold text-text-1 backdrop-blur-md hover:bg-[rgba(17,20,24,0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {shown ? "부품 숨기기" : "부품 보기"}
        </button>
      </div>

      <dl className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-text-2">
        {categories.map((key) => (
          <div key={key} className="flex items-center gap-2.5">
            <dt className="sr-only">분류 색</dt>
            <span className={`size-3 rounded-full ${partColor[key]}`} aria-hidden />
            <dd>{partCategoryLabel[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
