import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { useProgressStore } from '../stores/progressStore';
import { getUnitById } from '../data/courses';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RP = RouteProp<RootStackParamList, 'Unit'>;

export default function UnitScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RP>();
  const unit = getUnitById(route.params.unitId);
  const { isLessonCompleted, getLessonScore } = useProgressStore();

  if (!unit) return <View style={s.container}><Text>Unit not found</Text></View>;

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream[50]} />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.back}>
          <Ionicons name="arrow-back" size={22} color={COLORS.midnight[800]} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>{unit.title}</Text>
          <Text style={s.headerSub}>{unit.titleKu}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      <Text style={s.desc}>{unit.description}</Text>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {unit.lessons.map((lesson, i) => {
          const done = isLessonCompleted(lesson.id);
          const score = getLessonScore(lesson.id);
          const prevDone = i === 0 || isLessonCompleted(unit.lessons[i - 1].id);
          const open = i === 0 || prevDone;
          const isGrammar = lesson.type === 'grammar';

          return (
            <TouchableOpacity key={lesson.id} style={[s.card, !open && s.cardLocked]} onPress={() => open && navigation.navigate('Lesson', { lessonId: lesson.id, unitId: unit.id })} activeOpacity={open ? 0.7 : 1}>
              <View style={s.cardLeft}>
                <View style={[s.num, done && s.numDone, !open && s.numLocked]}>
                  {done ? <Ionicons name="checkmark" size={16} color={COLORS.white} /> : open ? <Text style={s.numText}>{i + 1}</Text> : <Ionicons name="lock-closed" size={12} color={COLORS.gray[400]} />}
                </View>
                <View style={s.cardInfo}>
                  <Text style={[s.cardTitle, !open && s.muted]}>{lesson.title}</Text>
                  <View style={s.meta}>
                    <Text style={[s.tag, isGrammar ? s.tagGrammar : s.tagVocab]}>{isGrammar ? 'grammar' : 'vocabulary'}</Text>
                    <Text style={s.xp}>+{lesson.xpReward} XP</Text>
                  </View>
                </View>
              </View>
              {done && <Text style={s.score}>{score}%</Text>}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream[50] },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: 56, paddingBottom: SPACING.sm },
  back: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerCenter: { alignItems: 'center', flex: 1 },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.midnight[800] },
  headerSub: { fontSize: FONT_SIZE.xs, color: COLORS.gray[500] },
  desc: { fontSize: FONT_SIZE.sm, color: COLORS.gray[400], textAlign: 'center', paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: 8, borderWidth: 1, borderColor: COLORS.gray[100] },
  cardLocked: { backgroundColor: COLORS.gray[100], opacity: 0.5 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: SPACING.md },
  num: { width: 32, height: 32, borderRadius: RADIUS.sm, backgroundColor: COLORS.fire[50], justifyContent: 'center', alignItems: 'center' },
  numDone: { backgroundColor: COLORS.kurdish[500] },
  numLocked: { backgroundColor: COLORS.gray[200] },
  numText: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.fire[600] },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.midnight[800], marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  tag: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4 },
  tagVocab: { backgroundColor: COLORS.fire[50], color: COLORS.fire[600] },
  tagGrammar: { backgroundColor: COLORS.kurdish[50], color: COLORS.kurdish[700] },
  xp: { fontSize: 10, color: COLORS.gray[400] },
  score: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.kurdish[600] },
  muted: { color: COLORS.gray[400] },
});
