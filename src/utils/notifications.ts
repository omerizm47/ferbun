import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

/**
 * Thin, defensive wrapper around expo-notifications for the daily streak
 * reminder. Every call is best-effort and never throws into UI handlers — on
 * Expo Go (where the native module is limited) or the web build it simply
 * no-ops. Local notifications require a development or production build to
 * actually fire; the code below is identical on iOS and Android, with the one
 * Android-only call (notification channel) guarded by Platform.
 */

const CHANNEL_ID = 'daily-reminders';

// Foreground presentation (iOS 14+ uses banner/list, not the deprecated alert).
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
} catch {
  /* no-op (unsupported environment) */
}

/** Android requires an explicit channel; iOS ignores this entirely. */
export async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Daily reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: '#E85D00',
    });
  } catch {
    /* no-op */
  }
}

/**
 * Ask for permission. iOS will not re-prompt once denied, so callers should
 * offer a "open Settings" path when this resolves false. Returns true when
 * notifications may be shown (granted or provisional).
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const current = await Notifications.getPermissionsAsync();
    const isGranted = (p: Notifications.NotificationPermissionsStatus) =>
      p.granted || p.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

    if (isGranted(current)) return true;
    if (current.canAskAgain === false) return false;

    const requested = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    return isGranted(requested);
  } catch {
    return false;
  }
}

/**
 * (Re)schedule the single repeating daily reminder at the given local hour.
 * Cancels any existing schedule first so only one ever exists — staying far
 * under iOS's 64 pending-notification cap.
 */
export async function scheduleDailyReminder(
  hour: number,
  content: { title: string; body: string },
): Promise<void> {
  try {
    await ensureAndroidChannel();
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: { title: content.title, body: content.body },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute: 0,
        channelId: CHANNEL_ID,
      },
    });
  } catch {
    /* no-op */
  }
}

/** Remove the scheduled reminder (e.g. when the user turns reminders off). */
export async function cancelDailyReminder(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    /* no-op */
  }
}
