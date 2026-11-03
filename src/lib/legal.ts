/**
 * 정책 문서에 들어가는 값. 출시 전에 대괄호 칸을 모두 채운다.
 * playDeveloper는 Play Console에 등록한 개발자 이름과 글자 하나까지 같아야 한다.
 */
export const legal = {
  operator: "[운영자 이름]",
  effective: "[시행일]",
  playDeveloper: "[Play Console 개발자 이름]",
  r2Region: "[R2 버킷 지역]",
  sesRegion: "[SES 리전]",
  sesRetention: "[SES 보관 기간]",
  /** 문서를 마지막으로 고친 날. 사이트맵과 구조화 데이터에 쓴다 */
  updated: "2026-11-03",
};
