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
import { KurdishSun, KilimBorder, NewrozFlame } from '../components/ui/KurdishDecorations';
import CoachMark, { CoachStep } from '../components/ui/CoachMark';
import EmptyState from '../components/ui/EmptyState';
import UpperText from '../components/ui/UpperText';
import AnswerSheet from '../components/ui/AnswerSheet';
import CelebrationOverlay, { Celebration } from '../components/ui/CelebrationOverlay';
import { useCoachMarks } from '../hooks/useCoachMarks';
import { CM_LESSON_KEY } from '../stores/onboardingStore';
import MultipleChoiceExercise from '../components/exercises/MultipleChoiceExercise';
import TranslationExercise from '../components/exercises/TranslationExercise';
import MatchPairsExercise from '../components/exercises/MatchPairsExercise';
import TrueFalseExercise from '../components/exercises/TrueFalseExercise';
import FillBlankExercise from '../components/exercises/FillBlankExercise';
import { speakKurdish } from '../utils/speech';
import { playSound } from '../utils/sounds';
import PressableScale from '../components/ui/PressableScale';

const ENCOURAGEMENTS = [
  { ku: 'Aferîn!', en: 'Well done!', tr: 'Aferin!' },
  { ku: 'Bijî!', en: 'Bravo!', tr: 'Yaşa!' },
  { ku: 'Her bijî!', en: 'Long live!', tr: 'Çok yaşa!' },
  { ku: 'Destxweş!', en: 'Congratulations!', tr: 'Tebrikler!' },
  { ku: 'Zîrek î!', en: 'You are smart!', tr: 'Zekisin!' },
  { ku: 'Nayab e!', en: 'Excellent!', tr: 'Mükemmel!' },
  { ku: 'Pir baş e!', en: 'Very good!', tr: 'Çok iyi!' },
];

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
  const [sessionExercises, setSessionExercises] = useState(() => exercises);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  // Combo system state
  const [comboCount, setComboCount] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [endedCombo, setEndedCombo] = useState(0);
  const [currentEncouragement, setCurrentEncouragement] = useState<{ ku: string; tr: string; en: string } | null>(null);

  const progress = exercises.length > 0 ? Math.min(1, correctCount / exercises.length) : 0;

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
    if (correct) {
      playSound('correct');
      setCorrectCount((c) => c + 1);
      setComboCount((prev) => {
        const next = prev + 1;
        if (next > maxCombo) {
          setMaxCombo(next);
        }
        if (next >= 3) {
          const rand = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
          setCurrentEncouragement(rand);
        }
        return next;
      });
      setEndedCombo(0);
    } else {
      playSound('wrong');
      setMistakeCount((m) => m + 1);
      setSessionExercises((prev) => [...prev, prev[currentIndex]]);
      setComboCount((prev) => {
        if (prev >= 3) {
          setEndedCombo(prev);
        } else {
          setEndedCombo(0);
        }
        return 0;
      });
      setCurrentEncouragement(null);
    }
  }, [currentIndex, maxCombo]);

  const handleNext = useCallback(() => {
    haptics.medium();
    setShowFeedback(false);
    setEndedCombo(0);
    if (currentIndex + 1 >= sessionExercises.length) {
      playSound('success');
      setIsFinished(true);
      const score = exercises.length > 0
        ? Math.max(0, Math.round((exercises.length - mistakeCount) / exercises.length * 100))
        : 100;
      const xpBase = score === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
      const comboBonusXp = maxCombo >= 10 ? 5 : (maxCombo >= 5 ? 3 : 0);
      const totalXp = xpBase + comboBonusXp;
      
      const result = completeLesson(lessonId, score, totalXp);
      // Queue any milestone celebrations to play over the finish screen.
      const queued: Celebration[] = [];
      if (result.streakMilestone) queued.push({ kind: 'streak', tier: result.streakMilestone });
      if (result.leveledUp) queued.push({ kind: 'level', level: result.newLevel });
      setCelebrations(queued);
      if (queued.length === 0) haptics.success();
    } else {
      playSound('click');
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, sessionExercises.length, exercises.length, mistakeCount, maxCombo, lessonId, completeLesson]);

  const coach = useCoachMarks(CM_LESSON_KEY, LESSON_COACH_CONFIG.length, !!lesson && exercises.length > 0);
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

  if (exercises.length === 0) {
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
    const finalScore = exercises.length > 0
      ? Math.max(0, Math.round((exercises.length - mistakeCount) / exercises.length * 100))
      : 100;
    const xpBase = finalScore === 100 ? XP_PER_PERFECT_LESSON : XP_PER_LESSON;
    const comboBonusXp = maxCombo >= 10 ? 5 : (maxCombo >= 5 ? 3 : 0);
    const totalXpEarned = xpBase + comboBonusXp;
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
          {maxCombo >= 3 && (
            <Animated.View entering={ZoomIn.delay(300)} style={styles.finishComboBanner}>
              <NewrozFlame size={24} intensity={3} />
              <Text style={styles.finishComboText}>
                {lang === 'tr' ? `En Yüksek Kombo: ${maxCombo} Doğru 🔥` : `Max Combo: ${maxCombo} Correct 🔥`}
              </Text>
            </Animated.View>
          )}
          <View style={styles.finishStats}>
            <View style={styles.statBox}>
              <Ionicons name="ribbon" size={18} color={c.fire[500]} />
              <Text style={styles.statValue}>{finalScore}%</Text>
              <UpperText style={styles.statLabel}>{t.lesson.scoreLabel}</UpperText>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="checkmark-done" size={18} color={c.kurdish[500]} />
              <Text style={styles.statValue}>{exercises.length}/{exercises.length}</Text>
              <UpperText style={styles.statLabel}>{t.lesson.correctLabel}</UpperText>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="star" size={18} color={c.warning} />
              <Text style={styles.statValue}>+{totalXpEarned}</Text>
              <UpperText style={styles.statLabel}>{t.lesson.xpLabel}</UpperText>
              {comboBonusXp > 0 && (
                <Text style={styles.bonusText}>+{comboBonusXp} XP Bonus</Text>
              )}
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
            <Animated.View key={`${card.ku}-${i}`} entering={FadeInUp.delay(i * 60).duration(300)}>
              <PressableScale
                style={styles.teachCard}
                onPress={() => {
                  haptics.selection();
                  speakKurdish(card.ku);
                }}
                accessibilityRole="button"
                accessibilityLabel={`${card.ku}. Tap to hear pronunciation.`}
              >
                <View style={styles.teachCardHeader}>
                  <Text style={styles.teachKu}>{card.ku}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="volume-medium-outline" size={20} color={c.fire[500]} />
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        speakKurdish(card.ku, true);
                        haptics.light();
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: c.cream[100],
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: c.gray[200],
                      }}
                      accessibilityRole="button"
                      accessibilityLabel="Listen slowly"
                    >
                      <Ionicons name="volume-low-outline" size={18} color={c.fire[600]} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.teachDivider} />
                <Text style={styles.teachEn}>{card.en}</Text>
              </PressableScale>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={[styles.teachFooter, { paddingBottom: insets.bottom + SPACING.md }]}>
          <Button label={t.lesson.startPractice} icon="arrow-forward" iconPosition="right" onPress={() => setPhase('practice')} />
        </View>
      </View>
    );
  }

  const currentExercise = sessionExercises[currentIndex];

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
        {comboCount >= 3 && (
          <Animated.View entering={ZoomIn.duration(200)} style={styles.headerCombo}>
            <NewrozFlame size={20} intensity={2} />
            <Text style={styles.headerComboText}>{comboCount}</Text>
          </Animated.View>
        )}
        <Text style={styles.counterText}>{currentIndex + 1}/{sessionExercises.length}</Text>
      </View>

      <View style={styles.exerciseArea} key={currentExercise.id}>
        {renderExercise()}
      </View>

      {showFeedback && (
        <AnswerSheet correct={lastCorrect} bottomInset={insets.bottom}>
          {lastCorrect && comboCount >= 3 && currentEncouragement && (
            <Animated.View entering={FadeInUp.duration(350)} style={styles.comboBanner}>
              <NewrozFlame size={44} intensity={3} />
              <View style={styles.comboInfo}>
                <Text style={styles.comboKicker}>
                  {lang === 'tr'
                    ? `${comboCount} PIRSAN DI RÊZÊ DE · ÜST ÜSTE ${comboCount} DOĞRU!`
                    : `${comboCount} PIRSAN DI RÊZÊ DE · ${comboCount} IN A ROW!`}
                </Text>
                <Text style={styles.comboWordKu}>{currentEncouragement.ku}</Text>
                <Text style={styles.comboWordTranslation}>
                  {lang === 'tr' ? currentEncouragement.tr : currentEncouragement.en}
                </Text>
              </View>
            </Animated.View>
          )}
          {!lastCorrect && (
            <View style={styles.correctAnswerBox}>
              {endedCombo >= 3 && (
                <Animated.View entering={FadeInUp.duration(300)} style={styles.comboBrokenBadge}>
                  <Ionicons name="flame-outline" size={14} color={c.gray[400]} />
                  <Text style={styles.comboBrokenText}>
                    {lang === 'tr' ? `Kombo bitti (En Yüksek: ${endedCombo})` : `Combo broke (Max: ${endedCombo})`}
                  </Text>
                </Animated.View>
              )}
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

  teachHeaderTitle: { flex: 1, textAlign: 'center', fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800] },
  teachScroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.lg },
  teachKicker: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  teachTitle: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.5, marginTop: 2 },
  teachSub: { fontSize: FONT_SIZE.sm, color: c.gray[500], marginTop: 4, marginBottom: SPACING.lg, lineHeight: 20 },
  teachCard: {
    backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm,
  },
  teachCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teachKu: { fontSize: 24, fontWeight: '800', color: c.fire[600] },
  teachDivider: { width: 28, height: 2, backgroundColor: c.gray[200], borderRadius: 1, marginVertical: SPACING.sm },
  teachEn: { fontSize: FONT_SIZE.md, fontWeight: '500', color: c.gray[700] },
  teachFooter: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  exerciseArea: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  correctAnswerBox: { backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: SPACING.sm, borderLeftWidth: 3, borderLeftColor: c.gray[300] },
  correctAnswerLabel: { fontSize: 10, fontWeight: '700', color: c.gray[500], letterSpacing: 1, marginBottom: 4 },
  correctAnswerText: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800] },
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

  headerCombo: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.fireSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.full, borderWidth: 1, borderColor: c.fireSoftBorder, gap: 2, marginRight: 4 },
  headerComboText: { fontSize: 13, fontWeight: '800', color: c.fire[600] },
  comboBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.lg, borderLeftWidth: 4, borderLeftColor: c.fire[500], gap: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.sm },
  comboInfo: { flex: 1 },
  comboKicker: { fontSize: 9, fontWeight: '800', color: c.fire[600], letterSpacing: 1 },
  comboWordKu: { fontSize: 24, fontWeight: '800', color: c.midnight[800], marginTop: 2 },
  comboWordTranslation: { fontSize: FONT_SIZE.xs, color: c.gray[500], fontStyle: 'italic', marginTop: 1 },
  comboBrokenBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: c.gray[50], paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.full, borderWidth: 1, borderColor: c.gray[200], marginBottom: 8 },
  comboBrokenText: { fontSize: 10, fontWeight: '700', color: c.gray[400], textTransform: 'uppercase', letterSpacing: 0.5 },
  finishComboBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: c.fireSoft, paddingHorizontal: SPACING.md, paddingVertical: 10, borderRadius: RADIUS.md, borderWidth: 1, borderColor: c.fireSoftBorder, marginBottom: SPACING.lg },
  finishComboText: { fontSize: FONT_SIZE.md, fontWeight: '800', color: c.fire[700] },
  bonusText: {
    fontSize: 9,
    fontWeight: '800',
    color: c.successText,
    backgroundColor: c.successBg,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: RADIUS.sm,
    marginTop: 2,
    overflow: 'hidden',
  },
});
