import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_DAILY_GOAL_XP, DEFAULT_REMINDER_HOUR } from '../theme';

const STORAGE_KEY = '@ferbun_settings';

/**
 * Device-local preferences for the daily goal + reminder. Kept separate from
 * progress so toggling a reminder never rewrites the (larger) progress blob.
 * No accounts — everything stays on the device.
 */
interface SettingsState {
  notificationsEnabled: boolean;
  /** Local hour (0–23) the daily reminder fires. */
  reminderHour: number;
  /** Target XP per day for the goal ring. */
  dailyGoalXp: number;
  hydrated: boolean;

  setNotificationsEnabled: (enabled: boolean) => void;
  setReminderHour: (hour: number) => void;
  setDailyGoalXp: (xp: number) => void;
  loadFromStorage: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  notificationsEnabled: false,
  reminderHour: DEFAULT_REMINDER_HOUR,
  dailyGoalXp: DEFAULT_DAILY_GOAL_XP,
  hydrated: false,

  setNotificationsEnabled: (enabled) => {
    set({ notificationsEnabled: enabled });
    persist(get());
  },
  setReminderHour: (hour) => {
    set({ reminderHour: hour });
    persist(get());
  },
  setDailyGoalXp: (xp) => {
    set({ dailyGoalXp: xp });
    persist(get());
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          notificationsEnabled: !!parsed.notificationsEnabled,
          reminderHour:
            typeof parsed.reminderHour === 'number' ? parsed.reminderHour : DEFAULT_REMINDER_HOUR,
          dailyGoalXp:
            typeof parsed.dailyGoalXp === 'number' ? parsed.dailyGoalXp : DEFAULT_DAILY_GOAL_XP,
        });
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    } finally {
      set({ hydrated: true });
    }
  },
}));

function persist(s: SettingsState) {
  AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      notificationsEnabled: s.notificationsEnabled,
      reminderHour: s.reminderHour,
      dailyGoalXp: s.dailyGoalXp,
    }),
  ).catch(() => {});
}
