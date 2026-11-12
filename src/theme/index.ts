/**
 * Tokens provisoires. Les vraies valeurs (typographie, fond, texte, accent)
 * sont choisies à l'étape 1 de docs/PLAN.md. Un seul thème en V1.
 */

export const colors = {
  background: '#FFFFFF',
  text: '#111111',
  /** Contraste de 7,5:1 sur le fond. */
  textSecondary: '#555555',
  border: '#D0D0D0',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/** Taille minimale d'une zone tactile, en points. */
export const minTouchTarget = 44;
