import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, VocabMastery } from '../data/types';
import { XP_PER_LEVEL, STREAK_LEVELS } from '../theme';

interface ProgressState {
  // User info
  displayName: string;
  totalXp: number;
  currentLevel: number;
  streakCount: number;
  lastActiveDate: string | null;

  // Progress
  lessonProgress: Record<string, UserProgress>;
  vocabMastery: Record<string, VocabMastery>;

  // Actions
  setDisplayName: (name: string) => void;
  completeLesson: (lessonId: string, score: number, xp: number) => void;
  updateVocabMastery: (vocabId: string, correct: boolean) => void;
  updateStreak: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => number;
  getStreakLevel: () => typeof STREAK_LEVELS[keyof typeof STREAK_LEVELS];
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const STORAGE_KEY = '@ferbun_progress';

export const useProgressStore = create<ProgressState>((set, get) => ({
  displayName: '',
  totalXp: 0,
  currentLevel: 1,
  streakCount: 0,
  lastActiveDate: null,
  lessonProgress: {},
  vocabMastery: {},

  setDisplayName: (name: string) => {
    set({ displayName: name });
    get().saveToStorage();
  },

  completeLesson: (lessonId: string, score: number, xp: number) => {
    const state = get();
    const existing = state.lessonProgress[lessonId];

    // Only update if new score is higher or lesson wasn't completed
    if (!existing || score > existing.score) {
      const newXp = state.totalXp + xp;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

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
      });
      get().updateStreak();
      get().saveToStorage();
    }
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
    const state = get();
    const today = new Date().toDateString();
    const lastActive = state.lastActiveDate;

    if (lastActive === today) return; // Already active today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreak = state.streakCount;
    if (lastActive === yesterday.toDateString()) {
      newStreak += 1; // Consecutive day
    } else if (lastActive !== today) {
      newStreak = 1; // Streak broken, start fresh
    }

    set({
      streakCount: newStreak,
      lastActiveDate: today,
    });
  },

  isLessonCompleted: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.completed ?? false;
  },

  getLessonScore: (lessonId: string) => {
    return get().lessonProgress[lessonId]?.score ?? 0;
  },

  getStreakLevel: () => {
    const streak = get().streakCount;
    if (streak >= STREAK_LEVELS.NEWROZ.min) return STREAK_LEVELS.NEWROZ;
    if (streak >= STREAK_LEVELS.BONFIRE.min) return STREAK_LEVELS.BONFIRE;
    if (streak >= STREAK_LEVELS.CAMPFIRE.min) return STREAK_LEVELS.CAMPFIRE;
    if (streak >= STREAK_LEVELS.SPARK.min) return STREAK_LEVELS.SPARK;
    return STREAK_LEVELS.CANDLE;
  },

  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        set({
          displayName: parsed.displayName || '',
          totalXp: parsed.totalXp || 0,
          currentLevel: parsed.currentLevel || 1,
          streakCount: parsed.streakCount || 0,
          lastActiveDate: parsed.lastActiveDate || null,
          lessonProgress: parsed.lessonProgress || {},
          vocabMastery: parsed.vocabMastery || {},
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
          totalXp: state.totalXp,
          currentLevel: state.currentLevel,
          streakCount: state.streakCount,
          lastActiveDate: state.lastActiveDate,
          lessonProgress: state.lessonProgress,
          vocabMastery: state.vocabMastery,
        })
      );
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  },
}));
