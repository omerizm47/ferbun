import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { RADIUS } from '../../theme';

interface BadgeProps {
  label: string;
  color: string;
  /** Background tint. Defaults to a 12%-opacity wash of `color`. */
  background?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

/** Small pill label used for levels, tags, and counts. */
export default function Badge({ label, color, background, borderColor, style }: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: background ?? color + '1F', borderColor: borderColor ?? 'transparent', borderWidth: borderColor ? 1 : 0 },
        style,
      ]}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: RADIUS.full, alignSelf: 'flex-start' },
  text: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize', letterSpacing: 0.3 },
});
