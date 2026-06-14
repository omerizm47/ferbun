import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { Exercise } from '../../data/types';
import { haptics } from '../../utils/haptics';
import { useLang } from '../../i18n/LanguageProvider';
import { exercisePrompt, exercisePromptKu } from '../../i18n/content';
import QuestionPrompt from './QuestionPrompt';

interface Props { exercise: Exercise; onAnswer: (correct: boolean) => void; disabled: boolean; }

export default function TrueFalseExercise({ exercise, onAnswer, disabled }: Props) {
  const c = useColors();
  const { t, lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [selected, setSelected] = useState<string | null>(null);
  const CHOICES = [
    { key: 'True', ku: 'Rast', en: t.exercises.true, icon: 'checkmark-circle' as const },
    { key: 'False', ku: 'Şaş', en: t.exercises.false, icon: 'close-circle' as const },
  ];
  const handleSelect = (answer: string) => {
    if (disabled) return;
    setSelected(answer);
    const isCorrect = answer === exercise.correctAnswer;
    if (isCorrect) haptics.success(); else haptics.error();
    onAnswer(isCorrect);
  };
  return (
    <View style={styles.container}>
      <QuestionPrompt kicker={`RAST AN ŞAŞ · ${t.exercises.trueFalseKicker}`} questionKu={exercisePromptKu(exercise, lang)} questionEn={exercisePrompt(exercise, lang)} />
      <View style={styles.row}>
        {CHOICES.map((choice) => {
          const isSelected = selected === choice.key;
          const isCorrect = choice.key === exercise.correctAnswer;
          const accent = disabled
            ? (isCorrect ? c.success : isSelected ? c.error : c.gray[200])
            : (isSelected ? c.fire[400] : c.gray[200]);
          const tint = disabled
            ? (isCorrect ? c.successBg : isSelected ? c.errorBg : c.white)
            : (isSelected ? c.fireSoft : c.white);
          const iconColor = disabled
            ? (isCorrect ? c.success : isSelected ? c.error : c.gray[300])
            : (isSelected ? c.fire[500] : c.gray[400]);
          return (
            <TouchableOpacity
              key={choice.key}
              style={[styles.card, SHADOWS.sm, { borderColor: accent, backgroundColor: tint }]}
              onPress={() => handleSelect(choice.key)}
              activeOpacity={disabled ? 1 : 0.8}
              accessibilityRole="button"
              accessibilityLabel={`${choice.ku}, ${choice.en}`}
              accessibilityState={{ selected: isSelected, disabled }}
            >
              <Ionicons name={choice.icon} size={34} color={iconColor} />
              <Text style={[styles.ku, { color: iconColor }]}>{choice.ku}</Text>
              <Text style={styles.en}>{choice.en}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', gap: SPACING.md },
  card: { flex: 1, paddingVertical: SPACING.xl, borderRadius: RADIUS.lg, borderWidth: 1.5, alignItems: 'center', gap: 6 },
  ku: { fontSize: FONT_SIZE.xl, fontWeight: '800' },
  en: { fontSize: FONT_SIZE.xs, fontWeight: '600', color: c.gray[400], textTransform: 'uppercase', letterSpacing: 1 },
});
