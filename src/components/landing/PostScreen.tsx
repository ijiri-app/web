import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";
import { partColor, unsplash, type PartCategory } from "./data";

const parts: { cat: PartCategory; label: string; items: string[] }[] = [
  { cat: "ext", label: "익스테리어", items: ["프론트 립"] },
  { cat: "pwr", label: "파워트레인", items: ["메탄킷", "24G 터보"] },
  { cat: "und", label: "하체", items: ["에어서스", "Work 휠"] },
];

/** Figma App `08 Post Detail`: 사진, 글, 분류별 부품 캡슐 */
export function PostScreen() {
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-bg text-left select-none" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <div className="relative h-[330px]">
        <CarPhoto src={unsplash("dveDkZQJVjQ", 720)} alt="게시물 사진" className="size-full" />
        <ArrowLeft aria-hidden className="absolute top-12 left-5 size-6" strokeWidth={1.75} />
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        <span className="h-1.5 w-6 rounded bg-accent" />
        <span className="size-1.5 rounded bg-muted" />
        <span className="size-1.5 rounded bg-muted" />
      </div>
      <div className="mt-3 flex items-center gap-2.5 px-5">
        <span className="size-9 rounded-full bg-surface-4" />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold">m4.owner</span>
          <span className="text-[13px] text-text-3">M4 CS · 2023 · 서킷</span>
        </div>
      </div>
      <p className="mt-3 px-5 text-xl font-semibold">주말 트랙데이 셋업</p>
      <div className="mt-3 flex gap-2 px-5">
        {[Heart, MessageSquare].map((Icon, i) => (
          <span key={i} className="flex h-8 items-center gap-2 rounded-2xl bg-surface-2 px-4">
            <Icon aria-hidden className="size-4" strokeWidth={1.75} />
            <span className="font-mono text-[13px]">{i ? 4 : 12}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 h-2 bg-bg-deep" />
      <div className="flex flex-col gap-3 px-5 pt-3">
        <span className="text-xl font-semibold">튜닝 목록</span>
        {parts.map((p) => (
          <div key={p.cat} className="flex flex-col gap-2">
            <span className="text-base font-medium">{p.label}</span>
            <div className="flex gap-2">
              {p.items.map((it) => (
                <span key={it} className={`rounded-2xl px-3 py-1.5 text-[13px] text-white ${partColor[p.cat]}`}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
