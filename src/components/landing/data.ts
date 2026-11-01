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

export const partRing: Record<PartCategory, string> = {
  ext: "ring-part-ext",
  int: "ring-part-int",
  pwr: "ring-part-pwr",
  und: "ring-part-und",
};

/**
 * 히어로 사진과 부품 태그. 좌표는 사진 영역 기준 %.
 * a = 부품 위의 점, l = 라벨이 붙는 지점(side가 left면 라벨이 그 지점의 왼쪽으로 놓임).
 * 지금 사진은 Unsplash 임시 사진이라 실제 부품 위치와 맞는지 화면에서 확인 후 조정해야 한다.
 */
export const heroPhotoId = "dveDkZQJVjQ";

export const heroTags: {
  label: string;
  category: PartCategory;
  ax: number;
  ay: number;
  lx: number;
  ly: number;
  side: "left" | "right";
}[] = [
  { label: "버킷 시트", category: "int", ax: 60, ay: 42, lx: 66, ly: 22, side: "right" },
  { label: "카본 보닛", category: "ext", ax: 50, ay: 52, lx: 44, ly: 32, side: "left" },
  { label: "코일오버", category: "und", ax: 78, ay: 62, lx: 74, ly: 48, side: "left" },
  { label: "단조 휠", category: "und", ax: 76, ay: 74, lx: 72, ly: 90, side: "left" },
  { label: "프론트 립", category: "ext", ax: 42, ay: 79, lx: 30, ly: 90, side: "left" },
];
