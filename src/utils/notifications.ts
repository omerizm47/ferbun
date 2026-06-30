import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { vocabulary } from '../data/vocabulary';
import { Lang } from '../i18n/types';
import { STRINGS } from '../i18n/strings';

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
 * Reschedule a rolling queue of 7 daily reminders, each with a different "Word of the Day".
 * Cancels all previous schedules to avoid cluttering. If the user doesn't launch the app
 * for 7 days, notifications stop (preventing ghost spam, which is standard OS practice).
 */
export async function scheduleDailyReminder(
  hour: number,
  lang: Lang,
): Promise<void> {
  try {
    await ensureAndroidChannel();
    await Notifications.cancelAllScheduledNotificationsAsync();

    const t = STRINGS[lang];
    const now = new Date();

    for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
      const scheduledDate = new Date();
      scheduledDate.setDate(now.getDate() + dayOffset);
      scheduledDate.setHours(hour, 0, 0, 0);

      // Determine day of the year for a stable word selection
      const startOfYear = new Date(scheduledDate.getFullYear(), 0, 0);
      const diff = scheduledDate.getTime() - startOfYear.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const wordIndex = dayOfYear % vocabulary.length;
      const wordObj = vocabulary[wordIndex];

      const wordKu = wordObj.wordKu;
      const meaning = lang === 'tr' ? (wordObj.wordTr || wordObj.wordEn) : wordObj.wordEn;

      const title = t.reminders.wordOfDayTitle;
      const body = t.reminders.wordOfDayBody(wordKu, meaning);

      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          date: scheduledDate,
          channelId: CHANNEL_ID,
        } as any,
      });
    }
  } catch (e) {
    console.error('Failed to schedule daily reminders:', e);
  }
}

/** Remove all scheduled reminders (e.g. when the user turns reminders off). */
export async function cancelDailyReminder(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    /* no-op */
  }
}

