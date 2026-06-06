import { describe, expect, it } from 'vitest';
import {
  createInputModelBindings,
  PlatformBadge,
  PlatformButton,
  PlatformFormItem,
  PlatformInput,
  PlatformSelect,
  PlatformTag,
  firstBatchComponents
} from '../index';

describe('first batch platform components', () => {
  it('exports the first six platform component wrappers', () => {
    expect(PlatformButton.name).toBe('PlatformButton');
    expect(PlatformInput.name).toBe('PlatformInput');
    expect(PlatformSelect.name).toBe('PlatformSelect');
    expect(PlatformFormItem.name).toBe('PlatformFormItem');
    expect(PlatformTag.name).toBe('PlatformTag');
    expect(PlatformBadge.name).toBe('PlatformBadge');
  });

  it('declares first-batch metadata for docs and registry synchronization', () => {
    expect(firstBatchComponents.map((item) => item.name)).toEqual([
      'Button',
      'input',
      'select',
      'form-item',
      'Tag',
      'badge/status'
    ]);
    expect(firstBatchComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('does not force an empty controlled value when PlatformInput is used without v-model', () => {
    expect(createInputModelBindings(undefined)).toEqual({});
    expect(createInputModelBindings('已输入')).toEqual({ modelValue: '已输入' });
  });
});
