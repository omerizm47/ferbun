import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, StyleProp, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { haptics } from '../../utils/haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  /** Haptic feedback on press. Defaults to true. */
  haptic?: boolean;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = true,
  color,
  style,
  haptic = true,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const c = useColors();

  const accent = color ?? c.fire[500];
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  const containerStyle: ViewStyle = {
    backgroundColor: isPrimary ? accent : isSecondary ? c.white : 'transparent',
    borderWidth: isSecondary ? 2 : 0,
    borderColor: isSecondary ? c.gray[200] : 'transparent',
  };

  const textColor = isPrimary ? c.white : isSecondary ? c.midnight[800] : accent;

  const handlePress = () => {
    if (disabled) return;
    if (haptic) haptics.medium();
    onPress();
  };

  return (
    <AnimatedPressable
      onPressIn={() => { scale.value = withTiming(0.96, { duration: 90 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 140 }); }}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.base,
        containerStyle,
        isPrimary && SHADOWS.md,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <Ionicons name={icon} size={20} color={textColor} style={styles.iconLeft} />
      )}
      <Text style={[styles.label, { color: textColor } as TextStyle]}>{label}</Text>
      {icon && iconPosition === 'right' && (
        <Ionicons name={icon} size={20} color={textColor} style={styles.iconRight} />
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
  label: { fontSize: FONT_SIZE.md, fontWeight: '700', letterSpacing: 0.2 },
  iconLeft: { marginRight: SPACING.sm },
  iconRight: { marginLeft: SPACING.sm },
});
