// Dev-only content integrity checks. Catches authoring mistakes (an answer that
// isn't among its options, an empty lesson, an orphaned vocab theme) before they
// ship as an unanswerable question or a blank screen. Pure + side-effect free —
// returns a list of human-readable problems. Wire `runContentValidation()` in
// __DEV__ only; it is a no-op cost in production (never called).
// A track policy adds three more rules on top: spelling inside the track's
// alphabet (ORTH), a resolvable source citation (SRC) and both glosses present
// (GLOSS), plus a coverage note for tracks still being authored (TRACK).
// The taught-chrome table is checked by the same policy under CHROME, and DUP
// catches one corpus reusing an id inside itself. LEX holds an exercise to the
// glossary: an exercise cites no page of its own, so every taught token in one
// has to be a headword the vocabulary already cites.
// LEX-02 and DRV hold a story to the same bargain with one branch added, because
// a sentence cannot be built out of dictionary forms alone: a story token is a
// cited headword or an inflected form the story declares with its base and the
// grammar section forming it, and DRV checks that both of those are real.
// All of it checks shape, legality and provenance only. Nothing here confirms
// that a translation is correct, idiomatic or current: that needs a speaker.

import { ChromeSlot, KMR_CHROME } from './chrome';
import { CKB_AUTHORED_CHROME_KEYS, CKB_CHROME } from './ckb/chrome';
import { CKB_COURSES, CKB_TITLES, isCitedTitle } from './ckb/courses';
import { CKB_STORIES } from './ckb/stories';
import { CKB_VOCABULARY, CKB_VOCAB_THEMES, getCkbVocabByTheme, isCitedTheme } from './ckb/vocabulary';
import { courses } from './courses';
import { getExercisesForLesson } from './exercises';
import { SORANI_LATIN, checkOrthography, OrthographySpec } from './orthography';
import { resolveCitation } from './sources';
import { stories } from './stories';
import type { Exercise } from './types';
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

// The single exemption from CKB_POLICY, written as a policy of its own so it
// stays exactly one rule wide: a taught label naming a class the glossary has no
// headword for is authored like its Turkish counterpart and has no page to cite.
// Two kinds of label answer to it, a vocab theme's labelKu and a course, unit or
// lesson titleKu, and both declare the exemption in the data, under labelOrigin
// and titleOrigin. It is still spelled in the p. 88 alphabet and still glossed
// twice, because those two fields are copied from CKB_POLICY rather than
// restated.
export const CKB_AUTHORED_LABEL_POLICY: TrackPolicy = { ...CKB_POLICY, requireCitation: false };

// Called from validateContentDetailed() over the Sorani corpus, and covered
// rule by rule by the fixtures in tools/content-selfcheck.fixture.ts.
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
 * Ids repeated inside one corpus. The disjointness check in the self-check
 * compares the Sorani ids against the Kurmanji ones and has nothing to say
 * about a collision inside Sorani, which fails silently: the id is the progress
 * key, so the two entries share one mastery row, and getCkbVocabById returns
 * whichever of them was authored first.
 */
export function checkDuplicateIds(ids: string[], what: string): ContentIssue[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) repeated.add(id);
    else seen.add(id);
  }

  return [...repeated].map((id) => ({
    severity: 'error' as const,
    rule: 'DUP-01',
    message: `[DUP-01] ${what}: id "${id}" is used by ${ids.filter((other) => other === id).length} entries. The id is the progress key, so they would share one row and the lookup would answer with the first of them.`,
  }));
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
 */
export function checkChrome(
  slots: Record<string, ChromeSlot>,
  policy: TrackPolicy,
  /**
   * Slots whose wording is authored for this app out of parts cited elsewhere,
   * so no page can be demanded of them. Same exemption CKB_AUTHORED_LABEL_POLICY
   * grants a theme label and a course title, named per slot rather than per
   * track because a chrome table holds all three states at once.
   */
  citationExempt: ReadonlySet<string> = new Set(),
): ContentIssue[] {
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

    if (policy.requireCitation && !citationExempt.has(key)) {
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
    message: `[CHROME-02] Track "${policy.id}" is in progress: ${entries.length - pending.length} of ${entries.length} chrome slots filled (${pending.length} pending). Pending slots are not errors until the track is complete, and a filled slot is still only checked for spelling and provenance, never for meaning.`,
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

/** Shape rules that hold of any exercise in any track: an answerable question. */
export function checkExerciseShapes(exercises: Exercise[]): ContentIssue[] {
  const problems: ContentIssue[] = [];

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

  return problems;
}

/**
 * The half of an exercise LEX-01 reads. `answerIn` is the one fact the rule
 * cannot work out for itself: both directions are authored, so options holding
 * ['spas', 'sllaw'] and options holding ['thanks', 'greetings'] are the same
 * shape, and only the author knows which. questionKu and every pairs[].ku are
 * taught strings whatever it says.
 */
export interface LexExercise {
  id: string;
  answerIn: 'ckb' | 'bridge';
  questionKu?: string;
  options?: string[];
  correctAnswer: string | string[];
  pairs?: { ku: string }[];
}

/**
 * Words of a taught string, in the order they appear, grouped into phrases.
 * A word is a maximal run of letters from the track's alphabet, lowercased. A
 * single space separates two words of one phrase; anything else at all ends the
 * phrase, so punctuation, digits, the fill_blank slot marker (a run of `_`) and
 * any character outside the alphabet are separators and never tokens. Nothing
 * is dropped silently: an illegal character does not vanish, it cuts the word
 * around it into fragments, and a fragment is not a headword, so LEX-01 fires
 * on it.
 */
function taughtPhrases(text: string, letters: Set<string>): string[][] {
  const phrases: string[][] = [];
  let words: string[] = [];
  let word = '';
  const endWord = () => {
    if (word !== '') words.push(word);
    word = '';
  };
  const endPhrase = () => {
    endWord();
    if (words.length > 0) phrases.push(words);
    words = [];
  };

  for (const ch of text.normalize('NFC')) {
    if (letters.has(ch)) word += ch.toLowerCase();
    else if (ch === ' ') endWord();
    else endPhrase();
  }
  endPhrase();
  return phrases;
}

/**
 * Walks `text` against the lexicon, longest match first, and reports both
 * halves of the result: the words no lexicon entry accounts for, and the
 * entries that were actually consumed. Longest first, so a headword printed as
 * two words (bo çi, THK06:173) is matched as the phrase it is cited as; its
 * halves are not admitted on their own, because a bare `bo` is a word this
 * corpus never cites.
 * `used` is what lets a declaration be held to the text it claims to be about:
 * a derivation nothing in a story uses is a permission slip, not a description,
 * and DRV-03 refuses it.
 */
function scanLexicon(
  text: string,
  letters: Set<string>,
  lexicon: Set<string>,
  longest: number,
): { unknown: string[]; used: string[] } {
  const unknown: string[] = [];
  const used: string[] = [];

  for (const phrase of taughtPhrases(text, letters)) {
    let i = 0;
    while (i < phrase.length) {
      let taken = 0;
      for (let n = Math.min(longest, phrase.length - i); n >= 1; n -= 1) {
        const candidate = phrase.slice(i, i + n).join(' ');
        if (lexicon.has(candidate)) {
          used.push(candidate);
          taken = n;
          break;
        }
      }
      if (taken === 0) {
        unknown.push(phrase[i]);
        i += 1;
      } else {
        i += taken;
      }
    }
  }

  return { unknown, used };
}

/**
 * LEX-01. An exercise is authored pedagogy, not a fact copied off a page, so
 * unlike a vocabulary entry it has no citation of its own and SRC has nothing
 * to say about it. What keeps it verifiable is that it asserts no new word:
 * every taught token in it has to be a headword the glossary already cites, so
 * the exercise inherits the provenance of the words it is built from.
 *
 * Case is folded before the lookup, so a sentence-initial capital is the same
 * word; nothing else is folded, and ll and rr in particular are left alone
 * (THK06:88), so `gul` does not pass as `gull`.
 *
 * There is no allowlist for inflected forms. Sorani inflects, and a lesson that
 * needs a form the headword list does not carry will have to add one, but it
 * would be a taught string with no page behind it, so it has to answer for
 * itself in the data the way an authored theme label or lesson title does. An
 * empty hook here would be a way past the rule that nothing had to explain.
 */
export function checkExerciseLexicon(
  exercises: LexExercise[],
  headwords: string[],
  spec: OrthographySpec,
): ContentIssue[] {
  const letters = new Set([...spec.letters, ...spec.lettersUpper]);
  const lexicon = new Set(headwords.map((w) => w.normalize('NFC').toLowerCase()));
  const longest = [...lexicon].reduce((n, w) => Math.max(n, w.split(' ').length), 1);
  const issues: ContentIssue[] = [];

  for (const ex of exercises) {
    const fields: { field: string; text: string }[] = [];
    if (ex.questionKu !== undefined) fields.push({ field: 'questionKu', text: ex.questionKu });
    (ex.pairs ?? []).forEach((pair, i) => fields.push({ field: `pairs[${i}].ku`, text: pair.ku }));
    if (ex.answerIn === 'ckb') {
      (ex.options ?? []).forEach((option, i) => fields.push({ field: `options[${i}]`, text: option }));
      if (Array.isArray(ex.correctAnswer)) {
        ex.correctAnswer.forEach((a, i) => fields.push({ field: `correctAnswer[${i}]`, text: a }));
      } else {
        fields.push({ field: 'correctAnswer', text: ex.correctAnswer });
      }
    }

    for (const { field, text } of fields) {
      for (const token of new Set(scanLexicon(text, letters, lexicon, longest).unknown)) {
        issues.push({
          severity: 'error',
          rule: 'LEX-01',
          message: `[LEX-01] Exercise "${ex.id}" ${field}: "${token}" is not a cited vocabulary headword. An exercise carries no citation of its own, so every taught token in one has to be a word the glossary already cites.`,
        });
      }
    }
  }

  return issues;
}

/** The declaration an inflected form in a story has to answer for itself with. */
export interface LexDerivation {
  /** The taught form as the prose spells it. One word, or a phrase if the affix is written off. */
  form: string;
  /** The headword it is built on. */
  base: string;
  /** The grammar section that forms it. */
  section: string;
}

/** The taught half of a story: everything a reader of it is shown in the taught language. */
export interface LexStory {
  id: string;
  title: string;
  paragraphs: { ku: string }[][];
}

/**
 * LEX-02 and the three DRV rules, which are to a story what LEX-01 is to an
 * exercise, relaxed by exactly one branch and no more.
 *
 * LEX-01 could stay absolute because an exercise teaches words, and a word has
 * a headword. A story teaches sentences, and no sentence in this language is
 * made of headwords alone: § 1 (THK06:8) calls the absolute state the form "in
 * which a noun is given in a vocabulary list or dictionary", and every
 * construction that joins two words attaches something to it, the copula being
 * a set of enclitics (§ 15, THK06:25) that no glossary could list. So a story
 * token is one of two things: a cited headword, or a form the story declares in
 * its derivation list with the base it is built on and the section that builds
 * it.
 *
 * The second branch is a declaration, not an exemption, and the three DRV rules
 * are what keeps it one. A base outside the glossary fails (DRV-01), so a
 * derivation cannot smuggle in an uncited stem. A section the story does not
 * declare fails (DRV-02), so it cannot cite a rule nobody read. A form no
 * sentence uses fails (DRV-03), so the list describes the prose rather than
 * licensing prose that might be written later.
 *
 * Illegal letters need no rule of their own here. A character outside the
 * track's alphabet is not a letter to the tokeniser, so it cuts the word around
 * it into fragments, and a fragment is neither a headword nor a declared form.
 */
export function checkStoryLexicon(
  storiesToCheck: LexStory[],
  headwords: string[],
  derivations: LexDerivation[],
  sections: string[],
  spec: OrthographySpec,
): ContentIssue[] {
  const letters = new Set([...spec.letters, ...spec.lettersUpper]);
  const fold = (w: string) => w.normalize('NFC').toLowerCase();
  const cited = new Set(headwords.map(fold));
  const declared = new Set(sections);
  const issues: ContentIssue[] = [];

  // Only a well-formed declaration joins the lexicon LEX-02 reads. A derivation
  // whose base is not cited must not let its own form through on the strength of
  // the very claim DRV-01 is rejecting.
  // Usage is counted against a second lexicon holding every declared form, sound
  // or not, so a broken declaration is reported once as broken and not a second
  // time as unused.
  const sound = derivations.filter((d) => cited.has(fold(d.base)) && declared.has(d.section));
  const lexicon = new Set([...cited, ...sound.map((d) => fold(d.form))]);
  const everyForm = new Set([...cited, ...derivations.map((d) => fold(d.form))]);
  const span = (words: Set<string>) => [...words].reduce((n, w) => Math.max(n, w.split(' ').length), 1);
  const longest = span(lexicon);
  const used = new Set<string>();

  for (const story of storiesToCheck) {
    const fields: { field: string; text: string }[] = [{ field: 'title', text: story.title }];
    story.paragraphs.forEach((paragraph, p) =>
      fields.push({ field: `paragraphs[${p}]`, text: paragraph.map((w) => w.ku).join(' ') }),
    );

    for (const { field, text } of fields) {
      for (const entry of scanLexicon(text, letters, everyForm, span(everyForm)).used) used.add(entry);
      for (const token of new Set(scanLexicon(text, letters, lexicon, longest).unknown)) {
        issues.push({
          severity: 'error',
          rule: 'LEX-02',
          message:
            `[LEX-02] Story "${story.id}" ${field}: "${token}" is neither a cited vocabulary headword nor a ` +
            'declared derivation. A story carries no citation of its own, so every taught token in one is ' +
            'either a word the glossary cites or an inflected form the story declares with its base headword ' +
            'and the section that forms it.',
        });
      }
    }
  }

  for (const d of derivations) {
    if (!cited.has(fold(d.base))) {
      issues.push({
        severity: 'error',
        rule: 'DRV-01',
        message:
          `[DRV-01] Derivation "${d.form}": base "${d.base}" is not a cited vocabulary headword, so the ` +
          'declaration rests on a word no page of the glossary carries.',
      });
    }
    if (!declared.has(d.section)) {
      issues.push({
        severity: 'error',
        rule: 'DRV-02',
        message:
          `[DRV-02] Derivation "${d.form}": section "${d.section}" is not one of the grammar sections the ` +
          'story declares, so the rule forming it is not one anybody has read.',
      });
    }
    if (!used.has(fold(d.form))) {
      issues.push({
        severity: 'error',
        rule: 'DRV-03',
        message:
          `[DRV-03] Derivation "${d.form}": no story text uses it. A derivation list describes the prose it ` +
          'is shipped with; a form nothing says is a permission slip for text that does not exist.',
      });
    }
  }

  return issues;
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
        problems.push(...checkExerciseShapes(exercises));
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

  // --- Taught chrome, each table under its own track's policy ---
  // The Sorani call passes the authored keys, which is the one thing that table
  // needs and the Kurmanji one does not: a slot composed out of cited parts has
  // no page of its own, and SRC-01 would otherwise read it as a missing one.
  problems.push(...checkChrome(KMR_CHROME, KMR_POLICY));
  problems.push(...checkChrome(CKB_CHROME, CKB_POLICY, CKB_AUTHORED_CHROME_KEYS));

  // --- Sorani corpus ---
  // Read from the module directly and never through getTrack('ckb'): tracks.ts
  // imports CKB_POLICY from this file, so reaching back through the registry
  // would close an import cycle.
  // exampleKu is folded in when an entry carries one, so the milestone that
  // adds example sentences is already under the orthography rule.
  problems.push(...checkDuplicateIds(CKB_VOCABULARY.map((w) => w.id), 'Sorani vocabulary'));
  problems.push(...checkDuplicateIds(CKB_VOCAB_THEMES.map((t) => t.id), 'Sorani vocab themes'));

  const ckbEntries: CitedEntry[] = CKB_VOCABULARY.map((word) => ({
    id: word.id,
    taught: { wordKu: word.wordKu, ...(word.exampleKu ? { exampleKu: word.exampleKu } : {}) },
    src: word.src,
    glossEn: word.wordEn,
    glossTr: word.wordTr,
  }));

  // Split by labelOrigin, not by whether a src happens to be there: an authored
  // label cannot hold one, and a cited label that lost one has to keep failing.
  const ckbAuthoredLabels: CitedEntry[] = [];

  for (const theme of CKB_VOCAB_THEMES) {
    const label: CitedEntry = {
      id: `ckb vocab theme "${theme.id}"`,
      taught: { labelKu: theme.labelKu },
      glossEn: theme.label,
      glossTr: theme.labelTr,
    };
    if (isCitedTheme(theme)) {
      ckbEntries.push({ ...label, src: theme.src });
    } else {
      ckbAuthoredLabels.push(label);
    }
    // A registered theme with no words is a tab that opens on nothing, which is
    // a defect while the track is in progress as much as after it is finished.
    if (getCkbVocabByTheme(theme.id).length === 0) {
      problems.push({ severity: 'error', message: `Sorani vocab theme "${theme.id}" (${theme.label}) has no words.` });
    }
  }

  // Course, unit and lesson titles, split by titleOrigin on the same footing as
  // the theme labels above and joined to the same two arrays, so a title is not
  // a second kind of taught string with a second set of rules.
  for (const title of CKB_TITLES) {
    const entry: CitedEntry = {
      id: title.id,
      taught: { titleKu: title.titleKu },
      glossEn: title.titleEn,
      glossTr: title.titleTr,
    };
    if (isCitedTitle(title.origin)) {
      ckbEntries.push({ ...entry, src: title.origin.src });
    } else {
      ckbAuthoredLabels.push(entry);
    }
  }

  // One id space, not three: a unit sharing an id with a lesson would still
  // resolve, but not to the row anyone meant, and a repeated lesson id would
  // put two lessons behind one progress key.
  problems.push(
    ...checkDuplicateIds(
      CKB_COURSES.flatMap((course) => [
        course.id,
        ...course.units.flatMap((unit) => [unit.id, ...unit.lessons.map((lesson) => lesson.id)]),
      ]),
      'Sorani course tree',
    ),
  );

  // Sorani lessons hold their exercises inline rather than in a keyed module, so
  // this reads the tree and not getExercisesForLesson, which answers for
  // Kurmanji. The lessons still without one are a single TRACK-01 note while the
  // track is in progress, and one error each the day it calls itself complete.
  problems.push(
    ...checkLessonCoverage(
      CKB_COURSES.flatMap((course) =>
        course.units.flatMap((unit) =>
          unit.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            exerciseCount: lesson.exercises.length,
          })),
        ),
      ),
      CKB_POLICY,
    ),
  );

  // The Sorani exercises, under the shape rules every track answers to and under
  // LEX-01 on top of them. LEX-01 is the whole of an exercise's provenance: it
  // cites no page of its own, so every taught token in one has to be a word that
  // does. The lexicon is the vocabulary and nothing else: a theme label or a
  // lesson title may be authored rather than cited, and an exercise may not
  // borrow one of those to teach with.
  const ckbExercises = CKB_COURSES.flatMap((course) =>
    course.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises)),
  );
  problems.push(...checkExerciseShapes(ckbExercises));
  problems.push(
    ...checkExerciseLexicon(
      ckbExercises,
      CKB_VOCABULARY.map((word) => word.wordKu),
      SORANI_LATIN,
    ),
  );

  problems.push(...checkCitedEntries(ckbEntries, CKB_POLICY));
  problems.push(...checkCitedEntries(ckbAuthoredLabels, CKB_AUTHORED_LABEL_POLICY));

  // The Sorani stories, under the shape rules every story answers to and under
  // LEX-02 and the DRV rules on top of them. Same bargain as LEX-01 for an
  // exercise, relaxed by one branch: a story cites no page either, but it cannot
  // be built from headwords alone, so a token is a cited headword or a form the
  // story declares. The declarations are read from the same file as the prose,
  // so a story cannot borrow another story's derivation list.
  for (const story of CKB_STORIES) {
    if (!story.icon || !story.accent) {
      problems.push({ severity: 'error', message: `Sorani story "${story.id}" is missing an icon or accent.` });
    }
    if (story.paragraphs.length === 0) {
      problems.push({ severity: 'error', message: `Sorani story "${story.id}" has no paragraphs.` });
    }
    if (story.comprehensionQuestions.length === 0) {
      problems.push({ severity: 'error', message: `Sorani story "${story.id}" has no comprehension questions.` });
    }
    story.comprehensionQuestions.forEach((q, i) => {
      if (!q.options.includes(q.correctAnswer)) {
        problems.push({ severity: 'error', message: `Sorani story "${story.id}" question ${i + 1} correctAnswer "${q.correctAnswer}" is not among its options.` });
      }
      if (!q.questionTr || !q.optionsTr || q.correctAnswerTr === undefined) {
        problems.push({ severity: 'error', message: `Sorani story "${story.id}" question ${i + 1} is missing its Turkish set (${CKB_POLICY.label} requires both bridge languages).` });
      } else if (!q.optionsTr.includes(q.correctAnswerTr)) {
        problems.push({ severity: 'error', message: `Sorani story "${story.id}" question ${i + 1} correctAnswerTr "${q.correctAnswerTr}" is not among its optionsTr.` });
      }
    });
    problems.push(
      ...checkStoryLexicon(
        [story],
        CKB_VOCABULARY.map((word) => word.wordKu),
        story.derivations,
        story.sections.map((s) => s.id),
        SORANI_LATIN,
      ),
    );
  }

  problems.push(...checkDuplicateIds(CKB_STORIES.map((s) => s.id), 'Sorani stories'));

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
