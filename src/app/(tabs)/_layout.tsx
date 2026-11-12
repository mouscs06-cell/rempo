import { Tabs } from 'expo-router';

import { colors, minTouchTarget } from '@/theme';

/**
 * Onglets JavaScript à fond plein : les onglets natifs imposent le verre dépoli
 * sur iOS 26 et plus, interdit par CLAUDE.md. Les icônes viennent à l'étape 1.
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarItemStyle: { minHeight: minTouchTarget },
        tabBarIcon: () => null,
      }}>
      <Tabs.Screen name="session" options={{ title: 'Séance' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition' }} />
      <Tabs.Screen name="week" options={{ title: 'Semaine' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
