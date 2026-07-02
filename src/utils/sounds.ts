import { Audio } from 'expo-av';
import { useSettingsStore } from '../stores/settingsStore';

const SOUNDS = {
  click: require('../../assets/sounds/click.wav'),
  correct: require('../../assets/sounds/correct.mp3'),
  wrong: require('../../assets/sounds/wrong.mp3'),
  success: require('../../assets/sounds/success.mp3'),
};

const loadedSounds: Record<string, Audio.Sound> = {};

/**
 * Preload all UI feedback sounds into memory at app startup.
 * This guarantees zero playback latency on user interactions.
 */
export async function preloadSounds(): Promise<void> {
  try {
    // Configure audio to play even if user device has silent switch active (premium iOS mode)
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      allowsRecordingIOS: false,
    });

    for (const [key, value] of Object.entries(SOUNDS)) {
      if (!loadedSounds[key]) {
        const { sound } = await Audio.Sound.createAsync(value);
        loadedSounds[key] = sound;
      }
    }
  } catch (e) {
    console.warn('[Fêrbûn Sounds] Failed to preload sounds:', e);
  }
}

/**
 * Play a preloaded UI feedback sound effect instantly.
 */
export async function playSound(soundKey: keyof typeof SOUNDS): Promise<void> {
  const enabled = useSettingsStore.getState().soundEffectsEnabled;
  if (!enabled) return;

  try {
    const sound = loadedSounds[soundKey];
    if (sound) {
      // Rewind to beginning and play immediately
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } else {
      // Fallback load & play if not preloaded yet
      const { sound: newSound } = await Audio.Sound.createAsync(
        SOUNDS[soundKey],
        { shouldPlay: true }
      );
      loadedSounds[soundKey] = newSound;
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          newSound.unloadAsync();
          delete loadedSounds[soundKey];
        }
      });
    }
  } catch (e) {
    console.warn('[Fêrbûn Sounds] Failed to play sound:', e);
  }
}

/**
 * Unload all UI sounds from memory to free up resources.
 */
export async function unloadSounds(): Promise<void> {
  for (const key of Object.keys(loadedSounds)) {
    try {
      await loadedSounds[key].unloadAsync();
      delete loadedSounds[key];
    } catch (e) {
      console.warn('[Fêrbûn Sounds] Failed to unload sound:', key, e);
    }
  }
}
