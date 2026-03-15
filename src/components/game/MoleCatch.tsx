"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MoleCatchProps {
  words: { id: string; english: string; korean: string }[];
  onComplete: (correctIds: string[], wrongIds: string[]) => void;
}

export function MoleCatch({ words, onComplete }: MoleCatchProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moles, setMoles] = useState<{ id: string; text: string; isCorrect: boolean; active: boolean; hit: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ id: string; isCorrect: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentWord = words[currentIndex];

  // 두더지 데이터 생성 (항상 4개)
  const spawnMoles = useCallback(() => {
    if (!currentWord) return;

    const correctMole = { id: currentWord.id, text: currentWord.korean, isCorrect: true, active: false, hit: false };
    const otherOptions = words.filter(w => w.id !== currentWord.id);
    const dummyWords = ["사과", "바나나", "강아지", "학교", "컴퓨터", "우주", "미래", "행복", "사랑", "지구", "바다", "태양"];
    
    let pool = otherOptions.map(w => ({ id: w.id, text: w.korean, isCorrect: false, active: false, hit: false }));
    
    // 중복 제거 및 3개 오답 확보
    const uniquePool: typeof pool = [];
    const seenText = new Set([currentWord.korean]);
    
    pool.forEach(p => {
      if (!seenText.has(p.text)) {
        uniquePool.push(p);
        seenText.add(p.text);
      }
    });

    while (uniquePool.length < 3) {
      const randomText = dummyWords[Math.floor(Math.random() * dummyWords.length)];
      if (!seenText.has(randomText)) {
        uniquePool.push({ id: `dummy-${Math.random()}`, text: randomText, isCorrect: false, active: false, hit: false });
        seenText.add(randomText);
      }
    }

    // 정답 1개 + 오답 3개 섞기
    const finalPool = [correctMole, ...uniquePool.slice(0, 3)].sort(() => Math.random() - 0.5);
    setMoles(finalPool);
  }, [currentWord, words]);

  useEffect(() => {
    spawnMoles();
  }, [spawnMoles]);

  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= words.length) {
      const correctIds = results.filter(r => r.isCorrect).map(r => r.id);
      const wrongIds = results.filter(r => !r.isCorrect).map(r => r.id);
      onComplete(correctIds, wrongIds);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    const moleInterval = setInterval(() => {
      setMoles(prev => {
        if (prev.length === 0) return prev;
        return prev.map(m => {
          if (m.hit) return m;
          // 30% 확률로 상태 변경
          return Math.random() > 0.7 ? { ...m, active: !m.active } : m;
        });
      });
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(moleInterval);
    };
  }, [timeLeft, currentIndex, words.length, results, onComplete]);

  const handleHit = (mIdx: number) => {
    const mole = moles[mIdx];
    if (!mole || !mole.active || mole.hit) return;

    setMoles(prev => {
      const next = [...prev];
      if (next[mIdx]) {
        next[mIdx].hit = true;
        next[mIdx].active = true;
      }
      return next;
    });

    if (mole.isCorrect) {
      setScore(prev => prev + 1);
      setResults(prev => [...prev, { id: mole.id, isCorrect: true }]);
      new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play().catch(() => {});
      setTimeout(() => setCurrentIndex(prev => prev + 1), 800);
    } else {
      setResults(prev => [...prev, { id: currentWord.id, isCorrect: false }]);
      new Audio("https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3").play().catch(() => {});
      setTimeout(() => setCurrentIndex(prev => prev + 1), 800);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4 animate-in fade-in duration-500">
      {/* 상단 정보 바 */}
      <div className="flex justify-between w-full px-4 mb-2">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-zen-purple-dark font-bold border-2 border-zen-purple shadow-soft flex items-center gap-2">
          <span className="text-lg">⏱️</span> {timeLeft}s
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-zen-mint-dark font-bold border-2 border-zen-mint shadow-soft flex items-center gap-2">
          <span className="text-lg">🔥</span> {score}
        </div>
      </div>

      {/* 문제 단어 표시 */}
      <div className="text-center bg-white/60 p-6 rounded-[2rem] backdrop-blur-md border-4 border-white w-full shadow-pop relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-zen-blue-light/50" />
        <p className="text-xs text-text-secondary mb-2 font-bold uppercase tracking-wider">Catch the meaning!</p>
        <h2 className="text-5xl font-heading text-zen-blue drop-shadow-sm tracking-tight">
          {currentWord.english}
        </h2>
      </div>

      {/* 2x2 Holes Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-10 mb-8 w-full max-w-sm px-4">
        {[0, 1, 2, 3].map((idx) => {
          const mole = moles[idx];
          return (
            <div key={idx} className="relative h-24 flex flex-col items-center justify-end">
              {/* Hole Background */}
              <div className="absolute bottom-0 w-32 h-12 bg-slate-800 rounded-[50%] shadow-inner border-b-4 border-slate-950 z-0" />
              
              {/* Mole / Button */}
              {mole && (
                <button
                  onClick={() => handleHit(idx)}
                  className={cn(
                    "w-28 h-20 transition-all duration-300 transform z-10 relative",
                    mole.active ? "translate-y-[-25%] opacity-100 scale-100" : "translate-y-[40%] opacity-0 pointer-events-none scale-90",
                    mole.hit && mole.isCorrect ? "animate-bounce" : ""
                  )}
                >
                  <div className={cn(
                    "w-full h-full rounded-2xl border-4 flex items-center justify-center p-2 text-center text-sm font-bold shadow-pop transition-colors",
                    mole.hit 
                      ? (mole.isCorrect ? "bg-zen-mint border-zen-mint-dark text-white" : "bg-zen-pink border-zen-pink-dark text-white") 
                      : (mole.isCorrect ? "bg-zen-purple border-zen-purple-dark text-white" : "bg-white border-zen-lavender-dark text-zen-purple-dark")
                  )}>
                    {mole.text}
                  </div>
                  
                  {/* Hit Effect Particles (Simple) */}
                  {mole.hit && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl animate-bounce pointer-events-none">
                      {mole.isCorrect ? "✨" : "💢"}
                    </div>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[10px] text-text-secondary bg-white/70 px-6 py-2 rounded-full animate-pulse border-2 border-white font-medium shadow-sm">
        정답 뜻이 보일 때 구멍을 빠르게 터치! 👋
      </p>
    </div>
  );
}
