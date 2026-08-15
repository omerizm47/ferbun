// Dev-only content integrity checks. Catches authoring mistakes (an answer that
// isn't among its options, an empty lesson, an orphaned vocab theme) before they
// ship as an unanswerable question or a blank screen. Pure + side-effect free —
// returns a list of human-readable problems. Wire `runContentValidation()` in
// __DEV__ only; it is a no-op cost in production (never called).
// A track policy adds three more rules on top: spelling inside the track's
// alphabet (ORTH), a resolvable source citation (SRC) and both glosses present
// (GLOSS), plus a coverage note for tracks still being authored (TRACK).
// The taught-chrome table is checked by the same policy under CHROME.
// All of it checks shape, legality and provenance only. Nothing here confirms
// that a translation is correct, idiomatic or current: that needs a speaker.

import { ChromeSlot } from './chrome';
import { courses } from './courses';
import { getExercisesForLesson } from './exercises';
import { SORANI_LATIN, checkOrthography, OrthographySpec } from './orthography';
import { resolveCitation } from './sources';
import { stories } from './stories';
import { VOCAB_THEMES, getVocabByTheme } from './vocabulary';

export type IssueSeverity = 'error' | 'info';

export interface ContentIssue {
  severity: IssueSeverity;
  /** Stable rule code, e.g. 'ORTH-01'. Absent on the pre-existing checks. */
  rule?: string;
  message: string;
}

export interface TrackPolicy {
  id: string;
  label: string;
  status: 'complete' | 'in_progress';
  /** Null for tracks with no orthography contract (Kurmanji today). */
  orthography: OrthographySpec | null;
  requireCitation: boolean;
  requireBothGlosses: boolean;
}

/** Minimal shape any citable entry satisfies, whatever data file it lives in. */
export interface CitedEntry {
  id: string;
  /** Taught-language strings by field name, e.g. { wordKu: 'gull' }. */
  taught: Record<string, string>;
  src?: string;
  glossEn?: string;
  glossTr?: string;
}

export const KMR_POLICY: TrackPolicy = {
  id: 'kmr',
  label: 'Kurmanji',
  status: 'complete',
  orthography: null,
  requireCitation: false,
  requireBothGlosses: false,
};

// In force from the first Sorani entry authored, not retrofitted afterwards:
// spelled in the p. 88 alphabet, cited, and glossed in both bridge languages.
export const CKB_POLICY: TrackPolicy = {
  id: 'ckb',
  label: 'Sorani',
  status: 'in_progress',
  orthography: SORANI_LATIN,
  requireCitation: true,
  requireBothGlosses: true,
};

// Wiring point, not dead code: exported and covered by fixtures, but nothing
// calls it from validateContent() until a track with these obligations exists.
export function checkCitedEntries(entries: CitedEntry[], policy: TrackPolicy): ContentIssue[] {
  const issues: ContentIssue[] = [];

  for (const entry of entries) {
    if (policy.orthography) {
      for (const [field, value] of Object.entries(entry.taught)) {
        for (const { code, detail } of checkOrthography(value, policy.orthography)) {
          issues.push({
            severity: 'error',
            rule: code,
            message: `[${code}] ${entry.id} ${field}: ${detail}.`,
          });
        }
      }
    }

    if (policy.requireCitation) {
      if (!entry.src || entry.src.trim() === '') {
        issues.push({
          severity: 'error',
          rule: 'SRC-01',
          message: `[SRC-01] ${entry.id}: missing src citation (expected "THK06:<page or §section>").`,
        });
      } else {
        const cited = resolveCitation(entry.src);
        if (!cited.ok) {
          issues.push({
            severity: 'error',
            rule: 'SRC-02',
            message: `[SRC-02] ${entry.id}: ${cited.reason}.`,
          });
        }
      }
    }

    if (policy.requireBothGlosses) {
      // Missing both is two issues on purpose: they are independent facts.
      if (!entry.glossEn || entry.glossEn.trim() === '') {
        issues.push({
          severity: 'error',
          rule: 'GLOSS-01',
          message: `[GLOSS-01] ${entry.id}: missing English gloss (${policy.label} requires both English and Turkish).`,
        });
      }
      if (!entry.glossTr || entry.glossTr.trim() === '') {
        issues.push({
          severity: 'error',
          rule: 'GLOSS-01',
          message: `[GLOSS-01] ${entry.id}: missing Turkish gloss (${policy.label} requires both English and Turkish).`,
        });
      }
    }
  }

  return issues;
}

/**
 * The taught-chrome table for one track, under that track's policy. Slots carry
 * no glosses (the bridge half of every chrome line lives in i18n/strings.ts,
 * compile-checked for en/tr parity), so there is no GLOSS rule here.
 *
 * As with every rule in this file, a slot that is filled, legally spelled and
 * resolvably cited has passed a shape, legality and provenance check and
 * nothing more. Whether the wording is right is a question only a speaker of
 * the language can answer.
 *
 * Wiring point, like checkCitedEntries: exported and covered by the self-check,
 * not called from validateContent().
 */
export function checkChrome(slots: Record<string, ChromeSlot>, policy: TrackPolicy): ContentIssue[] {
  // Object.entries, never `slots[key]`: a bare index on an object literal
  // resolves toString and every other Object.prototype member as a slot.
  const entries = Object.entries(slots);

  if (entries.length === 0) {
    return [
      {
        severity: 'error',
        rule: 'CHROME-00',
        message: `[CHROME-00] Track "${policy.id}" has no chrome slots at all. A zero-slot table is an unbuilt table, not a clean one.`,
      },
    ];
  }

  const issues: ContentIssue[] = [];
  const pending: string[] = [];

  for (const [key, slot] of entries) {
    if (slot.text === null) {
      pending.push(key);
      continue;
    }

    if (policy.orthography) {
      for (const { code, detail } of checkOrthography(slot.text, policy.orthography)) {
        issues.push({
          severity: 'error',
          rule: code,
          message: `[${code}] ${policy.id} chrome slot "${key}": ${detail}.`,
        });
      }
    }

    if (policy.requireCitation) {
      if (!slot.src || slot.src.trim() === '') {
        issues.push({
          severity: 'error',
          rule: 'SRC-01',
          message: `[SRC-01] ${policy.id} chrome slot "${key}": missing src citation (expected "THK06:<page or §section>").`,
        });
      } else {
        const cited = resolveCitation(slot.src);
        if (!cited.ok) {
          issues.push({
            severity: 'error',
            rule: 'SRC-02',
            message: `[SRC-02] ${policy.id} chrome slot "${key}": ${cited.reason}.`,
          });
        }
      }
    }
  }

  if (pending.length === 0) return issues;

  // A pending slot resolves to '', which reads on screen as a label that was
  // never there rather than as one that is missing. That is acceptable while a
  // track is being authored and a defect once it claims to be complete.
  if (policy.status === 'complete') {
    for (const key of pending) {
      issues.push({
        severity: 'error',
        rule: 'CHROME-01',
        message: `[CHROME-01] Track "${policy.id}" is complete but chrome slot "${key}" is unauthored: it would render blank beside its bridge word.`,
      });
    }
    return issues;
  }

  issues.push({
    severity: 'info',
    rule: 'CHROME-02',
    message: `[CHROME-02] Track "${policy.id}" is in progress: ${entries.length - pending.length} of ${entries.length} chrome slots authored (${pending.length} pending). Pending slots are not errors until the track is complete, and a filled slot is still only checked for spelling and provenance, never for meaning.`,
  });
  return issues;
}

export function checkLessonCoverage(
  lessons: { id: string; title: string; exerciseCount: number }[],
  policy: TrackPolicy,
): ContentIssue[] {
  const empty = lessons.filter((l) => l.exerciseCount === 0);

  if (policy.status === 'complete') {
    return empty.map((l) => ({
      severity: 'error' as const,
      message: `Lesson "${l.id}" (${l.title}) has no exercises.`,
    }));
  }

  if (empty.length === 0) return [];

  const total = lessons.length;
  const authored = total - empty.length;
  return [
    {
      severity: 'info',
      rule: 'TRACK-01',
      message: `[TRACK-01] Track "${policy.id}" is in progress: ${authored} of ${total} lessons authored (${empty.length} empty). Empty lessons are not errors until the track is complete, and mechanical checks never confirm meaning or idiom.`,
    },
  ];
}

/** Returns every content issue, errors and informational notes alike. */
export function validateContentDetailed(): ContentIssue[] {
  const problems: ContentIssue[] = [];
  const lessonSummaries: { id: string; title: string; exerciseCount: number }[] = [];

  // --- Courses → units → lessons → exercises ---
  for (const course of courses) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        const exercises = getExercisesForLesson(lesson.id);
        lessonSummaries.push({ id: lesson.id, title: lesson.title, exerciseCount: exercises.length });
        if (exercises.length === 0) {
          continue;
        }
        for (const ex of exercises) {
          const ca = ex.correctAnswer;
          if (ex.type === 'multiple_choice') {
            if (!ex.options || ex.options.length < 2) {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" (multiple_choice) has fewer than 2 options.` });
            } else if (typeof ca !== 'string') {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" (multiple_choice) correctAnswer must be a string.` });
            } else if (!ex.options.includes(ca)) {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" correctAnswer "${ca}" is not among its options [${ex.options.join(', ')}].` });
            }
          } else if (ex.type === 'true_false') {
            if (ca !== 'True' && ca !== 'False') {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" (true_false) correctAnswer must be "True" or "False", got "${String(ca)}".` });
            }
          } else if (ex.type === 'translation' || ex.type === 'fill_blank') {
            if (typeof ca !== 'string' || ca.trim() === '') {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" (${ex.type}) correctAnswer must be a non-empty string.` });
            }
          } else if (ex.type === 'match_pairs') {
            if (!ex.pairs || ex.pairs.length < 2) {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" (match_pairs) needs at least 2 pairs.` });
            } else {
              ex.pairs.forEach((p, pi) => {
                if (!p.ku || !p.en) {
                  problems.push({ severity: 'error', message: `Exercise "${ex.id}" pair ${pi + 1} is missing a Kurdish word or meaning.` });
                }
              });
            }
          }

          // Turkish parity (only checked where a translation exists, so untranslated
          // content is silent). For choice-based exercises, optionsTr + correctAnswerTr
          // must come as a complete pair (so resolveChoices never desyncs) and the
          // answer must be among the options. Typed exercises (translation/fill_blank)
          // may legitimately carry only correctAnswerTr (a fill-in gloss), so they are
          // exempt from the pairing rule.
          const isChoice = ex.type === 'multiple_choice';
          if (isChoice && (ex.optionsTr || ex.correctAnswerTr !== undefined)) {
            if (!ex.optionsTr || ex.correctAnswerTr === undefined) {
              problems.push({ severity: 'error', message: `Exercise "${ex.id}" has a partial Turkish choice set (optionsTr and correctAnswerTr must both be present).` });
            } else {
              const caTr = ex.correctAnswerTr;
              if (typeof caTr === 'string' && !ex.optionsTr.includes(caTr)) {
                problems.push({ severity: 'error', message: `Exercise "${ex.id}" correctAnswerTr "${caTr}" is not among its optionsTr [${ex.optionsTr.join(', ')}].` });
              }
            }
          } else if (!isChoice && ex.optionsTr) {
            problems.push({ severity: 'error', message: `Exercise "${ex.id}" (${ex.type}) should not define optionsTr.` });
          }
        }
      }
    }
  }

  problems.push(...checkLessonCoverage(lessonSummaries, KMR_POLICY));

  // --- Stories ---
  for (const story of stories) {
    if (!story.icon || !story.accent) {
      problems.push({ severity: 'error', message: `Story "${story.id}" is missing an icon or accent.` });
    }
    if (!story.paragraphs || story.paragraphs.length === 0) {
      problems.push({ severity: 'error', message: `Story "${story.id}" has no paragraphs.` });
    }
    if (story.comprehensionQuestions.length === 0) {
      problems.push({ severity: 'error', message: `Story "${story.id}" has no comprehension questions.` });
    }
    story.comprehensionQuestions.forEach((q, i) => {
      if (!q.options || q.options.length < 2) {
        problems.push({ severity: 'error', message: `Story "${story.id}" question ${i + 1} has fewer than 2 options.` });
      }
      if (!q.options.includes(q.correctAnswer)) {
        problems.push({ severity: 'error', message: `Story "${story.id}" question ${i + 1} correctAnswer "${q.correctAnswer}" is not among its options.` });
      }
      // Turkish parity (only where translated): question + options + answer must be
      // a complete set, and the answer must be among the Turkish options.
      if (q.questionTr || q.optionsTr || q.correctAnswerTr !== undefined) {
        if (!q.questionTr || !q.optionsTr || q.correctAnswerTr === undefined) {
          problems.push({ severity: 'error', message: `Story "${story.id}" question ${i + 1} has a partial Turkish translation (questionTr, optionsTr and correctAnswerTr must all be present).` });
        } else if (!q.optionsTr.includes(q.correctAnswerTr)) {
          problems.push({ severity: 'error', message: `Story "${story.id}" question ${i + 1} correctAnswerTr "${q.correctAnswerTr}" is not among its optionsTr.` });
        }
      }
    });
  }

  // --- Vocabulary themes ---
  for (const theme of VOCAB_THEMES) {
    if (getVocabByTheme(theme.id).length === 0) {
      problems.push({ severity: 'error', message: `Vocab theme "${theme.id}" (${theme.label}) has no words.` });
    }
  }

  return problems;
}

/** Returns a list of content problems. Empty array = all clean. */
export function validateContent(): string[] {
  return validateContentDetailed()
    .filter((i) => i.severity === 'error')
    .map((i) => i.message);
}

/** Logs content problems once in development. No-op in production. */
export function runContentValidation(): void {
  if (!__DEV__) return;
  const issues = validateContentDetailed();
  const problems = issues.filter((i) => i.severity === 'error').map((i) => i.message);
  if (problems.length > 0) {
    console.warn(
      `[Fêrbûn content] ${problems.length} issue(s) found:\n` +
        problems.map((p) => `  • ${p}`).join('\n'),
    );
  }
  const notes = issues.filter((i) => i.severity === 'info');
  if (notes.length > 0) {
    console.log(
      `[Fêrbûn content] ${notes.length} note(s):\n` +
        notes.map((n) => `  • ${n.message}`).join('\n'),
    );
  }
}
