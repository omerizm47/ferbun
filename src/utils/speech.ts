import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

/**
 * Clean, defensive wrapper around expo-speech.
 * Plays TTS in Kurdish. Since Kurdish voice engines ('ku') are supported on
 * modern iOS and Android versions but might be missing on some devices or
 * fallback platforms, we catch errors and handle them silently.
 */
export async function speakKurdish(text: string, slow: boolean = false): Promise<void> {
  if (Platform.OS === 'web') return; // web speech synthesizers often lack kurdish

  try {
    // Unconditionally stop any active speech without awaiting to avoid native bridge roundtrip delay
    Speech.stop();

    // Kurdish locale identifier. Modern iOS uses 'ku', Android might support 'ku-TR' or 'ku-IR'.
    // We try to pass 'ku' as it works as a fallback matching iOS native and Android.
    Speech.speak(text, {
      language: 'ku',
      pitch: 1.0,
      rate: slow ? 0.58 : 0.88, // normal is 0.88, slow (turtle mode) is 0.58
    });
  } catch (e) {
    console.warn('[Fêrbûn Speech] Failed to speak:', e);
  }
}
