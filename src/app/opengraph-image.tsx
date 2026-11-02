import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_BOX, LOGO_PATH, SITE_TAGLINE } from "@/lib/brand";

export const alt = "이지리, 등업 없이 바로 보는 튜닝 레퍼런스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* 카카오톡, SNS 공유 미리보기: 제목과 사진 태그 모양 */
const tags = [
  { label: "OLED 테일램프", color: "#2e4a6e", x: 760, y: 150 },
  { label: "카본 디퓨저", color: "#2e4a6e", x: 860, y: 300 },
  { label: "티타늄 배기", color: "#5a2e4e", x: 720, y: 450 },
];

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Freesentation-Bold-og.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Freesentation-Regular-og.ttf")),
  ]);
  const [line1, line2] = SITE_TAGLINE.replace("보는 ", "보는\n").split("\n");

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B0D10", color: "#F2F3F5", fontFamily: "Freesentation", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: 700 }}>
        <svg width={180} height={60} viewBox={`${LOGO_BOX.x} ${LOGO_BOX.y} ${LOGO_BOX.width} ${LOGO_BOX.height}`}>
          <path d={LOGO_PATH} fill="#F2F3F5" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.15, letterSpacing: -2 }}>{line1}</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.15, letterSpacing: -2 }}>{line2}</div>
          <div style={{ marginTop: 28, fontSize: 30, fontWeight: 400, color: "#C9CDD4" }}>오너들이 실제로 단 부품을 차종별로 모았어요</div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 400, color: "#969CA8" }}>ijiri.net</div>
      </div>
      {tags.map((t) => (
        <div key={t.label} style={{ position: "absolute", left: t.x, top: t.y, display: "flex", alignItems: "center" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FFFFFF", border: `5px solid ${t.color}` }} />
          <div style={{ width: 60, height: 2, background: "rgba(255,255,255,0.8)" }} />
          <div style={{ padding: "12px 20px", background: t.color, borderRadius: 6, fontSize: 30, fontWeight: 700, color: "#FFFFFF" }}>{t.label}</div>
        </div>
      ))}
    </div>,
    {
      ...size,
      fonts: [
        { name: "Freesentation", data: bold, weight: 700, style: "normal" },
        { name: "Freesentation", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
