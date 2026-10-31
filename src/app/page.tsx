import { CapsuleStage } from "@/components/landing/CapsuleStage";
import { FeedScreen } from "@/components/landing/FeedScreen";
import { FeedShowcase } from "@/components/landing/FeedShowcase";
import { Glow } from "@/components/landing/Glow";
import { Phone } from "@/components/landing/Phone";
import { carLines } from "@/components/landing/data";

function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-logo leading-none text-text-1 ${className}`}>IJIRI</span>;
}

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="이지리 홈" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Logo className="text-2xl" />
          </a>
          <nav aria-label="주 메뉴" className="hidden items-center gap-8 text-[15px] text-text-2 md:flex">
            <a href="#capsule" className="hover:text-text-1">부품 캡슐</a>
            <a href="#feed" className="hover:text-text-1">피드</a>
            <a href="#cars" className="hover:text-text-1">차종</a>
          </nav>
          <a
            href="#download"
            className="flex h-10 items-center rounded-lg bg-surface-2 px-4 text-[15px] font-semibold text-text-1 hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            출시 소식
          </a>
        </div>
      </header>

      <main id="top">
        {/* 히어로: Figma 01 Landing */}
        <section className="relative overflow-hidden pt-16">
          <Glow />
          <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pt-[30vh] pb-16 md:grid-cols-[1.1fr_1fr] md:px-8 md:pt-16 md:pb-8">
            <div className="flex flex-col gap-14">
              <div className="flex flex-col gap-6">
                <Logo className="text-2xl" />
                <div className="flex flex-col gap-4">
                  <h1 className="text-[36px] leading-[1.15] font-normal text-text-1 md:text-[52px] lg:text-[60px]">
                    <span className="whitespace-nowrap">등업 없이 바로 보는</span>
                    <br />
                    <span className="whitespace-nowrap">
                      튜닝 레퍼런스 <span className="text-accent">이지리</span>
                    </span>
                  </h1>
                  <p className="text-[15px] text-text-2 md:text-lg">오너들이 실제로 단 부품을 차종별로 모았어요</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 md:items-start">
                <a
                  href="#capsule"
                  className="relative inline-flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-accent-strong px-8 text-xl font-semibold text-text-1 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:w-auto"
                >
                  <span
                    aria-hidden
                    className="absolute -bottom-6 left-1/2 h-12 w-[200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(140,175,255,0.9),transparent)] blur-md"
                  />
                  <span className="relative">어떻게 보이는지 보기</span>
                </a>
                <p className="text-[15px] text-text-2">Android 먼저 나오고, iOS는 그다음이에요</p>
              </div>
            </div>
            <Phone label="이지리 앱 피드 화면" className="mx-auto hidden md:block">
              <FeedScreen />
            </Phone>
          </div>
        </section>

        {/* 부품 캡슐: 이 페이지에서 가장 힘을 준 곳 */}
        <section id="capsule" className="scroll-mt-16 bg-bg-deep">
          <CapsuleStage />
        </section>

        {/* 피드: Figma 07 Feed */}
        <section id="feed" className="scroll-mt-16 bg-bg">
          <FeedShowcase />
        </section>

        {/* 관심 차종: Figma 02 Interest */}
        <section id="cars" className="scroll-mt-16 border-t border-surface-3 bg-bg">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1fr_2fr] md:px-8 md:py-32">
            <div className="flex flex-col gap-5">
              <h2 className="text-[32px] leading-tight font-semibold md:text-[44px]">이 차종부터 시작해요</h2>
              <p className="max-w-[360px] text-[17px] leading-relaxed text-text-2">
                처음에는 네 계열에 집중하고, 차종은 게시물이 쌓이는 대로 넓혀 갈게요.
              </p>
            </div>
            <ul className="flex flex-col">
              {carLines.map((car) => (
                <li
                  key={car.name}
                  className="grid gap-1 border-b border-surface-3 py-6 first:pt-0 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-text-3">{car.brand}</span>
                    <span className="text-[28px] leading-tight font-semibold text-text-1 md:text-[36px]">{car.name}</span>
                  </div>
                  <span className="text-[15px] text-text-2 md:text-right">{car.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 출시 안내 */}
        <section id="download" className="scroll-mt-16 bg-bg-deep">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-8 md:py-28">
            <div className="flex flex-col gap-4">
              <h2 className="text-[28px] leading-snug font-semibold md:text-[40px]">곧 Google Play에서 만나요</h2>
              <p className="max-w-md text-[17px] text-text-2">
                지금은 출시를 준비하고 있어요. 앱이 나오면 이 페이지에 바로 올려 둘게요.
              </p>
            </div>
            <span
              aria-disabled="true"
              className="inline-flex h-[52px] cursor-not-allowed items-center rounded-xl bg-surface-3 px-8 text-lg font-semibold text-text-2"
            >
              Google Play 출시 준비 중
            </span>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-3 bg-bg-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-[13px] text-text-3 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-col gap-2">
            <Logo className="text-lg" />
            <span>오너들이 실제로 단 튜닝 부품을 차종별로 모은 레퍼런스</span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="정책 안내(준비 중)">
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>계정 삭제 안내</li>
          </ul>
          <span>© 2026 IJIRI</span>
        </div>
      </footer>
    </>
  );
}
