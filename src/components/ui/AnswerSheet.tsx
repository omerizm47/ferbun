import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withDelay, withTiming, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { useT } from '../../i18n/LanguageProvider';

interface Props {
  correct: boolean;
  bottomInset: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Shared premium answer-feedback sheet. Slides up after an answer with a drag
 * handle, a spring-bouncing result emblem, and a bilingual "Aferîn! / Nêzîk bû"
 * headline. Used by both the lesson feedback bar and the story comprehension
 * quiz so the "after you answer" moment is identical and on-brand. `children`
 * holds whatever follows (correct-answer chip, explanation, the action button).
 */
export default function AnswerSheet({ correct, bottomInset, style, children }: Props) {
  const c = useColors();
  const t = useT();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scale = useSharedValue(0);
  useEffect(() => {
    // Ease the emblem in just after the sheet rises — calm, no bounce.
    scale.value = withDelay(80, withTiming(1, { duration: 240, easing: Easing.out(Easing.cubic) }));
  }, [scale]);
  const emblemAnim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const accent = correct ? c.success : c.error;

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      style={[styles.sheet, correct ? styles.correct : styles.wrong, { paddingBottom: bottomInset + SPACING.lg }, style]}
    >
      <View style={styles.handle} />
      <View style={styles.head}>
        <Animated.View style={[styles.emblem, { backgroundColor: accent }, SHADOWS.md, emblemAnim]}>
          <Ionicons name={correct ? 'checkmark' : 'close'} size={26} color={c.white} />
        </Animated.View>
        <View style={styles.headText}>
          <Text style={[styles.ku, { color: correct ? c.kurdish[700] : c.error }]}>
            {correct ? 'Aferîn!' : 'Nêzîk bû'}
          </Text>
          <Text style={styles.en}>{correct ? t.feedback.correct : t.feedback.wrong}</Text>
        </View>
      </View>
      {children}
    </Animated.View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  sheet: {
    padding: SPACING.lg, paddingTop: SPACING.md, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    shadowColor: c.black, shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.14, shadowRadius: 20, elevation: 12,
  },
  correct: { backgroundColor: c.successBg, borderTopWidth: 3, borderTopColor: c.success },
  wrong: { backgroundColor: c.errorBg, borderTopWidth: 3, borderTopColor: c.error },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: c.hairline, alignSelf: 'center', marginBottom: SPACING.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.md },
  emblem: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  headText: { flex: 1 },
  ku: { fontSize: FONT_SIZE.xl, fontWeight: '800', letterSpacing: -0.3 },
  en: { ...TYPOGRAPHY.kicker, color: c.gray[500], marginTop: 1 },
});
