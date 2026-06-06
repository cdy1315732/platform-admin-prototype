import { colors, fontFamilies, shadows, typography } from '@platform/tokens';
import type { TokenRegistryItem } from './schemas';

export const tokenRegistry = [
  { name: 'color.brand.6', category: 'color', value: colors.brand[6], cssVar: '--ac-color-brand-6' },
  { name: 'color.text.1', category: 'color', value: colors.text[1], cssVar: '--ac-color-text-1' },
  { name: 'color.border.2', category: 'color', value: colors.border[2], cssVar: '--ac-color-border-2' },
  { name: 'color.success.1', category: 'color', value: colors.success[1], cssVar: '--ac-color-success-1' },
  { name: 'color.successAlt.1', category: 'color', value: colors.successAlt[1], cssVar: '--ac-color-success-alt-1', needsReview: true },
  { name: 'font.cn.family', category: 'typography', value: fontFamilies.cn, cssVar: '--ac-font-family-cn' },
  { name: 'font.body', category: 'typography', value: `${typography.body.fontSize}/${typography.body.lineHeight}`, cssVar: '--ac-font-size-body' },
  { name: 'shadow.dropdown1', category: 'shadow', value: shadows.dropdown1, cssVar: '--ac-shadow-dropdown-1' },
  { name: 'shadow.dropdown2', category: 'shadow', value: shadows.dropdown2, cssVar: '--ac-shadow-dropdown-2' },
  { name: 'icon.registry', category: 'icon', value: '257 Figma icon instances' }
] satisfies TokenRegistryItem[];

export const getTokenByName = (name: string): TokenRegistryItem | undefined =>
  tokenRegistry.find((item) => item.name === name);
