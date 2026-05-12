// Fêrbûn — Course & Unit structure
// Derived from Thackston's Kurmanji Kurdish Reference Grammar

export interface Course {
  id: string;
  title: string;
  titleKu: string;
  description: string;
  icon: string;
  units: Unit[];
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
