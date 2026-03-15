import { create } from "zustand";

interface UIState {
  isLevelUpModalOpen: boolean;
  isInventoryModalOpen: boolean;
  levelUpData: { oldLevel: number; newLevel: number; rewards: { gold: number; gems: number } } | null;
  
  openLevelUpModal: (data: { oldLevel: number; newLevel: number; rewards: { gold: number; gems: number } }) => void;
  closeLevelUpModal: () => void;
  
  openInventoryModal: () => void;
  closeInventoryModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLevelUpModalOpen: false,
  isInventoryModalOpen: false,
  levelUpData: null,

  openLevelUpModal: (data) => set({ isLevelUpModalOpen: true, levelUpData: data }),
  closeLevelUpModal: () => set({ isLevelUpModalOpen: false, levelUpData: null }),

  openInventoryModal: () => set({ isInventoryModalOpen: true }),
  closeInventoryModal: () => set({ isInventoryModalOpen: false }),
}));
