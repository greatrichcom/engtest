"use client";

import { cn } from "@/lib/utils";
import { HpGauge } from "./HpGauge";
import Image from "next/image";

interface MonsterProps {
  currentHp: number;
  maxHp: number;
  hintEmoji?: string;
  isHit?: boolean;
  imageUrl?: string;
}

export function Monster({ currentHp, maxHp, hintEmoji, isHit, imageUrl }: MonsterProps) {
  const isDead = currentHp <= 0;
  
  // 기본 이미지 설정 (사용자가 올린 사진 중 하나)
  const monsterImage = imageUrl || "/images/monsters/media__1773510028776.jpg";

  return (
    <div className="flex flex-col items-center gap-2 py-2 relative">
      {/* 몬스터 HP & 피드백 정보 */}
      {!isDead && <HpGauge currentHp={currentHp} maxHp={maxHp} />}

      {/* 몬스터 본체 */}
      <div 
        className={cn(
          "relative flex items-center justify-center transition-all duration-300",
          !isDead && !isHit ? "animate-float" : "",
          isHit && !isDead ? "animate-hit-flash saturate-200" : "",
          isDead ? "opacity-0 scale-50 transition-all duration-500 delay-200" : "opacity-100 scale-100"
        )}
      >
        {/* 몬스터 이미지 박스 */}
        <div className="w-72 h-72 bg-white rounded-[4rem] shadow-pop border-4 border-zen-purple relative overflow-hidden">
          <Image 
            src={monsterImage} 
            alt="Monster" 
            fill 
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 224px"
          />
          
          {/* 말풍선 힌트 */}
          {hintEmoji && !isDead && (
            <div className="absolute top-2 right-2 bg-white rounded-bubble px-3 py-1 border-2 border-zen-purple shadow-soft animate-pop-in whitespace-nowrap z-10">
              <span className="text-2xl">{hintEmoji}</span>
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white border-b-2 border-r-2 border-zen-purple rotate-45" />
            </div>
          )}
        </div>
        
        {/* 피격 데미지 효과 표시 */}
        {isHit && !isDead && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-game text-5xl text-currency-gold drop-shadow-lg z-20 pointer-events-none animate-ping">
            💥
          </div>
        )}
      </div>


    </div>
  );
}
