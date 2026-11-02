import { ArrowLeft } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";
import { feedItems, unsplash } from "./data";

/** Figma App `11 Upload 3 Plate` 화면: 번호판을 폰에서 가리는 단계 */
export function UploadScreen() {
  const main = feedItems[2];
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-bg text-left select-none" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <div className="flex items-center justify-between px-5 pt-14">
        <div className="flex items-center gap-3">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={1.75} />
          <span className="text-lg font-medium">번호판 가리기</span>
        </div>
        <span className="text-[15px] text-accent">다음</span>
      </div>

      <div className="relative mx-4 mt-5 h-[300px] overflow-hidden rounded-xl">
        <CarPhoto src={unsplash(main.photoId, 720)} alt="번호판을 가릴 오너 사진" className="size-full" />
        <span className="absolute top-3 left-3 rounded-md bg-accent-strong px-2 py-1 text-[13px] font-semibold">자동으로 찾았어요</span>
        <span aria-hidden className="absolute bottom-[22%] left-[38%] h-[9%] w-[24%] rounded-sm border-2 border-accent bg-black/80" />
      </div>
      <p className="mx-4 mt-3 text-[13px] text-text-3">가린 부분은 올리기 전에 폰 안에서 처리돼요</p>

      <div className="mx-4 mt-4 flex gap-2">
        {feedItems.slice(0, 5).map((it, i) => (
          <CarPhoto
            key={it.photoId}
            src={unsplash(it.photoId, 160)}
            alt=""
            className={`size-[58px] rounded-md ${i === 0 ? "ring-2 ring-accent" : "opacity-70"}`}
          />
        ))}
      </div>

      <div className="mx-4 mt-6 grid grid-cols-2 gap-2 text-[14px]">
        <span className="flex h-11 items-center justify-center rounded-lg bg-surface-3">흐리게</span>
        <span className="flex h-11 items-center justify-center rounded-lg bg-surface-2 text-text-2">로고 스티커</span>
        <span className="flex h-11 items-center justify-center rounded-lg bg-surface-2 text-text-2">직접 그리기</span>
        <span className="flex h-11 items-center justify-center rounded-lg bg-surface-2 text-text-2">번호판 없음</span>
      </div>
    </div>
  );
}
