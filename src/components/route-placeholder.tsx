import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

type Props = {
  title: string;
};

/** Contenu d'une route encore vide : son nom, rien d'autre. */
export function RoutePlaceholder({ title }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '600',
  },
});
