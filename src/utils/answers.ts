import { Exercise } from '../data/types';

/**
 * Kurdish-aware character normalisation for typed-answer exercises.
 *
 * Two tiers of tolerance are applied before comparing:
 *   1. Whitespace trim + lower-case (universal).
 *   2. Kurdish diacritic folding: ê→e, î→i, û→u.
 *      These three letters are absent from standard Latin keyboards, so
 *      learners on a phone keyboard physically cannot type them without a
 *      special input method. Folding lets them answer correctly without
 *      being penalised for hardware they don't control.
 *   3. Trailing punctuation strip: a sentence like "Baş e." is accepted
 *      even if the user writes "baş e" (no period). Leading/embedded
 *      punctuation is left intact so "ez/min" stays distinct from "ezmin".
 *
 * ş and ç are intentionally folded (ş→s, ç→c) so that users without Turkish/Kurdish
 * keyboard layouts (or writing quickly, e.g. "rojbas" instead of "rojbaş") can still
 * match successfully.
 */
function normKurdish(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ê/g, 'e')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/[.,!?;]+$/g, '') // strip trailing punctuation only
    .trim();
}

/**
 * Normalised match for typed-answer exercises (translation / fill-blank).
 * Handles a single correct string or a list of acceptable answers.
 */
export function checkTypedAnswer(input: string, correct: Exercise['correctAnswer']): boolean {
  const target = normKurdish(input);
  const answers = Array.isArray(correct) ? correct : [correct];
  return answers.some((a) => normKurdish(a) === target);
}

/** Human-readable form of a correct answer (joins multiple acceptable answers). */
export function displayAnswer(correct: Exercise['correctAnswer']): string {
  return Array.isArray(correct) ? correct.join(' / ') : correct;
}
