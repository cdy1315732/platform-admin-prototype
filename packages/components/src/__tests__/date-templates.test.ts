import { describe, expect, it } from 'vitest';
import {
  PlatformDateHeaderIcon,
  PlatformDatePickerDropdown,
  PlatformDetailDrawerTemplate,
  PlatformDetailPageTemplate,
  PlatformFormModalTemplate,
  PlatformListPageTemplate,
  PlatformPickerCell,
  PlatformResultPageTemplate,
  PlatformStatusTag,
  datePanelComponents,
  platformTemplateComponents
} from '../index';

describe('official DatePicker panel adjuncts and platform templates', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports date panel adjunct wrappers', () => {
    expect(PlatformDatePickerDropdown.name).toBe('PlatformDatePickerDropdown');
    expect(PlatformDateHeaderIcon.name).toBe('PlatformDateHeaderIcon');
    expect(PlatformPickerCell.name).toBe('PlatformPickerCell');
  });

  it('exports platform page templates and semantic status tag', () => {
    expect(PlatformListPageTemplate.name).toBe('PlatformListPageTemplate');
    expect(PlatformDetailPageTemplate.name).toBe('PlatformDetailPageTemplate');
    expect(PlatformFormModalTemplate.name).toBe('PlatformFormModalTemplate');
    expect(PlatformDetailDrawerTemplate.name).toBe('PlatformDetailDrawerTemplate');
    expect(PlatformResultPageTemplate.name).toBe('PlatformResultPageTemplate');
    expect(PlatformStatusTag.name).toBe('PlatformStatusTag');
  });

  it('declares date panel metadata in Figma registry order', () => {
    expect(datePanelComponents.map((item) => item.name)).toEqual([
      'datepicker-dropdown',
      '.header-icon',
      'picker-cell/month',
      'picker-cell/year'
    ]);
    expect(datePanelComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('declares platform template metadata in composition order', () => {
    expect(platformTemplateComponents.map((item) => item.name)).toEqual([
      'ListPageTemplate',
      'DetailPageTemplate',
      'FormModalTemplate',
      'DetailDrawerTemplate',
      'ResultPageTemplate',
      'StatusTag'
    ]);
    expect(platformTemplateComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps date panel adjuncts aligned with official DatePicker capabilities', () => {
    expect(propKeys(PlatformDatePickerDropdown)).toEqual(
      expect.arrayContaining([
        'modelValue',
        'defaultValue',
        'range',
        'picker',
        'format',
        'showTime',
        'shortcuts',
        'shortcutsPosition',
        'extraFooter',
        'popupVisible',
        'placeholder',
        'disabled'
      ])
    );
    expect(propKeys(PlatformDateHeaderIcon)).toEqual(expect.arrayContaining(['direction', 'disabled', 'label']));
    expect(propKeys(PlatformPickerCell)).toEqual(expect.arrayContaining(['type', 'label', 'selected', 'today', 'inView', 'disabled']));
  });

  it('keeps page templates aligned with PRD composition needs', () => {
    expect(propKeys(PlatformListPageTemplate)).toEqual(expect.arrayContaining(['title', 'subtitle', 'actions']));
    expect(propKeys(PlatformDetailPageTemplate)).toEqual(expect.arrayContaining(['title', 'subtitle', 'actions', 'showBack']));
    expect(propKeys(PlatformFormModalTemplate)).toEqual(expect.arrayContaining(['visible', 'title', 'width', 'actions']));
    expect(propKeys(PlatformDetailDrawerTemplate)).toEqual(expect.arrayContaining(['visible', 'title', 'width', 'actions']));
    expect(propKeys(PlatformResultPageTemplate)).toEqual(expect.arrayContaining(['status', 'title', 'subtitle', 'actions']));
    expect(propKeys(PlatformStatusTag)).toEqual(expect.arrayContaining(['status', 'label', 'size', 'closable']));
  });
});
