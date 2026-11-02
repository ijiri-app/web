import { BuildIndex } from "@/components/landing/BuildIndex";
import { InstallButton } from "@/components/landing/InstallButton";
import { Reveal } from "@/components/landing/Reveal";
import { QrBand, StageSections, button, focusRing } from "@/components/landing/Sections";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StoreButtons } from "@/components/landing/StoreButtons";
import { installQrSvg } from "@/lib/qr";

/* 구성: 분할 무대(첫 화면 + 기능 흐름) → 차종별 빌드 → 차량 QR → 받기 → 푸터 */

const nav = [
  { label: "기능", href: "#how" },
  { label: "차종별 빌드", href: "#builds" },
  { label: "차량 QR", href: "#qr" },
  { label: "받기", href: "#download" },
];

export default async function Home() {
  const qrSvg = await installQrSvg();

  const hero = (
    <section aria-labelledby="hero-title" className="relative flex flex-col lg:min-h-svh lg:snap-start">
      <header className="absolute inset-x-0 -top-[calc(58svh+24px)] z-20 flex h-[72px] items-center justify-end gap-7 px-6 md:-top-[calc(52svh+24px)] lg:static lg:px-12 xl:px-14">
        <nav aria-label="페이지 안내" className="hidden lg:block">
          <ul className="flex gap-6 text-[15px] whitespace-nowrap text-text-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={`rounded transition-colors hover:text-text-1 ${focusRing}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <InstallButton qrSvg={qrSvg} className={`${button} h-10 px-4 text-[15px]`}>
          설치하기
        </InstallButton>
      </header>

      {/* 워드마크(로고): 사진 아래쪽을 가로질러 오른쪽 여백에 붙는다 */}
      <svg
        aria-hidden
        viewBox="0 0 640 220"
        className="wordmark pointer-events-none order-first -mt-[11vw] w-full overflow-hidden px-5 text-text-1 select-none md:-mt-[9vw] md:px-12 lg:absolute lg:right-12 lg:bottom-10 lg:mt-0 lg:w-[min(66vw,calc(233svh-1000px))] lg:max-w-[1100px] lg:px-0 xl:right-14"
      >
        <text x="320" y="206" textAnchor="middle" fontSize="290" fill="currentColor" style={{ fontFamily: "var(--font-fugaz)", letterSpacing: "-0.04em" }}>
          IJIRI
        </text>
      </svg>

      <div className="flex flex-col gap-8 px-5 pt-8 pb-4 md:px-12 lg:absolute lg:top-[20%] lg:px-12 lg:pt-0 lg:pb-0 xl:px-14">
        <div className="flex flex-col gap-5">
          <h1 id="hero-title" className="text-[30px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[44px]">
            <span className="whitespace-nowrap">등업 없이 바로 보는</span>
            <br />
            튜닝 레퍼런스
          </h1>
          <p className="text-[17px] leading-[1.6] text-text-2 lg:max-w-[26ch] md:text-[22px] md:leading-[1.5]">
            오너들이 실제로 단 부품을 사진 위 태그로, 차종별로 모았어요.
          </p>
        </div>
        <div>
          <InstallButton qrSvg={qrSvg} className={button}>
            앱 설치하기
          </InstallButton>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <main id="top">
        <StageSections hero={hero} />
        <BuildIndex />
        <QrBand qrSvg={qrSvg} />

        {/* 받기: 거의 빈 화면에 한 문장과 버튼 하나 */}
        <section id="download" aria-labelledby="download-title" className="scroll-mt-6 bg-bg-deep lg:snap-start">
          <div className="flex flex-col px-5 pt-[20svh] pb-[14svh] md:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-[72px] lg:pt-[28svh] lg:pb-[20svh]">
            <div className="flex flex-col">
              <h2 id="download-title" className="reveal max-w-[34ch] text-[18px] leading-[1.5] font-normal text-text-1 md:text-[22px]">
                Android부터 먼저 나와요. 설치하기를 누르면 내 폰에 맞는 스토어로 바로 데려다 드려요.
              </h2>
              <div className="reveal mt-6 flex flex-col gap-8">
                <div>
                  <InstallButton qrSvg={qrSvg} className={button}>
                    설치하기
                  </InstallButton>
                </div>
                <StoreButtons />
              </div>
            </div>
            <figure className="reveal hidden flex-col items-center gap-4 lg:flex">
              <div
                role="img"
                aria-label="이지리 설치 페이지 QR 코드"
                className="size-[220px] rounded-[14px] bg-white p-4 [&>svg]:size-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <figcaption className="text-[15px] text-text-2">폰 카메라로 찍으면 맞는 스토어로 가요</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Reveal />
    </>
  );
}
