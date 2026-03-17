import { cn } from "@/lib/utils";

interface HpGaugeProps {
  currentHp: number;
  maxHp: number;
  className?: string;
}

export function HpGauge({ currentHp, maxHp, className }: HpGaugeProps) {
  const percentage = maxHp > 0 ? Math.max(0, Math.min(100, (currentHp / maxHp) * 100)) : 0;
  
  return (
    <div className={cn("w-full max-w-[280px] flex flex-col items-center gap-1", className)}>
      <div className="w-full h-6 bg-gray-100 border-2 border-white rounded-full overflow-hidden shadow-inner relative">
        <div 
          className="h-full bg-zen-pink transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,107,157,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-sm font-bold text-zen-pink-dark">
        HP {currentHp} / {maxHp}
      </div>
    </div>

  );
}
