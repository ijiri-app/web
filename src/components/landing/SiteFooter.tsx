import { CarPhoto } from "./CarPhoto";
import { heroPhotoId, unsplash } from "./data";
import { contact, liveUrl } from "@/lib/stores";

/* 푸터: 왼쪽 반은 오너 사진을 크게 자른 것, 오른쪽 반은 큰 메뉴 */

const menu = [
  { label: "기능", href: "#how" },
  { label: "차종별 빌드", href: "#builds" },
  { label: "차량 QR", href: "#qr" },
  { label: "앱 받기", href: "#download" },
];

const stores = [
  { label: "Google Play", href: liveUrl("googlePlay") },
  { label: "원스토어", href: liveUrl("oneStore") },
  { label: "App Store", href: liveUrl("appStore") },
];

// 페이지가 만들어지면 href를 채운다
const policies = ["이용약관", "개인정보처리방침", "계정 삭제 안내"];

const linkCls = "rounded transition-colors hover:text-text-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SiteFooter() {
  return (
    <footer className="bg-bg lg:snap-end lg:grid lg:min-h-svh lg:grid-cols-2">
      <div className="relative h-[50svh] overflow-hidden lg:h-auto">
        <CarPhoto src={unsplash(heroPhotoId, 1400)} alt="BMW M4 CS 앞바퀴와 휠 가까이" className="absolute inset-0 size-full scale-[1.6] object-[70%_75%]" />
      </div>

      <div className="flex flex-col px-5 pt-12 pb-8 md:px-12 lg:px-[72px] lg:pt-20">
        <span className="font-logo text-[30px] leading-none">IJIRI</span>

        <nav aria-label="사이트 메뉴" className="mt-10">
          <ul className="group/menu flex flex-col gap-5 lg:gap-7">
            {menu.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  className={`inline-block text-[8vw] leading-none font-bold tracking-[-0.03em] transition-[color,translate] duration-200 md:text-[44px] lg:text-[2.8vw] lg:group-hover/menu:text-muted lg:hover:translate-x-3 lg:hover:!text-text-1 ${linkCls}`}
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 grid gap-8 text-[15px] leading-[1.7] md:grid-cols-3">
          <div>
            <h2 className="font-bold">문의</h2>
            <a href={`mailto:${contact.email}`} className={`text-text-2 ${linkCls}`}>
              {contact.email}
            </a>
          </div>
          <div>
            <h2 className="font-bold">인스타그램</h2>
            <a href={contact.instagram ?? undefined} target="_blank" rel="noopener noreferrer" className={`text-text-2 ${linkCls}`}>
              @ijiri_car
            </a>
          </div>
          <div>
            <h2 className="font-bold">앱 받기</h2>
            <ul className="text-text-2">
              {stores.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {s.label}
                    </a>
                  ) : (
                    <span>{s.label} 출시 예정</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-16 text-[13px] text-text-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {policies.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {/* TODO: 사업자 정보가 정해지면 채운다 */}
          <span>[사업자 정보]</span>
          <span>© 2026 IJIRI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
