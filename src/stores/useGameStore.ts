import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Word {
  id: string;
  english: string;
  korean: string;
  hintEmoji?: string;
}

interface GameState {
  unitId: string | null;
  words: Word[];
  currentIndex: number;
  monsterHp: number;
  maxHp: number;
  score: number;
  correctWords: Word[];
  wrongWords: Word[];
  gameType: "spell" | "match";
  isRevenge: boolean; // 리벤지 모드 진행 중인지 여부
  
  initGame: (unitId: string, words: Word[], gameType: "spell" | "match") => void;
  setGameType: (gameType: "spell" | "match") => void;
  startRevenge: () => void; // 현재 오답들로 리벤지 게임 시작
  submitAnswer: (isCorrect: boolean) => void;
  submitMatchResult: (results: { word: Word; isCorrect: boolean }[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      unitId: null,
      words: [],
      currentIndex: 0,
      monsterHp: 0,
      maxHp: 0,
      score: 0,
      correctWords: [],
      wrongWords: [],
      gameType: "spell",
      isRevenge: false,

      initGame: (unitId, words, gameType) =>
        set((state) => {
          // 만약 이전에 하던 유닛과 같고 진행 데이터가 있다면 이어하기 지원
          if (state.unitId === unitId && state.words.length === words.length && state.currentIndex > 0 && !state.isRevenge) {
            return {
              unitId,
              words: [...words],
              gameType
            };
          }

          return {
            unitId,
            words: [...words],
            currentIndex: 0,
            monsterHp: words.length,
            maxHp: words.length,
            score: 0,
            correctWords: [],
            wrongWords: [],
            gameType,
            isRevenge: false,
          };
        }),

      setGameType: (gameType) => set({ gameType }),

      startRevenge: () =>
        set((state) => {
          if (state.wrongWords.length === 0) return state;
          
          const revengePool = [...state.wrongWords];
          return {
            words: revengePool,
            currentIndex: 0,
            monsterHp: revengePool.length,
            maxHp: revengePool.length,
            score: 0,
            correctWords: [],
            wrongWords: [],
            isRevenge: true,
          };
        }),

      submitAnswer: (isCorrect) =>
        set((state) => {
          const currentWord = state.words[state.currentIndex];
          const nextIndex = state.currentIndex + 1;
          
          if (isCorrect) {
            return {
              score: state.score + 10,
              monsterHp: Math.max(0, state.monsterHp - 1),
              correctWords: [...state.correctWords, currentWord],
              currentIndex: nextIndex,
            };
          } else {
            return {
              wrongWords: [...state.wrongWords, currentWord],
              currentIndex: nextIndex,
            };
          }
        }),

      submitMatchResult: (results) =>
        set((state) => {
          let newScore = state.score;
          let newMonsterHp = state.monsterHp;
          const newCorrect = [...state.correctWords];
          const newWrong = [...state.wrongWords];

          results.forEach(({ word, isCorrect }) => {
            if (isCorrect) {
              newScore += 10;
              newMonsterHp = Math.max(0, newMonsterHp - 1);
              newCorrect.push(word);
            } else {
              newWrong.push(word);
            }
          });

          return {
            score: newScore,
            monsterHp: newMonsterHp,
            correctWords: newCorrect,
            wrongWords: newWrong,
            currentIndex: state.currentIndex + results.length
          };
        }),

      resetGame: () =>
        set({
          unitId: null,
          words: [],
          currentIndex: 0,
          monsterHp: 0,
          maxHp: 0,
          score: 0,
          correctWords: [],
          wrongWords: [],
          isRevenge: false,
        }),
    }),
    {
      name: "zen-pop-game-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
