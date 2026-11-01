import { CarPhoto } from "./CarPhoto";
import { FeedScreen } from "./FeedScreen";
import { InterestScreen, PickScreen, SearchScreen } from "./MoreScreens";
import { PostScreen } from "./PostScreen";
import { UploadScreen } from "./UploadScreen";
import { unsplash } from "./data";

/* Figma: 이지리 > Web > Landing / Desktop 1440·Mobile 390 > Feature / *, QR Band */

const h2 = "text-[30px] leading-[1.24] font-bold tracking-[-0.03em] md:text-[52px]";

/** 폰 틀. 360×760 화면을 데스크톱은 그대로, 모바일은 0.85배로 담는다 */
function Device({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 rounded-[44px] border border-line-strong bg-surface-4 p-1 shadow-[0_40px_90px_-20px_rgba(0,5,25,0.7)] md:rounded-[54px] md:p-[5px]">
      <div className="relative h-[646px] w-[306px] overflow-hidden rounded-[40px] bg-black md:h-[760px] md:w-[360px] md:rounded-[49px]">
        <div className="origin-top-left scale-[0.85] md:scale-100">{children}</div>
        <span aria-hidden className="absolute top-2.5 left-1/2 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black md:top-3 md:h-7 md:w-[92px]" />
      </div>
    </div>
  );
}

function Copy({ tag, title, body, center = false }: { tag: string; title: React.ReactNode; body: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 md:gap-6 ${center ? "md:items-center md:text-center" : ""}`}>
      <span className="text-[15px] font-bold text-[#5b8bff] md:text-[17px]">{tag}</span>
      <h2 className={h2}>{title}</h2>
      <p className="max-w-[460px] text-base leading-[1.6] text-text-2 md:text-[19px]">{body}</p>
    </div>
  );
}

type Feature = { id: string; tag: string; title: React.ReactNode; body: string; screen: React.ReactNode };

const features: Feature[] = [
  {
    id: "start",
    tag: "시작",
    title: <>관심 차종만 고르면<br />바로 구경해요</>,
    body: "가입하지 않아도 돼요. 여러 대를 골라도 되고, 나중에 언제든 바꿀 수 있어요.",
    screen: <InterestScreen />,
  },
  {
    id: "feed",
    tag: "피드",
    title: <>내 차종 오너들이<br />뭘 달았는지 한눈에</>,
    body: "2열로 나란히 놓고 비교해요. 데일리, 서킷, 스탠스, VIP처럼 빌드 방향으로 한 번 더 걸러 봐요.",
    screen: <FeedScreen />,
  },
  {
    id: "capsule",
    tag: "부품 캡슐",
    title: <>폰 뒷면을 톡,<br />사진 위에 부품이 떠요</>,
    body: "사진을 보다가 폰 뒷면을 가볍게 두드리면 달린 부품이 한꺼번에 올라와요. 사진을 눌러도 똑같이 볼 수 있어요.",
    screen: <PostScreen />,
  },
];

const features2: Feature[] = [
  {
    id: "search",
    tag: "검색",
    title: <>차종, 부품, 브랜드로<br />바로 찾아요</>,
    body: "최근 검색과 내 차종 오너들이 많이 찾는 부품도 함께 보여요.",
    screen: <SearchScreen />,
  },
  {
    id: "upload",
    tag: "올리기",
    title: <>사진 고르고<br />부품 태그까지 1분</>,
    body: "사진은 누른 순서대로 올라가요. 사진 위를 눌러 부품을 달고 분류만 고르면 끝이에요.",
    screen: <PickScreen />,
  },
  {
    id: "safe",
    tag: "안심",
    title: <>번호판은 가리고,<br />위치는 지우고</>,
    body: "번호판은 폰 안에서 자동으로 찾아 가려요. 사진에 남은 위치 정보는 올리기 전에 지워요.",
    screen: <UploadScreen />,
  },
];

function FeatureRow({ f, index }: { f: Feature; index: number }) {
  const flip = index % 2 === 1;
  return (
    <section id={f.id} className={index % 2 === 0 ? "bg-bg" : "bg-bg-deep"}>
      <div className="mx-auto flex max-w-[1160px] flex-col gap-9 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-0 md:py-[120px]">
        <div className={flip ? "md:order-2" : ""}>
          <Copy tag={f.tag} title={f.title} body={f.body} />
        </div>
        <div className={`flex justify-center ${flip ? "md:order-1" : ""}`}>
          <Device>{f.screen}</Device>
        </div>
      </div>
    </section>
  );
}

const alerts = [
  { body: "RAYS TE37을 3명이 담아 갔어요", time: "지금", fade: "" },
  { body: "오늘 내 부품을 12명이 담아 갔어요", time: "어제", fade: "opacity-65" },
];

function WishlistFeature() {
  return (
    <section id="wishlist" className="bg-bg-deep">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-9 px-5 py-20 md:items-center md:gap-14 md:px-0 md:py-[140px]">
        <Copy
          center
          tag="담기"
          title={<>마음에 든 부품은<br />담아 두세요</>}
          body="담은 부품은 마이에 모여요. 내 게시물의 부품을 누가 담으면 몇 명이 담았는지 알려 드려요."
        />
        <ul aria-label="담기 알림 예시" className="flex w-full flex-col gap-2.5 md:w-[520px] md:gap-3">
          {alerts.map((a) => (
            <li key={a.body} className={`flex items-center gap-3 rounded-[20px] bg-surface-3 px-3.5 py-3.5 md:gap-3.5 md:rounded-[22px] md:px-[18px] md:py-4 ${a.fade}`}>
              <span aria-hidden className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-white font-logo text-[11px] leading-none text-black md:size-11 md:text-[13px]">
                IJIRI
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-bold md:text-base">이지리</span>
                <span className="text-[13px] text-text-2 md:text-[15px]">{a.body}</span>
              </span>
              <span className="text-xs text-text-3 md:text-[13px]">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 기능 설명 섹션들. 순서는 Figma와 같다 */
export function FeatureSections() {
  return (
    <>
      {features.map((f, i) => (
        <FeatureRow key={f.id} f={f} index={i} />
      ))}
      <WishlistFeature />
      {features2.map((f, i) => (
        <FeatureRow key={f.id} f={f} index={i} />
      ))}
    </>
  );
}

export function QrBand({ qrSvg }: { qrSvg: string }) {
  return (
    <section id="qr" className="bg-accent">
      <div className="mx-auto grid max-w-[1160px] items-center gap-7 px-5 py-[72px] md:grid-cols-[1fr_520px] md:gap-[100px] md:px-0 md:py-[120px]">
        <div className="flex flex-col gap-2.5 md:gap-3.5">
          <span className="text-sm font-bold text-white/75 md:text-base">곧 나와요</span>
          <h2 className={`${h2} text-white max-md:text-[28px] md:text-[44px]`}>
            <span className="whitespace-nowrap">내 차에 QR을 붙이면</span>
            <br />
            <span className="whitespace-nowrap">찍은 사람이 내 차를 봐요</span>
          </h2>
        </div>

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

        <ul className="flex flex-col gap-2.5 text-base font-medium text-white md:gap-3.5 md:text-[19px]">
          {["차마다 프로필과 @ID", "앱이 없어도 웹에서 열려요", "스티커는 무료로 보내 드려요"].map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 bg-white" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

