"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Image as ImageIcon } from "lucide-react";

interface WordImageProps {
  word: string;
  className?: string;
}

export function WordImage({ word, className }: WordImageProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 AI 생성 API 호출 시뮬레이션
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/ai-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word }),
        });
        
        if (!response.ok) throw new Error("Image gen failed");
        
        const data = await response.json();
        setImgUrl(data.imageUrl);
      } catch (e) {
        setImgUrl(null);
      } finally {
        setLoading(false);
      }
    };

    if (word) fetchImage();
  }, [word]);

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-soft ${className}`}>
      {loading ? (
        <div className="flex flex-col items-center animate-pulse">
          <Sparkles className="w-8 h-8 text-zen-purple mb-2" />
          <span className="text-[10px] text-zen-purple-dark font-bold uppercase tracking-tighter">AI Designing...</span>
        </div>
      ) : imgUrl ? (
        <img 
          src={imgUrl} 
          alt={word} 
          className="w-full h-full object-cover animate-in fade-in duration-1000"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Zen-Pop";
          }}
        />
      ) : (
        <ImageIcon className="w-10 h-10 text-gray-300" />
      )}
      
      {/* AI Badge */}
      {!loading && imgUrl && (
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] font-bold text-zen-purple flex items-center gap-1 border border-zen-purple/20">
          <Sparkles className="w-2 h-2" />
          AI GEN
        </div>
      )}
    </div>
  );
}
