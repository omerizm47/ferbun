import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../theme';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import VocabScreen from '../screens/VocabScreen';
import StoriesListScreen from '../screens/StoriesListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonScreen from '../screens/LessonScreen';
import UnitScreen from '../screens/UnitScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import StoryScreen from '../screens/StoryScreen';

const ONBOARDING_KEY = '@ferbun_onboarded';

export type RootStackParamList = {
  MainTabs: undefined;
  Lesson: { lessonId: string; unitId: string };
  Unit: { unitId: string; courseId: string };
  Flashcard: { theme: string };
  Story: { storyId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.fire[500],
        tabBarInactiveTintColor: COLORS.gray[400],
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray[100],
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Vocab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Stories') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Learn' }} />
      <Tab.Screen name="Vocab" component={VocabScreen} options={{ tabBarLabel: 'Words' }} />
      <Tab.Screen name="Stories" component={StoriesListScreen} options={{ tabBarLabel: 'Stories' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((val) => {
      setShowOnboarding(val !== 'true');
    }).catch(() => setShowOnboarding(true));
  }, []);

  const handleOnboardingComplete = async () => {
    try { await AsyncStorage.setItem(ONBOARDING_KEY, 'true'); } catch {}
    setShowOnboarding(false);
  };

  if (showOnboarding === null) return null; // loading

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <NavigationContainer>
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
