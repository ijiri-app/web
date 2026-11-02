import { BuildIndex } from "@/components/landing/BuildIndex";
import { InstallButton } from "@/components/landing/InstallButton";
import { Reveal } from "@/components/landing/Reveal";
import { QrBand, StageSections, button, focusRing } from "@/components/landing/Sections";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StoreButtons } from "@/components/landing/StoreButtons";
import { installQrSvg } from "@/lib/qr";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/brand";
import { contact, SITE_URL } from "@/lib/stores";

/* 구성: 분할 무대(첫 화면 + 기능 흐름) → 차종별 빌드 → 차량 QR → 받기 → 푸터 */

const nav = [
  { label: "기능", href: "#how" },
  { label: "차종별 빌드", href: "#builds" },
  { label: "차량 QR", href: "#qr" },
  { label: "받기", href: "#download" },
];

/* 검색엔진과 생성형 AI 검색이 읽는 구조화 데이터 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      alternateName: "IJIRI",
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      email: contact.email,
      sameAs: contact.instagram ? [contact.instagram] : [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "MobileApplication",
      name: SITE_NAME,
      alternateName: "IJIRI",
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      operatingSystem: "Android",
      applicationCategory: "LifestyleApplication",
      inLanguage: "ko-KR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      publisher: { "@id": `${SITE_URL}/#org` },
      featureList: [
        "차종별 튜닝 피드",
        "사진 위 부품 태그",
        "부품 담기와 담기 알림",
        "차종, 부품, 브랜드 통합 검색",
        "사진 위치 정보 자동 삭제",
        "번호판 자동 가림",
      ],
    },
  ],
};

export default async function Home() {
  const qrSvg = await installQrSvg();

  const hero = (
    <section aria-labelledby="hero-title" className="relative flex flex-col lg:min-h-svh lg:snap-start">
      <header className="absolute inset-x-0 -top-[calc(min(54svh,100svh-400px)+84px)] z-20 flex h-[72px] items-center justify-between gap-7 px-6 md:-top-[calc(52svh+84px)] lg:static lg:px-12 xl:px-14">
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
          <p className="text-[17px] leading-[1.6] text-balance text-text-2 md:text-[22px] md:leading-[1.5] lg:max-w-[28ch]">
            오너들이 실제로 단 부품을 <span className="whitespace-nowrap">사진 위 태그로,</span> 차종별로 모았어요.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <InstallButton qrSvg={qrSvg} className={`${button} h-14 px-7 text-[18px]`}>
              앱 설치하기
            </InstallButton>
          </div>
          <p className="text-[15px] text-text-3">Android 먼저 나와요. iPhone은 준비 중이에요.</p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
