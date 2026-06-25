import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong';

interface Props {
  label: string;
  index: number;
  state: OptionState;
  onPress: () => void;
  disabled: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Premium answer row used across choice-based exercises. A crafted letter badge
 * (A/B/C…) leads each option and transforms into a state token — filling ember
 * when chosen, green with a check when correct, red with a cross when wrong —
 * for a polished, consistent quiz surface.
 */
export default function OptionRow({ label, index, state, onPress, disabled }: Props) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const isSelected = state === 'selected';
  const isCorrect = state === 'correct';
  const isWrong = state === 'wrong';
  const a11yValue = isCorrect ? ', correct answer' : isWrong ? ', incorrect' : '';
  return (
    <TouchableOpacity
      style={[styles.option, SHADOWS.sm, isSelected && styles.selected, isCorrect && styles.correct, isWrong && styles.wrong]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.75}
      accessibilityRole="button"
      accessibilityLabel={`${label}${a11yValue}`}
      accessibilityState={{ selected: isSelected || isCorrect, disabled }}
    >
      <View style={[styles.badge, isSelected && styles.badgeSelected, isCorrect && styles.badgeCorrect, isWrong && styles.badgeWrong]}>
        {isCorrect ? (
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        ) : isWrong ? (
          <Ionicons name="close" size={18} color="#FFFFFF" />
        ) : (
          <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>{LETTERS[index] ?? '\u2022'}</Text>
        )}
      </View>
      <Text style={[styles.text, isSelected && styles.textSelected, isCorrect && styles.textCorrect, isWrong && styles.textWrong]}>{label}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  option: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, padding: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 1.5, borderColor: c.gray[200], backgroundColor: c.white },
  selected: { borderColor: c.fire[400], backgroundColor: c.fireSoft },
  correct: { borderColor: c.success, backgroundColor: c.successBg },
  wrong: { borderColor: c.error, backgroundColor: c.errorBg },
  badge: { width: 34, height: 34, borderRadius: 17, backgroundColor: c.fireSoft, borderWidth: 1, borderColor: c.fireSoftBorder, justifyContent: 'center', alignItems: 'center' },
  badgeSelected: { backgroundColor: c.fire[500], borderColor: c.fire[500] },
  badgeCorrect: { backgroundColor: c.success, borderColor: c.success },
  badgeWrong: { backgroundColor: c.error, borderColor: c.error },
  badgeText: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: c.fire[600] },
  badgeTextSelected: { color: '#FFFFFF' },
  text: { flex: 1, fontSize: FONT_SIZE.md, fontWeight: '600', color: c.midnight[800] },
  textSelected: { color: c.fire[700] },
  textCorrect: { color: c.successText },
  textWrong: { color: c.error },
});
