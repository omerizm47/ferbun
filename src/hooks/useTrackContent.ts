import { TrackContent, getTrack } from '../data/tracks';
import { useProgressStore } from '../stores/progressStore';

/**
 * The corpus of the track the learner is currently studying. Screens read their
 * courses, stories and vocabulary through this instead of importing the
 * Kurmanji modules, so switching track re-renders them onto the new corpus.
 * The returned object is the track's own module-level content, stable across
 * renders, so it is safe as a hook dependency.
 */
export function useTrackContent(): TrackContent {
  const activeTrack = useProgressStore((s) => s.activeTrack);
  return getTrack(activeTrack).content;
}

/** Same corpus for callers that are not React components, such as notification scheduling. */
export function getActiveTrackContent(): TrackContent {
  return getTrack(useProgressStore.getState().activeTrack).content;
}
