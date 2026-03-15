"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/useUIStore";
import { Sparkles, Star, Gem, Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LevelUpModal() {
  const { isLevelUpModalOpen, closeLevelUpModal, levelUpData } = useUIStore();

  if (!levelUpData) return null;

  return (
    <AnimatePresence>
      {isLevelUpModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeLevelUpModal}
          />

          <motion.div
            initial={{ scale: 0.5, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl border-8 border-zen-lavender overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-zen-pink via-zen-purple to-zen-mint" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 w-48 h-48 bg-zen-pink/10 rounded-full blur-3xl" 
            />
            
            <div className="text-center relative z-10">
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-24 h-24 bg-zen-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-pop border-4 border-white"
              >
                <Star className="w-12 h-12 text-white fill-white" />
              </motion.div>

              <h2 className="text-zen-purple-dark text-lg font-body uppercase tracking-[0.2em] mb-2">Level Up!</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-4xl font-heading text-gray-400">Lv.{levelUpData.oldLevel}</span>
                <ArrowRight className="w-6 h-6 text-zen-pink" />
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl font-heading text-zen-purple"
                >
                  Lv.{levelUpData.newLevel}
                </motion.span>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 mb-8 border-2 border-dashed border-zen-lavender">
                <p className="text-sm font-body text-gray-500 mb-4">레벨업 보상이 도착했어요!</p>
                <div className="flex justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2 shadow-soft">
                      <Coins className="w-6 h-6 text-currency-gold" fill="currentColor" />
                    </div>
                    <span className="font-bold text-currency-gold">+{levelUpData.rewards.gold}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 shadow-soft">
                      <Gem className="w-6 h-6 text-zen-purple" fill="currentColor" />
                    </div>
                    <span className="font-bold text-zen-purple">+{levelUpData.rewards.gems}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={closeLevelUpModal}
                className="w-full h-14 rounded-2xl bg-zen-purple hover:bg-zen-purple-dark text-white text-xl font-heading shadow-pop"
              >
                확인
              </Button>
            </div>

            {/* Sparkle Particles - Simplified for implementation */}
            <motion.div 
               animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute top-10 left-10 text-zen-pink"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
