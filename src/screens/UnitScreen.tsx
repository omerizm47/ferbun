import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SPACING, RADIUS, FONT_SIZE, SHADOWS, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { unitTitle, unitDescription, lessonTitle } from '../i18n/content';
import { useProgressStore } from '../stores/progressStore';
import { getUnitById } from '../data/courses';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { haptics } from '../utils/haptics';
import ScreenHeader from '../components/ui/ScreenHeader';
import MotifTile from '../components/ui/MotifTile';
import PressableScale from '../components/ui/PressableScale';
import EmptyState from '../components/ui/EmptyState';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RP = RouteProp<RootStackParamList, 'Unit'>;

export default function UnitScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RP>();
  const unit = getUnitById(route.params.unitId);
  const insets = useSafeAreaInsets();
  const { isLessonCompleted, getLessonScore } = useProgressStore();
  const { colors: c, scheme } = useTheme();
  const { t, lang } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);

  if (!unit) return (
    <View style={s.container}>
      <EmptyState
        icon="map-outline"
        titleKu="Beş nehat dîtin"
        title={t.unit.notFoundTitle}
        message={t.unit.notFoundMessage}
        actionLabel={t.common.goBack}
        onAction={() => navigation.goBack()}
      />
    </View>
  );

  return (
    <View style={s.container}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={c.cream[50]} />
      <ScreenHeader
        titleEn={unitTitle(unit, lang)}
        titleKu={unit.titleKu}
        onBack={() => navigation.goBack()}
        topInset={insets.top}
      />
      <Text style={s.desc}>{unitDescription(unit, lang)}</Text>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {unit.lessons.map((lesson, i) => {
          const done = isLessonCompleted(lesson.id);
          const score = getLessonScore(lesson.id);
          const prevDone = i === 0 || isLessonCompleted(unit.lessons[i - 1].id);
          const open = i === 0 || prevDone;
          const isGrammar = lesson.type === 'grammar';

          return (
            <PressableScale key={lesson.id} style={[s.card, !open && s.cardLocked]} disabled={!open} onPress={() => { haptics.selection(); navigation.navigate('Lesson', { lessonId: lesson.id, unitId: unit.id }); }}>
              <View style={s.cardLeft}>
                {done ? (
                  <MotifTile icon="checkmark" color={c.kurdish[500]} size={40} />
                ) : open ? (
                  <MotifTile label={String(i + 1)} color={c.fire[500]} size={40} />
                ) : (
                  <View style={s.numLockedBox}>
                    <Ionicons name="lock-closed" size={14} color={c.gray[400]} />
                  </View>
                )}
                <View style={s.cardInfo}>
                  <Text style={[s.cardTitle, !open && s.muted]}>{lessonTitle(lesson, lang)}</Text>
                  <View style={s.meta}>
                    <Text style={[s.tag, isGrammar ? s.tagGrammar : s.tagVocab]}>{isGrammar ? t.unit.tagGrammar : t.unit.tagVocab}</Text>
                    <Text style={s.xp}>+{lesson.xpReward} XP</Text>
                  </View>
                </View>
              </View>
              {done && <Text style={s.score}>{score}%</Text>}
            </PressableScale>
          );
        })}
        <View style={{ height: 24 + insets.bottom }} />
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  desc: { fontSize: FONT_SIZE.sm, color: c.gray[400], textAlign: 'center', paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: 8, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  cardLocked: { backgroundColor: c.gray[100], opacity: 0.5, elevation: 0, shadowOpacity: 0 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: SPACING.md },
  numLockedBox: { width: 40, height: 40, borderRadius: 13, backgroundColor: c.gray[200], justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.midnight[800], marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  tag: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4 },
  tagVocab: { backgroundColor: c.fireSoft, color: c.fire[600] },
  tagGrammar: { backgroundColor: c.kurdishSoft, color: c.successText },
  xp: { fontSize: 10, color: c.gray[400] },
  score: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.kurdish[600] },
  muted: { color: c.gray[400] },
});
