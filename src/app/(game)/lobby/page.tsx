"use client";

import { useState, useEffect } from "react";
import { BookCard } from "@/components/lobby/BookCard";
import { AdventureMap } from "@/components/lobby/AdventureMap";
import { BookOpen, Camera, Store, X, Zap, Puzzle, LibraryBig, Ghost, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBooks, useBookUnits, useCheckAttendance } from "@/hooks/useGameData";
import { useGameStore } from "@/stores/useGameStore";
import { motion, AnimatePresence } from "framer-motion";

export default function LobbyPage() {
  const router = useRouter();
  const { data: books, isLoading: isBooksLoading } = useBooks();
  const { setGameType } = useGameStore();
  const { mutate: checkAttendance } = useCheckAttendance();

  // 로비 진입 시 자동 출석 체크
  useEffect(() => {
    checkAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 상태 관리: 선택된 책 ID (지도를 보여주기 위함) 및 선택된 유닛 ID (모달용)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // 선택된 책의 유닛 데이터 가져오기
  const { data: units, isLoading: isUnitsLoading } = useBookUnits(selectedBookId || "");

  const handleStartGame = (mode: "spell" | "match") => {
    if (!selectedUnitId) return;
    setGameType(mode);
    router.push(`/battle/${selectedUnitId}`);
  };

  const selectedBook = books?.find(b => b.id === selectedBookId);

  return (
    <main className="flex-1 flex flex-col px-4 py-2 w-full h-full relative overflow-hidden">

      {/* 상단 타이틀 및 네비게이션 */}
      <section className="mb-2 mt-1 flex items-center justify-between gap-2 z-20">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedBookId ? (
              <motion.div
                key="map-title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={() => setSelectedBookId(null)}
                  className="p-2 border-2 border-zen-lavender rounded-xl bg-white text-zen-purple shadow-soft hover:bg-zen-lavender-light transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-heading text-zen-purple-dark line-clamp-1">{selectedBook?.title}</h1>
                  <p className="text-[10px] font-body text-text-secondary">모험 스테이지를 선택하세요!</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lobby-title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h1 className="text-3xl font-heading text-zen-purple animate-pop-in">나의 모험 지도 🗺️</h1>
                <p className="text-sm font-body text-text-secondary mt-1">책을 선택하여 모험을 시작하세요!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!selectedBookId && (
          <div className="flex shrink-0">
            <button
              onClick={() => router.push("/library")}
              className="flex items-center justify-center px-4 py-2 rounded-xl bg-white border-2 border-zen-lavender shadow-soft text-zen-purple font-bold text-xs hover:translate-y-0.5 transition-all"
            >
              <LibraryBig className="w-4 h-4 mr-1" />
              단어장
            </button>
          </div>
        )}
      </section>

      {/* 리스트 또는 지도 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedBookId ? (
            <motion.section
              key="book-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col gap-3 overflow-y-auto pb-32 scrollbar-hide pt-0"
            >
              {isBooksLoading ? (
                <div className="flex-1 flex items-center justify-center font-bold text-zen-lavender-dark animate-pulse">
                  모험 지도를 불러오는 중...
                </div>
              ) : (
                books?.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => setSelectedBookId(book.id)}
                  />
                ))
              )}
            </motion.section>
          ) : (
            <motion.section
              key="adventure-map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {isUnitsLoading ? (
                <div className="flex-1 flex items-center justify-center font-bold text-zen-lavender-dark animate-pulse">
                  스테이지 지도를 그리는 중...
                </div>
              ) : (
                <AdventureMap
                  units={units || []}
                  onUnitClick={(unitId) => setSelectedUnitId(unitId)}
                />
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* 모드 선택 모달 */}
      <AnimatePresence>
        {selectedUnitId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xs p-6 shadow-pop border-4 border-zen-purple relative"
            >
              <button
                onClick={() => setSelectedUnitId(null)}
                className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full border-4 border-zen-purple flex items-center justify-center text-zen-purple shadow-soft"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-heading text-zen-purple-dark text-center mb-6">게임 모드 선택</h2>

              <div className="space-y-4">
                <button
                  onClick={() => handleStartGame("spell")}
                  className="w-full p-4 rounded-2xl border-4 border-zen-mint bg-zen-mint-light hover:bg-zen-mint transition-colors flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-zen-mint shadow-inner group-hover:scale-110 transition-transform">
                    <Puzzle className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text-primary">철자 퍼즐</div>
                    <div className="text-[10px] text-text-secondary">알파벳을 맞춰 단어 완성</div>
                  </div>
                </button>

                <button
                  onClick={() => handleStartGame("match")}
                  className="w-full p-4 rounded-2xl border-4 border-zen-blue bg-zen-blue-light hover:bg-zen-blue transition-colors flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-zen-blue shadow-inner group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text-primary">뜻 매칭</div>
                    <div className="text-[10px] text-text-secondary">단어와 뜻을 선으로 연결</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
