"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Flame, Trophy } from "lucide-react";

interface AttendanceModalProps {
  isOpen: boolean;
  streak: number;
  onClose: () => void;
  milestone?: "1d" | "3d" | "7d" | null;
}

const MILESTONES = {
  "1d": { icon: CalendarCheck, label: "오늘의 출석!", color: "text-zen-green", bg: "bg-green-50", border: "border-zen-green" },
  "3d": { icon: Flame, label: "3일 연속 출석!", color: "text-zen-orange", bg: "bg-orange-50", border: "border-zen-orange" },
  "7d": { icon: Trophy, label: "7일 연속 출석!", color: "text-zen-purple", bg: "bg-purple-50", border: "border-zen-purple" },
};

export function AttendanceModal({ isOpen, streak, onClose, milestone }: AttendanceModalProps) {
  const milestoneData = milestone ? MILESTONES[milestone] : MILESTONES["1d"];
  const Icon = milestoneData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className={`relative bg-white rounded-[2rem] w-full max-w-xs p-6 shadow-pop border-4 ${milestoneData.border} z-10`}
          >
            {/* 아이콘 */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`w-20 h-20 rounded-full ${milestoneData.bg} flex items-center justify-center`}
              >
                <Icon className={`w-10 h-10 ${milestoneData.color}`} />
              </motion.div>
            </div>

            {/* 제목 */}
            <h2 className={`text-2xl font-heading text-center mb-2 ${milestoneData.color}`}>
              {milestoneData.label}
            </h2>

            {/* 연속 출석 일수 */}
            <div className="text-center mb-4">
              <span className="text-4xl font-game text-zen-purple">{streak}</span>
              <span className="text-sm text-text-secondary ml-1">일 연속</span>
            </div>

            {/* 출석 바 (7일 기준) */}
            <div className="flex justify-center gap-1.5 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <motion.div
                  key={day}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: day * 0.08 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    day <= (streak % 7 || 7)
                      ? `${milestoneData.bg} ${milestoneData.border} ${milestoneData.color}`
                      : "bg-gray-100 border-gray-200 text-gray-400"
                  }`}
                >
                  {day}
                </motion.div>
              ))}
            </div>

            {/* 보상 안내 */}
            {milestone && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-zen-lavender-light/50 rounded-xl p-3 text-center mb-4"
              >
                <p className="text-xs text-zen-purple font-bold">🎁 보너스 몬스터 도감 1마리 해금!</p>
              </motion.div>
            )}

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-2xl font-bold text-white shadow-pop active:scale-95 transition-all ${
                milestone === "7d" ? "bg-zen-purple" : milestone === "3d" ? "bg-zen-orange" : "bg-zen-green"
              }`}
            >
              확인! 🎉
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
