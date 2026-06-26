import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONT_SIZE, TYPOGRAPHY, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { KilimDiamond } from '../ui/KurdishDecorations';
import { speakKurdish } from '../../utils/speech';

interface Props {
  /** Short Kurmanji · English instruction, e.g. "HILBIJÊRE · CHOOSE". */
  kicker: string;
  questionKu?: string;
  questionEn?: string;
}

/**
 * Shared, culturally-grounded prompt header for every exercise. A small kilim
 * lozenge sits beside a bilingual instruction kicker, with the Kurmanji prompt
 * led in ember and the English support line beneath — so each question reads as
 * crafted and consistent rather than bare text.
 */
export default function QuestionPrompt({ kicker, questionKu, questionEn }: Props) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View style={styles.wrap}>
      <View style={styles.kickerRow}>
        <KilimDiamond size={13} color={c.fire[400]} />
        <Text style={styles.kicker}>{kicker}</Text>
      </View>
      {questionKu ? (
        <View style={styles.kuRow}>
          <TouchableOpacity
            style={styles.kuBtn}
            onPress={() => speakKurdish(questionKu)}
            accessibilityRole="button"
            accessibilityLabel={`${questionKu}. Tap to hear pronunciation.`}
            activeOpacity={0.7}
          >
            <Text style={styles.ku}>{questionKu}</Text>
            <Ionicons name="volume-medium-outline" size={22} color={c.fire[500]} style={{ marginTop: 2 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.slowBtn}
            onPress={() => speakKurdish(questionKu, true)}
            accessibilityRole="button"
            accessibilityLabel="Listen slowly"
            activeOpacity={0.7}
          >
            <Ionicons name="volume-low-outline" size={20} color={c.fire[600]} />
          </TouchableOpacity>
        </View>
      ) : null}
      {questionEn ? <Text style={styles.en}>{questionEn}</Text> : null}
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  wrap: { marginBottom: SPACING.xl },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.md },
  kicker: { ...TYPOGRAPHY.kicker, color: c.fire[600] },
  kuRow: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' },
  kuBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.cream[100] || '#FDFBF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    borderWidth: 1,
    borderColor: c.gray[200],
  },
  ku: { fontSize: 28, fontWeight: '800', color: c.fire[600], lineHeight: 36 },
  en: { fontSize: FONT_SIZE.md, fontWeight: '500', color: c.gray[600], lineHeight: 24, marginTop: SPACING.sm },
});

