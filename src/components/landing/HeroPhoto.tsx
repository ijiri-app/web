"use client";

import { useState } from "react";
import { CarPhoto } from "./CarPhoto";
import { heroPhotoId, heroTags, partColor, partRing, unsplash, type Tag } from "./data";

type Props = {
  photoId: string;
  tags: Tag[];
  alt: string;
  /** 사진 안의 라벨 크기. 앱 화면 안에서는 작게 */
  small?: boolean;
  width?: number;
};

/**
 * 오너 사진 위 부품마다 점(앵커), 지시선, 분류색 라벨.
 * 처음 한 번 올라오고(CSS 애니메이션), 사진을 누르면 숨기거나 다시 띄운다(앱의 뒷면 탭과 같은 동작).
 */
export function TaggedPhoto({ photoId, tags, alt, small = false, width = 1600 }: Props) {
  const [shown, setShown] = useState(true);

  return (
    <div data-shown={shown} className="absolute inset-0">
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-pressed={shown}
        aria-label={shown ? "부품 태그 숨기기" : "부품 태그 보기"}
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
      >
        <CarPhoto src={unsplash(photoId, width)} alt={alt} className="size-full" />
      </button>

      <svg aria-hidden className="tag-lines pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {tags.map((t) => (
          <line key={t.label} x1={t.ax} y1={t.ay} x2={t.lx} y2={t.ly} stroke="white" strokeOpacity="0.8" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <ul aria-label="이 사진에 달린 부품" className="pointer-events-none absolute inset-0">
        {tags.map((t) => (
          <li key={t.label}>
            <span
              aria-hidden
              className={`tag-anchor absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${small ? "size-2 ring-2" : "size-2.5 ring-[3px]"} ${partRing[t.category]}`}
              style={{ left: `${t.ax}%`, top: `${t.ay}%` }}
            />
            <span
              className={`absolute -translate-y-1/2 ${t.side === "left" ? "-translate-x-full" : ""}`}
              style={{ left: `${t.lx}%`, top: `${t.ly}%` }}
            >
              <span
                className={`tag-label block rounded leading-none font-medium whitespace-nowrap text-white ${small ? "px-2 py-1.5 text-[12px]" : "px-3 py-2 text-[15px]"} ${partColor[t.category]}`}
              >
                {t.label}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 히어로의 오너 사진 */
export function HeroPhoto() {
  return <TaggedPhoto photoId={heroPhotoId} tags={heroTags} alt="튜닝된 BMW M4 CS 오너 사진" />;
}
