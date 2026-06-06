import { describe, expect, it } from 'vitest';
import {
  PlatformBreadcrumb,
  PlatformDrawer,
  PlatformDropdown,
  PlatformMenu,
  PlatformModal,
  PlatformPageHeader,
  PlatformSteps,
  PlatformTabs,
  structureNavigationComponents
} from '../index';

describe('structure and navigation platform components', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports modal drawer and navigation wrappers', () => {
    expect(PlatformModal.name).toBe('PlatformModal');
    expect(PlatformDrawer.name).toBe('PlatformDrawer');
    expect(PlatformMenu.name).toBe('PlatformMenu');
    expect(PlatformBreadcrumb.name).toBe('PlatformBreadcrumb');
    expect(PlatformTabs.name).toBe('PlatformTabs');
    expect(PlatformPageHeader.name).toBe('PlatformPageHeader');
    expect(PlatformDropdown.name).toBe('PlatformDropdown');
    expect(PlatformSteps.name).toBe('PlatformSteps');
  });

  it('declares priority-one implementation metadata in official-Arco order', () => {
    expect(structureNavigationComponents.map((item) => item.name)).toEqual([
      'Modal',
      'Drawer',
      'menu',
      'breadcrumb',
      'tabs/line',
      'PageHeader',
      'Dropdown',
      'components/steps-item'
    ]);
    expect(structureNavigationComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps the modal and drawer wrappers aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformModal)).toEqual(
      expect.arrayContaining([
        'visible',
        'defaultVisible',
        'width',
        'top',
        'mask',
        'title',
        'titleAlign',
        'alignCenter',
        'unmountOnClose',
        'maskClosable',
        'hideCancel',
        'simple',
        'closable',
        'okText',
        'cancelText',
        'okLoading',
        'okButtonProps',
        'cancelButtonProps',
        'footer',
        'renderToBody',
        'popupContainer',
        'escToClose',
        'draggable',
        'fullscreen'
      ])
    );

    expect(propKeys(PlatformDrawer)).toEqual(
      expect.arrayContaining([
        'visible',
        'defaultVisible',
        'placement',
        'title',
        'mask',
        'maskClosable',
        'closable',
        'okText',
        'cancelText',
        'okLoading',
        'okButtonProps',
        'cancelButtonProps',
        'unmountOnClose',
        'width',
        'height',
        'popupContainer',
        'escToClose',
        'renderToBody',
        'header',
        'footer',
        'hideCancel'
      ])
    );
  });

  it('uses left-aligned modal titles by default', () => {
    expect((PlatformModal.props as { titleAlign: { default: string } }).titleAlign.default).toBe('start');
  });

  it('keeps navigation wrappers aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformMenu)).toEqual(
      expect.arrayContaining([
        'theme',
        'mode',
        'levelIndent',
        'autoOpen',
        'collapsed',
        'defaultCollapsed',
        'collapsedWidth',
        'accordion',
        'autoScrollIntoView',
        'showCollapseButton',
        'selectedKeys',
        'defaultSelectedKeys',
        'openKeys',
        'defaultOpenKeys',
        'triggerProps',
        'tooltipProps',
        'breakpoint',
        'popupMaxHeight'
      ])
    );

    expect(propKeys(PlatformBreadcrumb)).toEqual(expect.arrayContaining(['items', 'routes', 'separator', 'maxCount', 'customUrl']));
    expect(propKeys(PlatformTabs)).toEqual(
      expect.arrayContaining([
        'activeKey',
        'defaultActiveKey',
        'position',
        'size',
        'type',
        'direction',
        'editable',
        'showAddButton',
        'destroyOnHide',
        'lazyLoad',
        'justify',
        'animation',
        'headerPadding',
        'autoSwitch',
        'hideContent',
        'trigger',
        'scrollPosition'
      ])
    );
    expect(propKeys(PlatformDropdown)).toEqual(
      expect.arrayContaining([
        'popupVisible',
        'defaultPopupVisible',
        'trigger',
        'position',
        'popupContainer',
        'popupMaxHeight',
        'hideOnSelect'
      ])
    );
    expect(propKeys(PlatformSteps)).toEqual(
      expect.arrayContaining(['current', 'defaultCurrent', 'type', 'direction', 'labelPlacement', 'status', 'lineLess', 'small', 'changeable'])
    );
    expect(propKeys(PlatformPageHeader)).toEqual(expect.arrayContaining(['title', 'subtitle', 'showBack']));
  });
});
