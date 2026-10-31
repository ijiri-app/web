import type { Metadata, Viewport } from "next";
import { Fugaz_One, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fugaz = Fugaz_One({
  variable: "--font-fugaz",
  weight: "400",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: "500",
  subsets: ["latin"],
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
    <html lang="ko" className={`${fugaz.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
