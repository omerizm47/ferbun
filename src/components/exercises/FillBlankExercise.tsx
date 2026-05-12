import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../theme';
import { Exercise } from '../../data/types';

interface Props { exercise: Exercise; onAnswer: (correct: boolean) => void; disabled: boolean; }

export default function FillBlankExercise({ exercise, onAnswer, disabled }: Props) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (disabled || submitted || !input.trim()) return;
    setSubmitted(true);
    const correct = input.trim().toLowerCase() === (exercise.correctAnswer as string).toLowerCase();
    onAnswer(correct);
  };

  return (
    <View style={styles.container}>
      {exercise.questionKu && (
        <Text style={styles.kurdishText}>{exercise.questionKu}</Text>
      )}
      {exercise.questionEn && (
        <Text style={styles.question}>{exercise.questionEn}</Text>
      )}
      <TextInput
        style={[styles.input, submitted && styles.inputDisabled]}
        placeholder="Fill in the blank..."
        placeholderTextColor={COLORS.gray[400]}
        value={input}
        onChangeText={setInput}
        editable={!disabled}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!disabled && (
        <TouchableOpacity style={[styles.submitBtn, !input.trim() && styles.submitBtnDisabled]} onPress={handleSubmit} disabled={!input.trim()}>
          <Text style={styles.submitText}>Check</Text>
        </TouchableOpacity>
      )}
      {disabled && (
        <Text style={styles.correctAnswer}>Answer: {exercise.correctAnswer as string}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  kurdishText: { fontSize: 28, fontWeight: '800', color: COLORS.fire[600], marginBottom: SPACING.sm, lineHeight: 36 },
  question: { fontSize: FONT_SIZE.md, fontWeight: '500', color: COLORS.gray[600], marginBottom: SPACING.xl, lineHeight: 24 },
  input: { borderWidth: 2, borderColor: COLORS.gray[200], borderRadius: RADIUS.lg, padding: SPACING.md, fontSize: FONT_SIZE.lg, color: COLORS.midnight[800], backgroundColor: COLORS.white },
  inputDisabled: { backgroundColor: COLORS.gray[100] },
  submitBtn: { backgroundColor: COLORS.fire[500], padding: SPACING.md, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.md },
  submitBtnDisabled: { backgroundColor: COLORS.gray[300] },
  submitText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
  correctAnswer: { fontSize: FONT_SIZE.sm, color: COLORS.gray[500], marginTop: SPACING.md, fontStyle: 'italic' },
});
