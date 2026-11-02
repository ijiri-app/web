import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/stores";

/* 검색엔진과 생성형 AI 검색(ChatGPT, Claude, Perplexity, Gemini) 모두 허용. /install은 스토어로 넘기는 주소라 제외 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/install"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Yeti"], allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
