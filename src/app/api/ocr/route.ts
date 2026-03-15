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
    // 사용자님이 캡처하신 Unit 1, 2, 3 등의 데이터를 무작위로 반환합니다.
    // ==========================================
    console.log("[OCR] 임시 목업 모드: 실제 교재(Unit 1~3) 데이터 중 하나를 반환");
    
    // 분석하는 척 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    const unit1 = [
      { english: "skeleton", korean: "뼈대[골격]" },
      { english: "support", korean: "지지하다" },
      { english: "organ", korean: "장기" },
      { english: "attach", korean: "붙이다" },
      { english: "contract", korean: "수축하다" },
      { english: "relax", korean: "긴장을 풀다" },
      { english: "part", korean: "부분" },
      { english: "join", korean: "연결하다" },
      { english: "frame", korean: "틀, 뼈대" },
      { english: "normal", korean: "보통의" },
      { english: "happen", korean: "일어나다" },
      { english: "hard", korean: "딱딱한" },
      { english: "grow", korean: "자라다" },
      { english: "shape", korean: "모양" },
      { english: "protect", korean: "보호하다" },
      { english: "however", korean: "하지만, 그러나" },
      { english: "length", korean: "길이" },
      { english: "apart", korean: "떨어져" },
      { english: "weight", korean: "무게" },
      { english: "strong", korean: "강한" },
      { english: "element", korean: "성분, 요소" },
      { english: "bone", korean: "뼈" },
      { english: "muscle", korean: "근육" },
      { english: "fat", korean: "지방" },
      { english: "take up", korean: "차지하다" },
      { english: "fiber", korean: "섬유질" },
      { english: "flexible", korean: "유연한" },
      { english: "warm", korean: "따뜻한" },
      { english: "absorb", korean: "흡수하다" },
      { english: "structure", korean: "구조" },
    ];

    const unit2 = [
      { english: "provide", korean: "제공하다" },
      { english: "misunderstanding", korean: "오해" },
      { english: "spend", korean: "(돈, 시간을) 쓰다" },
      { english: "factor", korean: "요인" },
      { english: "gender", korean: "성별" },
      { english: "influence", korean: "영향을 미치다" },
      { english: "constantly", korean: "끊임없이" },
      { english: "initially", korean: "처음에" },
      { english: "rate", korean: "속도" },
      { english: "exercise", korean: "운동, 운동하다" },
      { english: "work", korean: "작동하다" },
      { english: "unit", korean: "단위" },
      { english: "measure", korean: "측정하다" },
      { english: "gain", korean: "얻게 되다" },
      { english: "amount", korean: "총액, 액수" },
      { english: "lifestyle", korean: "생활 방식" },
      { english: "burn", korean: "태우다" },
      { english: "active", korean: "활동적인" },
      { english: "athlete", korean: "선수" },
      { english: "information", korean: "정보" },
      { english: "nutrition", korean: "영양" },
      { english: "individual", korean: "1인용(분)의" },
      { english: "located", korean: "~에 위치한" },
      { english: "common", korean: "흔한, 일반적인" },
      { english: "temperature", korean: "온도" },
      { english: "vary", korean: "다르다" },
      { english: "teenager", korean: "십대" },
      { english: "raise", korean: "올리다" },
      { english: "daily", korean: "일일, 하루" },
      { english: "requirement", korean: "필요(조건)" },
    ];

    const unit3 = [
      { english: "period", korean: "시기" },
      { english: "interest", korean: "관심" },
      { english: "society", korean: "사회" },
      { english: "realistic", korean: "현실적인" },
      { english: "hire", korean: "고용하다" },
      { english: "dissect", korean: "해부하다" },
      { english: "regard", korean: "~을 ~로 여기다" },
      { english: "in addition", korean: "(~에) 덧붙여, 게다가" },
      { english: "think highly of", korean: "중요시하다" },
      { english: "lifelike", korean: "실물과 같은" },
      { english: "brilliant", korean: "훌륭한" },
      { english: "common", korean: "공동의" },
      { english: "ordinary", korean: "평범한, 보통의" },
      { english: "nearly", korean: "거의" },
      { english: "attention", korean: "주의, 주목" },
      { english: "natural", korean: "자연스러운" },
      { english: "observe", korean: "관찰하다" },
      { english: "closely", korean: "자세히, 주의하여" },
      { english: "masterpiece", korean: "명작" },
      { english: "thought", korean: "생각" },
      { english: "various", korean: "다양한" },
      { english: "serious", korean: "진지한" },
      { english: "theme", korean: "주제" },
      { english: "express", korean: "표현하다" },
      { english: "compare", korean: "비교하다" },
      { english: "holy", korean: "신성한" },
      { english: "posture", korean: "자세" },
      { english: "lack", korean: "~이 없다, 부족, 결핍" },
      { english: "disease", korean: "질병" },
      { english: "as a result", korean: "결과적으로" },
    ];

    const allMocks = [unit1, unit2, unit3];
    const selectedMock = allMocks[Math.floor(Math.random() * allMocks.length)];
    const selectedUnitNum = allMocks.indexOf(selectedMock) + 1;

    return NextResponse.json({ 
      words: selectedMock,
      _debug_unit: `Unit ${selectedUnitNum}` 
    });

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
