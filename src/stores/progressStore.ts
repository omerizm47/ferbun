import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, VocabMastery } from '../data/types';
import { TrackId, getTrack } from '../data/tracks';
import {
  InactiveTracks,
  PROGRESS_BACKUP_KEY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  PersistedProgress,
  TRACK_IDS,
  TrackProgress,
  composeTracks,
  emptyTrackProgress,
  migrateProgress,
  readTrackProgress,
} from './progressMigration';
import { XP_PER_LEVEL, STREAK_LEVELS } from '../theme';
import { computeBadges, ProgressSnapshot, TrackSnapshot } from '../utils/badges';

export type StreakLevel = typeof STREAK_LEVELS[keyof typeof STREAK_LEVELS];

/** What changed as a result of completing a lesson — drives the reward overlay. */
export interface LessonResult {
  leveledUp: boolean;
  newLevel: number;
  streakMilestone: StreakLevel | null;
  newBadgeIds?: string[];
}

/** Streak tier for a given consecutive-day count (pure, no store read). */
function streakLevelFor(streak: number): StreakLevel {
  if (streak >= STREAK_LEVELS.NEWROZ.min) return STREAK_LEVELS.NEWROZ;
  if (streak >= STREAK_LEVELS.BONFIRE.min) return STREAK_LEVELS.BONFIRE;
  if (streak >= STREAK_LEVELS.CAMPFIRE.min) return STREAK_LEVELS.CAMPFIRE;
  if (streak >= STREAK_LEVELS.SPARK.min) return STREAK_LEVELS.SPARK;
  return STREAK_LEVELS.CANDLE;
}

/**
 * Vocab ids whose spaced-repetition review is due now (most overdue first).
 * Pure so screens can derive a live "due" count straight from `vocabMastery`,
 * and so the review queue can be snapshotted once at the start of a session.
 */
export function selectDueVocabIds(
  vocabMastery: Record<string, VocabMastery>,
  now: number = Date.now(),
): string[] {
  return Object.values(vocabMastery)
    .filter((m) => m.nextReviewAt != null && new Date(m.nextReviewAt).getTime() <= now)
    .sort((a, b) => new Date(a.nextReviewAt!).getTime() - new Date(b.nextReviewAt!).getTime())
    .map((m) => m.vocabId);
}

/**
 * Vocab ids that the learner struggles with most — masteryLevel 0 or 1.
 * Used for the "Zayıf Kelimeler / Weak Words" flashcard mode that surfaces
 * cards the learner has seen but not yet consolidated, giving them a targeted
 * review without waiting for the SRS timer to fire.
 */
export function selectWeakVocabIds(
  vocabMastery: Record<string, VocabMastery>,
): string[] {
  return Object.values(vocabMastery)
    .filter((m) => m.masteryLevel <= 1)
    .sort((a, b) => a.masteryLevel - b.masteryLevel)
    .map((m) => m.vocabId);
}

/**
 * XP earned *today*. Returns 0 when the stored daily tally belongs to an earlier
 * day, so the daily-goal ring resets at midnight without needing a timer.
 */
export function selectDailyXp(
  s: { dailyXp: number; dailyXpDate: string | null },
  today: string = new Date().toDateString(),
): number {
  return s.dailyXpDate === today ? s.dailyXp : 0;
}


interface ProgressState {
  // User info
  displayName: string;
  avatarIcon: string;
  avatarColor: string;
  totalXp: number;
  currentLevel: number;
  streakCount: number;
  lastActiveDate: string | null;
  // Per-day XP tally for the daily goal. dailyXp counts XP earned on dailyXpDate;
  // a new day is detected lazily via selectDailyXp (no background timer).
  dailyXp: number;
  dailyXpDate: string | null;
  maxComboEver: number;

  // Progress. The three flat maps always hold the *active* track, so every
  // reader of them keeps working untouched; the other tracks sit parked in
  // inactiveTracks until setActiveTrack swaps them in.
  lessonProgress: Record<string, UserProgress>;
  vocabMastery: Record<string, VocabMastery>;
  completedStories: Record<string, boolean>;
  activeTrack: TrackId;
  inactiveTracks: InactiveTracks;
  /** False until loadFromStorage has finished. Saving before it does would stamp the v2 marker over live v1 data. */
  hydrated: boolean;

  // Actions
  setDisplayName: (name: string) => void;
  setActiveTrack: (next: TrackId) => void;
  setAvatar: (icon: string, color: string) => void;
  completeLesson: (lessonId: string, score: number, xp: number, maxCombo?: number) => LessonResult;
  updateVocabMastery: (vocabId: string, correct: boolean) => void;
  updateStreak: () => void;
  checkStreakValidity: () => void;
  incrementStreak: () => void;
  completeVocabReview: (xp: number) => { leveledUp: boolean; newLevel: number; newBadgeIds?: string[] };
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => number;
  markStoryComplete: (storyId: string) => { leveledUp: boolean; newLevel: number; newBadgeIds?: string[] };
  isStoryComplete: (storyId: string) => boolean;
  getStreakLevel: () => typeof STREAK_LEVELS[keyof typeof STREAK_LEVELS];
  getDueVocabIds: () => string[];
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

/** The fields a badge snapshot is derived from, so a screen can pass the same subset. */
export type SnapshotSource = Pick<
  ProgressState,
  | 'lessonProgress'
  | 'vocabMastery'
  | 'completedStories'
  | 'streakCount'
  | 'maxComboEver'
  | 'activeTrack'
  | 'inactiveTracks'
>;

/**
 * One snapshot entry per track: the active track from the live flat maps, every
 * other from inactiveTracks, each with the totals of its own corpus. A badge is
 * then never measured against a denominator that belongs to another track.
 */
export function buildSnapshot(state: SnapshotSource): ProgressSnapshot {
  const entry = (id: TrackId, progress: TrackProgress): TrackSnapshot => {
    const content = getTrack(id).content;
    return {
      lessonProgress: progress.lessonProgress,
      vocabMastery: progress.vocabMastery,
      completedStories: progress.completedStories,
      totalLessons: content.getTotalLessons(),
      totalStories: content.stories.length,
    };
  };

  const tracks: TrackSnapshot[] = [
    entry(state.activeTrack, {
      lessonProgress: state.lessonProgress,
      vocabMastery: state.vocabMastery,
      completedStories: state.completedStories,
    }),
  ];
  for (const id of TRACK_IDS) {
    if (id === state.activeTrack) continue;
    tracks.push(entry(id, readTrackProgress(state.inactiveTracks, id) ?? emptyTrackProgress()));
  }

  return { tracks, streakCount: state.streakCount, maxComboEver: state.maxComboEver };
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  displayName: '',
  avatarIcon: 'sunny',
  avatarColor: '#E85D00',
  totalXp: 0,
  currentLevel: 1,
  maxComboEver: 0,
  streakCount: 0,
  lastActiveDate: null,
  dailyXp: 0,
  dailyXpDate: null,
  lessonProgress: {},
  vocabMastery: {},
  completedStories: {},
  activeTrack: 'kmr',
  inactiveTracks: {},
  hydrated: false,

  setDisplayName: (name: string) => {
    set({ displayName: name });
    get().saveToStorage();
  },

  setActiveTrack: (next: TrackId) => {
    const state = get();
    if (state.activeTrack === next) return;

    const parked: InactiveTracks = {
      ...state.inactiveTracks,
      [state.activeTrack]: {
        lessonProgress: state.lessonProgress,
        vocabMastery: state.vocabMastery,
        completedStories: state.completedStories,
      },
    };
    const incoming = readTrackProgress(parked, next) ?? emptyTrackProgress();
    delete parked[next];

    set({
      activeTrack: next,
      inactiveTracks: parked,
      lessonProgress: incoming.lessonProgress,
      vocabMastery: incoming.vocabMastery,
      completedStories: incoming.completedStories,
    });
    get().saveToStorage();
  },

  setAvatar: (icon: string, color: string) => {
    set({ avatarIcon: icon, avatarColor: color });
    get().saveToStorage();
  },

  completeLesson: (lessonId: string, score: number, xp: number, maxCombo?: number) => {
    const state = get();
    const badgesBefore = computeBadges(buildSnapshot(state));

    const existing = state.lessonProgress[lessonId];
    const prevLevel = state.currentLevel;
    const prevStreak = state.streakCount;
    let newLevel = prevLevel;
    const newMaxComboEver = Math.max(state.maxComboEver || 0, maxCombo || 0);

    // Only award XP / update the stored score when it's a new best.
    if (!existing || score > existing.score) {
      const newXp = state.totalXp + xp;
      newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      const today = new Date().toDateString();
      const dailyBase = state.dailyXpDate === today ? state.dailyXp : 0;

      set({
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: {
            lessonId,
            completed: true,
            score,
            completedAt: new Date().toISOString(),
          },
        },
        totalXp: newXp,
        currentLevel: newLevel,
        dailyXp: dailyBase + xp,
        dailyXpDate: today,
        maxComboEver: newMaxComboEver,
      });
    } else {
      set({ maxComboEver: newMaxComboEver });
    }

    // Always refresh streak + last-active date on completion (including replays).
    get().incrementStreak();
    get().saveToStorage();

    // Report milestones so the lesson screen can celebrate.
    const newStreak = get().streakCount;
    const prevTier = streakLevelFor(prevStreak);
    const newTier = streakLevelFor(newStreak);
    const streakMilestone =
      newStreak > prevStreak && newTier.label !== prevTier.label ? newTier : null;

    const badgesAfter = computeBadges(buildSnapshot(get()));
    const newBadgeIds = Array.from(badgesAfter).filter((id) => !badgesBefore.has(id));

    return { leveledUp: newLevel > prevLevel, newLevel, streakMilestone, newBadgeIds };
  },

  updateVocabMastery: (vocabId: string, correct: boolean) => {
    const state = get();
    const existing = state.vocabMastery[vocabId] || {
      vocabId,
      masteryLevel: 0,
    };

    // SM-2 simplified: correct increases mastery, incorrect decreases
    let newLevel = existing.masteryLevel;
    if (correct) {
      newLevel = Math.min(5, newLevel + 1);
    } else {
      newLevel = Math.max(0, newLevel - 1);
    }

    // Calculate next review based on mastery level
    const intervals = [0, 1, 3, 7, 14, 30]; // days
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + intervals[newLevel]);

    set({
      vocabMastery: {
        ...state.vocabMastery,
        [vocabId]: {
          vocabId,
          masteryLevel: newLevel,
          nextReviewAt: nextReview.toISOString(),
          lastReviewedAt: new Date().toISOString(),
        },
      },
    });
    get().saveToStorage();
  },

  updateStreak: () => {
    get().incrementStreak();
  },

  checkStreakValidity: () => {
    const state = get();
    const today = new Date().toDateString();
    const lastActive = state.lastActiveDate;

    if (!lastActive) return; // New user or reset state
    if (lastActive === today) return; // Already active today or checked today

    const lastActiveTime = new Date(lastActive).getTime();
    const nowTime = new Date().getTime();
    const hoursDiff = (nowTime - lastActiveTime) / (1000 * 60 * 60);

    if (hoursDiff > 36) {
      set({ streakCount: 0 });
      get().saveToStorage();
    }
  },

  incrementStreak: () => {
    const state = get();
    const today = new Date().toDateString();
    const lastActive = state.lastActiveDate;

    if (lastActive === today) return; // Already updated today

    let newStreak = state.streakCount;
    if (lastActive) {
      const lastActiveTime = new Date(lastActive).getTime();
      const nowTime = new Date().getTime();
      const hoursDiff = (nowTime - lastActiveTime) / (1000 * 60 * 60);

      if (hoursDiff <= 36) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    set({
      streakCount: newStreak,
      lastActiveDate: today,
    });
    get().saveToStorage();
  },

  completeVocabReview: (xp: number) => {
    const state = get();
    const badgesBefore = computeBadges(buildSnapshot(state));

    const newXp = state.totalXp + xp;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
    const today = new Date().toDateString();
    const dailyBase = state.dailyXpDate === today ? state.dailyXp : 0;

    set({
      totalXp: newXp,
      currentLevel: newLevel,
      dailyXp: dailyBase + xp,
      dailyXpDate: today,
    });
    get().incrementStreak();
    get().saveToStorage();

    const badgesAfter = computeBadges(buildSnapshot(get()));
    const newBadgeIds = Array.from(badgesAfter).filter((id) => !badgesBefore.has(id));

    return { leveledUp: newLevel > state.currentLevel, newLevel, newBadgeIds };
  },

  isLessonCompleted: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.completed ?? false;
  },

  getLessonScore: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.score ?? 0;
  },

  markStoryComplete: (storyId: string) => {
    const state = get();
    const badgesBefore = computeBadges(buildSnapshot(state));

    const alreadyDone = state.completedStories[storyId];
    if (alreadyDone) {
      get().incrementStreak();
      get().saveToStorage();

      const badgesAfter = computeBadges(buildSnapshot(get()));
      const newBadgeIds = Array.from(badgesAfter).filter((id) => !badgesBefore.has(id));

      return { leveledUp: false, newLevel: state.currentLevel, newBadgeIds };
    }

    const xp = 15; // 15 XP reward for story completion
    const newXp = state.totalXp + xp;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
    const today = new Date().toDateString();
    const dailyBase = state.dailyXpDate === today ? state.dailyXp : 0;

    set({
      completedStories: {
        ...state.completedStories,
        [storyId]: true,
      },
      totalXp: newXp,
      currentLevel: newLevel,
      dailyXp: dailyBase + xp,
      dailyXpDate: today,
    });
    get().incrementStreak();
    get().saveToStorage();

    const badgesAfter = computeBadges(buildSnapshot(get()));
    const newBadgeIds = Array.from(badgesAfter).filter((id) => !badgesBefore.has(id));

    return { leveledUp: newLevel > state.currentLevel, newLevel, newBadgeIds };
  },

  isStoryComplete: (storyId: string) => {
    return get().completedStories[storyId] ?? false;
  },

  getStreakLevel: () => {
    return streakLevelFor(get().streakCount);
  },

  getDueVocabIds: () => selectDueVocabIds(get().vocabMastery),

  loadFromStorage: async () => {
    let loaded: PersistedProgress | null = null;
    let migrated = false;
    try {
      const raw = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
      const outcome = migrateProgress(raw);
      loaded = outcome.value;
      migrated = outcome.migrated;

      if (migrated && typeof raw === 'string') {
        // The v1 string is the only way back if the user rolls back to an older
        // build, so it is written before the new payload and only ever once.
        const existingBackup = await AsyncStorage.getItem(PROGRESS_BACKUP_KEY);
        if (existingBackup === null) {
          await AsyncStorage.setItem(PROGRESS_BACKUP_KEY, raw);
        }
        await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(outcome.value));
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    } finally {
      if (loaded) {
        const active = loaded.tracks[loaded.activeTrack];
        const inactiveTracks: InactiveTracks = {};
        for (const id of TRACK_IDS) {
          if (id !== loaded.activeTrack) inactiveTracks[id] = loaded.tracks[id];
        }
        set({
          displayName: loaded.displayName,
          avatarIcon: loaded.avatarIcon,
          avatarColor: loaded.avatarColor,
          totalXp: loaded.totalXp,
          // Derive level from XP so a stored level can never drift out of sync.
          currentLevel: Math.floor(loaded.totalXp / XP_PER_LEVEL) + 1,
          streakCount: loaded.streakCount,
          lastActiveDate: loaded.lastActiveDate,
          dailyXp: loaded.dailyXp,
          dailyXpDate: loaded.dailyXpDate,
          maxComboEver: loaded.maxComboEver,
          activeTrack: loaded.activeTrack,
          inactiveTracks,
          lessonProgress: active.lessonProgress,
          vocabMastery: active.vocabMastery,
          completedStories: active.completedStories,
          hydrated: true,
        });
        if (__DEV__) {
          const kmr = loaded.tracks.kmr;
          console.log(
            `[Fêrbûn Progress] v1→v2 migration ${migrated ? 'ran' : 'not needed'}; kmr carries ` +
              `${Object.keys(kmr.lessonProgress).length} lessons, ` +
              `${Object.keys(kmr.vocabMastery).length} vocab entries, ` +
              `${Object.keys(kmr.completedStories).length} stories; active track ${loaded.activeTrack}`,
          );
        }
      } else {
        set({ hydrated: true });
      }
    }
  },

  saveToStorage: async () => {
    const state = get();
    // The one window where a write could stamp schemaVersion 2 over live v1
    // data and skip the migration for good.
    if (!state.hydrated) return;
    try {
      const payload: PersistedProgress = {
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        displayName: state.displayName,
        avatarIcon: state.avatarIcon,
        avatarColor: state.avatarColor,
        totalXp: state.totalXp,
        currentLevel: state.currentLevel,
        streakCount: state.streakCount,
        lastActiveDate: state.lastActiveDate,
        dailyXp: state.dailyXp,
        dailyXpDate: state.dailyXpDate,
        maxComboEver: state.maxComboEver,
        activeTrack: state.activeTrack,
        tracks: composeTracks(
          state.activeTrack,
          {
            lessonProgress: state.lessonProgress,
            vocabMastery: state.vocabMastery,
            completedStories: state.completedStories,
          },
          state.inactiveTracks,
        ),
      };
      await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  },
}));
