"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Loader2, Ghost, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useDex } from "@/hooks/useGameData";
import Image from "next/image";
import { 
  MONSTER_REGISTRY, 
  TOTAL_MONSTERS, 
  RARITY_COLORS, 
  RARITY_LABELS,
  getAllCategories,
  getMonstersByCategory 
} from "@/lib/monsterRegistry";

export default function DexPage() {
  const router = useRouter();
  const { data: unlockedIds, isLoading } = useDex();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getAllCategories();
  const filteredMonsters = getMonstersByCategory(selectedCategory).filter(m => 
    searchQuery ? m.name.includes(searchQuery) : true
  );

  const unlockedCount = unlockedIds?.length || 0;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zen-purple" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* 헤더 */}
      <header className="flex items-center justify-between p-4 pt-6 pb-2">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <h1 className="text-2xl font-heading text-zen-purple-dark flex items-center gap-2">
          <Ghost className="w-6 h-6" />
          몬스터 도감
        </h1>
        <div className="w-10" />
      </header>

      {/* 진행률 바 */}
      <div className="px-4 pb-3">
        <div className="bg-white rounded-2xl p-3 shadow-soft border border-zen-lavender/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary">수집 진행률</span>
            <span className="text-sm font-game text-zen-purple">
              {unlockedCount} / {TOTAL_MONSTERS}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-zen-purple to-zen-pink rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / TOTAL_MONSTERS) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-text-secondary mt-1 text-right">
            {((unlockedCount / TOTAL_MONSTERS) * 100).toFixed(1)}% 완료
          </p>
        </div>
      </div>

      {/* 검색 & 카테고리 필터 */}
      <div className="px-4 pb-2 space-y-2">
        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="몬스터 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-zen-purple focus:ring-1 focus:ring-zen-purple/20"
          />
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-zen-purple text-white shadow-soft"
                  : "bg-white text-text-secondary border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 몬스터 그리드 */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
        <div className="grid grid-cols-3 gap-2.5">
          {filteredMonsters.map((monster) => {
            const isUnlocked = unlockedIds?.includes(monster.id) ?? false;
            const rarity = RARITY_COLORS[monster.rarity];

            return (
              <Card
                key={monster.id}
                className={`p-2 flex flex-col items-center text-center relative overflow-hidden transition-all ${
                  isUnlocked 
                    ? `${rarity.bg} border-2 ${rarity.border}` 
                    : "grayscale opacity-50 border border-gray-200"
                }`}
              >
                {/* 자물쇠 */}
                {!isUnlocked && (
                  <div className="absolute top-1 right-1 text-gray-400 z-10">
                    <Lock className="w-3 h-3" />
                  </div>
                )}

                {/* 등급 배지 */}
                {isUnlocked && (
                  <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold z-10 ${rarity.badge}`}>
                    {RARITY_LABELS[monster.rarity]}
                  </div>
                )}

                {/* 넘버 */}
                <div className="absolute top-1 right-1 text-[8px] text-gray-400 font-bold">
                  {isUnlocked ? `#${String(monster.id + 1).padStart(3, '0')}` : ''}
                </div>

                {/* 이미지 */}
                <div className={`w-20 h-20 rounded-xl relative overflow-hidden border ${
                  isUnlocked ? rarity.border : "border-gray-200"
                }`}>
                  {isUnlocked ? (
                    <Image
                      src={monster.image}
                      alt={monster.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 text-2xl font-bold">
                      ?
                    </div>
                  )}
                </div>

                {/* 이름 */}
                <p className={`mt-1 text-[10px] font-bold leading-tight ${
                  isUnlocked ? rarity.text : "text-gray-400"
                }`}>
                  {isUnlocked ? monster.name : "???"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="px-4 pb-4">
        <div className="bg-white/80 rounded-2xl p-3 border border-dashed border-zen-lavender-dark text-center backdrop-blur-sm">
          <p className="text-[10px] text-text-secondary">
            게임 클리어, 출석, 상점 구매 등 다양한 방법으로<br/>
            몬스터 도감을 채워보세요! 🏆
          </p>
        </div>
      </div>
    </div>
  );
}
