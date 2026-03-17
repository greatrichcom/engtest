"use client";

import { cn } from "@/lib/utils";

interface Props {
  id: string;
  letter: string | null;
  isSelected?: boolean;
  onClick?: () => void;
  isSmall?: boolean;
}

export function LetterSlot({ id, letter, isSelected, onClick, isSmall }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center font-bold font-game uppercase cursor-pointer transition-all duration-200",
        isSmall 
          ? "w-[26px] h-9 text-base rounded-md border-b-2" 
          : "w-[32px] h-11 text-lg rounded-lg border-b-[3px]",
        "bg-zen-lavender border-zen-lavender-dark shadow-inner text-zen-purple-dark",
        isSelected ? "ring-2 ring-zen-purple ring-offset-1 scale-105 z-10" : "",
        letter ? "bounce-in" : ""
      )}
    >
      {letter || ""}
    </div>
  );
}
