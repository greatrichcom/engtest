import { create } from "zustand";

interface UserProfile {
  id: string;
  nickname: string;
  avatar_url: string | null;
  level: number;
  exp: number;
  gold: number;
  gems: number;
}

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
