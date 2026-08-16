// Fêrbûn: the Sorani course structure, the tree the Learn tab renders. Three
// courses, ten units, forty lessons, the same shape and the same
// beginner-to-advanced arc as the Kurmanji tree in ../courses.ts, resting on the
// 255 words the seventeen ./vocab themes teach.
// No exercises: every lesson ships with an empty `exercises` array, which the
// Lesson screen answers with its "coming soon" state and validate.ts reports as
// one TRACK-01 note while the track is in progress.
//
// WHY A TITLE CARRIES A PROVENANCE FIELD. A course, unit or lesson title is
// authored navigation copy, not taught vocabulary, and most of them name a class
// no glossary has a headword for: "Yes, No & Common Words" is not a word. The
// vocab theme labels met this first and the answer is reused here rather than
// invented a second time. ./vocabulary.ts splits its labels into
// CitedVocabTheme and AuthoredVocabTheme on a `labelOrigin` discriminant; the
// same split runs over titles under `titleOrigin`. A title whose Sorani wording
// is a headword Thackston prints cites the page for it, exactly as a vocabulary
// entry does, with the same `from` holding his transcription verbatim. A title
// that is a phrase composed for this app says so, and its `titleNote` names the
// cited parts it was built from. The three citation fields are declared `never`
// on the authored half, so a composed title cannot be handed a page it has no
// claim to: that is a type error rather than a comment someone has to notice.
//
// Where a lesson is built around one of the vocab themes, its title is that
// theme's own labelKu with the theme's own citation, so the two screens name the
// same body of words with the same sourced word.
//
// Every composed title is built out of headwords this corpus already cites,
// joined by u "and" (THK06:234), so no part of one is an invention even though
// the phrase is. One authored title is a single word rather than a phrase, and
// it is the one to read closely: dûbare, carried by all ten review lessons.
// Its note says what it is and what it is not.
// No native speaker has reviewed any of it.

import { CKB_C1_UNITS } from './units/c1';
import { CKB_C2_UNITS } from './units/c2';
import { CKB_C3_UNITS } from './units/c3';
import type { Course, Lesson, Unit } from '../types';

/** A title whose Sorani wording is a headword Thackston prints, carrying the locator for it. */
export interface CitedTitle {
  titleOrigin: 'cited';
  /** Page carrying the form and its English gloss, e.g. 'THK06:228'. */
  src: string;
  /** Thackston's transcription, copied verbatim; titleKu is it put through the p. 88 table. */
  from: string;
  /** Why the cited page prints something other than `from`. */
  fromNote?: string;
}

/**
 * A title the glossary has no headword for, authored for this app exactly as
 * the Turkish title is. The citation fields are `never` rather than absent, so
 * `{ titleOrigin: 'authored', src: 'THK06:228' }` cannot be written.
 * This covers navigation copy only. A vocabulary entry has no such variant.
 */
export interface AuthoredTitle {
  titleOrigin: 'authored';
  /** What the phrase is composed of, part by part with its page, or why nothing can be cited. */
  titleNote: string;
  src?: never;
  from?: never;
  fromNote?: never;
}

/** Cited or authored, never both and never neither. */
export type SoraniTitle = CitedTitle | AuthoredTitle;

export type SoraniLesson = Lesson & SoraniTitle;
export type SoraniUnit = Omit<Unit, 'lessons'> & { lessons: SoraniLesson[] } & SoraniTitle;
export type SoraniCourse = Omit<Course, 'units'> & { units: SoraniUnit[] } & SoraniTitle;

/** Narrows to the cited half, so a caller reading `src` or `from` has to say which titles it means. */
export const isCitedTitle = (title: SoraniTitle): title is CitedTitle => title.titleOrigin === 'cited';

export const CKB_COURSES: SoraniCourse[] = [
  {
    id: 'ckb-c1',
    title: 'First Words',
    titleKu: 'sllaw u binemalle',
    description: 'Essential words and phrases to start speaking Sorani',
    titleTr: 'İlk Kelimeler',
    descriptionTr: 'Soranice konuşmaya başlamak için temel kelimeler ve ifadeler',
    icon: 'book-outline',
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two headwords the course opens on: sllaw "greetings" (THK06:228, słâw) ' +
      'and binemalle "family" (THK06:171, binamâła), joined by u "and" (THK06:234). Nothing in the glossary ' +
      'names the class the English title names, and a phrase is authored however well each of its parts is cited.',
    units: CKB_C1_UNITS,
  },
  {
    id: 'ckb-c2',
    title: 'Building Sentences',
    titleKu: 'reng u jimare',
    description: 'Describe the world and form sentences',
    titleTr: 'Cümle Kurma',
    descriptionTr: 'Dünyayı betimle ve cümleler kur',
    icon: 'construct-outline',
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from reng "colour" (THK06:219, rang) and jimare "number" (THK06:239, zhimâra), ' +
      'joined by u "and" (THK06:234). They name two of the course\'s three units; the third, nature and ' +
      'animals, is left out to keep the phrase to two parts.',
    units: CKB_C2_UNITS,
  },
  {
    id: 'ckb-c3',
    title: 'Actions & Verbs',
    titleKu: 'kirdar',
    description: 'Express what you do, want, and can do',
    titleTr: 'Eylemler & Fiiller',
    descriptionTr: 'Ne yaptığını, istediğini ve yapabildiğini ifade et',
    icon: 'flash-outline',
    titleOrigin: 'authored',
    titleNote:
      'Neither composed nor cited: kirdar is the authored label ./vocabulary.ts already carries for the verbs ' +
      'theme, and that row\'s labelNote sets out the search behind it, that no headword in the glossary is ' +
      'glossed "verb" and that kâr and kirda name neither class. It is repeated here rather than replaced so ' +
      'the course and the theme it leads with read the same word, and it is authored here for the same reason ' +
      'it is authored there.',
    units: CKB_C3_UNITS,
  },
];

/** Every titled node in the tree, flattened so the citation checks have one list to walk. */
export interface CkbTitle {
  /** Reads as it will inside an issue message, e.g. 'ckb lesson "ckb-l1_1"'. */
  id: string;
  titleKu: string;
  titleEn: string;
  titleTr: string;
  origin: SoraniTitle;
}

type TitledNode = { id: string; title: string; titleKu: string; titleTr?: string } & SoraniTitle;

function titleOf(kind: 'course' | 'unit' | 'lesson', node: TitledNode): CkbTitle {
  return {
    id: `ckb ${kind} "${node.id}"`,
    titleKu: node.titleKu,
    titleEn: node.title,
    titleTr: node.titleTr ?? '',
    origin:
      node.titleOrigin === 'cited'
        ? {
            titleOrigin: 'cited',
            src: node.src,
            from: node.from,
            ...(node.fromNote ? { fromNote: node.fromNote } : {}),
          }
        : { titleOrigin: 'authored', titleNote: node.titleNote },
  };
}

export const CKB_TITLES: CkbTitle[] = CKB_COURSES.flatMap((course) => [
  titleOf('course', course),
  ...course.units.flatMap((unit) => [
    titleOf('unit', unit),
    ...unit.lessons.map((lesson) => titleOf('lesson', lesson)),
  ]),
]);

export const getCkbCourseById = (id: string) => CKB_COURSES.find((c) => c.id === id);

export const getCkbUnitById = (unitId: string) => {
  for (const course of CKB_COURSES) {
    const unit = course.units.find((u) => u.id === unitId);
    if (unit) return unit;
  }
  return undefined;
};

export const getCkbLessonById = (lessonId: string) => {
  for (const course of CKB_COURSES) {
    for (const unit of course.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
};

export const getCkbTotalLessons = () =>
  CKB_COURSES.reduce((total, course) => total + course.units.reduce((n, unit) => n + unit.lessons.length, 0), 0);
