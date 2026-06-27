import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { WORD_AUDIO } from '../data/wordAudio';

/**
 * Defensive wrapper around expo-speech for reading Kurmanji aloud.
 *
 * Kurmanji Kurdish has no reliable on-device TTS voice — asking for language
 * 'ku' silently falls back to the device's default (usually English), which
 * mangles the Latin spelling. But Kurmanji's orthography maps closely to
 * Turkish phonology (c=j, ç=ch, ş=sh, j=zh, î=ee, û=oo, e≈e), and Turkish voices
 * ship on virtually every iOS/Android device — so a Turkish voice reads Kurmanji
 * far more accurately than the default fallback.
 *
 * We resolve the best available voice once (a real Kurdish voice if the device
 * has one, otherwise Turkish) and cache it. Everything is best-effort: a missing
 * engine or unsupported platform never throws into UI handlers.
 */

type Picked = { language: string; voice?: string };

let cached: Picked | null = null;
let inFlight: Promise<Picked> | null = null;

const FALLBACK: Picked = { language: 'tr-TR' };

async function pickVoice(): Promise<Picked> {
  if (cached) return cached;
  if (inFlight) return inFlight;
  inFlight = (async () => {
    let choice: Picked = FALLBACK;
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      // Among voices for a language prefix, prefer an Enhanced/Premium quality one.
      const bestFor = (prefix: string) => {
        const matches = voices.filter((v) => v.language?.toLowerCase().startsWith(prefix));
        if (matches.length === 0) return undefined;
        return matches.find((v) => String(v.quality).toLowerCase() !== 'default') ?? matches[0];
      };
      // A genuine Kurdish voice is ideal but rare; Turkish is the strong proxy.
      const chosen = bestFor('ku') ?? bestFor('tr');
      if (chosen) choice = { language: chosen.language, voice: chosen.identifier };
    } catch {
      /* fall back to language-only Turkish */
    }
    cached = choice;
    inFlight = null;
    return choice;
  })();
  return inFlight;
}

/** Warm the voice list early (e.g. on app start) so the first tap has no delay. */
export function primeSpeech(): void {
  if (Platform.OS === 'web') return;
  pickVoice().catch(() => {});
}

/**
 * Respell Kurmanji so a *Turkish* voice gets closer to the real sounds. Turkish
 * has no /x/, /w/, /q/ and reads bare "i" as /i/ rather than the Kurmanji
 * schwa-like vowel, so we nudge those toward the nearest Turkish grapheme.
 * Only used on the Turkish fallback — a genuine Kurdish voice is left untouched.
 *   î/û/ê → i/u/e (drop length) · i → ı (schwa) · x → h · w → v · q → k
 */
function respellForTurkish(s: string): string {
  return s
    .toLowerCase()
    .replace(/î/g, '\u0001') // protect long-i before the i → ı pass
    .replace(/i/g, 'ı')
    .replace(/\u0001/g, 'i')
    .replace(/x/g, 'h')
    .replace(/w/g, 'v')
    .replace(/q/g, 'k')
    .replace(/ê/g, 'e')
    .replace(/û/g, 'u');
}

export async function speakKurdish(text: string, slow: boolean = false): Promise<void> {
  if (Platform.OS === 'web') return; // web speech synthesizers lack Kurdish/consistent Turkish

  try {
    // Stop any active utterance first so rapid taps don't queue up.
    Speech.stop();
    const picked = await pickVoice();
    // Only respell when leaning on a Turkish voice; a real Kurdish voice knows the script.
    const usingTurkish = picked.language.toLowerCase().startsWith('tr');
    const spoken = usingTurkish ? respellForTurkish(text) : text;
    Speech.speak(spoken, {
      language: picked.language,
      voice: picked.voice,
      pitch: 1.0,
      rate: slow ? 0.5 : 0.82, // turtle mode vs. natural pace
    });
  } catch (e) {
    console.warn('[Fêrbûn Speech] Failed to speak:', e);
  }
}

// --- Bundled native-voice clips (preferred) with a TTS fallback ----------------
// Vocabulary words ship as pre-generated Kurmanji audio (assets/audio/words via
// WORD_AUDIO). We play the real clip when one exists, and only fall back to
// device TTS for anything without a clip (e.g. full story/lesson sentences).

const audioKey = (s: string) => s.normalize('NFC').toLowerCase().trim();

let currentClip: Audio.Sound | null = null;

/** True when a bundled pronunciation clip exists for this exact word. */
export function hasClip(text: string): boolean {
  return WORD_AUDIO[audioKey(text)] != null;
}

/**
 * Speak a Kurmanji word/phrase: play its bundled native clip if we have one
 * (slowed with pitch-correction for turtle mode), otherwise fall back to TTS.
 */
export async function pronounce(text: string, slow: boolean = false): Promise<void> {
  if (Platform.OS === 'web') return;
  const asset = WORD_AUDIO[audioKey(text)];
  if (asset == null) return speakKurdish(text, slow);

  try {
    Speech.stop(); // cut any in-flight TTS
    if (currentClip) {
      const prev = currentClip;
      currentClip = null;
      prev.unloadAsync().catch(() => {});
    }
    const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: false });
    currentClip = sound;
    await sound.setRateAsync(slow ? 0.6 : 1.0, true);
    sound.setOnPlaybackStatusUpdate((st) => {
      if (st.isLoaded && st.didJustFinish) {
        sound.unloadAsync().catch(() => {});
        if (currentClip === sound) currentClip = null;
      }
    });
    await sound.setPositionAsync(0);
    await sound.playAsync();
  } catch {
    await speakKurdish(text, slow);
  }
}
