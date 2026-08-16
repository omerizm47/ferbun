// Fêrbûn fixtures for the content self-check: deliberately malformed data,
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

import { ChromeSlot, PENDING } from '../src/data/chrome';
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

// Two entries sharing one id, which is what an id collision looks like once the
// corpus is split across separately authored theme files: both are well formed,
// both cite a real page, and both glosses are there. The id is the progress key,
// so shipping this pair puts two words behind one mastery row.
export const DUPLICATE_ID_ENTRIES: CitedEntry[] = [
  {
    id: 'fx-dup',
    taught: { wordKu: 'gull' },
    src: 'THK06:2',
    glossEn: 'flower',
    glossTr: 'çiçek',
  },
  {
    id: 'fx-dup',
    taught: { wordKu: 'xorr' },
    src: 'THK06:3',
    glossEn: 'blood',
    glossTr: 'kan',
  },
];

// Theme ids, where the same collision opens two tabs on one filtered list.
// Three ids with one repeat, so a rule that reported per occurrence rather than
// per repeated id would be visible.
export const DUPLICATE_THEME_IDS = ['family', 'body', 'family'];

export const FIXTURE_LESSONS = [
  { id: 'fx-l1', title: 'A', exerciseCount: 3 },
  { id: 'fx-l2', title: 'B', exerciseCount: 0 },
];

// FIXTURE_CKB_POLICY with one field changed, so the pair below isolates a
// single variable: whether the track claims to be finished.
export const FIXTURE_COMPLETE_POLICY: TrackPolicy = { ...FIXTURE_CKB_POLICY, status: 'complete' };

// An unauthored chrome table. Which slots these are does not matter; that none
// of them carries a string does.
export const PENDING_CHROME: Record<string, ChromeSlot> = {
  homeGreetMorning: PENDING,
  trueLabel: PENDING,
  badge_first_lesson: PENDING,
};

// One filled slot spelled with dark l (U+0142), the character the p. 88
// inventory rejects, and cited so the citation rule has nothing to add. This is
// a spelling the validator must refuse, not a proposed value for the slot: no
// Sorani wording is authored anywhere in this repository.
export const ILLEGAL_LETTER_CHROME: Record<string, ChromeSlot> = {
  trueLabel: { text: 'gu\u0142', src: 'THK06:2' },
};

// A captured v1 progress blob: the shape @ferbun_progress held through 1.3.0,
// with no version marker and the three maps flat at the top level.
// currentLevel is deliberately stale (1340 XP would derive level 14), so a
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

// Converter evidence. Every string below was read off the extracted pages of
// Thackston, not reconstructed from memory, and the accented letters are
// escaped so a lookalike cannot be pasted in unnoticed.

export interface ConversionPair {
  thackston: string;
  hawar: string;
  /** Where Thackston's transcription is printed. */
  src: string;
  /** Where the Kurmanji alphabet form is printed. */
  hawarSrc: string;
  gloss: string;
}

// Both sides of every pair are printed in the book, so these test the table as
// read, not just the scanner. The first four are the izâfa examples on p. 89,
// where Thackston gives the transcription and the Kurmanji form on one line:
// "ray giştî for râ i gishtî 'public opinion'" and "zarawey zanistî for zârâwa
// i zânistî 'scientific language.'" The izâfa i is dropped and written as a
// joined y after a vowel, which is a spelling convention of the running text
// and not a character mapping, so the pairing here is word by word.
// The rest take their Kurmanji side from the transcribed passage further down
// p. 89 and their Thackston side from wherever the book prints that word.
export const CONVERSION_GOLD: ConversionPair[] = [
  { thackston: 'r\u00E2', hawar: 'ra', src: 'THK06:89', hawarSrc: 'THK06:89', gloss: 'opinion' },
  { thackston: 'gisht\u00EE', hawar: 'gi\u015Ft\u00EE', src: 'THK06:89', hawarSrc: 'THK06:89', gloss: 'public, general' },
  { thackston: 'z\u00E2r\u00E2wa', hawar: 'zarawe', src: 'THK06:89', hawarSrc: 'THK06:89', gloss: 'language, terminology' },
  { thackston: 'z\u00E2nist\u00EE', hawar: 'zanist\u00EE', src: 'THK06:89', hawarSrc: 'THK06:89', gloss: 'scientific' },
  { thackston: 'ba\u0159ez', hawar: 'berr\u00EAz', src: 'THK06:169', hawarSrc: 'THK06:89', gloss: 'esteemed' },
  { thackston: 'laga\u0142', hawar: 'legell', src: 'THK06:39', hawarSrc: 'THK06:89', gloss: 'with' },
  // p. 89 carries the stem under a suffix, as pallpiştiyey.
  { thackston: 'p\u00E2\u0142pisht\u00EE', hawar: 'pallpi\u015Ft\u00EE', src: 'THK06:214', hawarSrc: 'THK06:89', gloss: 'backing, support' },
  { thackston: 'khoy', hawar: 'xoy', src: 'THK06:60', hawarSrc: 'THK06:89', gloss: 'his own' },
  { thackston: 'zher', hawar: 'j\u00EAr', src: 'THK06:116', hawarSrc: 'THK06:89', gloss: 'under' },
  { thackston: 'misogar', hawar: 'misoger', src: 'THK06:207', hawarSrc: 'THK06:89', gloss: 'insured' },
  { thackston: 'h\u00EEch', hawar: 'h\u00EE\u00E7', src: 'THK06:1', hawarSrc: 'THK06:89', gloss: 'nothing' },
];

// The transcriptions behind DIGRAPH_MINIMAL_PAIRS: khor/khoř and bar/bař from
// the ř entry on p. 3, gul/guł and chil/chił from the ł entry on p. 2. Only the
// transcription is printed; the Kurmanji forms are what the converter must
// produce, and comparing them against the committed pairs is the cross-check.
// The gloss is the join key because it is the one field both sides took from
// the same line of the book, so a mislabelled pair fails to match at all.
export const MINIMAL_PAIR_TRANSCRIPTIONS = [
  { plain: 'khor', digraph: 'kho\u0159', gloss: 'sun / blood', src: 'THK06:3' },
  { plain: 'bar', digraph: 'ba\u0159', gloss: 'breast / rug', src: 'THK06:3' },
  { plain: 'gul', digraph: 'gu\u0142', gloss: 'leper / flower', src: 'THK06:2' },
  { plain: 'chil', digraph: 'chi\u0142', gloss: 'forty / stalk', src: 'THK06:2' },
];

// Attested transcriptions with no printed Kurmanji counterpart anywhere in the
// book, so the expected form is this project's reading of the conversion table,
// not a second witness to it. Weaker than CONVERSION_GOLD and kept apart from
// it for that reason. They exist because these are the rows the paired material
// never exercises: gh, j, zh and ayn.
export const CONVERSION_UNWITNESSED = [
  { thackston: 'jw\u00E2n', hawar: 'cwan', src: 'THK06:193', gloss: 'pretty, beautiful' },
  { thackston: 'zhin', hawar: 'jin', src: 'THK06:96', gloss: 'wife' },
  { thackston: 'gham', hawar: 'xem', src: 'THK06:2', gloss: 'grief' },
  { thackston: 'kham', hawar: 'xem', src: 'THK06:2', gloss: 'grief, the borrowed variant' },
  // The two vowels are different rows: the plain a becomes e and only â becomes
  // a. Written out by hand this came back as mana, and the assertion caught it.
  { thackston: 'ma\u2018n\u00E2', hawar: 'mena', src: 'THK06:4', gloss: 'meaning' },
  { thackston: '\u2018arab', hawar: 'ereb', src: 'THK06:4', gloss: 'Arab' },
  { thackston: '\u0159oysht', hawar: 'rroy\u015Ft', src: 'THK06:3', gloss: 'he went' },
];

// Rows no word above exercises. Each is asserted only by converting the source
// token from the table itself, which shows the scanner reaches the row but adds
// no independent evidence that the row was read off the page correctly.
export const ROWS_WITHOUT_A_SAMPLE = ['d', 'f', 'k', 'q', '\u00FB', 'v'];

/** Characters the conversion table has no row for, which must throw. */
export const UNMAPPED_INPUT = [
  // Thackston's pharyngeal ḥ, p. 2. The conversion table has no row for it, so
  // whether a word takes h or ḥ is a reading decision and not a mapping one.
  { text: '\u1E25', why: 'h with dot below, U+1E25' },
  // tanaká 'tin can', p. 3, carrying the stress accent the table does not have.
  { text: 'tanak\u00E1', why: 'a with acute, U+00E1' },
  // An all-capitals run: the H cannot open a word, so no capitalised row applies.
  { text: 'ZHER', why: 'all capitals' },
];

