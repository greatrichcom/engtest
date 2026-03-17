import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  letter: string;
  onClick?: () => void;
  isSmall?: boolean;
}

export function DraggableLetter({ id, letter, onClick, isSmall }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  // 빈 칸인 경우(이미 사용된 구슬) 렌더링하지 않거나 플레이스홀더로 둠
  if (!letter) {
    return <div className={isSmall ? "w-[26px] h-[30px]" : "w-[32px] h-[36px]"} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer touch-none flex items-center justify-center border-2 bg-white font-bold font-game uppercase shadow-pop transition-transform",
        isSmall ? "w-[26px] h-[30px] text-base rounded-md" : "w-[32px] h-[36px] text-lg rounded-xl",
        isDragging ? "z-50 scale-110 opacity-80 shadow-soft" : "border-zen-mint text-text-primary hover:scale-105 active:scale-95"
      )}
    >
      {letter}
    </div>
  );
}
