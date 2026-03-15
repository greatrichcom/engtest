"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Swords } from "lucide-react";

interface BattleIntroProps {
  stageTitle: string;
  onComplete: () => void;
}

export const BattleIntro = ({ stageTitle, onComplete }: BattleIntroProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-zen-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-pop border-4 border-white">
              <Swords className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-white text-lg font-body mb-2 tracking-widest uppercase opacity-80">Battle Start</h2>
            <h1 className="text-4xl font-heading text-white drop-shadow-lg">
              {stageTitle}
            </h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-zen-mint mt-6 rounded-full mx-auto max-w-[200px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
