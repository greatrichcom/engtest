import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  letter: string;
}

export function DraggableLetter({ id, letter }: Props) {
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
    return <div className="w-14 h-14" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative touch-none flex w-14 h-14 items-center justify-center rounded-bubble border-2 bg-white text-2xl font-bold font-game uppercase shadow-pop transition-transform ${
        isDragging ? "z-50 scale-110 opacity-80 shadow-soft" : "border-zen-mint text-text-primary hover:scale-105"
      }`}
    >
      {letter}
    </div>
  );
}
