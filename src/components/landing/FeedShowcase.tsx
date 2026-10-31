"use client";

import { useState } from "react";
import { FeedScreen } from "./FeedScreen";
import { Phone } from "./Phone";
import { buildChips, type Build } from "./data";

/** 빌드 방향을 고르면 3D 폰 속 피드가 실제로 걸러진다 */
export function FeedShowcase() {
  const [active, setActive] = useState<Build>("전체");

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 md:grid-cols-[1fr_1fr] md:px-8 md:py-32">
      <div className="flex flex-col gap-8 md:order-2">
        <h2 className="text-[32px] leading-tight font-semibold md:text-[44px]">
          내 차종에 남들은
          <br />
          뭘 달았는지
        </h2>
        <p className="max-w-[440px] text-[17px] leading-relaxed text-text-2">
          관심 차종을 고르면 그 차의 오너 게시물만 2열로 모아 보여줘요. 가입하지 않아도 구경할 수 있고, 빌드 방향으로
          한 번 더 걸러 볼 수 있어요.
        </p>
        <div role="group" aria-label="빌드 방향으로 걸러 보기" className="flex flex-wrap gap-2">
          {buildChips.map((chip) => {
            const on = chip === active;
            return (
              <button
                key={chip}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(chip)}
                className={`h-11 rounded-full px-5 text-[17px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${on ? "bg-text-1 font-semibold text-bg-deep" : "bg-surface-2 text-text-body hover:bg-surface-3"}`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
      <Phone label="빌드 방향으로 걸러진 이지리 피드" baseYaw={0.3} className="mx-auto md:order-1">
        <FeedScreen active={active} />
      </Phone>
    </div>
  );
}
