import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { Exercise } from '../../data/types';
import { shuffle } from '../../utils/shuffle';
import { haptics } from '../../utils/haptics';
import { useLang } from '../../i18n/LanguageProvider';
import { exercisePrompt } from '../../i18n/content';
import QuestionPrompt from './QuestionPrompt';

interface Props { exercise: Exercise; onAnswer: (correct: boolean) => void; disabled: boolean; }

type Item = { id: string; pairId: number; text: string };
type TileState = 'idle' | 'selected' | 'matched' | 'wrong';

/**
 * Tap-to-match mini-game: tap a Kurmanji word, then its meaning. Correct pairs
 * lock in green; a mismatch flashes red and resets. The exercise is forgiving —
 * it can't be failed — so it completes (reporting correct) once every pair is
 * matched, acting as a confidence-building vocabulary warm-up.
 */
export default function MatchPairsExercise({ exercise, onAnswer, disabled }: Props) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { t, lang } = useLang();

  // eslint-disable-next-line react-hooks/exhaustive-deps -- pairs are fixed per exercise
  const pairs = useMemo(() => exercise.pairs ?? [], [exercise.id]);
  const gloss = (p: { en: string; tr?: string }) => (lang === 'tr' && p.tr ? p.tr : p.en);

  // Each column shuffled independently so the answers never line up by row.
  // Re-shuffle only when the exercise or bridge language changes.
  const leftItems = useMemo<Item[]>(
    () => shuffle(pairs.map((p, i) => ({ id: `L${i}`, pairId: i, text: p.ku }))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id, lang],
  );
  const rightItems = useMemo<Item[]>(
    () => shuffle(pairs.map((p, i) => ({ id: `R${i}`, pairId: i, text: gloss(p) }))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id, lang],
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState(false);
  const answered = useRef(false);

  // Evaluate once one tile from each column is picked.
  useEffect(() => {
    if (!selectedLeft || !selectedRight) return;
    const lp = leftItems.find((i) => i.id === selectedLeft);
    const rp = rightItems.find((i) => i.id === selectedRight);
    if (!lp || !rp) return;
    if (lp.pairId === rp.pairId) {
      setMatched((prev) => new Set(prev).add(lp.pairId));
      haptics.success();
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      haptics.error();
      setWrong(true);
      const timer = setTimeout(() => {
        setWrong(false);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [selectedLeft, selectedRight, leftItems, rightItems]);

  // Report completion exactly once, when every pair is matched.
  useEffect(() => {
    if (!answered.current && pairs.length > 0 && matched.size === pairs.length) {
      answered.current = true;
      onAnswer(true);
    }
  }, [matched, pairs.length, onAnswer]);

  const stateFor = (item: Item, selectedId: string | null): TileState =>
    matched.has(item.pairId) ? 'matched' : selectedId === item.id ? (wrong ? 'wrong' : 'selected') : 'idle';

  const press = (item: Item, side: 'L' | 'R') => {
    if (disabled || wrong || matched.has(item.pairId)) return;
    haptics.light();
    if (side === 'L') setSelectedLeft(item.id);
    else setSelectedRight(item.id);
  };

  const renderColumn = (items: Item[], selectedId: string | null, side: 'L' | 'R') => (
    <View style={styles.column}>
      {items.map((item) => {
        const st = stateFor(item, selectedId);
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tile,
              st === 'selected' && styles.tileSelected,
              st === 'matched' && styles.tileMatched,
              st === 'wrong' && styles.tileWrong,
            ]}
            onPress={() => press(item, side)}
            disabled={disabled || st === 'matched'}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityState={{ selected: st === 'selected', disabled: st === 'matched' }}
            accessibilityLabel={item.text}
          >
            <Text
              style={[
                styles.tileText,
                st === 'selected' && styles.tileTextSelected,
                st === 'matched' && styles.tileTextMatched,
                st === 'wrong' && styles.tileTextWrong,
              ]}
              numberOfLines={2}
            >
              {item.text}
            </Text>
            {st === 'matched' && <Ionicons name="checkmark" size={15} color={c.kurdish[600]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <QuestionPrompt
        kicker={`LI HEV BÎNE · ${t.exercises.matchKicker}`}
        questionEn={exercisePrompt(exercise, lang) ?? t.exercises.matchInstruction}
      />
      <View style={styles.board}>
        {renderColumn(leftItems, selectedLeft, 'L')}
        {renderColumn(rightItems, selectedRight, 'R')}
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1 },
  board: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.sm },
  column: { flex: 1, gap: SPACING.sm },
  tile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 58, paddingVertical: 12, paddingHorizontal: SPACING.sm, borderRadius: RADIUS.md, backgroundColor: c.white, borderWidth: 1.5, borderColor: c.gray[200], ...SHADOWS.sm },
  tileSelected: { borderColor: c.fire[500], backgroundColor: c.fireSoft },
  tileMatched: { borderColor: c.kurdish[500], backgroundColor: c.kurdishSoft, opacity: 0.75 },
  tileWrong: { borderColor: c.error, backgroundColor: c.errorBg },
  tileText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: c.midnight[800], textAlign: 'center', flexShrink: 1 },
  tileTextSelected: { color: c.fire[700] },
  tileTextMatched: { color: c.successText },
  tileTextWrong: { color: c.error },
});
