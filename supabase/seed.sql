-- 샘플 데이터 입력 (Unit 5. Motion in Films)
-- 주의: 로컬 테스트 시 user_id를 본인의 계정 UUID나, (SELECT id FROM auth.users LIMIT 1) 와 같은 방식으로 연동해야 할 수 있습니다.
-- 현재는 테스트 편의를 위해 임의의 000 UUID로 가정하거나 주석 형태/직접 입력용 구문으로 추가합니다.

DO $$
DECLARE
    v_user_id UUID;
    v_book_id UUID := '11111111-1111-1111-1111-111111111111';
    v_unit_id UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- 만약 로그인한 계정이 있다면 첫 번째 유저 아이디를 가져옵니다.
    -- (auth.users 가 비어있다면 에러가 날 수 있으므로 주의!)
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    -- 유저가 없다면 더미 계정을 추가하는 로직이 필요하나 편의상 진행하지 않습니다.
    -- v_user_id := '본인의-SUPABASE-계정-UUID'; 에 직접 넣어 쓰세요.
    
    IF v_user_id IS NOT NULL THEN
        INSERT INTO books (id, user_id, title, description, is_preset, sort_order)
        VALUES (v_book_id, v_user_id, 'Unit 5. Motion in Films', '영화 속 움직임과 관련된 단어 모음', TRUE, 1)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO units (id, book_id, title, sort_order)
        VALUES (v_unit_id, v_book_id, 'Motion in Films - 단어 30개', 1)
        ON CONFLICT (id) DO NOTHING;

        -- 기존 테스트 데이터를 지우고 다시 넣을 수도 있음
        -- DELETE FROM words WHERE unit_id = v_unit_id;

        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit_id, 'illusion', '환상, 환영', '🔮', 1),
        (v_unit_id, 'process', '처리하다', '⚙️', 2),
        (v_unit_id, 'separate', '분리된', '💔', 3),
        (v_unit_id, 'present', '보여주다', '📺', 4),
        (v_unit_id, 'continuous', '계속되는', '🔄', 5),
        (v_unit_id, 'bind', '묶다', '🔗', 6),
        (v_unit_id, 'still', '움직이지 않는', '🛑', 7),
        (v_unit_id, 'sequence', '연속적인 사건들, 순서', '🎬', 8),
        (v_unit_id, 'blend', '섞이다', '🌪️', 9),
        (v_unit_id, 'stack', '무더기[더미], 뭉치', '📚', 10),
        (v_unit_id, 'smoothly', '부드럽게', '🌊', 11),
        (v_unit_id, 'generally', '일반적으로', '🌎', 12),
        (v_unit_id, 'suppose', '가정하다, 상상하다', '🤔', 13),
        (v_unit_id, 'appear', '나타나다', '✨', 14),
        (v_unit_id, 'effective', '효과적인', '✅', 15),
        (v_unit_id, 'grab', '잡다', '✊', 16),
        (v_unit_id, 'prefer', '선호하다', '👍', 17),
        (v_unit_id, 'slightly', '약간', '🤏', 18),
        (v_unit_id, 'reach', '~에 이르다', '🧗', 19),
        (v_unit_id, 'optical', '시각적인', '👁️', 20),
        (v_unit_id, 'occur', '발생하다', '💥', 21),
        (v_unit_id, 'expect', '예상하다', '🔮', 22),
        (v_unit_id, 'horizontal', '수평의', '➖', 23),
        (v_unit_id, 'straight', '똑바로', '📏', 24),
        (v_unit_id, 'slanted', '비스듬한', '📐', 25),
        (v_unit_id, 'staple', '(스테이플러의) 철사 침', '📎', 26),
        (v_unit_id, 'empty', '비어 있는', '🕳️', 27),
        (v_unit_id, 'animated', '동영상으로 된', '🏃', 28),
        (v_unit_id, 'create', '자아내다, 불러일으키다', '🪄', 29),
        (v_unit_id, 'sheet', '(종이) 한 장, 시트', '📄', 30);
    END IF;
END $$;
