import { Mail } from "lucide-react";
import { siInstagram } from "simple-icons";
import { contact, liveUrl } from "@/lib/stores";

/* Figma: Landing / Desktop 1440, Mobile 390 > Footer */

type Link = { label: string; href: string | null };

const columns: { title: string; links: Link[] }[] = [
  {
    title: "서비스",
    links: [
      { label: "피드", href: "#feed" },
      { label: "부품 올리기", href: "#upload" },
      { label: "담기", href: "#wishlist" },
      { label: "차량 QR", href: "#qr" },
    ],
  },
  {
    title: "앱 받기",
    links: [
      { label: "Google Play", href: liveUrl("googlePlay") ?? "#download" },
      { label: "원스토어", href: liveUrl("oneStore") ?? "#download" },
      { label: "App Store", href: liveUrl("appStore") ?? "#download" },
    ],
  },
  {
    title: "정책",
    // 페이지가 만들어지면 href를 채운다
    links: [
      { label: "이용약관", href: null },
      { label: "개인정보처리방침", href: null },
      { label: "계정 삭제 안내", href: null },
    ],
  },
];

const linkCls = "rounded hover:text-text-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ContactRow({ href, icon, label }: { href: string | null; icon: React.ReactNode; label: string }) {
  const inner = (
    <>
      <span className="flex size-9 items-center justify-center rounded-full bg-surface-2">{icon}</span>
      <span>{label}</span>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`flex items-center gap-2.5 ${linkCls}`}>
      {inner}
    </a>
  ) : (
    <span className="flex items-center gap-2.5">{inner}</span>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-surface-3 bg-bg-deep">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-11 px-5 pt-14 pb-12 md:flex-row md:justify-between md:gap-0 md:px-0 md:pt-24 md:pb-20">
        <div className="flex flex-col gap-5">
          <span className="font-logo text-[26px] leading-none md:text-[32px]">IJIRI</span>
          <div className="flex flex-col gap-3 text-[15px] text-text-body">
            <ContactRow href={`mailto:${contact.email}`} icon={<Mail aria-hidden className="size-[18px]" />} label={contact.email} />
            <ContactRow
              href={contact.instagram}
              icon={
                <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
                  <path d={siInstagram.path} />
                </svg>
              }
              label="@ijiri_car"
            />
          </div>
        </div>

        <div className="flex justify-between md:gap-[88px]">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h2 className="text-[13px] font-bold md:text-sm">{col.title}</h2>
              <ul className="flex flex-col gap-3.5 text-sm text-text-3 md:text-[15px]">
                {col.links.map((l) => (
                  <li key={l.label}>{l.href ? <a href={l.href} className={linkCls}>{l.label}</a> : <span>{l.label}</span>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-surface-3">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-1.5 px-5 py-[22px] text-[13px] text-muted md:flex-row md:justify-between md:px-0">
          {/* TODO: 사업자 정보가 정해지면 채운다 */}
          <span>[사업자 정보]</span>
          <span>© 2026 IJIRI. All rights reserved.</span>
        </div>
      </div>

      <div aria-hidden className="relative h-[24vw] max-h-[250px] select-none">
        <span className="absolute -top-[2.8vw] left-1/2 -translate-x-1/2 font-logo text-[36vw] leading-none text-[#161a20] md:-top-10 md:text-[400px]">
          IJIRI
        </span>
      </div>
    </footer>
  );
}
