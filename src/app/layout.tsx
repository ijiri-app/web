import type { Metadata, Viewport } from "next";
import { Fugaz_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/brand";
import { SITE_URL } from "@/lib/stores";

const fugaz = Fugaz_One({
  variable: "--font-fugaz",
  weight: "400",
  subsets: ["latin"],
});

/* 본문 서체. 라이선스: src/app/fonts/OFL.txt */
const freesentation = localFont({
  variable: "--font-freesentation",
  src: [
    { path: "./fonts/Freesentation-4Regular.woff2", weight: "400" },
    { path: "./fonts/Freesentation-5Medium.woff2", weight: "500" },
    { path: "./fonts/Freesentation-6SemiBold.woff2", weight: "600" },
    { path: "./fonts/Freesentation-7Bold.woff2", weight: "700" },
  ],
  display: "swap",
  // 한 파일이 500KB대라 미리 받지 않는다
  preload: false,
  fallback: ["Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

const title = `${SITE_NAME}, ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["튜닝", "자동차 튜닝", "튜닝 레퍼런스", "튜닝 부품", "차종별 튜닝", "튜닝카", "휠", "코일오버", "배기", "에어서스", "이지리", "IJIRI"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ko_KR", url: "/", siteName: SITE_NAME, title, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "automotive",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#111418",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${fugaz.variable} ${freesentation.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
