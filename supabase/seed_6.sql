-- ============================================
-- Zen-Pop 샘플 데이터 시드 (Insight Link 6 - Unit 1 ~ 6)
-- 파일명: seed_6.sql
-- ============================================

DO $$
DECLARE
    v_user_id UUID;
    v_book_id UUID := '66666666-6666-6666-6666-666666666666'; -- Insight Link 6
    v_unit1_id UUID := '6a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a';
    v_unit2_id UUID := '6a2a2a2a-2a2a-2a2a-2a2a-2a2a2a2a2a2a';
    v_unit3_id UUID := '6a3a3a3a-3a3a-3a3a-3a3a-3a3a3a3a3a3a';
    v_unit4_id UUID := '6a4a4a4a-4a2a-4a2a-4a2a-4a2a4a2a4a2a';
    v_unit5_id UUID := '6a5a5a5a-5a2a-5a2a-5a2a-5a2a5a2a5a2a';
    v_unit6_id UUID := '6a6a6a6a-6a2a-6a2a-6a2a-6a2a6a2a6a2a';
    v_unit7_id UUID := '6a7a7a7a-7a2a-7a2a-7a2a-7a2a7a2a7a2a';
    v_unit8_id UUID := '6a8a8a8a-8a2a-8a2a-8a2a-8a2a8a2a8a2a';
    v_unit9_id UUID := '6a9a9a9a-9a2a-9a2a-9a2a-9a2a9a2a9a2a';
    v_unit10_id UUID := '6a101010-102a-102a-1010-102a102a102a';
    v_unit11_id UUID := '6a111111-112a-112a-1111-112a112a112a';
    v_unit12_id UUID := '6a121212-122a-122a-1212-122a122a122a';
    v_unit13_id UUID := '6a131313-132a-132a-1313-132a132a132a';
    v_unit14_id UUID := '6a141414-142a-142a-1414-142a142a142a';
    v_unit15_id UUID := '6a151515-152a-152a-1515-152a152a152a';
    v_unit16_id UUID := '6a161616-162a-162a-1616-162a162a162a';
BEGIN
    -- 유저 아이디 찾기
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    IF v_user_id IS NOT NULL THEN
        -- 1. 새 단어장 추가 (Insight Link 6)
        INSERT INTO books (id, user_id, title, description, is_preset, sort_order)
        VALUES (v_book_id, v_user_id, 'Insight Link 6', 'Insight Link series - Book 6', TRUE, 2)
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

        -- 2. 유닛 정보 추가 (Unit 1 ~ 6)
        INSERT INTO units (id, book_id, title, sort_order, monster_type) VALUES
        (v_unit1_id, v_book_id, 'Unit 1. What Do Plants Eat?', 1, 'slime'),
        (v_unit2_id, v_book_id, 'Unit 2. George Washington Carver', 2, 'robot'),
        (v_unit3_id, v_book_id, 'Unit 3. Fight against Food Waste', 3, 'ghost'),
        (v_unit4_id, v_book_id, 'Unit 4. The Case of Borneo', 4, 'dragon'),
        (v_unit5_id, v_book_id, 'Unit 5. Why Does Wind Blow?', 5, 'slime'),
        (v_unit6_id, v_book_id, 'Unit 6. Wind Farms Going Offshore', 6, 'robot'),
        (v_unit7_id, v_book_id, 'Unit 7. Mobiles: Art in Motion', 7, 'ghost'),
        (v_unit8_id, v_book_id, 'Unit 8. The Origin of the Winds', 8, 'dragon'),
        (v_unit9_id, v_book_id, 'Unit 9. The History of Numerals', 9, 'slime'),
        (v_unit10_id, v_book_id, 'Unit 10. The Curse of the Ninth', 10, 'robot'),
        (v_unit11_id, v_book_id, 'Unit 11. Player Numbers in Sports', 11, 'ghost'),
        (v_unit12_id, v_book_id, 'Unit 12. A Day to Celebrate Pi', 12, 'dragon'),
        (v_unit13_id, v_book_id, 'Unit 13. Our Solar System and Its Planets', 13, 'slime'),
        (v_unit14_id, v_book_id, 'Unit 14. The Tradition of Naming Planets', 14, 'robot'),
        (v_unit15_id, v_book_id, 'Unit 15. The Voyager Golden Records', 15, 'ghost'),
        (v_unit16_id, v_book_id, 'Unit 16. Space Laws', 16, 'dragon')
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, monster_type = EXCLUDED.monster_type;

        -- 3. 유닛 1 단어 데이터
        DELETE FROM words WHERE unit_id = v_unit1_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit1_id, 'survive', '생존하다', '🌿', 1),
        (v_unit1_id, 'suspicious', '의심스러운', '🤨', 2),
        (v_unit1_id, 'conduct', '(활동을) 하다, 지휘하다', '📋', 3),
        (v_unit1_id, 'observation', '관찰', '🧐', 4),
        (v_unit1_id, 'discover', '발견하다', '🔍', 5),
        (v_unit1_id, 'absorb', '흡수하다', '🧽', 6),
        (v_unit1_id, 'stem', '줄기', '🌱', 7),
        (v_unit1_id, 'release', '방출하다', '💨', 8),
        (v_unit1_id, 'whole', '전체의', '⚪', 9),
        (v_unit1_id, 'partially', '부분적으로', '🌓', 10),
        (v_unit1_id, 'research', '연구', '🧪', 11),
        (v_unit1_id, 'dry', '마른', '🌵', 12),
        (v_unit1_id, 'water', '물(을 주다)', '💧', 13),
        (v_unit1_id, 'through', '~을 통해', '🛤️', 14),
        (v_unit1_id, 'process', '과정', '⚙️', 15),
        (v_unit1_id, 'root', '뿌리', '🌳', 16),
        (v_unit1_id, 'wonder', '궁금해하다', '❓', 17),
        (v_unit1_id, 'conclude', '결론을 내리다', '🏁', 18),
        (v_unit1_id, 'essential', '필수적인', '🔑', 19),
        (v_unit1_id, 'create', '창조하다, 만들어내다', '🎨', 20),
        (v_unit1_id, 'plant', '식물, 심다', '🌱', 21),
        (v_unit1_id, 'experiment', '실험', '🧪', 22),
        (v_unit1_id, 'weigh', '무게를 재다', '⚖️', 23),
        (v_unit1_id, 'though', '비록 ~이긴 하지만', '⚠️', 24),
        (v_unit1_id, 'magical', '멋진', '✨', 25),
        (v_unit1_id, 'weight', '무게', '⚖️', 26),
        (v_unit1_id, 'correct', '맞는, 옳은', '✅', 27),
        (v_unit1_id, 'carbon dioxide', '이산화탄소', '☁️', 28),
        (v_unit1_id, 'tiny', '아주 작은', '🐜', 29),
        (v_unit1_id, 'turn A into B', 'A를 B로 바꾸다', '🔄', 30);

        -- 4. 유닛 2 단어 데이터 (George Washington Carver) - *추출 데이터 기반 재입력 필요할 수 있음*
        DELETE FROM words WHERE unit_id = v_unit2_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit2_id, 'slave', '노예', '🔗', 1),
        (v_unit2_id, 'smart', '똑똑한', '🧠', 2),
        (v_unit2_id, 'master', '주인', '👑', 3),
        (v_unit2_id, 'teach', '가르치다', '👨‍🏫', 4),
        (v_unit2_id, 'read', '읽다', '📖', 5),
        (v_unit2_id, 'write', '쓰다', '✍️', 6),
        (v_unit2_id, 'agricultural', '농업의', '🚜', 7),
        (v_unit2_id, 'college', '대학', '🎓', 8),
        (v_unit2_id, 'scientist', '과학자', '🧪', 9),
        (v_unit2_id, 'soil', '흙, 토양', '🌱', 10),
        (v_unit2_id, 'cotton', '면화, 솜', '☁️', 11),
        (v_unit2_id, 'weak', '약한', '📉', 12),
        (v_unit2_id, 'peanut', '땅콩', '🥜', 13),
        (v_unit2_id, 'invent', '발명하다', '💡', 14),
        (v_unit2_id, 'crop', '농작물', '🌾', 15),
        (v_unit2_id, 'healthy', '건강한', '💪', 16),
        (v_unit2_id, 'better', '더 나은', '📈', 17),
        (v_unit2_id, 'way', '방법', '🛤️', 18),
        (v_unit2_id, 'farmer', '농부', '👨‍🌾', 19),
        (v_unit2_id, 'improve', '개선하다', '🆙', 20),
        (v_unit2_id, 'various', '다양한', '🌈', 21),
        (v_unit2_id, 'product', '제품', '📦', 22),
        (v_unit2_id, 'save', '구하다, 저축하다', '🆘', 23),
        (v_unit2_id, 'contribution', '공헌, 기여', '🏆', 24),
        (v_unit2_id, 'respect', '존경하다', '🫡', 25),
        (v_unit2_id, 'famous', '유명한', '🌟', 26),
        (v_unit2_id, 'history', '역사', '📜', 27),
        (v_unit2_id, 'knowledge', '지식', '📚', 28),
        (v_unit2_id, 'struggle', '투쟁하다, 애쓰다', '😫', 29),
        (v_unit2_id, 'opportunity', '기회', '🚪', 30);

        -- 5. 유닛 3 단어 데이터 (Fight against Food Waste)
        DELETE FROM words WHERE unit_id = v_unit3_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit3_id, 'starve', '굶주리다', '🪹', 1),
        (v_unit3_id, 'achievement', '업적', '🏆', 2),
        (v_unit3_id, 'organization', '조직, 단체', '🏢', 3),
        (v_unit3_id, 'post', '게시하다', '✉️', 4),
        (v_unit3_id, 'unidentified', '정체불명의', '❓', 5),
        (v_unit3_id, 'persuade', '설득하다', '🗣️', 6),
        (v_unit3_id, 'quantity', '양, 수량', '⚖️', 7),
        (v_unit3_id, 'discard', '버리다', '🗑️', 8),
        (v_unit3_id, 'cover', '취재하다', '📸', 9),
        (v_unit3_id, 'global', '세계적인', '🌏', 10),
        (v_unit3_id, 'throw away', '버리다', '🗑️', 11),
        (v_unit3_id, 'currently', '현재', '🕙', 12),
        (v_unit3_id, 'shock', '충격을 주다', '⚡', 13),
        (v_unit3_id, 'suggest', '제안하다', '💡', 14),
        (v_unit3_id, 'offer', '제공하다', '🎁', 15),
        (v_unit3_id, 'discount', '할인', '🏷️', 16),
        (v_unit3_id, 'take action', '조치를 취하다', '🎬', 17),
        (v_unit3_id, 'reduce', '줄이다', '📉', 18),
        (v_unit3_id, 'billion', '10억', '💰', 19),
        (v_unit3_id, 'Danish', '덴마크의', '🇩🇰', 20),
        (v_unit3_id, 'despite', '~에도 불구하고', '⚠️', 21),
        (v_unit3_id, 'play a role', '역할을 하다', '🎭', 22),
        (v_unit3_id, 'effective', '효과적인', '✅', 23),
        (v_unit3_id, 'support', '지지, 지지하다', '🤝', 24),
        (v_unit3_id, 'bulk', '(큰) 규모[양]', '📦', 25),
        (v_unit3_id, 'due to', '~때문에', ' कारण', 26),
        (v_unit3_id, 'affect', '영향을 미치다', '🎯', 27),
        (v_unit3_id, 'appearance', '겉모습, 외관', '🎭', 28),
        (v_unit3_id, 'encourage', '부추기다, 조장하다', '📢', 29),
        (v_unit3_id, 'dump', '버리다', '🗑️', 30);

        -- 6. 유닛 4 단어 데이터 (The Case of Borneo)
        DELETE FROM words WHERE unit_id = v_unit4_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit4_id, 'chemical', '화학 물질', '🧪', 1),
        (v_unit4_id, 'concentrated', '농축된', '🏺', 2),
        (v_unit4_id, 'prey', '먹이', '🍖', 3),
        (v_unit4_id, 'threat', '위협', '⚠️', 4),
        (v_unit4_id, 'population', '인구, 개체 수', '👥', 5),
        (v_unit4_id, 'delicate', '섬세한, 연약한', '🌸', 6),
        (v_unit4_id, 'predator', '포식자', '🦁', 7),
        (v_unit4_id, 'ecosystem', '생태계', '🌍', 8),
        (v_unit4_id, 'unintended', '의도하지 않은', '🤷', 9),
        (v_unit4_id, 'damage', '손상', '💥', 10),
        (v_unit4_id, 'annoying', '짜증스러운', '😠', 11),
        (v_unit4_id, 'increase', '증가하다', '📈', 12),
        (v_unit4_id, 'control', '제한하다, 조절하다', '🎮', 13),
        (v_unit4_id, 'load', '싣다', '📦', 14),
        (v_unit4_id, 'drop', '떨어뜨리다', '💧', 15),
        (v_unit4_id, 'deadly', '치명적인', '💀', 16),
        (v_unit4_id, 'incredibly', '엄청나게', '😲', 17),
        (v_unit4_id, 'mosquito', '모기', '🦟', 18),
        (v_unit4_id, 'cockroach', '바퀴벌레', '🪳', 19),
        (v_unit4_id, 'lizard', '도마뱀', '🦎', 20),
        (v_unit4_id, 'rat', '쥐', '🐀', 21),
        (v_unit4_id, 'plague', '전염병', '🦠', 22),
        (v_unit4_id, 'parachute', '낙하산', '🪂', 23),
        (v_unit4_id, 'balance', '균형', '⚖️', 24),
        (v_unit4_id, 'valuable', '소중한', '💎', 25),
        (v_unit4_id, 'species', '종', '🧬', 26),
        (v_unit4_id, 'disappear', '사라지다', '👻', 27),
        (v_unit4_id, 'furthermore', '더욱이, 뿐만 아니라', '➕', 28),
        (v_unit4_id, 'harmful', '해로운', '🚫', 29),
        (v_unit4_id, 'food chain', '먹이사슬', '⛓️', 30);

        -- 7. 유닛 5 단어 데이터 (Why Does Wind Blow?)
        DELETE FROM words WHERE unit_id = v_unit5_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit5_id, 'spin', '회전시키다', '🌀', 1),
        (v_unit5_id, 'heavy', '무거운', '🏋️', 2),
        (v_unit5_id, 'pressure', '압력', '🎈', 3),
        (v_unit5_id, 'dense', '빽빽한', '🌳', 4),
        (v_unit5_id, 'pollen', '꽃가루', '🌻', 5),
        (v_unit5_id, 'ability', '능력', '🧠', 6),
        (v_unit5_id, 'opposite', '반대', '↔️', 7),
        (v_unit5_id, 'occur', '일어나다', '📅', 8),
        (v_unit5_id, 'be composed of', '~로 구성되어 있다', '🧱', 9),
        (v_unit5_id, 'warm', '데우다', '🔥', 10),
        (v_unit5_id, 'empty', '비어 있는', '🕳️', 11),
        (v_unit5_id, 'leave', '남기다', '🏃', 12),
        (v_unit5_id, 'difference', '차이', '🌓', 13),
        (v_unit5_id, 'farther', '더 멀리', '🏃', 14),
        (v_unit5_id, 'toward', '~쪽으로', '⬅️', 15),
        (v_unit5_id, 'space', '공간', '🌌', 16),
        (v_unit5_id, 'rush', '급히 움직이다', '🏃', 17),
        (v_unit5_id, 'pinwheel', '바람개비', '🎡', 18),
        (v_unit5_id, 'light', '가벼운', '🎈', 19),
        (v_unit5_id, 'rise', '올라가다', '🎈', 20),
        (v_unit5_id, 'blow', '(바람이) 불다', '🌬️', 21),
        (v_unit5_id, 'molecule', '분자', '🧪', 22),
        (v_unit5_id, 'surface', '표면', '⛰️', 23),
        (v_unit5_id, 'quickly', '빨리', '⚡', 24),
        (v_unit5_id, 'sunset', '해질녘, 일몰', '🌇', 25),
        (v_unit5_id, 'heat', '뜨거워지다, 열', '🔥', 26),
        (v_unit5_id, 'during', '~ 동안', '🕒', 27),
        (v_unit5_id, 'while', '~하는 동안에', '🕒', 28),
        (v_unit5_id, 'cause', '~을 야기하다', '⚡', 29),
        (v_unit5_id, 'ocean', '바다', '🌊', 30);

        -- 8. 유닛 6 단어 데이터 (Wind Farms Going Offshore)
        DELETE FROM words WHERE unit_id = v_unit6_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit6_id, 'electricity', '전기', '⚡', 1),
        (v_unit6_id, 'generate', '발생시키다', '⚙️', 2),
        (v_unit6_id, 'renewable', '재생 가능한', '♻️', 3),
        (v_unit6_id, 'plentiful', '풍부한', '🍎', 4),
        (v_unit6_id, 'landscape', '풍경', '🏞️', 5),
        (v_unit6_id, 'solution', '해결책', '💡', 6),
        (v_unit6_id, 'productive', '생산적인', '🚜', 7),
        (v_unit6_id, 'steady', '꾸준한', '🐢', 8),
        (v_unit6_id, 'promising', '유망한', '🌟', 9),
        (v_unit6_id, 'imagine', '상상하다', '💭', 10),
        (v_unit6_id, 'attractive', '매력적인', '😍', 11),
        (v_unit6_id, 'fuel', '연료', '⛽', 12),
        (v_unit6_id, 'noisy', '시끄러운', '🔊', 13),
        (v_unit6_id, 'lead', '이끌다', '🏃', 14),
        (v_unit6_id, 'possible', '가능한', '✅', 15),
        (v_unit6_id, 'require', '필요로 하다', '🔑', 16),
        (v_unit6_id, 'downside', '불리한 면', '📉', 17),
        (v_unit6_id, 'without', '~없이', '🚫', 18),
        (v_unit6_id, 'country', '국가, 나라', '🏳️', 19),
        (v_unit6_id, 'search', '찾아보다, 검색하다', '🔍', 20),
        (v_unit6_id, 'source', '원천, 근원', '⛲', 21),
        (v_unit6_id, 'blade', '날개깃', '⛵', 22),
        (v_unit6_id, 'type', '유형', '📄', 23),
        (v_unit6_id, 'quite', '꽤, 상당히', '📏', 24),
        (v_unit6_id, 'waste', '낭비, 낭비하다', '🗑️', 25),
        (v_unit6_id, 'scientist', '과학자', '🧪', 26),
        (v_unit6_id, 'offshore', '앞바다의', '🌊', 27),
        (v_unit6_id, 'for example', '예를 들어', '📝', 28),
        (v_unit6_id, 'pollution', '오염', '🌫️', 29),
        (v_unit6_id, 'solve', '해결하다', '🧩', 30);

        -- 9. 유닛 7 단어 데이터 (Mobiles: Art in Motion)
        DELETE FROM words WHERE unit_id = v_unit7_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit7_id, 'hang', '걸다', '🖼️', 1),
        (v_unit7_id, 'sculptor', '조각가', '🗿', 2),
        (v_unit7_id, 'wire', '철사', '🔗', 3),
        (v_unit7_id, 'connect', '연결하다', '🔗', 4),
        (v_unit7_id, 'attach', '붙이다', '📎', 5),
        (v_unit7_id, 'interact', '상호 작용을 하다', '🤝', 6),
        (v_unit7_id, 'environment', '환경', '🌍', 7),
        (v_unit7_id, 'fascinate', '매혹하다', '🤩', 8),
        (v_unit7_id, 'impact', '영향, 충격', '💥', 9),
        (v_unit7_id, 'view', '(~라고) 여기다', '👁️', 10),
        (v_unit7_id, 'form', '형태', '📐', 11),
        (v_unit7_id, 'modern', '현대의', '🏙️', 12),
        (v_unit7_id, 'talent', '재능', '🌟', 13),
        (v_unit7_id, 'mechanical', '기계와 관련된', '⚙️', 14),
        (v_unit7_id, 'nevertheless', '그렇기는 하지만', '🤔', 15),
        (v_unit7_id, 'structure', '구조', '🏗️', 16),
        (v_unit7_id, 'gracefully', '우아하게', '🦢', 17),
        (v_unit7_id, 'significantly', '중요하게', '❗', 18),
        (v_unit7_id, 'mobile', '기동성 있는', '📱', 19),
        (v_unit7_id, 'ceiling', '천장', '🏠', 20),
        (v_unit7_id, 'artist', '예술가', '🎨', 21),
        (v_unit7_id, 'decide', '결정하다', '⚖️', 22),
        (v_unit7_id, 'knowledge', '지식', '📚', 23),
        (v_unit7_id, 'abstract', '추상적인', '🖼️', 24),
        (v_unit7_id, 'decade', '10년', '📅', 25),
        (v_unit7_id, 'influence', '영향, 영향력', '✨', 26),
        (v_unit7_id, 'length', '길이', '📏', 27),
        (v_unit7_id, 'perfectly', '완전히, 완벽하게', '💯', 28),
        (v_unit7_id, 'freely', '자유롭게', '🕊️', 29),
        (v_unit7_id, 'parents', '부모님', '👨‍👩‍👧‍👦', 30);

        -- 10. 유닛 8 단어 데이터 (The Origin of the Winds)
        DELETE FROM words WHERE unit_id = v_unit8_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit8_id, 'carve', '조각하다', '🗿', 1),
        (v_unit8_id, 'miraculously', '기적적으로', '✨', 2),
        (v_unit8_id, 'lively', '활기 넘치는', '💃', 3),
        (v_unit8_id, 'gust', '돌풍', '🌬️', 4),
        (v_unit8_id, 'moist', '촉촉한', '💧', 5),
        (v_unit8_id, 'sweep', '휘몰아치다', '🌪️', 6),
        (v_unit8_id, 'prepare', '준비하다', '🎒', 7),
        (v_unit8_id, 'satisfied', '만족하는', '😊', 8),
        (v_unit8_id, 'once in a while', '가끔', '🕒', 9),
        (v_unit8_id, 'head', '향하다', '➡️', 10),
        (v_unit8_id, 'rough', '거친', '🌊', 11),
        (v_unit8_id, 'completely', '완전히', '⚪', 12),
        (v_unit8_id, 'immediately', '즉시', '⚡', 13),
        (v_unit8_id, 'freezing', '추운', '❄️', 14),
        (v_unit8_id, 'return', '돌아오다', '🏠', 15),
        (v_unit8_id, 'still', '고요한', '🤫', 16),
        (v_unit8_id, 'uncover', '덮개를 벗기다', '🔓', 17),
        (v_unit8_id, 'gentle', '온화한, 순한', '🐑', 18),
        (v_unit8_id, 'breeze', '산들바람, 미풍', '🍃', 19),
        (v_unit8_id, 'village', '마을', '🏘️', 20),
        (v_unit8_id, 'husband', '남편', '👨', 21),
        (v_unit8_id, 'wake up', '정신을 차리다', '👀', 22),
        (v_unit8_id, 'travel', '여행하다', '✈️', 23),
        (v_unit8_id, 'bring', '가져오다', '🎁', 24),
        (v_unit8_id, 'tradition', '전통', '🎎', 25),
        (v_unit8_id, 'reindeer', '순록', '🦌', 26),
        (v_unit8_id, 'powerful', '강력한', '💪', 27),
        (v_unit8_id, 'rainstorm', '폭풍우', '⛈️', 28),
        (v_unit8_id, 'blast', '강한 바람, 폭발', '💥', 29),
        (v_unit8_id, 'geographical', '지리적인', '🗺️', 30);

        -- 11. 유닛 9 단어 데이터 (The History of Numerals)
        DELETE FROM words WHERE unit_id = v_unit9_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit9_id, 'numeral', '숫자', '🔢', 1),
        (v_unit9_id, 'record', '기록하다', '📝', 2),
        (v_unit9_id, 'prevent', '막다', '🚫', 3),
        (v_unit9_id, 'seal', '봉하다', '✉️', 4),
        (v_unit9_id, 'ordinary', '평범한, 일반적인', '😐', 5),
        (v_unit9_id, 'complicated', '복잡한', '🧩', 6),
        (v_unit9_id, 'adopt', '채택하다', '✅', 7),
        (v_unit9_id, 'standard', '기준', '📏', 8),
        (v_unit9_id, 'mean', '의미하다', '💡', 9),
        (v_unit9_id, 'price tag', '가격표', '🏷️', 10),
        (v_unit9_id, 'symbol', '기호, 상징', '☯️', 11),
        (v_unit9_id, 'token', '토큰', '🪙', 12),
        (v_unit9_id, 'error', '오류, 실수', '❌', 13),
        (v_unit9_id, 'represent', '나타내다', '🎭', 14),
        (v_unit9_id, 'ancient', '고대의', '🏛️', 15),
        (v_unit9_id, 'pouch', '주머니', '👛', 16),
        (v_unit9_id, 'inconvenient', '불편한', '😫', 17),
        (v_unit9_id, 'among', '~ 사이에', '👨‍👩‍👧', 18),
        (v_unit9_id, 'clay', '점토, 찰흙', '🏺', 19),
        (v_unit9_id, 'culture', '문화', '🎨', 20),
        (v_unit9_id, 'develop', '개발하다', '🛠️', 21),
        (v_unit9_id, 'Egyptian', '이집트의', '🇪🇬', 22),
        (v_unit9_id, 'Roman', '로마의', '🏛️', 23),
        (v_unit9_id, 'memorize', '암기하다', '🧠', 24),
        (v_unit9_id, 'including', '~을 포함하여', '➕', 25),
        (v_unit9_id, 'on the other hand', '반면에', '↕️', 26),
        (v_unit9_id, 'India', '인도', '🇮🇳', 27),
        (v_unit9_id, 'clock', '시계', '⏰', 28),
        (v_unit9_id, 'each', '각각', '☝️', 29),
        (v_unit9_id, 'system', '제도, 체제', '⚙️', 30);

        -- 12. 유닛 10 단어 데이터 (The Curse of the Ninth)
        DELETE FROM words WHERE unit_id = v_unit10_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit10_id, 'curse', '저주', '🧙', 1),
        (v_unit10_id, 'victim', '희생자', '🤕', 2),
        (v_unit10_id, 'anticipate', '고대하다, 기대하다', '⏳', 3),
        (v_unit10_id, 'blame', '~을 탓하다', '👉', 4),
        (v_unit10_id, 'previously', '이전에', '🔙', 5),
        (v_unit10_id, 'devise', '궁리하다', '💡', 6),
        (v_unit10_id, 'coincidence', '우연의 일치', '🎲', 7),
        (v_unit10_id, 'beat', '이기다, 피하다', '🥇', 8),
        (v_unit10_id, 'obviously', '분명히', '📢', 9),
        (v_unit10_id, 'superstition', '미신', '🏮', 10),
        (v_unit10_id, 'believe', '믿다', '🙏', 11),
        (v_unit10_id, 'unfortunately', '불행하게도', '😢', 12),
        (v_unit10_id, 'prosperity', '번영, 번성', '📈', 13),
        (v_unit10_id, 'compose', '작곡하다', '🎼', 14),
        (v_unit10_id, 'officially', '공식적으로', '🏗️', 15),
        (v_unit10_id, 'fear', '두려워하다', '😨', 16),
        (v_unit10_id, 'classical', '고전주의의', '🎻', 17),
        (v_unit10_id, 'scary', '무서운', '👻', 18),
        (v_unit10_id, 'composer', '작곡가', '🎹', 19),
        (v_unit10_id, 'symphony', '교향곡', '🎵', 20),
        (v_unit10_id, 'ninth', '아홉째의, 제9의', '9️⃣', 21),
        (v_unit10_id, 'seemingly', '겉보기에는', '👀', 22),
        (v_unit10_id, 'example', '예', '📝', 23),
        (v_unit10_id, 'be known as', '~로 알려져 있다', '🏷️', 24),
        (v_unit10_id, 'actually', '실제로, 정말로', '✔️', 25),
        (v_unit10_id, 'cleverly', '영리하게', '🧠', 26),
        (v_unit10_id, 'unlike', '~와 다른', '≠', 27),
        (v_unit10_id, 'pronunciation', '발음', '🗣️', 28),
        (v_unit10_id, 'eighth', '제8의', '8️⃣', 29),
        (v_unit10_id, 'last', '지난, 마지막', '🔚', 30);

        -- 13. 유닛 11 단어 데이터 (Player Numbers in Sports)
        DELETE FROM words WHERE unit_id = v_unit11_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit11_id, 'relationship', '관계', '💑', 1),
        (v_unit11_id, 'display', '드러내다', '🖥️', 2),
        (v_unit11_id, 'identify', '알아보다', '🔍', 3),
        (v_unit11_id, 'distinguish', '구별하다', '⚖️', 4),
        (v_unit11_id, 'assign', '부여하다, 배정하다', '📋', 5),
        (v_unit11_id, 'order', '순서', '🔢', 6),
        (v_unit11_id, 'idol', '우상', '🌟', 7),
        (v_unit11_id, 'restriction', '제약', '🚫', 8),
        (v_unit11_id, 'position', '위치, 자리', '📍', 9),
        (v_unit11_id, 'retire', '은퇴하다', '🛌', 10),
        (v_unit11_id, 'jersey', '셔츠', '👕', 11),
        (v_unit11_id, 'last name', '성', '🏷️', 12),
        (v_unit11_id, 'popular', '인기 있는', '🤩', 13),
        (v_unit11_id, 'goalkeeper', '골키퍼', '🧤', 14),
        (v_unit11_id, 'along with', '~와 함께', '👫', 15),
        (v_unit11_id, 'match', '경기', '⚽', 16),
        (v_unit11_id, 'guess', '추측하다', '🤔', 17),
        (v_unit11_id, 'basketball', '농구', '🏀', 18),
        (v_unit11_id, 'soccer', '축구', '⚽', 19),
        (v_unit11_id, 'forward', '앞쪽의', '⏩', 20),
        (v_unit11_id, 'between', '사이에', '↔️', 21),
        (v_unit11_id, 'batting', '타격, 배팅', '🏏', 22),
        (v_unit11_id, 'striker', '공격수', '🥅', 23),
        (v_unit11_id, 'meaning', '뜻, 의미', '📖', 24),
        (v_unit11_id, 'certain', '확실한', '✅', 25),
        (v_unit11_id, 'same', '같은', '👯', 26),
        (v_unit11_id, 'similarly', '비슷하게', '👯', 27),
        (v_unit11_id, 'often', '자주, 보통', '🕒', 28),
        (v_unit11_id, 'opponent', '상대', '🤺', 29),
        (v_unit11_id, 'player', '선수', '🏃', 30);

        -- 14. 유닛 12 단어 데이터 (A Day to Celebrate Pi)
        DELETE FROM words WHERE unit_id = v_unit12_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit12_id, 'celebrate', '기념하다', '🎉', 1),
        (v_unit12_id, 'infinite', '무한한', '♾️', 2),
        (v_unit12_id, 'ratio', '비율', '📊', 3),
        (v_unit12_id, 'mathematician', '수학자', '🧮', 4),
        (v_unit12_id, 'calculate', '계산하다', '➕', 5),
        (v_unit12_id, 'official', '공식적인', '📜', 6),
        (v_unit12_id, 'spread', '퍼지다', '🍞', 7),
        (v_unit12_id, 'endless', '무한한', '♾️', 8),
        (v_unit12_id, 'come up with', '제시[제안]하다', '💡', 9),
        (v_unit12_id, 'digit', '자릿수', '🔢', 10),
        (v_unit12_id, 'circumference', '원주, 원둘레', '⭕', 11),
        (v_unit12_id, 'diameter', '지름', '📏', 12),
        (v_unit12_id, 'exist', '존재하다', '🕴️', 13),
        (v_unit12_id, 'hold', '개최하다', '🏟️', 14),
        (v_unit12_id, 'march', '행진하다', '💂', 15),
        (v_unit12_id, 'interesting', '흥미로운', '🤩', 16),
        (v_unit12_id, 'define', '정의하다', '📖', 17),
        (v_unit12_id, 'special', '특별한', '🌟', 18),
        (v_unit12_id, 'unique', '독특한', '💎', 19),
        (v_unit12_id, 'even', '~도, ~조차', '😮', 20),
        (v_unit12_id, 'Greek', '그리스인', '🇬🇷', 21),
        (v_unit12_id, 'accuracy', '정확, 정확도', '🎯', 22),
        (v_unit12_id, 'contest', '대회', '🏆', 23),
        (v_unit12_id, 'compete', '경쟁하다', '🏎️', 24),
        (v_unit12_id, 'parade', '퍼레이드', '🎷', 25),
        (v_unit12_id, 'celebration', '기념, 기념 행사', '🎊', 26),
        (v_unit12_id, 'nowadays', '요즘에는', '📅', 27),
        (v_unit12_id, 'coincidentally', '우연히', '🎲', 28),
        (v_unit12_id, 'participate', '참여하다', '🙋', 29),
        (v_unit12_id, 'across', '가로질러', '🛣️', 30);

        -- 15. 유닛 13 단어 데이터 (Our Solar System and Its Planets)
        DELETE FROM words WHERE unit_id = v_unit13_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit13_id, 'universe', '우주', '🌌', 1),
        (v_unit13_id, 'planet', '행성', '🪐', 2),
        (v_unit13_id, 'orbit', '궤도를 돌다', '🔄', 3),
        (v_unit13_id, 'inner', '내부의', '🏠', 4),
        (v_unit13_id, 'trap', '가두다, 끌어 모으다', '🪤', 5),
        (v_unit13_id, 'storm', '폭풍', '⛈️', 6),
        (v_unit13_id, 'rotate', '회전하다', '🌀', 7),
        (v_unit13_id, 'quality', '특성, 자질', '💎', 8),
        (v_unit13_id, 'respect', '측면', '🔍', 9),
        (v_unit13_id, 'solar', '태양의', '☀️', 10),
        (v_unit13_id, 'breathable', '호흡하기에 적당한', '🌬️', 11),
        (v_unit13_id, 'temperature', '온도', '🌡️', 12),
        (v_unit13_id, 'huge', '거대한', '🐘', 13),
        (v_unit13_id, 'divide', '나누다', '➗', 14),
        (v_unit13_id, 'already', '이미, 벌써', '⌛', 15),
        (v_unit13_id, 'beside', '옆에, ~에 비해', '🧍', 16),
        (v_unit13_id, 'Neptune', '해왕성', '🔱', 17),
        (v_unit13_id, 'group', '무리, 그룹', '👥', 18),
        (v_unit13_id, 'rocky', '바위로 된, 바위투성이의', '🪨', 19),
        (v_unit13_id, 'Mercury', '수성', '🌡️', 20),
        (v_unit13_id, 'well-known', '잘 알려진', '🌟', 21),
        (v_unit13_id, 'amazing', '멋진, 놀라운', '🤩', 22),
        (v_unit13_id, 'Venus', '금성', '♀️', 23),
        (v_unit13_id, 'Mars', '화성', '⚔️', 24),
        (v_unit13_id, 'reddish', '발그레한, 불그스름한', '🔴', 25),
        (v_unit13_id, 'Jupiter', '목성', '⚡', 26),
        (v_unit13_id, 'Saturn', '토성', '🪐', 27),
        (v_unit13_id, 'Uranus', '천왕성', '🌌', 28),
        (v_unit13_id, 'outer', '외부의, 외곽의', '🚪', 29),
        (v_unit13_id, 'cloud', '구름', '☁️', 30);

        -- 16. 유닛 14 단어 데이터 (The Tradition of Naming Planets)
        DELETE FROM words WHERE unit_id = v_unit14_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit14_id, 'visible', '눈에 보이는', '👁️', 1),
        (v_unit14_id, 'telescope', '망원경', '🔭', 2),
        (v_unit14_id, 'astronomer', '천문학자', '🔭', 3),
        (v_unit14_id, 'traditional', '전통적인', '🎎', 4),
        (v_unit14_id, 'predict', '예측하다', '🔮', 5),
        (v_unit14_id, 'practice', '관행, 관례', '📜', 6),
        (v_unit14_id, 'international', '국제적인', '🌎', 7),
        (v_unit14_id, 'goddess', '여신', '👒', 8),
        (v_unit14_id, 'handle', '다루다', '🧤', 9),
        (v_unit14_id, 'unusual', '특이한', '🦄', 10),
        (v_unit14_id, 'naked eye', '육안', '👁️', 11),
        (v_unit14_id, 'messenger', '전달자', '✉️', 12),
        (v_unit14_id, 'century', '100년, 세기', '💯', 13),
        (v_unit14_id, 'observe', '관측하다', '🔭', 14),
        (v_unit14_id, 'location', '위치', '📍', 15),
        (v_unit14_id, 'based on', '~에 근거하여', '📑', 16),
        (v_unit14_id, 'name', '이름', '🏷️', 17),
        (v_unit14_id, 'god', '신', '⚡', 18),
        (v_unit14_id, 'fast', '빠른', '⚡', 19),
        (v_unit14_id, 'invent', '발명하다', '💡', 20),
        (v_unit14_id, 'object', '물체', '📦', 21),
        (v_unit14_id, 'union', '연합', '🤝', 22),
        (v_unit14_id, 'German', '독일의, 독일인', '🇩🇪', 23),
        (v_unit14_id, 'follow', '따라가다', '🚶', 24),
        (v_unit14_id, 'continue', '계속되다, 계속하다', '⏯️', 25),
        (v_unit14_id, 'name after', '~의 이름을 따서 명명하다', '🏷️', 26),
        (v_unit14_id, 'astronomical', '천문학의', '🔭', 27),
        (v_unit14_id, 'aggressive', '공격적인', '😠', 28),
        (v_unit14_id, 'deliver', '배달하다', '🚚', 29),
        (v_unit14_id, 'thunder', '천둥', '⚡', 30);

        -- 17. 유닛 15 단어 데이터 (The Voyager Golden Records)
        DELETE FROM words WHERE unit_id = v_unit15_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit15_id, 'launch', '발사하다', '🚀', 1),
        (v_unit15_id, 'explore', '탐험하다', '🧭', 2),
        (v_unit15_id, 'mission', '임무', '🎯', 3),
        (v_unit15_id, 'store', '저장하다', '💾', 4),
        (v_unit15_id, 'academic', '학문적인', '🎓', 5),
        (v_unit15_id, 'transportation', '교통수단', '🚌', 6),
        (v_unit15_id, 'contain', '포함하다', '📦', 7),
        (v_unit15_id, 'encounter', '마주치다', '🤝', 8),
        (v_unit15_id, 'cosmic', '우주의', '🌌', 9),
        (v_unit15_id, 'spacecraft', '우주선', '🚀', 10),
        (v_unit15_id, 'communicate', '의사소통을 하다', '💬', 11),
        (v_unit15_id, 'formula', '공식', '⚖️', 12),
        (v_unit15_id, 'include', '포함하다', '➕', 13),
        (v_unit15_id, 'numerous', '많은', '🔢', 14),
        (v_unit15_id, 'collect', '모으다', '🧺', 15),
        (v_unit15_id, 'send', '보내다, 발송하다', '✉️', 16),
        (v_unit15_id, 'since then', '그때부터', '🔙', 17),
        (v_unit15_id, 'important', '중요한', '❗', 18),
        (v_unit15_id, 'float', '떠다니다', '🎈', 19),
        (v_unit15_id, 'photograph', '사진, ~의 사진을 찍다', '📸', 20),
        (v_unit15_id, 'various', '여러 가지의, 다양한', '🌈', 21),
        (v_unit15_id, 'greeting', '인사, 안부의 말', '👋', 22),
        (v_unit15_id, 'select', '선발하다, 선택하다', '✅', 23),
        (v_unit15_id, 'hopefully', '바라건대, 희망을 갖고', '🙏', 24),
        (v_unit15_id, 'until', '~까지', '⏳', 25),
        (v_unit15_id, 'section', '부분, 부서', '🧩', 26),
        (v_unit15_id, 'message', '메시지', '💬', 27);

        -- 18. 유닛 16 단어 데이터 (Space Laws)
        DELETE FROM words WHERE unit_id = v_unit16_id;
        INSERT INTO words (unit_id, english, korean, hint_emoji, sort_order) VALUES
        (v_unit16_id, 'discuss', '논의하다', '💬', 1),
        (v_unit16_id, 'establish', '설립하다', '🏗️', 2),
        (v_unit16_id, 'prohibit', '금지하다', '🚫', 3),
        (v_unit16_id, 'occupy', '차지하다', '🏠', 4),
        (v_unit16_id, 'colonize', '식민지로 만들다', '🗺️', 5),
        (v_unit16_id, 'state', '명시하다', '📄', 6),
        (v_unit16_id, 'responsible', '책임이 있는', '⚖️', 7),
        (v_unit16_id, 'obtain', '얻다, 입수하다', '🎁', 8),
        (v_unit16_id, 'ban', '금하다', '🚫', 9),
        (v_unit16_id, 'concerning', '~에 관한', 'ℹ️', 10),
        (v_unit16_id, 'law', '법', '⚖️', 11),
        (v_unit16_id, 'technology', '기술', '💻', 12),
        (v_unit16_id, 'improve', '개선되다', '🆙', 13),
        (v_unit16_id, 'astronaut', '우주비행사', '👨‍🚀', 14),
        (v_unit16_id, 'military', '군사의', '🪖', 15),
        (v_unit16_id, 'benefit', '이익', '💰', 16),
        (v_unit16_id, 'treaty', '조약', '🤝', 17),
        (v_unit16_id, 'principle', '원칙', '📜', 18),
        (v_unit16_id, 'artificial', '인공의', '🤖', 19),
        (v_unit16_id, 'mark', '표시하다', '📍', 20),
        (v_unit16_id, 'beyond', '~저편에, ~너머', '🌌', 21),
        (v_unit16_id, 'exploration', '탐험, 탐구', '🧭', 22),
        (v_unit16_id, 'committee', '위원회', '👥', 23),
        (v_unit16_id, 'creation', '창조, 창작, 창작물', '🎨', 24),
        (v_unit16_id, 'advanced', '선진의, 앞선', '🚀', 25),
        (v_unit16_id, 'mineral', '광물(질)', '💎', 26),
        (v_unit16_id, 'guiding', '인도하는', '🧭', 27),
        (v_unit16_id, 'purpose', '목적', '🎯', 28),
        (v_unit16_id, 'weapon', '무기', '⚔️', 29),
        (v_unit16_id, 'humankind', '인류, 인간', '🌍', 30);

        -- Insight Link 6 모든 유닛 완료
    END IF;
END $$;
