import Link from "next/link";
import { SiteFooter } from "@/components/landing/SiteFooter";

/* 이용약관, 개인정보처리방침, 계정 삭제 안내가 함께 쓰는 문서 화면 */

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const docs = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/account-deletion", label: "계정 삭제 안내" },
];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function LegalPage({
  current,
  title,
  effective,
  intro,
  sections,
}: {
  current: string;
  title: string;
  effective: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="sticky top-0 z-20 bg-bg-deep/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-6 px-5 md:px-12 lg:px-[72px]">
          <Link href="/" aria-label="이지리 홈" className={`rounded font-logo text-[22px] leading-none ${focusRing}`}>
            IJIRI
          </Link>
          <nav aria-label="정책 문서">
            <ul className="flex gap-1 text-[15px]">
              {docs.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    aria-current={d.href === current ? "page" : undefined}
                    className={`block rounded-full px-3 py-2 whitespace-nowrap transition-colors max-md:px-2.5 ${d.href === current ? "bg-surface-2 text-text-1" : "text-text-3 hover:text-text-1"} ${focusRing}`}
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="bg-bg-deep px-5 pt-14 pb-24 md:px-12 lg:px-[72px] lg:pt-20 lg:pb-32">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.03em] md:text-[40px]">{title}</h1>
            <p className="mt-3 text-[15px] text-text-3">시행일 {effective}</p>
            <nav aria-label="목차" className="mt-8 hidden lg:block">
              <ol className="flex flex-col gap-2.5 text-[15px] text-text-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={`rounded transition-colors hover:text-text-1 ${focusRing}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="legal max-w-[720px]">
            <div className="rounded-[20px] bg-surface-1 p-6 text-[17px] leading-[1.75] text-text-1 md:p-8">{intro}</div>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-14 scroll-mt-24">
                <h2 className="text-[22px] leading-[1.4] font-bold md:text-[24px]">{s.title}</h2>
                <div className="mt-4">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
