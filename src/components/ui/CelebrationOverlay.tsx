import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, useWindowDimensions } from 'react-native';
import Animated, { ZoomIn, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '../../theme/ThemeProvider';
import { SPACING, FONT_SIZE, SHADOWS, TYPOGRAPHY } from '../../theme';
import { StreakLevel } from '../../stores/progressStore';
import { KurdishSun, KilimBorder } from './KurdishDecorations';
import { haptics } from '../../utils/haptics';
import Button from './Button';

export type Celebration =
  | { kind: 'level'; level: number }
  | { kind: 'streak'; tier: StreakLevel };

interface Props {
  celebration: Celebration | null;
  onDismiss: () => void;
}

/**
 * Full-screen reward moment shown when a lesson pushes the learner over a
 * threshold — a new level or a new streak tier. Reuses the Newroz-sun medal
 * language (ray-burst behind a gradient emblem + kilim accent) so the milestone
 * feels crafted and on-brand. Leads with the attested Kurmanji "Pîroz be!".
 */
export default function CelebrationOverlay({ celebration, onDismiss }: Props) {
  const c = useColors();
  const { width } = useWindowDimensions();

  // Stable identity per milestone so a queued second celebration (e.g. a streak
  // tier right after a level-up) re-mounts the animated content — replaying the
  // ZoomIn burst — and re-fires the haptic, instead of silently swapping text.
  const celebKey = celebration
    ? celebration.kind === 'level'
      ? `level:${celebration.level}`
      : `streak:${celebration.tier.label}`
    : null;

  useEffect(() => {
    if (celebKey) haptics.success();
  }, [celebKey]);

  if (!celebration) return null;

  const isLevel = celebration.kind === 'level';
  const icon: keyof typeof Ionicons.glyphMap = isLevel ? 'star' : 'flame';
  const overline = isLevel ? 'LEVEL UP' : 'NEW STREAK TIER';
  const detail = isLevel
    ? `You reached Level ${celebration.level}`
    : celebration.tier.label;

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={onDismiss}>
      <Pressable
        style={styles.overlay}
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel={`${overline}. ${detail}. Tap to continue.`}
      >
        <Animated.View key={celebKey} entering={ZoomIn.springify().damping(13)} style={styles.center}>
          <View style={styles.medalWrap} pointerEvents="none">
            <View style={styles.rays} importantForAccessibility="no-hide-descendants">
              <KurdishSun size={Math.min(220, width * 0.6)} color={c.fire[300]} />
            </View>
            <LinearGradient
              colors={[c.fire[400], c.fire[600], c.fire[800]]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[styles.medal, SHADOWS.lg]}
            >
              <Ionicons name={icon} size={56} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={[styles.overline, { color: 'rgba(255,255,255,0.7)' }]}>{overline}</Text>
          <Text style={[styles.title, { color: '#FFFFFF' }]} accessibilityRole="header">Pîroz be!</Text>

          <View style={styles.kilim} pointerEvents="none">
            <KilimBorder width={120} color={c.fire[300]} />
          </View>

          <Text style={[styles.detail, { color: 'rgba(255,255,255,0.92)' }]}>{detail}</Text>

          <Animated.View entering={FadeIn.delay(220).duration(360)} style={styles.btnWrap}>
            <Button label="Berdewam be" icon="arrow-forward" iconPosition="right" onPress={onDismiss} />
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl, backgroundColor: 'rgba(2,6,23,0.72)' },
  center: { alignItems: 'center', alignSelf: 'stretch' },
  medalWrap: { width: 220, height: 220, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  rays: { position: 'absolute', opacity: 0.6 },
  medal: { width: 104, height: 104, borderRadius: 52, justifyContent: 'center', alignItems: 'center' },
  overline: { ...TYPOGRAPHY.kicker, letterSpacing: 2 },
  title: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', letterSpacing: -0.5, marginTop: 4 },
  kilim: { marginVertical: SPACING.md, opacity: 0.95 },
  detail: { fontSize: FONT_SIZE.lg, fontWeight: '700', textAlign: 'center', marginBottom: SPACING.xl },
  btnWrap: { alignSelf: 'stretch' },
});
