// Fêrbûn: the persisted progress shape and its one-way migration to v2.
// Imports types and the track registry only: no zustand, no AsyncStorage, so
// the self-check exercises the real function instead of a copy of it.
//
// v1 (shipped through 1.3.0) stored the profile globals plus three flat maps
// under @ferbun_progress with no version marker. v2 keeps every global at the
// same top-level key with the same name and type and moves the three maps under
// tracks[id]. The migration never reads, recomputes or repairs a global, which
// is what makes XP, level, streak and the badge inputs structurally safe.

import { TrackId, isTrackId } from '../data/tracks';
import type { UserProgress, VocabMastery } from '../data/types';

export const PROGRESS_STORAGE_KEY = '@ferbun_progress';
/** The untouched v1 string, written once and never rewritten or deleted. */
export const PROGRESS_BACKUP_KEY = '@ferbun_progress_v1_backup';
export const PROGRESS_SCHEMA_VERSION = 2;

export interface TrackProgress {
  lessonProgress: Record<string, UserProgress>;
  vocabMastery: Record<string, VocabMastery>;
  completedStories: Record<string, boolean>;
}

export interface PersistedProgress {
  schemaVersion: number;
  displayName: string;
  avatarIcon: string;
  avatarColor: string;
  totalXp: number;
  currentLevel: number;
  streakCount: number;
  lastActiveDate: string | null;
  dailyXp: number;
  dailyXpDate: string | null;
  maxComboEver: number;
  activeTrack: TrackId;
  tracks: Record<TrackId, TrackProgress>;
}

/** Every track except the active one, whose maps live in the store's flat fields. */
export type InactiveTracks = Partial<Record<TrackId, TrackProgress>>;

export interface MigrationOutcome {
  value: PersistedProgress;
  migrated: boolean;
}

// Typed as a total Record, so a track id added to the registry fails to compile
// here until it has been given a storage slot.
const TRACK_SLOTS: Record<TrackId, true> = { kmr: true, ckb: true };

export const TRACK_IDS = Object.keys(TRACK_SLOTS) as TrackId[];

/** Everything shipped before v2 was Kurmanji, so that is where the flat maps land. */
const LEGACY_TRACK: TrackId = 'kmr';

export function emptyTrackProgress(): TrackProgress {
  return { lessonProgress: {}, vocabMastery: {}, completedStories: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Own enumerable keys only. A bare index would resolve 'toString' and every
// other Object.prototype member as if it were a stored track.
function ownEntries(value: unknown): Map<string, unknown> {
  return isRecord(value) ? new Map(Object.entries(value)) : new Map<string, unknown>();
}

// The store indexes into all three maps, so anything that is not an object
// normalises to {} rather than reaching a reader as undefined.
function asMap<T>(value: unknown): Record<string, T> {
  return isRecord(value) ? (value as Record<string, T>) : {};
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value !== '' ? value : fallback;
}

function nullableStr(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeTrackProgress(value: unknown): TrackProgress {
  const source = isRecord(value) ? value : {};
  return {
    lessonProgress: asMap<UserProgress>(source.lessonProgress),
    vocabMastery: asMap<VocabMastery>(source.vocabMastery),
    completedStories: asMap<boolean>(source.completedStories),
  };
}

export function readTrackProgress(source: unknown, id: TrackId): TrackProgress | undefined {
  const found = ownEntries(source).get(id);
  return found === undefined ? undefined : normalizeTrackProgress(found);
}

/** The `tracks` field a save writes: the active track's live maps plus the parked ones. */
export function composeTracks(
  activeTrack: TrackId,
  active: TrackProgress,
  inactive: InactiveTracks,
): Record<TrackId, TrackProgress> {
  const tracks = {} as Record<TrackId, TrackProgress>;
  for (const id of TRACK_IDS) {
    tracks[id] =
      id === activeTrack ? normalizeTrackProgress(active) : readTrackProgress(inactive, id) ?? emptyTrackProgress();
  }
  return tracks;
}

export function defaultProgress(): PersistedProgress {
  return {
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    displayName: '',
    avatarIcon: 'sunny',
    avatarColor: '#E85D00',
    totalXp: 0,
    currentLevel: 1,
    streakCount: 0,
    lastActiveDate: null,
    dailyXp: 0,
    dailyXpDate: null,
    maxComboEver: 0,
    activeTrack: LEGACY_TRACK,
    tracks: composeTracks(LEGACY_TRACK, emptyTrackProgress(), {}),
  };
}

function parseRaw(raw: unknown): Record<string, unknown> | null {
  if (typeof raw === 'string') {
    try {
      const parsed: unknown = JSON.parse(raw);
      return isRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return isRecord(raw) ? raw : null;
}

/**
 * Reads a stored blob (the raw string or an already-parsed value) and returns
 * the v2 payload plus whether anything was actually migrated. `migrated: false`
 * means the caller must not write: nothing to convert, so no backup either.
 */
export function migrateProgress(raw: unknown): MigrationOutcome {
  const source = parseRaw(raw);
  if (!source) return { value: defaultProgress(), migrated: false };

  const version = num(source.schemaVersion, 0);
  const current = version >= PROGRESS_SCHEMA_VERSION;
  const flat = normalizeTrackProgress(source);

  const tracks = {} as Record<TrackId, TrackProgress>;
  for (const id of TRACK_IDS) {
    const stored = readTrackProgress(source.tracks, id) ?? emptyTrackProgress();
    tracks[id] =
      current || id !== LEGACY_TRACK
        ? stored
        : {
            // A per-track entry already written for a key wins over the flat one.
            lessonProgress: { ...flat.lessonProgress, ...stored.lessonProgress },
            vocabMastery: { ...flat.vocabMastery, ...stored.vocabMastery },
            completedStories: { ...flat.completedStories, ...stored.completedStories },
          };
  }

  return {
    value: {
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      displayName: str(source.displayName, ''),
      avatarIcon: str(source.avatarIcon, 'sunny'),
      avatarColor: str(source.avatarColor, '#E85D00'),
      totalXp: num(source.totalXp, 0),
      currentLevel: num(source.currentLevel, 1),
      streakCount: num(source.streakCount, 0),
      lastActiveDate: nullableStr(source.lastActiveDate),
      dailyXp: num(source.dailyXp, 0),
      dailyXpDate: nullableStr(source.dailyXpDate),
      maxComboEver: num(source.maxComboEver, 0),
      activeTrack: isTrackId(source.activeTrack) ? source.activeTrack : LEGACY_TRACK,
      tracks,
    },
    migrated: !current,
  };
}
