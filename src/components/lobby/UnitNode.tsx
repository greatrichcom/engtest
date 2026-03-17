"use client";

import { motion } from "framer-motion";
import { Star, Lock, Play } from "lucide-react";

interface UnitNodeProps {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "cleared";
  stars: number;
  index: number;
  onClick: () => void;
}

export function UnitNode({ title, status, stars, index, onClick }: UnitNodeProps) {
  const isLocked = status === "locked";
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <button
        disabled={isLocked}
        onClick={onClick}
        className={`
          w-full mb-4 relative rounded-3xl border-4 p-4 flex items-center gap-4 transition-all
          ${isLocked 
            ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed" 
            : "bg-white border-zen-lavender shadow-pop hover:-translate-y-1 active:translate-y-0 active:shadow-none"
          }
        `}
      >
        {/* 인덱스/번호 박스 */}
        <div className={`
          w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2
          ${isLocked ? "bg-gray-200 border-gray-300 text-gray-400" : "bg-zen-lavender-light border-white text-zen-purple shadow-soft"}
        `}>
          <span className="text-[10px] font-bold opacity-60">Unit</span>
          <span className="text-xl font-game leading-none">{index + 1}</span>
        </div>

        {/* 유닛 정보 */}
        <div className="flex-1 text-left">
          <h3 className={`font-bold text-lg leading-tight line-clamp-1 ${isLocked ? "text-gray-400" : "text-zen-purple-dark"}`}>
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            {isLocked ? (
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> 잠겨있음
              </span>
            ) : status === "cleared" ? (
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < stars ? "fill-currency-gold text-currency-gold" : "text-gray-200"}`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-[10px] text-zen-purple font-bold flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" /> 지금 도전하세요!
              </span>
            )}
          </div>
        </div>

        {/* 상태 아이콘 */}
        {!isLocked && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === 'cleared' ? 'bg-zen-mint text-white' : 'bg-zen-lavender text-white'}`}>
            {status === 'cleared' ? <Star className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </div>
        )}
      </button>
    </motion.div>
  );
}

