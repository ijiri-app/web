"use client";

import { useEffect, useState } from "react";

/** 제목이 화면 위에서 이만큼 안으로 들어오면 그 조항을 보고 있는 것으로 친다. 목차를 눌러 도착한 위치(scroll-mt-24)보다 조금 아래 */
const READ_LINE = 120;

/** 문서 왼쪽 목차. 지금 보고 있는 조항을 밝게 표시한다 */
export function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= READ_LINE) current = id;
      }
      // 화면이 길어 마지막 조항이 위까지 못 올라와도 끝까지 내리면 마지막으로 표시한다
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atEnd ? items.at(-1)?.id : current);
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav aria-label="목차" className="mt-8 hidden lg:block">
      <ol className="flex flex-col gap-2.5 text-[15px] text-text-3">
        {items.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={s.id === active ? "location" : undefined}
              className={`rounded transition-colors hover:text-text-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${s.id === active ? "text-text-1" : ""}`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
