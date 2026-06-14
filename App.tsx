import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { LanguageProvider } from './src/i18n/LanguageProvider';
import { runContentValidation } from './src/data/validate';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Surface any content-authoring mistakes (unanswerable question, empty lesson,
  // orphaned vocab theme) during development. No-op in production builds.
  useEffect(() => { runContentValidation(); }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AppNavigator />
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
