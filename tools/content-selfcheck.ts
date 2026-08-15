// Fêrbûn content self-check. A plain runner, no test framework: it compiles
// with the rest of the data layer and runs under bare Node.
// It proves each validator rule fires on its own fixture and on nothing else,
// that every new rule stays inert for the Kurmanji track, that the shipped
// Kurmanji corpus is still clean, that the grader does not fold the ll/rr
// digraphs (Thackston p. 88) into plain l and r, that the track registry
// answers an unknown id with Kurmanji instead of an inherited prototype member,
// that the two taught-chrome tables hold the same slots and no track calling
// itself complete holds an unauthored one, and that the v1→v2 progress
// migration carries a real user's stored blob across without touching a single
// global.
// All of it is shape, legality and provenance. Nothing here establishes that a
// form is correct, idiomatic or current: that needs a speaker.
// runContentValidation() is deliberately not called: it reads __DEV__, which
// does not exist in Node.

import { readFileSync } from 'fs';
import { CKB_CHROME, KMR_CHROME } from '../src/data/chrome';
import { DIGRAPH_MINIMAL_PAIRS, SORANI_LATIN, checkOrthography } from '../src/data/orthography';
import { ALL_BADGES } from '../src/data/badges';
import { TrackId, getTrack, isTrackId } from '../src/data/tracks';
import {
  CKB_POLICY,
  ContentIssue,
  KMR_POLICY,
  checkChrome,
  checkCitedEntries,
  checkLessonCoverage,
  validateContent,
  validateContentDetailed,
} from '../src/data/validate';
import {
  PROGRESS_BACKUP_KEY,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  PersistedProgress,
  composeTracks,
  defaultProgress,
  emptyTrackProgress,
  migrateProgress,
  readTrackProgress,
} from '../src/stores/progressMigration';
import { checkTypedAnswer } from '../src/utils/answers';
import { TrackSnapshot, computeBadges } from '../src/utils/badges';
import {
  BAD_ENTRIES,
  CLEAN_ENTRY,
  EMPTY_CKB_TRACK,
  FIXTURE_CKB_POLICY,
  FIXTURE_COMPLETE_POLICY,
  FIXTURE_LESSONS,
  FULL_KMR_SNAPSHOT,
  FULL_KMR_TRACK,
  ILLEGAL_LETTER_CHROME,
  INHERITED_TRACK_PROGRESS,
  MIXED_PROGRESS,
  PARTIAL_CKB_TRACK,
  PENDING_CHROME,
  ROLLBACK_V1_PROGRESS,
  V1_GLOBAL_KEYS,
  V1_PROGRESS,
} from './content-selfcheck.fixture';

const failures: string[] = [];
let total = 0;

function check(label: string, ok: boolean, detail?: string): void {
  total += 1;
  if (ok) {
    console.log(`  pass  ${label}`);
    return;
  }
  const line = detail ? `${label} (got ${detail})` : label;
  failures.push(line);
  console.log(`  FAIL  ${line}`);
}

function summarise(issues: ContentIssue[]): string {
  if (issues.length === 0) return 'no issues';
  return issues.map((i) => `${i.severity}/${i.rule ?? 'none'} ${i.message}`).join(' | ');
}

// 1. Each rule fires on its own fixture, exactly once, as an error.
for (const { expect, entry } of BAD_ENTRIES) {
  const issues = checkCitedEntries([entry], FIXTURE_CKB_POLICY);
  const ok =
    issues.length === 1 && issues[0].severity === 'error' && issues[0].message.startsWith(`[${expect}]`);
  check(`${expect} fires alone on ${entry.id}`, ok, summarise(issues));
}

// 2. ll, rr and a genuine doubled kk all pass unflagged.
const cleanIssues = checkCitedEntries([CLEAN_ENTRY], FIXTURE_CKB_POLICY);
check('clean entry raises nothing', cleanIssues.length === 0, summarise(cleanIssues));

// 3. None of the new obligations apply to a track that does not opt in.
const kmrEntryIssues = checkCitedEntries(BAD_ENTRIES.map((b) => b.entry), KMR_POLICY);
check('new rules are inert under KMR_POLICY', kmrEntryIssues.length === 0, summarise(kmrEntryIssues));

// 4. An in-progress track reports empty lessons as one note, not as errors.
const ckbCoverage = checkLessonCoverage(FIXTURE_LESSONS, FIXTURE_CKB_POLICY);
check(
  'in-progress track reports one TRACK-01 note',
  ckbCoverage.length === 1 &&
    ckbCoverage[0].severity === 'info' &&
    ckbCoverage[0].rule === 'TRACK-01' &&
    ckbCoverage[0].message.includes('1 of 2 lessons authored'),
  summarise(ckbCoverage),
);

// 5. A complete track keeps the pre-existing error wording, character for character.
const kmrCoverage = checkLessonCoverage(FIXTURE_LESSONS, KMR_POLICY);
check(
  'complete track keeps the legacy empty-lesson wording',
  kmrCoverage.length === 1 &&
    kmrCoverage[0].severity === 'error' &&
    kmrCoverage[0].message === 'Lesson "fx-l2" (B) has no exercises.',
  summarise(kmrCoverage),
);

// 6. Regression: the shipped corpus is unaffected by any of the above.
const corpusErrors = validateContent();
check('shipped corpus has no content errors', corpusErrors.length === 0, corpusErrors.join(' | '));
const corpusNotes = validateContentDetailed().filter((i) => i.severity === 'info');
check('shipped corpus raises no info notes', corpusNotes.length === 0, summarise(corpusNotes));

// 7. Digraph no-fold guard on the grader, run over every minimal pair
// Thackston records at p. 2. ll and rr are separate phonemes (THK06:88), so a
// grader that folded them would accept 'gul' for 'gull', leper for flower.
for (const pair of DIGRAPH_MINIMAL_PAIRS) {
  check(
    `checkTypedAnswer('${pair.plain}', '${pair.digraph}') is false (${pair.gloss})`,
    checkTypedAnswer(pair.plain, pair.digraph) === false,
  );
}

// 8. ORTH-03 closes a case that was silent, not one another rule already had:
// whitespace is NFC clean and every space is in the legal inventory, so the
// pre-ORTH-03 checks pass it and report a blank field as sound content.
const BLANK_SAMPLE = '\u0020\u0020';
const legalChars = new Set([
  ...SORANI_LATIN.letters,
  ...SORANI_LATIN.lettersUpper,
  ...SORANI_LATIN.punctuation,
]);
check(
  'the blank sample passes every check that predates ORTH-03',
  BLANK_SAMPLE.normalize('NFC') === BLANK_SAMPLE && [...BLANK_SAMPLE].every((ch) => legalChars.has(ch)),
);
const blankIssues = checkOrthography(BLANK_SAMPLE, SORANI_LATIN);
check(
  'ORTH-03 is the only issue raised on the blank sample',
  blankIssues.length === 1 && blankIssues[0].code === 'ORTH-03',
  blankIssues.map((i) => i.code).join(',') || 'no issues',
);

// 9. Track registry. An object literal would resolve every Object.prototype
// member as a registered track, which is why the registry is a Map.
const literalRegistry: Record<string, unknown> = { kmr: 1, ckb: 1 };
const inheritedId = 'toString';
check(
  'an object-literal registry resolves an inherited member as a track',
  Boolean(literalRegistry[inheritedId]),
);
check(`getTrack('${inheritedId}') falls back to kmr`, getTrack(inheritedId).id === 'kmr', getTrack(inheritedId).id);
check(`isTrackId('${inheritedId}') is false`, isTrackId(inheritedId) === false);
check("isTrackId('ckb') is true", isTrackId('ckb') === true);

const ckb = getTrack('ckb');
check('ckb is registered as in_progress', ckb.policy.status === 'in_progress', ckb.policy.status);
check(
  'ckb is bound to the Thackston p. 88 alphabet',
  ckb.policy.orthography === SORANI_LATIN,
  ckb.policy.orthography?.id ?? 'null',
);

// 10. An unauthored track answers every accessor rather than throwing, so a
// screen rendering it gets an empty state instead of a crash.
const ckbContent = ckb.content;
let ckbEmpty = false;
let ckbThrew = '';
try {
  ckbEmpty =
    ckbContent.courses.length === 0 &&
    ckbContent.stories.length === 0 &&
    ckbContent.vocabulary.length === 0 &&
    ckbContent.vocabThemes.length === 0 &&
    ckbContent.getCourseById('c1') === undefined &&
    ckbContent.getUnitById('u1') === undefined &&
    ckbContent.getLessonById('l1_1') === undefined &&
    ckbContent.getTotalLessons() === 0 &&
    ckbContent.getStoryById('s1') === undefined &&
    ckbContent.getVocabByTheme('greetings').length === 0 &&
    ckbContent.getVocabById('v1') === undefined &&
    ckbContent.getExercisesForLesson('l1_1').length === 0 &&
    ckbContent.getOrderedExercisesForLesson('l1_1').length === 0 &&
    ckbContent.getLessonTeachCards('l1_1').length === 0;
} catch (err) {
  ckbThrew = err instanceof Error ? err.message : String(err);
}
check(
  'every ckb accessor returns empty or undefined without throwing',
  ckbEmpty && ckbThrew === '',
  ckbThrew || 'an accessor returned a value',
);

// 11. Storage. The stub replays loadFromStorage's exact sequence over the real
// migrateProgress: read, migrate, conditional backup write, single payload
// write. Nothing here is a re-implementation of the migration itself.
class MemoryStorage {
  private items = new Map<string, string>();
  private writes = new Map<string, number>();

  getItem(key: string): string | null {
    const found = this.items.get(key);
    return found === undefined ? null : found;
  }

  setItem(key: string, value: string): void {
    this.items.set(key, value);
    this.writes.set(key, (this.writes.get(key) ?? 0) + 1);
  }

  writeCount(key: string): number {
    return this.writes.get(key) ?? 0;
  }
}

function replayLoad(storage: MemoryStorage, backupOnce = true): { value: PersistedProgress; migrated: boolean } {
  const raw = storage.getItem(PROGRESS_STORAGE_KEY);
  const { value, migrated } = migrateProgress(raw);
  if (migrated && typeof raw === 'string') {
    if (!backupOnce || storage.getItem(PROGRESS_BACKUP_KEY) === null) {
      storage.setItem(PROGRESS_BACKUP_KEY, raw);
    }
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(value));
  }
  return { value, migrated };
}

// What saveToStorage would write with the store still at its initial state,
// which is the only state reachable before hydration. `gated` is the hydrated
// check; passing false shows what the write would have destroyed without it.
function replaySave(storage: MemoryStorage, hydrated: boolean, gated: boolean): boolean {
  if (gated && !hydrated) return false;
  const state = defaultProgress();
  const payload: PersistedProgress = {
    ...state,
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    tracks: composeTracks(state.activeTrack, emptyTrackProgress(), {}),
  };
  storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
  return true;
}

function globalsOf(source: Record<string, unknown>): string {
  return V1_GLOBAL_KEYS.map((key) => `${key}=${JSON.stringify(source[key])}`).join(';');
}

const v1Raw = JSON.stringify(V1_PROGRESS);
const upgraded = new MemoryStorage();
upgraded.setItem(PROGRESS_STORAGE_KEY, v1Raw);
const firstLoad = replayLoad(upgraded);

check('a v1 blob reports migrated', firstLoad.migrated === true);
check(
  'every global crosses the migration byte for byte',
  globalsOf(firstLoad.value as unknown as Record<string, unknown>) === globalsOf(V1_PROGRESS),
  globalsOf(firstLoad.value as unknown as Record<string, unknown>),
);
check(
  'the three v1 maps land under tracks.kmr',
  JSON.stringify(firstLoad.value.tracks.kmr) ===
    JSON.stringify({
      lessonProgress: V1_PROGRESS.lessonProgress,
      vocabMastery: V1_PROGRESS.vocabMastery,
      completedStories: V1_PROGRESS.completedStories,
    }),
  JSON.stringify(firstLoad.value.tracks.kmr),
);
check(
  'ckb is seeded empty',
  JSON.stringify(firstLoad.value.tracks.ckb) === JSON.stringify(emptyTrackProgress()),
  JSON.stringify(firstLoad.value.tracks.ckb),
);
check('a v1 blob activates kmr', firstLoad.value.activeTrack === 'kmr', firstLoad.value.activeTrack);
check('the backup holds the untouched v1 string', upgraded.getItem(PROGRESS_BACKUP_KEY) === v1Raw);

const afterFirst = upgraded.getItem(PROGRESS_STORAGE_KEY);
check(
  'the stored payload carries the v2 marker',
  (JSON.parse(afterFirst ?? 'null') as { schemaVersion?: number } | null)?.schemaVersion === PROGRESS_SCHEMA_VERSION,
);
const secondLoad = replayLoad(upgraded);
check('a second load has nothing to migrate', secondLoad.migrated === false);
check('a second load leaves the stored string identical', upgraded.getItem(PROGRESS_STORAGE_KEY) === afterFirst);
check('a second load does not touch the backup', upgraded.writeCount(PROGRESS_BACKUP_KEY) === 1);

// A rollback to 1.3.0 writes v1 again, so a later launch migrates a second
// time. The backup must still hold the original, not the emptied rewrite.
const rollbackRaw = JSON.stringify(ROLLBACK_V1_PROGRESS);
const guarded = new MemoryStorage();
guarded.setItem(PROGRESS_STORAGE_KEY, v1Raw);
replayLoad(guarded);
guarded.setItem(PROGRESS_STORAGE_KEY, rollbackRaw);
replayLoad(guarded);
check(
  'the backup survives a second migration after a rollback',
  guarded.getItem(PROGRESS_BACKUP_KEY) === v1Raw && guarded.writeCount(PROGRESS_BACKUP_KEY) === 1,
);

const unguarded = new MemoryStorage();
unguarded.setItem(PROGRESS_STORAGE_KEY, v1Raw);
replayLoad(unguarded, false);
unguarded.setItem(PROGRESS_STORAGE_KEY, rollbackRaw);
replayLoad(unguarded, false);
check(
  'without the write-once rule that rollback would replace the backup',
  unguarded.getItem(PROGRESS_BACKUP_KEY) === rollbackRaw,
);

const fresh = new MemoryStorage();
const freshLoad = replayLoad(fresh);
check('a fresh install has nothing to migrate', freshLoad.migrated === false);
check('a fresh install loads the defaults', JSON.stringify(freshLoad.value) === JSON.stringify(defaultProgress()));
check(
  'a fresh install writes neither key',
  fresh.getItem(PROGRESS_STORAGE_KEY) === null && fresh.getItem(PROGRESS_BACKUP_KEY) === null,
);
const nullOutcome = migrateProgress(null);
check(
  'migrateProgress(null) is the fresh-install answer',
  nullOutcome.migrated === false && JSON.stringify(nullOutcome.value) === JSON.stringify(defaultProgress()),
);

// A half-written blob: flat maps and a tracks key at the same time.
const mixed = migrateProgress(JSON.stringify(MIXED_PROGRESS));
const mixedLessons = mixed.value.tracks.kmr.lessonProgress;
check('a per-track entry wins over the flat one', mixedLessons.l1_1?.score === 60, String(mixedLessons.l1_1?.score));
check('a flat-only lesson survives the merge', mixedLessons.l1_2?.score === 80, String(mixedLessons.l1_2?.score));
check('a track-only lesson survives the merge', mixedLessons.l2_1?.score === 90, String(mixedLessons.l2_1?.score));
check(
  'the flat vocab map survives an absent per-track one',
  Object.keys(mixed.value.tracks.kmr.vocabMastery).length === 1,
  String(Object.keys(mixed.value.tracks.kmr.vocabMastery).length),
);

// Same prototype trap as the registry, one level down in the stored blob.
const inherited = migrateProgress(JSON.stringify(INHERITED_TRACK_PROGRESS));
check(
  `a stored activeTrack of '${inheritedId}' resolves to kmr`,
  inherited.value.activeTrack === 'kmr',
  inherited.value.activeTrack,
);
const storedTracks: Record<string, unknown> = { kmr: { lessonProgress: {} } };
check(
  'a bare index on a stored tracks map resolves an inherited member',
  storedTracks[inheritedId] !== undefined,
);
check(
  'readTrackProgress ignores the inherited member',
  readTrackProgress(storedTracks, inheritedId as TrackId) === undefined,
);

// The hydrated gate. Without it the first save of a launch stamps the v2 marker
// over data that has not been read yet, and the migration never runs again.
const premature = new MemoryStorage();
premature.setItem(PROGRESS_STORAGE_KEY, v1Raw);
check('a save before hydration is refused', replaySave(premature, false, true) === false);
check('the refused save leaves the v1 blob intact', premature.getItem(PROGRESS_STORAGE_KEY) === v1Raw);
check('the refused save leaves the migration still to run', replayLoad(premature).migrated === true);

const ungated = new MemoryStorage();
ungated.setItem(PROGRESS_STORAGE_KEY, v1Raw);
replaySave(ungated, false, false);
const ungatedLoad = replayLoad(ungated);
check(
  'without the gate that save would erase the progress and skip the migration',
  ungatedLoad.migrated === false &&
    Object.keys(ungatedLoad.value.tracks.kmr.lessonProgress).length === 0 &&
    ungated.getItem(PROGRESS_BACKUP_KEY) === null,
);

// 12. Badges. They are recomputed from state on every render and never stored,
// so a completion rule that reads across tracks does not just mis-award: it
// takes a badge back off a learner who had already earned it, the moment a
// second track exists. Both naive shapes of the rule are run here alongside the
// shipped one, so the guard is visible rather than asserted.
function idsOf(set: Set<string>): string {
  return [...set].sort().join(',');
}

function lessonsCompleted(track: TrackSnapshot): number {
  return Object.values(track.lessonProgress).filter((l) => l.completed).length;
}

const soloEarned = computeBadges(FULL_KMR_SNAPSHOT);
check(
  'a learner who finished Kurmanji holds every badge in the catalogue',
  soloEarned.size === ALL_BADGES.length,
  `${soloEarned.size} of ${ALL_BADGES.length}`,
);

const withEmptyCkb = computeBadges({ ...FULL_KMR_SNAPSHOT, tracks: [FULL_KMR_TRACK, EMPTY_CKB_TRACK] });
check(
  'the empty ckb track leaves the earned set identical, id for id',
  idsOf(withEmptyCkb) === idsOf(soloEarned),
  idsOf(withEmptyCkb),
);

// Naive rule one: every track must be finished, and a track with nothing in it
// is not finished. This is the rule that breaks on the ckb the app ships today.
function everyTrackFinished(tracks: TrackSnapshot[]): boolean {
  return tracks.every((t) => t.totalLessons > 0 && lessonsCompleted(t) >= t.totalLessons);
}
check(
  'an every-track rule would revoke all_lessons as soon as the empty ckb track exists',
  everyTrackFinished([FULL_KMR_TRACK]) && !everyTrackFinished([FULL_KMR_TRACK, EMPTY_CKB_TRACK]),
);
check('the shipped rule keeps all_lessons across the empty track', withEmptyCkb.has('all_lessons'));

// Naive rule two: pool the counts. A part-finished second track drags the
// pooled ratio under 1 and the badge disappears.
function pooledTotalFinished(tracks: TrackSnapshot[]): boolean {
  const done = tracks.reduce((n, t) => n + lessonsCompleted(t), 0);
  const outOf = tracks.reduce((n, t) => n + t.totalLessons, 0);
  return outOf > 0 && done >= outOf;
}
const withPartialCkb = computeBadges({ ...FULL_KMR_SNAPSHOT, tracks: [FULL_KMR_TRACK, PARTIAL_CKB_TRACK] });
check(
  'a pooled-total rule would revoke all_lessons on a part-finished ckb track',
  pooledTotalFinished([FULL_KMR_TRACK]) && !pooledTotalFinished([FULL_KMR_TRACK, PARTIAL_CKB_TRACK]),
);
check(
  'a part-finished second track revokes nothing, all_lessons and all_stories included',
  [...soloEarned].every((id) => withPartialCkb.has(id)) &&
    withPartialCkb.has('all_lessons') &&
    withPartialCkb.has('all_stories'),
  idsOf(withPartialCkb),
);
check(
  'counting badges sum across tracks, so a second track only ever adds to them',
  computeBadges({ ...FULL_KMR_SNAPSHOT, tracks: [EMPTY_CKB_TRACK, PARTIAL_CKB_TRACK] }).has('first_lesson') &&
    withPartialCkb.has('ten_lessons'),
);
check(
  'an empty track alone earns neither completion badge',
  computeBadges({ tracks: [EMPTY_CKB_TRACK], streakCount: 0 }).size === 0,
  idsOf(computeBadges({ tracks: [EMPTY_CKB_TRACK], streakCount: 0 })),
);

// 13. Taught chrome. These are the app's own words in the language it teaches,
// and a pending slot resolves to '', so an unauthored slot does not surface as
// a missing translation: it surfaces as a label that silently is not there.
// checkChrome is what turns that into a failure here instead of on a screen.
const kmrChromeKeys = Object.keys(KMR_CHROME).sort();
const ckbChromeKeys = Object.keys(CKB_CHROME).sort();
check('the chrome tables declare at least one slot', kmrChromeKeys.length > 0, String(kmrChromeKeys.length));
check(
  'both tracks declare the identical slot set',
  kmrChromeKeys.length === ckbChromeKeys.length && kmrChromeKeys.join(',') === ckbChromeKeys.join(','),
  `kmr ${kmrChromeKeys.length}, ckb ${ckbChromeKeys.length}`,
);

const unfilledKmr = Object.entries(KMR_CHROME)
  .filter(([, slot]) => slot.text === null)
  .map(([key]) => key);
check('every Kurmanji slot carries a string', unfilledKmr.length === 0, unfilledKmr.join(','));

const kmrChromeIssues = checkChrome(KMR_CHROME, KMR_POLICY);
check('the Kurmanji table raises nothing under KMR_POLICY', kmrChromeIssues.length === 0, summarise(kmrChromeIssues));

const ckbChromeIssues = checkChrome(CKB_CHROME, CKB_POLICY);
check(
  'the Sorani table raises exactly one CHROME-02 note',
  ckbChromeIssues.length === 1 && ckbChromeIssues[0].severity === 'info' && ckbChromeIssues[0].rule === 'CHROME-02',
  summarise(ckbChromeIssues),
);

const noChrome = checkChrome({}, KMR_POLICY);
check(
  'a table with no slots is one CHROME-00 error, not a clean table',
  noChrome.length === 1 && noChrome[0].severity === 'error' && noChrome[0].rule === 'CHROME-00',
  summarise(noChrome),
);

// The status guard, shown from both sides: one unauthored table under two
// policies that differ in nothing but `status`. The note is what the check
// returns without the guard, and it is a pass, which is why the guard is the
// only thing standing between a track declared complete and a blank label.
const pendingWhenComplete = checkChrome(PENDING_CHROME, FIXTURE_COMPLETE_POLICY);
check(
  'a complete track reports every pending slot as its own CHROME-01 error',
  pendingWhenComplete.length === Object.keys(PENDING_CHROME).length &&
    pendingWhenComplete.every((i) => i.severity === 'error' && i.rule === 'CHROME-01'),
  summarise(pendingWhenComplete),
);
const pendingWhenInProgress = checkChrome(PENDING_CHROME, FIXTURE_CKB_POLICY);
check(
  'the same table under the in-progress policy passes as a single note',
  pendingWhenInProgress.length === 1 &&
    pendingWhenInProgress[0].severity === 'info' &&
    pendingWhenInProgress[0].rule === 'CHROME-02',
  summarise(pendingWhenInProgress),
);

// A filled slot is held to the track's alphabet, and to nothing the track's
// policy does not ask for: Kurmanji has no orthography contract and owes no
// citation, so the same slot is silent under KMR_POLICY.
const illegalUnderCkb = checkChrome(ILLEGAL_LETTER_CHROME, CKB_POLICY);
check(
  'a filled slot spelled outside the p. 88 inventory raises ORTH-01',
  illegalUnderCkb.length === 1 && illegalUnderCkb[0].severity === 'error' && illegalUnderCkb[0].rule === 'ORTH-01',
  summarise(illegalUnderCkb),
);
const illegalUnderKmr = checkChrome(ILLEGAL_LETTER_CHROME, KMR_POLICY);
check('the same slot raises nothing under KMR_POLICY', illegalUnderKmr.length === 0, summarise(illegalUnderKmr));

// Badge names resolve through a slot keyed after the badge id, and badgeName()
// answers a missing key with '' rather than crashing. That safety is also what
// would let a badge ship with no taught name at all, unnoticed.
const badgesWithoutSlot = ALL_BADGES.filter(
  (b) => !Object.prototype.hasOwnProperty.call(KMR_CHROME, `badge_${b.id}`),
).map((b) => b.id);
check('every badge id has a chrome slot', badgesWithoutSlot.length === 0, badgesWithoutSlot.join(','));

// 14. The Kurdish character strip inserts straight into a typed answer, so a
// character it offers that the alphabet does not have produces a string the
// orthography rule would reject. Read as source text, not imported: the
// component pulls in react-native, which bare Node cannot load.
const KEYBOARD_ROW_PATH = 'src/components/ui/KurdishKeyboardRow.tsx';
let keyboardSource = '';
let keyboardReadError = '';
try {
  keyboardSource = readFileSync(KEYBOARD_ROW_PATH, 'utf8');
} catch (err) {
  keyboardReadError = err instanceof Error ? err.message : String(err);
}
check(`${KEYBOARD_ROW_PATH} is readable`, keyboardReadError === '' && keyboardSource !== '', keyboardReadError);

function declaredChars(source: string, name: string): string[] {
  const found = new RegExp(`const ${name} = \\[([^\\]]*)\\]`).exec(source);
  if (!found) return [];
  return found[1]
    .split(',')
    .map((piece) => piece.trim().replace(/^'/, '').replace(/'$/, ''))
    .filter((piece) => piece !== '');
}

const stripChars = [...declaredChars(keyboardSource, 'CHARS_LOWER'), ...declaredChars(keyboardSource, 'CHARS_UPPER')];
check(
  'both character arrays were found in the keyboard row',
  declaredChars(keyboardSource, 'CHARS_LOWER').length > 0 && declaredChars(keyboardSource, 'CHARS_UPPER').length > 0,
  `${stripChars.length} characters read`,
);
const alphabet = new Set([...SORANI_LATIN.letters, ...SORANI_LATIN.lettersUpper]);
const strangers = stripChars.filter((ch) => !alphabet.has(ch));
check(
  'every character on the strip is a letter of the p. 88 alphabet',
  strangers.length === 0,
  strangers.join(',') || 'none',
);

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`content self-check failure: ${failure}`);
  }
  throw new Error(`content self-check: ${failures.length} of ${total} assertions failed`);
}

console.log(`content self-check: ${total}/${total} assertions passed`);
