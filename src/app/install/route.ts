import { NextResponse, userAgent, type NextRequest } from "next/server";
import { liveUrl } from "@/lib/stores";

/**
 * QR 코드가 가리키는 주소. 접속한 기기를 보고 맞는 스토어로 보낸다.
 * - Android → Google Play
 * - iPhone, iPad → App Store
 * - 그 외(PC 등)이거나 아직 출시 전인 스토어 → 랜딩의 설치 영역
 * iPadOS 13 이후 Safari는 Mac으로 접속한 것처럼 보이기 때문에 서버에서는 PC로 판단된다.
 */
export function GET(request: NextRequest) {
  const { os } = userAgent(request);
  const osName = (os.name ?? "").toLowerCase();

  let target: string | null = null;
  if (osName.includes("android")) {
    target = liveUrl("googlePlay");
  } else if (osName === "ios") {
    target = liveUrl("appStore");
  }

  const destination = target ?? new URL("/#download", request.url).toString();
  const res = NextResponse.redirect(destination, 302);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
