import { Breadcrumb as ArcoBreadcrumb, BreadcrumbItem as ArcoBreadcrumbItem } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export interface PlatformBreadcrumbItem {
  label: string;
  path?: string;
  children?: PlatformBreadcrumbItem[];
}

type BreadcrumbUrlBuilder = (paths: string[]) => string;

export const PlatformBreadcrumb = defineComponent({
  name: 'PlatformBreadcrumb',
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<PlatformBreadcrumbItem[]>,
      default: () => []
    },
    routes: {
      type: Array as PropType<PlatformBreadcrumbItem[] | undefined>,
      default: undefined
    },
    separator: {
      type: [String, Number] as PropType<string | number>,
      default: '/'
    },
    maxCount: {
      type: Number,
      default: 4
    },
    customUrl: {
      type: Function as PropType<BreadcrumbUrlBuilder>,
      default: undefined
    }
  },
  emits: {
    itemClick: (_item: PlatformBreadcrumbItem) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoBreadcrumb as never,
        {
          ...platformAttrs(attrs, 'breadcrumb', '1:51239', 'platform-breadcrumb'),
          routes: props.routes,
          separator: props.separator,
          maxCount: props.maxCount,
          customUrl: props.customUrl
        },
        {
          default: () =>
            props.routes
              ? slots.default?.()
              : slots.default?.() ??
                props.items.map((item) =>
                  h(
                    ArcoBreadcrumbItem as never,
                    {
                      key: `${item.path ?? ''}:${item.label}`,
                      onClick: () => emit('itemClick', item)
                    },
                    { default: () => item.label }
                  )
                ),
          'item-render': slots['item-render']
        }
      );
  }
});
