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
  { label: "OLED 테일램프", category: "ext", ax: 60, ay: 27, lx: 66, ly: 12, side: "right" },
  { label: "카본 트렁크 립", category: "ext", ax: 30, ay: 6, lx: 10, ly: 20, side: "right" },
  { label: "카본 디퓨저", category: "ext", ax: 50, ay: 86, lx: 62, ly: 70, side: "right" },
  { label: "티타늄 배기", category: "pwr", ax: 14, ay: 94, lx: 10, ly: 78, side: "right" },
];

export type Tag = (typeof heroTags)[number];

export type OwnerBuild = {
  id: string;
  /** 인덱스에 크게 쓰는 이름 */
  name: string;
  owner: string;
  meta: string;
  title: string;
  photoId: string;
  likes: number;
  comments: number;
  saves: number;
  tags: Tag[];
  parts: { cat: PartCategory; items: string[] }[];
};

/**
 * 차종별 빌드 미리 보기 샘플. 실제 오너 게시물이 생기면 교체한다.
 * 태그 좌표는 임시 사진 기준이라 사진을 바꾸면 다시 맞춰야 한다.
 */
export const ownerBuilds: OwnerBuild[] = [
  {
    id: "m4cs",
    name: "M4 CS 서킷",
    owner: "m4.owner",
    meta: "M4 CS 2023년식 서킷",
    title: "주말 트랙데이 셋업",
    photoId: "dveDkZQJVjQ",
    likes: 12,
    comments: 4,
    saves: 31,
    tags: heroTags,
    parts: [
      { cat: "ext", items: ["카본 보닛", "프론트 립"] },
      { cat: "int", items: ["버킷 시트"] },
      { cat: "und", items: ["코일오버", "단조 휠"] },
    ],
  },
  {
    id: "m4daily",
    name: "M4 데일리",
    owner: "m4.daily",
    meta: "M4 2021년식 데일리",
    title: "출퇴근도 하는 M4",
    photoId: "qEXp4K4Y8t4",
    likes: 27,
    comments: 9,
    saves: 54,
    tags: [
      { label: "흡기 킷", category: "pwr", ax: 46, ay: 50, lx: 40, ly: 28, side: "left" },
      { label: "사이드 스커트", category: "ext", ax: 56, ay: 70, lx: 64, ly: 86, side: "right" },
      { label: "로워링 스프링", category: "und", ax: 72, ay: 62, lx: 78, ly: 40, side: "right" },
    ],
    parts: [
      { cat: "ext", items: ["사이드 스커트"] },
      { cat: "pwr", items: ["흡기 킷", "배기 팁"] },
      { cat: "und", items: ["로워링 스프링", "19인치 휠"] },
    ],
  },
  {
    id: "genesis",
    name: "제네시스 VIP",
    owner: "g.vip.kr",
    meta: "제네시스 2022년식 VIP",
    title: "저차고 VIP 셋업",
    photoId: "mhnv9jK2rE4",
    likes: 19,
    comments: 6,
    saves: 22,
    tags: [
      { label: "크롬 몰딩", category: "ext", ax: 44, ay: 46, lx: 36, ly: 26, side: "left" },
      { label: "가죽 시트 커버", category: "int", ax: 58, ay: 42, lx: 66, ly: 24, side: "right" },
      { label: "에어서스", category: "und", ax: 70, ay: 66, lx: 76, ly: 86, side: "right" },
      { label: "딥림 휠", category: "und", ax: 32, ay: 72, lx: 22, ly: 88, side: "left" },
    ],
    parts: [
      { cat: "ext", items: ["크롬 몰딩"] },
      { cat: "int", items: ["가죽 시트 커버"] },
      { cat: "und", items: ["에어서스", "딥림 휠"] },
    ],
  },
  {
    id: "stance",
    name: "M 스탠스",
    owner: "m.stance",
    meta: "BMW M 2020년식 스탠스",
    title: "캠버 맞춘 스탠스",
    photoId: "ITny35bfO00",
    likes: 41,
    comments: 15,
    saves: 68,
    tags: [
      { label: "오버 펜더", category: "ext", ax: 30, ay: 58, lx: 22, ly: 34, side: "left" },
      { label: "캠버 키트", category: "und", ax: 68, ay: 70, lx: 76, ly: 46, side: "right" },
      { label: "와이드 휠", category: "und", ax: 34, ay: 74, lx: 26, ly: 90, side: "left" },
    ],
    parts: [
      { cat: "ext", items: ["오버 펜더"] },
      { cat: "und", items: ["에어서스", "캠버 키트", "와이드 휠"] },
    ],
  },
];
