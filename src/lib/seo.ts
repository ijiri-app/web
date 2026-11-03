import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/brand";

/** 하위 페이지 메타데이터. openGraph는 부모 값을 통째로 덮으므로 사이트 이름과 언어까지 다시 적는다 */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const full = `${title} | ${SITE_NAME}`;
  // 페이지가 openGraph를 직접 정하면 루트의 공유 이미지가 따라오지 않아 다시 건다
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME}, ${SITE_TAGLINE}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", locale: "ko_KR", siteName: SITE_NAME, url: path, title: full, description, images },
    twitter: { card: "summary_large_image", title: full, description, images },
  };
}

/** 검색 등록 확인 코드. 배포 환경 변수에 넣으면 메타 태그가 생긴다 */
export function verification(): Metadata["verification"] {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const naver = process.env.NAVER_SITE_VERIFICATION;
  return {
    ...(google ? { google } : {}),
    ...(naver ? { other: { "naver-site-verification": naver } } : {}),
  };
}
