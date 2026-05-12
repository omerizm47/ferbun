import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../theme';
import { Exercise } from '../../data/types';

interface Props { exercise: Exercise; onAnswer: (correct: boolean) => void; disabled: boolean; }

export default function TrueFalseExercise({ exercise, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const handleSelect = (answer: string) => {
    if (disabled) return;
    setSelected(answer);
    onAnswer(answer === exercise.correctAnswer);
  };
  return (
    <View style={styles.container}>
      {exercise.questionKu && (
        <Text style={styles.kurdishText}>{exercise.questionKu}</Text>
      )}
      <Text style={styles.question}>{exercise.questionEn}</Text>
      <View style={styles.buttons}>
        {['True', 'False'].map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === exercise.correctAnswer;
          return (
            <TouchableOpacity key={opt} style={[styles.btn, isSelected && styles.btnSelected, disabled && isCorrect && styles.btnCorrect, disabled && isSelected && !isCorrect && styles.btnWrong]} onPress={() => handleSelect(opt)} activeOpacity={disabled ? 1 : 0.7}>
              <Text style={[styles.btnText, isSelected && styles.btnTextSelected]}>{opt === 'True' ? 'Rast ✓' : 'Şaş ✗'}</Text>
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
  buttons: { flexDirection: 'row', gap: SPACING.md },
  btn: { flex: 1, padding: SPACING.lg, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: COLORS.gray[200], backgroundColor: COLORS.white, alignItems: 'center' },
  btnSelected: { borderColor: COLORS.fire[400], backgroundColor: COLORS.fire[50] },
  btnCorrect: { borderColor: COLORS.success, backgroundColor: '#F0FDF4' },
  btnWrong: { borderColor: COLORS.error, backgroundColor: '#FEF2F2' },
  btnText: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.midnight[800] },
  btnTextSelected: { color: COLORS.fire[700] },
});
