"use client";

import { useState } from "react";
import { BookCard } from "@/components/lobby/BookCard";
import { BookOpen, Camera, Store, X, Zap, Puzzle, LibraryBig, Ghost } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBooks } from "@/hooks/useGameData";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/Button";

export default function LobbyPage() {
  const router = useRouter();
  const { data: books, isLoading } = useBooks();
  const { setGameType } = useGameStore();
  
  // 모달 상태 관리를 위한 유닛 ID 및 모달 가시성
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const handleStartGame = (mode: "spell" | "match") => {
    if (!selectedUnitId) return;
    setGameType(mode);
    router.push(`/battle/${selectedUnitId}`);
  };

  return (
    <main className="flex-1 flex flex-col p-4 w-full h-full relative">
      
      {/* 타이틀 영역 */}
      <section className="mb-4 mt-4 flex items-center justify-between gap-2">
        <div className="flex-1">
          <h1 className="text-3xl font-heading text-zen-purple animate-pop-in">나의 모험 지도 🗺️</h1>
          <p className="text-sm font-body text-text-secondary mt-1">
            스테이지를 선택하고 게임을 시작하세요!
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button 
            onClick={() => router.push("/library")}
            className="flex items-center justify-center px-3 py-2 rounded-xl bg-white border-2 border-zen-lavender shadow-soft text-zen-purple font-bold text-xs hover:translate-y-0.5 transition-all"
          >
            <LibraryBig className="w-4 h-4 mr-1" />
            단어장
          </button>
          <button 
            onClick={() => router.push("/dex")}
            className="flex items-center justify-center px-3 py-2 rounded-xl bg-white border-2 border-zen-purple-light shadow-soft text-zen-purple-dark font-bold text-xs hover:translate-y-0.5 transition-all"
          >
            <Ghost className="w-4 h-4 mr-1 text-zen-purple" />
            몬스터 도감
          </button>
        </div>
      </section>

      {/* 단어장 리스트 (모험 지도) */}
      <section className="flex-1 flex flex-col gap-4 overflow-y-auto pb-24 scrollbar-hide">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center font-bold text-zen-lavender-dark animate-pulse">
            모험 지도를 불러오는 중...
          </div>
        )}
        {books?.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onClick={() => {
              const targetId = book.firstUnitId || book.id;
              setSelectedUnitId(targetId);
            }} 
          />
        ))}
      </section>

      {/* 모드 선택 모달 */}
      {selectedUnitId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xs p-6 shadow-pop border-4 border-zen-purple relative animate-pop-in">
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
          </div>
        </div>
      )}

      {/* 하단 FAB 및 메뉴 영역 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] flex items-center justify-between pointer-events-none">
        
        {/* 상점 버튼 */}
        <button 
          onClick={() => router.push("/shop")}
          className="pointer-events-auto h-12 w-12 bg-white rounded-bubble shadow-card border-2 border-zen-orange flex items-center justify-center text-zen-orange hover:scale-110 active:scale-95 transition-transform"
          title="상점"
        >
          <Store className="w-6 h-6" />
        </button>

        {/* 단어장 스캔 (메인 FAB) */}
        <button 
          onClick={() => router.push("/scan")}
          className="pointer-events-auto h-16 w-3/5 bg-zen-pink text-white rounded-full shadow-pop flex items-center justify-center gap-2 hover:scale-105 active:translate-y-1 active:shadow-none transition-all font-game text-lg border-2 border-white"
        >
          <Camera className="w-6 h-6" />
          <span>단어장 스캔</span>
        </button>

        {/* 도감 버튼 */}
        <button 
          onClick={() => router.push("/dex")}
          className="pointer-events-auto h-12 w-12 bg-white rounded-bubble shadow-card border-2 border-zen-purple flex items-center justify-center text-zen-purple hover:scale-110 active:scale-95 transition-transform"
          title="도감"
        >
          <Ghost className="w-6 h-6" />
        </button>
      </div>

    </main>
  );
}
