import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";
import { useUIStore } from "@/stores/useUIStore";
import { pickRandomUnlockedMonster, pickMonsterByRarity, MONSTER_REGISTRY, type UnlockSource, type MonsterEntry } from "@/lib/monsterRegistry";

export interface BookWithProgress {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  totalUnits: number;
  clearedUnits: number;
  firstUnitId?: string;
}

// 개발/빌드 시 DB 연결이 안 된 경우 보여줄 MOCK 데이터
// Supabase의 UUID 타입 컬럼과 호환되도록 가짜 UUID를 사용합니다.
const MOCK_BOOKS: BookWithProgress[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "Insight Link 5-6 (동물편)",
    description: "사자, 호랑이, 슬라임(?)을 영어로!",
    isUnlocked: true,
    totalUnits: 5,
    clearedUnits: 2,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    title: "Bricks Reading 100",
    description: "초등 필수 어휘 모음",
    isUnlocked: true,
    totalUnits: 8,
    clearedUnits: 0,
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    title: "도전! 중간고사 보스 ⚔️",
    description: "학교 시험 기출 영단어",
    isUnlocked: false,
    totalUnits: 3,
    clearedUnits: 0,
  },
];

const MOCK_WORDS = [
  { id: "1", english: "apple", korean: "사과", hintEmoji: "🍎" },
  { id: "2", english: "banana", korean: "바나나", hintEmoji: "🍌" },
  { id: "3", english: "lion", korean: "사자", hintEmoji: "🦁" },
];

export function useBooks() {
  const { user } = useUserStore();
  const supabase = createClient();

  return useQuery({
    queryKey: ["books", user?.id],
    queryFn: async () => {
      // Dummy 키일 경우 (아직 Supabase 연동 전)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        return MOCK_BOOKS;
      }

      // 실제 Supabase에서 데이터 패칭
      const { data, error } = await supabase
        .from("books")
        .select(`
          id, title, description, is_preset, sort_order,
          units (
            id,
            sort_order,
            user_progress ( status )
          )
        `)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      
      if (!data) return [];

      return data.map((book: any) => {
        const units = (book.units as any[]) || [];
        const sortedUnits = [...units].sort((a, b) => a.sort_order - b.sort_order);
        const firstUnitId = sortedUnits[0]?.id;
        
        const totalUnits = units.length;
        const clearedUnits = units.filter((u: any) => {
          const up = u.user_progress as any[];
          return up?.[0]?.status === "cleared";
        }).length;
        
        return {
          id: String(book.id),
          title: String(book.title || ""),
          description: String(book.description || ""),
          isUnlocked: book.is_preset || true, // 임시로 모두 해제
          totalUnits,
          clearedUnits,
          firstUnitId
        };
      }) as BookWithProgress[];
    },
  });
}

export function useBookUnits(bookId: string) {
  const supabase = createClient();
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["bookUnits", bookId, user?.id],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        return [
          { id: "u1", title: "Unit 1", status: "cleared", stars: 3 },
          { id: "u2", title: "Unit 2", status: "unlocked", stars: 0 },
          { id: "u3", title: "Unit 3", status: "locked", stars: 0 },
        ] as any[];
      }

      const { data, error } = await supabase
        .from("units")
        .select(`
          id, title, sort_order,
          user_progress ( status, stars )
        `)
        .eq("book_id", bookId)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return (data || []).map((u, index) => {
        const progress = (u.user_progress as any[])?.[0];
        let status = progress?.status || "unlocked";
        
        // 유저가 모든 유닛을 자유롭게 선택할 수 있도록 기본 상태를 'unlocked'로 설정합니다.

        return {
          id: u.id,
          title: u.title,
          status: status as "locked" | "unlocked" | "cleared",
          stars: progress?.stars || 0
        };
      });
    },
    enabled: !!bookId,
  });
}

export function useWords(unitId: string) {
  const supabase = createClient();
  return useQuery({
    queryKey: ["words", unitId],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        return MOCK_WORDS;
      }
      
      const { data, error } = await supabase
        .from("words")
        .select("id, english, korean, hint_emoji")
        .eq("unit_id", unitId)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      
      // 실제 데이터만 반환 (Mock Fallback 제거)
      if (!data) return [];
      
      return data.map(d => ({
        id: d.id,
        english: d.english,
        korean: d.korean,
        hintEmoji: d.hint_emoji
      }));
    },
    enabled: !!unitId,
  });
}

export function useUnit(unitId: string) {
  const supabase = createClient();
  return useQuery({
    queryKey: ["unit", unitId],
    queryFn: async () => {
      if (!unitId) return null;
      const { data, error } = await supabase
        .from("units")
        .select("id, title, monster_type")
        .eq("id", unitId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!unitId,
  });
}

// 별점에 따른 보상 설정
const REWARD_MAP: Record<number, { gold: number; gems: number }> = {
  0: { gold: 0, gems: 0 },
  1: { gold: 3, gems: 1 },
  2: { gold: 5, gems: 3 },
  3: { gold: 10, gems: 5 },
};

// 레거시 몬스터 매핑 (하위 호환용, 배틀 이미지 선택에 사용)
const MONSTER_IMAGES: Record<string, string> = {
  slime: "/images/monsters/media__1773510028776.jpg",
  default: "/images/monsters/media__1773510028789.jpg",
  dragon: "/images/monsters/media__1773510028838.jpg",
  ghost: "/images/monsters/media__1773510028844.jpg",
  robot: "/images/monsters/media__1773510160804.jpg",
};

export function useSaveProgress() {
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ unitId, score, stars, wrongWordsCount }: { unitId: string, score: number, stars: number, wrongWordsCount: number }) => {
      if (!user) throw new Error("User not authenticated");
      
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        console.log("Mock Save Progress Data:", { unitId, score, stars, wrongWordsCount });
        return { 
          leveledUp: false, 
          oldLevel: user.level || 1, 
          newLevel: user.level || 1, 
          rewards: REWARD_MAP[stars] 
        };
      }

      // 1. 기존 진행 정보 가져오기
      const { data: existingProgress } = await supabase
        .from("user_progress")
        .select("id, stars, best_score")
        .eq("user_id", user.id)
        .eq("unit_id", unitId)
        .single();

      const oldStars = existingProgress?.stars || 0;
      let earnedGold = 0;
      let earnedGems = 0;
      
      // ratio 계산 (정답 기반 별점 산출 로직과 연동)
      // client측에서 넘어온 score 등을 기반으로 하거나, 여기서 재계산
      // 배틀 페이지의 로직: (total - wrong) / total
      // 여기서는 wrongWordsCount가 넘어오므로, 전체 단어 수를 알아야 함.
      // 일단 mock으로 처리하거나 파라미터로 받아야 함. 
      // 현재 ResultPage에서는 stars를 계산해서 넘겨주므로, stars를 활용하거나 ratio를 파라미터에 추가.
      // 여기서는 stars가 3이면 ratio를 1로 가정.
      const ratio = stars === 3 ? 1 : stars === 2 ? 0.7 : 0.4;

      // 2. 별점이 갱신되었을 경우에만 차액 보상 계산
      if (stars > oldStars) {
        earnedGold = REWARD_MAP[stars].gold - REWARD_MAP[oldStars].gold;
        earnedGems = REWARD_MAP[stars].gems - REWARD_MAP[oldStars].gems;
      }

      // 3. 게임 세션 로그 기록
      await supabase.from("game_sessions").insert({
        user_id: user.id,
        unit_id: unitId,
        game_type: "battle",
        score,
        wrong_words: wrongWordsCount,
        gold_earned: earnedGold
      });

      // 4. 몬스터 도감 해금 처리 (여러 조건 분기)
      // 기존 해금 몬스터 ID 목록 조회
      const { data: existingDex } = await supabase
        .from("monster_dex")
        .select("monster_id")
        .eq("user_id", user.id);
      
      const unlockedIds = (existingDex || []).map((d: any) => d.monster_id).filter((id: any) => id != null);
      const newUnlocks: { monster: MonsterEntry; source: UnlockSource }[] = [];
      
      // 별 2개 이상: 1마리 해금
      if (stars >= 2) {
        const m = pickRandomUnlockedMonster(unlockedIds);
        if (m) {
          newUnlocks.push({ monster: m, source: "battle_2star" });
          unlockedIds.push(m.id);
        }
      }
      // 별 3개: 추가 1마리 해금
      if (stars >= 3) {
        const m = pickRandomUnlockedMonster(unlockedIds);
        if (m) {
          newUnlocks.push({ monster: m, source: "battle_3star" });
          unlockedIds.push(m.id);
        }
      }
      
      // DB에 새 해금 몬스터 저장
      for (const unlock of newUnlocks) {
        await supabase.from("monster_dex").upsert({
          user_id: user.id,
          monster_id: unlock.monster.id,
          monster_type: `monster_${unlock.monster.id}`,
          name: unlock.monster.name,
          image_url: unlock.monster.image,
          rarity: unlock.monster.rarity,
          unlock_source: unlock.source,
          captured_at: new Date().toISOString()
        }, { onConflict: 'user_id,monster_id' });
        
        console.log(`Monster Unlocked: ${unlock.monster.name} (from ${unlock.source})`);
      }

      // 4. 진행률 업데이트
      if (existingProgress) {
        await supabase.from("user_progress").update({
           best_score: Math.max(existingProgress.best_score, score),
           stars: Math.max(existingProgress.stars, stars),
           status: "cleared",
           updated_at: new Date().toISOString()
        }).eq("id", existingProgress.id);
      } else {
        await supabase.from("user_progress").insert({
          user_id: user.id,
          unit_id: unitId,
          status: "cleared",
          stars,
          best_score: score
        });
      }

      // 5. 경험치 및 레벨업 정산
      const earnedExp = 50; 
      const nextLevelExp = (user.level || 1) * 100;
      let newLevel = user.level || 1;
      let newExp = (user.exp || 0) + earnedExp;
      let leveledUp = false;

      if (newExp >= nextLevelExp) {
        newLevel += 1;
        newExp -= nextLevelExp;
        leveledUp = true;
        earnedGems += 5; // 레벨업 기본 보상
      }

      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({
          gold: (user.gold || 0) + earnedGold,
          gems: (user.gems || 0) + earnedGems,
          exp: newExp,
          level: newLevel,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id)
        .select()
        .single();

      if (updatedProfile) {
        setUser(updatedProfile);
      }

      return { 
        leveledUp, 
        oldLevel: user.level || 1, 
        newLevel, 
        rewards: { gold: earnedGold, gems: earnedGems },
        newUnlocks
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["dex"] });
      
      if (data?.leveledUp) {
        useUIStore.getState().openLevelUpModal({
          oldLevel: data.oldLevel,
          newLevel: data.newLevel,
          rewards: data.rewards
        });
      }
      
      // 새 몬스터 해금 모달 (첫 번째 해금 몬스터만 표시, 나머지는 도감에서 확인)
      if (data?.newUnlocks && data.newUnlocks.length > 0) {
        const firstUnlock = data.newUnlocks[0];
        // 레벨업 모달 후에 보여주기 위해 약간 딜레이
        setTimeout(() => {
          useUIStore.getState().openMonsterUnlockModal(firstUnlock.monster, firstUnlock.source);
        }, data.leveledUp ? 2000 : 500);
      }
    }
  });
}
export function usePurchaseItem() {
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, price, currencyType }: { itemId: string, price: number, currencyType: "gold" | "gems" }) => {
      if (!user) throw new Error("User not authenticated");

      // 재화 부족 확인
      const currentBalance = currencyType === "gold" ? user.gold : user.gems;
      if ((currentBalance || 0) < price) {
        throw new Error("재화가 부족합니다!");
      }

      // 프로필 업데이트
      const updateData = currencyType === "gold" 
        ? { gold: (user.gold || 0) - price }
        : { gems: (user.gems || 0) - price };

      const { data, error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setUser(data);
      }

      // 인벤토리 업데이트
      await supabase.from("inventory").upsert({
        user_id: user.id,
        item_id: itemId,
        quantity: 1, // 일단 1개씩 구매
        purchased_at: new Date().toISOString()
      }, { onConflict: 'user_id,item_id' });
      
      console.log(`Item ${itemId} purchased and added to inventory!`);
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
}

export function useDex() {
  const supabase = createClient();
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["dex", user?.id],
    queryFn: async () => {
      if (!user) return [] as number[];
      
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        // Mock: 처음 5마리는 해금 상태
        return [0, 1, 2, 3, 4];
      }

      const { data, error } = await supabase
        .from("monster_dex")
        .select("monster_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return (data?.map(d => d.monster_id).filter((id: any) => id != null) || []) as number[];
    },
    enabled: !!user,
  });
}

/** 범용 몬스터 해금 뮤테이션 */
export function useUnlockMonster() {
  const supabase = createClient();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ monster, source }: { monster: MonsterEntry; source: UnlockSource }) => {
      if (!user) throw new Error("User not authenticated");

      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        console.log(`[Mock] Monster Unlocked: ${monster.name} (${source})`);
        return monster;
      }

      await supabase.from("monster_dex").upsert({
        user_id: user.id,
        monster_id: monster.id,
        monster_type: `monster_${monster.id}`,
        name: monster.name,
        image_url: monster.image,
        rarity: monster.rarity,
        unlock_source: source,
        captured_at: new Date().toISOString()
      }, { onConflict: 'user_id,monster_id' });

      return monster;
    },
    onSuccess: (monster, { source }) => {
      queryClient.invalidateQueries({ queryKey: ["dex"] });
      useUIStore.getState().openMonsterUnlockModal(monster, source);
    },
  });
}

/** 출석 체크 훅 */
export function useCheckAttendance() {
  const supabase = createClient();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { mutate: unlockMonster } = useUnlockMonster();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const today = new Date().toISOString().split('T')[0];

      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        console.log("[Mock] Attendance checked");
        return { streak: 1, isNew: true, milestone: "1d" as const };
      }

      // 오늘 이미 출석했는지 확인
      const { data: existing } = await supabase
        .from("attendance")
        .select("id, streak")
        .eq("user_id", user.id)
        .eq("check_date", today)
        .single();

      if (existing) {
        return { streak: existing.streak, isNew: false, milestone: null };
      }

      // 어제 출석 기록으로 연속 여부 확인
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const { data: yesterdayRecord } = await supabase
        .from("attendance")
        .select("streak")
        .eq("user_id", user.id)
        .eq("check_date", yesterdayStr)
        .single();

      const newStreak = (yesterdayRecord?.streak || 0) + 1;

      // 출석 기록 삽입
      await supabase.from("attendance").insert({
        user_id: user.id,
        check_date: today,
        streak: newStreak,
      });

      // 마일스톤 판단
      let milestone: "1d" | "3d" | "7d" | null = "1d";
      if (newStreak >= 7 && newStreak % 7 === 0) milestone = "7d";
      else if (newStreak >= 3 && newStreak % 3 === 0) milestone = "3d";

      return { streak: newStreak, isNew: true, milestone };
    },
    onSuccess: async (data) => {
      if (!data.isNew) return;

      queryClient.invalidateQueries({ queryKey: ["dex"] });

      // 출석 모달 표시
      useUIStore.getState().openAttendanceModal(data.streak, data.milestone);

      // 마일스톤에 따라 몬스터 해금
      if (data.milestone) {
        const { data: dexData } = await queryClient.fetchQuery({
          queryKey: ["dex"],
          queryFn: async () => [] as number[]
        }).catch(() => ({ data: [] as number[] })) as any;

        const unlockedIds = Array.isArray(dexData) ? dexData : [];
        const source: UnlockSource = `attendance_${data.milestone}` as UnlockSource;
        const monster = pickRandomUnlockedMonster(unlockedIds);

        if (monster) {
          // 출석 모달이 닫힌 후에 해금 모달 표시
          setTimeout(() => {
            unlockMonster({ monster, source });
          }, 2000);
        }
      }
    }
  });
}

/** 상점에서 몬스터 구매 */
export function usePurchaseMonster() {
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ currencyType, price }: { currencyType: "gold" | "gems"; price: number }) => {
      if (!user) throw new Error("User not authenticated");

      // 재화 확인
      const balance = currencyType === "gold" ? user.gold : user.gems;
      if ((balance || 0) < price) throw new Error("재화가 부족합니다!");

      // 해금된 몬스터 ID 조회
      let unlockedIds: number[] = [];
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        const { data: dex } = await supabase
          .from("monster_dex")
          .select("monster_id")
          .eq("user_id", user.id);
        unlockedIds = (dex || []).map((d: any) => d.monster_id).filter((id: any) => id != null);
      }

      // 보석이면 레어 이상, 골드면 커먼 이상
      const minRarity = currencyType === "gems" ? "rare" : "common";
      const monster = pickMonsterByRarity(unlockedIds, minRarity);
      if (!monster) throw new Error("모든 몬스터를 이미 발견했습니다!");

      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
        console.log(`[Mock] Monster purchased: ${monster.name}`);
        return monster;
      }

      // 재화 차감
      const updateData = currencyType === "gold" 
        ? { gold: (user.gold || 0) - price }
        : { gems: (user.gems || 0) - price };

      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select()
        .single();

      if (updatedProfile) setUser(updatedProfile);

      // 도감에 추가
      const source: UnlockSource = currencyType === "gold" ? "shop_gold" : "shop_gems";
      await supabase.from("monster_dex").upsert({
        user_id: user.id,
        monster_id: monster.id,
        monster_type: `monster_${monster.id}`,
        name: monster.name,
        image_url: monster.image,
        rarity: monster.rarity,
        unlock_source: source,
        captured_at: new Date().toISOString()
      }, { onConflict: 'user_id,monster_id' });

      return monster;
    },
    onSuccess: (monster, { currencyType }) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["dex"] });
      const source = currencyType === "gold" ? "shop_gold" : "shop_gems";
      useUIStore.getState().openMonsterUnlockModal(monster, source);
    }
  });
}

export function useCreateBookFromScan() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookTitle, unitTitle, words
    }: {
      bookTitle: string;
      unitTitle: string;
      words: { english: string; korean: string }[];
    }) => {
      // Supabase 세션에서 직접 유저 확인 (가장 신뢰도 높은 방법)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        throw new Error("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
      }

      const userId = session.user.id;
      console.log("[Save] 저장 시작 - user:", userId, "words:", words.length);

      const { data, error } = await supabase.rpc("create_scanned_book", {
        p_user_id: userId,
        p_book_title: bookTitle,
        p_unit_title: unitTitle,
        p_words: words,
      });

      if (error) {
        console.error("[Save] Supabase RPC Error:", error);
        throw new Error(error.message);
      }

      console.log("[Save] 저장 성공, book id:", data);
      return data as string;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });
}

export function useUpdateBookTitle() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookId, newTitle }: { bookId: string, newTitle: string }) => {
      const { data, error } = await supabase
        .from("books")
        .update({ title: newTitle })
        .eq("id", bookId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });
}

export interface LibraryBook {
  id: string;
  title: string;
  created_at: string;
  units: {
    id: string;
    title: string;
    sort_order: number;
    words: { id: string; english: string; korean: string }[];
  }[];
}

export function useLibraryBooks() {
  const supabase = createClient();
  const { user } = useUserStore();
  
  return useQuery({
    queryKey: ["libraryBooks", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("books")
        .select(`
          id, title, created_at,
          units (
            id, title, sort_order,
            words ( id, english, korean )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      return (data || []).map((book: any) => {
        const units = (book.units || []).sort((a: any, b: any) => a.sort_order - b.sort_order);
        return {
          id: String(book.id),
          title: String(book.title),
          created_at: String(book.created_at),
          units: units.map((u: any) => ({
            id: String(u.id),
            title: String(u.title),
            sort_order: Number(u.sort_order),
            words: (u.words || []).map((w:any) => ({
              id: String(w.id),
              english: String(w.english),
              korean: String(w.korean)
            }))
          }))
        };
      }) as LibraryBook[];
    },
    enabled: !!user,
  });
}
