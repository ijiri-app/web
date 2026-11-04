import { Bell, Gauge, Grid2x2, Plus, Search, SquarePlus, User } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { buildChips, feedItems, modelTabs, unsplash, type Build } from "./data";

export const SCREEN_W = 360;
export const SCREEN_H = 760;

/** Figma 공용 Footer(하단 탭) */
function TabBar() {
  const icons = [Grid2x2, Search, SquarePlus, Gauge, User];
  return (
    <div className="absolute inset-x-4 bottom-5">
      <div className="flex h-14 items-center justify-center rounded-full bg-surface-3 px-3">
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

/**
 * Figma `07 Feed` 화면. 3D 폰의 화면과 2D 대체 목업이 같이 쓴다.
 * active가 있으면 그 빌드 방향의 게시물만 보여준다.
 */
export function FeedScreen({ active = "전체" }: { active?: Build }) {
  const items = active === "전체" ? feedItems : feedItems.filter((item) => item.build === active);

  return (
    <div className="relative overflow-hidden rounded-[40px] bg-bg text-left select-none" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <div className="flex items-center justify-between px-5 pt-12">
        <Plus aria-hidden className="size-7 text-text-1" strokeWidth={1.75} />
        <span className="font-logo text-xl text-text-1">IJIRI</span>
        <Bell aria-hidden className="size-6 text-text-1" strokeWidth={1.75} />
      </div>

      <div className="mt-6 border-b border-surface-3">
        <div className="flex px-4">
          {modelTabs.map((tab, i) => (
            <span key={tab} className={`relative px-2 pb-2.5 text-base font-medium whitespace-nowrap ${i === 0 ? "text-text-1" : "text-text-2"}`}>
              {tab}
              {i === 0 && <span className="absolute inset-x-0 bottom-0 h-1 bg-accent" />}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-hidden px-4">
        {buildChips.map((chip) => (
          <span
            key={chip}
            className={`flex h-8 shrink-0 items-center rounded-2xl px-3 text-[13px] transition-colors ${chip === active ? "bg-text-1 font-semibold text-bg-deep" : "bg-surface-2 text-text-body"}`}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-4 columns-2 gap-2.5 px-4">
        {items.map((item) => (
          <div key={item.photoId} className="mb-3 break-inside-avoid">
            <CarPhoto
              src={unsplash(item.photoId, 400)}
              alt={`${item.year} ${item.model} 예시 사진`}
              className={`w-full rounded-lg ${item.tall ? "h-[190px]" : "h-[150px]"}`}
            />
            <div className="mt-1 flex items-center justify-between text-[13px]">
              <span className="text-text-body">
                {item.year} {item.model}
              </span>
              <span className="text-text-3">
                부품 <span className="tabular-nums">{item.parts}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
}
