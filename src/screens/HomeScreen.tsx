import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADIUS, FONT_SIZE, XP_PER_LEVEL } from '../theme';
import { useProgressStore } from '../stores/progressStore';
import { courses } from '../data/courses';
import { RootStackParamList } from '../navigation/AppNavigator';
import { KurdishSun, MountainSilhouette, NewrozFlame, KilimBorder } from '../components/ui/KurdishDecorations';

const { width: SCREEN_W } = Dimensions.get('window');
type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { totalXp, currentLevel, streakCount, getStreakLevel, loadFromStorage, updateStreak, isLessonCompleted } = useProgressStore();

  useEffect(() => { loadFromStorage().then(() => updateStreak()); }, []);

  const streakLevel = getStreakLevel();
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const xpProgress = xpInLevel / XP_PER_LEVEL;

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Gradient Header with Kurdish motifs */}
      <LinearGradient colors={[COLORS.fire[600], COLORS.fire[800], '#5C2800']} style={s.headerGradient} start={{ x: 0, y: 0 }} end={{ x: 0.3, y: 1 }}>
        {/* Mountain decoration at bottom of header */}
        <View style={s.mountainDecor}>
          <MountainSilhouette width={SCREEN_W} height={50} color="rgba(255,255,255,0.06)" />
        </View>

        <View style={s.headerRow}>
          <View style={s.headerLeft}>
            <View style={s.sunContainer}>
              <KurdishSun size={36} color="rgba(255,255,255,0.85)" />
            </View>
            <View>
              <Text style={s.appTitle}>Fêrbûn</Text>
              <Text style={s.appSub}>KURMANJI KURDISH</Text>
            </View>
          </View>
          <View style={s.headerBadges}>
            <View style={s.badge}>
              <NewrozFlame size={18} intensity={streakCount >= 7 ? 3 : streakCount >= 3 ? 2 : 1} />
              <Text style={s.badgeText}>{streakCount}</Text>
            </View>
          </View>
        </View>

        {/* XP Progress */}
        <View style={s.xpSection}>
          <View style={s.xpLabelRow}>
            <Text style={s.xpLabel}>Level {currentLevel}</Text>
            <Text style={s.xpCount}>{xpInLevel}/{XP_PER_LEVEL} XP</Text>
          </View>
          <View style={s.xpBarBg}>
            <LinearGradient colors={[COLORS.fire[300], COLORS.fire[100]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[s.xpBarFill, { width: `${Math.max(3, xpProgress * 100)}%` }]} />
          </View>
        </View>
      </LinearGradient>

      {/* Kilim border below header */}
      <View style={s.kilimContainer}>
        <KilimBorder width={SCREEN_W} color={COLORS.fire[200]} />
      </View>

      {/* Course List */}
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {courses.map((course, ci) => {
          const prevCourse = courses[ci - 1];
          const prevCourseDone = !prevCourse || prevCourse.units.every(u => u.lessons.every(l => isLessonCompleted(l.id)));
          const courseColors = [
            { bg: '#FFF7ED', accent: COLORS.fire[600], light: COLORS.fire[50] },
            { bg: '#F0FDF4', accent: COLORS.kurdish[600], light: COLORS.kurdish[50] },
            { bg: '#FAF5FF', accent: '#7C3AED', light: '#F3E8FF' },
          ][ci];

          return (
            <View key={course.id} style={s.courseBlock}>
              {/* Course title with accent line */}
              <View style={s.courseHeader}>
                <View style={[s.courseLine, { backgroundColor: courseColors.accent }]} />
                <View>
                  <Text style={[s.courseTitle, { color: courseColors.accent }]}>{course.title}</Text>
                  <Text style={s.courseKu}>{course.titleKu} — {course.description}</Text>
                </View>
              </View>

              {/* Units */}
              {course.units.map((unit, ui) => {
                const prevUnit = ui > 0 ? course.units[ui - 1] : null;
                const prevUnitDone = !prevUnit || prevUnit.lessons.every(l => isLessonCompleted(l.id));
                const isUnlocked = (ui === 0 && (ci === 0 || prevCourseDone)) || prevUnitDone;
                const done = unit.lessons.filter(l => isLessonCompleted(l.id)).length;
                const total = unit.lessons.length;
                const complete = done === total;
                const progress = total > 0 ? done / total : 0;

                return (
                  <TouchableOpacity
                    key={unit.id}
                    style={[s.unitCard, !isUnlocked && s.unitLocked]}
                    onPress={() => isUnlocked && navigation.navigate('Unit', { unitId: unit.id, courseId: course.id })}
                    activeOpacity={isUnlocked ? 0.6 : 1}
                  >
                    {/* Left color accent */}
                    <View style={[s.unitAccent, { backgroundColor: complete ? COLORS.kurdish[500] : isUnlocked ? courseColors.accent : COLORS.gray[300] }]} />

                    <View style={s.unitBody}>
                      <View style={s.unitTop}>
                        <View style={s.unitTitleArea}>
                          <Text style={[s.unitTitle, !isUnlocked && s.muted]} numberOfLines={1}>{unit.title}</Text>
                          <Text style={[s.unitKu, !isUnlocked && s.muted]}>{unit.titleKu}</Text>
                        </View>
                        {!isUnlocked ? (
                          <Ionicons name="lock-closed" size={16} color={COLORS.gray[300]} />
                        ) : complete ? (
                          <View style={s.completeBadge}>
                            <Ionicons name="checkmark" size={14} color={COLORS.white} />
                          </View>
                        ) : (
                          <Text style={s.unitFraction}>{done}/{total}</Text>
                        )}
                      </View>

                      {/* Progress bar */}
                      {isUnlocked && (
                        <View style={s.unitBarBg}>
                          <View style={[s.unitBarFill, { width: `${Math.max(2, progress * 100)}%`, backgroundColor: complete ? COLORS.kurdish[500] : courseColors.accent }]} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },

  // Header
  headerGradient: { paddingTop: 48, paddingBottom: 20, paddingHorizontal: SPACING.lg, overflow: 'hidden' },
  mountainDecor: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  sunContainer: { marginRight: 4 },
  appTitle: { fontSize: 26, fontWeight: '800', color: COLORS.white, letterSpacing: -0.5 },
  appSub: { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1, letterSpacing: 2.5, fontWeight: '600' },
  headerBadges: { flexDirection: 'row', gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: RADIUS.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  badgeText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.white },

  // XP
  xpSection: {},
  xpLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  xpLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 },
  xpCount: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },
  xpBarBg: { height: 5, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full, overflow: 'hidden' },
  xpBarFill: { height: '100%', borderRadius: RADIUS.full },

  // Kilim
  kilimContainer: { paddingVertical: 4, backgroundColor: COLORS.cream[50] },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },

  // Course
  courseBlock: { marginBottom: SPACING.xl },
  courseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.sm, paddingLeft: 4, gap: SPACING.sm },
  courseLine: { width: 3, height: 32, borderRadius: 2, marginTop: 2 },
  courseTitle: { fontSize: FONT_SIZE.md, fontWeight: '800', letterSpacing: -0.3 },
  courseKu: { fontSize: 11, color: COLORS.gray[400], marginTop: 1, lineHeight: 16 },

  // Unit Card
  unitCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.md, marginBottom: 6, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.gray[100] },
  unitLocked: { backgroundColor: '#FAFAFA', opacity: 0.5 },
  unitAccent: { width: 4 },
  unitBody: { flex: 1, padding: 14, paddingLeft: 14 },
  unitTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  unitTitleArea: { flex: 1, marginRight: SPACING.sm },
  unitTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.midnight[800], lineHeight: 18 },
  unitKu: { fontSize: 11, color: COLORS.gray[400], marginTop: 1 },
  unitFraction: { fontSize: FONT_SIZE.xs, fontWeight: '700', color: COLORS.gray[400] },
  completeBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.kurdish[500], justifyContent: 'center', alignItems: 'center' },
  muted: { color: COLORS.gray[300] },

  // Progress bar
  unitBarBg: { height: 3, backgroundColor: COLORS.gray[100], borderRadius: 2, marginTop: 10, overflow: 'hidden' },
  unitBarFill: { height: '100%', borderRadius: 2 },
});
