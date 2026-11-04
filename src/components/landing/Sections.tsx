import { SplitStage, type Step } from "./Journey";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, NotificationScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { TaggedPhoto } from "./HeroPhoto";
import { heroPhotoId, heroRefAspect, heroTags } from "./data";

/* 타입 단계: 13 / 17·18 / 22·24 / 30·44 / 워드마크 */
export const h2 = "text-[30px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[44px]";
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
export const button = `inline-flex h-12 items-center justify-center rounded-[14px] bg-accent-strong px-5 text-[17px] font-bold transition-[filter,scale] hover:brightness-110 active:scale-[0.97] ${focusRing}`;

const steps: Step[] = [
  {
    id: "start",
    focus: [180, 330, 1],
    lead: "관심 차종",
    body: "고른 차종의 빌드만 보여 줘요.",
    screen: <InterestScreen />,
  },
  {
    id: "feed",
    focus: [180, 300, 1],
    lead: "차종별 피드",
    body: "같은 차 오너들의 튜닝을 나란히 비교해요.",
    screen: <FeedScreen />,
  },
  {
    id: "capsule",
    focus: [180, 165, 1],
    visual: (
      <div className="relative h-[460px] overflow-hidden rounded-[20px]">
        <TaggedPhoto photoId={heroPhotoId} tags={heroTags} alt="부품 태그를 단 튜닝카 예시 사진" width={1400} refAspect={heroRefAspect} />
      </div>
    ),
    lead: "부품 태그",
    body: "사진 위에 달린 부품이 바로 떠요.",
    screen: <PostScreen />,
  },
  {
    id: "wishlist",
    focus: [180, 580, 1],
    lead: "담기 알림",
    body: "내 부품을 몇 명이 담았는지 알려 줘요.",
    screen: <NotificationScreen />,
  },
  {
    id: "search",
    focus: [180, 300, 1],
    lead: "통합 검색",
    body: "차종, 부품, 브랜드로 한 번에 찾아요.",
    screen: <SearchScreen />,
  },
  {
    id: "upload",
    focus: [180, 470, 1],
    lead: "1분 업로드",
    body: "사진에 부품 태그만 달면 끝이에요.",
    screen: <PickScreen />,
  },
  {
    id: "safe",
    focus: [180, 300, 1],
    lead: "번호판 자동 가림",
    body: "번호판은 가리고 위치 정보는 지워요.",
    screen: <UploadScreen />,
  },
];

/** 첫 화면 + 기능 설명. 왼쪽 무대는 고정, 오른쪽 칼럼만 흐른다 */
export function StageSections({ hero }: { hero: React.ReactNode }) {
  return (
    <SplitStage
      hero={hero}
      steps={steps}
      heading={
        <h2 id="how-title" className={h2}>
          필요한 기능만 담았어요
        </h2>
      }
    />
  );
}
