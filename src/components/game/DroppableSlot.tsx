import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";


interface Props {
  id: string;
  letter: string | null;
  isSelected?: boolean;
  onClick?: () => void;
  isSmall?: boolean;
}

export function DroppableSlot({ id, letter, isSelected, onClick, isSmall }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center font-bold font-game uppercase cursor-pointer transition-all duration-200",
        isSmall 
          ? "w-[24px] h-8 text-sm rounded-md border-b-2" 
          : "w-[30px] h-10 text-base rounded-lg border-b-[3px]",
        isOver ? "bg-zen-pink/20 border-zen-pink scale-110" : "bg-zen-lavender border-zen-lavender-dark shadow-inner text-zen-purple",
        isSelected ? "ring-2 ring-zen-purple ring-offset-1 scale-105 z-10" : "",
        letter ? "bounce-in" : ""
      )}
    >
      {letter || ""}
    </div>
  );
}

