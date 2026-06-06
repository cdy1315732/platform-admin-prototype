export const fontFamilies = {
  cn: 'PingFang SC',
  en: 'Nunito Sans',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
} as const;

export const typography = {
  bodySmall: {
    fontFamily: fontFamilies.cn,
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 22
  },
  body: {
    fontFamily: fontFamilies.cn,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22
  },
  bodyStrong: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 22
  },
  titleSmall: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24
  },
  titleMedium: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28
  },
  titleLarge: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 32
  },
  displaySmall: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 36,
    lineHeight: 44
  },
  displayMedium: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 48,
    lineHeight: 56
  },
  displayLarge: {
    fontFamily: fontFamilies.cn,
    fontWeight: 500,
    fontSize: 56,
    lineHeight: 64
  }
} as const;

export type TypographyToken = typeof typography;
