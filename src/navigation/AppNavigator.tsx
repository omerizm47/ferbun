import React, { useEffect, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useOnboardingStore } from '../stores/onboardingStore';
import { useSettingsStore } from '../stores/settingsStore';
import { scheduleDailyReminder } from '../utils/notifications';
import { useTheme } from '../theme/ThemeProvider';
import { useLang } from '../i18n/LanguageProvider';
import CraftedTabBar from '../components/ui/CraftedTabBar';
import BrandSplash from '../components/ui/BrandSplash';

import OnboardingScreen from '../screens/OnboardingScreen';
import LanguagePickerScreen from '../screens/LanguagePickerScreen';
import HomeScreen from '../screens/HomeScreen';
import VocabScreen from '../screens/VocabScreen';
import StoriesListScreen from '../screens/StoriesListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonScreen from '../screens/LessonScreen';
import UnitScreen from '../screens/UnitScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import StoryScreen from '../screens/StoryScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Lesson: { lessonId: string; unitId: string };
  Unit: { unitId: string; courseId: string };
  Flashcard: { theme?: string; mode?: 'review' | 'weak' };
  Story: { storyId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CraftedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Learn' }} />
      <Tab.Screen name="Vocab" component={VocabScreen} options={{ tabBarLabel: 'Words' }} />
      <Tab.Screen name="Stories" component={StoriesListScreen} options={{ tabBarLabel: 'Stories' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const showOnboarding = useOnboardingStore((s) => s.showOnboarding);
  const hydrate = useOnboardingStore((s) => s.hydrate);
  const complete = useOnboardingStore((s) => s.complete);
  const { chosen, lang } = useLang();
  const { colors: c, scheme } = useTheme();

  // Match React Navigation's scene/window background to the active scheme so the
  // default white background never shows through (e.g. behind the tab bar's
  // rounded top corners) in dark mode.
  const navTheme = useMemo(() => {
    const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: c.cream[50],
        card: c.cream[50],
        text: c.midnight[800],
        border: c.gray[200],
        primary: c.fire[600],
      },
    };
  }, [scheme, c]);

  useEffect(() => { hydrate(); }, [hydrate]);

  // Hydrate device settings on launch and (re)arm the daily reminder so it
  // survives reinstalls / OS housekeeping. Cross-platform: scheduleDailyReminder
  // ensures the Android channel and is a safe no-op where notifications aren't
  // available (Expo Go / web).
  useEffect(() => {
    (async () => {
      await useSettingsStore.getState().loadFromStorage();
      const { notificationsEnabled, reminderHour } = useSettingsStore.getState();
      if (notificationsEnabled) {
        await scheduleDailyReminder(reminderHour, lang);
      }
    })();
  }, [lang]);

  if (showOnboarding === null) return <BrandSplash colors={c} />; // loading

  // Brand-new users pick their base language before the intro carousel, so the
  // onboarding copy is already in their language. Existing testers are past
  // onboarding, so they never see this and stay on English until they switch
  // it in Profile.
  if (showOnboarding && !chosen) return <LanguagePickerScreen />;

  if (showOnboarding) {
    return <OnboardingScreen onComplete={complete} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Unit" component={UnitScreen} />
        <Stack.Screen
          name="Lesson"
          component={LessonScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Flashcard" component={FlashcardScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
