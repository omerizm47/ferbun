import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SPACING, RADIUS, SHADOWS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: 'sm' | 'md' | 'lg' | 'none';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeOpacity?: number;
}

/**
 * Surface container with consistent radius + cross-platform elevation.
 * When `onPress` is provided it adds a subtle press-scale animation.
 */
export default function Card({
  children,
  onPress,
  elevation = 'sm',
  style,
  disabled = false,
}: CardProps) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const shadow = elevation === 'none' ? undefined : SHADOWS[elevation];

  if (!onPress) {
    return <View style={[styles.base, shadow, style]}>{children}</View>;
  }

  return (
    <AnimatedPressable
      onPressIn={() => { scale.value = withTiming(0.98, { duration: 90 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 140 }); }}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[styles.base, shadow, animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  base: {
    backgroundColor: c.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
});
