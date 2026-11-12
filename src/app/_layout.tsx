import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';

import { DATABASE_NAME, migrateDatabase } from '@/data/db/database';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDatabase}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerTransparent: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </SQLiteProvider>
  );
}
