"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/stores/useGameStore";
import { Monster } from "@/components/game/Monster";
import { SpellPuzzle } from "@/components/game/SpellPuzzle";
import { WordMatch } from "@/components/game/WordMatch";
import { WordImage } from "@/components/game/WordImage";
import { BattleIntro } from "@/components/game/BattleIntro";
import { useWords, useUnit } from "@/hooks/useGameData";

export default function BattlePage() {
  const params = useParams();
  const router = useRouter();
  const unitIdPath = params.unitId as string;
  const { data: dbWords } = useWords(unitIdPath);
  const { data: unitData } = useUnit(unitIdPath);
  const [showIntro, setShowIntro] = useState(true);

  const { 
    words, 
    currentIndex, 
    monsterHp, 
    maxHp, 
    initGame, 
    submitAnswer,
    submitMatchResult,
    gameType,
    isRevenge
  } = useGameStore();

  const [isHit, setIsHit] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<string>("");

  // 몬스터 이미지 매핑 (Dex와 동일)
  const MONSTER_IMAGES: Record<string, string> = {
    slime: "/images/monsters/media__1773510028776.jpg",
    default: "/images/monsters/media__1773510028789.jpg",
    dragon: "/images/monsters/media__1773510028838.jpg",
    ghost: "/images/monsters/media__1773510028844.jpg",
    robot: "/images/monsters/media__1773510160804.jpg",
  };

  const monsterImageArray = Object.values(MONSTER_IMAGES);

  // DB에서 데이터 로드되면 스토어에 세팅 및 몬스터 이미지 선택
  useEffect(() => {
    if (!selectedMonster && unitData) {
      const mType = unitData.monster_type || "default";
      const mappedImg = MONSTER_IMAGES[mType] || monsterImageArray[Math.floor(Math.random() * monsterImageArray.length)];
      setSelectedMonster(mappedImg);
    } else if (!selectedMonster && !unitData) {
      // unitData가 없을 때의 폴백 (랜덤)
      setSelectedMonster(monsterImageArray[0]);
    }

    if (!isRevenge && dbWords && dbWords.length > 0) {
      // 모든 단어 사용 (테스트 제한 제거)
      initGame(unitIdPath, dbWords, gameType || "spell");
    }
  }, [dbWords, unitData, unitIdPath, initGame, isRevenge, gameType, selectedMonster]);

  const currentWord = words[currentIndex];
  // 매칭용 단어 번들 (현재 위치부터 최대 5개)
  const matchGroup = words.slice(currentIndex, currentIndex + 5);
  
  const isMonsterDead = monsterHp <= 0 && maxHp > 0;
  const isGameFinished = maxHp > 0 && currentIndex >= maxHp;

  useEffect(() => {
    if (isGameFinished) {
      const timer = setTimeout(() => {
        router.push(`/result/${params.unitId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isGameFinished, router, params.unitId]);

  const handleCorrect = () => {
    setIsHit(true);
    submitAnswer(true);
    setTimeout(() => setIsHit(false), 500);
  };

  const handleWrong = () => {
    submitAnswer(false);
  };

  const handleMatchComplete = (allCorrect: boolean) => {
    if (allCorrect) {
      setIsHit(true);
      submitMatchResult(matchGroup.map(w => ({ word: w, isCorrect: true })));
      setTimeout(() => setIsHit(false), 500);
    }
  };

  const handleMatchWrong = () => {
    // 몬스터 데미지 입는 애니메이션 등은 생략하고 상점 알림만 함
  };

  if (!dbWords) {
    return (
      <div className="flex-1 flex items-center justify-center font-bold text-zen-lavender-dark animate-pulse">
        스테이지를 불러오는 중...
      </div>
    );
  }

  if (!currentWord && !isGameFinished) return null;

  return (
    <div className="flex flex-col h-full w-full justify-between pb-4 pt-4">
      {showIntro && <BattleIntro stageTitle="동물 친구들 모험" onComplete={() => setShowIntro(false)} />}
      
      {/* 상단 몬스터 및 진행도 영역 */}
      <section className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute top-2 right-4 z-20">
          {!isGameFinished && (
            <div className="bg-white px-3 py-1 rounded-full shadow-soft text-sm font-bold text-text-secondary border-2 border-zen-lavender-dark">
              {Math.min(currentIndex + (gameType === "match" ? matchGroup.length : 1), maxHp)} / {maxHp} 번째
            </div>
          )}
        </div>

        <Monster 
          currentHp={monsterHp} 
          maxHp={maxHp} 
          hintEmoji={currentWord?.hintEmoji} 
          isHit={isHit} 
          imageUrl={selectedMonster}
        />
      </section>

      {/* 하단 인터랙티브 사용자 액션 영역 */}
      <div className="flex flex-col gap-1">
        <section className="bg-white mx-4 rounded-3xl border-4 border-zen-mint p-2 shadow-card z-10 min-h-[220px] flex flex-col justify-center">
          {!isGameFinished && gameType === "spell" && (
            <>
              <div className="text-center font-heading text-base text-text-primary mb-0.5">
                {currentWord?.korean}
              </div>
              <SpellPuzzle 
                english={currentWord.english} 
                onCorrect={handleCorrect}
                onWrong={handleWrong}
              />
            </>
          )}

          {!isGameFinished && gameType === "match" && (
            <>
              <div className="text-center font-heading text-base text-zen-purple-dark mb-0.5">
                뜻 매칭 (Connect Words)
              </div>
              <WordMatch 
                words={matchGroup} 
                onComplete={handleMatchComplete}
                onWrong={handleMatchWrong}
              />
            </>
          )}

          {isGameFinished && (
            <div className="text-center text-correct font-game text-lg animate-pop-in my-2">
              {isMonsterDead ? "Victory! 보물상자 방으로 이동합니다...🏃‍♂️💨" : "Finish! 결과를 확인하러 갑니다...🏃‍♂️💨"}
            </div>
          )}
        </section>

        {/* 하단 로비 버튼 */}
        <div className="px-4 pb-0.5">
          <button 
            onClick={() => router.push("/lobby")}
            className="w-full py-2 bg-white border-2 border-zen-lavender-dark rounded-full text-zen-purple-dark font-bold shadow-soft hover:bg-zen-lavender-light active:scale-95 transition-all flex items-center justify-center gap-2 text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            로비로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
