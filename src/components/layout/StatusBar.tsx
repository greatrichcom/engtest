"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Coins, Gem, User, Package, Store, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useRouter } from "next/navigation";

export function StatusBar() {
  const { user } = useUserStore();
  const { openInventoryModal } = useUIStore();
  const router = useRouter();
  const [prevGold, setPrevGold] = useState(user?.gold || 0);
  const [prevGems, setPrevGems] = useState(user?.gems || 0);

  useEffect(() => {
    if (user?.gold !== undefined) setPrevGold(user.gold);
    if (user?.gems !== undefined) setPrevGems(user.gems);
  }, [user?.gold, user?.gems]);

  return (
    <header className="h-16 shrink-0 w-full px-4 flex items-center justify-between bg-bg z-50">
      
      {/* 아바타 & 레벨 영역 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-bubble bg-zen-lavender border-2 border-white shadow-soft flex items-center justify-center overflow-hidden">
          {user?.avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="text-zen-purple w-6 h-6" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-zen-purple bg-zen-lavender-light px-2 py-0.5 rounded-full w-fit">
            Lv.{user?.level || 1}
          </span>
          <span className="text-sm font-heading text-text-primary">
            {user?.nickname || "모험자"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* 상점 버튼 */}
        <button 
          onClick={() => router.push("/shop")}
          className="bg-white p-2 rounded-full shadow-soft border-2 border-zen-orange/60 text-zen-orange hover:scale-110 active:scale-95 transition-all"
          title="상점"
        >
          <Store className="w-4 h-4" />
        </button>

        {/* 도감 버튼 */}
        <button 
          onClick={() => router.push("/dex")}
          className="bg-white p-2 rounded-full shadow-soft border-2 border-zen-purple/60 text-zen-purple hover:scale-110 active:scale-95 transition-all"
          title="도감"
        >
          <Ghost className="w-4 h-4" />
        </button>

        {/* 인벤토리 버튼 (작게 프리뷰) */}
        <button 
          onClick={openInventoryModal}
          className="bg-white p-2 rounded-full shadow-soft border-2 border-zen-lavender-dark text-zen-purple hover:scale-110 active:scale-95 transition-all"
          title="인벤토리"
        >
          <Package className="w-4 h-4" />
        </button>

        {/* 골드 */}
        <motion.div 
          key={`gold-${user?.gold}`}
          animate={{ scale: [1, 1.1, 1] }}
          className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-soft border-2 border-[#FFEAA7]"
        >
          <Coins className="w-4 h-4 text-currency-gold" fill="currentColor" />
          <span className="text-sm font-bold text-[#D4AF37]">{user?.gold || 0}</span>
        </motion.div>
        
        {/* 보석 (다이아몬드 아이콘과 보라색 강조) */}
        <motion.div 
          key={`gems-${user?.gems}`}
          animate={{ scale: [1, 1.1, 1] }}
          className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-soft border-2 border-[#D6BCFA]"
        >
          <Gem className="w-4 h-4 text-[#9F7AEA]" fill="currentColor" />
          <span className="text-sm font-bold text-[#6B46C1]">{user?.gems || 0}</span>
        </motion.div>
      </div>
    </header>
  );
}
