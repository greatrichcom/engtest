import { cn } from "@/lib/utils";

interface HpGaugeProps {
  currentHp: number;
  maxHp: number;
  className?: string;
}

export function HpGauge({ currentHp, maxHp, className }: HpGaugeProps) {
  const percentage = maxHp > 0 ? Math.max(0, Math.min(100, (currentHp / maxHp) * 100)) : 0;
  
  return (
    <div className={cn("flex flex-col items-start gap-0.5", className)}>
      <div className="flex items-center gap-2 w-full">
        <div className="w-32 h-4 bg-gray-100 border border-white rounded-full overflow-hidden shadow-inner relative shrink-0">
          <div 
            className="h-full bg-zen-pink transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,107,157,0.4)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-[10px] font-black text-zen-pink-dark whitespace-nowrap">
          HP {currentHp} / {maxHp}
        </div>
      </div>
    </div>

  );
}
