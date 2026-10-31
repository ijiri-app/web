"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Phone3D = dynamic(() => import("./Phone3D"), { ssr: false });

const noop = () => () => {};

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** WebGL이 안 되거나 서버 렌더링 중일 때 보여 줄 평면 목업 */
function FlatPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-[48px] border border-surface-4 bg-[#2a2f38] p-[6px] shadow-[0_40px_120px_-30px_rgba(45,98,255,0.5)]">
        <div className="origin-center scale-[0.86] rounded-[42px] bg-black p-[4px] sm:scale-100">{children}</div>
      </div>
    </div>
  );
}

type Props = {
  label: string;
  children: React.ReactNode;
  baseYaw?: number;
  className?: string;
};

/** 3D 폰 목업. 화면에는 children(HTML)을 그대로 붙인다 */
export function Phone({ label, children, baseYaw, className = "" }: Props) {
  const webgl = useSyncExternalStore(noop, canUseWebGL, () => false);
  const reduced = useSyncExternalStore(noop, prefersReducedMotion, () => false);

  return (
    <figure aria-label={label} className={`relative h-[820px] w-full max-w-[460px] ${className}`}>
      {webgl ? (
        <Phone3D baseYaw={baseYaw} reducedMotion={reduced}>
          {children}
        </Phone3D>
      ) : (
        <FlatPhone>{children}</FlatPhone>
      )}
    </figure>
  );
}
