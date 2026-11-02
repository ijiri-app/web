"use client";

import { useEffect, useRef, useState } from "react";
import { CarFront } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** 첫 화면 사진처럼 바로 보여야 하면 true */
  priority?: boolean;
};

/** 외부 사진이 안 열리면 차 아이콘 플레이스홀더로 대체한다. */
export function CarPhoto({ src, alt, className = "", priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // 하이드레이션 전에 이미 실패한 이미지는 onError가 불리지 않아 직접 확인한다
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-surface-3 text-muted ${className}`}
      >
        <CarFront aria-hidden className="size-8" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    // 외부 리다이렉트 URL이라 next/image 대신 img를 쓴다
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`bg-surface-3 object-cover ${className}`}
    />
  );
}
