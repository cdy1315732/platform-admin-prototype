import { describe, expect, it } from 'vitest';
import {
  getComponentByName,
  getComponentCatalogGroups,
  getComponentsByLevel,
  getComponentsForTemplate,
  componentRegistry,
  getTokenByName
} from '../index';

describe('component registry', () => {
  const auditedFigmaComponentSets = [
    '.checkbox-input',
    '.filter',
    '.header-icon',
    '.input-addon',
    '.search',
    '.sorter',
    'InputNumber',
    'Message',
    'Result',
    'Tag',
    'Tooltip',
    'badge-avatar',
    'badge/count',
    'badge/dot',
    'badge/status',
    'breadcrumb',
    'cascader',
    'checkbox',
    'components/Link',
    'components/radio',
    'components/steps-item',
    'components/steps-item-icon',
    'components/table-cell/action',
    'components/table-cell/avatar+text',
    'components/table-cell/checkbox',
    'components/table-cell/expand icon',
    'components/table-cell/header',
    'components/table-cell/link',
    'components/table-cell/sort',
    'components/table-cell/status',
    'components/table-cell/switch',
    'components/table-cell/tag',
    'components/table-cell/text',
    'components/table-cell/text+icon',
    'datepicker',
    'datepicker-dropdown',
    'form-item',
    'input',
    'inputtag',
    'menu',
    'pagination',
    'password',
    'picker-cell/month',
    'picker-cell/year',
    'popover',
    'progress-line',
    'select',
    'selection-item',
    'switch',
    'table',
    'tabs/line',
    'tag-deletion',
    'textarea',
    'timeline',
    'timepicker',
    'treeselect',
    'upload',
    'vertical-menu-item/Put away'
  ];

  it('resolves core components needed by the first prototype templates', () => {
    expect(getComponentByName('input')?.arcoVueComponent).toBe('Input');
    expect(getComponentByName('select')?.arcoVueComponent).toBe('Select');
    expect(getComponentByName('form-item')?.arcoVueComponent).toBe('Form.Item');
    expect(getComponentByName('table')?.arcoVueComponent).toBe('Table');
    expect(getComponentByName('pagination')?.arcoVueComponent).toBe('Pagination');
  });

  it('groups components by level and template', () => {
    expect(getComponentsByLevel('atom').length).toBeGreaterThan(5);
    expect(getComponentsForTemplate('ListPageTemplate').map((item) => item.name)).toContain('table');
  });

  it('exposes token decisions for docs and components', () => {
    expect(getTokenByName('color.brand.6')?.value).toBe('#165DFF');
    expect(getTokenByName('color.successAlt.1')?.needsReview).toBe(true);
  });

  it('marks the first implementation batch as implemented', () => {
    const names = ['Button', 'input', 'select', 'form-item', 'Tag', 'badge/status'];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks the list foundation batch as implemented', () => {
    const names = ['components/table-cell/text', 'components/table-cell/action', 'pagination', 'table'];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('builds a complete catalog group model for the docs page', () => {
    const groups = getComponentCatalogGroups();
    const groupedItemCount = groups.reduce((count, group) => count + group.items.length, 0);

    expect(groups.map((group) => group.level)).toEqual(['foundation', 'atom', 'molecule', 'organism', 'template']);
    expect(groupedItemCount).toBe(componentRegistry.length);
    expect(groups.every((group) => group.total === group.items.length)).toBe(true);
    expect(groups.flatMap((group) => group.items).map((item) => item.name)).toContain('Drawer');
  });

  it('marks implemented platform-rule molecules consistently with exported wrappers', () => {
    expect(getComponentByName('ActionLinkGroup')?.status).toBe('implemented');
  });

  it('marks the priority-one structure and navigation batch as implemented', () => {
    const names = ['Modal', 'Drawer', 'menu', 'breadcrumb', 'tabs/line', 'PageHeader', 'Dropdown', 'components/steps-item'];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks the official Arco form-control batch as implemented', () => {
    const names = [
      'datepicker',
      'timepicker',
      'InputNumber',
      'textarea',
      'checkbox',
      'components/radio',
      'switch',
      'inputtag',
      'cascader',
      'treeselect',
      'password'
    ];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks the table-cell and feedback batch as implemented', () => {
    const names = [
      'components/table-cell/header',
      'components/table-cell/text+icon',
      'components/table-cell/avatar+text',
      'components/table-cell/tag',
      'components/table-cell/status',
      'components/table-cell/checkbox',
      'components/table-cell/expand icon',
      'components/table-cell/switch',
      'components/table-cell/link',
      'Tooltip',
      'popover',
      'progress-line',
      'Result',
      'timeline',
      'upload'
    ];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks official adjuncts and Message service as implemented', () => {
    const names = [
      'components/Link',
      'badge/dot',
      'badge/count',
      'badge-avatar',
      '.input-addon',
      'selection-item',
      'tag-deletion',
      'Message'
    ];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks DatePicker panel adjuncts and composition templates as implemented', () => {
    const names = [
      'datepicker-dropdown',
      '.header-icon',
      'picker-cell/month',
      'picker-cell/year',
      'StatusTag',
      'ListPageTemplate',
      'DetailPageTemplate',
      'FormModalTemplate',
      'DetailDrawerTemplate',
      'ResultPageTemplate'
    ];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('marks the remaining Figma primitives and table-navigation adjuncts as implemented', () => {
    const names = [
      'Color',
      'Fonts',
      'Shadows',
      'Icons',
      '.checkbox-input',
      '.sorter',
      '.filter',
      '.search',
      'components/table-cell/sort',
      'components/steps-item-icon',
      'vertical-menu-item/Put away'
    ];

    expect(names.map((name) => getComponentByName(name)?.status)).toEqual([
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented',
      'implemented'
    ]);
  });

  it('registers every audited Figma component set even when not implemented yet', () => {
    const registeredNames = new Set(componentRegistry.map((item) => item.name));
    const missing = auditedFigmaComponentSets.filter((name) => !registeredNames.has(name));

    expect(missing).toEqual([]);
  });
});
