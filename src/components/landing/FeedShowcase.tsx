"use client";

import { useState } from "react";
import { FeedScreen } from "./FeedScreen";
import { Phone } from "./Phone";
import { buildChips, type Build } from "./data";

/** 빌드 방향을 고르면 3D 폰 속 피드가 실제로 걸러진다 */
export function FeedShowcase() {
  const [active, setActive] = useState<Build>("전체");

  return (
    <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-5 py-24 md:grid-cols-[auto_1fr] md:gap-[120px] md:px-0 md:py-32">
      <div className="flex flex-col gap-8 md:order-2">
        <h2 className="text-[36px] leading-[1.25] font-bold tracking-[-0.02em] md:text-[48px]">
          내 차종에 남들은
          <br />
          뭘 달았는지
        </h2>
        <div role="group" aria-label="빌드 방향으로 걸러 보기" className="flex flex-wrap gap-2">
          {buildChips.map((chip) => {
            const on = chip === active;
            return (
              <button
                key={chip}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(chip)}
                className={`h-12 rounded-full px-[22px] text-[17px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${on ? "bg-text-1 font-bold text-bg-deep" : "bg-surface-2 text-text-body hover:bg-surface-3"}`}
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
