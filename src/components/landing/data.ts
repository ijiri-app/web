/**
 * 임시 랜딩용 샘플 데이터.
 * 사진은 Unsplash 라이선스(무료, 상업적 이용 가능) 사진을 임시로 연결해 둔 것이다.
 * 실제 오너 게시물이 쌓이면 교체한다.
 */

export const unsplash = (id: string, width = 800) =>
  `https://unsplash.com/photos/${id}/download?w=${width}`;

export type FeedItem = {
  photoId: string;
  year: string;
  model: string;
  parts: number;
  tall?: boolean;
};

export const feedItems: FeedItem[] = [
  { photoId: "dveDkZQJVjQ", year: "2023", model: "M4 CS", parts: 7 },
  { photoId: "mhnv9jK2rE4", year: "2022", model: "제네시스", parts: 5, tall: true },
  { photoId: "qEXp4K4Y8t4", year: "2021", model: "M4", parts: 14 },
  { photoId: "-mMRfzaeamg", year: "2024", model: "현대", parts: 3 },
  { photoId: "ITny35bfO00", year: "2020", model: "BMW M", parts: 9, tall: true },
  { photoId: "MCKMptaw8xc", year: "2019", model: "스포츠카", parts: 23 },
];

export const modelTabs = ["전체", "아반떼 N", "M4", "제네시스 쿠페"];
export const buildChips = ["전체", "데일리", "서킷", "스탠스", "VIP", "순정", "드래그"];

export type PartCategory = "ext" | "int" | "pwr" | "und";

export const partCategories: {
  key: PartCategory;
  label: string;
  items: string[];
}[] = [
  { key: "ext", label: "익스테리어", items: ["프론트 립", "카본 사이드미러"] },
  { key: "int", label: "인테리어", items: ["버킷 시트"] },
  { key: "pwr", label: "파워트레인", items: ["흡기 킷", "다운파이프"] },
  { key: "und", label: "하체", items: ["에어서스", "단조 휠"] },
];

export const partColor: Record<PartCategory, string> = {
  ext: "bg-part-ext",
  int: "bg-part-int",
  pwr: "bg-part-pwr",
  und: "bg-part-und",
};

export const carLines = [
  { brand: "현대", name: "아반떼 N", note: "초기 게시물을 가장 먼저 채워요" },
  { brand: "BMW", name: "3·4시리즈 / M3·M4", note: "320i와 M3처럼 트림까지 나눠요" },
  { brand: "현대", name: "제네시스 쿠페", note: "오래 타온 오너들의 빌드" },
  { brand: "제네시스 · 기아", name: "G70 / 스팅어", note: "같은 뿌리, 다른 셋업" },
];
