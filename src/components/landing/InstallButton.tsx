"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { liveUrl } from "@/lib/stores";

/** 지금 열린 스토어에 맞춘 QR 안내 문구 */
const installNote = (() => {
  const play = liveUrl("googlePlay");
  const app = liveUrl("appStore");
  if (play && app) return "Android는 Google Play, iPhone은 App Store로 바로 이동해요";
  if (play) return "Android는 Google Play로 바로 이동해요. iPhone은 준비 중이에요.";
  if (app) return "iPhone은 App Store로 바로 이동해요";
  return "아직 출시 전이에요. 출시되면 이 QR로 바로 받을 수 있어요.";
})();

type Props = {
  /** 서버에서 만든 /install QR 코드 SVG */
  qrSvg: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * 설치하기 버튼.
 * 폰에서는 /install로 바로 가서 기기에 맞는 스토어로 이동하고,
 * PC(마우스 환경)에서는 같은 주소의 QR 코드를 띄운다.
 */
export function InstallButton({ qrSvg, className = "", children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!desktop) return;
    e.preventDefault();
    dialog.current?.showModal();
  };

  return (
    <>
      <a href="/install" onClick={onClick} className={className}>
        {children}
      </a>

      <dialog
        ref={dialog}
        aria-labelledby="install-qr-title"
        onClick={(e) => {
          // 바깥(배경)을 누르면 닫는다
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[min(92vw,380px)] rounded-3xl bg-surface-1 p-0 text-text-1 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative flex flex-col items-center gap-5 px-7 pt-9 pb-7 text-center">
          <button
            type="button"
            aria-label="닫기"
            onClick={() => dialog.current?.close()}
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full text-text-2 hover:bg-surface-3 hover:text-text-1 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X aria-hidden className="size-5" />
          </button>
          <h2 id="install-qr-title" className="text-2xl font-semibold">
            폰 카메라로 찍어 주세요
          </h2>
          <p className="text-[15px] leading-relaxed text-balance text-text-2">{installNote}</p>
          <div
            role="img"
            aria-label="이지리 설치 페이지 QR 코드"
            className="size-[220px] rounded-2xl bg-white p-3 [&>svg]:size-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          {liveUrl("oneStore") && <p className="text-[13px] text-text-3">원스토어는 앱에서 이지리를 검색해 주세요</p>}
        </div>
      </dialog>
    </>
  );
}
