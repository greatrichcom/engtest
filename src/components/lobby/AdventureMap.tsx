"use client";

import { UnitNode } from "./UnitNode";
import { motion } from "framer-motion";

interface Unit {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "cleared";
  stars: number;
}

interface AdventureMapProps {
  units: Unit[];
  onUnitClick: (unitId: string) => void;
}

export function AdventureMap({ units, onUnitClick }: AdventureMapProps) {
  return (
    <div className="flex-1 overflow-y-auto w-full px-4 py-6 flex flex-col items-center relative scrollbar-hide">
      
      {units.length === 0 ? (
        <div className="text-zen-lavender-dark font-bold mt-20">스테이지 정보가 없습니다.</div>
      ) : (
        <div className="w-full max-w-md flex flex-col">
          {units.map((unit, index) => (
            <UnitNode
              key={unit.id}
              id={unit.id}
              title={unit.title}
              status={unit.status}
              stars={unit.stars}
              index={index}
              onClick={() => onUnitClick(unit.id)}
            />
          ))}
          
          {/* 도착 지점 표시 */}
          <motion.div 
            className="w-full p-6 bg-zen-lavender-light rounded-3xl border-4 border-dashed border-zen-lavender flex items-center justify-center gap-3 mt-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: units.length * 0.05 }}
          >
            <span className="text-2xl">🏁</span>
            <span className="font-heading text-zen-purple-dark italic">마지막 스테이지까지 도전하세요!</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
