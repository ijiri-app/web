"use client";

import { useEffect, useState } from "react";
import { CarPhoto } from "./CarPhoto";
import { heroPhotoId, heroTags, partColor, partRing, unsplash } from "./data";

/**
 * Figma `Landing / Desktop 1440` > Hero > Owner Photo.
 * 오너 사진 위 부품마다 점(앵커) → 가는 지시선 → 분류색 라벨.
 * 처음 한 번 올라오고, 사진을 누르면 숨기거나 다시 띄운다(앱의 뒷면 탭과 같은 동작).
 */
export function HeroPhoto() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-shown={shown} className="group/photo absolute inset-0">
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={shown ? "부품 숨기기" : "부품 보기"}
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
      >
        <CarPhoto src={unsplash(heroPhotoId, 1600)} alt="튜닝된 BMW M4 CS 오너 사진" className="size-full" />
      </button>

      {/* 글자 쪽과 위아래를 배경색으로 덮는다 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0b0d10_0%,rgba(11,13,16,0.35)_35%,rgba(11,13,16,0)_60%)] max-md:bg-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,13,16,0.7)_0%,rgba(11,13,16,0)_22%,rgba(11,13,16,0)_55%,rgba(11,13,16,0.9)_100%)]"
      />

      {/* 지시선 */}
      <svg aria-hidden className="tag-lines pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {heroTags.map((t) => (
          <line
            key={t.label}
            x1={t.ax}
            y1={t.ay}
            x2={t.lx}
            y2={t.ly}
            stroke="white"
            strokeOpacity="0.75"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <ul aria-label="이 사진에 달린 부품" className="pointer-events-none absolute inset-0">
        {heroTags.map((t) => (
          <li key={t.label}>
            <span
              aria-hidden
              className={`tag-anchor absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-[3px] ${partRing[t.category]}`}
              style={{ left: `${t.ax}%`, top: `${t.ay}%` }}
            />
            <span
              className={`tag-label absolute rounded px-3 py-2 text-[13px] leading-none font-medium whitespace-nowrap text-white md:text-[15px] ${partColor[t.category]} ${t.side === "left" ? "-translate-x-full" : ""} -translate-y-1/2`}
              style={{ left: `${t.lx}%`, top: `${t.ly}%` }}
            >
              {t.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
