"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Zap, Heart, Sparkles, Loader2 } from "lucide-react";
import { usePurchaseItem } from "@/hooks/useGameData";
import { useState } from "react";

const SHOP_ITEMS = [
  { id: "hp_refill", name: "HP 포션", desc: "체력이 꽉 차오릅니다.", price: 50, type: "gold", icon: Heart, color: "text-red-500" },
  { id: "hint_booster", name: "힌트 묶음", desc: "힌트 5개를 줍니다.", price: 100, type: "gold", icon: Zap, color: "text-yellow-500" },
  { id: "legend_monster", name: "비밀 알", desc: "희귀 몬스터를 부화시킵니다.", price: 10, type: "gems", icon: Sparkles, color: "text-purple-500" },
];

export default function ShopPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate: purchase, isPending } = usePurchaseItem();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const handleBuy = (item: any) => {
    if (isPending) return;
    
    setPurchasingId(item.id);
    purchase({
      itemId: item.id,
      price: item.price,
      currencyType: item.type as "gold" | "gems"
    }, {
      onSuccess: () => {
        alert(`${item.name} 구매 완료!`);
        setPurchasingId(null);
      },
      onError: (err: any) => {
        alert(err.message || "구매 중 오류가 발생했습니다.");
        setPurchasingId(null);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 h-full">
      <header className="flex items-center justify-between mb-6 pt-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <h1 className="text-2xl font-heading text-zen-purple-dark flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          상점
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* 내 보유 재화 */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-soft border-2 border-zen-orange/20 flex items-center justify-center gap-2">
          <span className="text-xl">🪙</span>
          <span className="font-bold text-zen-orange">{user?.gold || 0}</span>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-soft border-2 border-zen-purple/20 flex items-center justify-center gap-2">
          <span className="text-xl">💎</span>
          <span className="font-bold text-zen-purple">{user?.gems || 0}</span>
        </div>
      </div>

      <div className="space-y-4">
        {SHOP_ITEMS.map((item) => (
          <Card key={item.id} className="p-4 flex items-center gap-4 hover:shadow-card transition-shadow">
            <div className={`w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center ${item.color}`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-text-primary">{item.name}</h3>
              <p className="text-xs text-text-secondary">{item.desc}</p>
            </div>
            <Button 
              size="sm" 
              className={item.type === "gold" ? "bg-zen-orange hover:bg-orange-500" : "bg-zen-purple hover:bg-purple-500"}
              onClick={() => handleBuy(item)}
              disabled={isPending}
            >
              {purchasingId === item.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {item.type === "gold" ? "🪙" : "💎"} {item.price}
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-auto py-8 text-center text-xs text-text-secondary italic">
        데모 버전에서는 구매 기능을 정식 지원하지 않습니다. <br/>
        더 멋진 아이템들이 곧 추가됩니다! 🚀
      </div>
    </div>
  );
}
