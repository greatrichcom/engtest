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
    v_unit4_id UUID := '55555555-5555-5555-5555-555555555555'; -- Unit 4
    v_unit5_id UUID := '66666666-6666-6666-6666-666666666666'; -- Unit 5
    v_unit6_id UUID := '77777777-7777-7777-7777-777777777777'; -- Unit 6
    v_unit7_id UUID := '88888888-8888-8888-8888-888888888888'; -- Unit 7
    v_unit8_id UUID := '99999999-9999-9999-9999-999999999999'; -- Unit 8
    v_unit9_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- Unit 9
    v_unit10_id UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'; -- Unit 10
    v_unit11_id UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc'; -- Unit 11
    v_unit12_id UUID := 'dddddddd-dddd-dddd-dddd-dddddddddddd'; -- Unit 12
    v_unit13_id UUID := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'; -- Unit 13
    v_unit14_id UUID := 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1'; -- Unit 14
    v_unit15_id UUID := 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2'; -- Unit 15
    v_unit16_id UUID := 'f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3'; -- Unit 16
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

        -- 5-1. 유닛 4: Biometrics (Monster: Robot)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit4_id, v_book_id, 'Unit 4. Biometrics', 4, 'robot')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-2. 유닛 5: Motion in Films (Monster: Slime)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit5_id, v_book_id, 'Unit 5. Motion in Films', 5, 'slime')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-3. 유닛 6: Special Effects in Movies (Monster: Dragon)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit6_id, v_book_id, 'Unit 6. Special Effects', 6, 'dragon')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-4. 유닛 7: Inventing the Movie Theater (Monster: Ghost)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit7_id, v_book_id, 'Unit 7. Movie Theater', 7, 'ghost')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-5. 유닛 8: Sound Creators in Films (Monster: Robot)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit8_id, v_book_id, 'Unit 8. Sound Creators', 8, 'robot')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-6. 유닛 9: All about Triangles (Monster: Slime)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit9_id, v_book_id, 'Unit 9. All About Triangles', 9, 'slime')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-7. 유닛 10: Triangular Composition (Monster: Ghost)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit10_id, v_book_id, 'Unit 10. Triangular Composition', 10, 'ghost')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-8. 유닛 11: Deltas (Monster: Dragon)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit11_id, v_book_id, 'Unit 11. Deltas', 11, 'dragon')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-9. 유닛 12: Thales and His Triangles (Monster: Robot)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit12_id, v_book_id, 'Unit 12. Thales and Triangles', 12, 'robot')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-10. 유닛 13: Earth''s Closest Neighbor (Monster: Slime)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit13_id, v_book_id, 'Unit 13. Earth''s Neighbor', 13, 'slime')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-11. 유닛 14: Beethoven''s "Moonlight" Sonata (Monster: Ghost)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit14_id, v_book_id, 'Unit 14. Beethoven''s Sonata', 14, 'ghost')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-12. 유닛 15: Lunar Eclipses (Monster: Slime)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit15_id, v_book_id, 'Unit 15. Lunar Eclipses', 15, 'slime')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 5-13. 유닛 16: The Moon and Sixpence (Monster: Dragon)
        INSERT INTO units (id, book_id, title, sort_order, monster_type)
        VALUES (v_unit16_id, v_book_id, 'Unit 16. The Moon and Sixpence', 16, 'dragon')
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
        (v_unit1_id, 'part', '부분', '🧩', 7),
        (v_unit1_id, 'join', '연결하다', '🔗', 8),
        (v_unit1_id, 'frame', '틀, 뼈대', '🖼️', 9),
        (v_unit1_id, 'normal', '보통의', '⚪', 10),
        (v_unit1_id, 'happen', '일어나다', '⚡', 11),
        (v_unit1_id, 'hard', '딱딱한', '💎', 12),
        (v_unit1_id, 'grow', '자라다', '🌱', 13),
        (v_unit1_id, 'shape', '모양', '📐', 14),
        (v_unit1_id, 'protect', '보호하다', '🛡️', 15),
        (v_unit1_id, 'however', '하지만, 그러나', '🔄', 16),
        (v_unit1_id, 'length', '길이', '📏', 17),
        (v_unit1_id, 'apart', '떨어져', '↔️', 18),
        (v_unit1_id, 'weight', '무게', '⚖️', 19),
        (v_unit1_id, 'strong', '강한', '💥', 20),
        (v_unit1_id, 'element', '성분, 요소', '🧪', 21),
        (v_unit1_id, 'bone', '뼈', '🦴', 22),
        (v_unit1_id, 'muscle', '근육', '💪', 23),
        (v_unit1_id, 'fat', '지방', '🧈', 24),
        (v_unit1_id, 'take up', '차지하다', '📦', 25),
        (v_unit1_id, 'fiber', '섬유질', '🧶', 26),
        (v_unit1_id, 'flexible', '유연한', '🤸', 27),
        (v_unit1_id, 'warm', '따뜻한', '☀️', 28),
        (v_unit1_id, 'absorb', '흡수하다', '🧽', 29),
        (v_unit1_id, 'structure', '구조', '🏢', 30);

        -- 7. 단어 데이터 (Unit 2)
        DELETE FROM words WHERE unit_id = v_unit2_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit2_id, 'provide', '제공하다', '🎁', 1),
        (v_unit2_id, 'misunderstanding', '오해', '❓', 2),
        (v_unit2_id, 'spend', '(돈, 시간을) 쓰다', '💸', 3),
        (v_unit2_id, 'factor', '요인', '🧩', 4),
        (v_unit2_id, 'gender', '성별', '🚻', 5),
        (v_unit2_id, 'influence', '영향을 미치다', '🌊', 6),
        (v_unit2_id, 'constantly', '끊임없이', '🔄', 7),
        (v_unit2_id, 'initially', '처음에', '1️⃣', 8),
        (v_unit2_id, 'rate', '속도', '🏎️', 9),
        (v_unit2_id, 'exercise', '운동하다', '🏃', 10),
        (v_unit2_id, 'work', '작동하다', '⚙️', 11),
        (v_unit2_id, 'unit', '단위', '🔢', 12),
        (v_unit2_id, 'measure', '측정하다', '📏', 13),
        (v_unit2_id, 'gain', '얻게 되다', '📈', 14),
        (v_unit2_id, 'amount', '총액, 액수', '💰', 15),
        (v_unit2_id, 'lifestyle', '생활 방식', '🛋️', 16),
        (v_unit2_id, 'burn', '태우다', '🔥', 17),
        (v_unit2_id, 'active', '활동적인', '⚡', 18),
        (v_unit2_id, 'athlete', '선수', '🏅', 19),
        (v_unit2_id, 'information', '정보', 'ℹ️', 20),
        (v_unit2_id, 'nutrition', '영양', '🥦', 21),
        (v_unit2_id, 'individual', '1인용(분)의', '👤', 22),
        (v_unit2_id, 'located', '~에 위치한', '📍', 23),
        (v_unit2_id, 'common', '흔한', '🟢', 24),
        (v_unit2_id, 'temperature', '온도', '🌡️', 25),
        (v_unit2_id, 'vary', '다르다', '↕️', 26),
        (v_unit2_id, 'teenager', '십대', '🧑‍🎓', 27),
        (v_unit2_id, 'raise', '올리다', '⬆️', 28),
        (v_unit2_id, 'daily', '일일의', '📅', 29),
        (v_unit2_id, 'requirement', '필요(조건)', '📜', 30);

        -- 8. 단어 데이터 (Unit 3)
        DELETE FROM words WHERE unit_id = v_unit3_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit3_id, 'period', '시기', '📅', 1),
        (v_unit3_id, 'interest', '관심', '💡', 2),
        (v_unit3_id, 'society', '사회', '🤝', 3),
        (v_unit3_id, 'realistic', '현실적인', '📸', 4),
        (v_unit3_id, 'hire', '고용하다', '📝', 5),
        (v_unit3_id, 'dissect', '해부하다', '🔪', 6),
        (v_unit3_id, 'regard', '~을 ~로 여기다', '🧐', 7),
        (v_unit3_id, 'in addition', '게다가', '➕', 8),
        (v_unit3_id, 'think highly of', '중요시하다', '👑', 9),
        (v_unit3_id, 'lifelike', '실물과 같은', '👤', 10),
        (v_unit3_id, 'brilliant', '훌륭한', '✨', 11),
        (v_unit3_id, 'common', '공동의', '👥', 12),
        (v_unit3_id, 'ordinary', '평범한', '👤', 13),
        (v_unit3_id, 'nearly', '거의', '🤏', 14),
        (v_unit3_id, 'attention', '주의, 주목', '⚠️', 15),
        (v_unit3_id, 'natural', '자연스러운', '🌿', 16),
        (v_unit3_id, 'observe', '관찰하다', '🔍', 17),
        (v_unit3_id, 'closely', '자세히', '🔎', 18),
        (v_unit3_id, 'masterpiece', '명작', '🎨', 19),
        (v_unit3_id, 'thought', '생각', '💭', 20),
        (v_unit3_id, 'various', '다양한', '🌈', 21),
        (v_unit3_id, 'serious', '진지한', '😐', 22),
        (v_unit3_id, 'theme', '주제', '🎯', 23),
        (v_unit3_id, 'express', '표현하다', '🗣️', 24),
        (v_unit3_id, 'compare', '비교하다', '⚖️', 25),
        (v_unit3_id, 'holy', '신성한', '👼', 26),
        (v_unit3_id, 'posture', '자세', '🤸', 27),
        (v_unit3_id, 'lack', '~이 부족하다', '❌', 28),
        (v_unit3_id, 'disease', '질병', '🤒', 29),
        (v_unit3_id, 'as a result', '결과적으로', '🏁', 30);
        
        -- 9. 단어 데이터 (Unit 4)
        DELETE FROM words WHERE unit_id = v_unit4_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit4_id, 'fingerprint', '지문', '☝️', 1),
        (v_unit4_id, 'technology', '기술', '💻', 2),
        (v_unit4_id, 'identify', '확인하다', '🆔', 3),
        (v_unit4_id, 'unique', '유일무이한', '🌟', 4),
        (v_unit4_id, 'secure', '안전한', '🔒', 5),
        (v_unit4_id, 'convenient', '편리한', '👌', 6),
        (v_unit4_id, 'commonly', '흔히', '🔄', 7),
        (v_unit4_id, 'save', '저장하다', '💾', 8),
        (v_unit4_id, 'match', '일치하다', '✅', 9),
        (v_unit4_id, 'accuracy', '정확, 정확도', '🎯', 10),
        (v_unit4_id, 'simply', '간단히', '✨', 11),
        (v_unit4_id, 'unlock', '열다', '🔓', 12),
        (v_unit4_id, 'amazing', '놀라운', '😲', 13),
        (v_unit4_id, 'feature', '특징, 특성', '📋', 14),
        (v_unit4_id, 'prove', '증명하다', '⚖️', 15),
        (v_unit4_id, 'carry', '나르다', '📦', 16),
        (v_unit4_id, 'improve', '개선되다', '📈', 17),
        (v_unit4_id, 'recognition', '인식', '👤', 18),
        (v_unit4_id, 'rate', '비율', '📊', 19),
        (v_unit4_id, 'below', '아래에', '⬇️', 20),
        (v_unit4_id, 'physical', '신체의', '🚶', 21),
        (v_unit4_id, 'identity', '신분', '🪪', 22),
        (v_unit4_id, 'confirm', '확인하다', '🆗', 23),
        (v_unit4_id, 'scan', '훑어보다', '🔍', 24),
        (v_unit4_id, 'frequent', '잦은', '📅', 25),
        (v_unit4_id, 'immigration', '출입국 관리소', '🛂', 26),
        (v_unit4_id, 'password', '암호', '🔑', 27),
        (v_unit4_id, 'nevertheless', '그럼에도 불구하고', '🔄', 28),
        (v_unit4_id, 'memorize', '기억하다', '🧠', 29),
        (v_unit4_id, 'popular', '인기 있는', '🔥', 30);

        -- 10. 단어 데이터 (Unit 5)
        DELETE FROM words WHERE unit_id = v_unit5_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit5_id, 'illusion', '환상, 환영', '🪄', 1),
        (v_unit5_id, 'process', '처리하다', '⚙️', 2),
        (v_unit5_id, 'separate', '분리된', '✂️', 3),
        (v_unit5_id, 'present', '보여주다', '🎁', 4),
        (v_unit5_id, 'continuous', '계속되는', '🔄', 5),
        (v_unit5_id, 'bind', '묶다', '🧶', 6),
        (v_unit5_id, 'still', '움직이지 않는', '🛑', 7),
        (v_unit5_id, 'sequence', '순서', '🔢', 8),
        (v_unit5_id, 'blend', '섞이다', '🌀', 9),
        (v_unit5_id, 'stack', '무더기', '📚', 10),
        (v_unit5_id, 'smoothly', '부드럽게', '🧈', 11),
        (v_unit5_id, 'generally', '일반적으로', '🌍', 12),
        (v_unit5_id, 'suppose', '가정하다', '🤔', 13),
        (v_unit5_id, 'appear', '나타나다', '✨', 14),
        (v_unit5_id, 'effective', '효과적인', '✅', 15),
        (v_unit5_id, 'grab', '잡다', '✊', 16),
        (v_unit5_id, 'prefer', '선호하다', '❤️', 17),
        (v_unit5_id, 'slightly', '약간', '🤏', 18),
        (v_unit5_id, 'reach', '이르다', '🏁', 19),
        (v_unit5_id, 'optical', '시각적인', '👁️', 20),
        (v_unit5_id, 'occur', '발생하다', '💥', 21),
        (v_unit5_id, 'expect', '예상하다', '💭', 22),
        (v_unit5_id, 'horizontal', '수평의', '↔️', 23),
        (v_unit5_id, 'straight', '똑바로', '⬆️', 24),
        (v_unit5_id, 'slanted', '비스듬한', '📐', 25),
        (v_unit5_id, 'staple', '철사 침', '🖇️', 26),
        (v_unit5_id, 'empty', '비어 있는', '🫙', 27),
        (v_unit5_id, 'animated', '동영상으로 된', '🎬', 28),
        (v_unit5_id, 'create', '자아내다', '🎨', 29),
        (v_unit5_id, 'sheet', '시트', '📄', 30);

        -- 11. 단어 데이터 (Unit 6)
        DELETE FROM words WHERE unit_id = v_unit6_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit6_id, 'destroy', '파괴하다', '💣', 1),
        (v_unit6_id, 'vehicle', '탈 것', '🚗', 2),
        (v_unit6_id, 'alternative', '대안', '🔄', 3),
        (v_unit6_id, 'figure', '형상', '👤', 4),
        (v_unit6_id, 'require', '요구하다', '📜', 5),
        (v_unit6_id, 'whole', '전체의', '🌎', 6),
        (v_unit6_id, 'option', '선택', '🔘', 7),
        (v_unit6_id, 'imaginary', '가상적인', '🦄', 8),
        (v_unit6_id, 'technique', '기술', '🔧', 9),
        (v_unit6_id, 'fantasy', '상상', '🧚', 10),
        (v_unit6_id, 'miniature', '축소 모형', '🏎️', 11),
        (v_unit6_id, 'famous', '유명한', '🌟', 12),
        (v_unit6_id, 'background', '배경', '🖼️', 13),
        (v_unit6_id, 'soldier', '군인', '🪖', 14),
        (v_unit6_id, 'shoot', '촬영하다', '📸', 15),
        (v_unit6_id, 'sequential', '순차적인', '1️⃣2️⃣3️⃣', 16),
        (v_unit6_id, 'dozen', '십여 개', '📦', 17),
        (v_unit6_id, 'stair', '계단', '🪜', 18),
        (v_unit6_id, 'reality', '현실', '🏙️', 19),
        (v_unit6_id, 'movie director', '영화감독', '🎬', 20),
        (v_unit6_id, 'trick', '속임수', '🤡', 21),
        (v_unit6_id, 'special effect', '특수 효과', '✨', 22),
        (v_unit6_id, 'fake', '가짜의', '🚫', 23),
        (v_unit6_id, 'explosion', '폭발', '💥', 24),
        (v_unit6_id, 'accident', '사고', '🚗💥', 25),
        (v_unit6_id, 'injury', '상처', '🩹', 26),
        (v_unit6_id, 'dye', '염료', '🎨', 27),
        (v_unit6_id, 'detailed', '상세한', '🕵️', 28),
        (v_unit6_id, 'puppet', '꼭두각시', '🎎', 29),
        (v_unit6_id, 'put together', '조립하다', '🧩', 30);

        -- 12. 단어 데이터 (Unit 7)
        DELETE FROM words WHERE unit_id = v_unit7_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit7_id, 'experience', '경험', '🧗', 1),
        (v_unit7_id, 'equipment', '장비', '🛠️', 2),
        (v_unit7_id, 'encourage', '격려하다', '👏', 3),
        (v_unit7_id, 'succeed', '성공하다', '🏆', 4),
        (v_unit7_id, 'compact', '소형의', '🤏', 5),
        (v_unit7_id, 'weigh', '무게가 ~이다', '⚖️', 6),
        (v_unit7_id, 'run', '운영하다', '🏢', 7),
        (v_unit7_id, 'function', '기능', '⚙️', 8),
        (v_unit7_id, 'public', '대중', '👥', 9),
        (v_unit7_id, 'enjoy', '즐기다', '🥳', 10),
        (v_unit7_id, 'theater', '영화관', '🍿', 11),
        (v_unit7_id, 'produce', '생산하다', '🏭', 12),
        (v_unit7_id, 'photography', '사진(술)', '📷', 13),
        (v_unit7_id, 'hole', '구멍', '🕳️', 14),
        (v_unit7_id, 'wonderful', '아주 멋진', '🤩', 15),
        (v_unit7_id, 'projector', '영상기', '📽️', 16),
        (v_unit7_id, 'consist (of)', '이루어져 있다', '🧩', 17),
        (v_unit7_id, 'leave', '떠나다', '🚶', 18),
        (v_unit7_id, 'history', '역사', '📚', 19),
        (v_unit7_id, 'earlier', '먼저', '⬅️', 20),
        (v_unit7_id, 'invention', '발명품', '💡', 21),
        (v_unit7_id, 'current', '현재의', '⌚', 22),
        (v_unit7_id, 'device', '장치', '📱', 23),
        (v_unit7_id, 'useful', '유용한', '🛠️', 24),
        (v_unit7_id, 'thanks to', '덕분에', '🙏', 25),
        (v_unit7_id, 'carry around', '지니고 다니다', '🎒', 26),
        (v_unit7_id, 'easily', '쉽게', '✅', 27),
        (v_unit7_id, 'weakness', '약점', '🩹', 28),
        (v_unit7_id, 'break', '고장 나다', '🛠️❌', 29),
        (v_unit7_id, 'together', '함께', '👫', 30);

        -- 13. 단어 데이터 (Unit 8)
        DELETE FROM words WHERE unit_id = v_unit8_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit8_id, 'imagine', '상상하다', '💭', 1),
        (v_unit8_id, 'faucet', '수도꼭지', '🚰', 2),
        (v_unit8_id, 'advanced', '선진의', '🚀', 3),
        (v_unit8_id, 'exist', '존재하다', '👻', 4),
        (v_unit8_id, 'material', '재료', '🧶', 5),
        (v_unit8_id, 'squish', '으깨다', '🤏', 6),
        (v_unit8_id, 'strange', '이상한', '👽', 7),
        (v_unit8_id, 'completely', '완전히', '💯', 8),
        (v_unit8_id, 'right', '옳은', '✅', 9),
        (v_unit8_id, 'audio', '녹음의', '🔊', 10),
        (v_unit8_id, 'modern', '현대의', '🏙️', 11),
        (v_unit8_id, 'impossible', '불가능한', '🚫', 12),
        (v_unit8_id, 'record', '기록하다', '🎙️', 13),
        (v_unit8_id, 'check', '확인하다', '🔍', 14),
        (v_unit8_id, 'gather', '모으다', '🧺', 15),
        (v_unit8_id, 'variety', '여러 가지', '🌈', 16),
        (v_unit8_id, 'necessary', '필요한', '🆘', 17),
        (v_unit8_id, 'hatch', '부화하다', '🐣', 18),
        (v_unit8_id, 'sci-fi movie', '과학 영화', '🛰️', 19),
        (v_unit8_id, 'even if', '일지라도', '🔄', 20),
        (v_unit8_id, 'invent', '만들다', '🛠️', 21),
        (v_unit8_id, 'involve', '참여시키다', '👥', 22),
        (v_unit8_id, 'production', '제작', '🎬', 23),
        (v_unit8_id, 'post', '게시하다', '✉️', 24),
        (v_unit8_id, 'supervisor', '감독', '👮', 25),
        (v_unit8_id, 'script', '대본', '📄', 26),
        (v_unit8_id, 'responsible', '책임 있는', '🛡️', 27),
        (v_unit8_id, 'in charge of', '담당하는', '👮', 28),
        (v_unit8_id, 'representation', '대표', '🚩', 29),
        (v_unit8_id, 'creator', '창조자', '🧑‍🎨', 30);

        -- 13-1. 단어 데이터 (Unit 9)
        DELETE FROM words WHERE unit_id = v_unit9_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit9_id, 'define', '정의하다', '📖', 1),
        (v_unit9_id, 'divide', '나누다', '➗', 2),
        (v_unit9_id, 'split', '나뉘다', '✂️', 3),
        (v_unit9_id, 'property', '속성, 특성', '📋', 4),
        (v_unit9_id, 'opposite', '건너편의', '↔️', 5),
        (v_unit9_id, 'label', '표(상표)', '🏷️', 6),
        (v_unit9_id, 'simple', '단순한', '✨', 7),
        (v_unit9_id, 'special', '특별한', '🌟', 8),
        (v_unit9_id, 'relationship', '관계', '🤝', 9),
        (v_unit9_id, 'sign', '표지판', '🪧', 10),
        (v_unit9_id, 'few', '적은', '🤏', 11),
        (v_unit9_id, 'rectangle', '직사각형', '▭', 12),
        (v_unit9_id, 'choose', '선택하다', '🔘', 13),
        (v_unit9_id, 'result', '결과', '🏁', 14),
        (v_unit9_id, 'sum', '총합', '➕', 15),
        (v_unit9_id, 'form', '형성하다', '🧱', 16),
        (v_unit9_id, 'characteristic', '특징', '🆔', 17),
        (v_unit9_id, 'polygon', '다각형', '💠', 18),
        (v_unit9_id, 'name', '이름을 짓다', '🏷️', 19),
        (v_unit9_id, 'angle', '각도, 기울기', '📐', 20),
        (v_unit9_id, 'distribute', '분배하다', '📫', 21),
        (v_unit9_id, 'evenly', '고르게', '⚖️', 22),
        (v_unit9_id, 'pentagon', '오각형', '⬠', 23),
        (v_unit9_id, 'pitcher', '투수', '⚾', 24),
        (v_unit9_id, 'umpire', '심판', '👮', 25),
        (v_unit9_id, 'hexagon', '6각형', '⬡', 26),
        (v_unit9_id, 'space', '공간', '🌌', 27),
        (v_unit9_id, 'third', '세 번째의', '3️⃣', 28),
        (v_unit9_id, 'out of', '~의 밖에서', '🚪', 29),
        (v_unit9_id, 'another', '또 하나의', '➕1️⃣', 30);

        -- 13-2. 단어 데이터 (Unit 10)
        DELETE FROM words WHERE unit_id = v_unit10_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit10_id, 'place', '설치[배치]하다', '📍', 1),
        (v_unit10_id, 'composition', '구성', '🧩', 2),
        (v_unit10_id, 'organize', '정리하다', '🗂️', 3),
        (v_unit10_id, 'stability', '안정성', '⚖️', 4),
        (v_unit10_id, 'foundation', '토대', '🏗️', 5),
        (v_unit10_id, 'in particular', '특히', '💡', 6),
        (v_unit10_id, 'draw', '끌어당기다', '🧲', 7),
        (v_unit10_id, 'structured', '구조화 된', '🧱', 8),
        (v_unit10_id, 'important', '중요한', '⚠️', 9),
        (v_unit10_id, 'randomly', '무작위로', '🎲', 10),
        (v_unit10_id, 'reason', '이유', '❓', 11),
        (v_unit10_id, 'be fond of', '~을 좋아하다', '❤️', 12),
        (v_unit10_id, 'main', '주된', '🌟', 13),
        (v_unit10_id, 'naturally', '자연스럽게', '🌿', 14),
        (v_unit10_id, 'central', '중앙의', '🎯', 15),
        (v_unit10_id, 'harmony', '조화', '☯️', 16),
        (v_unit10_id, 'viewer', '보는 사람', '👀', 17),
        (v_unit10_id, 'heroine', '여자 주인공', '🦸‍♀️', 18),
        (v_unit10_id, 'powerful', '강력한', '💪', 19),
        (v_unit10_id, 'object', '사물, 대상', '📦', 20),
        (v_unit10_id, 'specific', '특정한', '🎯', 21),
        (v_unit10_id, 'arrange', '배열하다', '📏', 22),
        (v_unit10_id, 'triangular', '삼각형의', '📐', 23),
        (v_unit10_id, 'mean', '의미하다', '📖', 24),
        (v_unit10_id, 'area', '부분, 영역', '🗺️', 25),
        (v_unit10_id, 'well-balanced', '균형이 잡힌', '⚖️', 26),
        (v_unit10_id, 'clearly', '명확하게', '🔍', 27),
        (v_unit10_id, 'right away', '즉시', '⚡', 28),
        (v_unit10_id, 'artwork', '작품', '🎨', 29),
        (v_unit10_id, 'arrangement', '준비, 배치', '🛋️', 30);

        -- 13-3. 단어 데이터 (Unit 11)
        DELETE FROM words WHERE unit_id = v_unit11_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit11_id, 'surrounding', '인근의', '🏠', 1),
        (v_unit11_id, 'purify', '정화하다', '💧', 2),
        (v_unit11_id, 'nutrient', '영양분', '🥦', 3),
        (v_unit11_id, 'crop', '작물', '🌾', 4),
        (v_unit11_id, 'harvest', '수확하다', '🚜', 5),
        (v_unit11_id, 'species', '종', '🧬', 6),
        (v_unit11_id, 'mouth', '입[입구]', '🕳️', 7),
        (v_unit11_id, 'benefit', '혜택', '🎁', 8),
        (v_unit11_id, 'habitat', '서식지', '🏡', 9),
        (v_unit11_id, 'region', '지방, 지역', '🗺️', 10),
        (v_unit11_id, 'flow', '흐르다', '🌊', 11),
        (v_unit11_id, 'near', '가까운', '📍', 12),
        (v_unit11_id, 'build up', '점점 많아지다', '📈', 13),
        (v_unit11_id, 'filter', '여과하다', '☕', 14),
        (v_unit11_id, 'contain', '포함하다', '📦', 15),
        (v_unit11_id, 'wildlife', '야생 동물', '🦁', 16),
        (v_unit11_id, 'diverse', '다양한', '🌈', 17),
        (v_unit11_id, 'numerous', '많은', '🔢', 18),
        (v_unit11_id, 'name after', '~의 이름을 따서 이름 짓다', '🏷️', 19),
        (v_unit11_id, 'delta', '삼각주', '🔺', 20),
        (v_unit11_id, 'mixture', '혼합물', '🧪', 21),
        (v_unit11_id, 'dirt', '흙, 먼지', '💩', 22),
        (v_unit11_id, 'rock', '바위', '🪨', 23),
        (v_unit11_id, 'sediment', '퇴적물', '⏳', 24),
        (v_unit11_id, 'oyster', '굴', '🦪', 25),
        (v_unit11_id, 'source of water', '수원', '💧', 26),
        (v_unit11_id, 'living things', '생명체', '🌱', 27),
        (v_unit11_id, 'major', '주요한', '🌟', 28),
        (v_unit11_id, 'amount', '양', '💰', 29),
        (v_unit11_id, 'flow through', '~을 통과해 흐르다', '➰', 30);

        -- 13-4. 단어 데이터 (Unit 12)
        DELETE FROM words WHERE unit_id = v_unit12_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit12_id, 'talented', '재능 있는', '🌟', 1),
        (v_unit12_id, 'challenging', '도전적인', '🧗', 2),
        (v_unit12_id, 'doubt', '의심하다', '🤨', 3),
        (v_unit12_id, 'principle', '원리', '⚙️', 4),
        (v_unit12_id, 'proportion', '비율', '📊', 5),
        (v_unit12_id, 'solve', '해결하다', '🧩', 6),
        (v_unit12_id, 'confident', '자신감 있는', '😎', 7),
        (v_unit12_id, 'directly', '곧장, 똑바로', '⬆️', 8),
        (v_unit12_id, 'figure out', '알아내다', '💡', 9),
        (v_unit12_id, 'ancient', '고대의', '🏺', 10),
        (v_unit12_id, 'philosopher', '철학자', '🧔', 11),
        (v_unit12_id, 'law', '법', '⚖️', 12),
        (v_unit12_id, 'discover', '발견하다', '🔍', 13),
        (v_unit12_id, 'height', '높이', '📏', 14),
        (v_unit12_id, 'curious', '궁금한', '🤔', 15),
        (v_unit12_id, 'ability', '능력', '💪', 16),
        (v_unit12_id, 'similar', '비슷한', '👯', 17),
        (v_unit12_id, 'equal', '동일한', '🟰', 18),
        (v_unit12_id, 'crowd', '사람들, 군중', '👨‍👩‍👧‍👦', 19),
        (v_unit12_id, 'mathematician', '수학자', '🧮', 20),
        (v_unit12_id, 'incredibly', '믿기 힘들게도', '😲', 21),
        (v_unit12_id, 'knowledge', '지식', '📚', 22),
        (v_unit12_id, 'stick', '막대, 나뭇가지', '🏼', 23),
        (v_unit12_id, 'shadow', '그림자', '👤', 24),
        (v_unit12_id, 'amaze', '놀라게 하다', '🤩', 25),
        (v_unit12_id, 'correct', '맞는', '✅', 26),
        (v_unit12_id, 'around', '대략', '⭕', 27),
        (v_unit12_id, 'west', '서쪽', '⬅️', 28),
        (v_unit12_id, 'equally', '동등하게', '⚖️', 29),
        (v_unit12_id, 'stuck', '움직일 수 없는', '🛑', 30);

        -- 13-5. 단어 데이터 (Unit 13)
        DELETE FROM words WHERE unit_id = v_unit13_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit13_id, 'neighbor', '이웃', '🏘️', 1),
        (v_unit13_id, 'revolve', '돌다', '🔄', 2),
        (v_unit13_id, 'pace', '속도', '🏎️', 3),
        (v_unit13_id, 'glow', '빛나다', '✨', 4),
        (v_unit13_id, 'reflect', '반사하다', '🪞', 5),
        (v_unit13_id, 'face', '~을 마주보다', '👀', 6),
        (v_unit13_id, 'twinkle', '반짝거리다', '⭐', 7),
        (v_unit13_id, 'depend on', '~에 달려 있다', '🔗', 8),
        (v_unit13_id, 'last', '계속되다', '⏳', 9),
        (v_unit13_id, 'actually', '실제로', '💯', 10),
        (v_unit13_id, 'close', '가까운', '📍', 11),
        (v_unit13_id, 'locate', '두다', '📍', 12),
        (v_unit13_id, 'comparison', '비교', '⚖️', 13),
        (v_unit13_id, 'rotate', '회전하다', '🌀', 14),
        (v_unit13_id, 'spin', '돌다', '🌀', 15),
        (v_unit13_id, 'degree', '도', '🌡️', 16),
        (v_unit13_id, 'visible', '보이는', '👁️', 17),
        (v_unit13_id, 'cycle', '순환, 주기', '🔄', 18),
        (v_unit13_id, 'Mars', '화성', '🔴', 19),
        (v_unit13_id, 'axis', '중심축', '📍', 20),
        (v_unit13_id, 'side', '측면', '⏹️', 21),
        (v_unit13_id, 'seem', '~인 것처럼 보이다', '🧐', 22),
        (v_unit13_id, 'on one''s own', '스스로', '👤', 23),
        (v_unit13_id, 'rather', '오히려', '🔄', 24),
        (v_unit13_id, 'sunlight', '햇빛', '☀️', 25),
        (v_unit13_id, 'less', '더 적은', '➖', 26),
        (v_unit13_id, 'bright', '밝은', '💡', 27),
        (v_unit13_id, 'thus', '따라서', '➡️', 28),
        (v_unit13_id, 'planet', '행성', '🪐', 29),
        (v_unit13_id, 'astronaut', '우주 비행사', '👨‍🚀', 30);

        -- 13-6. 단어 데이터 (Unit 14)
        DELETE FROM words WHERE unit_id = v_unit14_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit14_id, 'dedicate', '바치다', '🙏', 1),
        (v_unit14_id, 'describe', '묘사하다', '📝', 2),
        (v_unit14_id, 'vibrant', '활기찬', '🌈', 3),
        (v_unit14_id, 'inventive', '창의적인', '💡', 4),
        (v_unit14_id, 'innovation', '혁신', '🚀', 5),
        (v_unit14_id, 'adopt', '쓰다, 취하다', '📜', 6),
        (v_unit14_id, 'calm', '침착한', '🧘', 7),
        (v_unit14_id, 'energetic', '활동적인', '⚡', 8),
        (v_unit14_id, 'beloved', '인기 많은, 사랑하는', '❤️', 9),
        (v_unit14_id, 'piece', '작품', '🎨', 10),
        (v_unit14_id, 'manner', '방식', '🔢', 11),
        (v_unit14_id, 'widely', '널리', '🌍', 12),
        (v_unit14_id, 'critic', '비평가', '🧐', 13),
        (v_unit14_id, 'attract', '마음을 끌다', '🧲', 14),
        (v_unit14_id, 'eventually', '결국', '🏁', 15),
        (v_unit14_id, 'remind', '상기시키다', '🔔', 16),
        (v_unit14_id, 'mysterious', '불가사의한', '🕵️', 17),
        (v_unit14_id, 'passionate', '격정적인, 열정적인', '🔥', 18),
        (v_unit14_id, 'lake', '호수', '🌊', 19),
        (v_unit14_id, 'description', '표현, 기술', '📜', 20),
        (v_unit14_id, 'lively', '생기 넘치는', '✨', 21),
        (v_unit14_id, 'composer', '작곡가', '🎼', 22),
        (v_unit14_id, 'innovative', '획기적인', '🚀', 23),
        (v_unit14_id, 'expand', '확장시키다, 넓히다', '↔️', 24),
        (v_unit14_id, 'range', '범위', '📏', 25),
        (v_unit14_id, 'struggle', '투쟁, 분투, 투쟁하다', '✊', 26),
        (v_unit14_id, 'due to', '~때문에', '➡️', 27),
        (v_unit14_id, 'reputation', '평판, 명성', '🌟', 28),
        (v_unit14_id, 'symphony', '교향곡', '🎻', 29),
        (v_unit14_id, 'unfortunately', '불행하게도', '😢', 30);

        -- 13-7. 단어 데이터 (Unit 15)
        DELETE FROM words WHERE unit_id = v_unit15_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit15_id, 'vanish', '사라지다', '🪄', 1),
        (v_unit15_id, 'determine', '알아내다, 밝히다', '💡', 2),
        (v_unit15_id, 'attack', '공격하다', '⚔️', 3),
        (v_unit15_id, 'phenomenon', '현상', '✨', 4),
        (v_unit15_id, '(every) once in a while', '가끔', '⏳', 5),
        (v_unit15_id, 'harm', '해치다', '🩹', 6),
        (v_unit15_id, 'upcoming', '다가오는', '📅', 7),
        (v_unit15_id, 'sight', '광경', '👁️', 8),
        (v_unit15_id, 'magic', '마법', '🪄', 9),
        (v_unit15_id, 'scare away', '쫓아 버리다', '👻', 10),
        (v_unit15_id, 'noise', '소음', '🔊', 11),
        (v_unit15_id, 'hide', '감추다', '🕵️', 12),
        (v_unit15_id, 'during', '~ 동안', '⌛', 13),
        (v_unit15_id, 'arrive', '도착하다', '🏁', 14),
        (v_unit15_id, 'native', '원주민', '🛖', 15),
        (v_unit15_id, 'disappear', '사라지다', '🌫️', 16),
        (v_unit15_id, 'block', '차단하다', '🛑', 17),
        (v_unit15_id, 'lunar eclipse', '월식', '🌑', 18),
        (v_unit15_id, 'loud', '(소리가) 큰', '📢', 19),
        (v_unit15_id, 'demon', '악마', '😈', 20),
        (v_unit15_id, 'fear', '두려움', '😱', 21),
        (v_unit15_id, 'frightened', '겁먹은', '😨', 22),
        (v_unit15_id, 'nowadays', '요즘에는', '⌚', 23),
        (v_unit15_id, 'cause', '야기하다 (일으키다)', '💥', 24),
        (v_unit15_id, 'why not', '~하는 게 어때?', '❓', 25),
        (v_unit15_id, 'pass through', '통과하다', '〰️', 26),
        (v_unit15_id, 'move around', '돌아다니다', '🚶', 27),
        (v_unit15_id, 'earth', '지구', '🌍', 28),
        (v_unit15_id, 'Atlantic ocean', '대서양', '🌊', 29),
        (v_unit15_id, 'slowly', '천천히, 느리게', '🐢', 30);

        -- 13-8. 단어 데이터 (Unit 16)
        DELETE FROM words WHERE unit_id = v_unit16_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit16_id, 'inspire', '영감을 주다', '💡', 1),
        (v_unit16_id, 'abandon', '버리고 떠나다', '🚶', 2),
        (v_unit16_id, 'ignore', '무시하다', '🙈', 3),
        (v_unit16_id, 'devote', '바치다', '🙏', 4),
        (v_unit16_id, 'chase', '뒤쫓다, 추구하다', '🏃', 5),
        (v_unit16_id, 'fascinate', '마음을 사로잡다', '🤩', 6),
        (v_unit16_id, 'release', '공개하다', '📢', 7),
        (v_unit16_id, 'amid', '~으로 에워싸인', '🌫️', 8),
        (v_unit16_id, 'novel', '소설', '📖', 9),
        (v_unit16_id, 'character', '등장인물', '👤', 10),
        (v_unit16_id, 'successful', '성공한', '🏆', 11),
        (v_unit16_id, 'follow', '따라가다', '🚶‍♀️', 12),
        (v_unit16_id, 'care', '상관하다', '🤔', 13),
        (v_unit16_id, 'situation', '상황', '📋', 14),
        (v_unit16_id, 'scenery', '경치', '🖼️', 15),
        (v_unit16_id, 'moment', '순간', '⌚', 16),
        (v_unit16_id, 'symbolic', '상징적인', '🚩', 17),
        (v_unit16_id, 'leave for', '~로 떠나다', '🏁', 18),
        (v_unit16_id, 'passion', '열정', '🔥', 19),
        (v_unit16_id, 'businessman', '사업가', '💼', 20),
        (v_unit16_id, 'novelist', '소설가', '✍️', 21),
        (v_unit16_id, 'be well-known for', '~로 잘 알려지다', '🌟', 22),
        (v_unit16_id, 'bold', '선명한', '✨', 23),
        (v_unit16_id, 'stockbroker', '증권 중개인', '💹', 24),
        (v_unit16_id, 'focus on', '~에 집중하다, 초점을 맞추다', '🎯', 25),
        (v_unit16_id, 'recognized', '인정된, 알려진', '🏅', 26),
        (v_unit16_id, 'get away from', '~에서 도망치다', '🏃💨', 27),
        (v_unit16_id, 'settle', '정착하다', '🏠', 28),
        (v_unit16_id, 'seek', '찾다', '🔍', 29),
        (v_unit16_id, 'title', '제목', '📄', 30);

        -- 14. 초기 몬스터 도감 (슬라임 획득 상태로 시작)
        INSERT INTO monster_dex (user_id, monster_type, name)
        VALUES (v_user_id, 'slime', '말랑 슬라임')
        ON CONFLICT (user_id, monster_type) DO NOTHING;

        INSERT INTO monster_dex (user_id, monster_type, name)
        VALUES (v_user_id, 'robot', '태권 로봇')
        ON CONFLICT (user_id, monster_type) DO NOTHING;
        
        INSERT INTO monster_dex (user_id, monster_type, name)
        VALUES (v_user_id, 'dragon', '화염 드래곤')
        ON CONFLICT (user_id, monster_type) DO NOTHING;

        -- 15. 유저 초기 진행 상황 오픈
        INSERT INTO user_progress (user_id, unit_id, status) VALUES
        (v_user_id, v_unit1_id, 'unlocked'),
        (v_user_id, v_unit2_id, 'unlocked'),
        (v_user_id, v_unit3_id, 'unlocked'),
        (v_user_id, v_unit4_id, 'unlocked'),
        (v_user_id, v_unit5_id, 'unlocked'),
        (v_user_id, v_unit6_id, 'unlocked'),
        (v_user_id, v_unit7_id, 'unlocked'),
        (v_user_id, v_unit8_id, 'unlocked'),
        (v_user_id, v_unit9_id, 'unlocked'),
        (v_user_id, v_unit10_id, 'unlocked'),
        (v_user_id, v_unit11_id, 'unlocked'),
        (v_user_id, v_unit12_id, 'unlocked'),
        (v_user_id, v_unit13_id, 'unlocked'),
        (v_user_id, v_unit14_id, 'unlocked'),
        (v_user_id, v_unit15_id, 'unlocked'),
        (v_user_id, v_unit16_id, 'unlocked')
        ON CONFLICT (user_id, unit_id) DO NOTHING;

        RAISE NOTICE 'Seed completed for user: %', v_user_id;
    ELSE
        RAISE NOTICE 'No user found in auth.users. Please sign up in the app first!';
    END IF;
END $$;
