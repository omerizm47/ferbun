/**
 * Fisher–Yates shuffle. Returns a NEW array; does not mutate the input.
 * Cross-platform pure function — safe to memoize per exercise.
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
