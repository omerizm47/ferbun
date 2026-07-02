import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Dimensions, Alert, Switch, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING, RADIUS, FONT_SIZE, XP_PER_LEVEL, SHADOWS, TYPOGRAPHY, ThemeColors, DAILY_GOAL_OPTIONS, REMINDER_TIME_OPTIONS } from '../theme';
import { useTheme, ThemeMode } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import { Lang } from '../i18n/types';
import { useProgressStore } from '../stores/progressStore';
import { getTotalLessons } from '../data/courses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedProgressBar from '../components/ui/AnimatedProgressBar';
import { MountainSilhouette, KurdishSun } from '../components/ui/KurdishDecorations';
import MotifTile from '../components/ui/MotifTile';
import { toIconName } from '../utils/icons';
import KurdishAvatar from '../components/ui/KurdishAvatar';
import UpperText from '../components/ui/UpperText';
import { haptics } from '../utils/haptics';
import { useOnboardingStore } from '../stores/onboardingStore';
import { useSettingsStore } from '../stores/settingsStore';
import { requestNotificationPermission, scheduleDailyReminder, cancelDailyReminder } from '../utils/notifications';

const { width: SCREEN_W } = Dimensions.get('window');

// Cross-promotion: our sister app "Nisibis" (free, ad-free travel & history
// guide). Per-platform store links. Leave a URL empty to hide the card on that
// platform — the card never renders a dead link.
// TODO(nisibis): paste the live store URLs below to switch the card on.
//   iOS  e.g. 'https://apps.apple.com/app/id1234567890'
//   Play e.g. 'https://play.google.com/store/apps/details?id=com.example.nisibis'
const NISIBIS_APP_STORE_URL = '';
const NISIBIS_PLAY_URL = '';
const NISIBIS_URL = Platform.select({
  ios: NISIBIS_APP_STORE_URL,
  android: NISIBIS_PLAY_URL,
  default: NISIBIS_PLAY_URL,
}) as string;
// Only show the cross-promo once a real URL exists for the active platform.
const NISIBIS_LINK_READY = NISIBIS_URL.trim().length > 0;

// Avatar emblems rooted in Kurdish culture & symbolism, drawn as original SVG
// (see KurdishAvatar): the sun (Roj) of the Kurdistan flag, the Newroz fire, the
// mountains, wheat of the plains, the tulip (gul/lale), the eight-point star,
// the heart (dil), and the open book of learning. Ids kept stable for storage.
const AVATAR_ICONS: { icon: string; label: string }[] = [
  { icon: 'sunny', label: 'Roj (Sun)' },
  { icon: 'flame', label: 'Agirê Newrozê' },
  { icon: 'triangle', label: 'Çiya (Mountains)' },
  { icon: 'leaf', label: 'Genim (Wheat)' },
  { icon: 'flower', label: 'Gul (Tulip)' },
  { icon: 'star', label: 'Stêrk (Star)' },
  { icon: 'heart', label: 'Dil (Heart)' },
  { icon: 'book', label: 'Pirtûk (Learning)' },
];

// Palette drawn from the Kurdistan flag (red, green, yellow/gold), the
// Newroz fire, mountain sky, and earthy kilim tones.
const AVATAR_COLORS: { color: string; label: string }[] = [
  { color: '#E85D00', label: 'Newroz Fire' },
  { color: '#D62B1F', label: 'Flag Red' },
  { color: '#1F8A4C', label: 'Flag Green' },
  { color: '#F5C518', label: 'Sun Gold' },
  { color: '#3B6EA5', label: 'Mountain Sky' },
  { color: '#7A3B5E', label: 'Twilight' },
  { color: '#9A3B00', label: 'Kilim Earth' },
  { color: '#0F766E', label: 'Cedar' },
];

// Theme mode options for the Appearance control. Kurmanji leads each label.
const APPEARANCE_OPTIONS: { mode: ThemeMode; icon: keyof typeof Ionicons.glyphMap; ku: string }[] = [
  { mode: 'system', icon: 'phone-portrait-outline', ku: 'Bixweber' },
  { mode: 'light', icon: 'sunny-outline', ku: 'Ron' },
  { mode: 'dark', icon: 'moon-outline', ku: 'Tarî' },
];

// Base/bridge-language options. The native name is shown to each audience.
const LANGUAGE_OPTIONS: { lang: Lang; code: string }[] = [
  { lang: 'en', code: 'EN' },
  { lang: 'tr', code: 'TR' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors: c, mode, setMode, scheme } = useTheme();
  const { t, lang, setLang } = useLang();
  const s = useMemo(() => makeStyles(c), [c]);
  const { displayName, setDisplayName, avatarIcon, avatarColor, setAvatar, totalXp, currentLevel, streakCount, getStreakLevel, lessonProgress, vocabMastery } = useProgressStore();
  const streakLevel = getStreakLevel();
  const completed = Object.values(lessonProgress).filter((p) => p.completed).length;
  const total = getTotalLessons();
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const progressPct = Math.round((completed / total) * 100);

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(displayName);
  const [iconChoice, setIconChoice] = useState(avatarIcon);
  const [colorChoice, setColorChoice] = useState(avatarColor);

  const replayIntro = useOnboardingStore((s) => s.replayIntro);

  const notificationsEnabled = useSettingsStore((st) => st.notificationsEnabled);
  const reminderHour = useSettingsStore((st) => st.reminderHour);
  const dailyGoalXp = useSettingsStore((st) => st.dailyGoalXp);
  const setNotificationsEnabled = useSettingsStore((st) => st.setNotificationsEnabled);
  const setReminderHour = useSettingsStore((st) => st.setReminderHour);
  const setDailyGoalXp = useSettingsStore((st) => st.setDailyGoalXp);

  // iOS will not re-prompt after a denial, so fall back to opening Settings.
  const onToggleReminders = async (value: boolean) => {
    haptics.selection();
    if (value) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(t.reminders.permTitle, t.reminders.permMessage, [
          { text: t.common.cancel, style: 'cancel' },
          { text: t.reminders.openSettings, onPress: () => Linking.openSettings() },
        ]);
        return;
      }
      setNotificationsEnabled(true);
      await scheduleDailyReminder(reminderHour, lang);
    } else {
      setNotificationsEnabled(false);
      await cancelDailyReminder();
    }
  };
  const onPickTime = async (hour: number) => {
    haptics.selection();
    setReminderHour(hour);
    if (notificationsEnabled) await scheduleDailyReminder(hour, lang);
  };
  const onPickGoal = (xp: number) => {
    haptics.selection();
    setDailyGoalXp(xp);
  };

  const openEditor = () => {
    setNameInput(displayName);
    setIconChoice(avatarIcon);
    setColorChoice(avatarColor);
    setEditing(true);
    haptics.selection();
  };
  const saveProfile = () => {
    setDisplayName(nameInput.trim());
    setAvatar(iconChoice, colorChoice);
    setEditing(false);
    haptics.success();
  };

  const openNisibis = () => {
    haptics.selection();
    Linking.openURL(NISIBIS_URL).catch(() => {});
  };

  const handleReset = () => {
    haptics.selection();
    Alert.alert(
      t.profile.resetTitle,
      t.profile.resetMessage,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.profile.resetConfirm,
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@ferbun_progress');
              useProgressStore.setState({
                displayName: '',
                totalXp: 0, currentLevel: 1, streakCount: 0, lastActiveDate: null,
                dailyXp: 0, dailyXpDate: null,
                lessonProgress: {}, vocabMastery: {}, completedStories: {},
                avatarIcon: 'sunny', avatarColor: '#E85D00',
              });
              haptics.success();
              navigation.navigate('Home' as never);
            } catch {
              haptics.error();
            }
          },
        },
      ],
    );
  };

  const STREAK_TIERS = [
    { key: 'Candle', name: t.profile.tiers.candle, req: t.profile.tierReq.candle, icon: 'flame-outline' as const, min: 0, color: c.fire[300] },
    { key: 'Spark', name: t.profile.tiers.spark, req: t.profile.tierReq.spark, icon: 'flash-outline' as const, min: 3, color: c.fire[400] },
    { key: 'Campfire', name: t.profile.tiers.campfire, req: t.profile.tierReq.campfire, icon: 'flame' as const, min: 7, color: c.fire[500] },
    { key: 'Bonfire', name: t.profile.tiers.bonfire, req: t.profile.tierReq.bonfire, icon: 'bonfire-outline' as const, min: 14, color: c.fire[600] },
    { key: 'Newroz Fire', name: t.profile.tiers.newrozFire, req: t.profile.tierReq.newrozFire, icon: 'sunny' as const, min: 30, color: c.fire[700] },
  ];
  const currentTierName = STREAK_TIERS.find((l) => l.key === streakLevel.label)?.name ?? streakLevel.label;

  const vocabStats = useMemo(() => {
    let learning = 0;
    let familiar = 0;
    let mastered = 0;
    const items = Object.values(vocabMastery || {});
    for (const item of items) {
      if (item.masteryLevel >= 4) {
        mastered++;
      } else if (item.masteryLevel >= 2) {
        familiar++;
      } else {
        learning++;
      }
    }
    return {
      learning,
      familiar,
      mastered,
      total: items.length,
    };
  }, [vocabMastery]);

  const srsA11yLabel = `${t.profile.srsTitle}. ${vocabStats.learning} ${t.profile.srsLearning}, ${vocabStats.familiar} ${t.profile.srsFamiliar}, ${vocabStats.mastered} ${t.profile.statMastered}. ${t.profile.forgettingCurveTip}`;

  const stats = [
    {
      label: t.profile.statStreak,
      value: `${streakCount}`,
      sub: currentTierName,
      icon: 'flame' as const,
      color: c.fire[500],
      a11yLabel: t.profile.statStreakA11y(String(streakCount), currentTierName),
    },
    {
      label: t.profile.statXp,
      value: `${totalXp}`,
      sub: `${t.profile.level} ${currentLevel}`,
      icon: 'star' as const,
      color: c.warning,
      a11yLabel: t.profile.statXpA11y(String(totalXp), String(currentLevel)),
    },
    {
      label: t.profile.statDone,
      value: `${progressPct}%`,
      sub: `${completed}/${total}`,
      icon: 'checkmark-circle' as const,
      color: c.kurdish[500],
      a11yLabel: t.profile.statDoneA11y(String(progressPct), `${completed}/${total}`),
    },
  ];

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gradient Header */}
        <LinearGradient colors={[c.fire[700], c.fire[900], '#3D1700']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={[s.headerGradient, { paddingTop: insets.top + SPACING.lg }]}>
          <View style={s.sunWatermark} pointerEvents="none">
            <KurdishSun size={120} color="rgba(255,255,255,0.08)" animate={true} />
          </View>
          <View style={s.headerMountain} pointerEvents="none">
            <MountainSilhouette width={SCREEN_W} height={64} color="rgba(255,255,255,0.07)" />
          </View>
          <TouchableOpacity onPress={openEditor} activeOpacity={0.8} style={[s.avatarRing, { backgroundColor: avatarColor + '33', borderColor: avatarColor }]} accessibilityRole="button" accessibilityLabel={t.profile.editProfileA11y}>
            <KurdishAvatar id={avatarIcon} color="#FFFFFF" size={34} />
            <View style={[s.avatarEditDot, { backgroundColor: avatarColor }]}>
              <Ionicons name="pencil" size={10} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={s.nameRow} onPress={openEditor} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={t.profile.editNameA11y(displayName.trim() || 'Xwendekar')}>
            <Text style={s.name}>{displayName.trim() || 'Xwendekar'}</Text>
            <Ionicons name="pencil" size={14} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <UpperText style={s.subtitle}>{t.profile.subtitle}</UpperText>

          {/* Stats Row */}
          <View style={s.statsRow}>
            {stats.map((st) => (
              <View
                key={st.label}
                style={s.statCard}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={st.a11yLabel}
              >
                <View style={s.statIconChip}>
                  <Ionicons name={st.icon} size={15} color="#FFFFFF" />
                </View>
                <Text style={s.statVal}>{st.value}</Text>
                <UpperText style={s.statSub}>{st.sub}</UpperText>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Progress Section */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.profile.levelProgress}</UpperText>
          <View style={s.progressCard}>
            <View style={s.progressHeader}>
              <Text style={s.progressLevel}>{t.profile.level} {currentLevel}</Text>
              <Text style={s.progressXp}>{xpInLevel} / {XP_PER_LEVEL} XP</Text>
            </View>
            <AnimatedProgressBar
              progress={xpInLevel / XP_PER_LEVEL}
              height={8}
              minFill={0.02}
              trackColor={c.gray[100]}
              fillColor={c.fire[500]}
            />
            <Text style={s.progressHint}>{t.profile.xpToNext(XP_PER_LEVEL - xpInLevel, currentLevel + 1)}</Text>
          </View>
        </View>

        {/* Vocabulary SRS Stats Panel */}
        <View style={s.section} accessible={true} accessibilityLabel={srsA11yLabel}>
          <UpperText style={s.sectionTitle}>{t.profile.srsTitle}</UpperText>
          {vocabStats.total === 0 ? (
            <View style={[s.srsCard, { alignItems: 'center', paddingVertical: SPACING.lg }]}>
              <Ionicons name="bookmarks-outline" size={32} color={c.gray[300]} style={{ marginBottom: SPACING.xs }} />
              <Text style={s.emptyText}>{t.profile.srsEmptyState}</Text>
            </View>
          ) : (
            <View style={s.srsCard}>
              <View style={s.barContainer}>
                {vocabStats.learning > 0 && (
                  <View style={[s.barSegment, { flex: vocabStats.learning, backgroundColor: c.fire[400] }]} />
                )}
                {vocabStats.familiar > 0 && (
                  <View style={[s.barSegment, { flex: vocabStats.familiar, backgroundColor: c.warning }]} />
                )}
                {vocabStats.mastered > 0 && (
                  <View style={[s.barSegment, { flex: vocabStats.mastered, backgroundColor: c.kurdish[500] }]} />
                )}
              </View>

              <View style={s.legendRow}>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: c.fire[400] }]} />
                  <Text style={s.legendText}>
                    {t.profile.srsLearning} <Text style={s.legendCount}>({vocabStats.learning})</Text>
                  </Text>
                </View>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: c.warning }]} />
                  <Text style={s.legendText}>
                    {t.profile.srsFamiliar} <Text style={s.legendCount}>({vocabStats.familiar})</Text>
                  </Text>
                </View>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: c.kurdish[500] }]} />
                  <Text style={s.legendText}>
                    {t.profile.statMastered} <Text style={s.legendCount}>({vocabStats.mastered})</Text>
                  </Text>
                </View>
              </View>

              <View style={s.tipCard}>
                <View style={s.tipSunWatermark} pointerEvents="none">
                  <KurdishSun size={48} color={scheme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'} />
                </View>
                <View style={s.tipHeader}>
                  <Ionicons name="bulb-outline" size={14} color={c.fire[600]} style={{ marginRight: 4 }} />
                  <Text style={s.tipTitle}>{lang === 'tr' ? 'BİLİYOR MUYDUNUZ?' : 'DID YOU KNOW?'}</Text>
                </View>
                <Text style={s.tipText}>{t.profile.forgettingCurveTip}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Streak Levels */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.profile.streakLevelsTitle}</UpperText>
          {STREAK_TIERS.map((level) => {
            const isActive = streakLevel.label === level.key;
            const isReached = streakCount >= level.min;
            return (
              <View key={level.key} style={[s.streakRow, isActive && s.streakActive]}>
                {isReached ? (
                  <View style={s.streakTile}>
                    <MotifTile icon={toIconName(level.icon)} color={level.color} size={40} />
                  </View>
                ) : (
                  <View style={[s.streakIconBox, s.streakIconDim]}>
                    <Ionicons name={level.icon} size={18} color={c.gray[300]} />
                  </View>
                )}
                <View style={s.streakInfo}>
                  <Text style={[s.streakName, isActive && s.streakNameActive, !isReached && s.streakNameDim]}>{level.name}</Text>
                  <Text style={s.streakReq}>{level.req}</Text>
                </View>
                {isActive && <Ionicons name="checkmark-circle" size={20} color={level.color} />}
              </View>
            );
          })}
        </View>

        {/* Appearance */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.profile.appearance}</UpperText>
          <View style={s.segment}>
            {APPEARANCE_OPTIONS.map((opt) => {
              const active = mode === opt.mode;
              const label = opt.mode === 'system' ? t.profile.appSystem : opt.mode === 'light' ? t.profile.appLight : t.profile.appDark;
              return (
                <TouchableOpacity
                  key={opt.mode}
                  style={[s.segmentItem, active && s.segmentItemActive]}
                  onPress={() => { haptics.selection(); setMode(opt.mode); }}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={t.profile.appearanceA11y(label)}
                >
                  <Ionicons name={opt.icon} size={18} color={active ? '#FFFFFF' : c.gray[500]} />
                  <Text style={[s.segmentKu, active && s.segmentLabelActive]}>{opt.ku}</Text>
                  <UpperText style={[s.segmentEn, active && s.segmentSubActive]}>{label}</UpperText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Language (the bridge language: how Kurdish is taught) */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.language.settingTitle}</UpperText>
          <View style={s.segment}>
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = lang === opt.lang;
              const name = opt.lang === 'en' ? t.language.englishName : t.language.turkishName;
              return (
                <TouchableOpacity
                  key={opt.lang}
                  style={[s.segmentItem, active && s.segmentItemActive]}
                  onPress={() => { haptics.selection(); setLang(opt.lang); }}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={name}
                >
                  <Ionicons name="language-outline" size={18} color={active ? '#FFFFFF' : c.gray[500]} />
                  <Text style={[s.segmentKu, active && s.segmentLabelActive]}>{name}</Text>
                  <Text style={[s.segmentEn, active && s.segmentSubActive]}>{opt.code}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Goals & Reminders */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.reminders.sectionTitle}</UpperText>

          <Text style={s.subLabel}>{t.reminders.goalPickerTitle}</Text>
          <View style={s.chipRow}>
            {DAILY_GOAL_OPTIONS.map((xp) => {
              const active = dailyGoalXp === xp;
              return (
                <TouchableOpacity
                  key={xp}
                  style={[s.chip, active && s.chipActive]}
                  onPress={() => onPickGoal(xp)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={`${xp} XP`}
                >
                  <Text style={[s.chipText, active && s.chipTextActive]}>{xp}</Text>
                  <Text style={[s.chipUnit, active && s.chipTextActive]}>XP</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={s.switchRow}>
            <View style={s.switchInfo}>
              <Text style={s.switchTitle}>{t.reminders.remindersLabel}</Text>
              <Text style={s.switchSub}>{t.reminders.remindersSub}</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={onToggleReminders}
              trackColor={{ false: c.gray[200], true: c.fire[400] }}
              thumbColor={notificationsEnabled ? c.fire[600] : c.white}
              ios_backgroundColor={c.gray[200]}
              accessibilityLabel={t.reminders.remindersLabel}
            />
          </View>

          {notificationsEnabled && (
            <>
              <Text style={s.subLabel}>{t.reminders.reminderTime}</Text>
              <View style={s.chipRow}>
                {REMINDER_TIME_OPTIONS.map((opt) => {
                  const active = reminderHour === opt.hour;
                  return (
                    <TouchableOpacity
                      key={opt.hour}
                      style={[s.chip, active && s.chipActive]}
                      onPress={() => onPickTime(opt.hour)}
                      activeOpacity={0.85}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                      accessibilityLabel={opt.label}
                    >
                      <Text style={[s.chipText, active && s.chipTextActive]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>

        {/* Help */}
        <View style={s.section}>
          <UpperText style={s.sectionTitle}>{t.profile.help}</UpperText>
          <TouchableOpacity style={s.linkRow} onPress={() => { haptics.selection(); replayIntro(); }} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={t.profile.replayIntro} accessibilityHint={t.profile.replayIntroSub}>
            <View style={s.linkIconBox}>
              <Ionicons name="sparkles-outline" size={18} color={c.fire[600]} />
            </View>
            <View style={s.linkInfo}>
              <Text style={s.linkTitle}>{t.profile.replayIntro}</Text>
              <Text style={s.linkSub}>{t.profile.replayIntroSub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={c.gray[300]} />
          </TouchableOpacity>
        </View>

        {/* More from us — cross-promotion for our sister app, Nisibis */}
        {NISIBIS_LINK_READY && (
          <View style={s.section}>
            <UpperText style={s.sectionTitle}>{t.profile.moreApps}</UpperText>
            <TouchableOpacity
              style={s.linkRow}
              onPress={openNisibis}
              activeOpacity={0.7}
              accessibilityRole="link"
              accessibilityLabel={t.profile.nisibisTitle}
              accessibilityHint={t.profile.nisibisSub}
            >
              <View style={[s.linkIconBox, { backgroundColor: c.kurdishSoft }]}>
                <Ionicons name="business-outline" size={18} color={c.kurdish[600]} />
              </View>
              <View style={s.linkInfo}>
                <Text style={s.linkTitle}>{t.profile.nisibisTitle}</Text>
                <Text style={s.linkSub} numberOfLines={2}>{t.profile.nisibisSub}</Text>
              </View>
              <Ionicons name="open-outline" size={18} color={c.gray[300]} />
            </TouchableOpacity>
          </View>
        )}

        {/* Reset */}
        <View style={s.section}>
          <TouchableOpacity style={s.resetBtn} onPress={handleReset} accessibilityRole="button" accessibilityLabel={t.profile.reset}>
            <Ionicons name="refresh" size={16} color={c.error} />
            <Text style={s.resetText}>{t.profile.reset}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Edit profile */}
      <Modal visible={editing} transparent animationType="fade" onRequestClose={() => setEditing(false)}>
        <Pressable style={s.modalOverlay} onPress={() => setEditing(false)}>
          <Pressable style={s.modalCard} onPress={() => {}}>
            <View style={s.previewRow}>
              <View style={[s.previewAvatar, { backgroundColor: colorChoice + '22', borderColor: colorChoice }]}>
                <KurdishAvatar id={iconChoice} color={colorChoice} size={30} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.modalTitle}>{t.profile.editTitle}</Text>
                <Text style={s.modalSub}>{t.profile.editSub}</Text>
              </View>
            </View>

            <TextInput
              style={s.modalInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder={t.profile.namePlaceholder}
              placeholderTextColor={c.gray[400]}
              selectionColor={c.fire[500]}
              cursorColor={c.fire[500]}
              keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
              maxLength={24}
              returnKeyType="done"
              onSubmitEditing={saveProfile}
            />

            <Text style={s.fieldLabel}>{t.profile.symbol}</Text>
            <View style={s.optionGrid}>
              {AVATAR_ICONS.map((opt) => {
                const selected = iconChoice === opt.icon;
                return (
                  <TouchableOpacity
                    key={opt.icon}
                    onPress={() => { setIconChoice(opt.icon); haptics.selection(); }}
                    style={[s.iconOption, selected && { borderColor: colorChoice, backgroundColor: colorChoice + '14' }]}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={opt.label}
                  >
                    <KurdishAvatar id={opt.icon} color={selected ? colorChoice : c.gray[500]} size={24} />
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={s.fieldLabel}>{t.profile.color}</Text>
            <View style={s.optionGrid}>
              {AVATAR_COLORS.map((opt) => {
                const selected = colorChoice === opt.color;
                return (
                  <TouchableOpacity
                    key={opt.color}
                    onPress={() => { setColorChoice(opt.color); haptics.selection(); }}
                    style={[s.colorOption, { backgroundColor: opt.color }, selected && s.colorOptionSelected]}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={t.profile.colorA11y(opt.label)}
                  >
                    {selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={s.modalActions}>
              <TouchableOpacity style={s.modalCancel} onPress={() => setEditing(false)}>
                <Text style={s.modalCancelText}>{t.common.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.modalSave, { backgroundColor: colorChoice }]} onPress={saveProfile}>
                <Text style={s.modalSaveText}>{t.common.save}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const makeStyles = (c: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream[50] },
  scrollContent: { paddingBottom: SPACING.xxl },

  // Header — top padding is applied inline from safe-area insets (iOS notch / Android status bar).
  headerGradient: { paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' },
  sunWatermark: { position: 'absolute', top: -16, right: -16 },
  headerMountain: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  avatarRing: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: '#FFFFFF' },
  subtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: SPACING.lg, width: '100%' },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.md, padding: SPACING.sm, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statIconChip: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.16)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  statVal: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: '#FFFFFF', marginTop: 4 },
  statSub: { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Sections
  section: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  sectionTitle: { ...TYPOGRAPHY.section, color: c.gray[500], marginBottom: SPACING.sm },

  // Progress Card
  progressCard: { backgroundColor: c.white, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: c.gray[100] },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLevel: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.midnight[800] },
  progressXp: { fontSize: FONT_SIZE.xs, color: c.gray[400] },
  progressHint: { fontSize: 11, color: c.gray[400], marginTop: 6 },

  // Appearance segmented control
  segment: { flexDirection: 'row', backgroundColor: c.white, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: c.gray[100], padding: 4, gap: 4, ...SHADOWS.sm },
  segmentItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.md, borderRadius: RADIUS.md, gap: 3 },
  segmentItemActive: { backgroundColor: c.fire[500] },
  segmentKu: { fontSize: FONT_SIZE.sm, fontWeight: '800', color: c.midnight[800], letterSpacing: -0.2 },
  segmentEn: { fontSize: 9, fontWeight: '700', color: c.gray[400], textTransform: 'uppercase', letterSpacing: 0.8 },
  segmentLabelActive: { color: '#FFFFFF' },
  segmentSubActive: { color: 'rgba(255,255,255,0.85)' },

  // Streak rows
  streakRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: SPACING.md, borderRadius: RADIUS.md, marginBottom: 4, backgroundColor: c.white, borderWidth: 1, borderColor: c.gray[100] },
  streakActive: { backgroundColor: c.fireSoft, borderColor: c.fire[200] },
  streakTile: { marginRight: SPACING.md },
  streakIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: c.gray[100], justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  streakIconDim: { backgroundColor: c.gray[50] },
  streakInfo: { flex: 1 },
  streakName: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.gray[600] },
  streakNameActive: { color: c.fire[700] },
  streakNameDim: { color: c.gray[300] },
  streakReq: { fontSize: 10, color: c.gray[400] },

  // Reset
  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: RADIUS.md, borderWidth: 1, borderColor: c.errorBorder, backgroundColor: c.errorBg },
  resetText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.error },

  // Link row (help)
  linkRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: c.gray[100] },
  linkIconBox: { width: 36, height: 36, borderRadius: RADIUS.sm, backgroundColor: c.fireSoft, justifyContent: 'center', alignItems: 'center' },
  linkInfo: { flex: 1, marginLeft: SPACING.md },
  linkTitle: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: c.midnight[800] },
  linkSub: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 1 },

  // Goals & reminders
  subLabel: { ...TYPOGRAPHY.section, color: c.gray[400], marginBottom: SPACING.sm, marginTop: SPACING.xs },
  chipRow: { flexDirection: 'row', gap: 8, marginBottom: SPACING.sm },
  chip: { flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 3, paddingVertical: 12, borderRadius: RADIUS.md, backgroundColor: c.white, borderWidth: 1, borderColor: c.gray[100], ...SHADOWS.sm },
  chipActive: { backgroundColor: c.fire[500], borderColor: c.fire[500] },
  chipText: { fontSize: FONT_SIZE.md, fontWeight: '800', color: c.midnight[800] },
  chipUnit: { fontSize: 10, fontWeight: '700', color: c.gray[400] },
  chipTextActive: { color: '#FFFFFF' },
  switchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.white, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: c.gray[100], marginBottom: SPACING.sm, marginTop: SPACING.xs },
  switchInfo: { flex: 1, paddingRight: SPACING.md },
  switchTitle: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: c.midnight[800] },
  switchSub: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 1 },

  // Name editor modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', paddingHorizontal: SPACING.lg },
  modalCard: { backgroundColor: c.white, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.lg },
  modalTitle: { fontSize: FONT_SIZE.lg, fontWeight: '800', color: c.midnight[800] },
  modalSub: { fontSize: FONT_SIZE.xs, color: c.gray[400], marginTop: 2, marginBottom: SPACING.md },
  modalInput: { borderWidth: 2, borderColor: c.gray[200], borderRadius: RADIUS.md, padding: SPACING.md, fontSize: FONT_SIZE.lg, color: c.midnight[800], backgroundColor: c.cream[50] },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: SPACING.sm, marginTop: SPACING.md },
  modalCancel: { paddingVertical: 10, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.md },
  modalCancelText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: c.gray[500] },
  modalSave: { paddingVertical: 10, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.md, backgroundColor: c.fire[500] },
  modalSaveText: { fontSize: FONT_SIZE.md, fontWeight: '700', color: '#FFFFFF' },

  // Edit profile extras
  previewRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.md },
  previewAvatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  fieldLabel: { ...TYPOGRAPHY.section, color: c.gray[500], marginTop: SPACING.md, marginBottom: SPACING.sm },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  iconOption: { width: 44, height: 44, borderRadius: RADIUS.md, borderWidth: 2, borderColor: c.gray[200], backgroundColor: c.white, justifyContent: 'center', alignItems: 'center' },
  colorOption: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  colorOptionSelected: { borderColor: c.midnight[800] },
  avatarEditDot: { position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' },

  // SRS Panel
  srsCard: {
    backgroundColor: c.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: c.gray[100],
  },
  barContainer: {
    height: 12,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: c.gray[100],
    marginBottom: SPACING.md,
  },
  barSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: c.gray[500],
  },
  legendCount: {
    fontWeight: '700',
    color: c.midnight[800],
  },
  tipCard: {
    backgroundColor: c.fireSoft,
    borderColor: c.fireSoftBorder,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    overflow: 'hidden',
    position: 'relative',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: c.fire[700],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tipText: {
    fontSize: 11,
    color: c.gray[600],
    lineHeight: 16,
  },
  tipSunWatermark: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: c.gray[400],
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
    lineHeight: 20,
  },
});
