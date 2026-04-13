export const duration = {
  instant: 0.1,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  cinematic: 0.9,
} as const;

export const ease = {
  standard: [0.22, 1, 0.36, 1] as const,
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
} as const;

export const stagger = {
  tight: 0.05,
  base: 0.1,
  loose: 0.15,
} as const;
