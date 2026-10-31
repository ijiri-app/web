/**
 * 임시 랜딩용 샘플 데이터.
 * 사진은 Unsplash 라이선스(무료, 상업적 이용 가능) 사진을 임시로 연결해 둔 것이다.
 * 실제 오너 게시물이 쌓이면 교체한다.
 */

export const unsplash = (id: string, width = 800) =>
  `https://unsplash.com/photos/${id}/download?w=${width}`;

export const buildChips = ["전체", "데일리", "서킷", "스탠스", "VIP", "순정", "드래그"] as const;
export type Build = (typeof buildChips)[number];

export type FeedItem = {
  photoId: string;
  year: string;
  model: string;
  parts: number;
  build: Exclude<Build, "전체">;
  tall?: boolean;
};

export const feedItems: FeedItem[] = [
  { photoId: "dveDkZQJVjQ", year: "2023", model: "M4 CS", parts: 7, build: "서킷" },
  { photoId: "mhnv9jK2rE4", year: "2022", model: "제네시스", parts: 5, build: "VIP", tall: true },
  { photoId: "qEXp4K4Y8t4", year: "2021", model: "M4", parts: 14, build: "데일리" },
  { photoId: "-mMRfzaeamg", year: "2024", model: "현대", parts: 3, build: "순정" },
  { photoId: "ITny35bfO00", year: "2020", model: "BMW M", parts: 9, build: "스탠스", tall: true },
  { photoId: "MCKMptaw8xc", year: "2019", model: "스포츠카", parts: 23, build: "서킷" },
];

export const modelTabs = ["전체", "아반떼 N", "M4", "제네시스 쿠페"];

export type PartCategory = "ext" | "int" | "pwr" | "und";

export const partCategoryLabel: Record<PartCategory, string> = {
  ext: "익스테리어",
  int: "인테리어",
  pwr: "파워트레인",
  und: "하체",
};

export const partColor: Record<PartCategory, string> = {
  ext: "bg-part-ext",
  int: "bg-part-int",
  pwr: "bg-part-pwr",
  und: "bg-part-und",
};

/** 캡슐 무대 사진(BMW M4 CS) 위에 띄울 부품. x, y는 사진 기준 % 위치 */
export const stageParts: { label: string; category: PartCategory; x: number; y: number }[] = [
  { label: "카본 보닛", category: "ext", x: 44, y: 38 },
  { label: "프론트 립", category: "ext", x: 30, y: 72 },
  { label: "단조 휠", category: "und", x: 70, y: 70 },
  { label: "코일오버", category: "und", x: 74, y: 50 },
  { label: "흡기 킷", category: "pwr", x: 20, y: 46 },
  { label: "버킷 시트", category: "int", x: 58, y: 26 },
];

export const carLines = [
  { brand: "현대", name: "아반떼 N", note: "게시물을 가장 먼저 채우는 차종이에요" },
  { brand: "BMW", name: "3·4시리즈, M3·M4", note: "320i와 M3처럼 트림까지 나눠 보여줘요" },
  { brand: "현대", name: "제네시스 쿠페", note: "오래 타 온 오너들의 빌드가 많아요" },
  { brand: "제네시스, 기아", name: "G70, 스팅어", note: "같은 뼈대에서 갈라진 셋업을 비교해요" },
];
