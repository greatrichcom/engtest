"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Camera, RefreshCw, Loader2, Save, CheckCircle2,
  FileText, Upload, AlertCircle, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCreateBookFromScan } from "@/hooks/useGameData";
import { createClient } from "@/lib/supabase/client";

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ english: string; korean: string }[] | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [bookTitle, setBookTitle] = useState(`스캔 단어장 ${new Date().toLocaleDateString("ko-KR")}`);

  const { mutate: createBook } = useCreateBookFromScan();

  // ─── Camera ────────────────────────────────────────
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      console.warn("Camera not available");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // ─── File Upload ────────────────────────────────────────
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isScanning) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("이미지(JPG, PNG 등) 또는 PDF 파일만 업로드 가능합니다.");
      return;
    }

    setUploadedFile(file);
    setScanResult(null);
    setScanError(null);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setCapturedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setCapturedImage("PDF_FILE");
    }

    await processOCR(file);
    // Reset file input so same file can be re-selected
    e.target.value = "";
  };

  // ─── Camera Capture ────────────────────────────────────────
  const capturePhoto = () => {
    if (isScanning || !videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const dataUrl = URL.createObjectURL(blob);
      setCapturedImage(dataUrl);
      setScanResult(null);
      setScanError(null);
      // Stop camera
      (videoRef.current!.srcObject as MediaStream)?.getTracks().forEach(t => t.stop());
      await processOCR(blob);
    }, "image/png");
  };

  // ─── OCR API 호출 ─────────────────────────────────────────
  const processOCR = async (file: Blob) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("isPdf", file.type === "application/pdf" ? "true" : "false");

      const res = await fetch("/api/ocr", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setScanError(data.error || "AI 분석에 실패했습니다.");
        return;
      }

      setScanResult(data.words);
    } catch (err: any) {
      setScanError("서버 연결에 실패했습니다. 네트워크를 확인해 주세요.");
    } finally {
      setIsScanning(false);
    }
  };

  // ─── Reset ─────────────────────────────────────────
  const resetScanner = () => {
    setCapturedImage(null);
    setUploadedFile(null);
    setScanResult(null);
    setScanError(null);
    setIsSaved(false);
    setBookTitle(`스캔 단어장 ${new Date().toLocaleDateString("ko-KR")}`);
    startCamera();
  };

  // ─── DB 저장 ─────────────────────────────────────────
  const handleSave = async () => {
    if (!scanResult || scanResult.length === 0) return;

    // 먼저 세션 확인
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      alert("로그인 후 저장할 수 있습니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }

    setIsSaving(true);
    createBook(
      { bookTitle, unitTitle: "Unit 1", words: scanResult },
      {
        onSuccess: () => {
          setIsSaving(false);
          setIsSaved(true);
          setTimeout(() => router.push("/library"), 1800);
        },
        onError: (err: any) => {
          setIsSaving(false);
          alert(`저장 실패: ${err.message}`);
        },
      }
    );
  };

  // ─── Word Delete ─────────────────────────────────────────
  const deleteWord = (idx: number) => {
    if (!scanResult) return;
    setScanResult(scanResult.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex-1 flex flex-col bg-black h-full relative overflow-hidden">

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-5 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-heading text-white drop-shadow-md">단어장 스캔</h1>
        </div>
        <button
          onClick={handleUploadClick}
          disabled={isScanning}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          PDF/이미지 업로드
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,application/pdf"
        className="hidden"
      />

      {/* Camera / Preview Area */}
      <div className="flex-1 relative flex items-center justify-center">

        {/* 캡처 전: 카메라 뷰 */}
        {!capturedImage && (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            {/* Guide Frame */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-[80%] aspect-[3/4] max-h-[60vh] relative">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-zen-mint rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-zen-mint rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-zen-mint rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-zen-mint rounded-br-2xl" />
                <div className="absolute -bottom-14 left-0 right-0 text-center">
                  <p className="text-white/80 text-sm bg-black/40 backdrop-blur-sm py-1.5 px-4 rounded-full inline-block">
                    교재를 프레임 안에 맞춰 촬영하거나 파일 업로드
                  </p>
                </div>
              </div>
            </div>
            {/* Shutter Button */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
              <button
                onClick={capturePhoto}
                disabled={isScanning}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                  <Camera className="w-7 h-7 text-zen-purple" />
                </div>
              </button>
            </div>
          </>
        )}

        {/* 캡처/업로드 후 */}
        {capturedImage && (
          <>
            {capturedImage === "PDF_FILE" ? (
              <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-28 h-28 bg-zen-purple/20 rounded-3xl flex items-center justify-center mb-5">
                  <FileText className="w-14 h-14 text-zen-purple-light" />
                </div>
                <h3 className="text-white text-xl font-heading mb-2">PDF 분석 중</h3>
                <p className="text-gray-400 text-sm">{uploadedFile?.name}</p>
              </div>
            ) : (
              <img src={capturedImage} alt="captured" className="w-full h-full object-cover" />
            )}

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mb-6 w-16 h-16 rounded-full bg-zen-mint/20 flex items-center justify-center"
                >
                  <Loader2 className="w-9 h-9 text-zen-mint animate-spin" />
                </motion.div>
                <p className="text-white text-lg font-heading">AI가 단어를 분석하는 중...</p>
                <p className="text-gray-400 text-sm mt-2">Gemini가 영단어와 한글 뜻을 추출합니다</p>
              </div>
            )}

            {/* Error State */}
            {scanError && !isScanning && (
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[2.5rem] p-6 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                  <AlertCircle className="w-12 h-12 text-red-400" />
                  <h2 className="text-xl font-heading text-gray-800">분석 실패</h2>
                  <p className="text-sm text-gray-500 whitespace-pre-line">{scanError}</p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={resetScanner}
                      className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold"
                    >
                      다시 찍기
                    </button>
                    <button
                      onClick={handleUploadClick}
                      className="flex-1 py-3 rounded-2xl bg-zen-purple text-white font-bold"
                    >
                      다른 파일 선택
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Result Panel */}
            <AnimatePresence>
              {scanResult && !isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 120 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 120 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[2.5rem] shadow-[0_-10px_50px_rgba(0,0,0,0.3)] max-h-[75vh] flex flex-col"
                >
                  {/* Handle */}
                  <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-0 shrink-0" />

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <div>
                      <h2 className="text-xl font-heading text-zen-purple">스캔 결과</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {scanResult.length}개 단어 추출됨 · 단어 좌측 삭제 가능
                      </p>
                    </div>
                    <span className="bg-zen-lavender-light text-zen-purple px-3 py-1 rounded-full text-sm font-bold">
                      {scanResult.length}개
                    </span>
                  </div>

                  {/* Book Title Input */}
                  <div className="px-6 pb-3 shrink-0">
                    <input
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="단어장 이름을 입력하세요"
                      className="w-full px-4 py-2.5 border-2 border-zen-lavender rounded-2xl text-sm font-medium text-gray-700 focus:outline-none focus:border-zen-purple transition-colors"
                    />
                  </div>

                  {/* Words List */}
                  <div className="flex-1 overflow-y-auto px-5 pb-3 space-y-2 scrollbar-hide">
                    {scanResult.map((w, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-zen-lavender transition-colors gap-2"
                      >
                        <button
                          onClick={() => deleteWord(idx)}
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="flex-1 font-heading text-zen-purple-dark">{w.english}</span>
                        <span className="text-gray-500 text-sm">{w.korean}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="px-5 py-4 flex gap-3 shrink-0 border-t border-gray-100">
                    <button
                      onClick={resetScanner}
                      className="flex items-center justify-center gap-2 flex-1 h-13 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      다시 찍기
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving || isSaved || scanResult.length === 0}
                      className={`flex-[1.8] py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-pop transition-all
                        ${isSaved ? "bg-zen-mint" : "bg-zen-purple hover:opacity-90 active:scale-95"}
                        ${(isSaving || isSaved) ? "opacity-80" : ""}
                      `}
                    >
                      {isSaving ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> 저장 중...</>
                      ) : isSaved ? (
                        <><CheckCircle2 className="w-5 h-5" /> 저장 완료!</>
                      ) : (
                        <><Save className="w-5 h-5" /> 단어장으로 저장</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
