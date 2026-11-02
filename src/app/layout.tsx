import type { Metadata, Viewport } from "next";
import { Fugaz_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "이지리 — 등업 없이 바로 보는 튜닝 레퍼런스",
  description: "오너들이 실제로 단 튜닝 부품을 차종별로 모았어요.",
  metadataBase: new URL("https://ijiri.net"),
  openGraph: {
    title: "이지리 — 등업 없이 바로 보는 튜닝 레퍼런스",
    description: "오너들이 실제로 단 튜닝 부품을 차종별로 모았어요.",
    url: "https://ijiri.net",
    siteName: "이지리",
    locale: "ko_KR",
    type: "website",
  },
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
