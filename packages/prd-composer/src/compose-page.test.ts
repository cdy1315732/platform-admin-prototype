import { describe, expect, it } from 'vitest';
import { composePage } from './compose-page';
import { mockPrototypePages } from './mock-prototype-pages';

describe('composePage', () => {
  it('maps a list PRD to the list template and registered field components', () => {
    const page = composePage({
      pageType: 'list',
      title: '用户列表',
      fields: [
        { key: 'name', label: '姓名', type: 'text' },
        { key: 'status', label: '状态', type: 'enum', options: ['启用', '停用'] },
        { key: 'createdAt', label: '创建时间', type: 'dateRange' }
      ],
      actions: [{ key: 'create', label: '新增用户', type: 'primary' }]
    });

    expect(page.templateName).toBe('ListPageTemplate');
    expect(page.components.map((item) => item.componentName)).toEqual(['input', 'select', 'datepicker']);
  });

  it('provides mock prototype pages for the core page templates', () => {
    const resolvedPages = mockPrototypePages.map((scenario) => composePage(scenario.prd));

    expect(mockPrototypePages.map((scenario) => scenario.key)).toEqual([
      'merchant-list',
      'order-detail',
      'project-form-modal',
      'ticket-detail-drawer'
    ]);
    expect(resolvedPages.map((page) => page.templateName)).toEqual([
      'ListPageTemplate',
      'DetailPageTemplate',
      'FormModalTemplate',
      'DetailDrawerTemplate'
    ]);
    expect(mockPrototypePages.every((scenario) => scenario.previewRows.length > 0)).toBe(true);
  });
});
