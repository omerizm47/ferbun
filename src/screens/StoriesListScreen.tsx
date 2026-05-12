import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { stories } from '../data/stories';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const levelColors = {
  beginner: { bg: COLORS.kurdish[50], text: COLORS.kurdish[600], border: COLORS.kurdish[200] },
  intermediate: { bg: COLORS.fire[50], text: COLORS.fire[600], border: COLORS.fire[200] },
  advanced: { bg: '#EDE9FE', text: '#7C3AED', border: '#DDD6FE' },
};

export default function StoriesListScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream[50]} />
      <View style={s.header}>
        <Text style={s.title}>Stories</Text>
        <Text style={s.subtitle}>ÇÎROKÊN KURDÎ</Text>
      </View>
      <Text style={s.hint}>Read Kurdish stories. Tap any word for its translation.</Text>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {stories.map((story) => {
          const colors = levelColors[story.level];
          return (
            <TouchableOpacity
              key={story.id}
              style={s.card}
              onPress={() => navigation.navigate('Story', { storyId: story.id })}
              activeOpacity={0.7}
            >
              <View style={s.cardTop}>
                <View style={s.cardLeft}>
                  <View style={[s.iconBox, { backgroundColor: colors.bg }]}>  
                    <Ionicons name="document-text-outline" size={20} color={colors.text} />
                  </View>
                  <View style={s.cardInfo}>
                    <Text style={s.cardTitle}>{story.title}</Text>
                    <Text style={s.cardTitleEn}>{story.titleEn}</Text>
                  </View>
                </View>
                <View style={[s.levelBadge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                  <Text style={[s.levelText, { color: colors.text }]}>{story.level}</Text>
                </View>
              </View>
              <Text style={s.cardDesc}>{story.description}</Text>
              <View style={s.cardMeta}>
                <View style={s.metaItem}>
                  <Ionicons name="layers-outline" size={14} color={COLORS.gray[400]} />
                  <Text style={s.metaText}>{story.paragraphs.length} paragraphs</Text>
                </View>
                <View style={s.metaItem}>
                  <Ionicons name="help-circle-outline" size={14} color={COLORS.gray[400]} />
                  <Text style={s.metaText}>{story.comprehensionQuestions.length} questions</Text>
                </View>
              </View>
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
  header: { paddingHorizontal: SPACING.lg, paddingTop: 56, paddingBottom: 4 },
  title: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.midnight[800], letterSpacing: -0.5 },
  subtitle: { fontSize: 10, color: COLORS.gray[500], marginTop: 2, letterSpacing: 2, fontWeight: '600' },
  hint: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400], paddingHorizontal: SPACING.lg, marginTop: 4, marginBottom: SPACING.md },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: 10, borderWidth: 1, borderColor: COLORS.gray[100] },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { marginLeft: SPACING.sm, flex: 1 },
  cardTitle: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.midnight[800] },
  cardTitleEn: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400], marginTop: 1 },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.full, borderWidth: 1 },
  levelText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  cardDesc: { fontSize: FONT_SIZE.sm, color: COLORS.gray[500], lineHeight: 20, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', gap: SPACING.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: COLORS.gray[400] },
});
