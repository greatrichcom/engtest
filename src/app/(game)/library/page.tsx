"use client";

import { useLibraryBooks, LibraryBook, useUpdateBookTitle } from "@/hooks/useGameData";
import { ChevronLeft, Book, Calendar, ChevronDown, ChevronUp, Play, LibraryBig, Edit2, Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/useGameStore";

export default function LibraryPage() {
  const router = useRouter();
  const { data: books, isLoading, error } = useLibraryBooks();
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const toggleBook = (id: string) => {
    setExpandedBookId(prev => (prev === id ? null : id));
  };

  return (
    <main className="flex-1 flex flex-col p-4 w-full h-full bg-bg font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.push("/lobby")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-zen-purple border-2 border-zen-lavender-dark shadow-soft"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-heading text-zen-purple-dark flex items-center gap-2">
          <LibraryBig className="w-6 h-6 text-zen-orange" />
          내 단어장 보관함
        </h1>
      </header>

      {/* Content */}
      <section className="flex-1 overflow-y-auto pb-10 scrollbar-hide space-y-4 px-1">
        {isLoading && (
          <div className="w-full text-center text-zen-lavender-dark mt-10 animate-pulse font-bold">
            단어장을 불러오는 중...
          </div>
        )}

        {error && (
          <div className="w-full text-center text-red-400 mt-10 p-4 bg-red-50 rounded-2xl">
            단어장을 불러오는데 실패했습니다.
          </div>
        )}

        {!isLoading && books && books.length === 0 && (
          <div className="w-full flex justify-center mt-10">
            <div className="bg-white p-6 rounded-3xl border-4 border-dashed border-zen-lavender text-center text-text-secondary">
              <Book className="w-12 h-12 text-zen-lavender mx-auto mb-3" />
              <p>아직 저장된 단어장이 없어요!</p>
              <p className="text-xs mt-1">로비에서 [단어장 스캔]을 이용해보세요.</p>
            </div>
          </div>
        )}

        {books?.map((book) => (
          <BookAccordion 
            key={book.id} 
            book={book} 
            isExpanded={expandedBookId === book.id}
            onToggle={() => toggleBook(book.id)}
          />
        ))}
      </section>
    </main>
  );
}

function BookAccordion({ book, isExpanded, onToggle }: { book: LibraryBook, isExpanded: boolean, onToggle: () => void }) {
  const router = useRouter();
  const { setGameType } = useGameStore();
  const updateTitle = useUpdateBookTitle();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);

  const totalWords = book.units.reduce((acc, unit) => acc + unit.words.length, 0);
  const formattedDate = new Date(book.created_at).toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric"
  });

  const handlePlayUnit = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGameType("spell");
    router.push(`/battle/${unitId}`);
  };

  const startEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedTitle(book.title);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const saveTitle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editedTitle.trim() || editedTitle === book.title) {
      setIsEditing(false);
      return;
    }
    updateTitle.mutate({ bookId: book.id, newTitle: editedTitle }, {
      onSuccess: () => setIsEditing(false)
    });
  };

  return (
    <div className={`overflow-hidden rounded-3xl border-4 transition-colors duration-300 ${isExpanded ? "border-zen-mint bg-white shadow-pop" : "border-zen-lavender bg-white/70 shadow-soft"}`}>
      {/* Accordion Header (Book Level - 대분류) */}
      <button 
        onClick={onToggle}
        className="w-full text-left p-4 flex items-center justify-between gap-3 bg-white hover:bg-zen-mint-light/50 transition-colors"
      >
        <div className="flex-1 flex flex-col min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2 group mb-1">
              <input 
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-3 py-1 text-lg font-heading text-text-primary border-2 border-zen-blue rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-zen-blue/20 bg-white"
                autoFocus
              />
              <button 
                onClick={saveTitle} 
                disabled={updateTitle.isPending}
                className="p-2 bg-zen-blue text-white rounded-xl shadow-soft hover:bg-zen-blue-dark transition-colors"
              >
                {updateTitle.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              </button>
              <button 
                onClick={cancelEditing}
                className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-heading text-text-primary line-clamp-1">{book.title}</h2>
              <button 
                onClick={startEditing}
                title="제목 수정"
                className="p-1.5 bg-zen-purple/10 text-zen-purple rounded-full transition-all hover:bg-zen-purple hover:text-white active:scale-90 shadow-sm border border-zen-purple/20"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-3 mt-1 opacity-80">
            <span className="flex items-center gap-1 text-[10px] font-bold text-zen-purple bg-zen-purple/10 px-2 py-0.5 rounded-full uppercase">
              <Book className="w-3 h-3" /> {book.units.length} UNITS
            </span>
            <span className="flex items-center gap-1 text-[10px] text-text-secondary">
              <Calendar className="w-3 h-3" /> {formattedDate}
            </span>
          </div>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-zen-lavender-light flex items-center justify-center text-zen-purple">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Accordion Body (Unit Level - 중분류 & Words) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-1 border-t-2 border-dashed border-zen-lavender space-y-5 bg-gradient-to-b from-white to-zen-bg">
              {book.units.map(unit => (
                <div key={unit.id} className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-zen-lavender shadow-sm">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-zen-lavender/50 pb-2">
                    <h3 className="font-bold text-zen-purple-dark">{unit.title}</h3>
                    <button 
                      onClick={(e) => handlePlayUnit(unit.id, e)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-zen-blue text-white rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-transform shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-white" />
                        바로 학습
                    </button>
                  </div>
                  
                  {/* Words List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                    {unit.words.length === 0 ? (
                      <p className="text-xs text-center text-gray-400 py-2">단어가 없습니다.</p>
                    ) : (
                      unit.words.map((word, idx) => (
                        <div key={word.id} className="flex items-center p-2 rounded-xl bg-gray-50 hover:bg-zen-mint-light/30 transition-colors group">
                          <span className="w-5 shrink-0 text-center text-[10px] text-gray-400 font-bold">{idx + 1}</span>
                          <span className="flex-1 font-bold text-zen-purple px-2">{word.english}</span>
                          <span className="flex-1 text-text-secondary text-right pr-2 text-sm">{word.korean}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
