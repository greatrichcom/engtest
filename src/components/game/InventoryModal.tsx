"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/useUIStore";
import { Card } from "@/components/ui/Card";
import { X, Package, Heart, Zap, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";

const ITEM_METADATA: Record<string, any> = {
  hp_refill: { name: "HP 포션", desc: "체력이 꽉 차오릅니다.", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
  hint_booster: { name: "힌트 묶음", desc: "힌트 5개를 줍니다.", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-50" },
  legend_monster: { name: "비밀 알", desc: "희귀 몬스터를 부화시킵니다.", icon: Sparkles, color: "text-purple-500", bgColor: "bg-purple-50" },
};

export function InventoryModal() {
  const { isInventoryModalOpen, closeInventoryModal } = useUIStore();
  const { user } = useUserStore();
  const supabase = createClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ["inventory", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: isInventoryModalOpen && !!user,
  });

  return (
    <AnimatePresence>
      {isInventoryModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeInventoryModal}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-full max-w-md bg-bg rounded-t-[40px] sm:rounded-[40px] p-6 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-zen-purple/10 rounded-2xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-zen-purple" />
                </div>
                <h2 className="text-xl font-heading text-zen-purple-dark">나의 인벤토리</h2>
              </div>
              <button 
                onClick={closeInventoryModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p>아이템을 불러오고 있어요...</p>
                </div>
              ) : items && items.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {items.map((item: any) => {
                    const meta = ITEM_METADATA[item.item_id] || { 
                      name: item.item_id, 
                      desc: "미분류 아이템", 
                      icon: Package, 
                      color: "text-gray-500", 
                      bgColor: "bg-gray-50" 
                    };
                    return (
                      <Card key={item.id} className="p-4 flex items-center justify-between border-2 border-transparent hover:border-zen-lavender transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 ${meta.bgColor} rounded-3xl flex items-center justify-center`}>
                            <meta.icon className={`w-8 h-8 ${meta.color}`} />
                          </div>
                          <div>
                            <h3 className="font-heading text-lg text-gray-800">{meta.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{meta.desc}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-bold text-zen-purple bg-zen-lavender-light px-2 py-0.5 rounded-full">
                            x{item.quantity}
                          </span>
                          <Button size="sm" variant="ghost" className="text-xs h-7 text-zen-purple hover:bg-zen-lavender-light">
                            사용하기
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Package className="w-16 h-16 opacity-20 mb-4" />
                  <p className="font-body">아직 보유한 아이템이 없어요.</p>
                  <p className="text-sm">상점에서 아이템을 구매해보세요!</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button onClick={closeInventoryModal} className="w-full bg-zen-purple hover:bg-zen-purple-dark text-white rounded-2xl h-12 shadow-pop">
                닫기
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
