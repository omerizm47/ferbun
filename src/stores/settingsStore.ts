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
  soundEffectsEnabled: boolean;
  hapticsEnabled: boolean;
  cardDirection: 'ku_to_tr_en' | 'tr_en_to_ku';
  hydrated: boolean;

  setNotificationsEnabled: (enabled: boolean) => void;
  setReminderHour: (hour: number) => void;
  setDailyGoalXp: (xp: number) => void;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setCardDirection: (dir: 'ku_to_tr_en' | 'tr_en_to_ku') => void;
  loadFromStorage: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  notificationsEnabled: false,
  reminderHour: DEFAULT_REMINDER_HOUR,
  dailyGoalXp: DEFAULT_DAILY_GOAL_XP,
  soundEffectsEnabled: true,
  hapticsEnabled: true,
  cardDirection: 'ku_to_tr_en',
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
  setSoundEffectsEnabled: (enabled) => {
    set({ soundEffectsEnabled: enabled });
    persist(get());
  },
  setHapticsEnabled: (enabled) => {
    set({ hapticsEnabled: enabled });
    persist(get());
  },
  setCardDirection: (dir) => {
    set({ cardDirection: dir });
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
          soundEffectsEnabled: parsed.soundEffectsEnabled !== false,
          hapticsEnabled: parsed.hapticsEnabled !== false,
          cardDirection: parsed.cardDirection === 'tr_en_to_ku' ? 'tr_en_to_ku' : 'ku_to_tr_en',
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
      soundEffectsEnabled: s.soundEffectsEnabled,
      hapticsEnabled: s.hapticsEnabled,
      cardDirection: s.cardDirection,
    }),
  ).catch(() => {});
}
