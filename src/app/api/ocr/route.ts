import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as Blob;
    const isPdf = formData.get("isPdf") === "true";

    if (!image) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY가 설정되지 않았습니다." }, { status: 500 });
    }

    // 1. 파일을 base64로 변환 (나중에 AI 쓸 때 필요함)
    const buffer = Buffer.from(await image.arrayBuffer());
    // const base64Data = buffer.toString("base64");

    // MIME 타입 처리
    let mimeType = image.type;
    if (!mimeType || mimeType === "application/octet-stream") {
      mimeType = isPdf ? "application/pdf" : "image/jpeg";
    }

    console.log(`[OCR] 파일 크기: ${buffer.length} bytes, MIME: ${mimeType}`);

    // ==========================================
    // [임시 꿀팁] 목업 데이터 모드 활성화 🧪
    // API 한도(429) 에러를 피하기 위해 실제 AI 호출을 건너뛰고 
    // 사용자님이 캡처하신 Unit 6의 데이터를 그대로 반환합니다.
    // ==========================================
    console.log("[OCR] 임시 목업 모드: AI 호출 생략 후 결과 반환");
    
    // 분석하는 척 1.5초 대기
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockWords = [
      { english: "destroy", korean: "파괴하다" },
      { english: "vehicle", korean: "탈 것" },
      { english: "alternative", korean: "대안" },
      { english: "figure", korean: "형상" },
      { english: "require", korean: "요구하다" },
      { english: "whole", korean: "전체의" },
      { english: "option", korean: "선택" },
      { english: "imaginary", korean: "가상적인" },
      { english: "technique", korean: "기술" },
      { english: "fantasy", korean: "상상" },
      { english: "miniature", korean: "축소 모형" },
      { english: "sequential", korean: "순차적인" },
      { english: "dozen", korean: "십여 개" },
      { english: "stair", korean: "계단" },
      { english: "reality", korean: "현실" },
      { english: "movie director", korean: "영화감독" },
      { english: "trick", korean: "속임수" },
      { english: "special effect", korean: "특수 효과" },
      { english: "fake", korean: "가짜의" },
      { english: "explosion", korean: "폭발" },
      { english: "accident", korean: "사고" },
      { english: "injury", korean: "상처" },
    ];

    return NextResponse.json({ words: mockWords });

    /* 
    // 나중에 유료/한도 초기화 시 아래 주석을 풀고 위 mockWords 부분을 삭제하세요.
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // ... 나머지 AI 로직
    */

  } catch (error: any) {
    console.error("[OCR] Error:", error);

    // 429 Too Many Requests (무료 분당 15회 제한)
    if (error.status === 429 || error.message?.includes("429")) {
      return NextResponse.json(
        { error: "Gemini API 요청 한도를 초과했습니다. 1분 후 다시 시도해 주세요. (무료 플랜: 분당 15회 제한)" },
        { status: 429 }
      );
    }

    // JSON 파싱 실패
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI 응답을 파싱하지 못했습니다. 다시 시도해 주세요." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `AI 분석 오류: ${error.message || "알 수 없는 오류"}` },
      { status: 500 }
    );
  }
}
