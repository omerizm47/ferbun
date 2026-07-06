// Dev-only content integrity checks. Catches authoring mistakes (an answer that
// isn't among its options, an empty lesson, an orphaned vocab theme) before they
// ship as an unanswerable question or a blank screen. Pure + side-effect free —
// returns a list of human-readable problems. Wire `runContentValidation()` in
// __DEV__ only; it is a no-op cost in production (never called).

import { courses } from './courses';
import { getExercisesForLesson } from './exercises';
import { stories } from './stories';
import { VOCAB_THEMES, getVocabByTheme } from './vocabulary';

/** Returns a list of content problems. Empty array = all clean. */
export function validateContent(): string[] {
  const problems: string[] = [];

  // --- Courses → units → lessons → exercises ---
  for (const course of courses) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        const exercises = getExercisesForLesson(lesson.id);
        if (exercises.length === 0) {
          problems.push(`Lesson "${lesson.id}" (${lesson.title}) has no exercises.`);
          continue;
        }
        for (const ex of exercises) {
          const ca = ex.correctAnswer;
          if (ex.type === 'multiple_choice') {
            if (!ex.options || ex.options.length < 2) {
              problems.push(`Exercise "${ex.id}" (multiple_choice) has fewer than 2 options.`);
            } else if (typeof ca !== 'string') {
              problems.push(`Exercise "${ex.id}" (multiple_choice) correctAnswer must be a string.`);
            } else if (!ex.options.includes(ca)) {
              problems.push(`Exercise "${ex.id}" correctAnswer "${ca}" is not among its options [${ex.options.join(', ')}].`);
            }
          } else if (ex.type === 'true_false') {
            if (ca !== 'True' && ca !== 'False') {
              problems.push(`Exercise "${ex.id}" (true_false) correctAnswer must be "True" or "False", got "${String(ca)}".`);
            }
          } else if (ex.type === 'translation' || ex.type === 'fill_blank') {
            if (typeof ca !== 'string' || ca.trim() === '') {
              problems.push(`Exercise "${ex.id}" (${ex.type}) correctAnswer must be a non-empty string.`);
            }
          } else if (ex.type === 'match_pairs') {
            if (!ex.pairs || ex.pairs.length < 2) {
              problems.push(`Exercise "${ex.id}" (match_pairs) needs at least 2 pairs.`);
            } else {
              ex.pairs.forEach((p, pi) => {
                if (!p.ku || !p.en) {
                  problems.push(`Exercise "${ex.id}" pair ${pi + 1} is missing a Kurdish word or meaning.`);
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
              problems.push(`Exercise "${ex.id}" has a partial Turkish choice set (optionsTr and correctAnswerTr must both be present).`);
            } else {
              const caTr = ex.correctAnswerTr;
              if (typeof caTr === 'string' && !ex.optionsTr.includes(caTr)) {
                problems.push(`Exercise "${ex.id}" correctAnswerTr "${caTr}" is not among its optionsTr [${ex.optionsTr.join(', ')}].`);
              }
            }
          } else if (!isChoice && ex.optionsTr) {
            problems.push(`Exercise "${ex.id}" (${ex.type}) should not define optionsTr.`);
          }
        }
      }
    }
  }

  // --- Stories ---
  for (const story of stories) {
    if (!story.icon || !story.accent) {
      problems.push(`Story "${story.id}" is missing an icon or accent.`);
    }
    if (!story.paragraphs || story.paragraphs.length === 0) {
      problems.push(`Story "${story.id}" has no paragraphs.`);
    }
    if (story.comprehensionQuestions.length === 0) {
      problems.push(`Story "${story.id}" has no comprehension questions.`);
    }
    story.comprehensionQuestions.forEach((q, i) => {
      if (!q.options || q.options.length < 2) {
        problems.push(`Story "${story.id}" question ${i + 1} has fewer than 2 options.`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        problems.push(`Story "${story.id}" question ${i + 1} correctAnswer "${q.correctAnswer}" is not among its options.`);
      }
      // Turkish parity (only where translated): question + options + answer must be
      // a complete set, and the answer must be among the Turkish options.
      if (q.questionTr || q.optionsTr || q.correctAnswerTr !== undefined) {
        if (!q.questionTr || !q.optionsTr || q.correctAnswerTr === undefined) {
          problems.push(`Story "${story.id}" question ${i + 1} has a partial Turkish translation (questionTr, optionsTr and correctAnswerTr must all be present).`);
        } else if (!q.optionsTr.includes(q.correctAnswerTr)) {
          problems.push(`Story "${story.id}" question ${i + 1} correctAnswerTr "${q.correctAnswerTr}" is not among its optionsTr.`);
        }
      }
    });
  }

  // --- Vocabulary themes ---
  for (const theme of VOCAB_THEMES) {
    if (getVocabByTheme(theme.id).length === 0) {
      problems.push(`Vocab theme "${theme.id}" (${theme.label}) has no words.`);
    }
  }

  return problems;
}

/** Logs content problems once in development. No-op in production. */
export function runContentValidation(): void {
  if (!__DEV__) return;
  const problems = validateContent();
  if (problems.length > 0) {
    console.warn(
      `[Fêrbûn content] ${problems.length} issue(s) found:\n` +
        problems.map((p) => `  • ${p}`).join('\n'),
    );
  }
}
