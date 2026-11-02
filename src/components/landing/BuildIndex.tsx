"use client";

import { useState } from "react";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { TaggedPhoto } from "./HeroPhoto";
import { ownerBuilds, partCategoryLabel, partColor, unsplash } from "./data";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const partCount = (b: (typeof ownerBuilds)[number]) => b.parts.reduce((n, p) => n + p.items.length, 0);

/**
 * 차종별 빌드. 빌드 카드 4개를 한 줄로 놓고(사진, 이름, 부품 수),
 * 고르면 아래에 태그 달린 큰 사진과 튜닝 목록이 열린다. 사진을 누르면 태그를 숨기거나 다시 띄운다.
 */
export function BuildIndex() {
  const [sel, setSel] = useState(0);
  const b = ownerBuilds[sel];

  return (
    <section id="builds" aria-labelledby="builds-title" className="scroll-mt-6 bg-bg-deep lg:snap-start">
      <div className="px-5 py-20 md:px-12 lg:px-[72px] lg:py-32">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="builds-title" className="reveal text-[30px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[44px]">
            오너 빌드를
            <br />
            직접 열어 보세요
          </h2>
          <p className="reveal max-w-[360px] text-[17px] leading-[1.6] text-text-2 md:text-lg">사진을 누르면 부품 태그를 숨기거나 다시 띄워요.</p>
        </div>

        <ul aria-label="차종별 빌드" className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
          {ownerBuilds.map((o, i) => (
            <li key={o.id}>
              <button
                type="button"
                aria-pressed={sel === i}
                onClick={() => setSel(i)}
                className={`group flex w-full flex-col gap-3 rounded-[20px] p-2 text-left transition-colors duration-200 ${sel === i ? "bg-surface-2" : "hover:bg-surface-1"} ${focusRing}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[14px]">
                  <CarPhoto
                    src={unsplash(o.photoId, 640)}
                    alt=""
                    className={`size-full transition-[scale,opacity] duration-300 group-hover:scale-[1.03] ${sel === i ? "" : "opacity-70"}`}
                  />
                </span>
                <span className="flex flex-col gap-0.5 px-1 pb-1">
                  <span className={`text-[19px] leading-tight font-bold md:text-[22px] ${sel === i ? "text-text-1" : "text-text-2"}`}>{o.name}</span>
                  <span className="text-[15px] text-text-3">
                    부품 {partCount(o)}개, 담기 {o.saves}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div key={b.id} className="sheet-in mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[1.618fr_1fr] lg:gap-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-surface-1 lg:aspect-auto lg:h-[560px]">
            <TaggedPhoto photoId={b.photoId} tags={b.tags} alt={`${b.meta} 오너 사진`} width={1400} refAspect={b.refAspect} />
          </div>

          <div className="flex flex-col gap-7 rounded-[20px] bg-surface-1 p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-[26px] leading-[1.3] font-bold md:text-[30px]">{b.title}</h3>
              <span className="text-[15px] text-text-3">
                {b.owner}, {b.meta}
              </span>
            </div>
            <ul className="flex gap-2 text-[15px] text-text-2">
              {[
                { Icon: Heart, n: b.likes, label: "좋아요" },
                { Icon: MessageSquare, n: b.comments, label: "댓글" },
                { Icon: Bookmark, n: b.saves, label: "담기" },
              ].map(({ Icon, n, label }) => (
                <li key={label} className="flex h-10 items-center gap-2 rounded-full bg-surface-2 px-4">
                  <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  <span className="sr-only">{label}</span>
                  <span className="tabular-nums">{n}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5">
              <span className="text-[17px] font-bold">튜닝 목록 {partCount(b)}개</span>
              {b.parts.map((p) => (
                <div key={p.cat} className="flex flex-col gap-2.5">
                  <span className="text-[15px] text-text-3">{partCategoryLabel[p.cat]}</span>
                  <div className="flex flex-wrap gap-2">
                    {p.items.map((it) => (
                      <span key={it} className={`rounded-full px-3.5 py-2 text-[15px] text-white ${partColor[p.cat]}`}>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
