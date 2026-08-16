// Fêrbûn: what a Sorani exercise is, and the two accessors the Lesson screen
// reads it through.
//
// WHY AN EXERCISE CARRIES A DECLARATION AND NOT A CITATION. A vocabulary entry
// is a claim about the language and cites the page it was copied from. An
// exercise is not: it is authored pedagogy, and no reference grammar prints
// lesson design, so there is no page to name. What makes one verifiable instead
// is that it asserts nothing new. Every Sorani token in a Sorani exercise has to
// be a wordKu the glossary already carries, so the exercise inherits the
// provenance of the 255 cited words rather than adding a 256th uncited one.
// That is LEX-01 in ../validate.ts, and it is mechanical.
//
// The one thing the rule cannot read off an exercise is which side of it holds
// Sorani, because both directions are authored: "What does this word mean?"
// puts the Sorani in the prompt and English glosses in the options, and "How do
// you say X in Sorani?" does the reverse. So the direction is declared in the
// data, as `answerIn`, on the same footing as the labelOrigin and titleOrigin
// discriminants elsewhere in this corpus. It is required rather than optional:
// authoring an exercise means saying which language its answer side is in, and
// the field cannot be left off and default to unchecked.
// questionKu and every pairs[].ku are Sorani whatever `answerIn` says, and the
// rule reads them either way, so the declaration governs the answer side alone.
//
// Everything else on an exercise is bridge copy: questionEn, questionTr,
// explanation, explanationTr, and the Turkish halves of a choice set. Those
// carry no citation, exactly as a Turkish gloss does not, and no Sorani belongs
// in them.

import { getCkbLessonById } from './courses';
import type { Exercise, ExerciseType } from '../types';

/** Which language the options and correctAnswer of an exercise are written in. */
export type AnswerLang = 'ckb' | 'bridge';

/** A Kurmanji Exercise plus the one declaration LEX-01 cannot infer. */
export type SoraniExercise = Exercise & { answerIn: AnswerLang };

// Same order policy as the Kurmanji track: recognition before production. The
// list is repeated rather than imported, because ../exercises.ts does not
// export it and that file is Kurmanji content this milestone does not touch.
const RECOGNITION_FIRST: ExerciseType[] = ['multiple_choice', 'true_false', 'match_pairs'];

/**
 * The lesson's own exercises, read off the course tree rather than from a keyed
 * map, so the tree stays the single place a Sorani lesson is described and the
 * coverage note in ../validate.ts counts the same arrays the screens render.
 */
export const getCkbExercisesForLesson = (lessonId: string): SoraniExercise[] =>
  getCkbLessonById(lessonId)?.exercises ?? [];

/** Recognition-first, preserving the authored order within each group. */
export const getCkbOrderedExercisesForLesson = (lessonId: string): SoraniExercise[] => {
  const list = getCkbExercisesForLesson(lessonId);
  return [
    ...list.filter((e) => RECOGNITION_FIRST.includes(e.type)),
    ...list.filter((e) => !RECOGNITION_FIRST.includes(e.type)),
  ];
};
