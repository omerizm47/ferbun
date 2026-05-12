import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS, FONT_SIZE, XP_PER_LESSON, XP_PER_PERFECT_LESSON } from '../theme';
import { useProgressStore } from '../stores/progressStore';
import { getLessonById } from '../data/courses';
import { getExercisesForLesson } from '../data/exercises';
import { RootStackParamList } from '../navigation/AppNavigator';
import MultipleChoiceExercise from '../components/exercises/MultipleChoiceExercise';
import TranslationExercise from '../components/exercises/TranslationExercise';
import MatchPairsExercise from '../components/exercises/MatchPairsExercise';
import TrueFalseExercise from '../components/exercises/TrueFalseExercise';
import FillBlankExercise from '../components/exercises/FillBlankExercise';

type RoutePropType = RouteProp<RootStackParamList, 'Lesson'>;

export default function LessonScreen() {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const exercises = getExercisesForLesson(lessonId);
  const { completeLesson } = useProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  const totalExercises = exercises.length;
  const progress = totalExercises > 0 ? (currentIndex + (isFinished ? 1 : 0)) / totalExercises : 0;

  const handleAnswer = useCallback((correct: boolean) => {
    setLastCorrect(correct);
    setShowFeedback(true);
    if (correct) setCorrectCount((c) => c + 1);
  }, []);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    if (currentIndex + 1 >= totalExercises) {
      setIsFinished(true);
      // correctCount already includes the last answer from handleAnswer
      const finalCorrect = correctCount;
      const score = totalExercises > 0 ? Math.min(100, Math.round(finalCorrect / totalExercises * 100)) : 100;
      const xp = score === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
      completeLesson(lessonId, score, xp);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalExercises, correctCount, lessonId, completeLesson]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  if (totalExercises === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={28} color={COLORS.gray[600]} />
          </TouchableOpacity>
          <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '100%' }]} /></View>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="construct-outline" size={56} color={COLORS.gray[400]} style={{ marginBottom: SPACING.lg }} />
          <Text style={styles.emptyTitle}>Coming Soon</Text>
          <Text style={styles.emptyText}>Exercises for "{lesson.title}" are being prepared. Check back soon!</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isFinished) {
    const finalScore = Math.min(100, Math.round(correctCount / totalExercises * 100));
    const xpEarned = finalScore === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
    const messages = [
      { min: 0, text: "Keep practicing — you'll get there.", icon: 'refresh' as const },
      { min: 50, text: "Good effort. Practice makes perfect.", icon: 'trending-up' as const },
      { min: 80, text: "Great job. Almost perfect.", icon: 'star' as const },
      { min: 100, text: "Perfect score. Well done.", icon: 'checkmark-circle' as const },
    ];
    const msg = [...messages].reverse().find((m) => finalScore >= m.min)!;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishScreen}>
          <Ionicons name={msg.icon} size={64} color={COLORS.fire[500]} style={{ marginBottom: SPACING.lg }} />
          <Text style={styles.finishTitle}>Lesson Complete!</Text>
          <Text style={styles.finishMessage}>{msg.text}</Text>
          <View style={styles.finishStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{finalScore}%</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{correctCount}/{totalExercises}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>+{xpEarned}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentExercise = exercises[currentIndex];

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multiple_choice':
        return <MultipleChoiceExercise exercise={currentExercise} onAnswer={handleAnswer} disabled={showFeedback} />;
      case 'translation':
        return <TranslationExercise exercise={currentExercise} onAnswer={handleAnswer} disabled={showFeedback} />;
      case 'match_pairs':
        return <MatchPairsExercise exercise={currentExercise} onAnswer={handleAnswer} disabled={showFeedback} />;
      case 'true_false':
        return <TrueFalseExercise exercise={currentExercise} onAnswer={handleAnswer} disabled={showFeedback} />;
      case 'fill_blank':
        return <FillBlankExercise exercise={currentExercise} onAnswer={handleAnswer} disabled={showFeedback} />;
      default:
        return <Text>Unknown exercise type</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color={COLORS.gray[600]} />
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.counterText}>{currentIndex + 1}/{totalExercises}</Text>
      </View>

      <View style={styles.exerciseArea}>
        {renderExercise()}
      </View>

      {showFeedback && (
        <View style={[styles.feedbackBar, lastCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <View style={styles.feedbackContent}>
            <Ionicons
              name={lastCorrect ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={lastCorrect ? COLORS.success : COLORS.error}
            />
            <Text style={[styles.feedbackText, { color: lastCorrect ? COLORS.success : COLORS.error }]}>
              {lastCorrect ? 'Baş e! Correct!' : 'Not quite.'}
            </Text>
          </View>
          {!lastCorrect && (
            <View style={styles.correctAnswerBox}>
              <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
              <Text style={styles.correctAnswerText}>
                {Array.isArray(currentExercise.correctAnswer) ? currentExercise.correctAnswer.join(', ') : currentExercise.correctAnswer}
              </Text>
            </View>
          )}
          {currentExercise.explanation && (
            <Text style={styles.explanationText}>{currentExercise.explanation}</Text>
          )}
          <TouchableOpacity style={[styles.nextBtn, lastCorrect ? styles.nextBtnCorrect : styles.nextBtnWrong]} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md, paddingBottom: SPACING.sm, gap: SPACING.sm,
  },
  closeBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  progressBarBg: { flex: 1, height: 10, backgroundColor: COLORS.gray[200], borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.fire[500], borderRadius: RADIUS.full },
  counterText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray[500], width: 40, textAlign: 'right' },
  exerciseArea: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  feedbackBar: {
    padding: SPACING.lg, paddingBottom: 32, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    shadowColor: COLORS.black, shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 10,
  },
  feedbackCorrect: { backgroundColor: '#F0FDF4', borderTopWidth: 3, borderTopColor: COLORS.success },
  feedbackWrong: { backgroundColor: '#FEF2F2', borderTopWidth: 3, borderTopColor: COLORS.error },
  feedbackContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  feedbackText: { fontSize: FONT_SIZE.lg, fontWeight: '700' },
  correctAnswerBox: { backgroundColor: 'rgba(0,0,0,0.04)', padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: SPACING.sm, borderLeftWidth: 3, borderLeftColor: COLORS.success },
  correctAnswerLabel: { fontSize: FONT_SIZE.xs, fontWeight: '600', color: COLORS.gray[500], textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  correctAnswerText: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.kurdish[700] },
  explanationText: { fontSize: FONT_SIZE.sm, color: COLORS.gray[600], marginBottom: SPACING.md, lineHeight: 20, backgroundColor: 'rgba(0,0,0,0.03)', padding: SPACING.sm, borderRadius: RADIUS.sm },
  nextBtn: { paddingVertical: 14, borderRadius: RADIUS.lg, alignItems: 'center' },
  nextBtnCorrect: { backgroundColor: COLORS.success },
  nextBtnWrong: { backgroundColor: COLORS.error },
  nextBtnText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700', letterSpacing: 0.3 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  emptyTitle: { fontSize: FONT_SIZE.xxl, fontWeight: '700', color: COLORS.midnight[800], marginBottom: SPACING.sm },
  emptyText: { fontSize: FONT_SIZE.md, color: COLORS.gray[500], textAlign: 'center', marginBottom: SPACING.xl },
  primaryBtn: { backgroundColor: COLORS.fire[500], paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, borderRadius: RADIUS.lg },
  primaryBtnText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
  finishScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl, backgroundColor: COLORS.cream[50] },
  // finishEmoji removed — using Ionicons instead
  finishTitle: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: COLORS.midnight[800], marginBottom: SPACING.sm },
  finishMessage: { fontSize: FONT_SIZE.lg, color: COLORS.gray[600], textAlign: 'center', marginBottom: SPACING.xl },
  finishStats: { flexDirection: 'row', gap: SPACING.lg, marginBottom: SPACING.xl },
  statBox: { alignItems: 'center', backgroundColor: COLORS.white, padding: SPACING.lg, borderRadius: RADIUS.lg, minWidth: 80 },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: COLORS.fire[600] },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.gray[500], marginTop: 4 },
});
