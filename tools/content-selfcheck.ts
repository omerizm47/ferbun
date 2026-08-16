// Fêrbûn content self-check. A plain runner, no test framework: it compiles
// with the rest of the data layer and runs under bare Node.
// It proves each validator rule fires on its own fixture and on nothing else,
// that every new rule stays inert for the Kurmanji track, that the shipped
// Kurmanji corpus is still clean, that the grader does not fold the ll/rr
// digraphs (Thackston p. 88) into plain l and r, that the track registry
// answers an unknown id with Kurmanji instead of an inherited prototype member,
// that the two taught-chrome tables hold the same slots and no track calling
// itself complete holds an unauthored one, that no id repeats inside the Sorani
// corpus, that every Sorani spelling is the conversion table's output on the
// transcription its entry stores, that the corpus's own provenance claim still
// matches the corpus, and that the v1→v2 progress migration carries a real
// user's stored blob across without touching a single global.
// What no assertion here can do is open the book. `npm run verify-citations`
// does that, and is a separate script because it needs a PDF this repository
// does not carry.
// All of it is shape, legality and provenance. Nothing here establishes that a
// form is correct, idiomatic or current: that needs a speaker.
// runContentValidation() is deliberately not called: it reads __DEV__, which
// does not exist in Node.

import { readFileSync } from 'fs';
import { CKB_CHROME, KMR_CHROME } from '../src/data/chrome';
import { CKB_GLOSS_PROVENANCE, CKB_VOCABULARY, CKB_VOCAB_THEMES } from '../src/data/ckb/vocabulary';
import { DIGRAPH_MINIMAL_PAIRS, SORANI_LATIN, checkOrthography, foldDiacritics } from '../src/data/orthography';
import { ALL_BADGES } from '../src/data/badges';
import { SOURCES } from '../src/data/sources';
import { TrackId, getTrack, isTrackId } from '../src/data/tracks';
import {
  CKB_POLICY,
  ContentIssue,
  KMR_POLICY,
  checkChrome,
  checkCitedEntries,
  checkDuplicateIds,
  checkLessonCoverage,
  validateContent,
  validateContentDetailed,
} from '../src/data/validate';
import { vocabulary } from '../src/data/vocabulary';
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
  CONVERSION_GOLD,
  CONVERSION_UNWITNESSED,
  DUPLICATE_ID_ENTRIES,
  DUPLICATE_THEME_IDS,
  EMPTY_CKB_TRACK,
  FIXTURE_CKB_POLICY,
  FIXTURE_COMPLETE_POLICY,
  FIXTURE_LESSONS,
  FULL_KMR_SNAPSHOT,
  FULL_KMR_TRACK,
  ILLEGAL_LETTER_CHROME,
  INHERITED_TRACK_PROGRESS,
  MINIMAL_PAIR_TRANSCRIPTIONS,
  MIXED_PROGRESS,
  PARTIAL_CKB_TRACK,
  PENDING_CHROME,
  ROLLBACK_V1_PROGRESS,
  ROWS_WITHOUT_A_SAMPLE,
  UNMAPPED_INPUT,
  V1_GLOBAL_KEYS,
  V1_PROGRESS,
} from './content-selfcheck.fixture';
import { THACKSTON_TO_HAWAR, toHawar } from './thackston-latin';

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

// Wiring the Sorani track into validateContentDetailed() put one note into the
// shipped run: every ckb chrome slot is still pending, which is a note while the
// track is in progress and 95 errors the day it calls itself complete. The note
// is spelled out in full rather than counted, so a second note cannot slip in
// behind it unread.
const EXPECTED_CORPUS_NOTES: { rule: string; message: string }[] = [
  {
    rule: 'CHROME-02',
    message:
      '[CHROME-02] Track "ckb" is in progress: 0 of 95 chrome slots authored (95 pending). ' +
      'Pending slots are not errors until the track is complete, and a filled slot is still ' +
      'only checked for spelling and provenance, never for meaning.',
  },
];
const corpusNotes = validateContentDetailed().filter((i) => i.severity === 'info');
check(
  'shipped corpus raises exactly the expected notes, word for word',
  corpusNotes.length === EXPECTED_CORPUS_NOTES.length &&
    corpusNotes.every(
      (note, i) => note.rule === EXPECTED_CORPUS_NOTES[i].rule && note.message === EXPECTED_CORPUS_NOTES[i].message,
    ),
  summarise(corpusNotes),
);

// 7. Digraph no-fold guard on the grader, run over every minimal pair
// Thackston records at pp. 2 to 3. ll and rr are separate phonemes (THK06:88),
// so a grader that folded them would accept 'gul' for 'gull', leper for flower.
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

// 10. The half of the ckb track that is still unauthored answers every accessor
// rather than throwing, so a screen rendering it gets an empty state instead of
// a crash. The vocabulary is authored and is checked below.
const ckbContent = ckb.content;
let ckbEmpty = false;
let ckbThrew = '';
try {
  ckbEmpty =
    ckbContent.courses.length === 0 &&
    ckbContent.stories.length === 0 &&
    ckbContent.getCourseById('c1') === undefined &&
    ckbContent.getUnitById('u1') === undefined &&
    ckbContent.getLessonById('l1_1') === undefined &&
    ckbContent.getTotalLessons() === 0 &&
    ckbContent.getStoryById('s1') === undefined &&
    ckbContent.getVocabByTheme('time').length === 0 &&
    ckbContent.getVocabById('v1') === undefined &&
    ckbContent.getExercisesForLesson('l1_1').length === 0 &&
    ckbContent.getOrderedExercisesForLesson('l1_1').length === 0 &&
    ckbContent.getLessonTeachCards('l1_1').length === 0;
} catch (err) {
  ckbThrew = err instanceof Error ? err.message : String(err);
}
check(
  'every unauthored ckb accessor returns empty or undefined without throwing',
  ckbEmpty && ckbThrew === '',
  ckbThrew || 'an accessor returned a value',
);

// The authored half reaches the screens through the registry, or it does not
// ship at all.
check(
  'the registry serves the Sorani vocabulary, themes and both lookups',
  ckbContent.vocabulary.length === CKB_VOCABULARY.length &&
    CKB_VOCABULARY.length > 0 &&
    ckbContent.vocabThemes.length > 0 &&
    ckbContent.vocabThemes.every((t) => ckbContent.getVocabByTheme(t.id).length > 0) &&
    ckbContent.getVocabById(CKB_VOCABULARY[0].id)?.id === CKB_VOCABULARY[0].id,
  `${ckbContent.vocabulary.length} words in ${ckbContent.vocabThemes.length} theme(s)`,
);

// Progress is keyed by word id and stored per track, but a shared id would still
// put a Sorani word behind a Kurmanji row in any code that reads the two corpora
// together, so the id spaces are kept disjoint.
const kmrIds = new Set(vocabulary.map((w) => w.id));
const sharedIds = CKB_VOCABULARY.filter((w) => kmrIds.has(w.id)).map((w) => w.id);
check('no Sorani word id appears in the Kurmanji corpus', sharedIds.length === 0, sharedIds.join(',') || 'none');
const kmrSelfHits = vocabulary.filter((w) => kmrIds.has(w.id)).length;
check(
  'and the same test over the Kurmanji corpus finds every one of its ids, so the empty result is not vacuous',
  kmrIds.size > 0 && kmrSelfHits === vocabulary.length,
  `${kmrSelfHits} of ${vocabulary.length}`,
);

// That test compares the two corpora. It says nothing about a corpus colliding
// with itself, which is the collision 17 separately authored theme files can
// produce, and which fails silently: one progress row for two words, and
// getCkbVocabById answering with whichever was authored first. The pair below
// is put through every rule that predates DUP-01 first, because a guard is only
// worth having if the unguarded path passes.
const duplicateIds = DUPLICATE_ID_ENTRIES.map((e) => e.id);
const duplicateUnderOldRules = checkCitedEntries(DUPLICATE_ID_ENTRIES, FIXTURE_CKB_POLICY);
check(
  'two entries sharing one id raise nothing under the rules that predate DUP-01',
  duplicateUnderOldRules.length === 0,
  summarise(duplicateUnderOldRules),
);
check(
  'and the Kurmanji disjointness test above is silent on them too, because neither id is a Kurmanji id',
  duplicateIds.every((id) => !kmrIds.has(id)),
);
check(
  'a first-match lookup answers with the first of the two, which is how the collision stays invisible',
  DUPLICATE_ID_ENTRIES.find((e) => e.id === 'fx-dup')?.taught.wordKu === 'gull',
  DUPLICATE_ID_ENTRIES.find((e) => e.id === 'fx-dup')?.taught.wordKu,
);

const duplicateIssues = checkDuplicateIds(duplicateIds, 'fixture corpus');
check(
  'DUP-01 fires once on that pair, naming the id and how many entries hold it',
  duplicateIssues.length === 1 &&
    duplicateIssues[0].severity === 'error' &&
    duplicateIssues[0].rule === 'DUP-01' &&
    duplicateIssues[0].message.includes('"fx-dup"') &&
    duplicateIssues[0].message.includes('2 entries'),
  summarise(duplicateIssues),
);

const duplicateThemeIssues = checkDuplicateIds(DUPLICATE_THEME_IDS, 'fixture themes');
check(
  'theme ids are covered by the same rule, once per repeated id and not once per occurrence',
  duplicateThemeIssues.length === 1 && duplicateThemeIssues[0].message.includes('"family"'),
  summarise(duplicateThemeIssues),
);
check('a list with nothing repeated raises nothing', checkDuplicateIds(['a', 'b', 'c'], 'fixture').length === 0);

const shippedIdIssues = [
  ...checkDuplicateIds(CKB_VOCABULARY.map((w) => w.id), 'Sorani vocabulary'),
  ...checkDuplicateIds(CKB_VOCAB_THEMES.map((t) => t.id), 'Sorani vocab themes'),
];
check(
  'the shipped Sorani corpus repeats no word id and no theme id',
  shippedIdIssues.length === 0,
  summarise(shippedIdIssues),
);

// Sorani has no grammatical gender. VocabWord carries the field because Kurmanji
// needs it, and a Sorani entry that filled it in would be inventing a claim about
// the language rather than copying one off a page.
const ckbGendered = CKB_VOCABULARY.filter((w) => w.gender !== undefined).map((w) => w.id);
check('no Sorani entry carries a gender', ckbGendered.length === 0, ckbGendered.join(',') || 'none');
const kmrGendered = vocabulary.filter((w) => w.gender !== undefined).length;
check(
  'and the Kurmanji corpus does fill that field, so the absence is a decision and not an unused type',
  kmrGendered > 0,
  `${kmrGendered} of ${vocabulary.length} Kurmanji words carry one`,
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

// 15. The conversion table Thackston prints across pp. 88 and 89, and the
// converter that reads it. Two rows put the output of one rule in the path of
// another: j becomes c while zh becomes j, and five digraphs sit on top of
// single letters that also have rows. A sequence of String.replace passes gets
// that wrong without raising anything, so the naive version is run below on the
// same words as the real one and its answers are printed.
const tableSources = THACKSTON_TO_HAWAR.map((row) => row.from);
check(
  'the conversion table holds one row per Thackston character, none repeated',
  THACKSTON_TO_HAWAR.length === 36 && new Set(tableSources).size === 36,
  `${THACKSTON_TO_HAWAR.length} rows, ${new Set(tableSources).size} distinct`,
);

// The one row the table does not print. It is in the exported array like every
// other row rather than hidden inside toHawar, so it is read and doubted the
// same way, and it has to land where the printed h row lands, since that is the
// whole of its licence: p. 88's h row routes both Arabic letters in its cell to
// h, and p. 4 pairs the second of them with this character.
const dotUnderH = THACKSTON_TO_HAWAR.find((row) => row.from === '\u1E25');
check(
  'the h with dot below is a row of the exported table, sent to h off p. 88 like the h row it is read from',
  dotUnderH?.to === 'h' && dotUnderH.src === 'THK06:88' && toHawar('\u1E25') === toHawar('h'),
  dotUnderH ? `${dotUnderH.from} to ${dotUnderH.to} ${dotUnderH.src}` : 'no row',
);

const illegalTargets = THACKSTON_TO_HAWAR.filter(
  (row) => row.to !== '' && checkOrthography(row.to, SORANI_LATIN).length > 0,
).map((row) => row.from);
check('every row lands inside the p. 88 alphabet', illegalTargets.length === 0, illegalTargets.join(',') || 'none');

// Converting a row's own source token is the weakest assertion available: it
// shows the scan reaches the row, not that the row was read off the page
// correctly. It is still the only evidence there is for the rows named in
// ROWS_WITHOUT_A_SAMPLE, and it is what makes the digraphs testable at all,
// since gh arriving at x rather than at gx is the longest-match rule firing.
const misreadRows = THACKSTON_TO_HAWAR.filter((row) => toHawar(row.from) !== row.to).map((row) => row.from);
check('every row converts to its own target', misreadRows.length === 0, misreadRows.join(',') || 'none');

const phantomRows = ROWS_WITHOUT_A_SAMPLE.filter((from) => !tableSources.includes(from));
check(
  'every row recorded as having no word behind it is a real row',
  phantomRows.length === 0,
  phantomRows.join(',') || 'none',
);

// Both sides of these are printed in the book, so they test the table as read
// and not just the scan over it.
for (const pair of CONVERSION_GOLD) {
  const got = toHawar(pair.thackston);
  check(
    `${pair.src} ${pair.thackston} converts to the ${pair.hawarSrc} form ${pair.hawar} (${pair.gloss})`,
    got === pair.hawar,
    got,
  );
}

// No Kurmanji form for these is printed anywhere, so the expected string is this
// project's own reading of the table. They are here because gh, j, zh and ayn
// are rows the paired material never reaches.
for (const sample of CONVERSION_UNWITNESSED) {
  const got = toHawar(sample.thackston);
  check(`${sample.src} ${sample.thackston} converts to ${sample.hawar} (${sample.gloss})`, got === sample.hawar, got);
}
check(
  'gh and kh both land on x, which is the loss SORANI_LATIN records',
  toHawar('gham') === 'xem' && toHawar('kham') === 'xem',
  `${toHawar('gham')} / ${toHawar('kham')}`,
);

const illegalConversions = [...CONVERSION_GOLD, ...CONVERSION_UNWITNESSED]
  .map((pair) => toHawar(pair.thackston))
  .filter((form) => checkOrthography(form, SORANI_LATIN).length > 0);
check(
  'every converted form is legal under the p. 88 alphabet',
  illegalConversions.length === 0,
  illegalConversions.join(',') || 'none',
);

check(
  'digits, the hyphen and the parentheses of the p. 89 sample pass through',
  toHawar('11-\u00EE') === '11-\u00EE' && toHawar('(misogar)') === '(misoger)',
  `${toHawar('11-\u00EE')} ${toHawar('(misogar)')}`,
);
check("a leading capital carries the digraph with it: Zher gives J\u00EAr", toHawar('Zher') === 'J\u00EAr', toHawar('Zher'));
check(
  'the capital does not spread down the word: Ba\u0159ez gives Berr\u00EAz',
  toHawar('Ba\u0159ez') === 'Berr\u00EAz',
  toHawar('Ba\u0159ez'),
);

// DIGRAPH_MINIMAL_PAIRS was converted by hand. Running Thackston's own
// transcriptions of the same eight words through the converter is a second,
// independent reading of them.
for (const committed of DIGRAPH_MINIMAL_PAIRS) {
  const source = MINIMAL_PAIR_TRANSCRIPTIONS.find((entry) => entry.gloss === committed.gloss);
  if (!source) {
    check(`a transcription is on file for the ${committed.gloss} pair`, false, 'no entry with that gloss');
    continue;
  }
  const plain = toHawar(source.plain);
  const digraph = toHawar(source.digraph);
  check(
    `${source.src} ${source.plain}/${source.digraph} reproduces the committed ${committed.plain}/${committed.digraph}`,
    plain === committed.plain && digraph === committed.digraph,
    `${plain}/${digraph}`,
  );
}

for (const { text, why } of UNMAPPED_INPUT) {
  let thrown = '';
  try {
    toHawar(text);
  } catch (err) {
    thrown = err instanceof Error ? err.message : String(err);
  }
  check(
    `an input the table has no row for (${why}) throws instead of passing the character through`,
    thrown.startsWith('toHawar: no conversion-table row'),
    thrown || 'nothing was thrown',
  );
}

let accentThrow = '';
try {
  toHawar('tanak\u00E1');
} catch (err) {
  accentThrow = err instanceof Error ? err.message : String(err);
}
check(
  'the throw names the character, its codepoint and its index',
  accentThrow.includes('"\u00E1"') && accentThrow.includes('U+00E1') && accentThrow.includes('index 5'),
  accentThrow || 'nothing was thrown',
);

// The obvious implementation, and the one that has to be seen failing: sweep the
// digraph rows with String.replace, then sweep the single letters. Running the
// digraphs first is exactly what makes it look safe.
function naiveTwoPass(text: string): string {
  const digraphs = THACKSTON_TO_HAWAR.filter((row) => row.from.length > 1);
  const singles = THACKSTON_TO_HAWAR.filter((row) => row.from.length === 1);
  let out = text.normalize('NFC');
  for (const row of [...digraphs, ...singles]) out = out.split(row.from).join(row.to);
  return out.normalize('NFC');
}

check(
  'the naive two-pass agrees with the converter on gisht\u00EE, so it reads as sound',
  naiveTwoPass('gisht\u00EE') === toHawar('gisht\u00EE'),
  naiveTwoPass('gisht\u00EE'),
);
check(
  "the same two-pass turns Thackston's zhin 'wife' into cin, because zh has already become j by the time the j row runs",
  naiveTwoPass('zhin') === 'cin' && toHawar('zhin') === 'jin',
  `naive ${naiveTwoPass('zhin')}, converter ${toHawar('zhin')}`,
);
check(
  'it makes the same mistake with a becoming e and then \u00EA: bar gives b\u00EAr, not ber',
  naiveTwoPass('bar') === 'b\u00EAr' && toHawar('bar') === 'ber',
  `naive ${naiveTwoPass('bar')}, converter ${toHawar('bar')}`,
);

const naiveWrong = [...CONVERSION_GOLD, ...CONVERSION_UNWITNESSED].filter(
  (pair) => naiveTwoPass(pair.thackston) !== pair.hawar,
);
check(
  'the naive two-pass corrupts part of the sample',
  naiveWrong.length > 0,
  naiveWrong.map((pair) => `${pair.thackston}=${naiveTwoPass(pair.thackston)}`).join(' ') || 'none',
);
check(
  'and every form it corrupts is legal under the p. 88 alphabet, so no rule in this repository would report one',
  naiveWrong.every((pair) => checkOrthography(naiveTwoPass(pair.thackston), SORANI_LATIN).length === 0),
);

// The search fold. Search is the second place after the grader where folding ll
// to l or rr to r would put the wrong word in front of a learner, so the same
// no-fold property is checked on foldDiacritics itself. The property is that the
// doubled letter survives, not that the string is untouched: çil holds an
// accented letter the fold is required to lower, and does lower.
for (const pair of DIGRAPH_MINIMAL_PAIRS) {
  const doubled = SORANI_LATIN.digraphs.find((d) => pair.digraph.includes(d)) ?? '';
  check(
    `foldDiacritics carries the ${doubled || '(none)'} of ${pair.digraph} through (${pair.gloss})`,
    doubled !== '' &&
      foldDiacritics(pair.digraph).includes(doubled) &&
      !foldDiacritics(pair.plain).includes(doubled),
    `${foldDiacritics(pair.plain)}/${foldDiacritics(pair.digraph)}`,
  );
  check(
    `folded ${pair.plain} and folded ${pair.digraph} stay distinct`,
    foldDiacritics(pair.plain) !== foldDiacritics(pair.digraph),
    `${foldDiacritics(pair.plain)}/${foldDiacritics(pair.digraph)}`,
  );
}

// The fold that would break it, shown breaking rather than described: add the
// two digraph rows to the sweep and every pair above collides.
function collidingFold(text: string): string {
  return foldDiacritics(text).replace(/ll/g, 'l').replace(/rr/g, 'r');
}
const collided = DIGRAPH_MINIMAL_PAIRS.filter(
  (pair) => collidingFold(pair.plain) === collidingFold(pair.digraph),
);
check(
  'a fold that took ll to l and rr to r would collide every minimal pair',
  collided.length === DIGRAPH_MINIMAL_PAIRS.length,
  `${collided.length} of ${DIGRAPH_MINIMAL_PAIRS.length}`,
);
check(
  'and each collided form is legal under the alphabet, so no rule in this repository would report one',
  collided.every((pair) => checkOrthography(collidingFold(pair.digraph), SORANI_LATIN).length === 0),
);

// foldDiacritics replaced an inline normalizer in VocabScreen. That normalizer
// is kept here verbatim so the swap is shown to be behaviour-preserving over the
// whole shipped Kurmanji vocabulary, not asserted to be.
function legacyNormalizeString(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFC')
    .replace(/\u00EA/g, 'e')
    .replace(/\u00EE/g, 'i')
    .replace(/\u00FB/g, 'u')
    .replace(/\u015F/g, 's')
    .replace(/\u00E7/g, 'c');
}
const searchFields = vocabulary.flatMap((word) => [word.wordKu, word.wordEn, word.wordTr || '']);
const foldDrift = searchFields.filter((field) => foldDiacritics(field) !== legacyNormalizeString(field));
check(
  `foldDiacritics agrees with the replaced normalizer on all ${searchFields.length} Kurmanji search fields`,
  foldDrift.length === 0,
  foldDrift.slice(0, 3).join(',') || 'none',
);
const foldedAway = searchFields.filter((field) => foldDiacritics(field) !== field.toLowerCase());
check(
  'and the sample reaches the accented rows, so that agreement is not vacuous',
  foldedAway.length > 0,
  `${foldedAway.length} of ${searchFields.length} fields change under the fold`,
);

// 16. Every shipped Sorani spelling is derived rather than typed. Each entry
// stores Thackston's transcription verbatim in `from`, and wordKu has to be
// exactly what the converter above makes of that string, so anyone holding the
// cited page can reproduce the form instead of trusting it.
const ckbDerived = [
  ...CKB_VOCABULARY.map((w) => ({ id: w.id, field: 'wordKu', from: w.from, taught: w.wordKu })),
  ...CKB_VOCAB_THEMES.map((t) => ({ id: `vocab theme "${t.id}"`, field: 'labelKu', from: t.from, taught: t.labelKu })),
];
check(
  'every Sorani word and theme carries a from',
  ckbDerived.length === CKB_VOCABULARY.length + CKB_VOCAB_THEMES.length &&
    ckbDerived.every((row) => row.from.trim() !== ''),
  `${ckbDerived.filter((row) => row.from.trim() !== '').length} of ${ckbDerived.length}`,
);
for (const row of ckbDerived) {
  let converted = '';
  let conversionThrow = '';
  try {
    converted = toHawar(row.from);
  } catch (err) {
    conversionThrow = err instanceof Error ? err.message : String(err);
  }
  check(
    `${row.id} ${row.field} ${row.taught} is what the p. 88 table makes of ${row.from}`,
    conversionThrow === '' && converted === row.taught,
    conversionThrow || converted,
  );
}

// The mistake that assertion closes, shown rather than described. Thackston
// prints bâwik with a furtive i, italicised, and says at p. 163 that the
// underlying form is bâwk: "bâwik 'father' but bâwkî 'his father'". An entry
// copied off the printed string passes everything else in this repository.
const furtive = toHawar('b\u00E2wik');
const shippedBawk = CKB_VOCABULARY.find((w) => w.from === 'b\u00E2wk');
check(
  "toHawar('b\u00E2wik') is bawik while the entry storing b\u00E2wk teaches bawk, so a from taken off the printed page fails the check above",
  furtive === 'bawik' && shippedBawk?.wordKu === 'bawk',
  `${furtive} / ${shippedBawk?.wordKu ?? 'no entry stores b\u00E2wk'}`,
);
check(
  'and bawik is legal under the p. 88 alphabet and raises nothing when cited and glossed, so no other rule here would have caught it',
  checkOrthography('bawik', SORANI_LATIN).length === 0 &&
    checkCitedEntries(
      [{ id: 'fx-furtive', taught: { wordKu: 'bawik' }, src: 'THK06:171', glossEn: 'father', glossTr: 'baba' }],
      FIXTURE_CKB_POLICY,
    ).length === 0,
);

// 17. CKB_GLOSS_PROVENANCE is the corpus's own account of where it came from.
// It is exported and nothing renders it, so it is held to the data here: a
// claim no code reads is a claim that drifts from the data unnoticed. Asserting
// it beat putting it on a screen, because most of what it says is a per-entry
// invariant across the whole corpus, which a paragraph on a screen cannot check
// and a reader cannot verify by looking at it.
const sourceSurname = SOURCES.THK06.author.split(',')[0];
check(
  'the claim names the title and author sources.ts records, so editing that record cannot leave the claim stale',
  CKB_GLOSS_PROVENANCE.includes(SOURCES.THK06.title) && CKB_GLOSS_PROVENANCE.includes(sourceSurname),
  `title ${CKB_GLOSS_PROVENANCE.includes(SOURCES.THK06.title)}, author ${CKB_GLOSS_PROVENANCE.includes(sourceSurname)}`,
);
const citedSourceIds = [...CKB_VOCABULARY.map((w) => w.src), ...CKB_VOCAB_THEMES.map((t) => t.src)].map((src) =>
  src.slice(0, src.indexOf(':')),
);
check(
  'every Sorani entry cites that source and no other, which is what the claim asserts of all of them and not of most',
  citedSourceIds.length === ckbDerived.length && citedSourceIds.every((id) => id === SOURCES.THK06.id),
  [...new Set(citedSourceIds)].join(',') || 'none',
);
check(
  'the claim names the conversion table the spellings are derived through, and every row of that table is settled by that page or overleaf',
  CKB_GLOSS_PROVENANCE.includes('THK06:88') &&
    THACKSTON_TO_HAWAR.every((row) => row.src === 'THK06:88' || row.src === 'THK06:89'),
);
const locatorKeys = [...CKB_VOCABULARY, ...CKB_VOCAB_THEMES].flatMap((entry) =>
  Object.keys(entry).filter((key) => /src|cite|locator/i.test(key)),
);
check(
  'and "the Turkish gloss carries no locator" holds as a shape: one src per entry, and no second locator field anywhere in the corpus',
  locatorKeys.length === ckbDerived.length && locatorKeys.every((key) => key === 'src'),
  [...new Set(locatorKeys)].join(',') || 'none',
);

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`content self-check failure: ${failure}`);
  }
  throw new Error(`content self-check: ${failures.length} of ${total} assertions failed`);
}

console.log(`content self-check: ${total}/${total} assertions passed`);
