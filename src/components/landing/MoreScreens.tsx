import { ArrowLeft, Camera, Check, Flashlight, Gauge, Grid2x2, Lock, Search, SquarePlus, User, X } from "lucide-react";
import { CarPhoto } from "./CarPhoto";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";
import { feedItems, unsplash } from "./data";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-bg text-left select-none" style={{ width: SCREEN_W, height: SCREEN_H }}>
      {children}
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const icons = [Grid2x2, Search, SquarePlus, Gauge, User];
  return (
    <div className="absolute inset-x-4 bottom-5 flex h-14 items-center justify-center rounded-full bg-surface-3/70 px-3">
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={`flex h-11 w-14 items-center justify-center rounded-full ${i === active ? "bg-white/10 text-text-1 ring-1 ring-white/15" : "text-icon-off"}`}
        >
          <Icon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
      ))}
    </div>
  );
}

/** Figma App `02 Interest / Selected` */
export function InterestScreen() {
  const cars = [
    ["현대", "아반떼 N", true],
    ["BMW", "M3"],
    ["BMW", "M4"],
    ["BMW", "3시리즈"],
    ["BMW", "4시리즈"],
    ["현대", "제네시스 쿠페"],
    ["제네시스", "G70"],
    ["기아", "스팅어"],
  ] as const;
  return (
    <Frame>
      <div className="px-5 pt-14">
        <ArrowLeft aria-hidden className="size-6" strokeWidth={1.75} />
        <p className="mt-6 text-[22px] font-semibold">어떤 차가 궁금하세요?</p>
        <p className="mt-1 text-[13px] text-text-3">여러 대 골라도 돼요. 나중에 언제든 바꿀 수 있어요.</p>
        <div className="mt-4 flex h-11 items-center gap-2 rounded-xl bg-surface-2 px-3 text-[14px] text-text-3">
          <Search aria-hidden className="size-4" /> 차종 이름으로 찾기
        </div>
        <div className="mt-3 flex gap-2 overflow-hidden text-[13px]">
          {["전체", "현대", "기아", "BMW", "제네시스"].map((c, i) => (
            <span key={c} className={`shrink-0 rounded-2xl px-3 py-1.5 ${i === 0 ? "bg-text-1 font-semibold text-bg-deep" : "bg-surface-2 text-text-body"}`}>
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cars.map(([brand, name, on]) => (
            <div
              key={name}
              className={`relative flex h-[68px] flex-col justify-center rounded-xl px-3 ${on ? "bg-accent/15 ring-2 ring-accent" : "bg-surface-2"}`}
            >
              <span className="text-[12px] text-text-3">{brand}</span>
              <span className="text-[16px] font-medium">{name}</span>
              <span className={`absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full ${on ? "bg-accent" : "ring-1 ring-muted"}`}>
                {on && <Check aria-hidden className="size-3.5" strokeWidth={3} />}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-8 flex flex-col items-center gap-3">
        <span className="flex h-12 w-full items-center justify-center rounded-xl bg-accent-strong text-[16px] font-semibold">1대 구경하러 가기</span>
        <span className="text-[13px] text-text-3">건너뛰기</span>
      </div>
    </Frame>
  );
}

/** Figma App `09 Search / Home` */
export function SearchScreen() {
  const recent = [
    ["avante.n.blue", "아반떼 N 2022년식 데일리", feedItems[3].photoId],
    ["cn7.daily", "아반떼 N 2023년식 스탠스", feedItems[0].photoId],
    ["avante_ad_sport", "아반떼 스포츠 2016년식 서킷", feedItems[5].photoId],
  ];
  const popular = [
    ["RAYS TE37", "휠"],
    ["STORM 다운스프링", "코일오버"],
    ["Neotech NF 6P", "브레이크"],
    ["MAINTEC 배기", "배기"],
    ["BBS ZR", "휠"],
  ];
  return (
    <Frame>
      <div className="px-4 pt-14">
        <div className="flex h-11 items-center gap-2 rounded-xl bg-surface-2 px-3 text-[14px] text-text-3">
          <Search aria-hidden className="size-4" /> 검색
        </div>
        <div className="mt-5 flex items-center justify-between text-[14px]">
          <span className="font-semibold">최근 검색</span>
          <span className="text-[12px] text-text-3">모두 지우기</span>
        </div>
        <ul className="mt-2 flex flex-col">
          {recent.map(([id, meta, photo]) => (
            <li key={id} className="flex items-center gap-3 py-2">
              <CarPhoto src={unsplash(photo, 120)} alt="" className="size-10 rounded-full" />
              <span className="flex flex-1 flex-col">
                <span className="text-[14px] font-medium">{id}</span>
                <span className="text-[12px] text-text-3">{meta}</span>
              </span>
              <X aria-hidden className="size-4 text-text-3" />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] font-semibold">아반떼 N 오너들이 많이 찾는 부품</p>
        <ol className="mt-1">
          {popular.map(([name, cat], i) => (
            <li key={name} className="flex items-center gap-3 border-b border-surface-3 py-2.5 text-[14px]">
              <span className={`w-4 text-[13px] tabular-nums ${i < 3 ? "text-accent" : "text-text-3"}`}>{i + 1}</span>
              <span className="flex-1">{name}</span>
              <span className="text-[12px] text-text-3">{cat}</span>
            </li>
          ))}
        </ol>
      </div>
      <TabBar active={1} />
    </Frame>
  );
}

/** Figma App `11 Upload 1 Pick / Selected` */
export function PickScreen() {
  const order: Record<number, number> = { 0: 1, 3: 3, 5: 2, 9: 4 };
  const thumbs = [...feedItems, ...feedItems].slice(0, 12);
  return (
    <Frame>
      <div className="flex items-center justify-between px-5 pt-14">
        <span className="flex items-center gap-3 text-lg font-medium">
          <ArrowLeft aria-hidden className="size-6" strokeWidth={1.75} /> 새 게시물
        </span>
        <span className="text-[15px] text-accent">다음</span>
      </div>
      <CarPhoto src={unsplash(feedItems[1].photoId, 720)} alt="고른 사진" className="mt-4 h-[300px] w-full" />
      <div className="flex items-center justify-between px-4 py-3 text-[13px]">
        <span className="font-semibold">최근 항목</span>
        <span className="text-text-3">누른 순서대로 올라가요</span>
      </div>
      <div className="grid grid-cols-4 gap-0.5">
        {thumbs.map((t, i) => (
          <div key={i} className="relative">
            <CarPhoto src={unsplash(t.photoId, 200)} alt="" className="aspect-square w-full" />
            <span
              className={`absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full text-[11px] font-bold ${order[i] ? "bg-accent" : "ring-1 ring-white/70"}`}
            >
              {order[i] ?? ""}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const lockAlerts = [
  { title: "단조 휠을 3명이 담았어요", body: "주말 트랙데이 셋업", time: "지금" },
  { title: "오늘 12명이 내 부품을 담았어요", body: "버킷 시트 5명, 코일오버 4명", time: "1시간 전" },
];

/**
 * 잠금화면에 이지리 담기 알림이 도착한 장면.
 * 폰 무대 안에서는 부모의 data-on이 true가 될 때 알림이 위에서 차례로 내려오고(globals.css .notif),
 * 그 밖(화면 조각, 모바일)에서는 처음부터 보인다.
 */
export function NotificationScreen() {
  // iOS 잠금화면: 위에 자물쇠와 날짜, 큰 시계, 알림은 아래쪽, 손전등과 카메라 버튼
  const sf = { fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif' };
  return (
    <Frame>
      <CarPhoto src={unsplash(feedItems[0].photoId, 720)} alt="" className="absolute inset-0 size-full" />
      <div aria-hidden className="absolute inset-0 bg-black/35" />
      <Lock aria-hidden className="absolute top-[58px] left-1/2 size-[18px] -translate-x-1/2 text-white" strokeWidth={2.4} />
      {/* 시계는 장식이라 글자 대신 그림으로 */}
      <svg aria-hidden viewBox="0 0 360 150" className="absolute inset-x-0 top-[84px] w-full fill-white" style={sf}>
        <text x="180" y="22" textAnchor="middle" fontSize="19" fontWeight="600">
          11월 2일 월요일
        </text>
        <text x="180" y="122" textAnchor="middle" fontSize="104" fontWeight="700" letterSpacing="-3">
          9:41
        </text>
      </svg>
      <ul aria-label="이지리 알림" className="absolute inset-x-2.5 bottom-[120px] flex flex-col gap-2" style={sf}>
        {lockAlerts.map((a) => (
          <li key={a.title} className="notif flex items-center gap-2.5 rounded-[20px] bg-white/20 px-3 py-2.5 backdrop-blur-xl">
            <span
              aria-hidden
              className="flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-white font-logo text-[11px] leading-none text-black"
            >
              IJIRI
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-white">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[15px] leading-tight font-semibold">{a.title}</span>
                <span className="shrink-0 text-[13px] text-white/70">{a.time}</span>
              </span>
              <span className="truncate text-[15px] leading-tight text-white/90">{a.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <div aria-hidden className="absolute inset-x-[46px] bottom-[42px] flex justify-between">
        {[Flashlight, Camera].map((Icon, i) => (
          <span key={i} className="flex size-[50px] items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl">
            <Icon className="size-[22px]" strokeWidth={2} />
          </span>
        ))}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-2 flex justify-center">
        <span className="h-[5px] w-[134px] rounded-full bg-white" />
      </div>
    </Frame>
  );
}
