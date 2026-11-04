"use client";

import { useEffect, useRef, useState } from "react";
import { CarPhoto } from "./CarPhoto";
import { heroPhotoId, heroRefAspect, heroTags, partColor, partRing, unsplash, type Tag } from "./data";

type Props = {
  photoId: string;
  tags: Tag[];
  alt: string;
  /** 사진 안의 라벨 크기. 앱 화면 안에서는 작게 */
  small?: boolean;
  width?: number;
  priority?: boolean;
  /** 태그 좌표를 잡은 화면 비율. 주면 사진이 다른 비율로 잘려도 같은 부품을 가리키게 환산한다 */
  refAspect?: number;
  /** 사진 오른쪽 아래 작은 설명 (올린 사람, 차) */
  caption?: string;
};

/** object-cover로 가운데 잘린 사진에서, 기준 화면의 좌표(%)를 지금 화면의 좌표(%)로 옮긴다 */
function remap(x: number, y: number, img: number, from: number, to: number) {
  // 기준 화면 → 사진 좌표(0~1)
  let u = x / 100;
  let v = y / 100;
  if (img > from) u = 0.5 + (u - 0.5) * (from / img);
  else v = 0.5 + (v - 0.5) * (img / from);
  // 사진 좌표 → 지금 화면
  if (img > to) u = 0.5 + (u - 0.5) * (img / to);
  else v = 0.5 + (v - 0.5) * (to / img);
  return [u * 100, v * 100] as const;
}

/**
 * 오너 사진 위 부품마다 점(앵커), 지시선, 분류색 라벨.
 * 처음 한 번 올라오고(CSS 애니메이션), 사진을 누르면 숨기거나 다시 띄운다(앱의 뒷면 탭과 같은 동작).
 */
export function TaggedPhoto({ photoId, tags, alt, small = false, width = 1600, priority = false, refAspect, caption }: Props) {
  const [shown, setShown] = useState(true);
  const [imgAspect, setImgAspect] = useState<number | null>(null);
  const [boxAspect, setBoxAspect] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || !refAspect) return;
    const ro = new ResizeObserver(([e]) => setBoxAspect(e.contentRect.width / Math.max(1, e.contentRect.height)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [refAspect]);

  const placed = tags
    .map((t) => {
      if (!refAspect || !imgAspect || !boxAspect) return t;
      const [ax, ay] = remap(t.ax, t.ay, imgAspect, refAspect, boxAspect);
      const [lx, ly] = remap(t.lx, t.ly, imgAspect, refAspect, boxAspect);
      return { ...t, ax, ay, lx: Math.min(96, Math.max(4, lx)), ly: Math.min(94, Math.max(6, ly)) };
    })
    // 잘려서 사진 밖으로 나간 부품은 빼고 보여 준다
    .filter((t) => t.ax >= 2 && t.ax <= 98 && t.ay >= 2 && t.ay <= 98);

  return (
    <div ref={box} data-shown={shown} className="absolute inset-0">
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-pressed={shown}
        aria-label={`${alt}, 부품 태그 보기`}
        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
      >
        <CarPhoto
          src={unsplash(photoId, width)}
          alt={alt}
          className="size-full"
          priority={priority}
          onNatural={refAspect ? (w, h) => setImgAspect(w / Math.max(1, h)) : undefined}
        />
      </button>

      <svg
        aria-hidden
        className="tag-lines pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.7))" }}
      >
        {placed.map((t) => (
          <line key={t.label} x1={t.ax} y1={t.ay} x2={t.lx} y2={t.ly} stroke="white" strokeOpacity="0.85" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <ul aria-label="이 사진에 달린 부품" className="pointer-events-none absolute inset-0">
        {placed.map((t) => (
          <li key={t.label}>
            <span
              aria-hidden
              className={`tag-anchor absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${small ? "size-2 ring-2" : "size-3 ring-4"} ${partRing[t.category]}`}
              style={{ left: `${t.ax}%`, top: `${t.ay}%` }}
            />
            <span className={`absolute -translate-y-1/2 ${t.side === "left" ? "-translate-x-full" : ""}`} style={{ left: `${t.lx}%`, top: `${t.ly}%` }}>
              <span
                className={`tag-label block rounded leading-none font-medium whitespace-nowrap text-white ${small ? "px-2 py-1.5 text-[12px]" : "px-3.5 py-2.5 text-[16px]"} ${partColor[t.category]}`}
              >
                {t.label}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {caption && (
        <p className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1.5 text-[13px] text-white/90 max-lg:hidden md:right-6 md:bottom-6">
          {caption}
        </p>
      )}
    </div>
  );
}

/** 히어로의 오너 사진 */
export function HeroPhoto() {
  return <TaggedPhoto photoId={heroPhotoId} tags={heroTags} alt="부품 태그를 단 튜닝카 예시 사진" priority refAspect={heroRefAspect} />;
}
