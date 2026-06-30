import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, Pressable,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate, runOnJS, FadeInUp } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { vocabGloss, vocabExample } from '../i18n/content';
import { getVocabByTheme, getVocabById, VOCAB_THEMES } from '../data/vocabulary';
import { VocabWord } from '../data/types';
import { useProgressStore, selectWeakVocabIds } from '../stores/progressStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import { KurdishSun, KilimBorder, KilimDiamond } from '../components/ui/KurdishDecorations';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import CelebrationOverlay, { Celebration } from '../components/ui/CelebrationOverlay';
import { speakKurdish } from '../utils/speech';
import { playSound } from '../utils/sounds';

type RoutePropType = RouteProp<RootStackParamList, 'Flashcard'>;

export default function FlashcardScreen() {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { theme, mode } = route.params;
  const isReview = mode === 'review';
  const isWeak = mode === 'weak';
  const insets = useSafeAreaInsets();
  const { updateVocabMastery, getDueVocabIds, completeVocabReview, vocabMastery } = useProgressStore();
  // The queue is snapshotted once at mount: answering pushes a word's next
  // review into the future, which would otherwise shrink the list mid-session.
  const words = useMemo(() => {
    if (isReview) {
      return getDueVocabIds().map((id) => getVocabById(id)).filter((w): w is VocabWord => !!w);
    }
    if (isWeak) {
      return selectWeakVocabIds(vocabMastery).map((id) => getVocabById(id)).filter((w): w is VocabWord => !!w);
    }
    return theme ? getVocabByTheme(theme) : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReview, isWeak, theme]);
  const themeInfo = theme ? VOCAB_THEMES.find((t) => t.id === theme) : undefined;
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);
  const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';

  const [queue, setQueue] = useState<VocabWord[]>(() => words);
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  const spin = useSharedValue(0);
  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(spin.value, [0, 1], [0, 180])}deg` }],
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(spin.value, [0, 1], [180, 360])}deg` }],
  }));

  const flip = () => {
    playSound('click');
    const next = !isFlipped;
    setIsFlipped(next);
    spin.value = withTiming(next ? 1 : 0, { duration: 420 });
    haptics.light();
  };

  const word = queue[currentIndex];


  const progress = queue.length > 0 ? currentIndex / queue.length : 0;
  const accent = themeInfo?.color || c.fire[600];

  const handleKnow = () => {
    playSound('click');
    updateVocabMastery(word.id, true);
    if (!failedIds.has(word.id)) {
      setKnownCount((c) => c + 1);
    }
    haptics.success();
    advance(false);
  };

  const handleDontKnow = () => {
    playSound('click');
    updateVocabMastery(word.id, false);
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.add(word.id);
      return next;
    });
    setQueue((prev) => [...prev, word]);
    haptics.light();
    advance(true);
  };

  const advance = (isAppending: boolean = false) => {
    setIsFlipped(false);
    spin.value = 0;
    if (!isAppending && currentIndex >= queue.length - 1) {
      playSound('success');
      const res = completeVocabReview(10);
      const queued: Celebration[] = [];
      if (res.leveledUp) {
        queued.push({ kind: 'level', level: res.newLevel });
      }
      if (res.newBadgeIds) {
        res.newBadgeIds.forEach((badgeId) => {
          queued.push({ kind: 'badge', badgeId });
        });
      }
      setCelebrations(queued);
      setCurrentIndex(queue.length); // trigger finish
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const swipeStyle = useAnimatedStyle(() => {
    const rotate = `${interpolate(translateX.value, [-200, 200], [-8, 8])}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotate },
      ],
    };
  });

  const knowIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 80], [0, 1], 'clamp');
    return { opacity };
  });

  const dontKnowIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-80, 0], [1, 0], 'clamp');
    return { opacity };
  });

  const triggerKnow = () => {
    handleKnow();
    translateX.value = 0;
    translateY.value = 0;
  };

  const triggerDontKnow = () => {
    handleDontKnow();
    translateX.value = 0;
    translateY.value = 0;
  };

  const onGestureEvent = (event: any) => {
    translateX.value = event.nativeEvent.translationX;
    translateY.value = event.nativeEvent.translationY;
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === 5) { // ENDED
      const { translationX } = event.nativeEvent;
      if (translationX > 120) {
        translateX.value = withTiming(500, { duration: 250 }, () => {
          runOnJS(triggerKnow)();
        });
      } else if (translationX < -120) {
        translateX.value = withTiming(-500, { duration: 250 }, () => {
          runOnJS(triggerDontKnow)();
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  };

  // Empty state check
  if (words.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={t.common.close}>
            <Ionicons name="close" size={28} color={c.gray[600]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>
        <EmptyState
          icon={isReview ? 'checkmark-done-circle-outline' : 'albums-outline'}
          titleKu={isReview ? 'Baş e!' : 'Peyv tune'}
          title={isReview ? t.review.emptyTitle : t.flashcard.noWordsTitle}
          message={isReview ? t.review.emptyMessage : t.flashcard.noWordsMessage}
          actionLabel={t.common.goBack}
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  // Finish screen
  if (currentIndex >= queue.length) {
    const accent = themeInfo?.color || c.fire[600];
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.finishScreen}>
          <View style={styles.medalWrap}>
            <View style={styles.medalRays} pointerEvents="none">
              <KurdishSun size={150} color={c.fire[200]} />
            </View>
            <View style={[styles.medal, { backgroundColor: accent }, SHADOWS.lg]}>
              <Ionicons name="ribbon" size={52} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.finishTitle}>Baş e!</Text>
          <Text style={styles.finishTitleEn}>{t.flashcard.reviewComplete}</Text>
          <View style={styles.finishKilim} pointerEvents="none">
            <KilimBorder width={120} color={c.fire[300]} />
          </View>
          <Text style={styles.finishSub}>{t.flashcard.reviewed(words.length)}</Text>
          <View style={styles.finishStats}>
            <View style={styles.fStatBox}>
              <Ionicons name="checkmark-done" size={18} color={c.kurdish[500]} />
              <Text style={styles.fStatVal}>{knownCount}</Text>
              <Text style={styles.fStatLabel}>{t.flashcard.known}</Text>
            </View>
            <View style={styles.fStatBox}>
              <Ionicons name="refresh" size={18} color={c.fire[500]} />
              <Text style={styles.fStatVal}>{words.length - knownCount}</Text>
              <Text style={styles.fStatLabel}>{t.flashcard.learning}</Text>
            </View>
            <View style={styles.fStatBox}>
              <Ionicons name="star" size={18} color={c.warning} />
              <Text style={styles.fStatVal}>+10</Text>
              <Text style={styles.fStatLabel}>{t.lesson.xpLabel}</Text>
            </View>
          </View>
          <Button label={t.common.done} icon="checkmark" iconPosition="right" onPress={() => navigation.goBack()} style={styles.finishBtn} />
        </View>
        <CelebrationOverlay
          celebration={celebrations[0] ?? null}
          onDismiss={() => setCelebrations((q) => q.slice(1))}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={barStyle} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={t.common.close}>
          <Ionicons name="close" size={28} color={c.gray[600]} />
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: themeInfo?.color || c.fire[500] }]} />
        </View>
        <Text style={styles.counter}>{currentIndex + 1}/{queue.length}</Text>
      </View>

      {/* Card */}
      <View style={styles.cardArea}>
        {/* Next Card (Background Card Stack Effect) */}
        {currentIndex + 1 < queue.length && (
          <View style={[styles.backgroundCard, SHADOWS.sm]} pointerEvents="none">
            <View style={[styles.cardTopBar, { backgroundColor: c.gray[200] }]} />
            <View style={styles.cardSun} pointerEvents="none">
              <KurdishSun size={170} color={c.gray[100]} />
            </View>
            <View style={styles.cardCorner} pointerEvents="none">
              <KilimDiamond size={26} color={c.gray[100]} />
            </View>
            <Text style={[styles.cardLabel, { color: c.gray[300] }]}>Kurdî</Text>
            <Text style={[styles.cardWord, { color: c.gray[300] }]}>{queue[currentIndex + 1].wordKu}</Text>
            {queue[currentIndex + 1].gender && (
              <Text style={[styles.genderBadge, { backgroundColor: c.gray[50], color: c.gray[300] }]}>
                {queue[currentIndex + 1].gender === 'm' ? `nêr · ${t.flashcard.masculine}` : `mê · ${t.flashcard.feminine}`}
              </Text>
            )}
            <View style={styles.tapHintRow}>
              <Ionicons name="sync-outline" size={14} color={c.gray[200]} />
              <Text style={[styles.tapHint, { color: c.gray[200] }]}>{t.flashcard.tapReveal}</Text>
            </View>
          </View>
        )}

        {/* Current Card (Interactive / Swipeable) */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          activeOffsetX={[-15, 15]}
        >
          <Animated.View style={[styles.activeCardContainer, swipeStyle]}>
            {/* Swipe Indicators */}
            <Animated.View style={[styles.swipeIndicator, styles.knowIndicator, knowIndicatorStyle]} pointerEvents="none">
              <Text style={[styles.swipeIndicatorText, { color: '#2E7D32' }]}>{lang === 'tr' ? 'BİLİYORUM' : 'I KNOW'}</Text>
            </Animated.View>
            <Animated.View style={[styles.swipeIndicator, styles.dontKnowIndicator, dontKnowIndicatorStyle]} pointerEvents="none">
              <Text style={[styles.swipeIndicatorText, { color: '#C62828' }]}>{lang === 'tr' ? 'TEKRAR' : 'LEARN'}</Text>
            </Animated.View>

            <Pressable
              style={styles.cardWrap}
              onPress={flip}
              accessibilityRole="button"
              accessibilityLabel={isFlipped ? `${vocabGloss(word, lang)}. ${t.flashcard.back}` : `${word.wordKu}. ${t.flashcard.kurdish}`}
              accessibilityHint={t.flashcard.flipHint}
            >
              {/* Front — Kurdish */}
              <Animated.View style={[styles.card, styles.cardFace, frontStyle]}>
                <View style={[styles.cardTopBar, { backgroundColor: accent }]} />
                <View style={styles.cardSun} pointerEvents="none">
                  <KurdishSun size={170} color={accent} />
                </View>
                <View style={styles.cardCorner} pointerEvents="none">
                  <KilimDiamond size={26} color={accent} />
                </View>



                <Text style={[styles.cardLabel, { color: accent }]}>Kurdî</Text>
                <Text style={styles.cardWord}>{word.wordKu}</Text>
                {word.gender && (
                  <Text style={styles.genderBadge}>
                    {word.gender === 'm' ? `nêr · ${t.flashcard.masculine}` : `mê · ${t.flashcard.feminine}`}
                  </Text>
                )}
                <View style={styles.tapHintRow}>
                  <Ionicons name="sync-outline" size={14} color={c.gray[300]} />
                  <Text style={styles.tapHint}>{t.flashcard.tapReveal}</Text>
                </View>
              </Animated.View>

              {/* Back — English */}
              <Animated.View style={[styles.card, styles.cardFace, backStyle]}>
                <View style={[styles.cardTopBar, { backgroundColor: c.kurdish[500] }]} />
                <View style={styles.cardCorner} pointerEvents="none">
                  <KilimDiamond size={26} color={c.kurdish[500]} />
                </View>

                {/* Normal Speaker Button */}
                <TouchableOpacity
                  style={styles.speakerBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    speakKurdish(word.wordKu);
                    haptics.light();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Listen Kurdish pronunciation"
                >
                  <Ionicons name="volume-medium-outline" size={20} color={c.kurdish[500]} />
                </TouchableOpacity>

                {/* Slow Speaker Button */}
                <TouchableOpacity
                  style={[styles.speakerBtn, { right: 58 }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    speakKurdish(word.wordKu, true);
                    haptics.light();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Listen slowly"
                >
                  <Ionicons name="volume-low-outline" size={20} color={c.kurdish[500]} />
                </TouchableOpacity>

                <Text style={[styles.cardLabel, { color: c.kurdish[600] }]}>{t.flashcard.back}</Text>
                <Text style={styles.cardTranslation}>{vocabGloss(word, lang)}</Text>
                <Text style={styles.cardPos}>{word.partOfSpeech}</Text>
                {word.exampleKu && (
                  <View style={styles.exampleBox}>
                    <Text style={styles.exampleKu}>{word.exampleKu}</Text>
                    <Text style={styles.exampleEn}>{vocabExample(word, lang)}</Text>
                  </View>
                )}
              </Animated.View>
            </Pressable>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Actions */}
      {isFlipped && (
        <Animated.View entering={FadeInUp.duration(260)} style={[styles.actionSheet, { paddingBottom: insets.bottom + SPACING.md }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetPromptRow}>
            <KilimDiamond size={12} color={c.fire[400]} />
            <Text style={styles.sheetPrompt}>TU DIZANÎ? · {t.flashcard.knowPrompt}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.dontKnowBtn} onPress={handleDontKnow} activeOpacity={0.85}>
              <View style={[styles.actionIcon, { backgroundColor: c.error }]}>
                <Ionicons name="refresh" size={18} color="#FFFFFF" />
              </View>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.dontKnowText}>{t.flashcard.stillLearning}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.knowBtn} onPress={handleKnow} activeOpacity={0.85}>
              <View style={[styles.actionIcon, { backgroundColor: c.success }]}>
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              </View>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.knowText}>{t.flashcard.iKnow}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingTop: SPACING.md, gap: SPACING.sm },
  closeBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  progressBarBg: { flex: 1, height: 10, backgroundColor: c.gray[200], borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: RADIUS.full },
  counter: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[500], width: 45, textAlign: 'right' },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg },
  cardWrap: { width: '100%', height: 340 },
  card: {
    width: '100%', backgroundColor: c.white, borderRadius: RADIUS.xl,
    padding: SPACING.xl, justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden', ...SHADOWS.md,
  },
  cardFace: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backfaceVisibility: 'hidden',
  },
  cardTopBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6 },
  cardSun: { position: 'absolute', top: '50%', marginTop: -85, opacity: 0.06 },
  cardCorner: { position: 'absolute', right: 14, bottom: 14, opacity: 0.18 },
  cardLabel: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.gray[400], marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 1.5 },
  cardWord: { fontSize: 40, fontWeight: '800', color: c.fire[600], textAlign: 'center' },
  genderBadge: { fontSize: FONT_SIZE.sm, color: c.gray[500], marginTop: SPACING.md, backgroundColor: c.gray[100], paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: RADIUS.full },
  tapHintRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: SPACING.xl },
  tapHint: { fontSize: FONT_SIZE.sm, color: c.gray[300] },
  cardTranslation: { fontSize: 32, fontWeight: '700', color: c.midnight[800], textAlign: 'center' },
  cardPos: { fontSize: FONT_SIZE.sm, color: c.gray[400], marginTop: SPACING.sm, fontStyle: 'italic' },
  exampleBox: { marginTop: SPACING.lg, backgroundColor: c.cream[100], padding: SPACING.md, borderRadius: RADIUS.md, width: '100%' },
  exampleKu: { fontSize: FONT_SIZE.md, fontWeight: '600', color: c.fire[700], marginBottom: 4 },
  exampleEn: { fontSize: FONT_SIZE.sm, color: c.gray[600], fontStyle: 'italic' },
  actionSheet: {
    backgroundColor: c.white, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm,
    shadowColor: c.black, shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.1, shadowRadius: 18, elevation: 12,
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: c.hairline, alignSelf: 'center', marginBottom: SPACING.md },
  sheetPromptRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: SPACING.md },
  sheetPrompt: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  actions: { flexDirection: 'row', gap: SPACING.md },
  dontKnowBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 8, backgroundColor: c.errorBg, paddingVertical: 14, borderRadius: RADIUS.lg, borderWidth: 1.5, borderColor: c.errorBorder, ...SHADOWS.sm },
  knowBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 8, backgroundColor: c.successBg, paddingVertical: 14, borderRadius: RADIUS.lg, borderWidth: 1.5, borderColor: c.successBorder, ...SHADOWS.sm },
  actionIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  dontKnowText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.error, flexShrink: 1 },
  knowText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.success, flexShrink: 1 },
  finishScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  medalWrap: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  medalRays: { position: 'absolute', opacity: 0.55 },
  medal: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center' },
  finishTitle: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: c.fire[600], letterSpacing: -0.5 },
  finishTitleEn: { fontSize: 11, fontWeight: '700', color: c.gray[500], textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 },
  finishKilim: { marginVertical: SPACING.md, opacity: 0.9 },
  finishSub: { fontSize: FONT_SIZE.md, color: c.gray[500], marginBottom: SPACING.xl },
  finishStats: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl },
  fStatBox: { flex: 1, alignItems: 'center', backgroundColor: c.white, paddingVertical: SPACING.lg, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: c.gray[100], gap: 4, maxWidth: 110, ...SHADOWS.sm },
  fStatVal: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: c.midnight[800] },
  fStatLabel: { fontSize: FONT_SIZE.xs, color: c.gray[500], textTransform: 'uppercase', letterSpacing: 0.5 },
  finishBtn: { alignSelf: 'stretch' },
  speakerBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: c.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.gray[200],
    zIndex: 20,
    shadowColor: c.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  backgroundCard: {
    position: 'absolute',
    width: '100%',
    height: 340,
    backgroundColor: c.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: c.gray[100],
    transform: [{ scale: 0.95 }, { translateY: 12 }],
    opacity: 0.88,
    zIndex: 1,
  },
  activeCardContainer: {
    width: '100%',
    height: 340,
    zIndex: 10,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 24,
    borderWidth: 3,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 30,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  knowIndicator: {
    left: 24,
    borderColor: '#2E7D32',
    transform: [{ rotate: '-12deg' }],
  },
  dontKnowIndicator: {
    right: 24,
    borderColor: '#C62828',
    transform: [{ rotate: '12deg' }],
  },
  swipeIndicatorText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});
