import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions
} from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate, runOnJS, ZoomIn, FadeIn
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors, COLORS } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { vocabulary } from '../data/vocabulary';
import { haptics } from '../utils/haptics';
import { playSound } from '../utils/sounds';

const { width: SCREEN_W } = Dimensions.get('window');

interface CardState {
  word: any;
  candidateMeaning: string;
  isCandidateCorrect: boolean;
}

export default function RapidFireScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors: c, scheme } = useTheme();
  const { lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [card, setCard] = useState<CardState | null>(null);
  const [combo, setCombo] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem('@ferbun_rapid_fire_highscore');
        if (val) {
          setHighScore(parseInt(val, 10));
        }
      } catch {
        // no-op
      }
    })();
  }, []);

  // Update and save high score
  const updateHighScore = useCallback(async (newScore: number) => {
    setHighScore((prev) => {
      if (newScore > prev) {
        AsyncStorage.setItem('@ferbun_rapid_fire_highscore', newScore.toString()).catch(() => {});
        return newScore;
      }
      return prev;
    });
  }, []);

  // Generate a random card
  const generateNewCard = (): CardState => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const word = vocabulary[randomIndex];
    const isCorrect = Math.random() < 0.5;
    let meaning = '';

    if (isCorrect || vocabulary.length <= 1) {
      meaning = lang === 'tr' ? word.wordTr || word.wordEn : word.wordEn;
    } else {
      let wrongWord = word;
      let attempts = 0;
      while (wrongWord.id === word.id && attempts < 10) {
        const idx = Math.floor(Math.random() * vocabulary.length);
        wrongWord = vocabulary[idx];
        attempts++;
      }
      meaning = lang === 'tr' ? wrongWord.wordTr || wrongWord.wordEn : wrongWord.wordEn;
    }

    return {
      word,
      candidateMeaning: meaning,
      isCandidateCorrect: isCorrect,
    };
  };

  // Start the game
  const startGame = () => {
    haptics.selection();
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setCard(generateNewCard());
    setGameState('playing');
  };

  // Handle countdown
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setGameState('gameover');
            playSound('success'); // plays success sound when finishing
            haptics.success();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Save high score on game over
  useEffect(() => {
    if (gameState === 'gameover') {
      updateHighScore(score);
    }
  }, [gameState, score, updateHighScore]);

  // Swipe Shared Values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => {
    const rotate = `${interpolate(translateX.value, [-SCREEN_W / 2, SCREEN_W / 2], [-10, 10])}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotate },
      ],
    };
  });

  const correctIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 80], [0, 1], 'clamp');
    return { opacity };
  });

  const incorrectIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-80, 0], [1, 0], 'clamp');
    return { opacity };
  });

  const handleChoice = (userSaysCorrect: boolean) => {
    if (!card) return;

    const isMatch = card.isCandidateCorrect;
    const isUserCorrect = userSaysCorrect === isMatch;

    if (isUserCorrect) {
      setScore((s) => s + 1);
      setCombo((c) => c + 1);
      setTimeLeft((t) => Math.min(30, t + 1)); // reward 1 second
      haptics.light();
      playSound('click');
    } else {
      setCombo(0);
      setTimeLeft((t) => Math.max(0, t - 2)); // penalize 2 seconds
      haptics.error();
    }

    setCard(generateNewCard());
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
        translateX.value = withTiming(SCREEN_W, { duration: 200 }, () => {
          runOnJS(handleChoice)(true);
        });
      } else if (translationX < -120) {
        translateX.value = withTiming(-SCREEN_W, { duration: 200 }, () => {
          runOnJS(handleChoice)(false);
        });
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 120 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Top Navigation */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <TouchableOpacity
          onPress={() => { haptics.selection(); navigation.goBack(); }}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel={lang === 'tr' ? 'Geri' : 'Back'}
        >
          <Ionicons name="close" size={24} color={c.midnight[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {lang === 'tr' ? 'Kelime Maratonu' : 'Rapid Fire'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {gameState === 'idle' && (
        <Animated.View entering={FadeIn} style={styles.contentWrap}>
          <View style={styles.sunWrap}>
            <Ionicons name="flame" size={84} color={COLORS.fire[600]} />
          </View>
          <Text style={styles.titleKu}>Agirê Xwe Vêxe!</Text>
          <Text style={styles.titleEn}>
            {lang === 'tr' ? 'Kelime maratonuna hoş geldin.' : 'Welcome to the Rapid Fire Quiz.'}
          </Text>
          <Text style={styles.descriptionText}>
            {lang === 'tr'
              ? '30 saniyen var! Kelime anlamı doğruysa sağa, yanlışsa sola kaydır. Her doğru cevap ek süre verir, yanlışlar süreyi azaltır.'
              : 'You have 30 seconds! Swipe right if the translation is correct, left if it is incorrect. Correct swipes add time, wrong swipes subtract it.'}
          </Text>
          
          <TouchableOpacity style={styles.startBtn} onPress={startGame}>
            <Text style={styles.startBtnText}>
              {lang === 'tr' ? 'BAŞLAT' : 'START'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.highScoreText}>
            {lang === 'tr' ? `En Yüksek Skor: ${highScore}` : `Best Score: ${highScore}`}
          </Text>
        </Animated.View>
      )}

      {gameState === 'playing' && card && (
        <View style={styles.gameArea}>
          {/* Score & Time Bar */}
          <View style={styles.scoreRow}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreLabel}>{lang === 'tr' ? 'SKOR' : 'SCORE'}</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
            {combo >= 3 && (
              <Animated.View entering={ZoomIn} style={styles.comboBadge}>
                <Ionicons name="flame" size={14} color="#FFFFFF" />
                <Text style={styles.comboText}>{combo} COMBO</Text>
              </Animated.View>
            )}
            <View style={styles.timeBadge}>
              <Text style={styles.timeLabel}>{lang === 'tr' ? 'SÜRE' : 'TIME'}</Text>
              <Text style={[styles.timeValue, timeLeft <= 5 && { color: COLORS.fire[600] }]}>
                {timeLeft}s
              </Text>
            </View>
          </View>

          {/* Time Progress Bar */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(timeLeft / 30) * 100}%`,
                  backgroundColor: timeLeft <= 5 ? COLORS.fire[600] : c.kurdish[500],
                },
              ]}
            />
          </View>

          {/* Swipe Card Wrapper */}
          <View style={styles.cardContainer}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <Animated.View style={[styles.gameCard, cardStyle, { backgroundColor: c.white }]}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardWordKu}>{card.word.wordKu}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.cardWordMeaning}>{card.candidateMeaning}</Text>
                </View>

                <View style={styles.directionGuideRow}>
                  <Text style={[styles.guideText, { color: c.error }]}>
                    {lang === 'tr' ? '← YANLIŞ' : '← WRONG'}
                  </Text>
                  <Text style={[styles.guideText, { color: c.success }]}>
                    {lang === 'tr' ? 'DOĞRU →' : 'CORRECT →'}
                  </Text>
                </View>

                {/* Swiping Feedback Overlays */}
                <Animated.View
                  pointerEvents="none"
                  style={[styles.indicatorOverlay, styles.indicatorCorrect, correctIndicatorStyle]}
                >
                  <Ionicons name="checkmark-circle" size={80} color="#FFFFFF" />
                  <Text style={styles.indicatorText}>{lang === 'tr' ? 'DOĞRU' : 'CORRECT'}</Text>
                </Animated.View>

                <Animated.View
                  pointerEvents="none"
                  style={[styles.indicatorOverlay, styles.indicatorIncorrect, incorrectIndicatorStyle]}
                >
                  <Ionicons name="close-circle" size={80} color="#FFFFFF" />
                  <Text style={styles.indicatorText}>{lang === 'tr' ? 'YANLIŞ' : 'WRONG'}</Text>
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>
      )}

      {gameState === 'gameover' && (
        <Animated.View entering={ZoomIn} style={styles.contentWrap}>
          <View style={styles.sunWrap}>
            <Ionicons name="trophy" size={84} color="#F59E0B" />
          </View>
          <Text style={styles.titleKu}>Yarış Bitti!</Text>
          <Text style={styles.titleEn}>
            {lang === 'tr' ? 'Süreniz sona erdi.' : 'Time is up.'}
          </Text>

          <View style={styles.gameOverStatsCard}>
            <View style={styles.gameOverStatRow}>
              <Text style={styles.gameOverStatLabel}>{lang === 'tr' ? 'Skorunuz' : 'Your Score'}</Text>
              <Text style={styles.gameOverStatVal}>{score}</Text>
            </View>
            <View style={styles.gameOverStatDivider} />
            <View style={styles.gameOverStatRow}>
              <Text style={styles.gameOverStatLabel}>{lang === 'tr' ? 'En Yüksek Skor' : 'High Score'}</Text>
              <Text style={styles.gameOverStatVal}>{highScore}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={startGame}>
            <Text style={styles.startBtnText}>
              {lang === 'tr' ? 'TEKRAR DENE' : 'TRY AGAIN'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: c.gray[200] }]}
            onPress={() => { haptics.selection(); navigation.goBack(); }}
          >
            <Text style={[styles.startBtnText, { color: c.midnight[800] }]}>
              {lang === 'tr' ? 'ÇIKIŞ' : 'QUIT'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: c.gray[100],
    backgroundColor: c.white,
  },
  closeBtn: { padding: 4 },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.3 },
  contentWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl },
  sunWrap: { marginBottom: SPACING.lg },
  titleKu: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.fire[600], letterSpacing: -0.5, marginBottom: 4 },
  titleEn: { fontSize: FONT_SIZE.md, fontWeight: '600', color: c.midnight[800], textAlign: 'center', marginBottom: SPACING.md },
  descriptionText: { fontSize: FONT_SIZE.sm, color: c.gray[500], textAlign: 'center', lineHeight: 20, marginBottom: SPACING.xl },
  startBtn: { alignSelf: 'stretch', backgroundColor: COLORS.fire[600], borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', marginBottom: 12, ...SHADOWS.md },
  startBtnText: { fontSize: FONT_SIZE.md, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  highScoreText: { fontSize: FONT_SIZE.xs, color: c.gray[400], textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8 },

  // Game Area
  gameArea: { flex: 1, padding: SPACING.lg },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  scoreBadge: { backgroundColor: c.white, borderWidth: 1, borderColor: c.gray[100], paddingHorizontal: SPACING.md, paddingVertical: 8, borderRadius: RADIUS.md, alignItems: 'center', minWidth: 70 },
  scoreLabel: { fontSize: 9, fontWeight: '800', color: c.gray[400] },
  scoreValue: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800] },
  comboBadge: { backgroundColor: COLORS.fire[500], paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.full, flexDirection: 'row', alignItems: 'center', gap: 4 },
  comboText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF' },
  timeBadge: { backgroundColor: c.white, borderWidth: 1, borderColor: c.gray[100], paddingHorizontal: SPACING.md, paddingVertical: 8, borderRadius: RADIUS.md, alignItems: 'center', minWidth: 70 },
  timeLabel: { fontSize: 9, fontWeight: '800', color: c.gray[400] },
  timeValue: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800] },

  // Progress Bar
  progressBarBg: { height: 6, backgroundColor: c.gray[100], borderRadius: 3, marginBottom: SPACING.xl, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },

  // Card Container
  cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  gameCard: {
    width: SCREEN_W - SPACING.xl * 2,
    height: 380,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: c.gray[100],
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  cardContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  cardWordKu: { fontSize: 32, fontWeight: '800', color: c.midnight[800], textAlign: 'center', letterSpacing: -0.5 },
  divider: { width: 48, height: 2, backgroundColor: COLORS.fire[200], borderRadius: 1 },
  cardWordMeaning: { fontSize: FONT_SIZE.xl, fontWeight: '600', color: c.gray[500], textAlign: 'center' },
  directionGuideRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  guideText: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },

  // Swipe Indicators Overlay
  indicatorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  indicatorCorrect: { backgroundColor: 'rgba(34,197,94,0.92)' },
  indicatorIncorrect: { backgroundColor: 'rgba(239,68,68,0.92)' },
  indicatorText: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1.5 },

  // Game Over screen
  gameOverStatsCard: {
    alignSelf: 'stretch',
    backgroundColor: c.white,
    borderWidth: 1,
    borderColor: c.gray[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  gameOverStatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gameOverStatLabel: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[500] },
  gameOverStatVal: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: c.midnight[800] },
  gameOverStatDivider: { height: 1, backgroundColor: c.gray[100] },
});
