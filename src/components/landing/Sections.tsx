import { CarPhoto } from "./CarPhoto";
import { Journey, type Step } from "./Journey";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { unsplash } from "./data";

/* Figma: 이지리 > Web > Landing / Desktop 1440, Mobile 390 > Journey, QR Band */

const h2 = "text-[30px] leading-[1.24] font-bold tracking-[-0.03em] md:text-[52px]";

const steps: Step[] = [
  {
    id: "start",
    title: <>관심 차종만 고르면<br />바로 구경해요</>,
    body: "가입하지 않아도 돼요. 여러 대를 골라도 되고, 나중에 언제든 바꿀 수 있어요.",
    screen: <InterestScreen />,
  },
  {
    id: "feed",
    title: <>내 차종 오너들이<br />뭘 달았는지 한눈에</>,
    body: "2열로 나란히 놓고 비교해요. 데일리, 서킷, 스탠스, VIP처럼 빌드 방향으로 한 번 더 걸러 봐요.",
    screen: <FeedScreen />,
  },
  {
    id: "capsule",
    title: <>폰 뒷면을 톡,<br />사진 위에 부품이 떠요</>,
    body: "사진을 보다가 폰 뒷면을 가볍게 두드리면 달린 부품이 한꺼번에 올라와요. 사진을 눌러도 똑같이 볼 수 있어요.",
    screen: <PostScreen />,
  },
  {
    id: "wishlist",
    title: <>마음에 든 부품은<br />담아 두세요</>,
    body: "담은 부품은 마이에 모여요. 내 게시물의 부품을 누가 담으면 몇 명이 담았는지 알려 드려요.",
    screen: <PostScreen />,
    alerts: true,
  },
  {
    id: "search",
    title: <>차종, 부품, 브랜드로<br />바로 찾아요</>,
    body: "최근 검색과 내 차종 오너들이 많이 찾는 부품도 함께 보여요.",
    screen: <SearchScreen />,
  },
  {
    id: "upload",
    title: <>사진 고르고<br />부품 태그까지 1분</>,
    body: "사진은 누른 순서대로 올라가요. 사진 위를 눌러 부품을 달고 분류만 고르면 끝이에요.",
    screen: <PickScreen />,
  },
  {
    id: "safe",
    title: <>번호판은 가리고,<br />위치는 지우고</>,
    body: "번호판은 폰 안에서 자동으로 찾아 가려요. 사진에 남은 위치 정보는 올리기 전에 지워요.",
    screen: <UploadScreen />,
  },
];

/** 사용 흐름 순서대로 기능을 설명한다. 데스크톱은 폰을 고정하고 문단에 맞춰 화면을 바꾼다 */
export function FeatureSections() {
  return <Journey steps={steps} titleClass={h2} />;
}

export function QrBand({ qrSvg }: { qrSvg: string }) {
  return (
    <section id="qr" className="bg-accent">
      <div className="mx-auto grid max-w-[1160px] items-center gap-7 px-5 py-[72px] md:grid-cols-[1fr_520px] md:gap-[100px] md:px-0 md:py-[120px]">
        <h2 className={`${h2} text-white max-md:text-[28px] md:self-end md:text-[44px]`}>
          <span className="whitespace-nowrap">내 차에 QR을 붙이면</span>
          <br />
          <span className="whitespace-nowrap">찍은 사람이 내 차를 봐요</span>
        </h2>

        <div className="relative aspect-[350/270] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-10px_rgba(0,13,77,0.45)] md:row-span-2 md:aspect-[520/400]">
          <CarPhoto src={unsplash("qEXp4K4Y8t4", 1040)} alt="QR 스티커를 붙인 차" className="size-full" />
          <div aria-hidden className="absolute inset-0 bg-bg-deep/25" />
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-4 items-center gap-3 rounded-2xl bg-text-1 py-3 pr-5 pl-3 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] md:gap-4 md:py-4 md:pr-7 md:pl-4">
            <div aria-hidden className="size-[76px] md:size-[120px] [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <span className="flex flex-col gap-1">
              <span className="text-lg font-bold text-bg md:text-[27px]">@m4.owner</span>
              <span className="font-logo text-[15px] text-accent md:text-[22px]">IJIRI</span>
            </span>
          </div>
        </div>

        <p className="max-w-[440px] text-base leading-[1.65] text-white/90 md:self-start md:text-[19px]">
          차마다 프로필과 @ID가 생겨요. 스티커를 찍으면 앱이 없어도 웹에서 열리고, 스티커는 무료로 보내 드려요.
          차량 QR은 곧 열려요.
        </p>
      </div>
    </section>
  );
}
