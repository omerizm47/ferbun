/**
 * Badge computation — derives earned badge IDs from the current progress state.
 *
 * This is intentionally a pure function with no side effects: it reads the
 * progress snapshot and returns a Set<string> of badge IDs the learner has
 * earned. Unearned badges are absent from the set. Callers can diff against
 * a previous snapshot to detect newly-earned badges and trigger a celebration.
 *
 * The snapshot carries one entry per track. Counting badges sum across tracks,
 * so a second track can only ever add to them. The two completion badges ask
 * whether some track that has content in it is finished, never whether the
 * cross-track total is: badges are derived on every render and never stored,
 * so a rule whose denominator grew when a track was added would quietly take a
 * badge back off a learner who had already earned it.
 *
 * All thresholds are conservative first-ship values; tune them based on user
 * retention data once you have enough cohort signal.
 */

import { ALL_BADGES, BadgeDef } from '../data/badges';

export interface BadgeProgress {
  def: BadgeDef;
  earned: boolean;
}

/** One track's stored progress alongside the size of that track's corpus. */
export interface TrackSnapshot {
  lessonProgress: Record<string, { completed: boolean; score?: number }>;
  vocabMastery: Record<string, { masteryLevel: number }>;
  completedStories: Record<string, boolean>;
  totalLessons: number;
  totalStories: number;
}

export interface ProgressSnapshot {
  tracks: TrackSnapshot[];
  streakCount: number;
  maxComboEver?: number;
}

export function computeBadges(p: ProgressSnapshot): Set<string> {
  const earned = new Set<string>();

  let completedLessons = 0;
  let masteredWords = 0;
  let completedStoriesCount = 0;
  let hasPerfect = false;
  let aTrackIsFullyLearned = false;
  let aTrackIsFullyRead = false;

  for (const track of p.tracks) {
    const lessonsDone = Object.values(track.lessonProgress).filter((l) => l.completed);
    const storiesDone = Object.values(track.completedStories).filter(Boolean);
    completedLessons += lessonsDone.length;
    masteredWords += Object.values(track.vocabMastery).filter((m) => m.masteryLevel >= 4).length;
    completedStoriesCount += storiesDone.length;
    if (lessonsDone.some((l) => (l.score ?? 0) >= 100)) hasPerfect = true;
    // An unauthored track has nothing to finish, so it can neither award the
    // completion badge nor dilute a track that has genuinely been finished.
    if (track.totalLessons > 0 && lessonsDone.length >= track.totalLessons) aTrackIsFullyLearned = true;
    if (track.totalStories > 0 && storiesDone.length >= track.totalStories) aTrackIsFullyRead = true;
  }

  // Learning
  if (completedLessons >= 1) earned.add('first_lesson');
  if (completedLessons >= 10) earned.add('ten_lessons');
  if (aTrackIsFullyLearned) earned.add('all_lessons');

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
  if (aTrackIsFullyRead) earned.add('all_stories');

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
