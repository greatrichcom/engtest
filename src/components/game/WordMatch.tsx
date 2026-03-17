"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WordMatchProps {
  words: { id: string; english: string; korean: string }[];
  onComplete: (isCorrect: boolean) => void;
  onWrong: () => void;
}

interface MatchItem {
  id: string;
  text: string;
  type: "en" | "ko";
}

export function WordMatch({ words, onComplete, onWrong }: WordMatchProps) {
  const [leftItems, setLeftItems] = useState<MatchItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // { enId: koId }
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; id: string }[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // 초기화: 왼쪽은 영단어, 오른쪽은 한글뜻(셔플)
    const en = words.map(w => ({ id: w.id, text: w.english, type: "en" as const }));
    const ko = words.map(w => ({ id: w.id, text: w.korean, type: "ko" as const }));
    
    const shuffledKo = [...ko].sort(() => Math.random() - 0.5);

    setLeftItems(en);
    setRightItems(shuffledKo);
    setMatches({});
    setLines([]);
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [words]);

  // 마우스/터치 이동 추적
  const handlePointerMove = (e: React.PointerEvent) => {
    if (selectedLeft && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // 배경 클릭 시 상호작용 초기화
  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedLeft(null);
      setSelectedRight(null);
      setMousePos(null);
    }
  };

  // 매칭 로직
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        setMatches(prev => ({ ...prev, [selectedLeft]: selectedRight }));
        setSelectedLeft(null);
        setSelectedRight(null);
        setMousePos(null);
        new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3").play().catch(() => {});
      } else {
        setWrongFlash(selectedLeft);
        new Audio("https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3").play().catch(() => {});
        onWrong();
        
        setTimeout(() => {
          setWrongFlash(null);
          setSelectedLeft(null);
          setSelectedRight(null);
          setMousePos(null);
        }, 500);
      }
    }
  }, [selectedLeft, selectedRight, onWrong]);

  // 선 긋기 좌표 계산
  useEffect(() => {
    const updateLines = () => {
      const newLines: any[] = [];
      Object.entries(matches).forEach(([enId, koId]) => {
        const leftEl = document.getElementById(`match-en-${enId}`);
        const rightEl = document.getElementById(`match-ko-${koId}`);
        const container = containerRef.current;
        
        if (leftEl && rightEl && container) {
          const cRect = container.getBoundingClientRect();
          const lRect = leftEl.getBoundingClientRect();
          const rRect = rightEl.getBoundingClientRect();
          
          newLines.push({
            id: enId,
            x1: lRect.right - cRect.left,
            y1: lRect.top + lRect.height / 2 - cRect.top,
            x2: rRect.left - cRect.left,
            y2: rRect.top + rRect.height / 2 - cRect.top
          });
        }
      });
      setLines(newLines);
    };

    updateLines();
    const timer = setTimeout(updateLines, 50);
    window.addEventListener("resize", updateLines);
    return () => {
      window.removeEventListener("resize", updateLines);
      clearTimeout(timer);
    };
  }, [matches, leftItems, rightItems, selectedLeft]);

  // 모두 완료 체크
  useEffect(() => {
    if (Object.keys(matches).length === words.length && words.length > 0) {
      setTimeout(() => onComplete(true), 800);
    }
  }, [matches, words, onComplete]);

  // 진행 중인 선의 시작점 (왼쪽 선택된 박스의 오른쪽 중앙)
  const getActiveStartPos = () => {
    if (!selectedLeft || !containerRef.current) return null;
    const el = document.getElementById(`match-en-${selectedLeft}`);
    if (!el) return null;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: eRect.right - cRect.left,
      y: eRect.top + eRect.height / 2 - cRect.top
    };
  };

  const activeStart = getActiveStartPos();

  return (
    <div 
      ref={containerRef} 
      onPointerMove={handlePointerMove}
      onClick={handleBgClick}
      className="relative w-full flex justify-center gap-10 py-2 select-none min-h-[250px] touch-none"
    >
      {/* 선을 그릴 SVG 레이어 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        {/* 매칭 완료된 선들 - 선명한 단일 색상 */}
        {lines.map(line => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-in fade-in zoom-in duration-300 transition-all opacity-100"
          />
        ))}

        {/* 현재 선택 중인 가이드 라인 */}
        {activeStart && mousePos && (
          <line
            x1={activeStart.x}
            y1={activeStart.y}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="#818CF8"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* 영단어 (왼쪽) */}
      <div className="flex flex-col gap-2 z-10 w-[120px]">
        {leftItems.map((item) => {
          const isMatched = !!matches[item.id];
          const isSelected = selectedLeft === item.id;
          const isWrong = wrongFlash === item.id;

          return (
            <button
              key={item.id}
              id={`match-en-${item.id}`}
              disabled={isMatched}
              onClick={() => setSelectedLeft(item.id)}
              className={cn(
                "w-full py-2 rounded-xl border-2 font-heading text-sm transition-all shadow-soft active:scale-95",
                isMatched ? "bg-zen-mint-light border-zen-mint text-zen-mint-dark shadow-none scale-[0.98]" :
                isSelected ? "bg-zen-purple border-zen-purple-dark text-white scale-105 ring-2 ring-zen-purple/30 z-20" :
                isWrong ? "bg-red-500 border-red-700 text-white animate-shake" :
                "bg-white border-zen-lavender-dark text-zen-purple-dark hover:border-zen-purple"
              )}
            >
              <span className="truncate block px-1">{item.text}</span>
            </button>
          );
        })}
      </div>

      {/* 한글뜻 (오른쪽) */}
      <div className="flex flex-col gap-2 z-10 w-[120px]">
        {rightItems.map((item) => {
          const isMatched = Object.values(matches).includes(item.id);
          const isSelected = selectedRight === item.id;

          return (
            <button
              key={item.id}
              id={`match-ko-${item.id}`}
              disabled={isMatched}
              onClick={() => setSelectedRight(item.id)}
              className={cn(
                "w-full py-2 rounded-xl border-2 font-heading text-sm transition-all shadow-soft active:scale-95",
                isMatched ? "bg-zen-mint-light border-zen-mint text-zen-mint-dark shadow-none scale-[0.98]" :
                isSelected ? "bg-zen-purple border-zen-purple-dark text-white scale-105 ring-2 ring-zen-purple/30 z-20" :
                "bg-white border-zen-lavender-dark text-zen-purple-dark hover:border-zen-purple"
              )}
            >
              <span className="truncate block px-1">{item.text}</span>
            </button>
          );
        })}
      </div>


    </div>
  );
}
