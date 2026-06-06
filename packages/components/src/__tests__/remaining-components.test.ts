import { describe, expect, it } from 'vitest';
import {
  PlatformCheckboxInput,
  PlatformCollapsedMenuItem,
  PlatformColorToken,
  PlatformFontToken,
  PlatformIconToken,
  PlatformShadowToken,
  PlatformStepsItemIcon,
  PlatformTableFilter,
  PlatformTableSearch,
  PlatformTableSortCell,
  PlatformTableSorter,
  foundationComponents,
  tableNavigationMicroComponents
} from '../index';

describe('remaining Figma primitives and official table/navigation adjuncts', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports foundation token renderers', () => {
    expect(PlatformColorToken.name).toBe('PlatformColorToken');
    expect(PlatformFontToken.name).toBe('PlatformFontToken');
    expect(PlatformShadowToken.name).toBe('PlatformShadowToken');
    expect(PlatformIconToken.name).toBe('PlatformIconToken');
  });

  it('exports table, checkbox, steps and collapsed menu adjuncts', () => {
    expect(PlatformCheckboxInput.name).toBe('PlatformCheckboxInput');
    expect(PlatformTableSorter.name).toBe('PlatformTableSorter');
    expect(PlatformTableFilter.name).toBe('PlatformTableFilter');
    expect(PlatformTableSearch.name).toBe('PlatformTableSearch');
    expect(PlatformTableSortCell.name).toBe('PlatformTableSortCell');
    expect(PlatformStepsItemIcon.name).toBe('PlatformStepsItemIcon');
    expect(PlatformCollapsedMenuItem.name).toBe('PlatformCollapsedMenuItem');
  });

  it('declares all foundation components as implemented', () => {
    expect(foundationComponents.map((item) => item.name)).toEqual(['Color', 'Fonts', 'Shadows', 'Icons']);
    expect(foundationComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('declares the remaining micro components in Figma registry order', () => {
    expect(tableNavigationMicroComponents.map((item) => item.name)).toEqual([
      '.checkbox-input',
      '.sorter',
      '.filter',
      '.search',
      'components/table-cell/sort',
      'components/steps-item-icon',
      'vertical-menu-item/Put away'
    ]);
    expect(tableNavigationMicroComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps official table and navigation adjunct props available', () => {
    expect(propKeys(PlatformCheckboxInput)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultChecked', 'value', 'indeterminate', 'disabled'])
    );
    expect(propKeys(PlatformTableSorter)).toEqual(expect.arrayContaining(['order', 'active', 'disabled', 'label']));
    expect(propKeys(PlatformTableFilter)).toEqual(expect.arrayContaining(['active', 'disabled', 'label']));
    expect(propKeys(PlatformTableSearch)).toEqual(expect.arrayContaining(['active', 'disabled', 'label', 'query']));
    expect(propKeys(PlatformTableSortCell)).toEqual(expect.arrayContaining(['label', 'order', 'active', 'disabled']));
    expect(propKeys(PlatformStepsItemIcon)).toEqual(expect.arrayContaining(['status', 'index', 'small']));
    expect(propKeys(PlatformCollapsedMenuItem)).toEqual(expect.arrayContaining(['collapsed', 'active', 'disabled', 'label']));
  });
});
