import { describe, expect, it } from 'vitest';
import { colors, shadows, typography } from '../index';

describe('platform tokens', () => {
  it('uses the Figma brand color as the default primary token', () => {
    expect(colors.brand[6]).toBe('#165DFF');
  });

  it('keeps the resolved success token conflict explicit', () => {
    expect(colors.success[1]).toBe('#E8FFEA');
    expect(colors.successAlt[1]).toBe('#E8FFFB');
  });

  it('exposes typography and shadow tokens', () => {
    expect(typography.body.fontSize).toBe(14);
    expect(shadows.dropdown1).toContain('rgba(0, 0, 0, 0.1)');
  });
});
