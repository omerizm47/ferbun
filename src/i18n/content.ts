// Content resolution layer: given a content object and the active bridge
// language, return the right string. Turkish is used only when present;
// otherwise English is returned. This means partial translation can never
// break the app — an untranslated lesson simply shows English.
//
// The language being taught (Kurmanji: titleKu, wordKu, StoryWord.ku, the
// Kurdish story text) is never routed through here — it is identical for every
// learner.

import { Lang } from './types';
import type { Course, Unit, Lesson, Exercise, VocabWord } from '../data/types';
import type { Story, StoryWord, ComprehensionQuestion } from '../data/stories';

/** Bridge-language pick: Turkish when active and provided, else English. */
function bridge(lang: Lang, tr: string | undefined, en: string): string {
  return lang === 'tr' && tr ? tr : en;
}

// --- Course / Unit / Lesson ------------------------------------------------
export const courseTitle = (c: Course, lang: Lang): string => bridge(lang, c.titleTr, c.title);
export const courseDescription = (c: Course, lang: Lang): string =>
  bridge(lang, c.descriptionTr, c.description);
export const unitTitle = (u: Unit, lang: Lang): string => bridge(lang, u.titleTr, u.title);
export const unitDescription = (u: Unit, lang: Lang): string =>
  bridge(lang, u.descriptionTr, u.description);
export const lessonTitle = (l: Lesson, lang: Lang): string => bridge(lang, l.titleTr, l.title);

// --- Exercises -------------------------------------------------------------
/** The bridge-language instruction/gloss (questionEn slot). */
export const exercisePrompt = (e: Exercise, lang: Lang): string | undefined =>
  e.questionEn === undefined ? undefined : bridge(lang, e.questionTr, e.questionEn);

/** The displayed Kurmanji line; localized only when it embeds a gloss (e.g. "na = yes"). */
export const exercisePromptKu = (e: Exercise, lang: Lang): string | undefined =>
  e.questionKu === undefined ? undefined : bridge(lang, e.questionKuTr, e.questionKu);

export const exerciseExplanation = (e: Exercise, lang: Lang): string | undefined =>
  e.explanation === undefined ? undefined : bridge(lang, e.explanationTr, e.explanation);

/**
 * Multiple-choice options and their correct answer, resolved together so they
 * always come from the same language. If the Turkish pair is incomplete, both
 * fall back to English — the answer can never desync.
 */
export function resolveChoices(
  e: Exercise,
  lang: Lang,
): { options: string[] | undefined; correct: string | string[] } {
  if (lang === 'tr' && e.optionsTr && e.correctAnswerTr !== undefined) {
    return { options: e.optionsTr, correct: e.correctAnswerTr };
  }
  return { options: e.options, correct: e.correctAnswer };
}

/**
 * Correct answer for a typed (translation / fill-in) exercise. Normally the
 * answer is Kurmanji (typed identically in either bridge language), so this
 * just returns correctAnswer. The rare exception is a fill-in-the-gloss item
 * (e.g. "Ez dizanim → I ____"), where correctAnswerTr supplies the Turkish word.
 */
export function resolveTypedAnswer(e: Exercise, lang: Lang): string | string[] {
  if (lang === 'tr' && e.correctAnswerTr !== undefined) return e.correctAnswerTr;
  return e.correctAnswer;
}

// --- Vocabulary ------------------------------------------------------------
export const vocabGloss = (w: VocabWord, lang: Lang): string => bridge(lang, w.wordTr, w.wordEn);
export const vocabExample = (w: VocabWord, lang: Lang): string | undefined =>
  w.exampleEn === undefined ? undefined : bridge(lang, w.exampleTr, w.exampleEn);

/** Theme label resolver (structural: works for VOCAB_THEMES entries). */
export const themeLabel = (
  t: { label: string; labelTr?: string },
  lang: Lang,
): string => bridge(lang, t.labelTr, t.label);

// --- Stories ---------------------------------------------------------------
/** Bridge-language title gloss (story.title stays Kurmanji). */
export const storyTitleGloss = (s: Story, lang: Lang): string => bridge(lang, s.titleTr, s.titleEn);
export const storyDescription = (s: Story, lang: Lang): string =>
  bridge(lang, s.descriptionTr, s.description);
export const storyWordGloss = (w: StoryWord, lang: Lang): string => bridge(lang, w.tr, w.en);

/** Comprehension question + options + answer, resolved together (same-language guarantee). */
export function resolveStoryQuestion(
  q: ComprehensionQuestion,
  lang: Lang,
): { question: string; options: string[]; correct: string } {
  if (lang === 'tr' && q.questionTr && q.optionsTr && q.correctAnswerTr !== undefined) {
    return { question: q.questionTr, options: q.optionsTr, correct: q.correctAnswerTr };
  }
  return { question: q.question, options: q.options, correct: q.correctAnswer };
}
