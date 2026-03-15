"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface TreasureBoxProps {
  onOpen?: () => void;
  isOpen?: boolean;
}

export const TreasureBox = ({ onOpen, isOpen = false }: TreasureBoxProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    if (onOpen) onOpen();
  };

  return (
    <div className="relative flex items-center justify-center w-48 h-48 cursor-pointer group" onClick={handleOpen}>
      {/* Glow Effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-zen-orange rounded-full blur-3xl"
      />

      {/* Box Animation */}
      <motion.div
        animate={
          isOpen
            ? { scale: [1, 1.2, 1], y: [0, -20, 0] }
            : { rotate: [0, -2, 2, -2, 2, 0] }
        }
        transition={
          isOpen
            ? { duration: 0.5 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative z-10 text-8xl filter drop-shadow-2xl"
      >
        {isOpen ? "🔓" : "🎁"}
      </motion.div>

      {/* Particles/Sparkles on Open */}
      {isOpen && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 60 + 20),
                y: -Math.random() * 80 - 20,
              }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="absolute z-20 text-zen-gold text-2xl"
            >
              <Sparkles className="w-6 h-6 fill-zen-gold" />
            </motion.div>
          ))}
        </>
      )}

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-4 text-zen-purple-dark font-game text-sm bg-white px-3 py-1 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
        >
          TAP TO OPEN!
        </motion.div>
      )}
    </div>
  );
};
