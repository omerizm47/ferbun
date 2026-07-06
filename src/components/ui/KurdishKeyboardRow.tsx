import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { haptics } from '../../utils/haptics';
import { useLang } from '../../i18n/LanguageProvider';

/**
 * A thin horizontal strip of Kurdish special-character buttons shown above
 * the keyboard when a typed-answer exercise is focused.
 *
 * Characters included:
 *   ê î û  — vowels absent from standard Latin keyboards (most needed)
 *   ş ç    — on Turkish keyboards but included for EN-keyboard users
 *   x q    — Kurdish-specific consonants absent from standard layouts
 *   Ê Î Û  — capitalised variants for sentence-initial answers
 *
 * Tapping a button calls `onInsert(char)` — the parent exercise owns the
 * input state and appends the character.
 */

const CHARS_LOWER = ['ê', 'î', 'û', 'ş', 'ç', 'x', 'q'];
const CHARS_UPPER = ['Ê', 'Î', 'Û', 'Ş', 'Ç', 'X', 'Q'];

interface Props {
  onInsert: (char: string) => void;
  showUppercase?: boolean;
  onToggleCase?: () => void;
}

export default function KurdishKeyboardRow({ onInsert, showUppercase = false, onToggleCase }: Props) {
  const c = useColors();
  const { lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);

  const chars = showUppercase ? CHARS_UPPER : CHARS_LOWER;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        keyboardShouldPersistTaps="always"
      >
        {chars.map((char) => (
          <TouchableOpacity
            key={char}
            style={styles.btn}
            onPress={() => {
              haptics.light();
              onInsert(char);
            }}
            activeOpacity={0.65}
            accessibilityRole="button"
            accessibilityLabel={lang === 'tr' ? `${char} ekle` : `Insert ${char}`}
          >
            <Text style={styles.char}>{char}</Text>
          </TouchableOpacity>
        ))}
        {onToggleCase && (
          <TouchableOpacity
            style={[styles.btn, styles.toggleBtn]}
            onPress={() => {
              haptics.selection();
              onToggleCase();
            }}
            activeOpacity={0.65}
            accessibilityRole="button"
            accessibilityLabel={lang === 'tr' ? (showUppercase ? 'Küçük harfe geç' : 'Büyük harfe geç') : (showUppercase ? 'Switch to lowercase' : 'Switch to uppercase')}
          >
            <Text style={[styles.char, styles.toggleChar]}>
              {showUppercase ? 'a⇧' : 'A⇧'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      borderTopWidth: 1,
      borderTopColor: c.gray[100],
      backgroundColor: c.cream[50],
      marginTop: SPACING.sm,
      paddingVertical: SPACING.xs,
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: SPACING.xs,
      paddingVertical: 2,
      gap: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btn: {
      minWidth: 35,
      height: 35,
      borderRadius: RADIUS.md,
      backgroundColor: c.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.gray[200],
      paddingHorizontal: 2,
      shadowColor: c.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1.5,
      elevation: 1,
    },
    char: {
      fontSize: 15,
      fontWeight: '700',
      color: c.fire[600],
    },
    toggleBtn: {
      backgroundColor: c.gray[50],
      borderColor: c.gray[300],
      marginLeft: 2,
    },
    toggleChar: {
      color: c.gray[500],
      fontSize: 12,
    },
  });
