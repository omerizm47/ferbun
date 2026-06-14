import { Exercise } from '../data/types';

/**
 * Normalised match for typed-answer exercises (translation / fill-blank).
 * Handles a single correct string or a list of acceptable answers, and is
 * tolerant of surrounding whitespace and letter case. Future-proofs content
 * that lists several valid spellings (e.g. dialect variants) without ever
 * silently mis-grading because of a `string[]` value.
 */
export function checkTypedAnswer(input: string, correct: Exercise['correctAnswer']): boolean {
  const norm = (s: string) => s.trim().toLowerCase();
  const target = norm(input);
  const answers = Array.isArray(correct) ? correct : [correct];
  return answers.some((a) => norm(a) === target);
}

/** Human-readable form of a correct answer (joins multiple acceptable answers). */
export function displayAnswer(correct: Exercise['correctAnswer']): string {
  return Array.isArray(correct) ? correct.join(' / ') : correct;
}
