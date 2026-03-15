import { cn } from "@/lib/utils";

interface HpGaugeProps {
  currentHp: number;
  maxHp: number;
  className?: string;
}

export function HpGauge({ currentHp, maxHp, className }: HpGaugeProps) {
  const percentage = maxHp > 0 ? Math.max(0, Math.min(100, (currentHp / maxHp) * 100)) : 0;
  
  return (
    <div className={cn("w-full max-w-[200px] flex flex-col items-center gap-1", className)}>
      <div className="w-full h-4 bg-gray-200 border-2 border-white rounded-full overflow-hidden shadow-soft relative">
        <div 
          className="h-full bg-zen-pink transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs font-bold text-text-primary">
        HP {currentHp} / {maxHp}
      </div>
    </div>
  );
}
