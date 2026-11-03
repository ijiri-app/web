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

/**
 * 검색 등록 확인 코드. 페이지에 그대로 노출되는 값이라 비밀이 아니어서 코드에 둔다.
 * Google은 DNS TXT 기록으로 확인해 태그가 필요 없다.
 */
const siteVerification = {
  naver: "fa456b04b6b8bd49245511bf223d081abdfff369",
  bing: "CAEB63F9004677D7B804BD86BFB7F05F",
};

export function verification(): Metadata["verification"] {
  return {
    other: {
      "naver-site-verification": siteVerification.naver,
      "msvalidate.01": siteVerification.bing,
    },
  };
}
