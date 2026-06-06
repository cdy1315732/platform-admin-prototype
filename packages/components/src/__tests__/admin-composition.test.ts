import { describe, expect, it, vi } from 'vitest';
import {
  PlatformDetailSummary,
  PlatformFilterPanel,
  PlatformFormCard,
  PlatformTableCard,
  adminCompositionComponents
} from '../index';

describe('admin composition components', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports PC admin composition wrappers', () => {
    expect(PlatformFilterPanel.name).toBe('PlatformFilterPanel');
    expect(PlatformTableCard.name).toBe('PlatformTableCard');
    expect(PlatformFormCard.name).toBe('PlatformFormCard');
    expect(PlatformDetailSummary.name).toBe('PlatformDetailSummary');
  });

  it('declares admin composition metadata in prototype assembly order', () => {
    expect(adminCompositionComponents.map((item) => item.name)).toEqual([
      'FilterPanel',
      'TableCard',
      'FormCard',
      'DetailSummary'
    ]);
    expect(adminCompositionComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps composition props aligned with PRD-driven replacements', () => {
    expect(propKeys(PlatformFilterPanel)).toEqual(
      expect.arrayContaining(['title', 'description', 'searchLabel', 'resetLabel', 'showReset'])
    );
    expect(propKeys(PlatformTableCard)).toEqual(
      expect.arrayContaining(['title', 'description', 'actions', 'selectedCount', 'bulkActions'])
    );
    expect(propKeys(PlatformFormCard)).toEqual(expect.arrayContaining(['title', 'description', 'actions']));
    expect(propKeys(PlatformDetailSummary)).toEqual(expect.arrayContaining(['items', 'columns']));
  });

  it('only renders table bulk actions when rows are selected', () => {
    const emit = vi.fn();
    const render = (PlatformTableCard.setup as any)?.(
      {
        title: '工单数据',
        description: '',
        actions: [],
        selectedCount: 0,
        bulkActions: [{ key: 'assign', label: '批量分配' }]
      },
      { attrs: {}, emit, slots: { default: () => 'table' }, expose: vi.fn() }
    );

    const vnode = render();
    expect(vnode.children.some((child: any) => child?.props?.class === 'platform-table-card__bulk')).toBe(false);
  });

  it('renders status summary values with a dot marker for detail pages', () => {
    const render = (PlatformDetailSummary.setup as any)?.(
      {
        columns: 4,
        items: [{ key: 'status', label: '状态', value: '处理中', kind: 'status', status: 'processing' }]
      },
      { attrs: {}, slots: {}, expose: vi.fn() }
    );

    const vnode = render();
    const article = vnode.children[0];
    const valueNode = article.children[1];
    expect(valueNode.props.class).toContain('platform-detail-summary__status');
    expect(valueNode.props['data-status']).toBe('processing');
  });
});
