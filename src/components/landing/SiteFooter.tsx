/* Figma: Landing / Desktop 1440 > Footer */

const columns = [
  {
    title: "고객지원",
    links: [
      { label: "support@ijiri.net", href: "mailto:support@ijiri.net" },
      // TODO: 인스타그램 계정이 정해지면 주소를 넣는다
      { label: "Instagram", href: null },
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

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-surface-3 bg-bg-deep">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-12 px-5 pt-16 pb-14 md:flex-row md:justify-between md:px-0 md:pt-[88px] md:pb-[72px]">
        <span className="font-logo text-[28px] leading-none">IJIRI</span>
        <div className="flex gap-16 md:gap-24">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h2 className="text-sm font-bold">{col.title}</h2>
              <ul className="flex flex-col gap-3.5 text-[15px] text-text-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} className="rounded hover:text-text-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        {l.label}
                      </a>
                    ) : (
                      <span>{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-surface-3">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-2 px-5 py-6 text-[13px] text-muted md:flex-row md:justify-between md:px-0">
          {/* TODO: 사업자 정보가 정해지면 채운다 */}
          <span>[사업자 정보]</span>
          <span>© 2026 IJIRI. All rights reserved.</span>
        </div>
      </div>

      {/* 아래가 잘린 큰 워드마크 */}
      <div aria-hidden className="relative h-[24vw] max-h-[250px] select-none">
        <span className="absolute left-1/2 -top-[2.8vw] -translate-x-1/2 font-logo text-[28vw] leading-none text-[#161a20] md:-top-10 md:text-[400px]">
          IJIRI
        </span>
      </div>
    </footer>
  );
}
