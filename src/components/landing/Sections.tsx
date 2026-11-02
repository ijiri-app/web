import { CarPhoto } from "./CarPhoto";
import { SplitStage, type Step } from "./Journey";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { unsplash } from "./data";

/* 타입 단계: 13 / 17·18 / 22·24 / 30·44 / 워드마크 */
export const h2 = "text-[30px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[44px]";
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
export const button = `inline-flex h-12 items-center justify-center rounded-[14px] bg-accent-strong px-5 text-[17px] font-bold transition-[filter,scale] hover:brightness-110 active:scale-[0.97] ${focusRing}`;

const alerts = [
  { body: "RAYS TE37을 3명이 담아 갔어요", time: "지금" },
  { body: "오늘 내 부품을 12명이 담아 갔어요", time: "어제" },
];

/** 담기 알림 조각 */
function Alerts() {
  return (
    <ul data-ui aria-label="담기 알림 예시" className="reveal flex flex-col gap-2.5 rounded-[14px] bg-surface-1 p-5">
      {alerts.map((a, i) => (
        <li key={a.body} className={`flex items-center gap-3 rounded-[18px] bg-surface-3 px-3.5 py-3.5 ${i ? "opacity-70" : ""}`}>
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white font-logo text-[12px] leading-none text-black">
            IJIRI
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-bold">이지리</span>
            <span className="text-[13px] text-text-2">{a.body}</span>
          </span>
          <span className="text-xs text-text-3">{a.time}</span>
        </li>
      ))}
    </ul>
  );
}

const steps: Step[] = [
  {
    id: "start",
    lead: "처음 열면",
    body: "관심 차종만 고르고 바로 구경해요. 가입은 필요 없고, 여러 대를 골라도 되고, 나중에 언제든 바꿀 수 있어요.",
    screen: <InterestScreen />,
    crop: 186,
  },
  {
    id: "feed",
    lead: "피드에서는",
    body: "내 차종 오너들이 뭘 달았는지 2열로 나란히 비교해요. 데일리, 서킷, 스탠스, VIP처럼 빌드 방향으로 한 번 더 걸러 봐요.",
    screen: <FeedScreen />,
    crop: 90,
  },
  {
    id: "capsule",
    lead: "사진을 보다가",
    body: "폰 뒷면을 가볍게 두 번 두드리면 사진 위에 달린 부품이 한꺼번에 떠요. 사진을 눌러도 똑같이 볼 수 있어요.",
    screen: <PostScreen />,
    crop: 0,
  },
  {
    id: "wishlist",
    lead: "마음에 든 부품은",
    body: "담아 두면 마이에 모여요. 내 게시물의 부품을 누가 담으면 몇 명이 담았는지 알려 드려요.",
    screen: <PostScreen />,
    evidence: <Alerts />,
  },
  {
    id: "search",
    lead: "찾을 때는",
    body: "차종, 부품, 브랜드 어느 쪽으로든 검색해요. 최근 검색과 내 차종 오너들이 많이 찾는 부품도 함께 보여요.",
    screen: <SearchScreen />,
    crop: 330,
  },
  {
    id: "upload",
    lead: "내 차를 올릴 땐",
    body: "사진을 누른 순서대로 고르고, 사진 위를 눌러 부품을 단 다음 분류만 고르면 끝이에요. 1분이면 충분해요.",
    screen: <PickScreen />,
    crop: 360,
  },
  {
    id: "safe",
    lead: "올리기 전에",
    body: "번호판은 폰 안에서 자동으로 찾아 가리고, 사진에 남은 위치 정보는 지워요.",
    screen: <UploadScreen />,
    crop: 30,
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
          앱을 열면 이렇게 흘러가요
        </h2>
      }
    />
  );
}

export function QrBand({ qrSvg }: { qrSvg: string }) {
  return (
    <section id="qr" aria-labelledby="qr-title" className="scroll-mt-6 bg-accent">
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
