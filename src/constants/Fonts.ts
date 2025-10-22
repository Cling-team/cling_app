import { Platform, StyleSheet, TextStyle } from 'react-native';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const fontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

export const fontFamily = Platform.select({
  ios: 'System',
  android: 'System',
  default: 'System',
});

function lh(size: number, ratio: number) {
  return Math.round(size * ratio);
}

export const textStyles = StyleSheet.create({
  display: {
    fontFamily,
    fontSize: fontSizes['4xl'],
    lineHeight: lh(fontSizes['4xl'], lineHeights.tight),
    fontWeight: fontWeights.bold,
  },
  h1: {
    fontFamily,
    fontSize: fontSizes['3xl'],
    lineHeight: lh(fontSizes['3xl'], lineHeights.tight),
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily,
    fontSize: fontSizes['2xl'],
    lineHeight: lh(fontSizes['2xl'], lineHeights.normal),
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontFamily,
    fontSize: fontSizes.xl,
    lineHeight: lh(fontSizes.xl, lineHeights.normal),
    fontWeight: fontWeights.semibold,
  },

  body: {
    fontFamily,
    fontSize: fontSizes.md,
    lineHeight: lh(fontSizes.md, lineHeights.relaxed),
    fontWeight: fontWeights.regular,
  },
  bodySemibold: {
    fontFamily,
    fontSize: fontSizes.md,
    lineHeight: lh(fontSizes.md, lineHeights.relaxed),
    fontWeight: fontWeights.semibold,
  },
  small: {
    fontFamily,
    fontSize: fontSizes.sm,
    lineHeight: lh(fontSizes.sm, lineHeights.normal),
    fontWeight: fontWeights.regular,
  },
  caption: {
    fontFamily,
    fontSize: fontSizes.xs,
    lineHeight: lh(fontSizes.xs, lineHeights.normal),
    fontWeight: fontWeights.medium,
  },
  button: {
    fontFamily,
    fontSize: fontSizes.md,
    lineHeight: lh(fontSizes.md, lineHeights.normal),
    fontWeight: fontWeights.semibold,
  },
  tab: {
    fontFamily,
    fontSize: fontSizes.sm,
    lineHeight: lh(fontSizes.sm, lineHeights.normal),
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  },
});

export const ty = (base: keyof typeof textStyles, extra?: TextStyle): TextStyle => ({
  ...textStyles[base],
  ...(extra ?? {}),
});

export type TextStyleName = keyof typeof textStyles;
