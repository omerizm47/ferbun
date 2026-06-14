import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONT_SIZE, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { KurdishSun, KilimBorder } from './KurdishDecorations';
import Button from './Button';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  titleKu?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Shared, culturally-grounded empty / fallback state. A faint Kurdish sun crest
 * sits behind the icon, with a kilim accent under a bilingual title — so every
 * "nothing here" or "not found" moment still feels crafted and on-brand instead
 * of a bare line of text.
 */
export default function EmptyState({ icon = 'leaf-outline', titleKu, title, message, actionLabel, onAction }: Props) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View style={styles.wrap}>
      <View style={styles.crest}>
        <View style={styles.sun} pointerEvents="none">
          <KurdishSun size={120} color={c.fire[200]} />
        </View>
        <View style={styles.iconDisc}>
          <Ionicons name={icon} size={36} color={c.fire[500]} />
        </View>
      </View>
      {titleKu ? <Text style={styles.titleKu}>{titleKu}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.kilim} pointerEvents="none">
        <KilimBorder width={100} color={c.fire[300]} />
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} fullWidth={false} style={styles.action} />
      ) : null}
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  crest: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  sun: { position: 'absolute', opacity: 0.5 },
  iconDisc: { width: 72, height: 72, borderRadius: 36, backgroundColor: c.white, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.fire[100] },
  titleKu: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: c.fire[600], letterSpacing: -0.5, textAlign: 'center' },
  title: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: c.midnight[800], textAlign: 'center', marginTop: 2 },
  kilim: { marginVertical: SPACING.md, opacity: 0.9 },
  message: { fontSize: FONT_SIZE.md, color: c.gray[500], textAlign: 'center', lineHeight: 22, maxWidth: 300 },
  action: { marginTop: SPACING.xl, paddingHorizontal: SPACING.xxl },
});
