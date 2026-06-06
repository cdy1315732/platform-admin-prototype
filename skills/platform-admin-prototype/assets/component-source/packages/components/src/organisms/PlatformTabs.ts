import { TabPane as ArcoTabPane, Tabs as ArcoTabs } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformTabsPosition = 'left' | 'right' | 'top' | 'bottom';
export type PlatformTabsType = 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule';
export type PlatformTabsDirection = 'horizontal' | 'vertical';
export type PlatformTabTrigger = 'click' | 'hover';
export type PlatformTabScrollPosition = 'start' | 'end' | 'center' | 'auto' | number;

export interface PlatformTabItem {
  key: string | number;
  title: string;
  disabled?: boolean;
  closable?: boolean;
}

export const PlatformTabs = defineComponent({
  name: 'PlatformTabs',
  inheritAttrs: false,
  props: {
    activeKey: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined
    },
    defaultActiveKey: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined
    },
    items: {
      type: Array as PropType<PlatformTabItem[]>,
      default: () => []
    },
    position: {
      type: String as PropType<PlatformTabsPosition>,
      default: 'top'
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    type: {
      type: String as PropType<PlatformTabsType>,
      default: 'line'
    },
    direction: {
      type: String as PropType<PlatformTabsDirection>,
      default: 'horizontal'
    },
    editable: {
      type: Boolean,
      default: false
    },
    showAddButton: {
      type: Boolean,
      default: false
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    justify: {
      type: Boolean,
      default: false
    },
    animation: {
      type: Boolean,
      default: false
    },
    headerPadding: {
      type: Boolean,
      default: true
    },
    autoSwitch: {
      type: Boolean,
      default: false
    },
    hideContent: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String as PropType<PlatformTabTrigger>,
      default: 'click'
    },
    scrollPosition: {
      type: [String, Number] as PropType<PlatformTabScrollPosition>,
      default: 'auto'
    }
  },
  emits: {
    'update:activeKey': (_key: string | number) => true,
    change: (_key: string | number) => true,
    tabClick: (_key: string | number, _ev: Event) => true,
    add: (_ev: Event) => true,
    delete: (_key: string | number, _ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTabs as never,
        {
          ...platformAttrs(attrs, 'tabs/line', '1:16158', 'platform-tabs'),
          activeKey: props.activeKey,
          defaultActiveKey: props.defaultActiveKey,
          position: props.position,
          size: props.size,
          type: props.type,
          direction: props.direction,
          editable: props.editable,
          showAddButton: props.showAddButton,
          destroyOnHide: props.destroyOnHide,
          lazyLoad: props.lazyLoad,
          justify: props.justify,
          animation: props.animation,
          headerPadding: props.headerPadding,
          autoSwitch: props.autoSwitch,
          hideContent: props.hideContent,
          trigger: props.trigger,
          scrollPosition: props.scrollPosition,
          'onUpdate:activeKey': (key: string | number) => emit('update:activeKey', key),
          onChange: (key: string | number) => emit('change', key),
          onTabClick: (key: string | number, ev: Event) => emit('tabClick', key, ev),
          onAdd: (ev: Event) => emit('add', ev),
          onDelete: (key: string | number, ev: Event) => emit('delete', key, ev)
        },
        {
          default: () =>
            slots.default?.() ??
            props.items.map((item) =>
              h(
                ArcoTabPane as never,
                {
                  key: item.key,
                  title: item.title,
                  disabled: item.disabled,
                  closable: item.closable
                },
                { default: () => item.title }
              )
            ),
          extra: slots.extra
        }
      );
  }
});
