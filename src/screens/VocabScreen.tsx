import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../theme';
import { getVocabByTheme, VOCAB_THEMES } from '../data/vocabulary';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const THEME_ICONS: Record<string, string> = {
  greetings: 'chatbubble-outline', family: 'people-outline', body: 'body-outline',
  home: 'home-outline', food: 'restaurant-outline', nature: 'leaf-outline',
  animals: 'paw-outline', description: 'color-palette-outline', numbers: 'calculator-outline',
  time: 'time-outline', verbs: 'flash-outline', emotions: 'heart-outline',
  places: 'map-outline', education: 'school-outline', culture: 'flag-outline',
  function: 'text-outline',
};

export default function VocabScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream[50]} />
      <View style={s.header}>
        <Text style={s.title}>Vocabulary</Text>
        <Text style={s.subtitle}>Peyvên Kurdî</Text>
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        {VOCAB_THEMES.map((theme) => {
          const words = getVocabByTheme(theme.id);
          const iconName = THEME_ICONS[theme.id] || 'book-outline';
          return (
            <TouchableOpacity key={theme.id} style={s.card} onPress={() => navigation.navigate('Flashcard', { theme: theme.id })} activeOpacity={0.7}>
              <View style={[s.iconCircle, { backgroundColor: theme.color + '15' }]}>
                <Ionicons name={iconName as any} size={20} color={theme.color} />
              </View>
              <View style={s.info}>
                <Text style={s.label}>{theme.label}</Text>
                <Text style={s.count}>{words.length} words</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.gray[300]} />
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
  header: { paddingHorizontal: SPACING.lg, paddingTop: 56, paddingBottom: SPACING.md },
  title: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.midnight[800], letterSpacing: -0.5 },
  subtitle: { fontSize: FONT_SIZE.xs, color: COLORS.gray[500], marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: RADIUS.md, marginBottom: 8, borderWidth: 1, borderColor: COLORS.gray[100] },
  iconCircle: { width: 42, height: 42, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, marginLeft: SPACING.md },
  label: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.midnight[800] },
  count: { fontSize: FONT_SIZE.xs, color: COLORS.gray[400], marginTop: 1 },
});
