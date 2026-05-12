import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../theme';
import { Exercise } from '../../data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function MultipleChoiceExercise({ exercise, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    const isCorrect = option === exercise.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <View style={styles.container}>
      {exercise.questionKu && (
        <Text style={styles.kurdishText}>{exercise.questionKu}</Text>
      )}
      <Text style={styles.question}>{exercise.questionEn}</Text>
      <View style={styles.options}>
        {exercise.options?.map((option, index) => {
          const isSelected = selected === option;
          const isCorrect = option === exercise.correctAnswer;
          const showResult = disabled && isSelected;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
                showResult && isCorrect && styles.optionCorrect,
                showResult && !isCorrect && styles.optionWrong,
                disabled && isCorrect && styles.optionCorrect,
              ]}
              onPress={() => handleSelect(option)}
              activeOpacity={disabled ? 1 : 0.7}
            >
              <Text style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
                disabled && isCorrect && styles.optionTextCorrect,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  kurdishText: { fontSize: 28, fontWeight: '800', color: COLORS.fire[600], marginBottom: SPACING.sm, lineHeight: 36 },
  question: { fontSize: FONT_SIZE.md, fontWeight: '500', color: COLORS.gray[600], marginBottom: SPACING.xl, lineHeight: 24 },
  options: { gap: SPACING.sm },
  option: {
    padding: SPACING.md, borderRadius: RADIUS.lg, borderWidth: 2,
    borderColor: COLORS.gray[200], backgroundColor: COLORS.white,
  },
  optionSelected: { borderColor: COLORS.fire[400], backgroundColor: COLORS.fire[50] },
  optionCorrect: { borderColor: COLORS.success, backgroundColor: '#F0FDF4' },
  optionWrong: { borderColor: COLORS.error, backgroundColor: '#FEF2F2' },
  optionText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.midnight[800] },
  optionTextSelected: { color: COLORS.fire[700] },
  optionTextCorrect: { color: COLORS.success },
});
