// Fêrbûn — Course & Unit structure
// Derived from Thackston's Kurmanji Kurdish Reference Grammar

export interface Course {
  id: string;
  title: string;
  titleKu: string;
  description: string;
  icon: string;
  units: Unit[];
  // Optional Turkish bridge-language text (falls back to English when absent).
  titleTr?: string;
  descriptionTr?: string;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  titleKu: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  // Optional Turkish bridge-language text (falls back to English when absent).
  titleTr?: string;
  descriptionTr?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  titleKu: string;
  type: 'vocab' | 'grammar' | 'culture' | 'reading';
  order: number;
  xpReward: number;
  exercises: Exercise[];
  // Optional Turkish bridge-language title (falls back to English when absent).
  titleTr?: string;
}

export type ExerciseType =
  | 'multiple_choice'
  | 'translation'
  | 'fill_blank'
  | 'match_pairs'
  | 'true_false';

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  questionEn?: string;
  questionKu?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  order: number;
  // Optional Turkish bridge-language fields (fall back to English when absent).
  // questionKuTr only for the rare statement that embeds a gloss (e.g. 'na = yes').
  // optionsTr + correctAnswerTr are resolved together so a multiple-choice answer
  // can never desync across languages.
  questionTr?: string;
  questionKuTr?: string;
  optionsTr?: string[];
  correctAnswerTr?: string | string[];
  explanationTr?: string;
  // For match_pairs only: Kurdish↔meaning pairs to connect. The bridge language
  // picks the gloss side (tr when present, else en). These exercises use `pairs`
  // instead of options/correctAnswer.
  pairs?: MatchPair[];
}

/** A single Kurdish word and its meaning, for match_pairs exercises. */
export interface MatchPair {
  ku: string;
  en: string;
  tr?: string;
}

export interface VocabWord {
  id: string;
  wordKu: string;
  wordEn: string;
  gender?: 'm' | 'f';
  partOfSpeech: string;
  exampleKu?: string;
  exampleEn?: string;
  theme: string;
  unitId?: string;
  // Optional Turkish bridge-language gloss/example (fall back to English when absent).
  wordTr?: string;
  exampleTr?: string;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
}

export interface VocabMastery {
  vocabId: string;
  masteryLevel: number; // 0-5
  nextReviewAt?: string;
  lastReviewedAt?: string;
}
