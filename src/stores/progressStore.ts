import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, VocabMastery } from '../data/types';
import { XP_PER_LEVEL, STREAK_LEVELS } from '../theme';

export type StreakLevel = typeof STREAK_LEVELS[keyof typeof STREAK_LEVELS];

/** What changed as a result of completing a lesson — drives the reward overlay. */
export interface LessonResult {
  leveledUp: boolean;
  newLevel: number;
  streakMilestone: StreakLevel | null;
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

  // Progress
  lessonProgress: Record<string, UserProgress>;
  vocabMastery: Record<string, VocabMastery>;
  completedStories: Record<string, boolean>;

  // Actions
  setDisplayName: (name: string) => void;
  setAvatar: (icon: string, color: string) => void;
  completeLesson: (lessonId: string, score: number, xp: number) => LessonResult;
  updateVocabMastery: (vocabId: string, correct: boolean) => void;
  updateStreak: () => void;
  checkStreakValidity: () => void;
  incrementStreak: () => void;
  completeVocabReview: (xp: number) => { leveledUp: boolean; newLevel: number };
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => number;
  markStoryComplete: (storyId: string) => { leveledUp: boolean; newLevel: number };
  isStoryComplete: (storyId: string) => boolean;
  getStreakLevel: () => typeof STREAK_LEVELS[keyof typeof STREAK_LEVELS];
  getDueVocabIds: () => string[];
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const STORAGE_KEY = '@ferbun_progress';

export const useProgressStore = create<ProgressState>((set, get) => ({
  displayName: '',
  avatarIcon: 'sunny',
  avatarColor: '#E85D00',
  totalXp: 0,
  currentLevel: 1,
  streakCount: 0,
  lastActiveDate: null,
  dailyXp: 0,
  dailyXpDate: null,
  lessonProgress: {},
  vocabMastery: {},
  completedStories: {},

  setDisplayName: (name: string) => {
    set({ displayName: name });
    get().saveToStorage();
  },

  setAvatar: (icon: string, color: string) => {
    set({ avatarIcon: icon, avatarColor: color });
    get().saveToStorage();
  },

  completeLesson: (lessonId: string, score: number, xp: number) => {
    const state = get();
    const existing = state.lessonProgress[lessonId];
    const prevLevel = state.currentLevel;
    const prevStreak = state.streakCount;
    let newLevel = prevLevel;

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
      });
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

    return { leveledUp: newLevel > prevLevel, newLevel, streakMilestone };
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

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastActive !== yesterdayStr) {
      set({ streakCount: 0 });
      get().saveToStorage();
    }
  },

  incrementStreak: () => {
    const state = get();
    const today = new Date().toDateString();
    const lastActive = state.lastActiveDate;

    if (lastActive === today) return; // Already updated today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = state.streakCount;
    if (lastActive === yesterdayStr) {
      newStreak += 1;
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

    return { leveledUp: newLevel > state.currentLevel, newLevel };
  },

  isLessonCompleted: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.completed ?? false;
  },

  getLessonScore: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.score ?? 0;
  },

  markStoryComplete: (storyId: string) => {
    const state = get();
    const alreadyDone = state.completedStories[storyId];
    if (alreadyDone) {
      get().incrementStreak();
      get().saveToStorage();
      return { leveledUp: false, newLevel: state.currentLevel };
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

    return { leveledUp: newLevel > state.currentLevel, newLevel };
  },

  isStoryComplete: (storyId: string) => {
    return get().completedStories[storyId] ?? false;
  },

  getStreakLevel: () => {
    return streakLevelFor(get().streakCount);
  },

  getDueVocabIds: () => selectDueVocabIds(get().vocabMastery),

  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        const totalXp = parsed.totalXp || 0;
        set({
          displayName: parsed.displayName || '',
          avatarIcon: parsed.avatarIcon || 'sunny',
          avatarColor: parsed.avatarColor || '#E85D00',
          totalXp,
          // Derive level from XP so a stored level can never drift out of sync.
          currentLevel: Math.floor(totalXp / XP_PER_LEVEL) + 1,
          streakCount: parsed.streakCount || 0,
          lastActiveDate: parsed.lastActiveDate || null,
          dailyXp: parsed.dailyXp || 0,
          dailyXpDate: parsed.dailyXpDate || null,
          lessonProgress: parsed.lessonProgress || {},
          vocabMastery: parsed.vocabMastery || {},
          completedStories: parsed.completedStories || {},
        });
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  },

  saveToStorage: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          displayName: state.displayName,
          avatarIcon: state.avatarIcon,
          avatarColor: state.avatarColor,
          totalXp: state.totalXp,
          currentLevel: state.currentLevel,
          streakCount: state.streakCount,
          lastActiveDate: state.lastActiveDate,
          dailyXp: state.dailyXp,
          dailyXpDate: state.dailyXpDate,
          lessonProgress: state.lessonProgress,
          vocabMastery: state.vocabMastery,
          completedStories: state.completedStories,
        })
      );
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  },
}));
