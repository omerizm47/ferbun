import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT_SIZE, XP_PER_LEVEL, SHADOWS, ThemeColors } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { courseTitle, unitTitle } from '../i18n/content';
import { useProgressStore, selectDueVocabIds, selectDailyXp } from '../stores/progressStore';
import { useSettingsStore } from '../stores/settingsStore';
import { courses } from '../data/courses';
import { RootStackParamList } from '../navigation/AppNavigator';
import { KurdishSun, MountainSilhouette, NewrozFlame, KilimBorder, KilimDiamond } from '../components/ui/KurdishDecorations';
import MotifTile from '../components/ui/MotifTile';
import AnimatedProgressBar from '../components/ui/AnimatedProgressBar';
import { toIconName } from '../utils/icons';
import PressableScale from '../components/ui/PressableScale';
import { haptics } from '../utils/haptics';
import CoachMark, { CoachStep } from '../components/ui/CoachMark';
import { useCoachMarks } from '../hooks/useCoachMarks';
import { CM_HOME_KEY } from '../stores/onboardingStore';

const { width: SCREEN_W } = Dimensions.get('window');
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const HOME_COACH_CONFIG: { icon: CoachStep['icon']; align: CoachStep['align'] }[] = [
  { icon: 'flame', align: 'top' },
  { icon: 'school', align: 'center' },
  { icon: 'apps', align: 'bottom' },
];

// Course accent palette — Newroz ember, Kurdish green, Kurdistan-flag red.
const COURSE_PALETTE = [
  { accent: COLORS.fire[600], light: COLORS.fire[50] },
  { accent: COLORS.kurdish[600], light: COLORS.kurdish[50] },
  { accent: '#C92A39', light: '#FCE9EB' },
];

type GreetKey = 'morning' | 'afternoon' | 'evening' | 'night';
// Time-of-day Kurmanji greeting + a key for the localized gloss line.
function getGreeting(): { ku: string; key: GreetKey } {
  const h = new Date().getHours();
  if (h < 12) return { ku: 'Beyanî baş', key: 'morning' };
  if (h < 17) return { ku: 'Roj baş', key: 'afternoon' };
  if (h < 21) return { ku: 'Êvar baş', key: 'evening' };
  return { ku: 'Şev baş', key: 'night' };
}

// First unlocked, not-yet-complete unit — surfaced as the "Continue" card.
function findNextUnit(isLessonCompleted: (id: string) => boolean) {
  for (let ci = 0; ci < courses.length; ci++) {
    const course = courses[ci];
    const prevCourse = courses[ci - 1];
    const prevCourseDone = !prevCourse || prevCourse.units.every((u) => u.lessons.every((l) => isLessonCompleted(l.id)));
    for (let ui = 0; ui < course.units.length; ui++) {
      const unit = course.units[ui];
      const prevUnit = ui > 0 ? course.units[ui - 1] : null;
      const prevUnitDone = !prevUnit || prevUnit.lessons.every((l) => isLessonCompleted(l.id));
      const isUnlocked = (ui === 0 && (ci === 0 || prevCourseDone)) || prevUnitDone;
      const done = unit.lessons.filter((l) => isLessonCompleted(l.id)).length;
      const total = unit.lessons.length;
      if (isUnlocked && done < total) {
        return { unit, course, accent: COURSE_PALETTE[ci % COURSE_PALETTE.length].accent, done, total };
      }
    }
  }
  return null;
}

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { colors: c } = useTheme();
  const { t, lang } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);
  const { totalXp, currentLevel, streakCount, displayName, loadFromStorage, checkStreakValidity, isLessonCompleted, vocabMastery, dailyXp, dailyXpDate } = useProgressStore();
  const dailyGoalXp = useSettingsStore((st) => st.dailyGoalXp);

  useEffect(() => { loadFromStorage().then(() => checkStreakValidity()); }, [loadFromStorage, checkStreakValidity]);

  const dueCount = useMemo(() => selectDueVocabIds(vocabMastery).length, [vocabMastery]);
  const todayXp = selectDailyXp({ dailyXp, dailyXpDate });
  const goalMet = todayXp >= dailyGoalXp;
  const goalProgress = dailyGoalXp > 0 ? todayXp / dailyGoalXp : 0;

  const xpInLevel = totalXp % XP_PER_LEVEL;
  const xpProgress = xpInLevel / XP_PER_LEVEL;
  const greeting = getGreeting();
  const greetGloss = t.home.greeting[greeting.key];
  const firstName = displayName.trim().split(' ')[0];
  const next = findNextUnit(isLessonCompleted);

  const coachSteps = HOME_COACH_CONFIG.map((cfg, i) => ({ ...cfg, ...t.home.coach[i] }));
  const coach = useCoachMarks(CM_HOME_KEY, HOME_COACH_CONFIG.length);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Greeting header */}
      <LinearGradient colors={[c.fire[600], c.fire[800], '#5C2800']} style={[s.header, { paddingTop: insets.top + SPACING.md }]} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }}>
        <View style={s.sunWatermark} pointerEvents="none">
          <KurdishSun size={132} color="rgba(255,255,255,0.13)" animate={true} />
        </View>
        <View style={s.mountainDecor} pointerEvents="none">
          <MountainSilhouette width={SCREEN_W} height={48} color="rgba(0,0,0,0.10)" />
        </View>

        <View style={s.headerRow}>
          <View style={s.greetBlock}>
            <Text style={s.brandOverline}>FÊRBÛN</Text>
            <Text style={s.greetKu}>{greeting.ku}</Text>
            <Text style={s.greetEn}>{firstName ? `${greetGloss}, ${firstName}` : greetGloss}</Text>
          </View>
        </View>

        <View style={s.statsRow}>
          <View style={s.xpCard}>
            <View style={s.xpTop}>
              <Text style={s.xpLevel}>{t.home.level} {currentLevel}</Text>
              <Text style={s.xpCount}>{xpInLevel} / {XP_PER_LEVEL} XP</Text>
            </View>
            <View style={s.xpBarBg}>
              <LinearGradient colors={[c.fire[200], '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[s.xpBarFill, { width: `${Math.max(3, xpProgress * 100)}%` }]} />
            </View>
          </View>
          <View style={s.streakChip}>
            <NewrozFlame size={20} intensity={streakCount >= 7 ? 3 : streakCount >= 3 ? 2 : 1} />
            <Text style={s.streakNum}>{streakCount}</Text>
            <Text style={s.streakWord}>roj</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={s.kilimContainer}>
        <KilimBorder width={SCREEN_W} color={c.fire[200]} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Daily goal */}
        <View style={s.goalCard}>
          <View style={s.goalTopRow}>
            <View style={s.goalLeft}>
              <View style={[s.goalIconChip, { backgroundColor: goalMet ? c.kurdishSoft : c.fireSoft }]}>
                <Ionicons name={goalMet ? 'checkmark-circle' : 'flag'} size={16} color={goalMet ? c.kurdish[600] : c.fire[600]} />
              </View>
              <Text style={s.goalTitle}>{t.reminders.dailyGoal}</Text>
            </View>
            <Text style={s.goalCount}>{todayXp} / {dailyGoalXp} XP</Text>
          </View>
          <AnimatedProgressBar progress={goalProgress} height={8} minFill={0.02} trackColor={c.gray[100]} fillColor={goalMet ? c.kurdish[500] : c.fire[500]} />
          <Text style={s.goalHint}>{goalMet ? t.reminders.goalMet : t.reminders.goalRemaining(Math.max(0, dailyGoalXp - todayXp))}</Text>
        </View>

        {/* Continue / all-done card */}
        {next ? (
          <PressableScale style={s.heroCard} onPress={() => { haptics.selection(); navigation.navigate('Unit', { unitId: next.unit.id, courseId: next.course.id }); }}>
            <View style={[s.heroStripe, { backgroundColor: next.accent }]} />
            <View style={s.heroBody}>
              <View style={s.heroTopRow}>
                <MotifTile icon={toIconName(next.unit.icon)} color={next.accent} size={52} />
                <View style={s.heroInfo}>
                  <Text style={[s.heroKicker, { color: next.accent }]}>BIDOMÎNE · {t.home.continueKicker}</Text>
                  <Text style={s.heroTitle} numberOfLines={1}>{next.unit.titleKu}</Text>
                  <Text style={s.heroSub} numberOfLines={1}>{unitTitle(next.unit, lang)}</Text>
                </View>
                <View style={[s.heroPlay, { backgroundColor: next.accent }]}>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </View>
              </View>
              <View style={s.heroProgressRow}>
                <View style={s.heroBarBg}>
                  <View style={[s.heroBarFill, { width: `${Math.max(4, (next.done / next.total) * 100)}%`, backgroundColor: next.accent }]} />
                </View>
                <Text style={s.heroFraction}>{next.done}/{next.total}</Text>
              </View>
            </View>
          </PressableScale>
        ) : (
          <View style={s.doneCard}>
            <MotifTile icon="trophy" color={c.fire[500]} size={52} />
            <View style={s.heroInfo}>
              <Text style={[s.heroKicker, { color: c.fire[600] }]}>PÎROZ BE · {t.home.allDoneKicker}</Text>
              <Text style={s.heroTitle}>Te hemû qedand</Text>
              <Text style={s.heroSub}>{t.home.allDoneSub}</Text>
            </View>
          </View>
        )}

        {/* Review — spaced-repetition deck of words that are due */}
        {dueCount > 0 && (
          <PressableScale
            style={s.reviewCard}
            onPress={() => { haptics.selection(); navigation.navigate('Flashcard', { mode: 'review' }); }}
            accessibilityRole="button"
            accessibilityLabel={t.review.a11y}
          >
            <MotifTile icon="albums" color={c.kurdish[600]} size={48} />
            <View style={s.heroInfo}>
              <Text style={[s.heroKicker, { color: c.kurdish[600] }]}>DUBARE · {t.review.kicker}</Text>
              <Text style={s.heroTitle} numberOfLines={1}>{t.review.title}</Text>
              <Text style={s.heroSub} numberOfLines={1}>{t.review.due(dueCount)}</Text>
            </View>
            <View style={[s.heroPlay, { backgroundColor: c.kurdish[600] }]}>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </View>
          </PressableScale>
        )}

        {/* Course path */}
        {courses.map((course, ci) => {
          const palette = COURSE_PALETTE[ci % COURSE_PALETTE.length];
          const prevCourse = courses[ci - 1];
          const prevCourseDone = !prevCourse || prevCourse.units.every((u) => u.lessons.every((l) => isLessonCompleted(l.id)));

          return (
            <View key={course.id} style={s.courseBlock}>
              <View style={s.courseHeader}>
                <KilimDiamond size={20} color={palette.accent} />
                <View style={s.courseTitleArea}>
                  <Text style={[s.courseTitle, { color: palette.accent }]}>{courseTitle(course, lang)}</Text>
                  <Text style={s.courseKu}>{course.titleKu}</Text>
                </View>
              </View>

              {course.units.map((unit, ui) => {
                const prevUnit = ui > 0 ? course.units[ui - 1] : null;
                const prevUnitDone = !prevUnit || prevUnit.lessons.every((l) => isLessonCompleted(l.id));
                const isUnlocked = (ui === 0 && (ci === 0 || prevCourseDone)) || prevUnitDone;
                const done = unit.lessons.filter((l) => isLessonCompleted(l.id)).length;
                const total = unit.lessons.length;
                const complete = done === total;
                const inProgress = done > 0 && !complete;

                return (
                  <PressableScale
                    key={unit.id}
                    style={[s.unitCard, !isUnlocked && s.unitLocked]}
                    disabled={!isUnlocked}
                    onPress={() => { haptics.selection(); navigation.navigate('Unit', { unitId: unit.id, courseId: course.id }); }}
                  >
                    {isUnlocked ? (
                      <MotifTile icon={toIconName(unit.icon)} color={complete ? c.kurdish[500] : palette.accent} size={44} />
                    ) : (
                      <View style={s.lockTile}>
                        <Ionicons name="lock-closed" size={16} color={c.gray[400]} />
                      </View>
                    )}
                    <View style={s.unitInfo}>
                      <Text style={[s.unitKu, !isUnlocked && s.muted]} numberOfLines={1}>{unit.titleKu}</Text>
                      <Text style={[s.unitEn, !isUnlocked && s.muted]} numberOfLines={1}>{unitTitle(unit, lang)}</Text>
                      {isUnlocked && inProgress && (
                        <View style={s.unitBarBg}>
                          <View style={[s.unitBarFill, { width: `${(done / total) * 100}%`, backgroundColor: palette.accent }]} />
                        </View>
                      )}
                    </View>
                    {complete ? (
                      <View style={s.completeBadge}>
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      </View>
                    ) : isUnlocked ? (
                      <Text style={[s.unitFraction, { color: palette.accent }]}>{done}/{total}</Text>
                    ) : null}
                  </PressableScale>
                );
              })}
            </View>
          );
        })}
        <View style={{ height: 32 }} />
      </ScrollView>

      <CoachMark
        visible={coach.visible}
        steps={coachSteps}
        step={coach.step}
        onNext={coach.next}
        onSkip={coach.skip}
      />
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },

  // Header
  header: { paddingBottom: 22, paddingHorizontal: SPACING.lg, overflow: 'hidden' },
  sunWatermark: { position: 'absolute', top: -22, right: -18 },
  mountainDecor: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.lg },
  greetBlock: { flex: 1, paddingRight: 72 },
  brandOverline: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.55)', letterSpacing: 3, marginBottom: 6 },
  greetKu: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  greetEn: { fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 2, fontWeight: '500' },

  statsRow: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'stretch' },
  streakChip: { width: 78, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderRadius: RADIUS.lg, paddingVertical: SPACING.sm, gap: 1 },
  streakNum: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  streakWord: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 },

  xpCard: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.lg, padding: SPACING.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  xpTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  xpLevel: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  xpCount: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  xpBarBg: { height: 7, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: RADIUS.full, overflow: 'hidden' },
  xpBarFill: { height: '100%', borderRadius: RADIUS.full },

  // Kilim divider
  kilimContainer: { paddingVertical: 5, backgroundColor: c.cream[50] },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },

  // Continue hero
  heroCard: { flexDirection: 'row', backgroundColor: c.white, borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: SPACING.lg, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.md },
  heroStripe: { width: 5 },
  heroBody: { flex: 1, padding: SPACING.md },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  heroInfo: { flex: 1 },
  heroKicker: { fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 3 },
  heroTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.3 },
  heroSub: { fontSize: FONT_SIZE.xs, color: c.gray[500], marginTop: 1 },
  heroPlay: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', ...SHADOWS.sm },
  heroProgressRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.md },
  heroBarBg: { flex: 1, height: 6, backgroundColor: c.gray[100], borderRadius: RADIUS.full, overflow: 'hidden' },
  heroBarFill: { height: '100%', borderRadius: RADIUS.full },
  heroFraction: { fontSize: 11, fontWeight: '700', color: c.gray[500] },

  doneCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.md },

  // Review CTA (spaced-repetition deck)
  reviewCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.md },

  // Daily goal card
  goalCard: { backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.lg, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  goalTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  goalLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalIconChip: { width: 30, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.2 },
  goalCount: { fontSize: FONT_SIZE.xs, fontWeight: '700', color: c.gray[500] },
  goalHint: { fontSize: 11, color: c.gray[400], marginTop: 7 },

  // Course
  courseBlock: { marginBottom: SPACING.lg },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm, paddingLeft: 4, gap: SPACING.sm },
  courseTitleArea: { flex: 1 },
  courseTitle: { fontSize: FONT_SIZE.md, fontWeight: '800', letterSpacing: -0.3 },
  courseKu: { fontSize: 12, color: c.gray[400], marginTop: 1 },

  // Unit
  unitCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, backgroundColor: c.white, borderRadius: RADIUS.lg, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 8, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  unitLocked: { backgroundColor: c.lockedBg, opacity: 0.55, elevation: 0, shadowOpacity: 0 },
  lockTile: { width: 44, height: 44, borderRadius: 14, backgroundColor: c.gray[200], justifyContent: 'center', alignItems: 'center' },
  unitInfo: { flex: 1 },
  unitKu: { fontSize: FONT_SIZE.md, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.2 },
  unitEn: { fontSize: 12, color: c.gray[400], marginTop: 1 },
  unitBarBg: { height: 4, backgroundColor: c.gray[100], borderRadius: RADIUS.full, overflow: 'hidden', marginTop: 7 },
  unitBarFill: { height: '100%', borderRadius: RADIUS.full },
  unitFraction: { fontSize: FONT_SIZE.sm, fontWeight: '800' },
  completeBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: c.kurdish[500], justifyContent: 'center', alignItems: 'center' },
  muted: { color: c.gray[300] },
});
