import { describe, expect, it, vi } from 'vitest';
import {
  PlatformActionLinkGroup,
  PlatformDataTable,
  PlatformPagination,
  PlatformTableTextCell,
  listFoundationComponents
} from '../index';

describe('list foundation components', () => {
  it('exports table-related platform wrappers', () => {
    expect(PlatformTableTextCell.name).toBe('PlatformTableTextCell');
    expect(PlatformActionLinkGroup.name).toBe('PlatformActionLinkGroup');
    expect(PlatformPagination.name).toBe('PlatformPagination');
    expect(PlatformDataTable.name).toBe('PlatformDataTable');
  });

  it('declares implemented list foundation metadata', () => {
    expect(listFoundationComponents.map((item) => item.name)).toEqual([
      'components/table-cell/text',
      'components/table-cell/action',
      'pagination',
      'table'
    ]);
    expect(listFoundationComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('renders table actions as keyboard-operable button-like links', () => {
    const emit = vi.fn();
    const render = (PlatformActionLinkGroup.setup as any)?.(
      { actions: [{ key: 'drawer', label: '抽屉' }] },
      { attrs: {}, emit, slots: {}, expose: vi.fn() }
    );
    const vnode = render();
    const actionNode = vnode.children[0];

    expect(actionNode.props.role).toBe('button');
    expect(actionNode.props.tabindex).toBe(0);
    actionNode.props.onKeydown({ key: 'Enter', preventDefault: vi.fn() });
    expect(emit).toHaveBeenCalledWith('action', { key: 'drawer', label: '抽屉' }, expect.any(Object));
  });
});
