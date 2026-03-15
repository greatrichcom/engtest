"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/stores/useGameStore";
import { useSaveProgress } from "@/hooks/useGameData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star, Swords, Home } from "lucide-react";
import { motion } from "framer-motion";
import { TreasureBox } from "@/components/game/TreasureBox";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const { score, maxHp, wrongWords, resetGame } = useGameStore();

  const { mutate: saveProgress, data: rewards } = useSaveProgress();

  // stars 파생 변수로 변경 (상태 불필요)
  const totalWords = maxHp;
  const correctCount = totalWords > 0 ? totalWords - wrongWords.length : 0;
  const ratio = totalWords > 0 ? correctCount / totalWords : 0;
  
  let stars = 0;
  if (ratio === 1) stars = 3;
  else if (ratio >= 0.7) stars = 2;
  else if (ratio >= 0.4) stars = 1;
  else stars = 0;

  const [boxOpen, setBoxOpen] = useState(false);

  useEffect(() => {
    if (totalWords === 0) return; // 뒤로가기 대응
    
    // Supabase DB 저장
    saveProgress({
      unitId: params.unitId as string,
      score,
      stars,
      wrongWordsCount: wrongWords.length
    });
  }, [totalWords, params.unitId, score, stars, wrongWords.length, saveProgress]);

  const handleReturnLobby = () => {
    resetGame();
    router.push("/lobby");
  };

  const handleRevenge = () => {
    router.push(`/revenge/${params.unitId}`);
  };

  const handleBoxOpen = () => {
    setBoxOpen(true);
  };

  if (maxHp === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        해당 스테이지의 게임 기록이 없거나 만료되었습니다.
        <Button onClick={handleReturnLobby} className="mt-4">로비로 돌아가기</Button>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full flex-1 flex items-center justify-center animate-pop-in">
        <Card className="w-full max-w-sm rounded-[2rem] border-4 border-zen-mint bg-white overflow-hidden shadow-card">
          <div className="text-center mb-6 pt-6 relative">
            <h1 className="text-4xl font-heading text-zen-purple drop-shadow-sm mb-4">
              STAGE CLEAR!
            </h1>
            
            {/* 별점 표시 애니메이션 */}
            <div className="flex justify-center gap-2 mb-6">
               {[1, 2, 3].map((star) => (
                 <Star
                   key={star}
                   fill={star <= stars ? "#FBBF24" : "#E5E7EB"}
                   className={`w-12 h-12 transition-all ${star <= stars ? "text-yellow-400 drop-shadow-md animate-pop-in" : "text-gray-300"}`}
                   style={{ transitionDelay: `${star * 200}ms` }}
                 />
               ))}
            </div>

            {/* 보물상자 연출 구역 */}
            <div className="mb-6 flex flex-col items-center justify-center min-h-[200px]">
              <TreasureBox isOpen={boxOpen} onOpen={handleBoxOpen} />
            </div>

            {/* 점수 & 보상 결과 패널 */}
            <div className="bg-zen-lavender-light/30 rounded-2xl p-4 mx-4 shadow-inner space-y-3 font-body">
              <div className="flex justify-between items-center text-lg">
                <span className="text-text-secondary font-bold">Total Score</span>
                <span className="text-2xl font-game text-zen-purple">{score}</span>
              </div>
              <div className="h-px w-full bg-zen-lavender-dark/20" />
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">정답 단어</span>
                <span className="font-bold text-correct">{maxHp - wrongWords.length} 개</span>
              </div>

              {/* 추가 보상 표시 */}
              {boxOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-3 border-t-2 border-zen-lavender/50"
                >
                  <p className="text-[10px] text-zen-purple font-bold mb-2 tracking-widest uppercase">보상 획득 완료!</p>
                  <div className="flex justify-center gap-6">
                    {rewards?.rewards?.gold !== undefined && rewards.rewards.gold > 0 ? (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-1">🪙</span>
                        <span className="font-bold text-zen-orange text-lg">+{rewards.rewards.gold}</span>
                      </div>
                    ) : rewards ? (
                       <span className="text-xs text-text-secondary">보상을 이미 획득했습니다.</span>
                    ) : (
                      <div className="animate-pulse w-full h-8 bg-gray-100 rounded-lg" />
                    )}
                    
                    {rewards?.rewards?.gems !== undefined && rewards.rewards.gems > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-1">💎</span>
                        <span className="font-bold text-zen-purple text-lg">+{rewards.rewards.gems}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-3 mt-8">
            {wrongWords.length > 0 && (
              <Button
                size="lg"
                className="w-full bg-wrong hover:bg-red-500 text-white flex items-center gap-2 shadow-pop"
                onClick={handleRevenge}
              >
                <Swords className="w-5 h-5" />
                리벤지 매치 도전 ({wrongWords.length}개)
              </Button>
            )}
            
            <Button
              variant={wrongWords.length > 0 ? "secondary" : "primary"}
              size="lg"
              className="w-full text-lg flex items-center gap-2"
              onClick={handleReturnLobby}
            >
              <Home className="w-5 h-5" />
              로비로 돌아가기
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
