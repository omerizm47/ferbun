import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../../theme';
import { useColors } from '../../theme/ThemeProvider';
import { BadgeDef } from '../../data/badges';
import { useLang } from '../../i18n/LanguageProvider';
import {
  KurdishSun,
  NewrozFlame,
  KurdishHorn,
  KurdishSahmaran,
  KurdishTreeOfLife,
  KurdishEagle,
  KurdishKilimChest,
} from './KurdishDecorations';

interface Props {
  def: BadgeDef;
  earned: boolean;
  index?: number;
}

/**
 * A single badge card shown in the ProfileScreen achievements section.
 * Earned badges show their full color, name, and traditional Kurdish motif;
 * unearned ones are greyed out with a lock icon so the learner can see what to aim for.
 */
export default function BadgeCard({ def, earned, index = 0 }: Props) {
  const c = useColors();
  const { lang } = useLang();
  const styles = useMemo(() => makeStyles(c), [c]);

  const name = lang === 'tr' ? def.nameTr : def.nameEn;
  const desc = lang === 'tr' ? def.descTr : def.descEn;

  const renderMotif = () => {
    const size = 26;
    const color = '#FFFFFF';

    switch (def.motif) {
      case 'sun':
        return <KurdishSun size={size} color={color} animate={false} />;
      case 'fire':
        return <NewrozFlame size={size} animate={false} intensity={2} />;
      case 'horn':
        return <KurdishHorn size={size} color={color} />;
      case 'sahmaran':
        return <KurdishSahmaran size={size} color={color} />;
      case 'tree':
        return <KurdishTreeOfLife size={size} color={color} />;
      case 'eagle':
        return <KurdishEagle size={size} color={color} />;
      case 'kilim':
        return <KurdishKilimChest size={size} color={color} />;
      default:
        return <Ionicons name={def.icon as any} size={22} color={color} />;
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 40).duration(300)}
      style={[styles.card, !earned && styles.cardLocked]}
      accessible
      accessibilityLabel={`${name}. ${earned ? (lang === 'tr' ? 'Kazanıldı' : 'Earned') : (lang === 'tr' ? 'Kilitli' : 'Locked')}. ${desc}`}
    >
      {/* Badge icon circle */}
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: earned ? def.color : c.gray[200] },
        ]}
      >
        {earned ? (
          renderMotif()
        ) : (
          <Ionicons name="lock-closed-outline" size={18} color={c.gray[400]} />
        )}
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={[styles.nameKu, !earned && styles.locked]}>{def.nameKu}</Text>
        <Text style={[styles.name, !earned && styles.locked]}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{desc}</Text>
      </View>

      {/* Earned checkmark */}
      {earned && (
        <View style={[styles.check, { backgroundColor: def.color }]}>
          <Ionicons name="checkmark" size={12} color="#FFFFFF" />
        </View>
      )}
    </Animated.View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.white,
      borderRadius: RADIUS.lg,
      padding: SPACING.md,
      marginBottom: SPACING.sm,
      borderWidth: 1,
      borderColor: c.gray[100],
      gap: SPACING.md,
      ...SHADOWS.sm,
    },
    cardLocked: {
      opacity: 0.55,
      backgroundColor: c.cream[50],
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    textWrap: { flex: 1 },
    nameKu: {
      fontSize: FONT_SIZE.xs,
      fontWeight: '800',
      color: c.fire[600],
      letterSpacing: 0.3,
    },
    name: {
      fontSize: FONT_SIZE.md,
      fontWeight: '800',
      color: c.midnight[800],
      marginTop: 1,
    },
    locked: { color: c.gray[400] },
    desc: {
      fontSize: FONT_SIZE.xs,
      color: c.gray[500],
      marginTop: 2,
      lineHeight: 16,
    },
    check: {
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
  });
