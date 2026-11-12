// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'ios/*', 'android/*', '.expo/*'],
  },
  {
    // Le moteur reste du TypeScript pur : il doit tourner hors ligne et se tester sans simulateur.
    files: ['src/engine/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'react', message: 'Le moteur ne dépend pas de React.' },
            { name: 'react-native', message: 'Le moteur ne dépend pas de React Native.' },
          ],
          patterns: [
            {
              group: ['expo', 'expo-*', 'expo/*', '@expo/*', 'react-native-*', '@react-native/*'],
              message: "Le moteur ne dépend ni d'Expo ni de React Native.",
            },
            {
              group: ['@/app/*', '@/components/*', '@/theme', '@/theme/*', '@/lib/*'],
              message: "Le moteur n'importe ni écran, ni composant, ni service externe.",
            },
          ],
        },
      ],
    },
  },
]);
