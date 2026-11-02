import { siApple, siGoogleplay } from "simple-icons";
import { stores, liveUrl, type StoreKey } from "@/lib/stores";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0 fill-current">
      <path d={path} />
    </svg>
  );
}

/** 원스토어 공식 아이콘 파일이 없어 글자로 표시한다. 공식 배지로 교체 예정 */
function OneStoreMark() {
  return (
    <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-md bg-text-1 font-logo text-[9px] text-bg-deep">
      ONE
    </span>
  );
}

const order: { key: StoreKey; sub: string; icon: React.ReactNode }[] = [
  { key: "googlePlay", sub: "Android", icon: <BrandIcon path={siGoogleplay.path} /> },
  { key: "oneStore", sub: "Android", icon: <OneStoreMark /> },
  { key: "appStore", sub: "iPhone", icon: <BrandIcon path={siApple.path} /> },
];

/** Google Play, 원스토어, App Store 버튼. 출시 전 스토어는 누를 수 없게 둔다 */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {order.map(({ key, sub, icon }) => {
        const url = liveUrl(key);
        const inner = (
          <>
            {icon}
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[13px] text-text-3">{url ? sub : `${sub} 출시 예정`}</span>
              <span className="text-[19px] font-bold">{stores[key].name}</span>
            </span>
          </>
        );
        const base = "flex h-[60px] items-center gap-3 rounded-[14px] pr-6 pl-[18px]";
        return (
          <li key={key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} bg-surface-2 text-text-1 hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
              >
                {inner}
              </a>
            ) : (
              <span aria-disabled="true" className={`${base} cursor-not-allowed bg-surface-2 text-text-1 opacity-75`}>
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
