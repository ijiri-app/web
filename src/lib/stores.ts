/**
 * 스토어 주소. 출시되면 live를 true로 바꾼다.
 * live가 false인 스토어는 버튼이 "출시 예정"으로 보이고, /install도 그 스토어로 보내지 않는다.
 */
export const ANDROID_PACKAGE = "net.ijiri.app";

export type StoreKey = "googlePlay" | "oneStore" | "appStore";

export const stores: Record<StoreKey, { name: string; url: string | null; live: boolean }> = {
  googlePlay: {
    name: "Google Play",
    url: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
    live: false,
  },
  oneStore: {
    name: "원스토어",
    // 원스토어 등록 후 상품 ID로 채운다. 예: https://onesto.re/0000000000
    url: null,
    live: false,
  },
  appStore: {
    name: "App Store",
    // App Store 등록 후 앱 ID로 채운다. 예: https://apps.apple.com/kr/app/id0000000000
    url: null,
    live: false,
  },
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ijiri.net";
export const INSTALL_URL = `${SITE_URL}/install`;

export function liveUrl(key: StoreKey) {
  const s = stores[key];
  return s.live && s.url ? s.url : null;
}

/** 고객 문의와 SNS. 인스타그램 주소가 정해지면 instagram에 넣는다(null이면 링크 없이 표시). */
export const contact = {
  email: "help@ijiri.net",
  instagram: "https://www.instagram.com/ijiri_car/" as string | null,
};
