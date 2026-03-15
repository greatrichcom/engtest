import { Book } from "lucide-react";

interface BookData {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  totalUnits: number;
  clearedUnits: number;
}

export function BookCard({ book, onClick }: { book: BookData; onClick: () => void }) {
  const progressPercent = Math.round((book.clearedUnits / book.totalUnits) * 100);

  return (
    <div
      onClick={book.isUnlocked ? onClick : undefined}
      className={`relative w-full rounded-card border-4 p-4 transition-all duration-300 select-none
       ${
         book.isUnlocked
           ? "bg-white border-zen-mint cursor-pointer shadow-pop hover:-translate-y-1 active:translate-y-1 active:shadow-none"
           : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-70"
       }`}
    >
      {!book.isUnlocked && (
        <div className="absolute inset-0 bg-black/5 rounded-2xl flex items-center justify-center z-10 backdrop-blur-[1px]">
          <span className="text-2xl">🔒</span>
        </div>
      )}

      <div className="flex gap-4">
        {/* 임시 책 표지 아이콘 */}
        <div className="w-16 h-20 bg-zen-peach rounded-xl flex items-center justify-center shadow-soft shrink-0 border-2 border-white">
          <Book className="w-8 h-8 text-zen-orange" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-heading text-xl text-text-primary line-clamp-1">{book.title}</h3>
          <p className="text-xs text-text-secondary mt-1 line-clamp-1">{book.description}</p>
          
          {/* 프로그레스 바 */}
          <div className="mt-3 w-full bg-zen-lavender rounded-full h-3 overflow-hidden">
            <div 
              className="bg-zen-green h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] font-bold text-correct">{progressPercent}% 완료</span>
            <span className="text-[10px] text-text-secondary">{book.clearedUnits}/{book.totalUnits} Units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
