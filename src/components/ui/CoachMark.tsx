import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ViewStyle } from 'react-native';
import Animated, {
  FadeIn, FadeInDown,
  useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { useT } from '../../i18n/LanguageProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { KilimDiamond } from './KurdishDecorations';

export interface CoachStep {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Where the card sits on screen. Defaults to 'center'. */
  align?: 'top' | 'center' | 'bottom';
}

interface Props {
  visible: boolean;
  steps: CoachStep[];
  step: number;
  onNext: () => void;
  onSkip: () => void;
}

/** Icon tile with a radiating attention pulse to draw the eye. */
function PulsingIcon({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  const c = useColors();
  const reducedMotion = useReducedMotion();
  const p = useSharedValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    p.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, [reducedMotion, p]);
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + p.value * 0.7 }],
    opacity: 0.45 * (1 - p.value),
  }));
  return (
    <View style={{ width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: c.fireSoft, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ position: 'absolute', width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: c.fire[300] }, ringStyle]} />
      <Ionicons name={icon} size={26} color={c.fire[600]} />
    </View>
  );
}

/**
 * Lightweight first-run spotlight overlay. Dims the screen and shows a guidance
 * card; tapping anywhere advances. Built on reanimated (no extra dependency).
 */
export default function CoachMark({ visible, steps, step, onNext, onSkip }: Props) {
  const c = useColors();
  const t = useT();
  const styles = useMemo(() => makeStyles(c), [c]);
  if (!visible || steps.length === 0) return null;
  const current = steps[Math.min(step, steps.length - 1)];
  const isLast = step >= steps.length - 1;
  const align = current.align ?? 'center';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onSkip} statusBarTranslucent>
      <Pressable style={[styles.overlay, alignStyle[align]]} onPress={onNext}>
        <Animated.View key={step} entering={FadeInDown.duration(280)} style={styles.card}>
          <View style={styles.head}>
            <PulsingIcon icon={current.icon} />
            <Text style={styles.counter}>{step + 1} / {steps.length}</Text>
          </View>
          <View style={styles.kickerRow}>
            <KilimDiamond size={12} color={c.fire[400]} />
            <Text style={styles.kicker}>RÊBER · {t.coach.kicker}</Text>
          </View>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.description}>{current.description}</Text>

          <View style={styles.footer}>
            <View style={styles.dots}>
              {steps.map((_, i) => (
                <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
              ))}
            </View>
            <View style={styles.actions}>
              {!isLast && (
                <Pressable onPress={onSkip} hitSlop={8} style={styles.skipBtn}>
                  <Text style={styles.skipText}>{t.common.skip}</Text>
                </Pressable>
              )}
              <Pressable onPress={onNext} style={styles.nextBtn}>
                <Text style={styles.nextText}>{isLast ? t.coach.gotIt : t.common.next}</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
        <Animated.Text entering={FadeIn.delay(450).duration(400)} style={styles.tapHint}>
          {t.coach.tapHint}
        </Animated.Text>
      </Pressable>
    </Modal>
  );
}

const alignStyle: Record<'top' | 'center' | 'bottom', ViewStyle> = {
  top: { justifyContent: 'flex-start', paddingTop: 96 },
  center: { justifyContent: 'center' },
  bottom: { justifyContent: 'flex-end', paddingBottom: 110 },
};

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(2,6,23,0.6)', paddingHorizontal: SPACING.lg },
  card: { backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.lg },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  counter: { fontSize: FONT_SIZE.xs, fontWeight: '700', color: c.gray[400] },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: SPACING.md },
  kicker: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  title: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], marginTop: 4, marginBottom: 6 },
  description: { fontSize: FONT_SIZE.sm, color: c.gray[600], lineHeight: 22 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.lg },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: c.gray[200] },
  dotActive: { backgroundColor: c.fire[500], width: 18 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  skipBtn: { paddingVertical: 8, paddingHorizontal: SPACING.sm },
  skipText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[400] },
  nextBtn: { backgroundColor: c.fire[500], paddingVertical: 10, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.md },
  nextText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.white },
  tapHint: { textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: FONT_SIZE.xs, fontWeight: '600', marginTop: SPACING.md },
});
