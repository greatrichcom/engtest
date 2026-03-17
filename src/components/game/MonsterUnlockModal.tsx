"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MonsterEntry, RARITY_COLORS, RARITY_LABELS } from "@/lib/monsterRegistry";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";

interface MonsterUnlockModalProps {
  monster: MonsterEntry | null;
  unlockSource?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SOURCE_LABELS: Record<string, string> = {
  battle_2star: "⭐⭐ 스펠링 클리어!",
  battle_3star: "⭐⭐⭐ 퍼펙트 클리어!",
  match_70: "뜻 매칭 70%↑ 달성!",
  match_100: "뜻 매칭 100% 달성!",
  attendance_1d: "오늘의 출석 보상!",
  attendance_3d: "🔥 3일 연속 출석!",
  attendance_7d: "🏆 7일 연속 출석!",
  shop_gold: "🪙 골드로 구매!",
  shop_gems: "💎 보석으로 구매!",
};

export function MonsterUnlockModal({ monster, unlockSource, isOpen, onClose }: MonsterUnlockModalProps) {
  if (!monster) return null;

  const rarity = RARITY_COLORS[monster.rarity];
  const sourceLabel = unlockSource ? SOURCE_LABELS[unlockSource] || unlockSource : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 모달 본체 */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative bg-white rounded-[2.5rem] w-full max-w-xs p-6 shadow-pop border-4 border-zen-purple z-10 overflow-hidden"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 배경 반짝임 효과 */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute top-4 left-6 text-yellow-300 text-xl">✨</div>
              <div className="absolute top-12 right-8 text-yellow-300 text-sm">⭐</div>
              <div className="absolute bottom-20 left-10 text-yellow-300 text-lg">✨</div>
              <div className="absolute bottom-10 right-6 text-yellow-300 text-xs">⭐</div>
            </motion.div>

            {/* 해금 사유 */}
            {sourceLabel && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-3"
              >
                <span className="text-xs font-bold text-zen-purple bg-zen-lavender-light px-3 py-1 rounded-full">
                  {sourceLabel}
                </span>
              </motion.div>
            )}

            {/* 타이틀 */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-heading text-zen-purple-dark text-center mb-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              새 몬스터 발견!
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.h2>

            {/* 몬스터 카드 */}
            <motion.div
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              className={`mx-auto w-48 h-48 rounded-3xl ${rarity.bg} border-4 ${rarity.border} shadow-monster relative overflow-hidden mb-4`}
            >
              <Image
                src={monster.image}
                alt={monster.name}
                fill
                className="object-cover"
              />
              {/* 등급 배지 */}
              <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${rarity.badge}`}>
                {RARITY_LABELS[monster.rarity]}
              </div>
            </motion.div>

            {/* 몬스터 이름 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mb-4"
            >
              <h3 className={`text-xl font-bold ${rarity.text}`}>{monster.name}</h3>
              <p className="text-xs text-text-secondary mt-1">No. {String(monster.id + 1).padStart(3, '0')} · {monster.category}</p>
            </motion.div>

            {/* 도감 등록 버튼 */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              onClick={onClose}
              className="w-full py-3 bg-zen-purple text-white font-bold rounded-2xl shadow-pop hover:bg-zen-purple-dark active:scale-95 transition-all text-lg"
            >
              도감에 등록! 🎉
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
