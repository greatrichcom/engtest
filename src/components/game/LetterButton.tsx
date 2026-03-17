"use client";

import { cn } from "@/lib/utils";

interface Props {
  id: string;
  letter: string;
  onClick?: () => void;
  isSmall?: boolean;
}

export function LetterButton({ id, letter, onClick, isSmall }: Props) {
  // 빈 칸인 경우(이미 사용된 구슬) 플레이스홀더로 둠
  if (!letter) {
    return <div className={cn(
      "border-2 border-transparent transition-all",
      isSmall ? "w-[26px] h-9" : "w-[32px] h-11"
    )} />;
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center border-2 border-zen-mint bg-white font-bold font-game uppercase shadow-pop transition-all active:scale-95 text-slate-800",
        isSmall ? "w-[26px] h-9 text-base rounded-md" : "w-[32px] h-11 text-lg rounded-xl",
      )}
    >
      {letter}
    </button>
  );
}
