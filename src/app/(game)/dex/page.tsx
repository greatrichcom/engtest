"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Lock, Loader2, Ghost } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useDex } from "@/hooks/useGameData";
import Image from "next/image";

const MONSTERS = [
  { 
    type: "slime", 
    name: "초록 슬라임", 
    desc: "끈적끈적하지만 귀여운 숲의 친구", 
    color: "bg-green-100", 
    textColor: "text-green-600", 
    image: "/images/monsters/media__1773510028776.jpg" 
  },
  { 
    type: "default", 
    name: "평범한 슬라임", 
    desc: "어디서나 흔히 볼 수 있는 말랑말랑한 친구", 
    color: "bg-slate-100", 
    textColor: "text-slate-600", 
    image: "/images/monsters/media__1773510028789.jpg" 
  },
  { 
    type: "dragon", 
    name: "화염 드래곤", 
    desc: "뜨거운 숨결을 내뿜는 동굴의 주인", 
    color: "bg-red-100", 
    textColor: "text-red-600", 
    image: "/images/monsters/media__1773510028838.jpg" 
  },
  { 
    type: "ghost", 
    name: "장난꾸러기 유령", 
    desc: "밤마다 단어를 훔쳐가는 유령", 
    color: "bg-purple-100", 
    textColor: "text-purple-600", 
    image: "/images/monsters/media__1773510028844.jpg" 
  },
  { 
    type: "robot", 
    name: "단어 로봇", 
    desc: "철자로 만들어진 최첨단 로봇", 
    color: "bg-blue-100", 
    textColor: "text-blue-600", 
    image: "/images/monsters/media__1773510160804.jpg" 
  },
];

export default function DexPage() {
  const router = useRouter();
  const { data: unlockedTypes, isLoading } = useDex();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zen-purple" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 h-full">
      <header className="flex items-center justify-between mb-6 pt-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <h1 className="text-2xl font-heading text-zen-purple-dark flex items-center gap-2">
          <Ghost className="w-6 h-6" />
          몬스터 도감
        </h1>
        <div className="w-10" />
      </header>

      <div className="grid grid-cols-2 gap-4">
        {MONSTERS.map((monster) => {
          const isUnlocked = unlockedTypes?.includes(monster.type);

          return (
            <Card key={monster.type} className={`p-4 flex flex-col items-center text-center relative overflow-hidden transition-all ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-60'}`}>
              {!isUnlocked && (
                <div className="absolute top-2 right-2 text-gray-400 z-10">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              
              <div className={`w-24 h-24 rounded-2xl relative mb-3 ${monster.color} shadow-inner overflow-hidden border-2 ${isUnlocked ? 'border-zen-purple/20' : 'border-gray-200'}`}>
                {isUnlocked ? (
                  <Image 
                    src={monster.image} 
                    alt={monster.name} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">
                    ?
                  </div>
                )}
              </div>
              
              <h3 className={`font-bold text-sm ${isUnlocked ? monster.textColor : 'text-gray-500'}`}>
                {isUnlocked ? monster.name : "미확인 몬스터"}
              </h3>
              <p className="text-[10px] text-text-secondary mt-1 leading-tight">
                {isUnlocked ? monster.desc : "사냥하여 정보를 해제하세요."}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 bg-white/50 rounded-2xl p-4 border border-dashed border-zen-lavender-dark text-center">
        <p className="text-xs text-text-secondary">
          몬스터를 물리칠 때마다 도감이 자동으로 업데이트됩니다! <br/>
          모든 몬스터를 수집해 보세요. 🏆
        </p>
      </div>
    </div>
  );
}
