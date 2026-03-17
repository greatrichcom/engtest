import { create } from "zustand";
import { MonsterEntry } from "@/lib/monsterRegistry";

interface UIState {
  isLevelUpModalOpen: boolean;
  isInventoryModalOpen: boolean;
  levelUpData: { oldLevel: number; newLevel: number; rewards: { gold: number; gems: number } } | null;
  
  // 몬스터 해금 모달
  isMonsterUnlockModalOpen: boolean;
  unlockedMonster: MonsterEntry | null;
  unlockSource: string | null;
  
  // 출석 모달
  isAttendanceModalOpen: boolean;
  attendanceStreak: number;
  attendanceMilestone: "1d" | "3d" | "7d" | null;
  
  openLevelUpModal: (data: { oldLevel: number; newLevel: number; rewards: { gold: number; gems: number } }) => void;
  closeLevelUpModal: () => void;
  
  openInventoryModal: () => void;
  closeInventoryModal: () => void;
  
  openMonsterUnlockModal: (monster: MonsterEntry, source: string) => void;
  closeMonsterUnlockModal: () => void;
  
  openAttendanceModal: (streak: number, milestone?: "1d" | "3d" | "7d" | null) => void;
  closeAttendanceModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLevelUpModalOpen: false,
  isInventoryModalOpen: false,
  levelUpData: null,
  
  isMonsterUnlockModalOpen: false,
  unlockedMonster: null,
  unlockSource: null,
  
  isAttendanceModalOpen: false,
  attendanceStreak: 0,
  attendanceMilestone: null,

  openLevelUpModal: (data) => set({ isLevelUpModalOpen: true, levelUpData: data }),
  closeLevelUpModal: () => set({ isLevelUpModalOpen: false, levelUpData: null }),

  openInventoryModal: () => set({ isInventoryModalOpen: true }),
  closeInventoryModal: () => set({ isInventoryModalOpen: false }),
  
  openMonsterUnlockModal: (monster, source) => set({ 
    isMonsterUnlockModalOpen: true, 
    unlockedMonster: monster, 
    unlockSource: source 
  }),
  closeMonsterUnlockModal: () => set({ 
    isMonsterUnlockModalOpen: false, 
    unlockedMonster: null, 
    unlockSource: null 
  }),
  
  openAttendanceModal: (streak, milestone = null) => set({ 
    isAttendanceModalOpen: true, 
    attendanceStreak: streak, 
    attendanceMilestone: milestone 
  }),
  closeAttendanceModal: () => set({ 
    isAttendanceModalOpen: false, 
    attendanceStreak: 0, 
    attendanceMilestone: null 
  }),
}));
