import * as Haptics from 'expo-haptics';

/**
 * Thin wrapper around expo-haptics that degrades gracefully.
 * Haptics are best-effort feedback — never let a missing motor or an
 * unsupported platform throw into UI handlers.
 */
function run(fn: () => Promise<void>) {
  try {
    fn().catch(() => {});
  } catch {
    /* no-op */
  }
}

export const haptics = {
  /** Light tap — option selection, card flip. */
  light: () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  /** Medium tap — primary button press. */
  medium: () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  /** Correct answer / lesson complete. */
  success: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  /** Wrong answer. */
  error: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
  /** Subtle selection change. */
  selection: () => run(() => Haptics.selectionAsync()),
};
