import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, TYPOGRAPHY, ThemeColors } from '../../theme';
import { useTheme } from '../../theme/ThemeProvider';
import { Exercise } from '../../data/types';
import { haptics } from '../../utils/haptics';
import { checkTypedAnswer } from '../../utils/answers';
import { useLang } from '../../i18n/LanguageProvider';
import { exercisePrompt, resolveTypedAnswer } from '../../i18n/content';
import Button from '../ui/Button';
import KurdishKeyboardRow from '../ui/KurdishKeyboardRow';

/**
 * Writing exercise — the complement of translation.
 * Shows the meaning (TR/EN) in a prominent "prompt card" and asks the
 * learner to type the Kurdish word or phrase from memory.
 * Differs from TranslationExercise in its visual emphasis: the answer
 * card is large and centred, with the meaning as the dominant element.
 */

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function WritingExercise({ exercise, onAnswer, disabled }: Props) {
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showUpper, setShowUpper] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const meaning = exercisePrompt(exercise, lang); // TR or EN meaning to display

  const handleSubmit = () => {
    if (disabled || submitted || !input.trim()) return;
    Keyboard.dismiss();
    setSubmitted(true);
    const correct = checkTypedAnswer(input, resolveTypedAnswer(exercise, lang));
    if (correct) haptics.success(); else haptics.error();
    onAnswer(correct);
  };

  const handleInsert = (char: string) => {
    setInput((prev) => prev + char);
    inputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
      <Pressable onPress={Keyboard.dismiss} accessible={false} style={styles.inner}>
        {/* Kicker */}
        <Text style={styles.kicker}>BINIVÎSE · {lang === 'tr' ? 'KÜRTÇE YAZ' : 'WRITE IN KURDISH'}</Text>

        {/* Meaning card — big and centred */}
        <Animated.View entering={FadeInDown.duration(280)} style={styles.meaningCard}>
          <Ionicons name="language-outline" size={20} color={c.fire[500]} style={styles.langIcon} />
          <Text style={styles.meaningText}>{meaning}</Text>
        </Animated.View>

        {/* Input */}
        <TextInput
          ref={inputRef}
          style={[styles.input, focused && styles.inputFocused, submitted && styles.inputDisabled]}
          placeholder={lang === 'tr' ? 'Kürtçe yaz...' : 'Write in Kurdish...'}
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
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          enablesReturnKeyAutomatically
        />
      </Pressable>

      {/* Kurdish keyboard row */}
      {!disabled && !submitted && (
        <KurdishKeyboardRow
          onInsert={handleInsert}
          showUppercase={showUpper}
          onToggleCase={() => setShowUpper((v) => !v)}
        />
      )}

      {!disabled && (
        <View style={styles.btnWrap}>
          <Button
            label={t.common.check}
            onPress={handleSubmit}
            disabled={!input.trim()}
            haptic={false}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, paddingHorizontal: 0 },
    kicker: {
      ...TYPOGRAPHY.kicker,
      color: c.fire[600],
      marginBottom: SPACING.md,
    },
    meaningCard: {
      backgroundColor: c.white,
      borderRadius: RADIUS.xl,
      padding: SPACING.lg,
      alignItems: 'center',
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: c.gray[100],
      ...SHADOWS.md,
    },
    langIcon: {
      marginBottom: SPACING.xs,
    },
    meaningText: {
      fontSize: FONT_SIZE.xl,
      fontWeight: '800',
      color: c.midnight[800],
      textAlign: 'center',
      letterSpacing: -0.3,
    },
    input: {
      borderWidth: 1.5,
      borderColor: c.gray[200],
      borderRadius: RADIUS.lg,
      padding: SPACING.md,
      fontSize: FONT_SIZE.xl,
      fontWeight: '700',
      color: c.fire[600],
      backgroundColor: c.white,
      textAlign: 'center',
      ...SHADOWS.sm,
    },
    inputFocused: { borderColor: c.fire[400], backgroundColor: c.fireSoft },
    inputDisabled: { backgroundColor: c.gray[100], borderColor: c.gray[200] },
    btnWrap: { paddingTop: SPACING.md },
  });
