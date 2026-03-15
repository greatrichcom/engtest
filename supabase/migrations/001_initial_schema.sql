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
    WHERE wrong_count > 0;

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
    duration_sec    INTEGER,
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
