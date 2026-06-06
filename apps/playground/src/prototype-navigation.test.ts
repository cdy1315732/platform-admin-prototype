import { describe, expect, it } from 'vitest';
import {
  getNavigationTargetForAction,
  getTopNavigationState,
  prototypeNavigationPages,
  prototypePageKeys,
  prototypePages,
  resolvePrototypePage
} from './prototype-navigation';

describe('prototype page navigation', () => {
  it('defines independent ticket admin pages from the PRD', () => {
    expect(prototypePageKeys).toEqual([
      'dashboard',
      'ticket-list',
      'ticket-create',
      'ticket-detail',
      'category-management',
      'user-management',
      'system-settings'
    ]);
    expect(prototypePages.map((page) => page.kind)).toEqual([
      'dashboard',
      'list',
      'form',
      'detail',
      'category',
      'users',
      'settings'
    ]);
  });

  it('keeps secondary ticket pages out of the sidebar navigation', () => {
    expect(prototypeNavigationPages.map((page) => page.key)).toEqual([
      'dashboard',
      'ticket-list',
      'category-management',
      'user-management',
      'system-settings'
    ]);
  });

  it('falls back to the dashboard for unknown page keys', () => {
    expect(resolvePrototypePage('missing').key).toBe('dashboard');
  });

  it('maps operational actions to page navigation targets', () => {
    expect(getNavigationTargetForAction('detail')).toBe('ticket-detail');
    expect(getNavigationTargetForAction('create')).toBe('ticket-create');
    expect(getNavigationTargetForAction('drawer')).toBeUndefined();
  });

  it('defines a compact top navigation bar for PC admin prototypes', () => {
    expect(getTopNavigationState('ticket-list')).toEqual({
      brand: '后台原型组件平台',
      system: '示例服务台',
      section: '工作台',
      current: '工单列表',
      notificationCount: 11,
      userName: '演示管理员'
    });
  });
});
