import React from 'react';
import { Pressable, StyleProp, ViewStyle, AccessibilityRole, AccessibilityState } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Scale at the bottom of the press. Defaults to a subtle 0.97. */
  scaleTo?: number;
  // Accessibility passthrough (forwarded to the underlying Pressable) so cards
  // can expose proper roles/labels to VoiceOver (iOS) and TalkBack (Android).
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityState;
}

/**
 * Drop-in replacement for a tappable card/row that adds the app's signature
 * press-scale (the same gesture used by Button and Card) so every interactive
 * surface feels consistently tactile instead of a flat opacity dip. Disabled
 * cards stay inert (no scale, no press).
 */
export default function PressableScale({ children, onPress, disabled, style, scaleTo = 0.97, accessibilityRole, accessibilityLabel, accessibilityHint, accessibilityState }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable
      onPressIn={() => { if (!disabled) scale.value = withTiming(scaleTo, { duration: 90 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 140 }); }}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[style, animatedStyle]}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
    >
      {children}
    </AnimatedPressable>
  );
}
