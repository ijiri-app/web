import { CarPhoto } from "./CarPhoto";
import { Phone } from "./Phone";
import { UploadScreen } from "./UploadScreen";
import { unsplash } from "./data";

/* Figma: Landing / Desktop 1440 > Upload, Wishlist, QR Sticker (기능명세서 U-01~04, W-01·N-02, CP-01·QR-01·ST-01) */

const h2 = "text-[30px] leading-[1.25] font-bold tracking-[-0.02em] md:text-[48px]";

function Points({ items }: { items: [string, string][] }) {
  return (
    <ul className="flex flex-col gap-4 md:gap-5">
      {items.map(([title, body]) => (
        <li key={title} className="flex flex-col gap-1 border-t border-surface-4 pt-4 md:pt-5">
          <span className="text-base font-bold md:text-lg">{title}</span>
          <span className="text-sm text-text-3 md:text-base">{body}</span>
        </li>
      ))}
    </ul>
  );
}

export function UploadSection() {
  return (
    <section className="bg-bg-deep">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 py-20 md:grid-cols-[1fr_auto] md:gap-[120px] md:px-0 md:py-32">
        <div className="flex flex-col gap-7 max-md:contents md:gap-10">
          <h2 className={`${h2} max-md:order-1`}>
            사진 올리고
            <br />
            부품 태그까지 1분
          </h2>
          <div className="max-md:order-3">
            <Points
              items={[
                ["사진 위를 눌러 부품 태그", "익스테리어, 인테리어, 파워트레인, 하체로 나눠 달아요"],
                ["번호판은 폰에서 가려요", "자동으로 찾고, 직접 고칠 수도 있어요"],
                ["위치 정보는 올리기 전에 지워요", "사진에 남은 GPS 기록이 밖으로 나가지 않아요"],
              ]}
            />
          </div>
        </div>
        <Phone label="번호판 가리기 화면" baseYaw={-0.3} className="mx-auto max-md:order-2 max-md:h-[700px]">
          <UploadScreen />
        </Phone>
      </div>
    </section>
  );
}

const alerts = [
  { body: "RAYS TE37을 3명이 담아 갔어요", time: "지금", fade: "" },
  { body: "오늘 내 부품을 12명이 담아 갔어요", time: "어제", fade: "opacity-60" },
  { body: "HKS 하이파워 머플러를 처음 담아 갔어요", time: "3일 전", fade: "opacity-30" },
];

export function WishlistSection() {
  return (
    <section className="bg-[#161a20]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-7 px-5 py-20 md:items-center md:gap-14 md:px-0 md:py-32 md:text-center">
        <h2 className={`${h2} max-md:text-[26px]`}>
          <span className="whitespace-nowrap">마음에 든 부품은 담아 두고,</span>
          <br />
          <span className="whitespace-nowrap">내 부품은 누가 담았는지 알아요</span>
        </h2>
        <ul aria-label="담기 알림 예시" className="flex w-full flex-col gap-2.5 md:w-[520px] md:gap-3">
          {alerts.map((a) => (
            <li key={a.body} className={`flex items-center gap-3 rounded-[20px] bg-surface-3 px-3.5 py-3.5 text-left md:gap-3.5 md:rounded-[22px] md:px-[18px] md:py-4 ${a.fade}`}>
              <span aria-hidden className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-accent font-logo text-[13px] md:size-11 md:text-[15px]">
                IJ
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-bold md:text-base">이지리</span>
                <span className="text-[13px] text-text-2 md:text-[15px]">{a.body}</span>
              </span>
              <span className="text-xs text-text-3 md:text-[13px]">{a.time}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-text-3 md:text-base">누가 담았는지는 보이지 않고 숫자만 알려줘요</p>
      </div>
    </section>
  );
}

export function QrStickerSection({ qrSvg }: { qrSvg: string }) {
  return (
    <section className="bg-bg-deep">
      <div className="mx-auto grid max-w-[1160px] items-center gap-7 px-5 py-20 md:grid-cols-[520px_1fr] md:gap-[120px] md:px-0 md:py-32">
        <div className="flex flex-col gap-3 md:order-2 md:gap-4 md:self-end">
          <span className="text-sm font-bold text-[#5b8bff] md:text-[15px]">곧 나와요</span>
          <h2 className={h2}>
            내 차에 QR을 붙이면
            <br />
            찍은 사람이 내 차를 봐요
          </h2>
        </div>

        <div className="relative aspect-[350/290] overflow-hidden rounded-[28px] md:order-1 md:row-span-2 md:aspect-[520/420]">
          <CarPhoto src={unsplash("qEXp4K4Y8t4", 1040)} alt="QR 스티커를 붙인 차" className="size-full" />
          <div aria-hidden className="absolute inset-0 bg-bg-deep/45" />
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-4 items-center gap-3 rounded-2xl bg-text-1 py-3 pr-5 pl-3 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] md:gap-3.5 md:py-3.5 md:pl-3.5">
            <div
              aria-hidden
              className="size-[76px] md:size-24 [&>svg]:size-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <span className="flex flex-col gap-1">
              <span className="text-lg font-bold text-bg md:text-[22px]">@m4.owner</span>
              <span className="font-logo text-[15px] text-accent md:text-lg">IJIRI</span>
            </span>
          </div>
        </div>

        <div className="md:order-3 md:self-start">
          <Points
            items={[
              ["차마다 프로필과 @ID", "게시물과 단 부품이 한곳에 모여요"],
              ["앱이 없어도 열려요", "찍으면 웹에서 바로 보고, 설치하면 그 차로 이어져요"],
              ["스티커는 무료로 보내 드려요", "게시물이 하나 이상인 차에 한 장씩"],
            ]}
          />
        </div>
      </div>
    </section>
  );
}
