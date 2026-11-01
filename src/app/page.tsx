import { FeedShowcase } from "@/components/landing/FeedShowcase";
import { HeroPhoto } from "@/components/landing/HeroPhoto";
import { InstallButton } from "@/components/landing/InstallButton";
import { QrStickerSection, UploadSection, WishlistSection } from "@/components/landing/Sections";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StoreButtons } from "@/components/landing/StoreButtons";
import { installQrSvg } from "@/lib/qr";

/* Figma: 이지리 > Web > Landing / Desktop 1440 (node 502:678), Landing / Mobile 390 (node 526:218) */

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default async function Home() {
  const qrSvg = await installQrSvg();

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-5 md:px-0">
          <a href="#top" aria-label="이지리 홈" className={`rounded font-logo text-2xl leading-none ${focusRing}`}>
            IJIRI
          </a>
          <InstallButton
            qrSvg={qrSvg}
            className={`flex h-10 items-center rounded-[10px] bg-white/10 px-[18px] text-[15px] font-bold backdrop-blur-md hover:bg-white/15 ${focusRing}`}
          >
            설치하기
          </InstallButton>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-deep md:h-[900px]">
          <div className="relative aspect-[4/5] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[68%]">
            <HeroPhoto />
          </div>
          <div className="pointer-events-none relative mx-auto flex max-w-[1160px] flex-col gap-10 px-5 pt-2 pb-16 md:h-full md:justify-center md:px-0 md:pt-0 md:pb-0">
            <div className="flex flex-col gap-[22px]">
              <h1 className="text-[40px] leading-[1.16] font-bold tracking-[-0.03em] md:text-[68px]">
                <span className="whitespace-nowrap">등업 없이 바로 보는</span>
                <br />
                튜닝 레퍼런스
              </h1>
              <p className="text-[17px] text-text-2 md:text-[19px]">오너들이 실제로 단 부품을 차종별로 모았어요</p>
            </div>
            <div className="pointer-events-auto">
              <InstallButton
                qrSvg={qrSvg}
                className={`inline-flex h-14 w-full items-center justify-center rounded-xl bg-accent-strong text-[19px] font-bold hover:brightness-110 md:w-[220px] ${focusRing}`}
              >
                앱 설치하기
              </InstallButton>
            </div>
          </div>
        </section>

        {/* Feed */}
        <section id="feed" className="bg-[#161a20]">
          <FeedShowcase />
        </section>

        <UploadSection />
        <WishlistSection />
        <QrStickerSection qrSvg={qrSvg} />

        {/* Download */}
        <section id="download" className="scroll-mt-4 bg-bg-deep">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-12 px-5 py-24 md:flex-row md:items-center md:justify-between md:px-0 md:py-32">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-[36px] leading-[1.25] font-bold tracking-[-0.02em] md:text-[48px]">이지리 받기</h2>
                <p className="text-[17px] text-text-2 md:text-lg">Android 먼저 나와요</p>
              </div>
              <StoreButtons />
            </div>
            <div className="hidden flex-col items-center gap-3.5 md:flex">
              <div
                role="img"
                aria-label="이지리 설치 페이지 QR 코드"
                className="size-[184px] rounded-[20px] bg-white p-4 [&>svg]:size-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <span className="text-sm text-text-3">찍으면 맞는 스토어로 가요</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
