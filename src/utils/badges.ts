/**
 * Badge computation — derives earned badge IDs from the current progress state.
 *
 * This is intentionally a pure function with no side effects: it reads the
 * progress snapshot and returns a Set<string> of badge IDs the learner has
 * earned. Unearned badges are absent from the set. Callers can diff against
 * a previous snapshot to detect newly-earned badges and trigger a celebration.
 *
 * All thresholds are conservative first-ship values; tune them based on user
 * retention data once you have enough cohort signal.
 */

import { ALL_BADGES, BadgeDef } from '../data/badges';

export interface BadgeProgress {
  def: BadgeDef;
  earned: boolean;
}

export interface ProgressSnapshot {
  lessonProgress: Record<string, { completed: boolean; score?: number }>;
  vocabMastery: Record<string, { masteryLevel: number }>;
  streakCount: number;
  completedStories: Record<string, boolean>;
  maxComboEver?: number;
  totalLessons: number;
  totalStories: number;
}

export function computeBadges(p: ProgressSnapshot): Set<string> {
  const earned = new Set<string>();

  const completedLessons = Object.values(p.lessonProgress).filter((l) => l.completed).length;
  const masteredWords = Object.values(p.vocabMastery).filter((m) => m.masteryLevel >= 4).length;
  const completedStoriesCount = Object.values(p.completedStories).filter(Boolean).length;
  const hasPerfect = Object.values(p.lessonProgress).some((l) => l.completed && (l.score ?? 0) >= 100);

  // Learning
  if (completedLessons >= 1) earned.add('first_lesson');
  if (completedLessons >= 10) earned.add('ten_lessons');
  if (completedLessons >= p.totalLessons && p.totalLessons > 0) earned.add('all_lessons');

  // Streak
  if (p.streakCount >= 3) earned.add('streak_3');
  if (p.streakCount >= 7) earned.add('streak_7');
  if (p.streakCount >= 30) earned.add('streak_30');

  // Vocab
  if (masteredWords >= 10) earned.add('vocab_10_mastered');
  if (masteredWords >= 50) earned.add('vocab_50_mastered');

  // Quality
  if (hasPerfect) earned.add('perfect_lesson');
  if ((p.maxComboEver ?? 0) >= 10) earned.add('combo_master');

  // Stories
  if (completedStoriesCount >= 1) earned.add('first_story');
  if (completedStoriesCount >= p.totalStories && p.totalStories > 0) earned.add('all_stories');

  return earned;
}

/**
 * Merge badge defs with earned state to produce a list sorted by:
 * 1. Earned first, then unearned.
 * 2. Within each group, ordered by category priority.
 */
export function getBadgeProgress(p: ProgressSnapshot): BadgeProgress[] {
  const earned = computeBadges(p);
  return ALL_BADGES
    .map((def) => ({ def, earned: earned.has(def.id) }))
    .sort((a, b) => {
      if (a.earned !== b.earned) return a.earned ? -1 : 1;
      return 0;
    });
}
