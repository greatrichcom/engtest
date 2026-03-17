"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Zap, Heart, Sparkles, Loader2, Ghost } from "lucide-react";
import { usePurchaseItem, usePurchaseMonster } from "@/hooks/useGameData";
import { useState } from "react";

const SHOP_ITEMS = [
  { id: "hp_refill", name: "HP 포션", desc: "체력이 꽉 차오릅니다.", price: 50, type: "gold", icon: Heart, color: "text-red-500" },
  { id: "hint_booster", name: "힌트 묶음", desc: "힌트 5개를 줍니다.", price: 100, type: "gold", icon: Zap, color: "text-yellow-500" },
];

const MONSTER_ITEMS = [
  { id: "monster_egg_gold", name: "몬스터 알 (일반)", desc: "커먼~레어 몬스터가 랜덤으로 부화!", price: 200, currencyType: "gold" as const, icon: "🥚", gradient: "from-zen-orange/10 to-yellow-50" },
  { id: "monster_egg_gems", name: "몬스터 알 (프리미엄)", desc: "레어 이상 등급 보장! 에픽·전설도!", price: 15, currencyType: "gems" as const, icon: "🌟", gradient: "from-zen-purple/10 to-purple-50" },
  { id: "monster_egg_gold_5", name: "몬스터 알 5개 묶음", desc: "5마리를 한번에! (20% 할인)", price: 800, currencyType: "gold" as const, icon: "🎁", gradient: "from-zen-mint/20 to-green-50" },
];

export default function ShopPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate: purchase, isPending: isPurchasing } = usePurchaseItem();
  const { mutate: purchaseMonster, isPending: isMonsterPurchasing } = usePurchaseMonster();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const handleBuy = (item: any) => {
    if (isPurchasing) return;
    
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

  const handleBuyMonster = (item: typeof MONSTER_ITEMS[0]) => {
    if (isMonsterPurchasing) return;

    setPurchasingId(item.id);
    
    // 5개 묶음인 경우 5번 구매
    const count = item.id.includes("_5") ? 5 : 1;
    const singlePrice = item.id.includes("_5") ? Math.floor(item.price / 5) : item.price;

    const buyOne = (remaining: number) => {
      if (remaining <= 0) {
        setPurchasingId(null);
        return;
      }

      purchaseMonster({
        currencyType: item.currencyType,
        price: remaining === count ? item.price : singlePrice // 첫 구매에 전체 가격 차감, 이후 0
      }, {
        onSuccess: () => {
          if (remaining > 1) {
            setTimeout(() => buyOne(remaining - 1), 1500);
          } else {
            setPurchasingId(null);
          }
        },
        onError: (err: any) => {
          alert(err.message || "구매 중 오류가 발생했습니다.");
          setPurchasingId(null);
        }
      });
    };

    buyOne(count);
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 h-full overflow-y-auto">
      <header className="flex items-center justify-between mb-6 pt-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <h1 className="text-2xl font-heading text-zen-purple-dark flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          상점
        </h1>
        <div className="w-10" />
      </header>

      {/* 내 보유 재화 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-soft border-2 border-zen-orange/20 flex items-center justify-center gap-2">
          <span className="text-xl">🪙</span>
          <span className="font-bold text-zen-orange">{user?.gold || 0}</span>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-3 shadow-soft border-2 border-zen-purple/20 flex items-center justify-center gap-2">
          <span className="text-xl">💎</span>
          <span className="font-bold text-zen-purple">{user?.gems || 0}</span>
        </div>
      </div>

      {/* 몬스터 알 섹션 */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-zen-purple-dark mb-3 flex items-center gap-2">
          <Ghost className="w-5 h-5" />
          몬스터 도감 알
        </h2>
        <div className="space-y-3">
          {MONSTER_ITEMS.map((item) => (
            <Card key={item.id} className={`p-4 bg-gradient-to-r ${item.gradient} border-2 ${item.currencyType === "gems" ? "border-zen-purple/20" : "border-zen-orange/20"}`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-inner">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-primary text-sm">{item.name}</h3>
                  <p className="text-[10px] text-text-secondary">{item.desc}</p>
                </div>
                <Button 
                  size="sm" 
                  className={`min-w-[80px] ${item.currencyType === "gold" ? "bg-zen-orange hover:bg-orange-500" : "bg-zen-purple hover:bg-purple-500"}`}
                  onClick={() => handleBuyMonster(item)}
                  disabled={isMonsterPurchasing || isPurchasing}
                >
                  {purchasingId === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {item.currencyType === "gold" ? "🪙" : "💎"} {item.price}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 기존 아이템 섹션 */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-zen-purple-dark mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          게임 아이템
        </h2>
        <div className="space-y-3">
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
                disabled={isPurchasing || isMonsterPurchasing}
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
      </div>

      <div className="py-6 text-center text-xs text-text-secondary italic">
        몬스터 알을 구매하여 도감을 채워보세요! 🚀<br/>
        보석 알은 레어 이상 등급이 보장됩니다! 💎
      </div>
    </div>
  );
}
