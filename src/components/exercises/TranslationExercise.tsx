import React, { useState, useMemo } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../../theme';
import { useTheme } from '../../theme/ThemeProvider';
import { Exercise } from '../../data/types';
import { haptics } from '../../utils/haptics';
import { checkTypedAnswer } from '../../utils/answers';
import { useLang } from '../../i18n/LanguageProvider';
import { exercisePrompt, exercisePromptKu, resolveTypedAnswer } from '../../i18n/content';
import QuestionPrompt from './QuestionPrompt';
import Button from '../ui/Button';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function TranslationExercise({ exercise, onAnswer, disabled }: Props) {
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (disabled || submitted || !input.trim()) return;
    setSubmitted(true);
    const correct = checkTypedAnswer(input, resolveTypedAnswer(exercise, lang));
    if (correct) haptics.success(); else haptics.error();
    onAnswer(correct);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
      <Pressable onPress={Keyboard.dismiss} accessible={false}>
        <QuestionPrompt kicker={`WERGERÎNE · ${t.exercises.translateKicker}`} questionKu={exercisePromptKu(exercise, lang)} questionEn={exercisePrompt(exercise, lang)} />
      </Pressable>
      <TextInput
        style={[styles.input, focused && styles.inputFocused, submitted && styles.inputDisabled]}
        placeholder={t.exercises.typeAnswer}
        placeholderTextColor={c.gray[400]}
        selectionColor={c.fire[500]}
        cursorColor={c.fire[500]}
        keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
        value={input}
        onChangeText={setInput}
        editable={!disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!disabled && (
        <Button label={t.common.check} onPress={handleSubmit} disabled={!input.trim()} haptic={false} style={styles.checkBtn} />
      )}
    </KeyboardAvoidingView>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderWidth: 1.5, borderColor: c.gray[200], borderRadius: RADIUS.lg,
    padding: SPACING.md, fontSize: FONT_SIZE.lg, color: c.midnight[800],
    backgroundColor: c.white, ...SHADOWS.sm,
  },
  inputFocused: { borderColor: c.fire[400], backgroundColor: c.fireSoft },
  inputDisabled: { backgroundColor: c.gray[100], borderColor: c.gray[200] },
  checkBtn: { marginTop: SPACING.md },
});
