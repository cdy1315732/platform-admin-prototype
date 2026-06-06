import { describe, expect, it } from 'vitest';
import {
  PlatformBadgeAvatar,
  PlatformBadgeCount,
  PlatformBadgeDot,
  PlatformInputAddon,
  PlatformLink,
  PlatformSelectionItem,
  PlatformTagDeletion,
  clearPlatformMessage,
  officialAdjunctComponents,
  platformMessage,
  showPlatformMessage
} from '../index';

describe('official Arco adjuncts and services', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports the fourth-batch adjunct wrappers', () => {
    expect(PlatformLink.name).toBe('PlatformLink');
    expect(PlatformBadgeDot.name).toBe('PlatformBadgeDot');
    expect(PlatformBadgeCount.name).toBe('PlatformBadgeCount');
    expect(PlatformBadgeAvatar.name).toBe('PlatformBadgeAvatar');
    expect(PlatformInputAddon.name).toBe('PlatformInputAddon');
    expect(PlatformSelectionItem.name).toBe('PlatformSelectionItem');
    expect(PlatformTagDeletion.name).toBe('PlatformTagDeletion');
  });

  it('exports official Message service helpers', () => {
    expect(typeof showPlatformMessage).toBe('function');
    expect(typeof clearPlatformMessage).toBe('function');
    expect(platformMessage).toEqual(
      expect.objectContaining({
        info: expect.any(Function),
        success: expect.any(Function),
        warning: expect.any(Function),
        error: expect.any(Function),
        loading: expect.any(Function)
      })
    );
  });

  it('declares fourth-batch metadata in Figma registry order', () => {
    expect(officialAdjunctComponents.map((item) => item.name)).toEqual([
      'components/Link',
      'badge/dot',
      'badge/count',
      'badge-avatar',
      '.input-addon',
      'selection-item',
      'tag-deletion',
      'Message'
    ]);
    expect(officialAdjunctComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps Link and Badge variants aligned with official Arco props', () => {
    expect(propKeys(PlatformLink)).toEqual(expect.arrayContaining(['label', 'href', 'status', 'hoverable', 'icon', 'loading', 'disabled']));
    expect(propKeys(PlatformBadgeDot)).toEqual(expect.arrayContaining(['dotStyle', 'offset', 'color']));
    expect(propKeys(PlatformBadgeCount)).toEqual(expect.arrayContaining(['count', 'maxCount', 'offset', 'color', 'text']));
    expect(propKeys(PlatformBadgeAvatar)).toEqual(
      expect.arrayContaining(['text', 'dot', 'count', 'maxCount', 'offset', 'color', 'status', 'avatarText', 'imageUrl', 'size', 'shape'])
    );
  });

  it('keeps Input addon, Select option and Tag deletion aligned with official Arco props', () => {
    expect(propKeys(PlatformInputAddon)).toEqual(
      expect.arrayContaining([
        'modelValue',
        'defaultValue',
        'size',
        'allowClear',
        'disabled',
        'readonly',
        'error',
        'placeholder',
        'prepend',
        'append',
        'type'
      ])
    );
    expect(propKeys(PlatformSelectionItem)).toEqual(expect.arrayContaining(['value', 'label', 'disabled', 'tagProps', 'extra', 'index', 'internal']));
    expect(propKeys(PlatformTagDeletion)).toEqual(expect.arrayContaining(['label', 'size', 'color', 'bordered', 'visible', 'loading']));
  });
});
