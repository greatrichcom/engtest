-- ============================================
-- Zen-Pop 샘플 데이터 시드 (Insight Link 5-6 및 초기 설정)
-- 이 쿼리를 Supabase SQL Editor에 복사하여 붙여넣으세요.
-- ============================================

DO $$
DECLARE
    v_user_id UUID;
    v_book_id UUID := '11111111-1111-1111-1111-111111111111'; -- Insight Link 5-6
    v_unit1_id UUID := '22222222-2222-2222-2222-222222222222'; -- Unit 1
    v_unit2_id UUID := '33333333-3333-3333-3333-333333333333'; -- Unit 2
    v_unit3_id UUID := '44444444-4444-4444-4444-444444444444'; -- Unit 3
BEGIN
    -- 1. 현재 접속된 또는 가입된 첫 번째 유저 아이디를 자동으로 찾습니다.
    -- (아무 유저도 없다면 아래 데이터는 들어가지 않습니다. 먼저 회원가입을 해주세요!)
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    IF v_user_id IS NOT NULL THEN
        -- 2. 샘플 단어장 (Insight Link 5-6)
        INSERT INTO books (id, user_id, title, description, is_preset, sort_order)
        VALUES (v_book_id, v_user_id, 'Insight Link 5-6', '초등 고학년을 위한 배경지식 영어 독해교재', TRUE, 1)
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

        -- 3. 유닛 1: Bones and Muscles (Monster: Robot)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit1_id, v_book_id, 'Unit 1. Bones and Muscles', 1, 'robot')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 4. 유닛 2: The Body, Energy, and Calories (Monster: Dragon)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit2_id, v_book_id, 'Unit 2. Body and Energy', 2, 'dragon')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5. 유닛 3: The Human Body in Art (Monster: Ghost)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit3_id, v_book_id, 'Unit 3. Human Body in Art', 3, 'ghost')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 6. 단어 데이터 (Unit 1)
        DELETE FROM words WHERE unit_id = v_unit1_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit1_id, 'skeleton', '뼈대[골격]', '☠️', 1),
        (v_unit1_id, 'support', '지지하다', '🏗️', 2),
        (v_unit1_id, 'organ', '장기', '🫀', 3),
        (v_unit1_id, 'attach', '붙이다', '📎', 4),
        (v_unit1_id, 'contract', '수축하다', '✊', 5),
        (v_unit1_id, 'relax', '긴장을 풀다', '🧘', 6),
        (v_unit1_id, 'join', '연결하다', '🔗', 7),
        (v_unit1_id, 'frame', '틀, 뼈대', '🖼️', 8),
        (v_unit1_id, 'however', '하지만, 그러나', '🔄', 9),
        (v_unit1_id, 'length', '길이', '📏', 10),
        (v_unit1_id, 'weight', '무게', '⚖️', 11),
        (v_unit1_id, 'bone', '뼈', '🦴', 12),
        (v_unit1_id, 'muscle', '근육', '💪', 13),
        (v_unit1_id, 'fiber', '섬유질', '🧶', 14),
        (v_unit1_id, 'absorb', '흡수하다', '🧽', 15);

        -- 7. 단어 데이터 (Unit 2)
        DELETE FROM words WHERE unit_id = v_unit2_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit2_id, 'provide', '제공하다', '🎁', 1),
        (v_unit2_id, 'misunderstanding', '오해', '❓', 2),
        (v_unit2_id, 'spend', '(돈, 시간을) 쓰다', '💸', 3),
        (v_unit2_id, 'factor', '요인', '🧩', 4),
        (v_unit2_id, 'gender', '성별', '🚻', 5),
        (v_unit2_id, 'influence', '영향을 미치다', '🌊', 6),
        (v_unit2_id, 'rate', '속도', '🏎️', 7),
        (v_unit2_id, 'exercise', '운동하다', '🏃', 8),
        (v_unit2_id, 'unit', '단위', '🔢', 9),
        (v_unit2_id, 'amount', '총액, 액수', '💰', 10),
        (v_unit2_id, 'burn', '태우다', '🔥', 11),
        (v_unit2_id, 'lifestyle', '생활 방식', '🛋️', 12),
        (v_unit2_id, 'common', '흔한', '🟢', 13),
        (v_unit2_id, 'temperature', '온도', '🌡️', 14),
        (v_unit2_id, 'daily', '일일의', '📅', 15);

        -- 8. 초기 몬스터 도감 (슬라임 획득 상태로 시작)
        INSERT INTO monster_dex (user_id, monster_type, name)
        VALUES (v_user_id, 'slime', '말랑 슬라임')
        ON CONFLICT (user_id, monster_type) DO NOTHING;

        INSERT INTO monster_dex (user_id, monster_type, name)
        VALUES (v_user_id, 'robot', '태권 로봇')
        ON CONFLICT (user_id, monster_type) DO NOTHING;

        -- 9. 유저 초기 진행 상황 오픈
        INSERT INTO user_progress (user_id, unit_id, status)
        VALUES (v_user_id, v_unit1_id, 'unlocked')
        ON CONFLICT (user_id, unit_id) DO NOTHING;

        RAISE NOTICE 'Seed completed for user: %', v_user_id;
    ELSE
        RAISE NOTICE 'No user found in auth.users. Please sign up in the app first!';
    END IF;
END $$;
