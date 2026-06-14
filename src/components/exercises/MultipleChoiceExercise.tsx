import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../../theme';
import { Exercise } from '../../data/types';
import { shuffle } from '../../utils/shuffle';
import { haptics } from '../../utils/haptics';
import { useLang } from '../../i18n/LanguageProvider';
import { resolveChoices, exercisePrompt, exercisePromptKu } from '../../i18n/content';
import QuestionPrompt from './QuestionPrompt';
import OptionRow, { OptionState } from './OptionRow';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function MultipleChoiceExercise({ exercise, onAnswer, disabled }: Props) {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  // Options + correct answer resolve together from the active language so a
  // multiple-choice answer can never desync across locales.
  const { options: localizedOptions, correct } = resolveChoices(exercise, lang);
  const isCorrectOption = (o: string) => (Array.isArray(correct) ? correct.includes(o) : o === correct);

  // Shuffle once per exercise (and language) so the correct answer's position
  // varies but stays stable across re-renders of the same question.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: re-shuffle only when the exercise or language changes
  const options = useMemo(() => shuffle(localizedOptions ?? []), [exercise.id, lang]);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    const isCorrect = isCorrectOption(option);
    if (isCorrect) haptics.success(); else haptics.error();
    onAnswer(isCorrect);
  };

  return (
    <View style={styles.container}>
      <QuestionPrompt kicker={`HILBIJÊRE · ${t.exercises.chooseKicker}`} questionKu={exercisePromptKu(exercise, lang)} questionEn={exercisePrompt(exercise, lang)} />
      <View style={styles.options}>
        {options.map((option, index) => {
          const isSelected = selected === option;
          const isCorrect = isCorrectOption(option);
          const state: OptionState = disabled
            ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'idle')
            : (isSelected ? 'selected' : 'idle');
          return (
            <OptionRow
              key={index}
              index={index}
              label={option}
              state={state}
              onPress={() => handleSelect(option)}
              disabled={disabled}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  options: { gap: SPACING.sm },
});
