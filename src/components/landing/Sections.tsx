import { CarPhoto } from "./CarPhoto";
import { SplitStage, type Step } from "./Journey";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, NotificationScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { unsplash } from "./data";

/* 타입 단계: 13 / 17·18 / 22·24 / 30·44 / 워드마크 */
export const h2 = "text-[30px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[44px]";
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
export const button = `inline-flex h-12 items-center justify-center rounded-[14px] bg-accent-strong px-5 text-[17px] font-bold transition-[filter,scale] hover:brightness-110 active:scale-[0.97] ${focusRing}`;

const steps: Step[] = [
  {
    id: "start",
    lead: "관심 차종",
    body: "고른 차종의 빌드만 보여 줘요.",
    screen: <InterestScreen />,
  },
  {
    id: "feed",
    lead: "차종별 피드",
    body: "같은 차 오너들의 튜닝을 나란히 비교해요.",
    screen: <FeedScreen />,
  },
  {
    id: "capsule",
    lead: "부품 태그",
    body: "사진 위에 달린 부품이 바로 떠요.",
    screen: <PostScreen />,
  },
  {
    id: "wishlist",
    lead: "담기 알림",
    body: "내 부품을 몇 명이 담았는지 알려 줘요.",
    screen: <NotificationScreen />,
  },
  {
    id: "search",
    lead: "통합 검색",
    body: "차종, 부품, 브랜드로 한 번에 찾아요.",
    screen: <SearchScreen />,
  },
  {
    id: "upload",
    lead: "1분 업로드",
    body: "사진에 부품 태그만 달면 끝이에요.",
    screen: <PickScreen />,
  },
  {
    id: "safe",
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

export function QrBand({ qrSvg }: { qrSvg: string }) {
  return (
    <section id="qr" aria-labelledby="qr-title" className="scroll-mt-6 bg-accent lg:snap-center">
      <div className="grid items-center gap-8 px-5 py-20 md:px-12 lg:grid-cols-[1fr_560px] lg:gap-[96px] lg:px-[72px] lg:py-32">
        <div className="flex flex-col gap-6">
          <h2 id="qr-title" className={`${h2} reveal text-white`}>
            내 차에 QR을 붙이면
            <br />
            찍은 사람이 내 차를 봐요
          </h2>
          <p className="reveal max-w-[460px] text-[17px] leading-[1.6] text-white md:text-lg">
            차마다 프로필과 @ID가 생겨요. 스티커를 찍으면 앱이 없어도 웹에서 열리고, 스티커는 무료로 보내 드려요. 차량 QR은 곧 열려요.
          </p>
        </div>

        <div className="reveal relative aspect-[350/270] overflow-hidden rounded-[14px] lg:aspect-[560/420]">
          <CarPhoto src={unsplash("qEXp4K4Y8t4", 1120)} alt="QR 스티커를 붙인 차" className="size-full" />
          <div data-ui className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-4 items-center gap-3 rounded-2xl bg-text-1 py-3 pr-5 pl-3 md:gap-4 md:py-4 md:pr-7 md:pl-4">
            <div aria-hidden className="size-[76px] md:size-[120px] [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <span className="flex flex-col gap-1">
              <span className="text-lg font-bold text-bg md:text-[27px]">@m4.owner</span>
              <span className="font-logo text-[15px] text-accent-strong md:text-[22px]">IJIRI</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
