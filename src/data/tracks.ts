// Fêrbûn track registry. One entry per taught variety: the content modules it
// draws on, the validation policy it answers to, and the script it is written
// in. Adding a variety means adding an entry here, not teaching a screen a new
// id.
// This file holds no taught content of its own. Kurmanji binds the shipped data
// modules straight through, unchanged. Sorani binds the three corpora authored
// so far, the vocabulary, the course tree and the exercises of its first
// course, and registers empty stories, empty teach cards and empty exercises
// for the lessons still unauthored, so an unauthored half reads as a real,
// empty track instead of a crash; its orthography contract is Thackston's
// conversion table (THK06:88), carried in SORANI_LATIN. Endonyms are written in the Hawar
// alphabet with accented letters escaped, so a lookalike cannot be pasted in
// unnoticed; they are display labels, not speaker-reviewed learner content.
// Script is a stored field and is never inferred from the id, so an
// Arabic-script Sorani is a second script on the same track id.

import { CKB_CHROME, KMR_CHROME, TaughtChrome } from './chrome';
import {
  CKB_COURSES,
  getCkbCourseById,
  getCkbLessonById,
  getCkbTotalLessons,
  getCkbUnitById,
} from './ckb/courses';
import { getCkbExercisesForLesson, getCkbOrderedExercisesForLesson } from './ckb/exercises';
import {
  CKB_VOCABULARY,
  CKB_VOCAB_THEMES,
  getCkbVocabById,
  getCkbVocabByTheme,
} from './ckb/vocabulary';
import { courses, getCourseById, getLessonById, getTotalLessons, getUnitById } from './courses';
import {
  TeachCard,
  getExercisesForLesson,
  getLessonTeachCards,
  getOrderedExercisesForLesson,
} from './exercises';
import { Story, getStoryById, stories } from './stories';
import type { Course, Exercise, Lesson, Unit, VocabWord } from './types';
import { CKB_POLICY, KMR_POLICY, TrackPolicy } from './validate';
import { VOCAB_THEMES, VocabTheme, getVocabById, getVocabByTheme, vocabulary } from './vocabulary';
import type { Lang } from '../i18n/types';

export type TrackId = 'kmr' | 'ckb';

export type ScriptId = 'latn' | 'arab';

/** Everything the screens read from a track's corpus, and nothing more. */
export interface TrackContent {
  courses: Course[];
  stories: Story[];
  vocabulary: VocabWord[];
  vocabThemes: VocabTheme[];
  getCourseById: (id: string) => Course | undefined;
  getUnitById: (unitId: string) => Unit | undefined;
  getLessonById: (lessonId: string) => Lesson | undefined;
  getTotalLessons: () => number;
  getStoryById: (id: string) => Story | undefined;
  getVocabByTheme: (theme: string) => VocabWord[];
  getVocabById: (id: string) => VocabWord | undefined;
  getExercisesForLesson: (lessonId: string) => Exercise[];
  getOrderedExercisesForLesson: (lessonId: string) => Exercise[];
  getLessonTeachCards: (lessonId: string, lang?: Lang) => TeachCard[];
}

export interface TrackDef {
  id: TrackId;
  /** English name, for the picker. */
  label: string;
  endonym: string;
  /** Carries status and orthography; they are not duplicated on the track. */
  policy: TrackPolicy;
  script: ScriptId;
  content: TrackContent;
  /** Required, so a new track cannot be registered without answering for every taught string. */
  chrome: TaughtChrome;
}

export const KMR_CONTENT: TrackContent = {
  courses,
  stories,
  vocabulary,
  vocabThemes: VOCAB_THEMES,
  getCourseById,
  getUnitById,
  getLessonById,
  getTotalLessons,
  getStoryById,
  getVocabByTheme,
  getVocabById,
  getExercisesForLesson,
  getOrderedExercisesForLesson,
  getLessonTeachCards,
};

// Vocabulary, the course tree and the exercises of its first course are
// authored and bound through. Stories are not, and neither are the teach cards
// or the exercises of the other twenty-eight lessons, so those accessors answer
// empty rather than throwing and a screen reading them shows its empty state:
// the Lesson screen's "coming soon" card for a lesson with no exercises, the
// Stories tab's empty state for a track with no stories. The teach cards are
// empty for a different reason than the stories: the Kurmanji ones are not
// authored either, they are pulled out of a lesson's own exercises by matching
// a quoted gloss in an English prompt, and that is a guess this track has not
// been shown to be safe for.
export const CKB_CONTENT: TrackContent = {
  courses: CKB_COURSES,
  stories: [],
  vocabulary: CKB_VOCABULARY,
  vocabThemes: CKB_VOCAB_THEMES,
  getCourseById: getCkbCourseById,
  getUnitById: getCkbUnitById,
  getLessonById: getCkbLessonById,
  getTotalLessons: getCkbTotalLessons,
  getStoryById: () => undefined,
  getVocabByTheme: getCkbVocabByTheme,
  getVocabById: getCkbVocabById,
  getExercisesForLesson: getCkbExercisesForLesson,
  getOrderedExercisesForLesson: getCkbOrderedExercisesForLesson,
  getLessonTeachCards: () => [],
};

const KMR_TRACK: TrackDef = {
  id: 'kmr',
  label: 'Kurmanji',
  endonym: 'Kurmanc\u00EE',
  policy: KMR_POLICY,
  script: 'latn',
  content: KMR_CONTENT,
  chrome: KMR_CHROME,
};

const CKB_TRACK: TrackDef = {
  id: 'ckb',
  label: 'Sorani',
  endonym: 'Soran\u00EE',
  policy: CKB_POLICY,
  script: 'latn',
  content: CKB_CONTENT,
  chrome: CKB_CHROME,
};

// A Map, not an object literal: a literal would resolve 'toString' and every
// other Object.prototype member as if it were a registered track.
const TRACKS = new Map<TrackId, TrackDef>([
  ['kmr', KMR_TRACK],
  ['ckb', CKB_TRACK],
]);

/** Unknown ids fall back to Kurmanji, so a corrupted persisted value cannot blank the app. */
export function getTrack(id: string): TrackDef {
  return TRACKS.get(id as TrackId) ?? KMR_TRACK;
}

export function isTrackId(v: unknown): v is TrackId {
  return typeof v === 'string' && TRACKS.has(v as TrackId);
}
