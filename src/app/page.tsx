import { ArrowRight, Bookmark, Hand, LayoutGrid, Smartphone, Tags } from "lucide-react";
import { Glow } from "@/components/landing/Glow";
import { FeedPhone, PostPhone } from "@/components/landing/Phones";
import { carLines, partCategories, partColor } from "@/components/landing/data";

function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-logo leading-none text-text-1 ${className}`}>IJIRI</span>;
}

/** Figma CTA: #1C45F8 버튼 + 아래쪽 버튼 글로우 */
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent-strong px-8 text-xl font-semibold text-text-1 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        aria-hidden
        className="absolute -bottom-6 left-1/2 h-12 w-[200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(140,175,255,0.9),transparent)] blur-md"
      />
      <span className="relative">{children}</span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[13px] tracking-[0.2em] text-accent">{eyebrow}</span>
      <h2 className="text-[32px] leading-tight font-semibold text-text-1 md:text-[44px]">{title}</h2>
      <p className="max-w-[460px] text-[17px] leading-relaxed text-text-2">{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="이지리 홈">
            <Logo className="text-2xl" />
          </a>
          <nav aria-label="주 메뉴" className="hidden items-center gap-8 text-[15px] text-text-2 md:flex">
            <a href="#feed" className="hover:text-text-1">피드</a>
            <a href="#capsule" className="hover:text-text-1">부품 캡슐</a>
            <a href="#cars" className="hover:text-text-1">차종</a>
          </nav>
          <a
            href="#download"
            className="flex h-10 items-center rounded-lg bg-surface-2 px-4 text-[15px] font-semibold text-text-1 hover:bg-surface-3"
          >
            출시 소식
          </a>
        </div>
      </header>

      <main id="top">
        {/* 히어로 — Figma 01 Landing */}
        <section className="relative overflow-hidden pt-16">
          <Glow />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-[34vh] pb-20 md:grid-cols-[1.1fr_1fr] md:px-8 md:pt-28 md:pb-28">
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
                <div className="w-full md:w-auto [&>a]:w-full md:[&>a]:w-auto">
                  <PrimaryButton href="#download">출시 소식 보기</PrimaryButton>
                </div>
                <p className="flex items-center gap-2 text-[15px] text-text-2">
                  <Smartphone aria-hidden className="size-4" />
                  Android 먼저 나오고, iOS는 그다음이에요
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <FeedPhone />
            </div>
          </div>
        </section>

        {/* 피드 — Figma 07 Feed */}
        <section id="feed" className="scroll-mt-16 border-t border-surface-3 bg-bg">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
            <div className="md:hidden">
              <FeedPhone />
            </div>
            <div className="flex flex-col gap-10">
              <SectionTitle
                eyebrow="FEED"
                title={
                  <>
                    내 차종에 남들은
                    <br />
                    뭘 달았는지 한눈에
                  </>
                }
                desc="관심 차종을 고르면 그 차의 오너 게시물만 모아 보여줘요. 가입하지 않아도 바로 구경할 수 있어요."
              />
              <ul className="flex flex-col gap-3">
                {[
                  { Icon: LayoutGrid, title: "2열 벽돌형 피드", body: "여러 빌드를 나란히 놓고 비교하며 찾아요" },
                  { Icon: Tags, title: "빌드 방향 칩", body: "데일리, 서킷, 스탠스, VIP처럼 원하는 결로 걸러요" },
                  { Icon: Bookmark, title: "부품 담기", body: "마음에 드는 부품은 담아 두고 나중에 다시 봐요" },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-4 rounded-2xl bg-surface-2 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-lg font-medium text-text-1">{title}</span>
                      <span className="text-[15px] text-text-2">{body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <ul className="grid grid-cols-2 gap-3">
                {["데일리", "서킷", "스탠스", "VIP", "순정", "드래그"].map((chip, i) => (
                  <li
                    key={chip}
                    className={`flex h-24 items-end rounded-2xl p-5 text-2xl font-semibold ${i === 1 ? "bg-text-1 text-bg-deep" : "bg-surface-2 text-text-body"}`}
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 부품 캡슐 — Figma 08 Post Detail */}
        <section id="capsule" className="scroll-mt-16 bg-bg-deep">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
            <PostPhone />
            <div className="flex flex-col gap-10">
              <SectionTitle
                eyebrow="PART CAPSULE"
                title={
                  <>
                    폰 뒷면을 톡,
                    <br />
                    사진 위에 부품이 떠요
                  </>
                }
                desc="게시물 사진을 보다가 폰 뒷면을 가볍게 두드리면 달린 부품이 캡슐로 한꺼번에 올라와요. 사진을 눌러도 똑같이 볼 수 있어요."
              />
              <div className="flex items-center gap-3 text-[15px] text-text-2">
                <Hand aria-hidden className="size-5 text-accent" />
                보기 방식은 설정에서 뒷면 탭, 사진 탭, 둘 다 중에 고를 수 있어요
              </div>
              <div className="flex flex-col gap-5 rounded-2xl bg-surface-2 p-6">
                <span className="text-lg font-medium text-text-1">부품은 네 갈래로 정리돼요</span>
                {partCategories.map((cat) => (
                  <div key={cat.key} className="flex flex-col gap-2">
                    <span className="text-[15px] text-text-2">{cat.label}</span>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span key={item} className={`rounded-2xl px-3 py-1.5 text-[15px] text-white ${partColor[cat.key]}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 관심 차종 — Figma 02 Interest */}
        <section id="cars" className="scroll-mt-16 bg-bg">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-24 md:px-8 md:py-32">
            <SectionTitle
              eyebrow="CARS"
              title="이 차종부터 시작해요"
              desc="처음에는 네 계열에 집중해요. 아반떼 N 게시물부터 채우고 차종을 넓혀 갈게요."
            />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {carLines.map((car) => (
                <li key={car.name} className="flex min-h-44 flex-col justify-between gap-6 rounded-2xl bg-surface-2 p-6">
                  <span className="text-[13px] text-text-3">{car.brand}</span>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-semibold text-text-1">{car.name}</span>
                    <span className="text-[15px] text-text-2">{car.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 출시 CTA */}
        <section id="download" className="relative scroll-mt-16 overflow-hidden border-t border-surface-3">
          <Glow className="rotate-180 opacity-80" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-28 text-center md:px-8 md:py-40">
            <Logo className="text-5xl md:text-7xl" />
            <h2 className="text-[28px] leading-snug font-semibold text-text-1 md:text-[40px]">
              곧 Google Play에서 만나요
            </h2>
            <p className="max-w-md text-[17px] text-text-2">
              지금은 출시를 준비하고 있어요. 앱이 나오면 이 페이지에서 가장 먼저 알려 드릴게요.
            </p>
            <span
              aria-disabled="true"
              className="inline-flex h-[52px] cursor-not-allowed items-center gap-2 rounded-xl bg-surface-3 px-8 text-lg font-semibold text-text-2"
            >
              Google Play 출시 준비 중
              <ArrowRight aria-hidden className="size-5" />
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
          <span className="font-mono text-[11px]">© 2026 IJIRI</span>
        </div>
      </footer>
    </>
  );
}
