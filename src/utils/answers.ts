import { Exercise } from '../data/types';

export interface TypedGrade {
  /** Accepted as correct — lenient (ignores case, punctuation, spacing and
   *  Kurdish diacritics), so "roj baş", "rojbas" and "rojbaş" all pass. */
  correct: boolean;
  /** True only when the canonical spelling was typed precisely (apart from
   *  letter case and optional sentence punctuation). Lets the UI gently show
   *  the full correct spelling when the learner is close but not exact. */
  exact: boolean;
}

// Tolerant key: unifies Unicode form, lower-cases and drops sentence
// punctuation — but KEEPS the real letters (ê, î, û, ş, ç) so an exact spelling
// can still be told apart from a loose one.
const normExact = (s: string) =>
  s
    .normalize('NFC')
    .toLowerCase()
    .replace(/[.,!?;:¡¿…"“”«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Looser key for acceptance: additionally folds Kurdish diacritics to plain
// ASCII (ê→e, î→i, û→u, ş→s, ç→c, ı→i) and removes every space, hyphen and
// apostrophe — so "roj baş" / "rojbas" / "rojbaş" match, as do "Fêrbûn" and
// "Ferbun".
const normLoose = (s: string) =>
  normExact(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[\s\-'’]/g, '');

/**
 * Grade a typed answer for translation / fill-blank exercises. Accepts a single
 * correct string or a list of acceptable spellings, and reports both whether it
 * is accepted (lenient) and whether it was spelled exactly.
 */
export function gradeTypedAnswer(
  input: string,
  correct: Exercise['correctAnswer'],
): TypedGrade {
  const answers = Array.isArray(correct) ? correct : [correct];
  const exactIn = normExact(input);
  const looseIn = normLoose(input);
  const exact = answers.some((a) => normExact(a) === exactIn);
  const accepted = exact || answers.some((a) => normLoose(a) === looseIn);
  return { correct: accepted, exact };
}

/** Boolean convenience wrapper around {@link gradeTypedAnswer} (lenient). */
export function checkTypedAnswer(input: string, correct: Exercise['correctAnswer']): boolean {
  return gradeTypedAnswer(input, correct).correct;
}

/** Human-readable form of a correct answer (joins multiple acceptable answers). */
export function displayAnswer(correct: Exercise['correctAnswer']): string {
  return Array.isArray(correct) ? correct.join(' / ') : correct;
}
