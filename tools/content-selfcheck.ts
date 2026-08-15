// Fêrbûn — content self-check. A plain runner, no test framework: it compiles
// with the rest of the data layer and runs under bare Node.
// It proves each validator rule fires on its own fixture and on nothing else,
// that every new rule stays inert for the Kurmanji track, that the shipped
// Kurmanji corpus is still clean, and that the grader does not fold the ll/rr
// digraphs (Thackston p. 88) into plain l and r.
// All of it is shape, legality and provenance. Nothing here establishes that a
// form is correct, idiomatic or current: that needs a speaker.
// runContentValidation() is deliberately not called — it reads __DEV__, which
// does not exist in Node.

import { ContentIssue, KMR_POLICY, checkCitedEntries, checkLessonCoverage, validateContent, validateContentDetailed } from '../src/data/validate';
import { checkTypedAnswer } from '../src/utils/answers';
import { BAD_ENTRIES, CLEAN_ENTRY, FIXTURE_CKB_POLICY, FIXTURE_LESSONS } from './content-selfcheck.fixture';

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

// 7. Digraph no-fold guard on the grader. ll and rr are separate phonemes
// (THK06:88), so folding them would mark a wrong answer correct.
check("checkTypedAnswer('gul', 'gull') is false", checkTypedAnswer('gul', 'gull') === false);
check("checkTypedAnswer('xor', 'xorr') is false", checkTypedAnswer('xor', 'xorr') === false);

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`content self-check failure: ${failure}`);
  }
  throw new Error(`content self-check: ${failures.length} of ${total} assertions failed`);
}

console.log(`content self-check: ${total}/${total} assertions passed`);
