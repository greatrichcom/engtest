# Zen-Pop 아키텍처 및 구현 계획서 v3

> 🎮 초등학생용 힐링 영단어 RPG — 상용 서비스 수준 아키텍처

---

## 📌 기술 스택 개요

| 영역 | 기술 | 버전/비고 |
|------|------|-----------|
| **프레임워크** | Next.js (App Router) | 15.x, `app/` 디렉토리 |
| **언어** | TypeScript | strict 모드 |
| **스타일링** | Tailwind CSS v4 | 디자인 토큰 커스텀 설정 |
| **백엔드/DB** | Supabase | PostgreSQL + Auth + Storage + Edge Functions |
| **배포** | Vercel | CI/CD 자동 배포 |
| **상태 관리** | Zustand + React Query (TanStack Query) | 클라이언트/서버 상태 분리 |
| **드래그 앤 드롭** | @dnd-kit/core | 터치 최적화 DnD |
| **애니메이션** | Framer Motion | 제스처 + 트랜지션 |
| **아이콘** | Lucide React | SVG 아이콘 |

---

## 🏗️ 프로젝트 폴더 구조

```
engtest/
├── public/
│   ├── assets/
│   │   ├── monsters/              # 몬스터 이미지 에셋
│   │   ├── ui/                    # UI 에셋 (배경, 아이콘 등)
│   │   └── sounds/                # 효과음
│   ├── favicon.ico
│   └── manifest.json              # PWA 매니페스트
│
├── src/
│   ├── app/                       # ✅ Next.js App Router
│   │   ├── layout.tsx             # 루트 레이아웃 (폰트, 메타, Provider)
│   │   ├── page.tsx               # 랜딩/스플래시 → 로비 리다이렉트
│   │   ├── globals.css            # Tailwind 디렉티브 + 글로벌 스타일
│   │   │
│   │   ├── (auth)/                # 🔒 인증 그룹
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # 로그인 화면
│   │   │   └── signup/
│   │   │       └── page.tsx       # 회원가입 화면
│   │   │
│   │   ├── (game)/                # 🎮 게임 라우트 그룹 (레이아웃 공유)
│   │   │   ├── layout.tsx         # 게임 공통 레이아웃 (상태바 포함)
│   │   │   ├── lobby/
│   │   │   │   └── page.tsx       # 메인 로비 (모험 지도)
│   │   │   ├── battle/
│   │   │   │   └── [unitId]/
│   │   │   │       └── page.tsx   # 배틀 화면 (동적 라우팅)
│   │   │   ├── result/
│   │   │   │   └── [unitId]/
│   │   │   │       └── page.tsx   # 결과 화면
│   │   │   ├── revenge/
│   │   │   │   └── [unitId]/
│   │   │   │       └── page.tsx   # 리벤지 매치
│   │   │   ├── scan/
│   │   │   │   └── page.tsx       # 단어장 스캔 (OCR)
│   │   │   ├── shop/
│   │   │   │   └── page.tsx       # 상점
│   │   │   └── dex/
│   │   │       └── page.tsx       # 몬스터 도감
│   │   │
│   │   └── api/                   # API 라우트 (서버리스)
│   │       ├── ocr/
│   │       │   └── route.ts       # OCR 처리 API
│   │       └── ai-image/
│   │           └── route.ts       # AI 이미지 생성 API
│   │
│   ├── components/                # ✅ 재사용 컴포넌트
│   │   ├── ui/                    # 범용 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Avatar.tsx
│   │   │
│   │   ├── game/                  # 게임 전용 컴포넌트
│   │   │   ├── Monster.tsx        # 몬스터 렌더링 (HP바, 애니메이션)
│   │   │   ├── HpGauge.tsx        # HP 게이지 바
│   │   │   ├── SpellPuzzle.tsx    # 타입 A: 스펠링 맞추기 (DnD)
│   │   │   ├── MatchConnect.tsx   # 타입 B: 뜻 매칭 (선 긋기)
│   │   │   ├── AlphabetBubble.tsx # 알파벳 구슬
│   │   │   ├── WordBubble.tsx     # 영어/한글 방울
│   │   │   ├── TreasureBox.tsx    # 보물상자 연출
│   │   │   ├── WhackAMole.tsx     # 두더지 잡기 미니게임
│   │   │   └── MiniMap.tsx        # 진행도 미니맵
│   │   │
│   │   ├── lobby/                 # 로비 컴포넌트
│   │   │   ├── AdventureMap.tsx   # 모험 지도
│   │   │   ├── BookCard.tsx       # 단어장(책) 카드
│   │   │   ├── UnitNode.tsx       # 스테이지 노드 (별/자물쇠)
│   │   │   └── FloatingActions.tsx # 하단 FAB 메뉴
│   │   │
│   │   └── layout/                # 레이아웃 컴포넌트
│   │       ├── StatusBar.tsx      # 상단 상태바 (아바타, 재화)
│   │       ├── BottomNav.tsx      # 하단 네비게이션
│   │       └── GameHeader.tsx     # 게임 화면 헤더
│   │
│   ├── hooks/                     # ✅ 커스텀 훅
│   │   ├── useAuth.ts             # Supabase 인증 훅
│   │   ├── useGameEngine.ts       # 게임 로직 훅
│   │   ├── useWords.ts            # 단어 데이터 CRUD 훅
│   │   ├── useRewards.ts          # 보상 시스템 훅
│   │   ├── useDragDrop.ts         # 터치 DnD 커스텀 훅
│   │   ├── useHaptic.ts           # 햅틱 피드백 훅
│   │   └── useSound.ts            # 효과음 훅
│   │
│   ├── lib/                       # ✅ 유틸리티 & 설정
│   │   ├── supabase/
│   │   │   ├── client.ts          # Supabase 브라우저 클라이언트
│   │   │   ├── server.ts          # Supabase 서버 클라이언트
│   │   │   ├── middleware.ts      # Auth 미들웨어 헬퍼
│   │   │   └── types.ts           # DB 타입 (supabase gen types)
│   │   ├── game/
│   │   │   ├── engine.ts          # 게임 엔진 순수 로직
│   │   │   ├── hp-system.ts       # HP 계산 로직
│   │   │   ├── reward-calc.ts     # 보상 계산 로직
│   │   │   └── word-shuffle.ts    # 단어 셔플/출제 알고리즘
│   │   ├── animations.ts          # Framer Motion 프리셋
│   │   └── constants.ts           # 상수 정의
│   │
│   ├── stores/                    # ✅ Zustand 상태 관리
│   │   ├── useGameStore.ts        # 게임 진행 상태
│   │   ├── useUserStore.ts        # 유저 정보 상태
│   │   └── useUIStore.ts          # UI 상태 (모달, 토스트 등)
│   │
│   ├── types/                     # ✅ TypeScript 타입 정의
│   │   ├── game.ts                # 게임 관련 타입
│   │   ├── database.ts            # DB 스키마 타입
│   │   └── api.ts                 # API 응답 타입
│   │
│   └── providers/                 # ✅ Context Providers
│       ├── AuthProvider.tsx       # Supabase Auth 컨텍스트
│       ├── QueryProvider.tsx      # TanStack Query 설정
│       └── GameProvider.tsx       # 게임 상태 컨텍스트
│
├── supabase/                      # ✅ Supabase 로컬 설정
│   ├── migrations/                # DB 마이그레이션
│   │   └── 001_initial_schema.sql
│   ├── seed.sql                   # 시드 데이터 (샘플 단어)
│   └── config.toml                # Supabase 로컬 설정
│
├── .github/                       # ✅ GitHub Actions & 설정
│   └── workflows/
│       └── ci.yml                 # CI 린트/빌드 체크
│
├── tailwind.config.ts             # Tailwind 커스텀 설정
├── next.config.ts                 # Next.js 설정
├── tsconfig.json                  # TypeScript 설정
├── package.json
├── middleware.ts                   # Next.js 미들웨어 (인증 보호)
├── .env.local                     # 환경 변수 — ⚠️ .gitignore 대상
├── .env.example                   # 환경 변수 템플릿 (빈 값)
├── .gitignore                     # Git 제외 목록
│
├── 기획.md                        # 프로젝트 기획서
├── UIUX.md                        # UI/UX 설계서
├── plan.md                        # v1 구현 계획서
└── Zen-Pop 아키텍처 및 구현 계획서 v3.md  # 본 문서
```

---

## 🎨 Tailwind CSS 디자인 시스템 (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // ──────────────────────────────────────
      // 🎨 Zen-Pop 커스텀 컬러 팔레트
      // ──────────────────────────────────────
      colors: {
        // 브랜드 컬러
        zen: {
          // 파스텔 힐링 계열
          lavender:   { DEFAULT: "#E8E0F0", light: "#F3EEF8", dark: "#C9B8DC" },
          mint:       { DEFAULT: "#D4F0E8", light: "#E8F8F2", dark: "#A8DCC8" },
          peach:      { DEFAULT: "#FFE4D6", light: "#FFF0E8", dark: "#FFCBB0" },
          sky:        { DEFAULT: "#D6EEFF", light: "#E8F4FF", dark: "#A8D4F0" },

          // 팝 포인트 컬러 (게임 액션용)
          pink:       { DEFAULT: "#FF6B9D", light: "#FF8DB5", dark: "#E84D7F" },
          orange:     { DEFAULT: "#FFA63E", light: "#FFB96A", dark: "#E88A1E" },
          green:      { DEFAULT: "#5CD85C", light: "#7CE47C", dark: "#3CB83C" },
          blue:       { DEFAULT: "#4DABF7", light: "#74BFF9", dark: "#2B8FD9" },
          purple:     { DEFAULT: "#9775FA", light: "#B197FC", dark: "#7950D8" },
        },

        // 몬스터 컬러
        monster: {
          soft_purple: "#B39DDB",
          soft_blue:   "#81D4FA",
          soft_pink:   "#F48FB1",
          soft_green:  "#A5D6A7",
          soft_orange: "#FFCC80",
        },

        // 재화 컬러
        currency: {
          gold:   "#FFD700",
          gem:    "#9C27B0",
          exp:    "#00BCD4",
        },

        // 시맨틱 컬러
        correct:  "#5CD85C",
        wrong:    "#FF6B6B",
        bg: {
          DEFAULT: "#FFF8F0",      // 전체 배경 (따뜻한 아이보리)
          card:    "#FFFFFF",       // 카드 배경
          dark:    "#2D2D3D",      // 다크 모드 배경
        },
        text: {
          primary:   "#2D2D3D",
          secondary: "#6B7280",
          inverse:   "#FFFFFF",
        },
      },

      // ──────────────────────────────────────
      // 🔤 폰트 패밀리
      // ──────────────────────────────────────
      fontFamily: {
        heading: ['"Jua"', "sans-serif"],           // 한글 둥근 제목 폰트
        body:    ['"Nunito"', '"Noto Sans KR"', "sans-serif"],
        game:    ['"Fredoka"', '"Jua"', "sans-serif"], // 게임 UI 폰트
      },

      // ──────────────────────────────────────
      // 📐 라운딩 & 그림자 (둥글둥글한 감성)
      // ──────────────────────────────────────
      borderRadius: {
        "bubble": "9999px",      // 완전 원형 (구슬, 방울)
        "card":   "1.25rem",     // 20px 카드
        "btn":    "1rem",        // 16px 버튼
        "fab":    "1.75rem",     // 28px FAB
      },
      boxShadow: {
        "soft":     "0 4px 20px rgba(0, 0, 0, 0.06)",
        "card":     "0 8px 30px rgba(0, 0, 0, 0.08)",
        "pop":      "0 6px 0 rgba(0, 0, 0, 0.12)",      // 팝 입체 버튼
        "glow-pink":    "0 0 20px rgba(255, 107, 157, 0.4)",
        "glow-green":   "0 0 20px rgba(92, 216, 92, 0.4)",
        "glow-gold":    "0 0 20px rgba(255, 215, 0, 0.5)",
        "monster":      "0 10px 40px rgba(0, 0, 0, 0.15)",
      },

      // ──────────────────────────────────────
      // 🎬 애니메이션
      // ──────────────────────────────────────
      keyframes: {
        "pop-in": {
          "0%":   { transform: "scale(0)", opacity: "0" },
          "70%":  { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "shake": {
          "0%, 100%":            { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%":  { transform: "translateX(-6px)" },
          "20%, 40%, 60%, 80%":  { transform: "translateX(6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)" },
          "50%":      { boxShadow: "0 0 30px rgba(255, 215, 0, 0.7)" },
        },
        "hit-flash": {
          "0%":   { filter: "brightness(1)" },
          "50%":  { filter: "brightness(2) saturate(0)" },
          "100%": { filter: "brightness(1)" },
        },
        "treasure-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%":      { transform: "translateY(-20px) rotate(-5deg)" },
          "75%":      { transform: "translateY(-20px) rotate(5deg)" },
        },
      },
      animation: {
        "pop-in":           "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float":            "float 3s ease-in-out infinite",
        "shake":            "shake 0.5s ease-in-out",
        "glow-pulse":       "glow-pulse 2s ease-in-out infinite",
        "hit-flash":        "hit-flash 0.3s ease-out",
        "treasure-bounce":  "treasure-bounce 1s ease-in-out infinite",
      },

      // ──────────────────────────────────────
      // 📱 반응형 브레이크포인트
      // ──────────────────────────────────────
      screens: {
        "mobile":  "375px",
        "tablet":  "768px",
        "desktop": "1024px",
      },
    },
  },
  plugins: [],
};

export default config;
```

> **Stitch 연동 팁**: 위 컬러 토큰을 사용하면 Stitch AI가 `bg-zen-pink`, `text-monster-soft_purple`, `shadow-pop` 같은 클래스로 Zen-Pop 테마의 컴포넌트를 쉽게 생성할 수 있습니다.

---

## 💾 Supabase 데이터베이스 스키마 (SQL)

```sql
-- ============================================
-- Zen-Pop 데이터베이스 스키마
-- Supabase PostgreSQL
-- ============================================

-- 0. UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 사용자 프로필 (Supabase Auth 연동)
-- ============================================
CREATE TABLE profiles (
    id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nickname      TEXT NOT NULL DEFAULT '모험자',
    avatar_url    TEXT,
    level         INTEGER NOT NULL DEFAULT 1,
    exp           INTEGER NOT NULL DEFAULT 0,
    gold          INTEGER NOT NULL DEFAULT 100,      -- 시작 골드
    gems          INTEGER NOT NULL DEFAULT 5,         -- 시작 보석
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 새 유저 가입 시 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, nickname)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nickname', '모험자'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 2. 단어장 (대분류 = 책/교재)
-- ============================================
CREATE TABLE books (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,                     -- 예: "Insight Link 5-6"
    cover_image_url TEXT,                              -- 표지 이미지
    description     TEXT,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_preset       BOOLEAN NOT NULL DEFAULT FALSE,    -- 사전 내장 여부
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_books_user ON books(user_id);

-- ============================================
-- 3. 단원 (중분류 = 스테이지/유닛)
-- ============================================
CREATE TABLE units (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id         UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,                     -- 예: "Unit 5 - Animals"
    sort_order      INTEGER NOT NULL DEFAULT 0,
    monster_type    TEXT DEFAULT 'default',             -- 몬스터 외형 타입
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_units_book ON units(book_id);

-- ============================================
-- 4. 단어 (최소 단위)
-- ============================================
CREATE TABLE words (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id         UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    english         TEXT NOT NULL,                     -- 영어 단어
    korean          TEXT NOT NULL,                     -- 한글 뜻
    image_url       TEXT,                              -- AI 연상 이미지 URL
    hint_emoji      TEXT,                              -- 이모지 힌트 (폴백)
    difficulty      INTEGER NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    sort_order      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_words_unit ON words(unit_id);
CREATE INDEX idx_words_english ON words(english);

-- ============================================
-- 5. 이미지 캐시 (AI 생성 이미지 비용 절감)
-- ============================================
CREATE TABLE image_cache (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    english_word    TEXT NOT NULL UNIQUE,               -- 유니크 키
    image_url       TEXT NOT NULL,                      -- Supabase Storage URL
    source          TEXT NOT NULL DEFAULT 'ai',         -- 'ai' | 'manual' | 'emoji'
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_image_cache_word ON image_cache(english_word);

-- ============================================
-- 6. 유저 진행 상황 (스테이지별 클리어 기록)
-- ============================================
CREATE TABLE user_progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    unit_id         UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    status          TEXT NOT NULL DEFAULT 'locked'
                    CHECK (status IN ('locked', 'unlocked', 'cleared')),
    stars           INTEGER NOT NULL DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
    best_score      INTEGER NOT NULL DEFAULT 0,
    attempts        INTEGER NOT NULL DEFAULT 0,
    cleared_at      TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, unit_id)
);

CREATE INDEX idx_progress_user ON user_progress(user_id);

-- ============================================
-- 7. 단어별 학습 기록 (오답/정답 추적)
-- ============================================
CREATE TABLE word_records (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    word_id         UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    correct_count   INTEGER NOT NULL DEFAULT 0,
    wrong_count     INTEGER NOT NULL DEFAULT 0,
    is_mastered     BOOLEAN NOT NULL DEFAULT FALSE,
    last_played_at  TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, word_id)
);

CREATE INDEX idx_word_records_user ON word_records(user_id);
CREATE INDEX idx_word_records_wrong ON word_records(user_id, wrong_count)
    WHERE wrong_count > 0;    -- 오답 단어 빠른 조회

-- ============================================
-- 8. 게임 세션 로그 (분석/리플레이용)
-- ============================================
CREATE TABLE game_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    unit_id         UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    game_type       TEXT NOT NULL CHECK (game_type IN ('battle', 'revenge')),
    score           INTEGER NOT NULL DEFAULT 0,
    total_words     INTEGER NOT NULL DEFAULT 0,
    correct_words   INTEGER NOT NULL DEFAULT 0,
    wrong_words     INTEGER NOT NULL DEFAULT 0,
    duration_sec    INTEGER,                           -- 소요 시간 (초)
    gold_earned     INTEGER NOT NULL DEFAULT 0,
    exp_earned      INTEGER NOT NULL DEFAULT 0,
    played_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON game_sessions(user_id);

-- ============================================
-- 9. 몬스터 도감
-- ============================================
CREATE TABLE monster_dex (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    monster_type    TEXT NOT NULL,
    name            TEXT NOT NULL,
    captured_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, monster_type)
);

-- ============================================
-- 10. Row Level Security (RLS) 정책
-- ============================================
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE books          ENABLE ROW LEVEL SECURITY;
ALTER TABLE units          ENABLE ROW LEVEL SECURITY;
ALTER TABLE words          ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_records   ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE monster_dex    ENABLE ROW LEVEL SECURITY;

-- 프로필: 본인만 조회/수정
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE USING (auth.uid() = id);

-- 단어장: 본인 소유 + 프리셋은 전체 공개
CREATE POLICY "Users can view own or preset books"
    ON books FOR SELECT USING (user_id = auth.uid() OR is_preset = TRUE);
CREATE POLICY "Users can manage own books"
    ON books FOR ALL USING (user_id = auth.uid());

-- 유닛/단어: 소속 단어장 기반 접근
CREATE POLICY "Users can view units of accessible books"
    ON units FOR SELECT USING (
        EXISTS (SELECT 1 FROM books WHERE books.id = units.book_id
                AND (books.user_id = auth.uid() OR books.is_preset = TRUE))
    );

CREATE POLICY "Users can view words of accessible units"
    ON words FOR SELECT USING (
        EXISTS (SELECT 1 FROM units
                JOIN books ON books.id = units.book_id
                WHERE units.id = words.unit_id
                AND (books.user_id = auth.uid() OR books.is_preset = TRUE))
    );

-- 진행/기록: 본인만
CREATE POLICY "Users can manage own progress"
    ON user_progress FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own word records"
    ON word_records FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own sessions"
    ON game_sessions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own dex"
    ON monster_dex FOR ALL USING (user_id = auth.uid());

-- 이미지 캐시: 전체 공개 읽기
CREATE POLICY "Anyone can view image cache"
    ON image_cache FOR SELECT USING (TRUE);
```

---

## 🔌 Supabase 연동 아키텍처

### 인증 (Auth)
```
사용자 인증 플로우:
┌──────────┐     ┌──────────┐     ┌──────────────┐
│  로그인   │ ──→ │ Supabase │ ──→ │  profiles     │
│  화면     │     │  Auth    │     │  자동 생성     │
└──────────┘     └──────────┘     └──────────────┘

지원 방식:
• 이메일/비밀번호 (기본)
• Google OAuth (선택)
• 익명 로그인 (게스트 모드 — 데이터 임시 저장)
```

### 데이터 흐름
```
[클라이언트]                    [Supabase]
     │                              │
     ├── useAuth() ──────────────→ Auth
     ├── useWords() ─────────────→ words / units / books
     ├── useGameStore ───────────→ user_progress / word_records
     ├── useRewards() ───────────→ profiles (gold, exp, level)
     └── useSessions() ─────────→ game_sessions
```

### 클라이언트 초기화 (`src/lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

---

## ⚙️ 핵심 기능 구현 설계

### 1. 게임 엔진 (`lib/game/engine.ts`)
```typescript
interface BattleState {
  unitId: string;
  words: Word[];
  currentIndex: number;
  monsterHp: number;
  maxHp: number;
  score: number;
  correctWords: string[];
  wrongWords: string[];
  gameType: "spell" | "match";  // 타입 A / B
}

// 순수 함수로 구현 → 테스트 용이
function checkSpellAnswer(state: BattleState, answer: string): BattleResult;
function checkMatchAnswer(state: BattleState, pairs: MatchPair[]): BattleResult;
function calculateReward(state: BattleState): RewardResult;
function calculateStars(state: BattleState): 1 | 2 | 3;
```

### 2. 드래그 앤 드롭 (SpellPuzzle)
- `@dnd-kit/core` 사용 → 터치 + 마우스 동시 지원
- 센서: `PointerSensor` (마우스) + `TouchSensor` (모바일)
- 알파벳 구슬을 빈칸 슬롯으로 드래그
- 정답 판정 → Framer Motion으로 피드백 애니메이션

### 3. 선 긋기 (MatchConnect)
- SVG 또는 Canvas로 영어↔한글 연결선 렌더링
- `onPointerDown` → `onPointerMove` → `onPointerUp`으로 선 긋기
- 정답 쌍 매칭 시 선 색상 변경 + 팝 이펙트

### 4. 두더지 잡기 (WhackAMole)
- 3×3 또는 4×3 그리드 홀 배치
- 랜덤 타이밍에 몬스터(오답 단어) 등장
- 올바른 뜻의 몬스터 탭 시 → 정답 처리
- 제한 시간 (30~60초) 타이머

---

## 📅 구현 우선순위 (Phase별 로드맵)

| Phase | 항목 | 상세 | 예상 기간 |
|-------|------|------|----------|
| **P0** | 프로젝트 초기화 | Next.js + Tailwind + TS + Supabase 세팅 | 1일 |
| **P0** | 인증 시스템 | Supabase Auth + 프로필 생성 | 1일 |
| **P0** | DB 마이그레이션 | 스키마 생성 + 시드 데이터 | 0.5일 |
| **P1** | 로비 화면 | 모험 지도 + 단어장 목록 + 상태바 | 2일 |
| **P1** | 배틀 화면 (타입 A) | 스펠링 맞추기 DnD + 몬스터 HP 연동 | 3일 |
| **P2** | 배틀 화면 (타입 B) | 뜻 매칭 선 긋기 | 2일 |
| **P2** | 결과 화면 | 보물상자 + 보상 연출 + DB 기록 | 1일 |
| **P2** | 리벤지 매치 | 두더지 잡기 미니게임 | 2일 |
| **P3** | 상점 & 도감 | 몬스터 도감 + 상점 UI | 2일 |
| **P3** | PWA 최적화 | 오프라인 지원 + manifest | 1일 |
| **P4** | OCR 스캔 | 카메라 촬영 → 단어 추출 | 3일 |
| **P4** | AI 이미지 연동 | 단어별 연상 이미지 생성 + 캐싱 | 2일 |

---

## 🚀 배포 & DevOps (GitHub + Vercel)

### 1. GitHub 저장소 초기화

#### 1-1. 저장소 생성 & 초기 푸시
```bash
# 1) GitHub에서 새 저장소 생성 (Private 권장)
#    이름: zen-pop  /  설명: 초등학생용 힐링 영단어 RPG

# 2) 로컬 프로젝트를 Git으로 초기화
cd engtest
git init
git remote add origin https://github.com/<USERNAME>/zen-pop.git

# 3) 첫 커밋 & 푸시
git add .
git commit -m "init: Zen-Pop 프로젝트 초기 설정"
git branch -M main
git push -u origin main
```

#### 1-2. `.gitignore` 필수 설정
```gitignore
# 의존성
node_modules/

# Next.js 빌드
.next/
out/

# 환경 변수 — ⚠️ 절대 커밋 금지
.env
.env.local
.env.production.local

# Supabase 로컬
supabase/.temp/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

#### 1-3. `.env.example` (팀/공유용 템플릿)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Image (선택)
OPENAI_API_KEY=
```
> 실제 키 값은 비워 두고 커밋합니다. 신규 개발자가 복사해서 `.env.local`로 사용.

---

### 2. 브랜치 전략 (Solo-Dev Simplified Git Flow)

```
┌────────────────────────────────────────────────────────┐
│  main (운영 배포)      ●───●───────●───────●──→        │
│                             ↑ merge    ↑ merge         │
│  dev  (통합 테스트)    ●───●───●───●───●───●──→        │
│                         ↑        ↑                     │
│  feature/*             ●───●    ●───●                  │
│  (기능 개발)           lobby    battle                  │
└────────────────────────────────────────────────────────┘
```

| 브랜치 | 용도 | Vercel 배포 |
|--------|------|-------------|
| `main` | **운영(Production)** 배포 전용. 안정된 코드만 머지. | ✅ Production 자동 배포 |
| `dev` | **개발 통합** 브랜치. feature 브랜치를 여기로 머지하여 테스트. | ✅ Preview URL 자동 생성 |
| `feature/*` | **기능 단위** 개발 브랜치. 예: `feature/lobby`, `feature/battle-a` | ✅ Preview URL 자동 생성 |

#### 일상 작업 흐름
```bash
# 1) 새 기능 시작
git checkout dev
git pull origin dev
git checkout -b feature/lobby

# 2) 작업 & 커밋
git add .
git commit -m "feat(lobby): 모험 지도 UI 구현"

# 3) dev에 머지 (Preview 테스트)
git checkout dev
git merge feature/lobby
git push origin dev
# → Vercel이 자동으로 Preview URL 생성 → 테스트

# 4) 테스트 통과 후 main에 머지 (Production 배포)
git checkout main
git merge dev
git push origin main
# → Vercel이 자동으로 Production 배포
```

#### 커밋 메시지 컨벤션
```
<type>(<scope>): <description>

타입 예시:
  feat     — 새 기능
  fix      — 버그 수정
  style    — 디자인/CSS 변경
  refactor — 리팩토링
  docs     — 문서 수정
  chore    — 설정/빌드 변경

예시:
  feat(battle): 스펠링 맞추기 드래그 앤 드롭 구현
  fix(auth): 로그인 후 리다이렉트 오류 수정
  style(lobby): 모험 지도 카드 애니메이션 추가
```

---

### 3. Vercel — GitHub CI/CD 연동

#### 3-1. 초기 연동 설정
```
[설정 순서]

1) Vercel 가입/로그인 (https://vercel.com)
   └── GitHub 계정으로 로그인 권장 (자동 연동)

2) "New Project" → "Import Git Repository"
   └── zen-pop 저장소 선택

3) 프로젝트 설정:
   ├── Framework Preset: Next.js (자동 감지)
   ├── Root Directory: ./ (기본값)
   ├── Build Command: next build (기본값)
   └── Output Directory: .next (기본값)

4) 환경 변수 등록 (⚠️ 중요 — 아래 섹션 참고)

5) "Deploy" 클릭 → 첫 배포 완료!
```

#### 3-2. 자동 배포 파이프라인

```
┌─────────────┐      ┌──────────┐      ┌───────────────────┐
│  개발자가    │      │  GitHub  │      │     Vercel        │
│  코드 Push   │ ───→ │  Webhook │ ───→ │  자동 빌드/배포    │
└─────────────┘      │  트리거   │      │                   │
                     └──────────┘      └───────────────────┘

📌 브랜치별 배포 동작:

  ● main 브랜치 push/merge
    └──→ 🟢 Production 배포 (zen-pop.vercel.app)
         • 실제 사용자가 접속하는 운영 URL
         • 배포 완료 시 GitHub 커밋에 ✅ 체크 표시

  ● dev / feature/* 브랜치 push
    └──→ 🟡 Preview 배포 (zen-pop-<hash>.vercel.app)
         • 브랜치별 고유 Preview URL 자동 생성
         • PR(Pull Request) 생성 시 댓글로 URL 자동 첨부
         • 운영 환경에 영향 없이 안전하게 테스트 가능
```

#### 3-3. Preview Deployment 활용 가이드
```
[Preview URL 사용 시나리오]

1) feature/battle-a 브랜치를 push
2) Vercel이 자동으로 Preview 빌드 시작
3) 빌드 완료 시 고유 URL 생성:
   https://zen-pop-abc123.vercel.app
4) 이 URL로 모바일/태블릿에서 실제 터치 테스트
5) 문제 없으면 dev → main 순서로 머지

[Preview와 Production의 차이점]
┌──────────────┬──────────────────┬──────────────────┐
│ 항목          │ Preview          │ Production       │
├──────────────┼──────────────────┼──────────────────┤
│ URL          │ *-<hash>.vercel  │ zen-pop.vercel   │
│ 대상 브랜치   │ dev, feature/*   │ main             │
│ 검색 엔진     │ 인덱싱 차단       │ 인덱싱 허용       │
│ 환경 변수     │ Preview용 설정    │ Production용 설정 │
│ 용도          │ 개발/테스트       │ 실서비스 운영      │
└──────────────┴──────────────────┴──────────────────┘
```

---

### 4. 환경 변수 관리 가이드

> ⚠️ **핵심 원칙**: API 키는 절대 GitHub에 올리지 않는다. Vercel 대시보드에서만 관리한다.

#### 4-1. 환경 변수 목록

| 변수명 | 용도 | 공개 여부 | 필수 |
|--------|------|-----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 클라이언트 노출 (OK) | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 공개 키 (RLS 보호) | 클라이언트 노출 (OK) | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서버 전용 키 | 🔒 서버만 사용 | ✅ |
| `OPENAI_API_KEY` | AI 이미지 생성 (선택) | 🔒 서버만 사용 | ❌ |

> `NEXT_PUBLIC_` 접두사가 붙은 변수는 브라우저에 노출됩니다.  
> Supabase anon key는 RLS(Row Level Security)로 보호되므로 노출되어도 안전합니다.  
> `SUPABASE_SERVICE_ROLE_KEY`는 **절대 클라이언트에 노출하면 안 됩니다**.

#### 4-2. Vercel 대시보드 등록 방법
```
[설정 경로]
Vercel Dashboard → zen-pop 프로젝트
→ Settings → Environment Variables

[등록 방법]
1) "Add New" 클릭
2) Key: NEXT_PUBLIC_SUPABASE_URL
3) Value: https://xxxxx.supabase.co
4) Environment 선택:
   ☑ Production    — main 브랜치 배포 시 사용
   ☑ Preview       — dev/feature 브랜치 배포 시 사용
   ☑ Development   — vercel dev 로컬 실행 시 사용
5) "Save" 클릭

→ 나머지 변수도 동일하게 등록
```

#### 4-3. 환경별 Supabase 프로젝트 분리 (권장)
```
[프로덕션과 개발 환경을 Supabase 프로젝트로 분리]

Supabase 프로젝트 A (개발용: zen-pop-dev)
  └── Preview/Development 환경 변수에 등록

Supabase 프로젝트 B (운영용: zen-pop-prod)
  └── Production 환경 변수에 등록

장점:
• 개발 중 실수로 운영 DB 오염 방지
• 테스트 데이터와 실 데이터 완전 분리
• 스키마 변경을 개발 DB에서 먼저 검증
```

---

### 5. GitHub Actions CI 체크 (선택)

```yaml
# .github/workflows/ci.yml
name: CI Check

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

> **역할**: Vercel 배포 전에 빌드/린트 오류를 미리 잡아줍니다.  
> GitHub Secrets에 Supabase 변수 등록 필요 (Settings → Secrets → Actions).

---

### 6. 전체 DevOps 흐름 요약

```
┌─────────────────────────────────────────────────────────────┐
│                    Zen-Pop DevOps 파이프라인                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [로컬 개발]                                                 │
│   npm run dev ← .env.local (로컬 Supabase 키)               │
│       │                                                     │
│       ▼                                                     │
│  [feature/* → dev 머지]                                      │
│   git push origin dev                                       │
│       │                                                     │
│       ├── GitHub Actions: 린트 + 빌드 체크 ✅                 │
│       ├── Vercel: Preview 자동 배포 → Preview URL 생성 🟡     │
│       └── 모바일/태블릿에서 Preview URL로 실제 테스트           │
│                                                             │
│       ▼                                                     │
│  [dev → main 머지]                                           │
│   git push origin main                                      │
│       │                                                     │
│       ├── GitHub Actions: 린트 + 빌드 체크 ✅                 │
│       ├── Vercel: Production 자동 배포 🟢                     │
│       └── zen-pop.vercel.app 에 실서비스 반영!                 │
│                                                             │
│  [DB 변경 시]                                                │
│   supabase db push  (마이그레이션 적용)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ 검증 계획

### 자동 검증
1. **빌드 검증**: `npm run build` — TypeScript 타입 에러, 빌드 실패 확인
2. **린트 검증**: `npm run lint` — ESLint 검사
3. **개발 서버**: `npm run dev` → `http://localhost:3000` 접속 확인

### 브라우저 테스트 (각 Phase 완료 시)
1. **인증 플로우**: 회원가입 → 로그인 → 프로필 표시
2. **로비 화면**: 단어장 목록 → 스테이지 선택 → 배틀 진입
3. **배틀 A**: 알파벳 구슬 드래그 → 빈칸 드롭 → HP 감소 → 스테이지 클리어
4. **배틀 B**: 영어↔한글 선 긋기 → 정답 판정
5. **결과**: 보물상자 탭 → 보상 수령 → DB 기록 확인
6. **리벤지**: 틀린 단어 목록 → 두더지 잡기 → 복습 완료

### 모바일 검증
- Chrome DevTools 모바일 에뮬레이션 (375×812, 768×1024)
- 실제 모바일 디바이스에서 터치 인터랙션 테스트
- 햅틱 피드백 + 사운드 동작 확인
