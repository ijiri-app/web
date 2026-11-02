import { ArrowRight } from "lucide-react";
import { BuildIndex } from "@/components/landing/BuildIndex";
import { InstallButton } from "@/components/landing/InstallButton";
import { Reveal } from "@/components/landing/Reveal";
import { QrBand, StageSections, button, focusRing } from "@/components/landing/Sections";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StoreButtons } from "@/components/landing/StoreButtons";
import { installQrSvg } from "@/lib/qr";

/* 구성: 분할 무대(첫 화면 + 기능 흐름) → 차종별 빌드 → 차량 QR → 받기 → 푸터 */

const heroFacts = [
  ["가입 없이", "바로 구경"],
  ["사진 위", "부품 태그"],
  ["번호판", "자동 가림"],
  ["Android", "먼저 출시"],
];

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
      <header className="absolute inset-x-0 -top-[calc(58svh+24px)] z-20 flex h-[72px] items-center justify-between gap-7 px-6 md:-top-[calc(52svh+24px)] lg:static lg:px-12 xl:px-14">
        <a href="#top" aria-label="이지리 홈" className={`rounded font-logo text-[24px] leading-none ${focusRing}`}>
          IJIRI
        </a>
        <div className="flex items-center gap-7">
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
        </div>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-10 px-5 pt-10 pb-8 md:px-12 lg:px-12 lg:pt-0 lg:pb-0 xl:px-14">
        <div className="flex flex-col gap-6">
          <h1 id="hero-title" className="text-[36px] leading-[1.12] font-bold tracking-[-0.035em] md:text-[56px] xl:text-[64px]">
            <span className="whitespace-nowrap">등업 없이 바로 보는</span>
            <br />
            튜닝 레퍼런스
          </h1>
          <p className="text-[17px] leading-[1.6] text-text-2 md:text-[22px] md:leading-[1.5] lg:max-w-[28ch]">
            오너들이 실제로 단 부품을 사진 위 태그로, 차종별로 모았어요.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <InstallButton qrSvg={qrSvg} className={`${button} h-14 px-7 text-[18px]`}>
            앱 설치하기
          </InstallButton>
          <a href="#how" className={`group inline-flex h-14 items-center gap-2 rounded-[14px] px-5 text-[17px] text-text-1 hover:bg-white/5 ${focusRing}`}>
            기능 보기
            <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* 아래 정보 줄: 이지리가 다른 커뮤니티와 다른 점 */}
      <ul className="mx-5 mb-5 grid grid-cols-2 gap-y-6 rounded-[20px] bg-surface-1 p-6 md:mx-12 lg:mx-12 lg:mb-8 lg:grid-cols-4 lg:gap-6 lg:p-7 xl:mx-14">
        {heroFacts.map(([a, b]) => (
          <li key={a} className="flex flex-col gap-1">
            <span className="text-[17px] font-bold md:text-[19px]">{a}</span>
            <span className="text-[15px] text-text-3">{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      <main id="top">
        <StageSections hero={hero} />
        <BuildIndex />
        <QrBand qrSvg={qrSvg} />

        {/* 받기: 이지리 블루 면 위에 큰 제목 하나와 버튼 */}
        <section id="download" aria-labelledby="download-title" className="scroll-mt-6 bg-bg-deep px-3 pb-3 md:px-6 md:pb-6 lg:snap-start">
          <div className="flex flex-col items-center gap-8 rounded-[28px] bg-accent px-5 py-24 text-center md:px-12 lg:py-36">
            <h2 id="download-title" className="reveal text-[40px] leading-[1.1] font-bold tracking-[-0.04em] text-white md:text-[72px]">
              등업 없이,
              <br />
              지금 바로.
            </h2>
            <p className="reveal text-[17px] leading-[1.6] text-white md:text-[22px]">Android부터 먼저 나와요.</p>
            <div className="reveal flex flex-col items-center gap-6">
              <InstallButton
                qrSvg={qrSvg}
                className={`inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-[17px] font-bold text-black transition-[scale,filter] hover:brightness-95 active:scale-[0.97] ${focusRing}`}
              >
                앱 설치하기
              </InstallButton>
              <StoreButtons className="justify-center" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Reveal />
    </>
  );
}
