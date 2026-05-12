import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING, RADIUS, FONT_SIZE, XP_PER_LEVEL } from '../theme';
import { useProgressStore } from '../stores/progressStore';
import { getTotalLessons } from '../data/courses';

export default function ProfileScreen() {
  const { totalXp, currentLevel, streakCount, getStreakLevel, lessonProgress } = useProgressStore();
  const streakLevel = getStreakLevel();
  const completed = Object.values(lessonProgress).filter((p) => p.completed).length;
  const total = getTotalLessons();
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const progressPct = Math.round((completed / total) * 100);

  const handleReset = async () => {
    try {
      await AsyncStorage.clear();
      useProgressStore.setState({
        totalXp: 0, currentLevel: 1, streakCount: 0, lastActiveDate: null,
        lessonProgress: {}, vocabMastery: {},
      });
    } catch {}
  };

  const stats = [
    { label: 'Streak', value: `${streakCount}`, sub: streakLevel.label, icon: 'flame' as const, color: COLORS.fire[500] },
    { label: 'XP', value: `${totalXp}`, sub: `Level ${currentLevel}`, icon: 'star' as const, color: '#F59E0B' },
    { label: 'Done', value: `${progressPct}%`, sub: `${completed}/${total}`, icon: 'checkmark-circle' as const, color: COLORS.kurdish[500] },
  ];

  const streakLevels = [
    { name: 'Candle', req: '0–2 days', icon: 'flame-outline' as const, min: 0 },
    { name: 'Spark', req: '3–6 days', icon: 'flash-outline' as const, min: 3 },
    { name: 'Campfire', req: '7–13 days', icon: 'flame' as const, min: 7 },
    { name: 'Bonfire', req: '14–29 days', icon: 'bonfire-outline' as const, min: 14 },
    { name: 'Newroz Fire', req: '30+ days', icon: 'sunny' as const, min: 30 },
  ];

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gradient Header */}
        <LinearGradient colors={['#7C3AED', '#5B21B6']} style={s.headerGradient}>
          <View style={s.avatarRing}>
            <Ionicons name="person" size={32} color={COLORS.white} />
          </View>
          <Text style={s.name}>Xwendekar</Text>
          <Text style={s.subtitle}>Kurdish Learner</Text>

          {/* Stats Row */}
          <View style={s.statsRow}>
            {stats.map((st) => (
              <View key={st.label} style={s.statCard}>
                <Ionicons name={st.icon} size={16} color={st.color} />
                <Text style={s.statVal}>{st.value}</Text>
                <Text style={s.statSub}>{st.sub}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Progress Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Level Progress</Text>
          <View style={s.progressCard}>
            <View style={s.progressHeader}>
              <Text style={s.progressLevel}>Level {currentLevel}</Text>
              <Text style={s.progressXp}>{xpInLevel} / {XP_PER_LEVEL} XP</Text>
            </View>
            <View style={s.barBg}>
              <View style={[s.barFill, { width: `${Math.max(2, (xpInLevel / XP_PER_LEVEL) * 100)}%` }]} />
            </View>
            <Text style={s.progressHint}>{XP_PER_LEVEL - xpInLevel} XP to Level {currentLevel + 1}</Text>
          </View>
        </View>

        {/* Streak Levels */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Streak Levels</Text>
          {streakLevels.map((level) => {
            const isActive = streakLevel.label === level.name;
            const isReached = streakCount >= level.min;
            return (
              <View key={level.name} style={[s.streakRow, isActive && s.streakActive]}>
                <View style={[s.streakIconBox, isActive && s.streakIconActive, !isReached && s.streakIconDim]}>
                  <Ionicons name={level.icon} size={16} color={isActive ? COLORS.fire[500] : isReached ? COLORS.gray[600] : COLORS.gray[300]} />
                </View>
                <View style={s.streakInfo}>
                  <Text style={[s.streakName, isActive && s.streakNameActive, !isReached && s.streakNameDim]}>{level.name}</Text>
                  <Text style={s.streakReq}>{level.req}</Text>
                </View>
                {isActive && <Ionicons name="checkmark" size={16} color={COLORS.fire[500]} />}
              </View>
            );
          })}
        </View>

        {/* Reset */}
        <View style={s.section}>
          <TouchableOpacity style={s.resetBtn} onPress={handleReset}>
            <Ionicons name="refresh" size={16} color={COLORS.error} />
            <Text style={s.resetText}>Reset All Progress</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },
  scrollContent: { paddingBottom: SPACING.xxl },

  // Header
  headerGradient: { paddingTop: 56, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  avatarRing: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  name: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.white },
  subtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: SPACING.lg, width: '100%' },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.md, padding: SPACING.sm, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statVal: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: COLORS.white, marginTop: 2 },
  statSub: { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Sections
  section: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: COLORS.gray[500], textTransform: 'uppercase', letterSpacing: 1, marginBottom: SPACING.sm },

  // Progress Card
  progressCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.gray[100] },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLevel: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.midnight[800] },
  progressXp: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400] },
  barBg: { height: 8, backgroundColor: COLORS.gray[100], borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: COLORS.fire[500], borderRadius: 4 },
  progressHint: { fontSize: 11, color: COLORS.gray[400], marginTop: 6 },

  // Streak rows
  streakRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: SPACING.md, borderRadius: RADIUS.md, marginBottom: 4, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray[100] },
  streakActive: { backgroundColor: COLORS.fire[50], borderColor: COLORS.fire[200] },
  streakIconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.gray[100], justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  streakIconActive: { backgroundColor: COLORS.fire[100] },
  streakIconDim: { backgroundColor: COLORS.gray[50] },
  streakInfo: { flex: 1 },
  streakName: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.gray[600] },
  streakNameActive: { color: COLORS.fire[700] },
  streakNameDim: { color: COLORS.gray[300] },
  streakReq: { fontSize: 10, color: COLORS.gray[400] },

  // Reset
  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: RADIUS.md, borderWidth: 1, borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  resetText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.error },
});
