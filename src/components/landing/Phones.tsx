import { Bell, Gauge, Grid2x2, Heart, MessageSquare, Plus, Search, SquarePlus, User } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { buildChips, feedItems, modelTabs, partCategories, partColor, unsplash } from "./data";

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure
      aria-label={label}
      className="relative mx-auto w-full max-w-[360px] rounded-[44px] border border-surface-4 bg-bg-deep p-2.5 shadow-[0_40px_120px_-30px_rgba(45,98,255,0.45)]"
    >
      <div className="relative h-[700px] overflow-hidden rounded-[36px] bg-bg">{children}</div>
    </figure>
  );
}

/** Figma 공용 Footer(하단 탭) */
function TabBar() {
  const icons = [Grid2x2, Search, SquarePlus, Gauge, User];
  return (
    <div className="absolute inset-x-4 bottom-4">
      <div className="flex h-14 items-center justify-center rounded-full bg-surface-3/50 px-3 backdrop-blur-md">
        {icons.map((Icon, i) => (
          <span
            key={i}
            className={`flex h-11 w-14 items-center justify-center rounded-full ${i === 0 ? "bg-white/10 text-text-1 ring-1 ring-white/15" : "text-icon-off"}`}
          >
            <Icon aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Figma `07 Feed` — 차종 탭 + 빌드 방향 칩 + 2열 벽돌형 피드 */
export function FeedPhone() {
  return (
    <PhoneFrame label="이지리 앱 피드 화면">
      <div className="flex items-center justify-between px-5 pt-9">
        <Plus aria-hidden className="size-7 text-text-1" strokeWidth={1.75} />
        <span className="font-logo text-xl text-text-1">IJIRI</span>
        <Bell aria-hidden className="size-6 text-text-1" strokeWidth={1.75} />
      </div>

      <div className="mt-6 border-b border-surface-3">
        <div className="flex px-4">
          {modelTabs.map((tab, i) => (
            <span
              key={tab}
              className={`relative whitespace-nowrap px-2 pb-2.5 text-base font-medium ${i === 0 ? "text-text-1" : "text-text-2"}`}
            >
              {tab}
              {i === 0 && <span className="absolute inset-x-0 bottom-0 h-1 bg-accent" />}
            </span>
          ))}
          <span className="flex items-center px-2 pb-2.5 text-text-1">
            <Plus aria-hidden className="size-4" />
          </span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-hidden px-4">
        {buildChips.map((chip, i) => (
          <span
            key={chip}
            className={`flex h-8 shrink-0 items-center rounded-2xl px-3 text-[13px] ${i === 0 ? "bg-text-1 font-semibold text-bg-deep" : "bg-surface-2 text-text-body"}`}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-4 columns-2 gap-2.5 px-4">
        {feedItems.map((item) => (
          <div key={item.photoId} className="mb-3 break-inside-avoid">
            <CarPhoto
              src={unsplash(item.photoId, 400)}
              alt={`${item.year} ${item.model} 오너 사진`}
              className={`w-full rounded-lg ${item.tall ? "h-[190px]" : "h-[150px]"}`}
            />
            <div className="mt-1 flex items-center justify-between text-[13px]">
              <span className="text-text-body">
                {item.year}·{item.model}
              </span>
              <span className="text-text-3">
                부품 <span className="font-mono text-[11px]">{item.parts}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <TabBar />
    </PhoneFrame>
  );
}

/** Figma `08 Post Detail` — 사진 위 부품 캡슐 + 분류별 튜닝 목록 */
export function PostPhone() {
  return (
    <PhoneFrame label="이지리 앱 게시물 상세 화면">
      <div className="relative h-[330px]">
        <CarPhoto src={unsplash("dveDkZQJVjQ", 720)} alt="BMW M4 CS 오너 사진" className="size-full" />
        {/* 뒷면 탭 캡슐: 테두리 없는 반투명 진한 회색 + 캡슐 안에서만 보이는 파란 파동 */}
        {[
          { label: "단조 휠", pos: "left-[10%] bottom-[22%]", delay: "0ms" },
          { label: "프론트 립", pos: "left-[36%] bottom-[38%]", delay: "120ms" },
          { label: "카본 사이드미러", pos: "right-[8%] top-[34%]", delay: "240ms" },
        ].map((c) => (
          <span
            key={c.label}
            style={{ animationDelay: c.delay }}
            className={`capsule absolute ${c.pos} overflow-hidden rounded-full bg-[rgba(24,27,32,0.66)] px-3 py-1.5 text-[13px] text-text-1 backdrop-blur-md`}
          >
            <span className="capsule-wave absolute inset-0" aria-hidden />
            <span className="relative">{c.label}</span>
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        <span className="h-1.5 w-6 rounded bg-accent" />
        <span className="size-1.5 rounded bg-muted" />
        <span className="size-1.5 rounded bg-muted" />
      </div>

      <div className="mt-3 flex items-end justify-between px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-surface-4 font-logo text-xs text-text-2">
            IJ
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-text-1">m4.owner</span>
            <span className="text-[13px] text-text-3">M4 CS · 2023 · 서킷</span>
          </div>
        </div>
        <span className="text-[13px] text-text-3">
          <span className="font-mono text-[11px]">3</span>일 전
        </span>
      </div>

      <p className="mt-3 px-5 text-xl font-semibold text-text-1">주말 트랙데이 셋업</p>

      <div className="mt-3 flex gap-2 px-5">
        {[
          { Icon: Heart, n: 12 },
          { Icon: MessageSquare, n: 4 },
        ].map(({ Icon, n }, i) => (
          <span key={i} className="flex h-8 items-center gap-2 rounded-2xl bg-surface-2 px-4 text-text-1">
            <Icon aria-hidden className="size-4" strokeWidth={1.75} />
            <span className="font-mono text-[13px]">{n}</span>
          </span>
        ))}
      </div>

      <div className="mt-4 h-2 bg-bg-deep" />

      <div className="flex flex-col gap-3 px-5 pt-3">
        <div className="flex items-end justify-between">
          <span className="text-xl font-semibold text-text-1">튜닝 목록</span>
          <span className="text-[13px] text-text-3">
            <span className="font-mono text-[11px]">7</span>개
          </span>
        </div>
        {partCategories.slice(0, 2).map((cat) => (
          <div key={cat.key} className="flex flex-col gap-2">
            <span className="text-base font-medium text-text-1">
              {cat.label} <span className="ml-1 font-mono text-[13px] text-text-3">{cat.items.length}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span key={item} className={`rounded-2xl px-3 py-1.5 text-[13px] text-white ${partColor[cat.key]}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
