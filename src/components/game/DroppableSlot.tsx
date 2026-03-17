import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  letter: string | null;
  isSelected?: boolean;
  onClick?: () => void;
}

export function DroppableSlot({ id, letter, isSelected, onClick }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={`relative flex w-9 h-11 items-center justify-center rounded-btn border-b-4 text-lg font-bold font-game uppercase cursor-pointer transition-all duration-200 ${
        isOver ? "bg-zen-pink/20 border-zen-pink scale-110" : "bg-zen-lavender border-zen-lavender-dark shadow-inner text-zen-purple"
      } ${isSelected ? "ring-4 ring-zen-purple ring-offset-2 scale-105 z-10" : ""} ${letter ? "bounce-in" : ""}`}
    >
      {letter || ""}
    </div>
  );
}

