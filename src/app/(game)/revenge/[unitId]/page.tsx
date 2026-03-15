"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/Button";
import { MoleCatch } from "@/components/game/MoleCatch";

export default function RevengePage() {
  const router = useRouter();
  const { unitId, wrongWords, submitAnswer } = useGameStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [summary, setSummary] = useState({ correct: 0, wrong: 0 });

  const handleReturnLobby = () => {
    router.push("/lobby");
  };

  const startRevengeMatch = () => {
    setIsPlaying(true);
    setIsFinished(false);
  };

  const handleGameComplete = (correctIds: string[], wrongIds: string[]) => {
    setSummary({ correct: correctIds.length, wrong: wrongIds.length });
    setIsPlaying(false);
    setIsFinished(true);
  };

  if (wrongWords.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">틀린 단어가 없어요!</h2>
        <p className="border-b mb-6">참 잘했어요 🌟</p>
        <Button onClick={handleReturnLobby}>로비로 이동</Button>
      </div>
    );
  }

  // 1. 게임 실행 중
  if (isPlaying) {
    return (
      <div className="flex-1 flex flex-col p-4 h-full w-full items-center justify-center">
        <h1 className="text-2xl font-heading text-wrong mb-6">REVENGE: MOLE CATCH! ⚔️</h1>
        <MoleCatch words={wrongWords} onComplete={handleGameComplete} />
      </div>
    );
  }

  // 2. 게임 완료 후 결과
  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-pop-in">
        <div className="text-6xl mb-6">🔥</div>
        <h1 className="text-3xl font-heading text-zen-blue mb-2">훌륭합니다!</h1>
        <p className="text-text-secondary mb-8">오답들을 멋지게 처리하셨네요!</p>
        
        <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-card border-4 border-zen-mint mb-8">
          <div className="flex justify-between mb-2">
            <span>처리한 오답</span>
            <span className="font-bold text-correct">{summary.correct}</span>
          </div>
          <div className="flex justify-between font-body text-sm text-text-secondary">
            <span>아직 남은 단어</span>
            <span className="font-bold text-wrong">{summary.wrong}</span>
          </div>
        </div>

        <Button size="lg" className="w-full max-w-xs" onClick={handleReturnLobby}>
          로비로 돌아가기
        </Button>
      </div>
    );
  }

  // 3. 게임 대기 화면
  return (
    <div className="flex-1 flex flex-col p-4 pt-10 h-full w-full">
      <h1 className="text-3xl font-heading text-wrong mb-2 animate-shake">리벤지 매치! ⚔️</h1>
      <p className="text-text-secondary font-body mb-8">
        오답들을 두더지 잡기 게임으로 팡팡! 잡아보세요!
      </p>

      {/* 오답 노트 리스트 */}
      <div className="flex-1 w-full flex flex-col gap-3 overflow-y-auto pb-6">
        {wrongWords.map((word, idx) => (
          <div key={idx} className="bg-white rounded-card p-4 border-2 border-wrong/30 shadow-soft flex items-center justify-between">
            <span className="text-4xl">{word.hintEmoji}</span>
            <div className="flex-1 px-4">
              <div className="font-heading text-xl text-text-primary">{word.english}</div>
              <div className="text-sm text-text-secondary">{word.korean}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 space-y-3">
        <Button size="lg" className="w-full bg-wrong animate-bounce-slow" onClick={startRevengeMatch}>
          두더지 잡기 시작!
        </Button>
        <Button variant="ghost" className="w-full" onClick={handleReturnLobby}>
          다음에 할래요
        </Button>
      </div>
    </div>
  );
}
