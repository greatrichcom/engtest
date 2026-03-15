"use client";

import { useState, useEffect } from "react";
import { 
  DndContext, 
  DragEndEvent, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { DraggableLetter } from "./DraggableLetter";
import { DroppableSlot } from "./DroppableSlot";

interface SpellPuzzleProps {
  english: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function SpellPuzzle({ english, onCorrect, onWrong }: SpellPuzzleProps) {
  // 사용 가능한 알파벳 조각들 객체 배열 (id 포함)
  const [availableLetters, setAvailableLetters] = useState<{ id: string; val: string }[]>([]);
  // 정답 타겟 칸 상태 (originId를 통해 어떤 글자 조각이 들어있는지 추적)
  const [slots, setSlots] = useState<{ id: string; val: string | null; originId?: string }[]>([]);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  const [errorShake, setErrorShake] = useState(false);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  const [isLastCorrect, setIsLastCorrect] = useState(false);

  useEffect(() => {
    initPuzzle();
  }, [english]);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playSound = (type: "correct" | "wrong") => {
    const audio = new Audio(
      type === "correct" 
        ? "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3"
        : "https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3"
    );
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const initPuzzle = () => {
    const letters = english.split("").map((val, idx) => ({ id: `letter-${idx}-${val}`, val }));
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    setAvailableLetters(letters);

    const initialSlots = Array(english.length).fill(null).map((_, idx) => ({ id: `slot-${idx}`, val: null }));
    setSlots(initialSlots);
    setSelectedSlotIdx(null);
    setErrorShake(false);
    setShowAnswerOverlay(false);
  };

  const completeStep = (isCorrect: boolean) => {
    setIsLastCorrect(isCorrect);
    setShowAnswerOverlay(true);
    
    if (isCorrect) {
      playSound("correct");
      speak(english);
    } else {
      playSound("wrong");
      setErrorShake(true);
    }
  };

  const handleNextAction = () => {
    if (!showAnswerOverlay) return;
    
    if (isLastCorrect) {
      onCorrect();
    } else {
      onWrong();
      initPuzzle();
    }
    setShowAnswerOverlay(false);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } })
  );

  const handleSlotClick = (idx: number) => {
    const slot = slots[idx];
    
    // 이미 글자가 채워져 있다면 다시 빼기
    if (slot.val && slot.originId) {
      const charToRestore = slot.val;
      const originId = slot.originId;

      // 슬롯 비우기
      const newSlots = [...slots];
      newSlots[idx] = { ...slot, val: null, originId: undefined };
      setSlots(newSlots);

      // 알파벳 조각 복구
      setAvailableLetters(prev => prev.map(l => l.id === originId ? { ...l, val: charToRestore } : l));
      setSelectedSlotIdx(idx);
    } else {
      // 빈 칸이라면 선택만 하기
      setSelectedSlotIdx(idx === selectedSlotIdx ? null : idx);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    const slotId = over.id as string;
    const letterId = active.id as string;
    const droppedLetter = availableLetters.find(l => l.id === letterId);

    if (!droppedLetter || !droppedLetter.val) return;

    const targetSlotIdx = slots.findIndex(s => s.id === slotId);
    if (targetSlotIdx === -1) return;
    
    let realTargetIdx = targetSlotIdx;
    if (slots[targetSlotIdx].val !== null) {
      const nextEmptyIdx = slots.findIndex(s => s.val === null);
      if (nextEmptyIdx === -1) return;
      realTargetIdx = nextEmptyIdx;
    }

    const newSlots = [...slots];
    newSlots[realTargetIdx].val = droppedLetter.val;
    newSlots[realTargetIdx].originId = letterId;
    setSlots(newSlots);

    const newAvailables = availableLetters.map(l => l.id === letterId ? { ...l, val: "" } : l);
    setAvailableLetters(newAvailables);
    setSelectedSlotIdx(null);

    if (newSlots.every(s => s.val !== null)) {
      const answer = newSlots.map(s => s.val).join("");
      completeStep(answer === english);
    }
  };

  const handleHint = () => {
    // 1. 힌트 줄 타겟 인덱스 결정 (선택된 칸이 있으면 그곳, 없으면 첫 빈칸)
    let targetIdx = selectedSlotIdx !== null ? selectedSlotIdx : slots.findIndex(s => s.val === null);
    
    // 만약 선택된 칸이 이미 차 있다면 빈 칸을 새로 찾음
    if (targetIdx !== -1 && slots[targetIdx].val !== null) {
      targetIdx = slots.findIndex(s => s.val === null);
    }

    if (targetIdx === -1) return;

    const correctChar = english[targetIdx];
    // 가용한 조각 중 정답 글자 찾기
    const letterToUseIdx = availableLetters.findIndex(l => l.val === correctChar);
    if (letterToUseIdx === -1) return;

    const letterId = availableLetters[letterToUseIdx].id;
    const newSlots = [...slots];
    newSlots[targetIdx] = { ...newSlots[targetIdx], val: correctChar, originId: letterId };
    setSlots(newSlots);

    const newAvailables = availableLetters.map(l => l.id === letterId ? { ...l, val: "" } : l);
    setAvailableLetters(newAvailables);
    setSelectedSlotIdx(null);

    if (newSlots.every(s => s.val !== null)) {
      const answer = newSlots.map(s => s.val).join("");
      completeStep(answer === english);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 py-4 touch-none relative">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* Target Slots */}
        <div className={`flex gap-2 flex-wrap items-center justify-center ${errorShake ? "animate-shake" : ""}`}>
          {slots.map((slot, idx) => (
            <DroppableSlot 
              key={slot.id} 
              id={slot.id} 
              letter={slot.val} 
              isSelected={selectedSlotIdx === idx}
              onClick={() => handleSlotClick(idx)}
            />
          ))}
        </div>

        {/* Available Letters & Hint Button */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex gap-3 flex-wrap items-center justify-center relative min-h-[4rem]">
            {availableLetters.map((item) => (
              <DraggableLetter key={item.id} id={item.id} letter={item.val} />
            ))}
          </div>
          
          <button
            onClick={handleHint}
            className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-zen-orange rounded-full text-zen-orange font-bold shadow-card hover:scale-105 active:scale-95 transition-all text-sm group"
          >
            <span className="group-hover:animate-bounce">💡</span>
            <span>한 글자 힌트!</span>
          </button>
        </div>
      </DndContext>

      {/* 실시간 정답 확인용 오버레이 (정해진 시간에 사라지지 않고 터치 시 다음으로) */}
      {showAnswerOverlay && (
        <div 
          onClick={handleNextAction}
          className="fixed inset-0 flex items-center justify-center z-[100] cursor-pointer bg-black/20 backdrop-blur-[2px] animate-fade-in"
        >
          <div className={cn(
            "bg-white px-10 py-6 rounded-[2.5rem] shadow-pop border-4 flex flex-col items-center animate-pop-in",
            isLastCorrect ? "border-correct" : "border-wrong"
          )}>
            <div className={cn(
               "text-xl font-bold mb-2",
               isLastCorrect ? "text-correct" : "text-wrong"
            )}>
              {isLastCorrect ? "Great! ✨" : "Oops! 🤔"}
            </div>
            
            <p className="text-sm text-text-secondary mb-1">정답은</p>
            <p className="text-4xl font-heading text-zen-purple tracking-widest mb-6">{english}</p>
            
            <div className="text-xs text-text-secondary animate-pulse">
              화면을 터치하면 다음 문제로 넘어가요!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
