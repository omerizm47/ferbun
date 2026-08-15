import { useMemo } from 'react';
import { ChromeText, resolveChrome } from '../data/chrome';
import { getTrack } from '../data/tracks';
import { useProgressStore } from '../stores/progressStore';

/**
 * The taught-language chrome of the track the learner is currently studying.
 * Screens read their greeting, kickers and taught titles through this instead
 * of holding Kurmanji literals, so switching track re-renders them in the new
 * language. Unauthored slots resolve to '', so nothing renders in a language
 * the learner did not choose. Memoised on the track id, so the returned object
 * is stable across renders and safe as a hook dependency.
 */
export function useChrome(): ChromeText {
  const activeTrack = useProgressStore((s) => s.activeTrack);
  return useMemo(() => resolveChrome(getTrack(activeTrack).chrome), [activeTrack]);
}

/** Same chrome for callers that are not React components. */
export function getActiveChrome(): ChromeText {
  return resolveChrome(getTrack(useProgressStore.getState().activeTrack).chrome);
}
