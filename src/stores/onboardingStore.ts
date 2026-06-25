import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persisted flags (local-only; no account).
export const ONBOARDING_KEY = '@ferbun_onboarded';
export const CM_HOME_KEY = '@ferbun_cm_home_v1';
export const CM_LESSON_KEY = '@ferbun_cm_lesson_v1';

interface OnboardingState {
  /** null = not yet hydrated from storage; true = show intro slides; false = main app. */
  showOnboarding: boolean | null;
  hydrate: () => Promise<void>;
  /** Mark the intro slides as seen and enter the app. */
  complete: () => Promise<void>;
  /** Re-show the intro slides and reset first-run coach-marks. */
  replayIntro: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  showOnboarding: null,

  hydrate: async () => {
    try {
      const val = await AsyncStorage.getItem(ONBOARDING_KEY);
      set({ showOnboarding: val !== 'true' });
    } catch {
      set({ showOnboarding: true });
    }
  },

  complete: async () => {
    try { await AsyncStorage.setItem(ONBOARDING_KEY, 'true'); } catch {}
    set({ showOnboarding: false });
  },

  replayIntro: async () => {
    // Clearing the coach-mark keys means they re-trigger when the app
    // re-mounts after the replayed intro completes.
    try { await AsyncStorage.multiRemove([ONBOARDING_KEY, CM_HOME_KEY, CM_LESSON_KEY]); } catch {}
    set({ showOnboarding: true });
  },
}));
