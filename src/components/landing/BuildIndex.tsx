"use client";

import { useState } from "react";
import { PostScreen } from "./PostScreen";
import { ownerBuilds } from "./data";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * 차종별 빌드 미리 보기. 이름을 고르면 오른쪽 무대의 게시물이 바뀌고,
 * 사진을 누르면 부품 태그를 숨기거나 다시 띄운다.
 */
export function BuildIndex() {
  const [sel, setSel] = useState(0);
  const build = ownerBuilds[sel];

  return (
    <section id="builds" aria-labelledby="builds-title" className="scroll-mt-6 bg-bg-deep">
      <div className="grid gap-8 px-5 py-20 md:px-12 lg:grid-cols-12 lg:gap-6 lg:px-[72px] lg:py-32">
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-5 lg:pt-[72px]">
          <h2 id="builds-title" className="reveal text-[22px] leading-[1.4] font-bold md:text-2xl">
            오너 게시물을 직접 열어 보세요
          </h2>
          <ul
            aria-label="차종별 빌드"
            className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-3"
          >
            {ownerBuilds.map((b, i) => (
              <li key={b.id}>
                <button
                  type="button"
                  aria-pressed={sel === i}
                  onClick={() => setSel(i)}
                  className={`rounded text-left text-[22px] leading-[1.15] font-bold tracking-[-0.03em] whitespace-nowrap transition-[color,translate] duration-200 md:text-[30px] lg:text-[44px] lg:hover:translate-x-2 ${sel === i ? "text-text-1" : "text-muted hover:text-text-2"} ${focusRing}`}
                >
                  {b.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="reveal max-w-[380px] text-[17px] leading-[1.6] text-text-2 md:text-lg">
            사진을 누르면 부품 태그를 숨기거나 다시 띄워요. 앱에서는 폰 뒷면을 두 번 톡 두드리면 돼요.
          </p>
        </div>

        <div className="relative h-[70svh] min-h-[560px] min-w-0 overflow-hidden rounded-[14px] bg-surface-1 lg:col-span-7 lg:h-[88svh] lg:max-h-[860px] lg:min-h-[640px]">
          <div key={build.id} data-ui className="sheet-in absolute top-4 left-4 md:top-[72px] md:left-16">
            <PostScreen build={build} />
          </div>
          <p key={`${build.id}-n`} className="sheet-in absolute right-8 bottom-8 hidden max-w-[220px] text-right text-[30px] leading-[1.2] font-bold tracking-[-0.03em] xl:block">
            부품 <span className="tabular-nums">{build.parts.reduce((n, p) => n + p.items.length, 0)}</span>개,
            <br />
            <span className="tabular-nums">{build.saves}</span>명이 담아 감
          </p>
        </div>
      </div>
    </section>
  );
}
