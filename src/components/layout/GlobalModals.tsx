"use client";

import { useUIStore } from "@/stores/useUIStore";
import { MonsterUnlockModal } from "@/components/game/MonsterUnlockModal";
import { AttendanceModal } from "@/components/game/AttendanceModal";

/**
 * 전역 모달 렌더러
 * 몬스터 해금 모달, 출석 모달 등을 게임 전역에서 관리합니다.
 */
export function GlobalModals() {
  const {
    isMonsterUnlockModalOpen,
    unlockedMonster,
    unlockSource,
    closeMonsterUnlockModal,
    isAttendanceModalOpen,
    attendanceStreak,
    attendanceMilestone,
    closeAttendanceModal,
  } = useUIStore();

  return (
    <>
      <MonsterUnlockModal
        monster={unlockedMonster}
        unlockSource={unlockSource || undefined}
        isOpen={isMonsterUnlockModalOpen}
        onClose={closeMonsterUnlockModal}
      />
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        streak={attendanceStreak}
        milestone={attendanceMilestone}
        onClose={closeAttendanceModal}
      />
    </>
  );
}
