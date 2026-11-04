/**
 * 정책 문서에 들어가는 값. 출시 전에 대괄호 칸을 모두 채운다.
 * playDeveloper는 Play Console에 등록한 개발자 이름과 글자 하나까지 같아야 한다.
 */
export const legal = {
  operator: "이도건",
  effective: "2026년중",
  playDeveloper: "Team IJIRI",
  r2Region: "아시아·태평양 지역 (APAC, 정확한 나라는 Cloudflare가 정함)",
  /**
   * 인증 메일을 보내는 SMTP. 서버 MAIL_HOST에 맞춘다.
   * kakao = 다음 스마트워크(smtp.daum.net, 국내), gmail = Gmail(smtp.gmail.com, 미국으로 국외 이전)
   */
  mailVendor: "kakao" as "kakao" | "gmail",
  /** 문서를 마지막으로 고친 날. 사이트맵과 구조화 데이터에 쓴다 */
  updated: "2026-11-04",
};

/** 대괄호 칸이 아직 채워지지 않았는지 */
export const isBlank = (v: string) => v.startsWith("[");
