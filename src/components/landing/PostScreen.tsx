import { ArrowLeft, Bookmark, Heart, MessageSquare } from "lucide-react";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";
import { TaggedPhoto } from "./HeroPhoto";
import { ownerBuilds, partCategoryLabel, partColor, type OwnerBuild } from "./data";

/** Figma App `08 Post Detail`: 사진(부품 태그), 글, 분류별 부품 캡슐 */
export function PostScreen({ build = ownerBuilds[0] }: { build?: OwnerBuild }) {
  const stats = [
    { Icon: Heart, n: build.likes, label: "좋아요" },
    { Icon: MessageSquare, n: build.comments, label: "댓글" },
    { Icon: Bookmark, n: build.saves, label: "담기" },
  ];
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-bg text-left select-none" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <div className="relative h-[330px]">
        <TaggedPhoto photoId={build.photoId} tags={build.tags} alt={`${build.meta} 오너 사진`} width={720} small refAspect={build.refAspect} />
        <ArrowLeft aria-hidden className="pointer-events-none absolute top-12 left-5 size-6" strokeWidth={1.75} />
      </div>
      <div className="mt-3 flex items-center gap-2.5 px-5">
        <span className="size-9 rounded-full bg-surface-4" />
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold">{build.owner}</span>
          <span className="text-[13px] text-text-3">{build.meta}</span>
        </div>
      </div>
      <p className="mt-3 px-5 text-xl font-semibold">{build.title}</p>
      <div className="mt-3 flex gap-2 px-5">
        {stats.map(({ Icon, n, label }) => (
          <span key={label} aria-label={`${label} ${n}`} className="flex h-8 items-center gap-2 rounded-2xl bg-surface-2 px-4">
            <Icon aria-hidden className="size-4" strokeWidth={1.75} />
            <span className="text-[13px] tabular-nums">{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 h-2 bg-bg-deep" />
      <div className="flex flex-col gap-3 px-5 pt-3">
        <span className="text-xl font-semibold">튜닝 목록</span>
        {build.parts.map((p) => (
          <div key={p.cat} className="flex flex-col gap-2">
            <span className="text-base font-medium">{partCategoryLabel[p.cat]}</span>
            <div className="flex flex-wrap gap-2">
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
