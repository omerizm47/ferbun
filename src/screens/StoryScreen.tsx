import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { storyTitleGloss, storyWordGloss, resolveStoryQuestion } from '../i18n/content';
import { getStoryById, StoryWord } from '../data/stories';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useProgressStore } from '../stores/progressStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import ScreenHeader from '../components/ui/ScreenHeader';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import MotifTile from '../components/ui/MotifTile';
import { toIconName } from '../utils/icons';
import AnswerSheet from '../components/ui/AnswerSheet';
import OptionRow, { OptionState } from '../components/exercises/OptionRow';
import { KurdishSun, KilimBorder, KilimDiamond } from '../components/ui/KurdishDecorations';
import CelebrationOverlay, { Celebration } from '../components/ui/CelebrationOverlay';

type RP = RouteProp<RootStackParamList, 'Story'>;

/** Case/whitespace-insensitive answer match — guards against data-entry typos. */
const sameAnswer = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export default function StoryScreen() {
  const navigation = useNavigation();
  const route = useRoute<RP>();
  const story = getStoryById(route.params.storyId);
  const [selectedWord, setSelectedWord] = useState<StoryWord | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [earnedXp, setEarnedXp] = useState(false);
  const insets = useSafeAreaInsets();
  const { markStoryComplete, isStoryComplete } = useProgressStore();
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);
  const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';

  if (!story) {
    return (
      <View style={s.container}>
        <EmptyState
          icon="book-outline"
          titleKu="Çîrok nehat dîtin"
          title={t.story.notFoundTitle}
          message={t.story.notFoundMessage}
          actionLabel={t.common.goBack}
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  const closeQuiz = () => {
    setShowQuiz(false);
    setQuizDone(false);
    setQuizIndex(0);
    setQuizAnswer(null);
    setCorrectCount(0);
    setEarnedXp(false);
  };

  const handleWordTap = (word: StoryWord) => {
    setSelectedWord(word);
    haptics.selection();
  };

  const handleQuizAnswer = (answer: string) => {
    if (quizAnswer) return;
    setQuizAnswer(answer);
    if (sameAnswer(answer, resolveStoryQuestion(story.comprehensionQuestions[quizIndex], lang).correct)) {
      setCorrectCount((c) => c + 1);
      haptics.success();
    } else {
      haptics.error();
    }
  };

  const handleNextQuestion = () => {
    setQuizAnswer(null);
    if (quizIndex + 1 < story.comprehensionQuestions.length) {
      setQuizIndex((i) => i + 1);
    } else {
      setQuizDone(true);
      const isAlreadyComplete = isStoryComplete(story.id);
      const res = markStoryComplete(story.id);
      if (res.leveledUp) {
        setCelebrations([{ kind: 'level', level: res.newLevel }]);
      }
      if (!isAlreadyComplete) {
        setEarnedXp(true);
      }
    }
  };

  // Quiz mode
  if (showQuiz) {
    const totalQ = story.comprehensionQuestions.length;

    // Quiz results
    if (quizDone) {
      const pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      return (
        <View style={s.container}>
          <StatusBar barStyle={barStyle} />
          <View style={[s.quizHeader, { paddingTop: insets.top + SPACING.sm }]}>
            <TouchableOpacity onPress={closeQuiz} style={s.backBtn} accessibilityRole="button" accessibilityLabel={t.story.closeQuizA11y}>
              <Ionicons name="close" size={24} color={c.gray[600]} />
            </TouchableOpacity>
            <View style={{ width: 40 }} />
          </View>
          <View style={[s.resultScreen, { paddingBottom: insets.bottom + SPACING.lg }]}>
            <View style={s.medalWrap}>
              <View style={s.medalRays} pointerEvents="none">
                <KurdishSun size={150} color={c.fire[200]} />
              </View>
              <View style={[s.medal, SHADOWS.lg]}>
                <Ionicons name="book" size={48} color="#FFFFFF" />
              </View>
            </View>
            <Text style={s.resultTitle}>Te xwend!</Text>
            <Text style={s.resultTitleEn}>{t.story.comprehensionComplete}</Text>
            <View style={s.finishKilim} pointerEvents="none">
              <KilimBorder width={120} color={c.fire[300]} />
            </View>
            <Text style={[s.resultScore, { marginBottom: earnedXp ? SPACING.md : SPACING.xl }]}>{t.story.scoreResult(correctCount, totalQ, pct)}</Text>
            {earnedXp && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xl }}>
                <Ionicons name="star" size={18} color={c.warning} />
                <Text style={{ fontSize: FONT_SIZE.md, fontWeight: '700', color: c.warning }}>+15 {t.lesson.xpLabel}</Text>
              </View>
            )}
            <Button label={t.story.backToStory} icon="arrow-back" onPress={closeQuiz} style={s.resultBtn} />
          </View>
          <CelebrationOverlay
            celebration={celebrations[0] ?? null}
            onDismiss={() => setCelebrations((q) => q.slice(1))}
          />
        </View>
      );
    }

    const q = story.comprehensionQuestions[quizIndex];
    const rq = resolveStoryQuestion(q, lang);
    const isLast = quizIndex === totalQ - 1;
    const progress = (quizIndex + (quizAnswer ? 1 : 0)) / totalQ;

    return (
      <View style={s.container}>
        <StatusBar barStyle={barStyle} />
        <View style={[s.quizHeader, { paddingTop: insets.top + SPACING.sm }]}>
          <TouchableOpacity onPress={closeQuiz} style={s.backBtn} accessibilityRole="button" accessibilityLabel={t.story.closeQuizA11y}>
            <Ionicons name="close" size={24} color={c.gray[600]} />
          </TouchableOpacity>
          <View style={s.quizBar}>
            <View style={[s.quizBarFill, { width: `${Math.max(4, progress * 100)}%` }]} />
          </View>
          <Text style={s.quizProgress}>{quizIndex + 1}/{totalQ}</Text>
        </View>

        <View style={[s.quizContent, { paddingBottom: insets.bottom + SPACING.lg }]}>
          <View style={s.quizKickerRow}>
            <KilimDiamond size={13} color={c.fire[400]} />
            <Text style={s.quizKicker}>PIRSA TÊGIHIŞTINÊ · {t.story.comprehensionKicker}</Text>
          </View>
          <Text style={s.quizQuestion}>{rq.question}</Text>
          <View style={s.quizOptions}>
            {rq.options.map((opt, i) => {
              const isSelected = quizAnswer === opt;
              const isCorrect = sameAnswer(opt, rq.correct);
              const state: OptionState = quizAnswer
                ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'idle')
                : 'idle';
              return (
                <OptionRow
                  key={opt}
                  index={i}
                  label={opt}
                  state={state}
                  onPress={() => handleQuizAnswer(opt)}
                  disabled={quizAnswer !== null}
                />
              );
            })}
          </View>
        </View>
        {quizAnswer && (
          <AnswerSheet correct={sameAnswer(quizAnswer, rq.correct)} bottomInset={insets.bottom}>
            <Button label={isLast ? t.story.seeResults : t.story.next} icon="arrow-forward" iconPosition="right" color={sameAnswer(quizAnswer, rq.correct) ? c.success : c.error} onPress={handleNextQuestion} />
          </AnswerSheet>
        )}
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle={barStyle} />

      {/* Header */}
      <ScreenHeader
        titleEn={storyTitleGloss(story, lang)}
        titleKu={story.title}
        onBack={() => navigation.goBack()}
        topInset={insets.top}
        accent={story.accent}
        right={(
          <View style={s.levelChip}>
            <MotifTile icon={toIconName(story.icon)} color={story.accent} size={36} />
          </View>
        )}
      />

      <View style={s.hintRow}>
        <Ionicons name="hand-left-outline" size={13} color={story.accent} />
        <Text style={s.hint}>{t.story.tapHint}</Text>
      </View>

      {/* Story */}
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {story.paragraphs.map((paragraph, pi) => (
          <View key={pi} style={[s.paragraph, { borderLeftColor: story.accent }]}>
            <View style={s.paraMarker}>
              <KilimDiamond size={16} color={story.accent} />
              <Text style={[s.paraNum, { color: story.accent }]}>{pi + 1}</Text>
            </View>
            <Text style={s.paragraphText}>
              {paragraph.map((word, wi) => (
                <Text
                  key={wi}
                  style={[s.word, selectedWord?.ku === word.ku && s.wordHighlighted]}
                  onPress={() => handleWordTap(word)}
                  accessibilityRole="button"
                  accessibilityLabel={t.story.tapWordA11y(word.ku)}
                >
                  {word.ku}{wi < paragraph.length - 1 ? ' ' : ''}
                </Text>
              ))}
            </Text>
          </View>
        ))}

        {/* Comprehension CTA */}
        <TouchableOpacity style={s.quizBtn} onPress={() => { haptics.selection(); setShowQuiz(true); setQuizIndex(0); setCorrectCount(0); setQuizAnswer(null); setQuizDone(false); }} activeOpacity={0.85}>
          <View style={s.quizBtnIcon}>
            <Ionicons name="help-circle" size={22} color="#FFFFFF" />
          </View>
          <View style={s.quizBtnInfo}>
            <Text style={s.quizBtnText}>{t.story.testComprehension}</Text>
            <Text style={s.quizBtnSub}>{t.story.questionsCount(story.comprehensionQuestions.length)}</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={c.fire[600]} />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Translation popup */}
      {selectedWord && (
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setSelectedWord(null)}>
          <View style={[s.tooltip, { marginBottom: insets.bottom + SPACING.lg }]}>
            <View style={s.tooltipCorner} pointerEvents="none">
              <KilimDiamond size={22} color={c.fire[400]} />
            </View>
            <Text style={s.tooltipKu}>{selectedWord.ku}</Text>
            <View style={s.tooltipDivider} />
            <Text style={s.tooltipEn}>{storyWordGloss(selectedWord, lang)}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },

  // Header (ScreenHeader handles safe-area insets; backBtn is reused by the quiz overlay)
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  levelChip: { marginBottom: 2 },

  hintRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: SPACING.md },
  hint: { fontSize: FONT_SIZE.xs, color: c.gray[500] },

  // Story
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  paragraph: { marginBottom: SPACING.md, backgroundColor: c.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: c.cream[200], borderLeftWidth: 3, borderLeftColor: c.fire[300], ...SHADOWS.sm },
  paraMarker: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.sm },
  paraNum: { fontSize: 10, fontWeight: '800', color: c.fire[500], letterSpacing: 1 },
  paragraphText: { flexDirection: 'row', flexWrap: 'wrap' },
  word: { fontSize: 19, lineHeight: 34, color: c.midnight[800], fontWeight: '500' },
  wordHighlighted: { backgroundColor: c.fire[100], color: c.fire[700], borderRadius: 4, overflow: 'hidden' },

  // Tooltip
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  tooltip: {
    backgroundColor: c.white, marginHorizontal: SPACING.lg, marginBottom: 40, borderRadius: RADIUS.xl, padding: SPACING.lg,
    shadowColor: c.black, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 10,
    alignItems: 'center', overflow: 'hidden',
  },
  tooltipCorner: { position: 'absolute', right: 12, top: 12, opacity: 0.25 },
  tooltipKu: { fontSize: 28, fontWeight: '800', color: c.fire[600], marginBottom: SPACING.sm },
  tooltipDivider: { width: 40, height: 2, backgroundColor: c.gray[200], marginBottom: SPACING.sm, borderRadius: 1 },
  tooltipEn: { fontSize: FONT_SIZE.md, color: c.gray[600], fontWeight: '500' },

  // Comprehension CTA
  quizBtn: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.fireSoft, padding: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: c.fireSoftBorder, marginTop: SPACING.lg },
  quizBtnIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: c.fire[500], justifyContent: 'center', alignItems: 'center' },
  quizBtnInfo: { flex: 1 },
  quizBtnText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: c.fire[700] },
  quizBtnSub: { fontSize: FONT_SIZE.xs, color: c.fire[500], marginTop: 1 },

  // Quiz
  quizHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingHorizontal: SPACING.md, paddingBottom: SPACING.md },
  quizBar: { flex: 1, height: 10, backgroundColor: c.gray[200], borderRadius: RADIUS.full, overflow: 'hidden' },
  quizBarFill: { height: '100%', backgroundColor: c.fire[500], borderRadius: RADIUS.full },
  quizProgress: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[500], width: 40, textAlign: 'right' },
  quizContent: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  quizKickerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.md },
  quizKicker: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  quizQuestion: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: c.midnight[800], marginBottom: SPACING.xl, lineHeight: 28 },
  quizOptions: { gap: SPACING.sm },

  // Quiz results
  resultScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl },
  medalWrap: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  medalRays: { position: 'absolute', opacity: 0.55 },
  medal: { width: 96, height: 96, borderRadius: 48, backgroundColor: c.fire[600], justifyContent: 'center', alignItems: 'center' },
  resultTitle: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: c.fire[600], letterSpacing: -0.5 },
  resultTitleEn: { fontSize: 11, fontWeight: '700', color: c.gray[500], textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 },
  finishKilim: { marginVertical: SPACING.md, opacity: 0.9 },
  resultScore: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800], marginBottom: SPACING.xl },
  resultBtn: { alignSelf: 'stretch' },
});
