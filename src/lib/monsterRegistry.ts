/**
 * 몬스터 레지스트리
 * 208장 이미지 중 복사본 제외 201마리를 관리합니다.
 * 각 몬스터에 고유 ID, 이름, 등급, 카테고리를 부여합니다.
 */

export interface MonsterEntry {
  id: number;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: string;
}

// 몬스터 이름 풀 (재미있는 한글 이름)
const NAME_PREFIXES = [
  "불꽃", "얼음", "번개", "바람", "그림자", "별빛", "무지개", "수정", 
  "달빛", "해바라기", "보라", "구름", "하늘", "초록", "분홍", "황금",
  "은빛", "뭉게", "꽃잎", "이슬", "안개", "폭풍", "새벽", "노을",
  "파도", "용암", "눈꽃", "진주", "다이아", "루비", "사파이어", "에메랄드",
  "비", "천둥", "토네이도", "오로라", "코발트", "코랄", "민트", "피치",
];

const NAME_SUFFIXES = [
  "슬라임", "드래곤", "고양이", "강아지", "토끼", "다람쥐", "펭귄", "부엉이",
  "여우", "곰돌이", "유니콘", "호랑이", "독수리", "돌고래", "거북이", "판다",
  "코알라", "해마", "불가사리", "달팽이", "나비", "무당벌레", "개구리", "햄스터",
  "고슴도치", "수달", "앵무새", "플라밍고", "카멜레온", "해파리", "문어", "오리",
  "치타", "사슴", "물개", "라쿤", "스컹크", "두더지", "비버", "카피바라",
];

// 카테고리 그룹
const CATEGORIES = ["숲", "바다", "하늘", "동굴", "마을", "사막", "눈나라"];

// 등급 분배 (Common 60%, Rare 25%, Epic 12%, Legendary 3%)
function getRarity(index: number, total: number): MonsterEntry["rarity"] {
  const ratio = index / total;
  if (ratio >= 0.97) return "legendary";
  if (ratio >= 0.85) return "epic";
  if (ratio >= 0.60) return "rare";
  return "common";
}

// 등급별 색상
export const RARITY_COLORS: Record<MonsterEntry["rarity"], { bg: string; border: string; text: string; badge: string }> = {
  common:    { bg: "bg-gray-100",    border: "border-gray-300",    text: "text-gray-600",    badge: "bg-gray-200 text-gray-700" },
  rare:      { bg: "bg-blue-50",     border: "border-blue-300",    text: "text-blue-600",    badge: "bg-blue-100 text-blue-700" },
  epic:      { bg: "bg-purple-50",   border: "border-purple-400",  text: "text-purple-600",  badge: "bg-purple-100 text-purple-700" },
  legendary: { bg: "bg-yellow-50",   border: "border-yellow-400",  text: "text-yellow-600",  badge: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700" },
};

export const RARITY_LABELS: Record<MonsterEntry["rarity"], string> = {
  common: "커먼",
  rare: "레어",
  epic: "에픽",
  legendary: "전설",
};

// 원본 이미지 파일 목록 (복사본 제외, 정렬된 순서)
// public/images/monsters/ 폴더의 모든 .jpg 파일 중 "복사본" 포함 파일 제외
const MONSTER_IMAGE_FILES: string[] = [
  "media__1773510028776.jpg",
  "media__1773510028789.jpg",
  "media__1773510028838.jpg",
  "media__1773510028844.jpg",
  "media__1773510160804.jpg",
  "media__1773510160867.jpg",
  "media__1773510160897.jpg",
  "media__1773510160898.jpg",
  "Screenshot_20250314_180113_TikTok.jpg",
  "Screenshot_20250314_180117_TikTok.jpg",
  "Screenshot_20250314_180125_TikTok.jpg",
  "Screenshot_20250314_180128_TikTok.jpg",
  "Screenshot_20250314_180132_TikTok.jpg",
  "Screenshot_20250314_180136_TikTok.jpg",
  "Screenshot_20250314_180146_TikTok.jpg",
  "Screenshot_20250314_180243_TikTok.jpg",
  "Screenshot_20250314_180247_TikTok.jpg",
  "Screenshot_20250314_180253_TikTok.jpg",
  "Screenshot_20250314_180257_TikTok.jpg",
  "Screenshot_20250321_200225_TikTok.jpg",
  "Screenshot_20250331_175813_TikTok.jpg",
  "Screenshot_20250401_172541_TikTok.jpg",
  "Screenshot_20250401_172624_TikTok.jpg",
  "Screenshot_20250401_172642_TikTok.jpg",
  "Screenshot_20250401_202223_TikTok.jpg",
  "Screenshot_20250401_202301_TikTok.jpg",
  "Screenshot_20250401_202311_TikTok.jpg",
  "Screenshot_20250401_202324_TikTok.jpg",
  "Screenshot_20250401_202342_TikTok.jpg",
  "Screenshot_20250401_202731_TikTok.jpg",
  "Screenshot_20250401_203100_TikTok.jpg",
  "Screenshot_20250401_203121_TikTok.jpg",
  "Screenshot_20250401_203149_TikTok.jpg",
  "Screenshot_20250401_203212_TikTok.jpg",
  "Screenshot_20250403_213813_TikTok.jpg",
  "Screenshot_20250404_192949_TikTok.jpg",
  "Screenshot_20250404_203954_TikTok.jpg",
  "Screenshot_20250405_211704_TikTok.jpg",
  "Screenshot_20250405_211712_TikTok.jpg",
  "Screenshot_20250406_112018_TikTok.jpg",
  "Screenshot_20250406_112027_TikTok.jpg",
  "Screenshot_20250406_112700_TikTok.jpg",
  "Screenshot_20250406_113407_TikTok.jpg",
  "Screenshot_20250406_113621_TikTok.jpg",
  "Screenshot_20250406_113631_TikTok.jpg",
  "Screenshot_20250406_113636_TikTok.jpg",
  "Screenshot_20250406_113644_TikTok.jpg",
  "Screenshot_20250406_113650_TikTok.jpg",
  "Screenshot_20250406_113655_TikTok.jpg",
  "Screenshot_20250406_113700_TikTok.jpg",
  "Screenshot_20250406_113705_TikTok.jpg",
  "Screenshot_20250408_191114_TikTok.jpg",
  "Screenshot_20250411_215809_TikTok.jpg",
  "Screenshot_20250416_164336_TikTok.jpg",
  "Screenshot_20250420_114914_TikTok.jpg",
  "Screenshot_20250422_163944_TikTok.jpg",
  "Screenshot_20250422_163958_TikTok.jpg",
  "Screenshot_20250423_150116_TikTok.jpg",
  "Screenshot_20250423_150128_TikTok.jpg",
  "Screenshot_20250423_151007_TikTok.jpg",
  "Screenshot_20250423_215457_TikTok.jpg",
  "Screenshot_20250423_215515_TikTok.jpg",
  "Screenshot_20250423_215522_TikTok.jpg",
  "Screenshot_20250423_215527_TikTok.jpg",
  "Screenshot_20250424_163647_TikTok.jpg",
  "Screenshot_20250426_235430_TikTok.jpg",
  "Screenshot_20250427_112803_TikTok.jpg",
  "Screenshot_20250427_173614_TikTok.jpg",
  "Screenshot_20250427_173821_TikTok.jpg",
  "Screenshot_20250427_173837_TikTok.jpg",
  "Screenshot_20250427_173852_TikTok.jpg",
  "Screenshot_20250427_173900_TikTok.jpg",
  "Screenshot_20250427_173920_TikTok.jpg",
  "Screenshot_20250427_173926_TikTok.jpg",
  "Screenshot_20250502_163330_TikTok.jpg",
  "Screenshot_20250506_011105_TikTok.jpg",
  "Screenshot_20250506_011121_TikTok.jpg",
  "Screenshot_20250506_121259_TikTok.jpg",
  "Screenshot_20250506_121311_TikTok.jpg",
  "Screenshot_20250506_121332_TikTok.jpg",
  "Screenshot_20250510_160945_TikTok.jpg",
  "Screenshot_20250511_093044_TikTok.jpg",
  "Screenshot_20250512_185108_TikTok.jpg",
  "Screenshot_20250512_185116_TikTok.jpg",
  "Screenshot_20250512_185122_TikTok.jpg",
  "Screenshot_20250512_185143_TikTok.jpg",
  "Screenshot_20250512_205616_TikTok.jpg",
  "Screenshot_20250513_201023_TikTok.jpg",
  "Screenshot_20250513_201030_TikTok.jpg",
  "Screenshot_20250513_201038_TikTok.jpg",
  "Screenshot_20250513_201045_TikTok.jpg",
  "Screenshot_20250513_201051_TikTok.jpg",
  "Screenshot_20250513_201059_TikTok.jpg",
  "Screenshot_20250513_201115_TikTok.jpg",
  "Screenshot_20250513_201125_TikTok.jpg",
  "Screenshot_20250514_150328_TikTok.jpg",
  "Screenshot_20250514_150722_TikTok.jpg",
  "Screenshot_20250518_112950_TikTok.jpg",
  "Screenshot_20250520_151151_TikTok.jpg",
  "Screenshot_20250520_151207_TikTok.jpg",
  "Screenshot_20250520_151234_TikTok.jpg",
  "Screenshot_20250520_151243_TikTok.jpg",
  "Screenshot_20250520_151249_TikTok.jpg",
  "Screenshot_20250520_151302_TikTok.jpg",
  "Screenshot_20250520_151313_TikTok.jpg",
  "Screenshot_20250520_151318_TikTok.jpg",
  "Screenshot_20250520_151331_TikTok.jpg",
  "Screenshot_20250521_173912_TikTok.jpg",
  "Screenshot_20250521_174008_TikTok.jpg",
  "Screenshot_20250521_174016_TikTok.jpg",
  "Screenshot_20250521_174022_TikTok.jpg",
  "Screenshot_20250524_135043_TikTok.jpg",
  "Screenshot_20250524_135050_TikTok.jpg",
  "Screenshot_20250524_135101_TikTok.jpg",
  "Screenshot_20250524_135112_TikTok.jpg",
  "Screenshot_20250524_135116_TikTok.jpg",
  "Screenshot_20250524_135120_TikTok.jpg",
  "Screenshot_20250524_135127_TikTok.jpg",
  "Screenshot_20250524_185050_TikTok.jpg",
  "Screenshot_20250525_202105_TikTok.jpg",
  "Screenshot_20250525_202115_TikTok.jpg",
  "Screenshot_20250525_202132_TikTok.jpg",
  "Screenshot_20250525_202207_TikTok.jpg",
  "Screenshot_20250525_202220_TikTok.jpg",
  "Screenshot_20250525_202231_TikTok.jpg",
  "Screenshot_20250525_202252_TikTok.jpg",
  "Screenshot_20250525_202305_TikTok.jpg",
  "Screenshot_20250525_202309_TikTok.jpg",
  "Screenshot_20250526_174357_TikTok.jpg",
  "Screenshot_20250527_164526_TikTok.jpg",
  "Screenshot_20250531_202235_TikTok.jpg",
  "Screenshot_20250531_202329_TikTok.jpg",
  "Screenshot_20250531_202439_TikTok.jpg",
  "Screenshot_20250601_123354_TikTok.jpg",
  "Screenshot_20250601_123410_TikTok.jpg",
  "Screenshot_20250603_145725_TikTok.jpg",
  "Screenshot_20250603_145729_TikTok.jpg",
  "Screenshot_20250603_145734_TikTok.jpg",
  "Screenshot_20250603_145757_TikTok.jpg",
  "Screenshot_20250603_163357_TikTok.jpg",
  "Screenshot_20250606_211335_TikTok.jpg",
  "Screenshot_20250607_175810_TikTok.jpg",
  "Screenshot_20250608_144123_TikTok.jpg",
  "Screenshot_20250609_224901_TikTok.jpg",
  "Screenshot_20250610_135923_TikTok.jpg",
  "Screenshot_20250610_135938_TikTok.jpg",
  "Screenshot_20250611_164933_TikTok.jpg",
  "Screenshot_20250612_190504_TikTok.jpg",
  "Screenshot_20250615_191446_TikTok.jpg",
  "Screenshot_20250615_230237_TikTok.jpg",
  "Screenshot_20250618_160029_TikTok.jpg",
  "Screenshot_20250618_160036_TikTok.jpg",
  "Screenshot_20250618_160049_TikTok.jpg",
  "Screenshot_20250624_152655_TikTok.jpg",
  "Screenshot_20250624_152705_TikTok.jpg",
  "Screenshot_20250627_164807_TikTok.jpg",
  "Screenshot_20250627_164821_TikTok.jpg",
  "Screenshot_20250627_170859_TikTok.jpg",
  "Screenshot_20250627_173556_TikTok.jpg",
  "Screenshot_20250703_191501_TikTok.jpg",
  "Screenshot_20250703_191507_TikTok.jpg",
  "Screenshot_20250704_163612_TikTok.jpg",
  "Screenshot_20250712_143427_TikTok.jpg",
  "Screenshot_20250712_143440_TikTok.jpg",
  "Screenshot_20250712_143503_TikTok.jpg",
  "Screenshot_20250720_141831_TikTok.jpg",
  "Screenshot_20250720_141845_TikTok.jpg",
  "Screenshot_20250720_141850_TikTok.jpg",
  "Screenshot_20250720_141910_TikTok.jpg",
  "Screenshot_20250720_141919_TikTok.jpg",
  "Screenshot_20250721_220022_TikTok.jpg",
  "Screenshot_20250726_121045_TikTok.jpg",
  "Screenshot_20250726_122202_TikTok.jpg",
  "Screenshot_20250726_122207_TikTok.jpg",
  "Screenshot_20250726_122230_TikTok.jpg",
  "Screenshot_20250726_122240_TikTok.jpg",
  "Screenshot_20250726_122248_TikTok.jpg",
  "Screenshot_20250726_122254_TikTok.jpg",
  "Screenshot_20250726_123443_TikTok.jpg",
  "Screenshot_20250726_132800_TikTok.jpg",
  "Screenshot_20250726_213308_TikTok.jpg",
  "Screenshot_20250726_213312_TikTok.jpg",
  "Screenshot_20250727_103932_TikTok.jpg",
  "Screenshot_20250727_123033_TikTok.jpg",
  "Screenshot_20250727_141518_TikTok.jpg",
  "Screenshot_20250727_141522_TikTok.jpg",
  "Screenshot_20250728_215315_TikTok.jpg",
  "Screenshot_20250801_113836_TikTok.jpg",
  "Screenshot_20250805_103355_TikTok.jpg",
  "Screenshot_20250821_115652_TikTok.jpg",
  "Screenshot_20250821_120633_TikTok.jpg",
  "Screenshot_20250917_171931_TikTok.jpg",
  "Screenshot_20250917_171951_TikTok.jpg",
  "Screenshot_20250927_184810_TikTok.jpg",
  "Screenshot_20251026_215535_TikTok.jpg",
  "Screenshot_20251102_221441_TikTok.jpg",
  "Screenshot_20251123_130706_TikTok.jpg",
  "Screenshot_20260101_191254_TikTok.jpg",
  "Screenshot_20260102_154526_TikTok.jpg",
  "Screenshot_20260102_154657_TikTok.jpg",
  "Screenshot_20260103_113034_TikTok.jpg",
];

// 시드 기반 결정론적 이름 생성 (같은 인덱스는 항상 같은 이름)
function generateMonsterName(index: number): string {
  const prefixIdx = index % NAME_PREFIXES.length;
  const suffixIdx = Math.floor(index / NAME_PREFIXES.length) % NAME_SUFFIXES.length;
  return `${NAME_PREFIXES[prefixIdx]} ${NAME_SUFFIXES[suffixIdx]}`;
}

// 전체 몬스터 레지스트리 생성
export const MONSTER_REGISTRY: MonsterEntry[] = MONSTER_IMAGE_FILES.map((filename, index) => ({
  id: index,
  name: generateMonsterName(index),
  image: `/images/monsters/${filename}`,
  rarity: getRarity(index, MONSTER_IMAGE_FILES.length),
  category: CATEGORIES[index % CATEGORIES.length],
}));

export const TOTAL_MONSTERS = MONSTER_REGISTRY.length;

// 해금 소스 타입
export type UnlockSource = 
  | "battle_2star"
  | "battle_3star"
  | "match_70"
  | "match_100"
  | "attendance_1d"
  | "attendance_3d"
  | "attendance_7d"
  | "shop_gold"
  | "shop_gems";

/** 아직 해금되지 않은 몬스터 중 랜덤 1마리 선택 */
export function pickRandomUnlockedMonster(unlockedIds: number[]): MonsterEntry | null {
  const lockedMonsters = MONSTER_REGISTRY.filter(m => !unlockedIds.includes(m.id));
  if (lockedMonsters.length === 0) return null;
  return lockedMonsters[Math.floor(Math.random() * lockedMonsters.length)];
}

/** 특정 등급 풀에서 랜덤 몬스터 선택 (상점 구매용) */
export function pickMonsterByRarity(
  unlockedIds: number[], 
  minRarity: MonsterEntry["rarity"] = "common"
): MonsterEntry | null {
  const rarityOrder: MonsterEntry["rarity"][] = ["common", "rare", "epic", "legendary"];
  const minIdx = rarityOrder.indexOf(minRarity);
  
  const candidates = MONSTER_REGISTRY.filter(m => 
    !unlockedIds.includes(m.id) && 
    rarityOrder.indexOf(m.rarity) >= minIdx
  );
  
  if (candidates.length === 0) return pickRandomUnlockedMonster(unlockedIds);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** ID로 몬스터 조회 */
export function getMonsterById(id: number): MonsterEntry | undefined {
  return MONSTER_REGISTRY[id];
}

/** 카테고리별 몬스터 필터 */
export function getMonstersByCategory(category: string): MonsterEntry[] {
  if (category === "전체") return MONSTER_REGISTRY;
  return MONSTER_REGISTRY.filter(m => m.category === category);
}

/** 카테고리 목록 */
export function getAllCategories(): string[] {
  return ["전체", ...CATEGORIES];
}
