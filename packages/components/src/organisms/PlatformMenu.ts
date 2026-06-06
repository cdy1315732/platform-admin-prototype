import { Menu as ArcoMenu, MenuItem as ArcoMenuItem, SubMenu as ArcoSubMenu } from '@arco-design/web-vue';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformMenuMode = 'vertical' | 'horizontal' | 'pop' | 'popButton';
export type PlatformMenuTheme = 'light' | 'dark';

export interface PlatformMenuItem {
  key: string;
  label: string;
  disabled?: boolean;
  icon?: VNodeChild;
  children?: PlatformMenuItem[];
}

type PopupMenuMaxHeight = boolean | number;

const renderMenuItem = (item: PlatformMenuItem): VNodeChild => {
  if (item.children?.length) {
    return h(
      ArcoSubMenu as never,
      {
        key: item.key,
        title: item.label
      },
      {
        default: () => item.children?.map(renderMenuItem)
      }
    );
  }

  return h(
    ArcoMenuItem as never,
    {
      key: item.key,
      disabled: item.disabled
    },
    {
      default: () => [item.icon, item.label]
    }
  );
};

export const PlatformMenu = defineComponent({
  name: 'PlatformMenu',
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<PlatformMenuItem[]>,
      default: () => []
    },
    theme: {
      type: String as PropType<PlatformMenuTheme>,
      default: 'light'
    },
    mode: {
      type: String as PropType<PlatformMenuMode>,
      default: 'vertical'
    },
    levelIndent: {
      type: Number,
      default: undefined
    },
    autoOpen: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: undefined
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: 48
    },
    accordion: {
      type: Boolean,
      default: false
    },
    autoScrollIntoView: {
      type: Boolean,
      default: false
    },
    showCollapseButton: {
      type: Boolean,
      default: false
    },
    selectedKeys: {
      type: Array as PropType<string[] | undefined>,
      default: undefined
    },
    defaultSelectedKeys: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    openKeys: {
      type: Array as PropType<string[] | undefined>,
      default: undefined
    },
    defaultOpenKeys: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    scrollConfig: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    tooltipProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    autoOpenSelected: {
      type: Boolean,
      default: false
    },
    breakpoint: {
      type: String,
      default: undefined
    },
    popupMaxHeight: {
      type: [Boolean, Number] as PropType<PopupMenuMaxHeight>,
      default: true
    }
  },
  emits: {
    'update:collapsed': (_collapsed: boolean) => true,
    'update:selectedKeys': (_keys: string[]) => true,
    'update:openKeys': (_keys: string[]) => true,
    collapse: (_collapsed: boolean) => true,
    menuItemClick: (_key: string) => true,
    subMenuClick: (_key: string) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoMenu as never,
        {
          ...platformAttrs(attrs, 'menu', '1:52489', 'platform-menu'),
          theme: props.theme,
          mode: props.mode,
          levelIndent: props.levelIndent,
          autoOpen: props.autoOpen,
          collapsed: props.collapsed,
          defaultCollapsed: props.defaultCollapsed,
          collapsedWidth: props.collapsedWidth,
          accordion: props.accordion,
          autoScrollIntoView: props.autoScrollIntoView,
          showCollapseButton: props.showCollapseButton,
          selectedKeys: props.selectedKeys,
          defaultSelectedKeys: props.defaultSelectedKeys,
          openKeys: props.openKeys,
          defaultOpenKeys: props.defaultOpenKeys,
          scrollConfig: props.scrollConfig,
          triggerProps: props.triggerProps,
          tooltipProps: props.tooltipProps,
          autoOpenSelected: props.autoOpenSelected,
          breakpoint: props.breakpoint,
          popupMaxHeight: props.popupMaxHeight,
          'onUpdate:collapsed': (collapsed: boolean) => emit('update:collapsed', collapsed),
          'onUpdate:selectedKeys': (keys: string[]) => emit('update:selectedKeys', keys),
          'onUpdate:openKeys': (keys: string[]) => emit('update:openKeys', keys),
          onCollapse: (collapsed: boolean) => emit('collapse', collapsed),
          onMenuItemClick: (key: string) => emit('menuItemClick', key),
          onSubMenuClick: (key: string) => emit('subMenuClick', key)
        },
        {
          default: () => slots.default?.() ?? props.items.map(renderMenuItem)
        }
      );
  }
});
