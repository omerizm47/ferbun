// Fêrbûn — fixtures for the content self-check: deliberately malformed data,
// one entry per rule, so every rule can be seen firing on its own.
// Nothing under src/ imports this file, so it is not reachable from the app
// entry graph, never bundled and never shipped.
//
// Taught-language forms come from Thackston, Sorani Kurdish: A Reference
// Grammar, converted through his Sorani/Kurmanji conversion table (p. 88).
// gull and xorr are members of the minimal pairs at p. 2; rêkkewtin and berrêz
// are lifted from the transcribed Latin samples at p. 89. Accented letters are
// escaped so a lookalike cannot be pasted in unnoticed.
//
// The glosses below exist only to satisfy the GLOSS rule. They are fixture
// data, not learner content, and no speaker has reviewed them.

import { SORANI_LATIN } from '../src/data/orthography';
import { CitedEntry, TrackPolicy } from '../src/data/validate';
import { ProgressSnapshot, TrackSnapshot } from '../src/utils/badges';

// A policy no production code owns, so tightening it here cannot change what
// the app validates.
export const FIXTURE_CKB_POLICY: TrackPolicy = {
  id: 'ckb',
  label: 'Sorani',
  status: 'in_progress',
  orthography: SORANI_LATIN,
  requireCitation: true,
  requireBothGlosses: true,
};

/** Each entry is engineered to produce exactly one issue under FIXTURE_CKB_POLICY. */
export const BAD_ENTRIES: { expect: string; entry: CitedEntry }[] = [
  {
    // Dark l as U+0142: the character this orthography deliberately rejects.
    expect: 'ORTH-01',
    entry: {
      id: 'fx-orth01',
      taught: { wordKu: 'gu\u0142' },
      src: 'THK06:2',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Decomposed ê (e + U+0302), legal once composed.
    expect: 'ORTH-02',
    entry: {
      id: 'fx-orth02',
      taught: { wordKu: 'berre\u0302z' },
      src: 'THK06:89',
      glossEn: 'esteemed',
      glossTr: 'sayın',
    },
  },
  {
    // A field left blank: two spaces, escaped because whitespace is invisible
    // on disk. Cited and glossed, so ORTH-03 is the only rule with anything to
    // say about it.
    expect: 'ORTH-03',
    entry: {
      id: 'fx-orth03',
      taught: { wordKu: '\u0020\u0020' },
      src: 'THK06:2',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    expect: 'SRC-01',
    entry: {
      id: 'fx-src01',
      taught: { wordKu: 'gull' },
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Unknown source id.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02a',
      taught: { wordKu: 'gull' },
      src: 'XYZ99:12',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // §99 is outside the volume's numbered grammar sections.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02b',
      taught: { wordKu: 'gull' },
      src: 'THK06:\u00A799',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // Prose locator, not a page, a page range or a §section.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02c',
      taught: { wordKu: 'gull' },
      src: 'THK06:page 88',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    // A member of Object.prototype, which an unguarded registry lookup would
    // resolve as if it were a declared source.
    expect: 'SRC-02',
    entry: {
      id: 'fx-src02d',
      taught: { wordKu: 'gull' },
      src: 'toString:88',
      glossEn: 'flower',
      glossTr: 'çiçek',
    },
  },
  {
    expect: 'GLOSS-01',
    entry: {
      id: 'fx-gloss01a',
      taught: { wordKu: 'gull' },
      src: 'THK06:2',
      glossEn: 'flower',
      glossTr: '',
    },
  },
  {
    expect: 'GLOSS-01',
    entry: {
      id: 'fx-gloss01b',
      taught: { wordKu: 'gull' },
      src: 'THK06:2',
      glossTr: 'çiçek',
    },
  },
];

// ll, rr and a genuine doubled kk, all of which must pass unflagged.
export const CLEAN_ENTRY: CitedEntry = {
  id: 'fx-clean',
  taught: { wordKu: 'gull', contrastKu: 'xorr', sampleKu: 'r\u00EAkkewtin' },
  src: 'THK06:2',
  glossEn: 'flower',
  glossTr: 'çiçek',
};

export const FIXTURE_LESSONS = [
  { id: 'fx-l1', title: 'A', exerciseCount: 3 },
  { id: 'fx-l2', title: 'B', exerciseCount: 0 },
];

// A captured v1 progress blob: the shape @ferbun_progress held through 1.3.0,
// with no version marker and the three maps flat at the top level.
// currentLevel is deliberately stale — 1340 XP would derive level 14 — so a
// migration that recomputed any global instead of copying it would be caught.
export const V1_PROGRESS: Record<string, unknown> = {
  displayName: 'Roj\u00EEn',
  avatarIcon: 'flower',
  avatarColor: '#2E7D32',
  totalXp: 1340,
  currentLevel: 7,
  streakCount: 9,
  lastActiveDate: 'Wed Aug 13 2025',
  dailyXp: 60,
  dailyXpDate: 'Wed Aug 13 2025',
  maxComboEver: 12,
  lessonProgress: {
    l1_1: { lessonId: 'l1_1', completed: true, score: 100, completedAt: '2025-08-11T18:04:00.000Z' },
    l1_2: { lessonId: 'l1_2', completed: true, score: 80, completedAt: '2025-08-12T19:20:00.000Z' },
  },
  vocabMastery: {
    v1: {
      vocabId: 'v1',
      masteryLevel: 3,
      nextReviewAt: '2025-08-20T18:04:00.000Z',
      lastReviewedAt: '2025-08-13T18:04:00.000Z',
    },
  },
  completedStories: { s1: true },
};

/** Every global the migration must carry across untouched. */
export const V1_GLOBAL_KEYS = [
  'displayName',
  'avatarIcon',
  'avatarColor',
  'totalXp',
  'currentLevel',
  'streakCount',
  'lastActiveDate',
  'dailyXp',
  'dailyXpDate',
  'maxComboEver',
];

// Flat maps and a half-written tracks key in the same blob. l1_1 exists on both
// sides with different scores; l1_2 and the vocab entry exist only flat; l2_1
// only under the track.
export const MIXED_PROGRESS: Record<string, unknown> = {
  ...V1_PROGRESS,
  tracks: {
    kmr: {
      lessonProgress: {
        l1_1: { lessonId: 'l1_1', completed: true, score: 60, completedAt: '2025-08-14T09:00:00.000Z' },
        l2_1: { lessonId: 'l2_1', completed: true, score: 90, completedAt: '2025-08-14T09:30:00.000Z' },
      },
    },
  },
};

/** activeTrack set to a member of Object.prototype, which a bare index would resolve. */
export const INHERITED_TRACK_PROGRESS: Record<string, unknown> = {
  ...V1_PROGRESS,
  activeTrack: 'toString',
};

// What a rolled-back 1.3.0 build would write after reading a v2 blob: globals
// intact, the three maps gone, and still unversioned.
export const ROLLBACK_V1_PROGRESS: Record<string, unknown> = {
  ...V1_PROGRESS,
  lessonProgress: {},
  vocabMastery: {},
  completedStories: {},
};

// Badge fixtures. Written out by loop rather than by hand: the counts are the
// only thing that matters and a 50-entry literal would hide them.
function lessonsDone(count: number): TrackSnapshot['lessonProgress'] {
  const out: TrackSnapshot['lessonProgress'] = {};
  // One perfect score, so perfect_lesson is in the earned set and a rule that
  // dropped it would be visible.
  for (let i = 1; i <= count; i += 1) out[`l${i}`] = { completed: true, score: i === 1 ? 100 : 80 };
  return out;
}

function wordsMastered(count: number): TrackSnapshot['vocabMastery'] {
  const out: TrackSnapshot['vocabMastery'] = {};
  for (let i = 1; i <= count; i += 1) out[`v${i}`] = { masteryLevel: 5 };
  return out;
}

function storiesRead(count: number): TrackSnapshot['completedStories'] {
  const out: TrackSnapshot['completedStories'] = {};
  for (let i = 1; i <= count; i += 1) out[`s${i}`] = true;
  return out;
}

/** A learner who has finished Kurmanji outright: every badge in the catalogue earned. */
export const FULL_KMR_TRACK: TrackSnapshot = {
  lessonProgress: lessonsDone(12),
  vocabMastery: wordsMastered(50),
  completedStories: storiesRead(3),
  totalLessons: 12,
  totalStories: 3,
};

/** Sorani as it ships today: registered, with nothing authored in it yet. */
export const EMPTY_CKB_TRACK: TrackSnapshot = {
  lessonProgress: {},
  vocabMastery: {},
  completedStories: {},
  totalLessons: 0,
  totalStories: 0,
};

/** Sorani once it has a corpus and the learner has started but not finished it. */
export const PARTIAL_CKB_TRACK: TrackSnapshot = {
  lessonProgress: lessonsDone(2),
  vocabMastery: {},
  completedStories: {},
  totalLessons: 5,
  totalStories: 2,
};

export const FULL_KMR_SNAPSHOT: ProgressSnapshot = {
  tracks: [FULL_KMR_TRACK],
  streakCount: 30,
  maxComboEver: 12,
};
