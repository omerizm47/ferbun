import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { RADIUS } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';

interface AnimatedProgressBarProps {
  /** Progress from 0 to 1. */
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
  /** Minimum visible fill fraction so an empty bar still hints at a start. */
  minFill?: number;
}

/** Progress bar whose fill width animates smoothly when `progress` changes. */
export default function AnimatedProgressBar({
  progress,
  height = 10,
  trackColor,
  fillColor,
  style,
  minFill = 0,
}: AnimatedProgressBarProps) {
  const c = useColors();
  const track = trackColor ?? c.gray[200];
  const fill = fillColor ?? c.fire[500];
  const clamped = Math.max(minFill, Math.min(1, progress));
  const width = useSharedValue(clamped);

  useEffect(() => {
    width.value = withTiming(clamped, { duration: 420, easing: Easing.out(Easing.cubic) });
  }, [clamped, width]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));

  return (
    <View style={[styles.track, { height, backgroundColor: track, borderRadius: height / 2 }, style]}>
      <Animated.View style={[styles.fill, { backgroundColor: fill, borderRadius: height / 2 }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: { height: '100%', borderRadius: RADIUS.full },
});
