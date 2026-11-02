import { CarPhoto } from "./CarPhoto";
import { SplitStage, type Step } from "./Journey";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, NotificationScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { TaggedPhoto } from "./HeroPhoto";
import { heroPhotoId, heroRefAspect, heroTags, unsplash } from "./data";

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
        <TaggedPhoto photoId={heroPhotoId} tags={heroTags} alt="튜닝된 BMW M4 CS 오너 사진" width={1400} refAspect={heroRefAspect} />
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

/** 차량 QR: 큰 사진 위에 글을 얹은 카드, 오른쪽에 스티커 */
export function QrBand({ qrSvg }: { qrSvg: string }) {
  return (
    <section id="qr" aria-labelledby="qr-title" className="scroll-mt-6 bg-bg-deep px-3 pb-3 md:px-6 md:pb-6 lg:snap-center">
      <div className="relative overflow-hidden rounded-[28px] bg-surface-1">
        <CarPhoto src={unsplash("qEXp4K4Y8t4", 1800)} alt="QR 스티커를 붙인 차" className="absolute inset-0 size-full" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-bg-deep via-bg-deep/80 to-bg-deep/10 max-lg:bg-linear-to-t" />
        <div className="relative grid min-h-[640px] items-end gap-10 px-5 py-14 md:px-12 lg:min-h-[720px] lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-20">
          <div className="flex max-w-[520px] flex-col gap-6">
            <h2 id="qr-title" className={`${h2} reveal`}>
              내 차에 QR을 붙이면
              <br />
              찍은 사람이 내 차를 봐요
            </h2>
            <p className="reveal text-[17px] leading-[1.6] text-text-1 md:text-lg">
              차마다 프로필과 @ID가 생겨요. 앱이 없어도 웹에서 열리고, 스티커는 무료로 보내 드려요.
            </p>
            <span className="reveal w-fit rounded-full bg-white/10 px-4 py-2 text-[15px] text-text-1">곧 열려요</span>
          </div>
          <div
            data-ui
            className="reveal flex w-fit -rotate-4 items-center gap-4 rounded-[20px] bg-text-1 py-4 pr-7 pl-4 max-lg:order-first max-lg:self-start lg:gap-5 lg:py-5 lg:pr-9 lg:pl-5"
          >
            <div aria-hidden className="size-[96px] md:size-[140px] [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <span className="flex flex-col gap-1">
              <span className="text-[20px] font-bold text-bg md:text-[30px]">@m4.owner</span>
              <span className="font-logo text-[16px] text-accent-strong md:text-[24px]">IJIRI</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
