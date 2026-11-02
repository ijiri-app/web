import { Mail } from "lucide-react";
import { siInstagram } from "simple-icons";
import { contact, liveUrl } from "@/lib/stores";

/* 푸터: 로고와 한 줄 소개, 메뉴 열, 아래 줄에 사업자 정보와 정책 */

type Link = { label: string; href: string | null; external?: boolean };

const columns: { title: string; links: Link[] }[] = [
  {
    title: "서비스",
    links: [
      { label: "기능", href: "#how" },
      { label: "차종별 빌드", href: "#builds" },
      { label: "차량 QR", href: "#qr" },
      { label: "앱 받기", href: "#download" },
    ],
  },
  {
    title: "앱 받기",
    links: [
      { label: liveUrl("googlePlay") ? "Google Play" : "Google Play 출시 예정", href: liveUrl("googlePlay"), external: true },
      { label: liveUrl("oneStore") ? "원스토어" : "원스토어 출시 예정", href: liveUrl("oneStore"), external: true },
      { label: liveUrl("appStore") ? "App Store" : "App Store 출시 예정", href: liveUrl("appStore"), external: true },
    ],
  },
  {
    title: "문의",
    links: [
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: "@ijiri_car", href: contact.instagram, external: true },
    ],
  },
];

// 페이지가 만들어지면 href를 채운다
const policies = ["이용약관", "개인정보처리방침", "계정 삭제 안내"];

const linkCls = "rounded transition-colors hover:text-text-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SiteFooter() {
  return (
    <footer className="bg-bg-deep lg:snap-end">
      <div className="flex flex-col gap-12 px-5 pt-16 pb-12 md:px-12 lg:flex-row lg:justify-between lg:gap-10 lg:px-[72px] lg:pt-24 lg:pb-20">
        <div className="flex max-w-[320px] flex-col gap-5">
          <span className="font-logo text-[32px] leading-none">IJIRI</span>
          <p className="text-[15px] leading-[1.6] text-text-2">등업 없이 바로 보는 튜닝 레퍼런스. 오너들이 실제로 단 부품을 차종별로 모았어요.</p>
          <div className="flex gap-2">
            <a href={`mailto:${contact.email}`} aria-label="메일 보내기" className={`flex size-11 items-center justify-center rounded-full bg-surface-2 text-text-1 hover:bg-surface-3 ${linkCls}`}>
              <Mail aria-hidden className="size-[18px]" />
            </a>
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="이지리 인스타그램"
                className={`flex size-11 items-center justify-center rounded-full bg-surface-2 text-text-1 hover:bg-surface-3 ${linkCls}`}
              >
                <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
                  <path d={siInstagram.path} />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:gap-x-20">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h2 className="text-[15px] font-bold">{col.title}</h2>
              <ul className="flex flex-col gap-3 text-[15px] text-text-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined} className={linkCls}>
                        {l.label}
                      </a>
                    ) : (
                      <span className="text-text-3">{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-bg px-5 py-6 text-[13px] text-text-3 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-[72px]">
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-6">
          {/* TODO: 사업자 정보가 정해지면 채운다 */}
          <span>[사업자 정보]</span>
          <span>© 2026 IJIRI. All rights reserved.</span>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {policies.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
