import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Alert,
} from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SPACING, RADIUS, FONT_SIZE, XP_PER_LESSON, XP_PER_PERFECT_LESSON, SHADOWS, TYPOGRAPHY, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { lessonTitle, exerciseExplanation, resolveChoices, resolveTypedAnswer } from '../i18n/content';
import { useProgressStore } from '../stores/progressStore';
import { getLessonById } from '../data/courses';
import { getOrderedExercisesForLesson, getLessonTeachCards } from '../data/exercises';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import AnimatedProgressBar from '../components/ui/AnimatedProgressBar';
import Button from '../components/ui/Button';
import { KurdishSun, KilimBorder } from '../components/ui/KurdishDecorations';
import CoachMark, { CoachStep } from '../components/ui/CoachMark';
import EmptyState from '../components/ui/EmptyState';
import AnswerSheet from '../components/ui/AnswerSheet';
import CelebrationOverlay, { Celebration } from '../components/ui/CelebrationOverlay';
import { useCoachMarks } from '../hooks/useCoachMarks';
import { CM_LESSON_KEY } from '../stores/onboardingStore';
import MultipleChoiceExercise from '../components/exercises/MultipleChoiceExercise';
import TranslationExercise from '../components/exercises/TranslationExercise';
import MatchPairsExercise from '../components/exercises/MatchPairsExercise';
import TrueFalseExercise from '../components/exercises/TrueFalseExercise';
import FillBlankExercise from '../components/exercises/FillBlankExercise';

type RoutePropType = RouteProp<RootStackParamList, 'Lesson'>;

const LESSON_COACH_CONFIG: { icon: CoachStep['icon']; align: CoachStep['align'] }[] = [
  { icon: 'bulb', align: 'center' },
  { icon: 'speedometer', align: 'top' },
];

export default function LessonScreen() {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const insets = useSafeAreaInsets();
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const exercises = useMemo(() => getOrderedExercisesForLesson(lessonId), [lessonId]);
  const { completeLesson } = useProgressStore();
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const teachCards = useMemo(() => getLessonTeachCards(lessonId, lang), [lessonId, lang]);
  const styles = useMemo(() => makeStyles(c), [c]);
  const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';

  const [phase, setPhase] = useState<'teach' | 'practice'>(() => (teachCards.length >= 2 ? 'teach' : 'practice'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  const totalExercises = exercises.length;
  const progress = totalExercises > 0 ? (currentIndex + (showFeedback || isFinished ? 1 : 0)) / totalExercises : 0;

  // Confirm before discarding an in-progress practice run (≥1 answer given,
  // not yet finished). Teach phase / empty state / pre-first-answer exit freely.
  const handleClose = useCallback(() => {
    const answered = currentIndex > 0 || showFeedback;
    if (phase === 'practice' && answered && !isFinished) {
      haptics.selection();
      Alert.alert(
        t.lesson.quitTitle,
        t.lesson.quitMessage,
        [
          { text: t.lesson.keepGoing, style: 'cancel' },
          { text: t.lesson.quit, style: 'destructive', onPress: () => navigation.goBack() },
        ],
      );
    } else {
      navigation.goBack();
    }
  }, [phase, currentIndex, showFeedback, isFinished, navigation, t]);

  const handleAnswer = useCallback((correct: boolean) => {
    setLastCorrect(correct);
    setShowFeedback(true);
    if (correct) setCorrectCount((c) => c + 1);
  }, []);

  const handleNext = useCallback(() => {
    haptics.medium();
    setShowFeedback(false);
    if (currentIndex + 1 >= totalExercises) {
      setIsFinished(true);
      // correctCount already includes the last answer from handleAnswer
      const finalCorrect = correctCount;
      const score = totalExercises > 0 ? Math.min(100, Math.round(finalCorrect / totalExercises * 100)) : 100;
      const xp = score === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
      const result = completeLesson(lessonId, score, xp);
      // Queue any milestone celebrations to play over the finish screen.
      const queued: Celebration[] = [];
      if (result.streakMilestone) queued.push({ kind: 'streak', tier: result.streakMilestone });
      if (result.leveledUp) queued.push({ kind: 'level', level: result.newLevel });
      setCelebrations(queued);
      if (queued.length === 0) haptics.success();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalExercises, correctCount, lessonId, completeLesson]);

  const coach = useCoachMarks(CM_LESSON_KEY, LESSON_COACH_CONFIG.length, !!lesson && totalExercises > 0);
  const coachSteps = LESSON_COACH_CONFIG.map((cfg, i) => ({ ...cfg, ...t.lesson.coach[i] }));

  if (!lesson) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <EmptyState
          icon="school-outline"
          titleKu="Ders nehat dîtin"
          title={t.lesson.notFoundTitle}
          message={t.lesson.notFoundMessage}
          actionLabel={t.common.goBack}
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  if (totalExercises === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar barStyle={barStyle} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={t.common.close}>
            <Ionicons name="close" size={28} color={c.gray[600]} />
          </TouchableOpacity>
          <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '100%' }]} /></View>
          <View style={{ width: 40 }} />
        </View>
        <EmptyState
          icon="construct-outline"
          titleKu="Di amadekirinê de"
          title={t.lesson.comingSoonTitle}
          message={t.lesson.comingSoonMessage(lessonTitle(lesson, lang))}
          actionLabel={t.common.goBack}
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  if (isFinished) {
    const finalScore = Math.min(100, Math.round(correctCount / totalExercises * 100));
    const xpEarned = finalScore === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
    const messages = [
      { min: 0, text: t.lesson.finishMessages.min0, icon: 'refresh' as const },
      { min: 50, text: t.lesson.finishMessages.min50, icon: 'trending-up' as const },
      { min: 80, text: t.lesson.finishMessages.min80, icon: 'star' as const },
      { min: 100, text: t.lesson.finishMessages.min100, icon: 'checkmark-circle' as const },
    ];
    const msg = [...messages].reverse().find((m) => finalScore >= m.min)!;

    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.finishScreen}>
          <Animated.View entering={ZoomIn.springify().damping(12)} style={styles.medalWrap}>
            <View style={styles.medalRays} pointerEvents="none">
              <KurdishSun size={150} color={c.fire[200]} />
            </View>
            <LinearGradient
              colors={[c.fire[400], c.fire[600], c.fire[800]]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={styles.medal}
            >
              <Ionicons name={msg.icon} size={56} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.finishTitleKu}>Pîroz be!</Text>
          <Text style={styles.finishTitleEn}>{t.lesson.complete}</Text>
          <View style={styles.finishKilim} pointerEvents="none">
            <KilimBorder width={120} color={c.fire[300]} />
          </View>
          <Text style={styles.finishMessage}>{msg.text}</Text>
          <View style={styles.finishStats}>
            <View style={styles.statBox}>
              <Ionicons name="ribbon" size={18} color={c.fire[500]} />
              <Text style={styles.statValue}>{finalScore}%</Text>
              <Text style={styles.statLabel}>{t.lesson.scoreLabel}</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="checkmark-done" size={18} color={c.kurdish[500]} />
              <Text style={styles.statValue}>{correctCount}/{totalExercises}</Text>
              <Text style={styles.statLabel}>{t.lesson.correctLabel}</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="star" size={18} color={c.warning} />
              <Text style={styles.statValue}>+{xpEarned}</Text>
              <Text style={styles.statLabel}>{t.lesson.xpLabel}</Text>
            </View>
          </View>
          <Button label={t.common.continue} icon="arrow-forward" iconPosition="right" onPress={() => navigation.goBack()} style={styles.finishBtn} />
        </View>
        <CelebrationOverlay
          celebration={celebrations[0] ?? null}
          onDismiss={() => setCelebrations((q) => q.slice(1))}
        />
      </View>
    );
  }

  if (phase === 'teach') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle={barStyle} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={t.lesson.closeIntroA11y}>
            <Ionicons name="close" size={28} color={c.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.teachHeaderTitle} numberOfLines={1}>{lessonTitle(lesson, lang)}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.teachScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.teachKicker}>{t.lesson.newWords}</Text>
          <Text style={styles.teachTitle}>{t.lesson.learnFirst}</Text>
          <Text style={styles.teachSub}>{t.lesson.learnFirstSub}</Text>
          {teachCards.map((card, i) => (
            <Animated.View key={`${card.ku}-${i}`} entering={FadeInUp.delay(i * 60).duration(300)} style={styles.teachCard}>
              <Text style={styles.teachKu}>{card.ku}</Text>
              <View style={styles.teachDivider} />
              <Text style={styles.teachEn}>{card.en}</Text>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={[styles.teachFooter, { paddingBottom: insets.bottom + SPACING.md }]}>
          <Button label={t.lesson.startPractice} icon="arrow-forward" iconPosition="right" onPress={() => setPhase('practice')} />
        </View>
      </View>
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={t.lesson.closeLessonA11y}>
          <Ionicons name="close" size={28} color={c.gray[600]} />
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <AnimatedProgressBar progress={progress} height={10} fillColor={c.fire[500]} minFill={0.02} />
        </View>
        <Text style={styles.counterText}>{currentIndex + 1}/{totalExercises}</Text>
      </View>

      <View style={styles.exerciseArea} key={currentExercise.id}>
        {renderExercise()}
      </View>

      {showFeedback && (
        <AnswerSheet correct={lastCorrect} bottomInset={insets.bottom}>
          {!lastCorrect && (
            <View style={styles.correctAnswerBox}>
              <Text style={styles.correctAnswerLabel}>BERSIVA RAST · {t.exercises.correctAnswer}</Text>
              <Text style={styles.correctAnswerText}>
                {(() => {
                  // Show the correct answer in the active language and exercise shape:
                  // true/false → localized label; multiple-choice → resolved option;
                  // typed (translation/fill) → Kurmanji answer (or TR gloss).
                  if (currentExercise.type === 'true_false') {
                    return currentExercise.correctAnswer === 'True' ? t.exercises.true : t.exercises.false;
                  }
                  if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'match_pairs') {
                    const { correct } = resolveChoices(currentExercise, lang);
                    return Array.isArray(correct) ? correct.join(', ') : correct;
                  }
                  const ans = resolveTypedAnswer(currentExercise, lang);
                  return Array.isArray(ans) ? ans.join(', ') : ans;
                })()}
              </Text>
            </View>
          )}
          {currentExercise.explanation && (
            <Text style={styles.explanationText}>{exerciseExplanation(currentExercise, lang)}</Text>
          )}
          <Button label={t.common.continue} icon="arrow-forward" iconPosition="right" color={lastCorrect ? c.success : c.error} onPress={handleNext} />
        </AnswerSheet>
      )}

      <CoachMark
        visible={coach.visible && !showFeedback}
        steps={coachSteps}
        step={coach.step}
        onNext={coach.next}
        onSkip={coach.skip}
      />
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md, paddingBottom: SPACING.sm, gap: SPACING.sm,
  },
  closeBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  progressBarBg: { flex: 1, height: 10, backgroundColor: c.gray[200], borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: c.fire[500], borderRadius: RADIUS.full },
  counterText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[500], width: 40, textAlign: 'right' },

  // Teach (vocabulary preview)
  teachHeaderTitle: { flex: 1, textAlign: 'center', fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800] },
  teachScroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.lg },
  teachKicker: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  teachTitle: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.5, marginTop: 2 },
  teachSub: { fontSize: FONT_SIZE.sm, color: c.gray[500], marginTop: 4, marginBottom: SPACING.lg, lineHeight: 20 },
  teachCard: {
    backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm,
  },
  teachKu: { fontSize: 24, fontWeight: '800', color: c.fire[600] },
  teachDivider: { width: 28, height: 2, backgroundColor: c.gray[200], borderRadius: 1, marginVertical: SPACING.sm },
  teachEn: { fontSize: FONT_SIZE.md, fontWeight: '500', color: c.gray[700] },
  teachFooter: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  exerciseArea: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  correctAnswerBox: { backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: SPACING.sm, borderLeftWidth: 3, borderLeftColor: c.kurdish[500] },
  correctAnswerLabel: { fontSize: 10, fontWeight: '700', color: c.successTextDim, letterSpacing: 1, marginBottom: 4 },
  correctAnswerText: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.successText },
  explanationText: { fontSize: FONT_SIZE.sm, color: c.gray[600], marginBottom: SPACING.md, lineHeight: 20, backgroundColor: c.tintSoft, padding: SPACING.md, borderRadius: RADIUS.md },
  finishScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl, backgroundColor: c.cream[50] },
  medalWrap: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  medalRays: { position: 'absolute', opacity: 0.55 },
  medal: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', ...SHADOWS.lg },
  finishTitleKu: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: c.fire[600], letterSpacing: -0.5 },
  finishTitleEn: { fontSize: 11, fontWeight: '700', color: c.gray[500], textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 },
  finishKilim: { marginVertical: SPACING.md, opacity: 0.9 },
  finishMessage: { fontSize: FONT_SIZE.md, color: c.gray[600], textAlign: 'center', marginBottom: SPACING.xl },
  finishStats: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl, alignSelf: 'stretch', justifyContent: 'center' },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: c.white, paddingVertical: SPACING.lg, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: c.gray[100], gap: 4, ...SHADOWS.sm, maxWidth: 110 },
  statValue: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: c.midnight[800] },
  statLabel: { fontSize: FONT_SIZE.xs, color: c.gray[500], textTransform: 'uppercase', letterSpacing: 0.5 },
  finishBtn: { alignSelf: 'stretch' },
});
