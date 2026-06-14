import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { KilimBorder, KurdishSun } from './KurdishDecorations';

interface ScreenHeaderProps {
  /** Kurmanji title — leads the header to anchor Kurdish identity. */
  titleKu: string;
  /** English label rendered as a small overline above the Kurmanji title. */
  titleEn?: string;
  /** Show a back chevron and call this on press. */
  onBack?: () => void;
  /** Optional element rendered on the trailing side. */
  right?: React.ReactNode;
  /** Accent colour for the overline and kilim motif. Defaults to Newroz fire. */
  accent?: string;
  /** Safe-area top inset to apply as top padding. */
  topInset?: number;
  /** Render a faint Kurdish-sun crest in the top corner. */
  emblem?: boolean;
}

/**
 * Unified, culturally-grounded screen header used across the app. Leads with the
 * Kurmanji name, supports an English overline, and carries a small kilim motif —
 * the recurring woven-textile accent that ties the screens together.
 */
export default function ScreenHeader({
  titleKu,
  titleEn,
  onBack,
  right,
  accent,
  topInset = 0,
  emblem = false,
}: ScreenHeaderProps) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const tone = accent ?? c.fire[600];
  return (
    <View style={[styles.header, { paddingTop: topInset + SPACING.sm }]}>
      {emblem && (
        <View style={[styles.emblem, { top: topInset - 4 }]} pointerEvents="none">
          <KurdishSun size={72} color={c.fire[300]} />
        </View>
      )}
      <View style={styles.row}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={8} style={styles.back} accessibilityRole="button" accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={22} color={c.midnight[800]} />
          </Pressable>
        )}
        <View style={styles.titleArea}>
          {titleEn && <Text style={[styles.overline, { color: tone }]} numberOfLines={1}>{titleEn}</Text>}
          <Text style={styles.title} numberOfLines={1} accessibilityRole="header">{titleKu}</Text>
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
      <View style={styles.kilim} pointerEvents="none">
        <KilimBorder width={52} color={tone} />
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  header: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md },
  emblem: { position: 'absolute', right: SPACING.md, opacity: 0.5 },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  back: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: -SPACING.sm, marginBottom: 2 },
  titleArea: { flex: 1 },
  overline: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 2 },
  title: { fontSize: 27, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.5 },
  right: { justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 2 },
  kilim: { marginTop: SPACING.sm, opacity: 0.85 },
});
