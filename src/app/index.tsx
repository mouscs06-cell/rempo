import { Redirect } from 'expo-router';

/** Point d'entrée. La garde onboarding et paywall arrive aux étapes 4 et 10 de docs/PLAN.md. */
export default function Index() {
  return <Redirect href="/session" />;
}
